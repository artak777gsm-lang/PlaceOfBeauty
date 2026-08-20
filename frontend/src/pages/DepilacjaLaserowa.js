import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Star, Check, X, MapPin } from "lucide-react";
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
  ZoneCards,
  CtaBand,
} from "@/components/depilacja/Blocks";
import {
  SITE_URL,
  HUB_PATH,
  CENNIK,
  PAKIET_OSZCZEDNOSC,
  PRIMELASE_SPEC,
  FAZY_WLOSA,
  POROWNANIE_METOD,
  PRZED_ZABIEGIEM,
  PO_ZABIEGU,
  EFEKTY_TIMELINE,
  MITY,
  FOTOTYPY,
  SLOWNIK,
  OKOLICE,
  OPINIE,
  HUB_FAQ,
  PROCES,
  DLA_KOGO,
  PRZECIWWSKAZANIA,
  KORZYSCI,
  STREFY,
  STREFY_LISTA,
  SALON,
} from "@/data/depilacja";
import { serviceJsonLd, faqJsonLd, howToJsonLd, webPageJsonLd } from "@/lib/seoSchema";

const BREADCRUMBS = [
  { name: "Strona główna", path: "/" },
  { name: "Usługi", path: "/uslugi" },
  { name: "Depilacja laserowa" },
];

const HERO_FACTS = [
  { label: "Ceny", value: "100–750 zł" },
  { label: "Seria", value: "6–8 zabiegów" },
  { label: "Odstępy", value: "co 4–6 tygodni" },
  { label: "Redukcja owłosienia", value: "80–95%" },
  { label: "Konsultacja", value: "Bezpłatna" },
];

const CARD_META = {
  pachy: { cardTitle: "Depilacja laserowa pach", cardDesc: "Najkrótszy zabieg i najszybciej widoczny efekt. Koniec z podrażnieniami po dezodorancie.", cardPrice: "200 zł · 15 min" },
  nogi: { cardTitle: "Depilacja laserowa nóg", cardDesc: "Całe nogi — łydki i uda. Największa oszczędność czasu i koniec wrastających włosków.", cardPrice: "550 zł · 50 min" },
  bikini: { cardTitle: "Depilacja laserowa bikini", cardDesc: "Bikini płytkie i głębokie. Dyskretnie, higienicznie, bez zapalenia mieszków.", cardPrice: "od 220 zł · 20 min" },
  wasik: { cardTitle: "Depilacja laserowa wąsika", cardDesc: "Twarz, wąsik i broda — także przy owłosieniu na tle hormonalnym.", cardPrice: "100 zł · 10 min" },
  "dla-mezczyzn": { cardTitle: "Depilacja dla mężczyzn", cardDesc: "Plecy, kark, klatka piersiowa, pachy i nogi. Grubszy włos = lepsza reakcja na laser.", cardPrice: "wycena na konsultacji" },
  cennik: { cardTitle: "Cennik i koszt serii", cardDesc: "Pełny cennik, koszt całej serii i porównanie z woskowaniem przez lata.", cardPrice: "100–750 zł" },
};

const POROWNANIE_SECTION = {
  h2: "Depilacja laserowa a inne metody usuwania owłosienia",
  paragraphs: [
    "Wszystkie metody poza laserem i elektrolizą działają objawowo — usuwają włos, ale zostawiają nietknięty mieszek, który po kilku dniach lub tygodniach produkuje kolejny. Poniższe zestawienie pokazuje, co to oznacza w praktyce: w trwałości efektu, w bólu i w pieniądzach wydawanych rok po roku.",
  ],
  table: {
    head: ["Metoda", "Trwałość", "Częstotliwość", "Ból", "Wrastające włoski", "Koszt"],
    rows: POROWNANIE_METOD.map((m) => [m.metoda, m.trwalosc, m.czestotliwosc, m.bol, m.wrastajace, m.koszt]),
  },
};

