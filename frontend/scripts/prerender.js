#!/usr/bin/env node
"use strict";

/**
 * Post-build prerender.
 *
 * `craco build` emits one index.html for every route, so a crawler asking for
 * /uslugi/piercing gets the homepage title and description — react-helmet only
 * swaps them in once the bundle runs. This walks the sitemap with headless
 * Chromium and writes each settled DOM to build/<route>/index.html.
 *
 * nginx serves them via `try_files $uri/index.html $uri /index.html` — the
 * index file is checked before the directory, otherwise nginx answers the
 * prerendered directory with a 301 to a trailing-slash URL.
 * The bundle still boots on top of the markup, so pages stay interactive.
 *
 * nginx answers anything else with 404 and build/404.html (try_files … =404),
 * so every sitemap route MUST end up with a file here — when a page fails to
 * render, or there is no Chromium at all, it gets a copy of the plain shell
 * instead. /admin is served from build/app-shell.html, the untouched shell.
 *
 * The same run writes build/llms.txt and build/llms-full.txt (llmstxt.org):
 * the page list and the full text of every page, taken from the rendered DOM,
 * so the prices an AI assistant reads there are always the ones on the site.
 *
 * This step never fails the build. With no usable Chromium the site ships
 * exactly as it does today, just without the static markup.
 */

const fs = require("fs");
const http = require("http");
const path = require("path");

const BUILD_DIR = path.resolve(__dirname, "..", "build");
const SHELL = path.join(BUILD_DIR, "index.html");
const SITEMAP = path.join(BUILD_DIR, "sitemap.xml");
const APP_SHELL = path.join(BUILD_DIR, "app-shell.html");
const NOT_FOUND = path.join(BUILD_DIR, "404.html");
const LLMS_INTRO = path.resolve(__dirname, "llms-intro.md");
// Any path the router does not know renders the NotFound page.
const NOT_FOUND_PROBE = "/__nie-znaleziono";
const SITE = "https://placeof.beauty";

// Services.js pulls the price list from the API. On an update the backend is
// still serving the previous release while we build, so the cennik makes it
// into the markup; on a first deploy nothing answers and the page prerenders
// without it, which is still better than the bare shell.
const API_ORIGIN = process.env.PRERENDER_API_ORIGIN || "http://127.0.0.1:8000";
const NAV_TIMEOUT = Number(process.env.PRERENDER_TIMEOUT || 30000);

// Stamped into every page we write: lets us tell a prerendered file from the
// shell, and lets you confirm on production with a single curl.
const MARKER = '<meta name="x-prerender" content="1">';

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".xml": "application/xml; charset=utf-8",
  ".txt": "text/plain; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".avif": "image/avif",
  ".gif": "image/gif",
  ".ico": "image/x-icon",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".ttf": "font/ttf",
  ".map": "application/json; charset=utf-8",
};

function log(msg) {
  process.stdout.write(`[prerender] ${msg}\n`);
}

/** Route paths from the sitemap, so the list never drifts from what we submit. */
function readRoutes() {
  const xml = fs.readFileSync(SITEMAP, "utf8");
  const routes = [];
  for (const match of xml.matchAll(/<loc>\s*([^<\s]+)\s*<\/loc>/g)) {
    let pathname;
    try {
      pathname = new URL(match[1]).pathname;
    } catch {
      continue;
    }
    if (pathname !== "/") pathname = pathname.replace(/\/+$/, "");
    if (!routes.includes(pathname)) routes.push(pathname);
  }
  // "/" overwrites the shell we serve every other route from, so it goes last.
  return [...routes.filter((r) => r !== "/"), ...routes.filter((r) => r === "/")];
}

/**
 * Serves the build directory, plus two things the real host does for us:
 * every navigation gets the untouched shell (never a page written earlier in
 * this run), and /api/ is proxied to the backend.
 *
 * The proxy has to answer CORS itself. Production builds bake in an absolute
 * REACT_APP_BACKEND_URL, so the page at http://127.0.0.1:<port> believes it is
 * calling https://placeof.beauty/api — a cross-origin request. The backend only
 * allows its real domains, the browser drops the response, and every component
 * that swallows the axios error renders its loading state into the snapshot:
 * "Ładowanie cennika..." on each ServiceDetail page and an empty service grid
 * plus the Unsplash fallback on the homepage, all with a successful build.
 */
