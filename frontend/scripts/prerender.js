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
 * nginx already serves those: `try_files $uri $uri/ /index.html` finds the
 * directory before falling back to the shell, so no config change is needed.
 * The bundle still boots on top of the markup, so pages stay interactive.
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
 * this run), and /api/ is proxied to the backend so the page is same-origin
 * and CORS never enters the picture.
 */
function createServer(shell) {
  const handle = (req, res) => {
    const url = new URL(req.url, "http://127.0.0.1");
    // Proxy on the raw path — http.request rejects the decoded form the moment
    // it contains a space or a Polish character. Decode only to hit the disk.
    const rawPath = url.pathname;
    const pathname = decodeURIComponent(rawPath);

    if (rawPath.startsWith("/api/")) {
      const target = new URL(API_ORIGIN);
      const proxied = http.request(
        {
          host: target.hostname,
          port: target.port,
          path: rawPath + url.search,
          method: req.method,
          headers: { ...req.headers, host: target.host },
        },
        (upstream) => {
          res.writeHead(upstream.statusCode || 502, upstream.headers);
          upstream.pipe(res);
        },
      );
      proxied.on("error", () => {
        res.writeHead(503, { "Content-Type": "application/json" });
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

/** First browser we can actually launch, or null. */
function resolveBrowser(puppeteer) {
  const candidates = [
    process.env.PUPPETEER_EXECUTABLE_PATH,
    (() => {
      try {
        return puppeteer.executablePath();
      } catch {
        return null;
      }
    })(),
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
  return candidates.find((p) => p && fs.existsSync(p)) || null;
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

async function main() {
  if (!fs.existsSync(SHELL) || !fs.existsSync(SITEMAP)) {
    log("build/index.html или build/sitemap.xml не найдены — пропускаю");
    return;
  }

  let puppeteer;
  try {
    puppeteer = require("puppeteer");
  } catch {
    log("ВНИМАНИЕ: puppeteer не установлен — сайт собран без пререндера");
    return;
  }

  const executablePath = resolveBrowser(puppeteer);
  if (!executablePath) {
    log("ВНИМАНИЕ: Chromium не найден — сайт собран без пререндера");
    return;
  }

  const shell = fs.readFileSync(SHELL, "utf8");
  if (shell.includes(MARKER)) {
    log("build/index.html уже пререндерен — нужен свежий `yarn build`, пропускаю");
    return;
  }

  const routes = readRoutes();
  const server = createServer(shell);
  await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
  const origin = `http://127.0.0.1:${server.address().port}`;
  log(`${routes.length} маршрутов, Chromium: ${executablePath}`);

  let browser;
  let done = 0;
  try {
    browser = await puppeteer.launch({
      executablePath,
      args: ["--no-sandbox", "--disable-dev-shm-usage", "--disable-gpu"],
    });

    for (const route of routes) {
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

        const rendered = await page.evaluate(() => "<!doctype html>\n" + document.documentElement.outerHTML);
        const html = rendered.replace(/<head(\s[^>]*)?>/i, (tag) => `${tag}\n    ${MARKER}`);
        const title = await page.title();
        const outFile = route === "/" ? SHELL : path.join(BUILD_DIR, route, "index.html");
        fs.mkdirSync(path.dirname(outFile), { recursive: true });
        fs.writeFileSync(outFile, html);
        done += 1;
        log(`${route} → ${path.relative(BUILD_DIR, outFile)}  «${title.slice(0, 70)}»`);
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
  }

  log(`готово: ${done} из ${routes.length}`);
}

main().catch((err) => {
  log(`ВНИМАНИЕ: ${err.message} — сайт собран без пререндера`);
});
