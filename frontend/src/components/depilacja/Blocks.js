import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import { ArrowRight, Phone, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BOOKSY_URL, PHONE, PHONE_DISPLAY } from "@/data/depilacja";

export function AnimatedSection({ children, className = "", delay = 0 }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ---------------------------------------------------------------- */
/* Breadcrumbs — nawigacja okruszkowa + dane dla schema.org          */
/* ---------------------------------------------------------------- */

export function Breadcrumbs({ items, dark = false }) {
  return (
    <nav aria-label="Ścieżka nawigacji" className="mb-6">
      <ol className="flex flex-wrap items-center gap-1 font-body text-xs">
        {items.map((item, i) => {
          const isLast = i === items.length - 1;
          return (
            <li key={item.name} className="flex items-center gap-1">
              {isLast || !item.path ? (
                <span className={dark ? "text-stone-400" : "text-stone-500"} aria-current="page">
                  {item.name}
                </span>
              ) : (
                <Link
                  to={item.path}
                  className={`transition-colors ${dark ? "text-gold hover:text-white" : "text-gold hover:text-stone-900"}`}
                >
                  {item.name}
                </Link>
              )}
              {!isLast && (
                <ChevronRight className={`w-3 h-3 ${dark ? "text-stone-600" : "text-stone-300"}`} />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

export function breadcrumbJsonLd(items, siteUrl) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      ...(item.path ? { item: `${siteUrl}${item.path}` } : {}),
    })),
  };
}

/* ---------------------------------------------------------------- */
/* Hero                                                              */
/* ---------------------------------------------------------------- */

export function Hero({ eyebrow, title, titleAccent, lead, image, imageAlt, breadcrumbs, priority = false }) {
  return (
    <section className="relative py-20 md:py-28 bg-stone-900 overflow-hidden">
      <div className="absolute inset-0 opacity-30">
        <img
          src={image}
          alt={imageAlt}
          className="w-full h-full object-cover"
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          fetchPriority={priority ? "high" : undefined}
        />
      </div>
      <div className="relative z-10 container mx-auto px-4 md:px-8 max-w-7xl">
        {breadcrumbs && <Breadcrumbs items={breadcrumbs} dark />}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          {eyebrow && (
            <span className="font-body text-xs uppercase tracking-[0.3em] text-gold mb-4 block">{eyebrow}</span>
          )}
          <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl text-white font-semibold mb-5 max-w-4xl">
            {title} {titleAccent && <span className="italic text-gold">{titleAccent}</span>}
          </h1>
          {lead && (
            <p className="font-body text-base md:text-lg text-stone-300 leading-relaxed max-w-2xl">{lead}</p>
          )}
          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <a href={BOOKSY_URL} target="_blank" rel="noopener noreferrer">
              <Button className="bg-gold hover:bg-yellow-600 text-white font-body text-sm tracking-wider uppercase px-8 h-12 rounded-none w-full sm:w-auto">
                Umów wizytę <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </a>
            <a href={`tel:${PHONE}`}>
              <Button
                variant="outline"
                className="border-white/30 text-white hover:bg-white/10 font-body text-sm tracking-wider uppercase px-8 h-12 rounded-none bg-transparent w-full sm:w-auto"
              >
                <Phone className="w-4 h-4 mr-2" /> {PHONE_DISPLAY}
              </Button>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- */
/* Pasek najważniejszych faktów (cena / czas / seria)                */
/* ---------------------------------------------------------------- */

export function FactsStrip({ facts }) {
  return (
    <section className="bg-stone-100 border-y border-stone-200">
      <div className="container mx-auto px-4 md:px-8 max-w-7xl">
        <dl className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 divide-x divide-y md:divide-y-0 divide-stone-200">
          {facts.map((f) => (
            <div key={f.label} className="py-6 px-4 text-center">
              <dt className="font-body text-[11px] uppercase tracking-[0.18em] text-stone-500 mb-2">{f.label}</dt>
              <dd className="font-heading text-lg text-stone-900 font-semibold">{f.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- */
/* Nagłówek sekcji                                                   */
/* ---------------------------------------------------------------- */

export function SectionHeading({ children, accent, sub, center = false, as: Tag = "h2" }) {
  return (
    <div className={center ? "text-center mb-12" : "mb-10"}>
      <Tag className="font-heading text-2xl sm:text-3xl font-semibold text-stone-900">
        {children} {accent && <span className="italic text-gold">{accent}</span>}
      </Tag>
      {sub && (
        <p className={`font-body text-sm text-stone-500 mt-3 leading-relaxed ${center ? "max-w-2xl mx-auto" : "max-w-2xl"}`}>
          {sub}
        </p>
      )}
    </div>
  );
}

/* ---------------------------------------------------------------- */
/* Sekcja treści sterowana danymi (paragraphs / bullets / table)     */
/* ---------------------------------------------------------------- */

export function ContentSection({ section, bg = "bg-white" }) {
  return (
    <section className={`py-14 md:py-20 ${bg}`}>
      <div className="container mx-auto px-4 md:px-8 max-w-4xl">
        <AnimatedSection>
          <SectionHeading>{section.h2}</SectionHeading>
        </AnimatedSection>

        {section.paragraphs && (
          <AnimatedSection delay={0.05}>
            <div className="space-y-4 mb-8 last:mb-0">
              {section.paragraphs.map((p, i) => (
                <p key={i} className="font-body text-base text-stone-600 leading-relaxed">
                  {p}
                </p>
              ))}
            </div>
          </AnimatedSection>
        )}

        {section.bullets && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-stone-200 border border-stone-200">
            {section.bullets.map((b, i) => (
              <AnimatedSection key={i} delay={i * 0.04} className="bg-white p-6">
                {typeof b === "string" ? (
                  <p className="font-body text-sm text-stone-600 leading-relaxed">{b}</p>
                ) : (
                  <>
                    <h3 className="font-heading text-base font-medium text-stone-900 mb-2">{b.title}</h3>
                    <p className="font-body text-sm text-stone-600 leading-relaxed">{b.desc}</p>
                  </>
                )}
              </AnimatedSection>
            ))}
          </div>
        )}

        {section.table && (
          <AnimatedSection delay={0.05}>
            <div className="overflow-x-auto border border-stone-200 mt-2">
              <table className="w-full min-w-[560px] border-collapse">
                <thead>
                  <tr className="bg-stone-900">
                    {section.table.head.map((h) => (
                      <th
                        key={h}
                        scope="col"
                        className="text-left font-body text-[11px] uppercase tracking-[0.15em] text-gold px-4 py-3"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {section.table.rows.map((row, i) => (
                    <tr key={i} className={i % 2 ? "bg-stone-50" : "bg-white"}>
                      {row.map((cell, j) => (
                        <td
                          key={j}
                          className={`px-4 py-3 font-body text-sm ${
                            j === 0 ? "text-stone-900 font-medium" : "text-stone-600"
                          }`}
                        >
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </AnimatedSection>
        )}
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- */
/* Cennik                                                            */
/* ---------------------------------------------------------------- */

export function CennikTable({ rows, title = "Cennik depilacji laserowej", sub, showLinks = true }) {
  return (
    <section className="py-14 md:py-20 bg-white">
      <div className="container mx-auto px-4 md:px-8 max-w-4xl">
        <AnimatedSection>
          <SectionHeading center sub={sub}>
            {title}
          </SectionHeading>
        </AnimatedSection>
        <div className="space-y-1">
          {rows.map((s, i) => (
            <AnimatedSection key={s.name} delay={i * 0.04}>
              <div className="flex items-center justify-between gap-4 p-5 bg-stone-50 hover:bg-stone-100 border border-stone-100 transition-colors duration-300">
                <div className="flex-1 min-w-0">
                  <h3 className="font-body text-sm font-medium text-stone-900">
                    {showLinks && s.zone ? (
                      <Link to={`/uslugi/depilacja-laserowa/${s.zone}`} className="hover:text-gold transition-colors">
                        {s.name}
                      </Link>
                    ) : (
                      s.name
                    )}
                    {s.badge && (
                      <span className="ml-2 inline-block bg-gold/10 text-gold text-[10px] uppercase tracking-wider px-2 py-0.5 align-middle">
                        {s.badge}
                      </span>
                    )}
                  </h3>
                  {s.desc && <p className="font-body text-xs text-stone-400 mt-0.5">{s.desc}</p>}
                </div>
                <div className="flex items-center gap-4 flex-shrink-0">
                  <span className="font-body text-xs text-stone-400 hidden sm:inline">{s.duration}</span>
                  <span className="bg-stone-900 text-white font-body text-xs px-3 py-1.5">{s.price} zł</span>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- */
/* FAQ                                                               */
/* ---------------------------------------------------------------- */

export function FaqList({ items, title = "Najczęstsze", accent = "pytania", sub }) {
  return (
    <section className="py-14 md:py-20 bg-stone-50">
      <div className="container mx-auto px-4 md:px-8 max-w-4xl">
        <AnimatedSection>
          <SectionHeading center accent={accent} sub={sub}>
            {title}
          </SectionHeading>
        </AnimatedSection>
        <div className="space-y-3">
          {items.map((item, i) => (
            <AnimatedSection key={item.q} delay={Math.min(i, 8) * 0.03}>
              <details className="group bg-white border border-stone-200 p-5 md:p-6">
                <summary className="font-body text-sm md:text-base font-medium text-stone-900 list-none flex justify-between items-start gap-4 cursor-pointer">
                  <h3 className="font-body text-sm md:text-base font-medium text-stone-900">{item.q}</h3>
                  <span className="text-gold text-xl leading-none group-open:rotate-45 transition-transform flex-shrink-0">
                    +
                  </span>
                </summary>
                <p className="font-body text-sm text-stone-600 leading-relaxed mt-4">{item.a}</p>
              </details>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- */
/* Karty stref / linkowanie wewnętrzne                               */
/* ---------------------------------------------------------------- */

export function ZoneCards({ zones, title, accent, sub }) {
  return (
    <section className="py-14 md:py-20 bg-stone-50">
      <div className="container mx-auto px-4 md:px-8 max-w-7xl">
        <AnimatedSection>
          <SectionHeading center accent={accent} sub={sub}>
            {title}
          </SectionHeading>
        </AnimatedSection>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {zones.map((z, i) => (
            <AnimatedSection key={z.slug} delay={i * 0.06}>
              <Link
                to={`/uslugi/depilacja-laserowa/${z.slug}`}
                className="group block h-full bg-white border border-stone-200 hover:border-gold transition-colors duration-300"
              >
                <div className="aspect-[16/10] overflow-hidden bg-stone-100">
                  <img
                    src={z.image}
                    alt={z.imageAlt}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-heading text-lg font-semibold text-stone-900 mb-2 group-hover:text-gold transition-colors">
                    {z.cardTitle}
                  </h3>
                  <p className="font-body text-sm text-stone-500 leading-relaxed mb-4">{z.cardDesc}</p>
                  <span className="inline-flex items-center gap-1 font-body text-xs uppercase tracking-wider text-gold">
                    {z.cardPrice} <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </Link>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- */
/* CTA                                                               */
/* ---------------------------------------------------------------- */

export function CtaBand({ title, accent, text }) {
  return (
    <section className="py-16 bg-stone-900">
      <div className="container mx-auto px-4 md:px-8 max-w-7xl text-center">
        <AnimatedSection>
          <h2 className="font-heading text-2xl sm:text-3xl text-white font-semibold mb-4">
            {title} {accent && <span className="italic text-gold">{accent}</span>}
          </h2>
          {text && <p className="font-body text-sm text-stone-400 mb-8 max-w-lg mx-auto leading-relaxed">{text}</p>}
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a href={BOOKSY_URL} target="_blank" rel="noopener noreferrer">
              <Button className="bg-gold hover:bg-yellow-600 text-white font-body text-sm tracking-wider uppercase px-10 h-12 rounded-none w-full sm:w-auto">
                Umów wizytę na Booksy <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </a>
            <a href={`tel:${PHONE}`}>
              <Button
                variant="outline"
                className="border-white/30 text-white hover:bg-white/10 font-body text-sm tracking-wider uppercase px-10 h-12 rounded-none bg-transparent w-full sm:w-auto"
              >
                <Phone className="w-4 h-4 mr-2" /> {PHONE_DISPLAY}
              </Button>
            </a>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