function createServer(shell) {
  const handle = (req, res) => {
    const url = new URL(req.url, "http://127.0.0.1");
    // Proxy on the raw path — http.request rejects the decoded form the moment
    // it contains a space or a Polish character. Decode only to hit the disk.
    const rawPath = url.pathname;
    const pathname = decodeURIComponent(rawPath);

    if (rawPath.startsWith("/api/")) {
      const cors = {
        "access-control-allow-origin": "*",
        "access-control-allow-headers": req.headers["access-control-request-headers"] || "*",
        "access-control-allow-methods": "GET, OPTIONS",
      };
      if (req.method === "OPTIONS") {
        res.writeHead(204, cors).end();
        return;
      }
      const target = new URL(API_ORIGIN);
      const { origin: _origin, ...forwarded } = req.headers;
      const proxied = http.request(
        {
          host: target.hostname,
          port: target.port,
          path: rawPath + url.search,
          method: req.method,
          headers: { ...forwarded, host: target.host },
        },
        (upstream) => {
          const headers = { ...upstream.headers };
          for (const name of Object.keys(headers)) {
            if (name.startsWith("access-control-")) delete headers[name];
          }
          res.writeHead(upstream.statusCode || 502, { ...headers, ...cors });
          upstream.pipe(res);
        },
      );
      proxied.on("error", () => {
        res.writeHead(503, { "Content-Type": "application/json", ...cors });
        res.end("[]");
      });
      req.pipe(proxied);
      return;
    }

    if (path.extname(pathname)) {
      const file = path.join(BUILD_DIR, pathname);
      if (file.startsWith(BUILD_DIR) && fs.existsSync(file) && fs.statSync(file).isFile()) {
        res.writeHead(200, { "Content-Type": MIME[path.extname(pathname)] || "application/octet-stream" });
        fs.createReadStream(file).pipe(res);
        return;
      }
      res.writeHead(404).end();
      return;
    }

    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    res.end(shell);
  };

  // One malformed request must never take the whole build down with it.
  const server = http.createServer((req, res) => {
    try {
      handle(req, res);
    } catch (err) {
      log(`ВНИМАНИЕ: запрос ${req.url} не обработан (${err.message})`);
      if (!res.headersSent) res.writeHead(500);
      res.end();
    }
  });
  server.on("error", (err) => log(`ВНИМАНИЕ: локальный сервер — ${err.message}`));
  return server;
}

/**
 * First browser we can actually launch, or null.
 *
 * puppeteer.executablePath() hands back a promise, so it has to be awaited
 * before it can be tested: an unawaited promise is truthy, fails existsSync and
 * silently drops puppeteer's own download from the list. A machine with Chrome
 * installed hides that behind the next candidate — a bare server ends up with
 * no prerender at all while the build still reports success.
 */
async function resolveBrowser(puppeteer) {
  let downloaded = null;
  try {
    downloaded = await puppeteer.executablePath();
  } catch {
    downloaded = null;
  }

  const candidates = [
    process.env.PUPPETEER_EXECUTABLE_PATH,
    downloaded,
    "/opt/pw-browsers/chromium",
    "/usr/bin/chromium",
    "/usr/bin/chromium-browser",
    "/usr/bin/google-chrome",
    "/usr/bin/google-chrome-stable",
    // macOS, so a local `yarn build` can reuse an installed browser instead of
    // making every developer pull puppeteer's own copy.
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    "/Applications/Chromium.app/Contents/MacOS/Chromium",
  ];
  return candidates.find((p) => typeof p === "string" && fs.existsSync(p)) || null;
}

/**
 * framer-motion mounts sections transparent and reveals them on scroll. Walk the
 * page so whileInView fires, then pin anything still hidden to visible — a
 * crawler reads the markup, not the animation that would have played.
 */
async function settle(page) {
  await page.evaluate(async () => {
    await new Promise((resolve) => {
      let y = 0;
      const step = () => {
        window.scrollBy(0, window.innerHeight);
        y += window.innerHeight;
        if (y < document.body.scrollHeight && y < 60000) setTimeout(step, 60);
        else {
          window.scrollTo(0, 0);
          setTimeout(resolve, 400);
        }
      };
      step();
    });
    for (const el of document.querySelectorAll("[style]")) {
      if (el.style.opacity !== "" && Number(el.style.opacity) < 1) el.style.opacity = "1";
      if (/translate|scale/.test(el.style.transform)) el.style.transform = "none";
    }
  });
}

/** Output file for a route: "/" is the shell itself, the rest get a directory. */
function routeFile(route) {
  return route === "/" ? SHELL : path.join(BUILD_DIR, route, "index.html");
}

/**
 * Plain-shell copies for every route that did not get a prerendered page, and
 * for 404.html. Without them nginx (=404) would turn a failed render into a
 * missing page; with them the route still works as the SPA it used to be.
 */