export default function DepilacjaLaserowa() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const zones = STREFY_LISTA.map((slug) => ({
    slug,
    image: STREFY[slug].image,
    imageAlt: STREFY[slug].imageAlt,
    ...CARD_META[slug],
  }));

  const breadcrumbLd = { ...breadcrumbJsonLd(BREADCRUMBS, SITE_URL), "@id": `${SITE_URL}${HUB_PATH}#breadcrumb` };

  const jsonLd = [
    webPageJsonLd({
      name: "Depilacja laserowa Primelase — Grodzisk Mazowiecki",
      description:
        "Trwałe usuwanie owłosienia laserem diodowym Primelase w Grodzisku Mazowieckim. Cennik, liczba zabiegów, przygotowanie, przeciwwskazania i odpowiedzi na najczęstsze pytania.",
      path: HUB_PATH,
      image: STREFY.pachy.image,
      breadcrumbId: `${SITE_URL}${HUB_PATH}#breadcrumb`,
    }),
    breadcrumbLd,
    serviceJsonLd({
      name: "Depilacja laserowa Primelase",
      description:
        "Trwałe usuwanie owłosienia laserem diodowym Primelase — pachy, nogi, bikini, wąsik oraz strefy męskie. Seria 6–8 zabiegów daje redukcję owłosienia rzędu 80–95%.",
      path: HUB_PATH,
      image: "/gallery/1197425395724978.jpg",
      offers: CENNIK,
    }),
    howToJsonLd({
      name: "Jak przebiega zabieg depilacji laserowej",
      description:
        "Przebieg zabiegu depilacji laserowej laserem Primelase — od bezpłatnej konsultacji i kwalifikacji, przez przygotowanie skóry i sam zabieg, po pielęgnację i planowanie kolejnej sesji.",
      steps: PROCES,
      totalTime: "PT50M",
    }),
    faqJsonLd(HUB_FAQ),
  ];

  return (
    <div data-testid="depilacja-hub">
      <SEO
        title="Depilacja laserowa Grodzisk Mazowiecki — Primelase"
        titleSuffix=""
        description="Depilacja laserowa Primelase w Grodzisku Mazowieckim. Pachy 200 zł, wąsik 100 zł, bikini od 220 zł, całe nogi 550 zł, pakiet 750 zł. Seria 6–8 zabiegów = 80–95% mniej włosów. Bezpłatna konsultacja."
        keywords="depilacja laserowa Grodzisk Mazowiecki, depilacja laserowa Primelase, laserowe usuwanie owłosienia, epilacja laserowa Grodzisk, depilacja laserowa cena, depilacja laserowa cennik, trwałe usuwanie owłosienia, depilacja laserowa blisko mnie, depilacja laserowa bikini, depilacja laserowa pachy, depilacja laserowa nogi, depilacja laserowa wąsik, depilacja laserowa ile zabiegów, czy depilacja laserowa boli, depilacja laserowa opinie, salon depilacji laserowej Grodzisk Mazowiecki, depilacja laserowa Milanówek, depilacja laserowa Pruszków"
        path={HUB_PATH}
        image={`${SITE_URL}/gallery/1197425395724978.jpg`}
        imageAlt="Depilacja laserowa Primelase w salonie Place of Beauty w Grodzisku Mazowieckim"
        jsonLd={jsonLd}
      />

      <Hero
        eyebrow="Depilacja laserowa"
        title="Depilacja laserowa Primelase w"
        titleAccent="Grodzisku Mazowieckim"
        lead="Trwałe usuwanie owłosienia laserem diodowym o mocy do 4800 W. Seria 6–8 zabiegów to redukcja owłosienia rzędu 80–95% — bez golenia co drugi dzień, bez wosku i bez wrastających włosków."
        image="/gallery/1197425395724978.jpg"
        imageAlt="Zabieg depilacji laserowej Primelase w salonie Place of Beauty w Grodzisku Mazowieckim"
        breadcrumbs={BREADCRUMBS}
        priority
      />

      <FactsStrip facts={HERO_FACTS} />

      {/* ---------- Wprowadzenie + korzyści ---------- */}
      <section className="py-14 md:py-20 bg-stone-50">
        <div className="container mx-auto px-4 md:px-8 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            <AnimatedSection>
              <SectionHeading accent="laserowa?">Czym jest depilacja</SectionHeading>
              <div className="space-y-4 font-body text-base text-stone-600 leading-relaxed">
                <p>
                  Depilacja laserowa opiera się na zjawisku selektywnej fototermolizy. Wiązka światła o precyzyjnie
                  dobranej długości fali przechodzi przez naskórek i zostaje pochłonięta przez melaninę zgromadzoną
                  w łodydze włosa. Energia zamienia się w ciepło, które dociera do macierzy mieszka włosowego
                  i trwale ją niszczy. Mieszek pozbawiony macierzy nie jest w stanie wyprodukować nowego włosa.
                </p>
                <p>
                  Kluczowe słowo to <strong className="text-stone-800">trwale</strong>. Golenie, wosk, pasta cukrowa
                  i depilator usuwają włos, ale zostawiają mieszek nienaruszony — dlatego wszystko wraca po kilku
                  dniach albo tygodniach i powtarzasz to całe życie. Laser jako jedyna metoda o tej skali działania
                  usuwa problem u źródła, a efekt kumuluje się z każdą kolejną sesją.
                </p>
                <p>
                  W Place of Beauty przy ul. Garbarskiej 17/2 w Grodzisku Mazowieckim pracujemy na laserze diodowym
                  Primelase hiszpańskiej marki Cocoon Medical. Depilujemy pachy, całe nogi, bikini płytkie
                  i głębokie, wąsik oraz strefy męskie — plecy, kark i klatkę piersiową. Każdą serię poprzedza
                  bezpłatna konsultacja z oceną fototypu skóry i kwalifikacją do zabiegu.
                </p>
              </div>
              <div className="flex items-center gap-2 mt-8 p-4 bg-white border border-stone-200">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-gold text-gold" />
                  ))}
                </div>
                <span className="font-body text-sm text-stone-600">
                  <strong className="text-stone-900">{SALON.rating}/5</strong> na podstawie {SALON.reviewCount} opinii
                  klientów w serwisie Booksy
                </span>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.15}>
              <div className="grid grid-cols-1 gap-px bg-stone-200 border border-stone-200">
                {KORZYSCI.map((b, i) => (
                  <div key={i} className="bg-white p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 bg-gold/10 flex items-center justify-center flex-shrink-0">
                        <span className="text-gold text-xs font-bold">{i + 1}</span>
                      </div>
                      <div>
                        <h3 className="font-heading text-base font-medium text-stone-900 mb-1">{b.title}</h3>
                        <p className="font-body text-sm text-stone-600 leading-relaxed">{b.desc}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ---------- Strefy ---------- */}
      <ZoneCards
        zones={zones}
        title="Depilacja laserowa —"
        accent="strefy ciała"
        sub="Każda strefa ma osobną stronę z ceną, liczbą zabiegów, przygotowaniem i odpowiedziami na pytania dotyczące właśnie tej okolicy."
      />

      {/* ---------- Technologia ---------- */}
      <section className="py-14 md:py-20 bg-white">
        <div className="container mx-auto px-4 md:px-8 max-w-7xl">
          <AnimatedSection>
            <SectionHeading
              center
              accent="Primelase"
              sub="Laser diodowy klasy medycznej hiszpańskiej marki Cocoon Medical. To parametry urządzenia decydują o tym, ile zabiegów będzie potrzebnych i jak komfortowo je zniesiesz."
            >
              Technologia
            </SectionHeading>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-stone-200 border border-stone-200">
            {PRIMELASE_SPEC.map((s, i) => (
              <AnimatedSection key={s.label} delay={i * 0.05} className="bg-white p-7">
                <span className="font-body text-[11px] uppercase tracking-[0.18em] text-stone-400 block mb-2">
                  {s.label}
                </span>
                <h3 className="font-heading text-xl text-stone-900 font-semibold mb-3">{s.value}</h3>
                <p className="font-body text-sm text-stone-600 leading-relaxed">{s.desc}</p>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Przebieg zabiegu ---------- */}
      <section className="py-14 md:py-20 bg-stone-50">
        <div className="container mx-auto px-4 md:px-8 max-w-4xl">
          <AnimatedSection>
            <SectionHeading center accent="zabieg?" sub="Od pierwszego kontaktu do ustalenia terminu kolejnej sesji.">
              Jak przebiega
            </SectionHeading>
          </AnimatedSection>
          <div className="space-y-6">
            {PROCES.map((p, i) => (
              <AnimatedSection key={p.step} delay={i * 0.06}>
                <div className="flex gap-5 md:gap-6 items-start">
                  <div className="w-11 h-11 bg-stone-900 flex items-center justify-center flex-shrink-0">
                    <span className="font-heading text-base text-gold font-bold">{i + 1}</span>
                  </div>
                  <div className="flex-1 pt-1">
                    <h3 className="font-heading text-lg font-medium text-stone-900 mb-1">{p.step}</h3>
                    <p className="font-body text-sm text-stone-600 leading-relaxed">{p.desc}</p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Fazy wzrostu włosa ---------- */}
      <section className="py-14 md:py-20 bg-white">
        <div className="container mx-auto px-4 md:px-8 max-w-5xl">
          <AnimatedSection>
            <SectionHeading
              center
              accent="serii zabiegów"
              sub="To pytanie wraca na każdej konsultacji. Odpowiedź kryje się w biologii włosa — laser działa wyłącznie na te mieszki, które akurat są w fazie aktywnego wzrostu."
            >
              Dlaczego potrzeba
            </SectionHeading>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-stone-200 border border-stone-200">
            {FAZY_WLOSA.map((f, i) => (
              <AnimatedSection key={f.name} delay={i * 0.08} className={`p-7 ${f.active ? "bg-stone-900" : "bg-white"}`}>
                <span
                  className={`font-body text-[11px] uppercase tracking-[0.18em] block mb-2 ${
                    f.active ? "text-gold" : "text-stone-400"
                  }`}
                >
                  {f.share}
                </span>
                <h3
                  className={`font-heading text-lg font-semibold mb-3 ${f.active ? "text-white" : "text-stone-900"}`}
                >
                  {f.name}
                </h3>
                <p className={`font-body text-sm leading-relaxed ${f.active ? "text-stone-300" : "text-stone-600"}`}>
                  {f.desc}
                </p>
              </AnimatedSection>
            ))}
          </div>
          <AnimatedSection delay={0.1}>
            <p className="font-body text-sm text-stone-600 leading-relaxed mt-8 max-w-3xl">
              Ponieważ w danym momencie w fazie anagenu znajduje się tylko 20–30% owłosienia, jeden zabieg może
              usunąć najwyżej tę część włosów. Kolejne sesje planujemy co 4–6 tygodni — dokładnie wtedy, gdy następna
              porcja mieszków wchodzi w fazę wzrostu. Po 6–8 takich cyklach obejmujemy praktycznie całe owłosienie
              w danej strefie.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* ---------- Efekty w czasie ---------- */}
      <section className="py-14 md:py-20 bg-stone-50">
        <div className="container mx-auto px-4 md:px-8 max-w-4xl">
          <AnimatedSection>
            <SectionHeading center accent="efekty" sub="Czego realnie spodziewać się po kolejnych zabiegach.">
              Kiedy widać
            </SectionHeading>
          </AnimatedSection>
          <div className="border-l-2 border-stone-200 ml-3 space-y-8">
            {EFEKTY_TIMELINE.map((e, i) => (
              <AnimatedSection key={e.when} delay={i * 0.05}>
                <div className="relative pl-8">
                  <span className="absolute -left-[7px] top-1.5 w-3 h-3 bg-gold rounded-full" />
                  <h3 className="font-heading text-base font-semibold text-stone-900 mb-1">{e.when}</h3>
                  <p className="font-body text-sm text-stone-600 leading-relaxed">{e.what}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Porównanie metod ---------- */}
      <ContentSection section={POROWNANIE_SECTION} bg="bg-white" />

      {/* ---------- Przed i po zabiegu ---------- */}
      <section className="py-14 md:py-20 bg-stone-50">
        <div className="container mx-auto px-4 md:px-8 max-w-7xl">
          <AnimatedSection>
            <SectionHeading
              center
              accent="po zabiegu"
              sub="Większość nieudanych zabiegów i podrażnień bierze się z błędów w przygotowaniu, a nie z samego lasera. Te dwie listy decydują o efekcie serii."
            >
              Przygotowanie i pielęgnacja
            </SectionHeading>
          </AnimatedSection>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <AnimatedSection>
              <div className="bg-white border border-stone-200 h-full">
                <h3 className="font-heading text-lg font-semibold text-stone-900 p-6 pb-4 border-b border-stone-200">
                  Przed zabiegiem
                </h3>
                <ul className="divide-y divide-stone-100">
                  {PRZED_ZABIEGIEM.map((p) => (
                    <li key={p.title} className="p-6 py-5">
                      <div className="flex items-start gap-3">
                        <Check className="w-4 h-4 text-gold flex-shrink-0 mt-1" />
                        <div>
                          <h4 className="font-body text-sm font-medium text-stone-900 mb-1">{p.title}</h4>
                          <p className="font-body text-sm text-stone-600 leading-relaxed">{p.desc}</p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </AnimatedSection>
            <AnimatedSection delay={0.15}>
              <div className="bg-white border border-stone-200 h-full">
                <h3 className="font-heading text-lg font-semibold text-stone-900 p-6 pb-4 border-b border-stone-200">
                  Po zabiegu
                </h3>
                <ul className="divide-y divide-stone-100">
                  {PO_ZABIEGU.map((p) => (
                    <li key={p.title} className="p-6 py-5">
                      <div className="flex items-start gap-3">
                        <Check className="w-4 h-4 text-gold flex-shrink-0 mt-1" />
                        <div>
                          <h4 className="font-body text-sm font-medium text-stone-900 mb-1">{p.title}</h4>
                          <p className="font-body text-sm text-stone-600 leading-relaxed">{p.desc}</p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ---------- Dla kogo / przeciwwskazania ---------- */}
      <section className="py-14 md:py-20 bg-white">
        <div className="container mx-auto px-4 md:px-8 max-w-7xl">
          <AnimatedSection>
            <SectionHeading center accent="depilacja laserowa" sub="I kiedy trzeba z niej zrezygnować albo poczekać.">
              Dla kogo jest
            </SectionHeading>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <AnimatedSection>
              <div className="bg-stone-50 border border-stone-200 p-8 h-full">
                <h3 className="font-heading text-lg font-medium text-stone-900 mb-5 flex items-center gap-2">
                  <Check className="w-5 h-5 text-green-600" /> Zabieg jest dla Ciebie, jeśli:
                </h3>
                <ul className="space-y-3">
                  {DLA_KOGO.map((s) => (
                    <li key={s} className="font-body text-sm text-stone-600 flex items-start gap-2 leading-relaxed">
                      <span className="text-gold mt-0.5 flex-shrink-0">•</span> {s}
                    </li>
                  ))}
                </ul>
              </div>
            </AnimatedSection>
            <AnimatedSection delay={0.15}>
              <div className="bg-stone-50 border border-stone-200 p-8 h-full">
                <h3 className="font-heading text-lg font-medium text-stone-900 mb-5 flex items-center gap-2">
                  <X className="w-5 h-5 text-red-500" /> Przeciwwskazania:
                </h3>
                <ul className="space-y-3">
                  {PRZECIWWSKAZANIA.map((c) => (
                    <li key={c} className="font-body text-sm text-stone-600 flex items-start gap-2 leading-relaxed">
                      <span className="text-stone-400 mt-0.5 flex-shrink-0">•</span> {c}
                    </li>
                  ))}
                </ul>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ---------- Fototypy ---------- */}
      <section className="py-14 md:py-20 bg-stone-50">
        <div className="container mx-auto px-4 md:px-8 max-w-4xl">
          <AnimatedSection>
            <SectionHeading
              center
              accent="Fitzpatricka"
              sub="Fototyp skóry decyduje o doborze długości fali i energii zabiegu. Ocenimy go podczas bezpłatnej konsultacji."
            >
              Fototypy skóry w skali
            </SectionHeading>
          </AnimatedSection>
          <AnimatedSection delay={0.05}>
            <div className="overflow-x-auto border border-stone-200 bg-white">
              <table className="w-full min-w-[560px] border-collapse">
                <thead>
                  <tr className="bg-stone-900">
                    <th scope="col" className="text-left font-body text-[11px] uppercase tracking-[0.15em] text-gold px-4 py-3">
                      Fototyp
                    </th>
                    <th scope="col" className="text-left font-body text-[11px] uppercase tracking-[0.15em] text-gold px-4 py-3">
                      Charakterystyka
                    </th>
                    <th scope="col" className="text-left font-body text-[11px] uppercase tracking-[0.15em] text-gold px-4 py-3">
                      Depilacja laserowa
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {FOTOTYPY.map((f, i) => (
                    <tr key={f.typ} className={i % 2 ? "bg-stone-50" : "bg-white"}>
                      <td className="px-4 py-3 font-body text-sm text-stone-900 font-medium">{f.typ}</td>
                      <td className="px-4 py-3 font-body text-sm text-stone-600">{f.opis}</td>
                      <td className="px-4 py-3 font-body text-sm text-stone-600">{f.efekt}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ---------- Mity ---------- */}
      <section className="py-14 md:py-20 bg-white">
        <div className="container mx-auto px-4 md:px-8 max-w-5xl">
          <AnimatedSection>
            <SectionHeading center accent="fakty" sub="Osiem przekonań, które najczęściej słyszymy na konsultacjach.">
              Mity o depilacji laserowej i
            </SectionHeading>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-stone-200 border border-stone-200">
            {MITY.map((m, i) => (
              <AnimatedSection key={i} delay={i * 0.04} className="bg-white p-7">
                <p className="font-body text-xs uppercase tracking-[0.18em] text-red-500 mb-2">Mit</p>
                <h3 className="font-heading text-base font-medium text-stone-900 mb-4">„{m.mit}”</h3>
                <p className="font-body text-xs uppercase tracking-[0.18em] text-green-600 mb-2">Fakt</p>
                <p className="font-body text-sm text-stone-600 leading-relaxed">{m.fakt}</p>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Cennik ---------- */}
      <CennikTable
        rows={CENNIK}
        title="Cennik depilacji laserowej"
        sub={`Ceny zgodne z rezerwacją online na Booksy. Pakiet nogi + pachy + bikini kosztuje 750 zł zamiast 970 zł — oszczędzasz ${PAKIET_OSZCZEDNOSC} zł przy każdej wizycie.`}
      />
      <div className="bg-white pb-14 md:pb-20">
        <div className="container mx-auto px-4 md:px-8 max-w-4xl text-center">
          <Link
            to="/uslugi/depilacja-laserowa/cennik"
            className="font-body text-sm uppercase tracking-wider text-gold hover:text-stone-900 transition-colors border-b border-gold/40 pb-1"
          >
            Zobacz koszt całej serii i porównanie z woskowaniem
          </Link>
        </div>
      </div>

      {/* ---------- Opinie ---------- */}
      <section className="py-14 md:py-20 bg-stone-900">
        <div className="container mx-auto px-4 md:px-8 max-w-5xl">
          <AnimatedSection className="text-center mb-10">
            <h2 className="font-heading text-2xl sm:text-3xl font-semibold text-white">
              Opinie o <span className="italic text-gold">depilacji laserowej</span>
            </h2>
            <p className="font-body text-sm text-stone-400 mt-3">
              Ocena {SALON.rating}/5 na podstawie {SALON.reviewCount} opinii w serwisie Booksy
            </p>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {OPINIE.map((o, i) => (
              <AnimatedSection key={i} delay={i * 0.1}>
                <blockquote className="bg-stone-800 border border-stone-700 p-7 h-full">
                  <div className="flex mb-4">
                    {[...Array(o.rating)].map((_, j) => (
                      <Star key={j} className="w-4 h-4 fill-gold text-gold" />
                    ))}
                  </div>
                  <p className="font-body text-sm text-stone-300 leading-relaxed mb-4">„{o.text}”</p>
                  <footer className="font-body text-xs text-stone-500">
                    {o.name} · {o.date} · Depilacja laserowa
                  </footer>
                </blockquote>
              </AnimatedSection>
            ))}
          </div>
          <AnimatedSection delay={0.2} className="text-center mt-10">
            <Link
              to="/opinie"
              className="font-body text-sm uppercase tracking-wider text-gold hover:text-white transition-colors"
            >
              Wszystkie opinie klientów
            </Link>
          </AnimatedSection>
        </div>
      </section>

      {/* ---------- Okolica / local SEO ---------- */}
      <section className="py-14 md:py-20 bg-stone-50">
        <div className="container mx-auto px-4 md:px-8 max-w-4xl">
          <AnimatedSection>
            <SectionHeading center accent="Mazowieckim i okolicach" sub="Salon przy ul. Garbarskiej 17/2, blisko centrum, z miejscami parkingowymi dla klientów.">
              Depilacja laserowa w Grodzisku
            </SectionHeading>
          </AnimatedSection>
          <AnimatedSection delay={0.05}>
            <p className="font-body text-base text-stone-600 leading-relaxed mb-8 text-center max-w-2xl mx-auto">
              Na depilację laserową przyjeżdżają do nas klienci z całego powiatu grodziskiego i zachodnich okolic
              Warszawy. Dojazd od strony Milanówka, Brwinowa i Pruszkowa zajmuje kilkanaście minut, a wolne terminy
              widać na bieżąco w rezerwacji online.
            </p>
          </AnimatedSection>
          <AnimatedSection delay={0.1}>
            <ul className="flex flex-wrap justify-center gap-2">
              {[SALON.city, ...OKOLICE].map((city) => (
                <li
                  key={city}
                  className="inline-flex items-center gap-1.5 bg-white border border-stone-200 px-4 py-2 font-body text-sm text-stone-600"
                >
                  <MapPin className="w-3.5 h-3.5 text-gold" /> {city}
                </li>
              ))}
            </ul>
          </AnimatedSection>
          <AnimatedSection delay={0.15}>
            <div className="text-center mt-8">
              <Link
                to="/kontakt"
                className="font-body text-sm uppercase tracking-wider text-gold hover:text-stone-900 transition-colors border-b border-gold/40 pb-1"
              >
                Dojazd, godziny otwarcia i mapa
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ---------- Słownik ---------- */}
      <section className="py-14 md:py-20 bg-white">
        <div className="container mx-auto px-4 md:px-8 max-w-4xl">
          <AnimatedSection>
            <SectionHeading center accent="pojęć" sub="Terminy, które padają na konsultacji i w opisach zabiegów.">
              Słownik
            </SectionHeading>
          </AnimatedSection>
          <dl className="grid grid-cols-1 md:grid-cols-2 gap-px bg-stone-200 border border-stone-200">
            {SLOWNIK.map((s, i) => (
              <AnimatedSection key={s.term} delay={Math.min(i, 6) * 0.04} className="bg-white p-6">
                <dt className="font-heading text-base font-medium text-stone-900 mb-2">{s.term}</dt>
                <dd className="font-body text-sm text-stone-600 leading-relaxed">{s.def}</dd>
              </AnimatedSection>
            ))}
          </dl>
        </div>
      </section>

      {/* ---------- FAQ ---------- */}
      <FaqList
        items={HUB_FAQ}
        title="Depilacja laserowa —"
        accent="pytania i odpowiedzi"
        sub="Odpowiedzi na pytania, które najczęściej dostajemy przed pierwszą wizytą. Pytania o konkretne strefy znajdziesz na ich podstronach."
      />

      {/* ---------- Powiązane usługi ---------- */}
      <section className="py-14 md:py-20 bg-white">
        <div className="container mx-auto px-4 md:px-8 max-w-4xl">
          <AnimatedSection>
            <SectionHeading center accent="usługi">
              Powiązane
            </SectionHeading>
          </AnimatedSection>
          <AnimatedSection delay={0.05}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-stone-200 border border-stone-200">
              {[
                { name: "Depilacja wąsika nitką", path: "/uslugi/kosmetyka", desc: "Szybka alternatywa doraźna — 15 zł" },
                { name: "Zabiegi na twarz", path: "/uslugi/zabiegi-na-twarz", desc: "Dermaplaning i oczyszczanie" },
                { name: "Modelowanie ciała EMS", path: "/uslugi/modelowanie-ciala", desc: "Technologia HI-EMT — 100 zł" },
                { name: "Pełny cennik salonu", path: "/uslugi", desc: "Wszystkie usługi i ceny" },
              ].map((l) => (
                <Link key={l.path} to={l.path} className="bg-white p-6 hover:bg-stone-50 transition-colors group">
                  <h3 className="font-heading text-base font-medium text-stone-900 mb-1 group-hover:text-gold transition-colors">
                    {l.name}
                  </h3>
                  <p className="font-body text-xs text-stone-500">{l.desc}</p>
                </Link>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      <CtaBand
        title="Umów depilację"
        accent="laserową"
        text="Bezpłatna konsultacja z oceną fototypu skóry i planem serii. Rezerwacja online przez Booksy dostępna całą dobę."
      />

      <div className="bg-stone-50 py-6 border-t border-stone-200">
        <div className="container mx-auto px-4 md:px-8 max-w-7xl">
          <Breadcrumbs items={BREADCRUMBS} />
        </div>
      </div>
    </div>
  );
}
