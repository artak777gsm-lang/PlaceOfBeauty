import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import SEO from "@/components/SEO";
import {
  AnimatedSection,
  Breadcrumbs,
  breadcrumbJsonLd,
  Hero,
  FactsStrip,
  SectionHeading,
  ContentSection,
  CennikTable,
  FaqList,
  CtaBand,
} from "@/components/depilacja/Blocks";
import { SITE_URL, HUB_PATH, CENNIK, STREFY } from "@/data/depilacja";
import { serviceJsonLd, faqJsonLd, webPageJsonLd } from "@/lib/seoSchema";

export default function DepilacjaStrefa() {
  const { strefa } = useParams();
  const data = STREFY[strefa];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [strefa]);

  if (!data) {
    return (
      <div className="py-32 text-center">
        <h1 className="font-heading text-3xl text-stone-900 mb-4">Nie znaleziono strony</h1>
        <p className="font-body text-sm text-stone-500 mb-6">
          Ta strefa depilacji laserowej nie istnieje w naszym cenniku.
        </p>
        <Link to={HUB_PATH} className="text-gold hover:underline font-body text-sm uppercase tracking-wider">
          Wróć do depilacji laserowej
        </Link>
      </div>
    );
  }

  const path = `${HUB_PATH}/${data.slug}`;
  const isCennik = data.slug === "cennik";
  const priceRows = isCennik ? CENNIK : CENNIK.filter((c) => c.zone === data.slug);

  const breadcrumbs = [
    { name: "Strona główna", path: "/" },
    { name: "Usługi", path: "/uslugi" },
    { name: "Depilacja laserowa", path: HUB_PATH },
    { name: data.breadcrumb },
  ];

  const related = data.related
    .map((slug) => STREFY[slug])
    .filter(Boolean)
    .map((z) => ({ slug: z.slug, zone: z.zone, h1: z.h1, lead: z.lead }));

  const jsonLd = [
    webPageJsonLd({
      name: data.h1,
      description: data.seoDesc,
      path,
      image: data.image,
      breadcrumbId: `${SITE_URL}${path}#breadcrumb`,
    }),
    { ...breadcrumbJsonLd(breadcrumbs, SITE_URL), "@id": `${SITE_URL}${path}#breadcrumb` },
    serviceJsonLd({
      name: data.h1,
      description: data.seoDesc,
      path,
      image: data.image,
      offers: priceRows,
      serviceType: `Depilacja laserowa — ${data.zone.toLowerCase()}`,
    }),
    faqJsonLd(data.faq),
  ];

  return (
    <div data-testid={`depilacja-${data.slug}`}>
      <SEO
        title={data.seoTitle}
        titleSuffix=""
        description={data.seoDesc}
        keywords={data.seoKeywords}
        path={path}
        image={`${SITE_URL}${data.image}`}
        imageAlt={data.imageAlt}
        jsonLd={jsonLd}
      />

      <Hero
        eyebrow="Depilacja laserowa Primelase"
        title={data.h1}
        lead={data.lead}
        image={data.image}
        imageAlt={data.imageAlt}
        breadcrumbs={breadcrumbs}
        priority
      />

      <FactsStrip facts={data.facts} />

      {/* ---------- Wprowadzenie ---------- */}
      <section className="py-14 md:py-20 bg-stone-50">
        <div className="container mx-auto px-4 md:px-8 max-w-4xl">
          <AnimatedSection>
            <SectionHeading accent={data.introAccent}>
              {data.introHeading || "Depilacja laserowa —"}
            </SectionHeading>
          </AnimatedSection>
          <AnimatedSection delay={0.05}>
            <div className="space-y-4">
              {data.intro.map((p, i) => (
                <p key={i} className="font-body text-base text-stone-600 leading-relaxed">
                  {p}
                </p>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ---------- Sekcje treści ---------- */}
      {data.sections.map((section, i) => (
        <ContentSection key={section.h2} section={section} bg={i % 2 === 0 ? "bg-white" : "bg-stone-50"} />
      ))}

      {/* ---------- Cennik strefy ---------- */}
      {priceRows.length > 0 && (
        <CennikTable
          rows={priceRows}
          title={isCennik ? "Pełny cennik depilacji laserowej" : `Cennik — ${data.zone.toLowerCase()}`}
          sub={
            isCennik
              ? "Ceny zgodne z rezerwacją online na Booksy. Strefy spoza cennika wyceniamy indywidualnie na bezpłatnej konsultacji."
              : "Cena obejmuje konsultację, przygotowanie skóry, zabieg i pielęgnację po zabiegu."
          }
          showLinks={isCennik}
        />
      )}

      {!isCennik && (
        <div className="bg-white pb-14 md:pb-20 -mt-4">
          <div className="container mx-auto px-4 md:px-8 max-w-4xl text-center">
            <Link
              to={`${HUB_PATH}/cennik`}
              className="font-body text-sm uppercase tracking-wider text-gold hover:text-stone-900 transition-colors border-b border-gold/40 pb-1"
            >
              Pełny cennik i koszt całej serii
            </Link>
          </div>
        </div>
      )}

      {/* ---------- FAQ ---------- */}
      <FaqList
        items={data.faq}
        title={`${data.zone} —`}
        accent="pytania i odpowiedzi"
        sub="Ogólne pytania o depilację laserową — przebieg, bezpieczeństwo, przeciwwskazania — znajdziesz na stronie głównej działu."
      />

      {/* ---------- Powiązane strefy ---------- */}
      <section className="py-14 md:py-20 bg-white">
        <div className="container mx-auto px-4 md:px-8 max-w-5xl">
          <AnimatedSection>
            <SectionHeading center accent="strefy">
              Zobacz też inne
            </SectionHeading>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-stone-200 border border-stone-200">
            {related.map((z, i) => (
              <AnimatedSection key={z.slug} delay={i * 0.06}>
                <Link
                  to={`${HUB_PATH}/${z.slug}`}
                  className="block h-full bg-white p-7 hover:bg-stone-50 transition-colors group"
                >
                  <h3 className="font-heading text-base font-medium text-stone-900 mb-2 group-hover:text-gold transition-colors">
                    {z.h1}
                  </h3>
                  <p className="font-body text-sm text-stone-500 leading-relaxed line-clamp-3">{z.lead}</p>
                  <span className="inline-flex items-center gap-1 font-body text-xs uppercase tracking-wider text-gold mt-4">
                    Zobacz <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </Link>
              </AnimatedSection>
            ))}
          </div>
          <AnimatedSection delay={0.2} className="text-center mt-10">
            <Link
              to={HUB_PATH}
              className="font-body text-sm uppercase tracking-wider text-gold hover:text-stone-900 transition-colors border-b border-gold/40 pb-1"
            >
              Wszystko o depilacji laserowej Primelase
            </Link>
          </AnimatedSection>
        </div>
      </section>

      <CtaBand
        title="Umów"
        accent={data.ctaAccent}
        text="Bezpłatna konsultacja przed pierwszym zabiegiem. Rezerwacja online przez Booksy dostępna całą dobę."
      />

      <div className="bg-stone-50 py-6 border-t border-stone-200">
        <div className="container mx-auto px-4 md:px-8 max-w-7xl">
          <Breadcrumbs items={breadcrumbs} />
        </div>
      </div>
    </div>
  );
}