function writeFallbacks(shell, routes, rendered) {
  let copies = 0;
  for (const route of routes) {
    if (route === "/" || rendered.has(route)) continue;
    const file = routeFile(route);
    fs.mkdirSync(path.dirname(file), { recursive: true });
    fs.writeFileSync(file, shell);
    copies += 1;
  }
  if (!rendered.has(NOT_FOUND_PROBE)) fs.writeFileSync(NOT_FOUND, shell);
  if (copies) log(`ВНИМАНИЕ: ${copies} маршрутов без пререндера — положена SPA-заглушка`);
}

/**
 * Rendered <main> → Markdown. Runs in the page. Headings, paragraphs, lists,
 * tables, FAQ <details> and definition lists; navigation, buttons, images and
 * scripts are dropped. Closed <details> are read too (textContent, not
 * innerText), otherwise every FAQ answer would be missing.
 */
function pageToMarkdown() {
  const SKIP = new Set(["SCRIPT", "STYLE", "SVG", "IMG", "BUTTON", "NAV", "IFRAME", "NOSCRIPT", "PICTURE", "VIDEO"]);
  const INLINE = new Set(["A", "SPAN", "STRONG", "EM", "B", "I", "TIME", "SMALL", "SUP", "SUB", "ABBR", "CODE", "LABEL", "MARK", "U", "S"]);
  const BLOCKS = "p,h1,h2,h3,h4,h5,h6,li,table,details,div,section,article,ul,ol,dl,blockquote,figure";
  const norm = (t) => t.replace(/\s+/g, " ").trim();
  const inline = (node) => {
    let out = "";
    for (const c of node.childNodes) {
      if (c.nodeType === 3) out += c.data;
      else if (c.nodeType === 1 && !SKIP.has(c.tagName) && c.getAttribute("aria-hidden") !== "true") {
        const t = inline(c);
        out += INLINE.has(c.tagName) ? t : ` ${t} `;
      }
    }
    return out;
  };
  const lines = [];
  const push = (t) => {
    const x = norm(t);
    // Bare step numbers ("1", "2") from the numbered badges carry no meaning.
    if (x && !/^\d{1,2}$/.test(x) && lines[lines.length - 1] !== x) lines.push(x);
  };
  const walk = (node) => {
    for (const el of node.children) {
      const tag = el.tagName;
      if (SKIP.has(tag) || el.getAttribute("aria-hidden") === "true") continue;
      if (/^H[1-6]$/.test(tag)) push(`${"#".repeat(Number(tag[1]))} ${norm(inline(el))}`);
      else if (tag === "LI") push(`- ${norm(inline(el))}`);
      else if (tag === "DT") push(`**${norm(inline(el))}**`);
      else if (tag === "TABLE") {
        const rows = [...el.querySelectorAll("tr")].map((tr) =>
          [...tr.children].map((cell) => norm(inline(cell)).replace(/\|/g, "/")),
        );
        rows.forEach((cells, i) => {
          push(`| ${cells.join(" | ")} |`);
          if (i === 0) push(`|${cells.map(() => " --- ").join("|")}|`);
        });
      } else if (tag === "DETAILS") {
        const summary = el.querySelector("summary");
        if (summary) push(`**${norm(inline(summary))}**`);
        for (const c of el.children) if (c !== summary) push(inline(c));
      } else if (!el.querySelector(BLOCKS)) push(inline(el));
      else walk(el);
    }
  };
  const main = document.querySelector("main") || document.getElementById("root");
  if (main) walk(main);
  return lines.join("\n\n");
}

/** Facts for the llms.txt header, read from the BeautySalon node in the shell. */
function salonFacts(shell) {
  for (const m of shell.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    let data;
    try {
      data = JSON.parse(m[1]);
    } catch {
      continue;
    }
    const nodes = data["@graph"] || [data];
    const salon = nodes.find((n) => n["@type"] === "BeautySalon");
    if (salon) return salon;
  }
  return null;
}

const DAYS_PL = {
  Monday: "poniedziałek",
  Tuesday: "wtorek",
  Wednesday: "środa",
  Thursday: "czwartek",
  Friday: "piątek",
  Saturday: "sobota",
  Sunday: "niedziela",
};

function llmsHeader(shell) {
  const s = salonFacts(shell);
  const intro = fs.existsSync(LLMS_INTRO) ? fs.readFileSync(LLMS_INTRO, "utf8").trim() : "";
  const out = [`# ${s ? s.name : "Place of Beauty"}`, ""];
  if (s) {
    out.push(`> ${s.description}`, "");
    if (intro) out.push(intro, "");
    const a = s.address || {};
    const hours = (s.openingHoursSpecification || []).map((h) => {
      const days = [].concat(h.dayOfWeek).map((d) => DAYS_PL[String(d).split("/").pop()] || d);
      return `${days.join(", ")} ${h.opens}–${h.closes}`;
    });
    const r = s.aggregateRating;
    const booking = s.potentialAction && s.potentialAction.target && s.potentialAction.target.urlTemplate;
    out.push(
      "## Kluczowe informacje",
      "",
      `- Adres: ul. ${a.streetAddress}, ${a.postalCode} ${a.addressLocality}, woj. ${a.addressRegion}, Polska`,
      `- Telefon: ${String(s.telephone).replace(/^\+48(\d{3})(\d{3})(\d{3})$/, "+48 $1 $2 $3")}`,
      `- Godziny otwarcia: ${hours.join("; ")}; pozostałe dni zamknięte`,
      ...(booking ? [`- Rezerwacja online (Booksy): ${booking}`] : []),
      ...(r ? [`- Ocena na Booksy: ${r.ratingValue}/5 z ${r.reviewCount} opinii`] : []),
      ...(s.sameAs || []).filter((u) => !u.includes("booksy")).map((u) => `- Profil: ${u}`),
      "",
    );
  } else if (intro) out.push(intro, "");
  return out;
}

/** build/llms.txt (index) and build/llms-full.txt (every page's text). */
function writeLlms(shell, pages) {
  if (!pages.length) return;
  const header = llmsHeader(shell);
  const index = [
    ...header,
    "## Strony",
    "",
    ...pages.map((p) => `- [${p.title}](${p.url}): ${p.description}`),
    "",
    "## Optional",
    "",
    `- [Pełna treść serwisu](${SITE}/llms-full.txt): tekst wszystkich stron w jednym pliku, generowany przy każdej publikacji.`,
    "",
  ];
  fs.writeFileSync(path.join(BUILD_DIR, "llms.txt"), index.join("\n"));
  const full = [
    ...header,
    ...pages.flatMap((p) => ["---", "", `Adres strony: ${p.url}`, "", p.markdown, ""]),
  ];
  fs.writeFileSync(path.join(BUILD_DIR, "llms-full.txt"), full.join("\n"));
  log(`llms.txt и llms-full.txt: ${pages.length} страниц, ${Math.round(Buffer.byteLength(full.join("\n")) / 1024)} КБ`);
}

async function main() {
  if (!fs.existsSync(SHELL) || !fs.existsSync(SITEMAP)) {
    log("build/index.html или build/sitemap.xml не найдены — пропускаю");
    return;
  }

  const shell = fs.readFileSync(SHELL, "utf8");
  if (shell.includes(MARKER)) {
    log("build/index.html уже пререндерен — нужен свежий `yarn build`, пропускаю");
    return;
  }

  const routes = readRoutes();
  // /admin gets the bare shell, never the prerendered homepage.
  fs.writeFileSync(APP_SHELL, shell);

  let puppeteer;
  try {
    puppeteer = require("puppeteer");
  } catch {
    log("ВНИМАНИЕ: puppeteer не установлен — сайт собран без пререндера");
    writeFallbacks(shell, routes, new Set());
    return;
  }

  const executablePath = await resolveBrowser(puppeteer);
  if (!executablePath) {
    log("ВНИМАНИЕ: Chromium не найден — сайт собран без пререндера");
    writeFallbacks(shell, routes, new Set());
    return;
  }

  const server = createServer(shell);
  await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
  const origin = `http://127.0.0.1:${server.address().port}`;
  log(`${routes.length} маршрутов, Chromium: ${executablePath}`);

  let browser;
  let done = 0;
  let degraded = 0;
  const renderedRoutes = new Set();
  const pages = [];
  try {
    browser = await puppeteer.launch({
      executablePath,
      args: ["--no-sandbox", "--disable-dev-shm-usage", "--disable-gpu"],
    });

    for (const route of [...routes, NOT_FOUND_PROBE]) {
      const page = await browser.newPage();
      await page.setViewport({ width: 1280, height: 900 });
      await page.setRequestInterception(true);
      page.on("request", (req) => {
        let url;
        try {
          url = new URL(req.url());
        } catch {
          return req.continue();
        }
        // The bundle bakes in the production origin; point those at our proxy.
        if (url.pathname.startsWith("/api/") && url.origin !== origin) {
          return req.continue({ url: origin + url.pathname + url.search });
        }
        // Everything the pages need is local. Dropping third parties (fonts,
        // widgets) keeps the run fast and stops a slow host from stalling it.
        if (url.hostname !== "127.0.0.1") return req.abort();
        return req.continue();
      });
      // A failed /api call does not fail the page: components swallow the
      // error and render their loading or fallback state, which then gets
      // snapshotted. Collect those so the log says which page shipped hollow.
      const apiFailures = [];
      const apiPath = (u) => {
        try {
          const { pathname } = new URL(u);
          return pathname.startsWith("/api/") ? decodeURIComponent(pathname) : null;
        } catch {
          return null;
        }
      };
      // A request still in flight when the snapshot is taken fails nothing and
      // answers nothing — waitForNetworkIdle just times out quietly — so it is
      // tracked separately and reported as unanswered.
      const apiPending = new Set();
      page.on("request", (req) => {
        if (apiPath(req.url())) apiPending.add(req);
      });
      page.on("requestfinished", (req) => apiPending.delete(req));
      page.on("requestfailed", (req) => {
        apiPending.delete(req);
        const p = apiPath(req.url());
        if (p) apiFailures.push(`${p}: ${req.failure()?.errorText || "failed"}`);
      });
      page.on("response", (resp) => {
        const p = apiPath(resp.url());
        if (p && resp.status() >= 400) apiFailures.push(`${p}: HTTP ${resp.status()}`);
      });

      try {
        await page.goto(origin + route, { waitUntil: "domcontentloaded", timeout: NAV_TIMEOUT });
        await page.waitForFunction(
          () => {
            // Wait for the <h1> every page renders, not merely for #root to
            // have children: Home shows an empty full-height div while it
            // fetches /api/homepage, and that would satisfy a children check —
            // saving a blank screen as the most visited page on the site.
            const root = document.getElementById("root");
            return !!root && !!root.querySelector("h1") && !!document.title;
          },
          { timeout: NAV_TIMEOUT },
        );
        await page.waitForNetworkIdle({ idleTime: 500, timeout: 8000 }).catch(() => {});
        await settle(page);

        for (const req of apiPending) apiFailures.push(`${apiPath(req.url())}: нет ответа к моменту снимка`);
        const rendered = await page.evaluate(() => "<!doctype html>\n" + document.documentElement.outerHTML);
        const html = rendered.replace(/<head(\s[^>]*)?>/i, (tag) => `${tag}\n    ${MARKER}`);
        const title = await page.title();
        const outFile = route === NOT_FOUND_PROBE ? NOT_FOUND : routeFile(route);
        if (route !== NOT_FOUND_PROBE) {
          const meta = await page.evaluate(() => ({
            description: document.querySelector('meta[name="description"]')?.content || "",
            canonical: document.querySelector('link[rel="canonical"]')?.href || "",
          }));
          pages.push({
            route,
            title,
            url: meta.canonical || `${SITE}${route === "/" ? "/" : route}`,
            description: meta.description,
            markdown: await page.evaluate(pageToMarkdown),
          });
        }
        fs.mkdirSync(path.dirname(outFile), { recursive: true });
        fs.writeFileSync(outFile, html);
        renderedRoutes.add(route);
        if (route !== NOT_FOUND_PROBE) done += 1;
        log(`${route} → ${path.relative(BUILD_DIR, outFile)}  «${title.slice(0, 70)}»`);
        if (apiFailures.length) {
          degraded += 1;
          log(`ВНИМАНИЕ: ${route} сохранён без данных API — ${apiFailures.join("; ")}`);
        }
      } catch (err) {
        log(`ВНИМАНИЕ: ${route} не отрендерился (${err.message.split("\n")[0]}) — остаётся SPA-заглушка`);
      } finally {
        await page.close();
      }
    }
  } catch (err) {
    log(`ВНИМАНИЕ: пререндер прерван (${err.message.split("\n")[0]})`);
  } finally {
    if (browser) await browser.close();
    server.close();
    writeFallbacks(shell, routes, renderedRoutes);
  }

  // Sitemap order, homepage first — that is how an assistant should read the site.
  pages.sort((a, b) => (a.route === "/" ? -1 : b.route === "/" ? 1 : routes.indexOf(a.route) - routes.indexOf(b.route)));
  writeLlms(shell, pages);

  log(`готово: ${done} из ${routes.length}` + (degraded ? `, без данных API: ${degraded}` : ""));
}

main().catch((err) => {
  log(`ВНИМАНИЕ: ${err.message} — сайт собран без пререндера`);
});
