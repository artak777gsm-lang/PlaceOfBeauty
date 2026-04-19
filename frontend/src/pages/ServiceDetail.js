import { useState, useEffect, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import { ArrowRight, Clock, Phone, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import SEO from "@/components/SEO";
import axios from "axios";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;
const BOOKSY_URL = "https://booksy.com/pl-pl/103643_place-of-beauty-carika_paznokcie_4424_grodzisk-mazowiecki";

function AnimatedSection({ children, className = "", delay = 0 }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={className}
    >{children}</motion.div>
  );
}

const SERVICE_DATA = {
  manicure: {
    category: "Manicure",
    title: "Manicure hybrydowe i klasyczne",
    seoTitle: "Manicure hybrydowe i klasyczne",
    seoDesc: "Profesjonalny manicure hybrydowe w Grodzisku Mazowieckim od 70 zł. Manicure klasyczne, hybrydowe, męskie. Salon Place of Beauty — ocena 4.9/5. Umów wizytę online!",
    seoKeywords: "manicure Grodzisk Mazowiecki, manicure hybrydowe, manicure hybrydowy cena, manicure klasyczne, manicure męski, paznokcie Grodzisk, hybryda paznokcie",
    image: "/gallery/1023044393163080.jpg",
    description: "Manicure to podstawa pięknych dłoni. W naszym salonie oferujemy profesjonalny manicure hybrydowe, klasyczne oraz męskie. Używamy wyłącznie produktów najwyższej jakości, które zapewniają trwałość i piękny wygląd paznokci przez wiele tygodni.",
    benefits: [
      "Trwałość hybrydy do 3 tygodni",
      "Szeroki wybór kolorów i wzorów",
      "Profesjonalne produkty premium",
      "Indywidualne podejście do klienta",
    ],
    faq: [
      { q: "Ile kosztuje manicure hybrydowy?", a: "Manicure hybrydowe kosztuje 120 zł i trwa około 1 godziny." },
      { q: "Jak długo utrzymuje się hybryda?", a: "Przy prawidłowej pielęgnacji manicure hybrydowe utrzymuje się 2-3 tygodnie." },
      { q: "Czy oferujecie manicure dla mężczyzn?", a: "Tak, oferujemy profesjonalny manicure męski za 70 zł." },
    ],
  },
  pedicure: {
    category: "Pedicure",
    title: "Pedicure klasyczne i hybrydowe",
    seoTitle: "Pedicure klasyczne i hybrydowe",
    seoDesc: "Profesjonalny pedicure w Grodzisku Mazowieckim od 140 zł. Pedicure klasyczne, hybrydowe, kwasowe Mavex, lecznicze. Place of Beauty — umów wizytę online!",
    seoKeywords: "pedicure Grodzisk Mazowiecki, pedicure hybrydowe, pedicure kwasowe, pedicure leczniczy, pedicure cena, stopy pielęgnacja",
    image: "/gallery/834394008694787.jpg",
    description: "Zadbane stopy to komfort i piękno przez cały rok. Oferujemy pedicure klasyczne, hybrydowe, kwasowe Mavex oraz lecznicze. Każdy zabieg dobieramy indywidualnie do stanu stóp, zapewniając najlepsze efekty pielęgnacyjne.",
    benefits: [
      "Zabieg kwasowy Mavex — głęboka regeneracja",
      "Pedicure leczniczy dla problematycznych stóp",
      "Profesjonalne narzędzia sterylizowane",
      "Relaksująca atmosfera zabiegu",
    ],
    faq: [
      { q: "Ile kosztuje pedicure?", a: "Pedicure klasyczne z lakierem — 140 zł, z hybrydą — 160 zł, kwasowe z hybrydą — 180 zł." },
      { q: "Czym jest pedicure kwasowe?", a: "Pedicure kwasowe Mavex to zaawansowany zabieg, który głęboko regeneruje skórę stóp za pomocą kwasów." },
      { q: "Jak często robić pedicure?", a: "Zalecamy pedicure co 3-4 tygodnie, aby stopy były zawsze zadbane." },
    ],
  },
  "depilacja-laserowa": {
    category: "Depilacja laserowa",
    title: "Depilacja laserowa Primelase",
    seoTitle: "Depilacja laserowa Primelase",
    seoDesc: "Depilacja laserowa Primelase w Grodzisku Mazowieckim. Pachy 200 zł, nogi 550 zł, bikini od 220 zł. Trwałe usuwanie owłosienia. Salon Place of Beauty — umów wizytę!",
    seoKeywords: "depilacja laserowa Grodzisk Mazowiecki, depilacja laserowa Primelase, depilacja laserowa cena, laser pachy, laser bikini, laser nogi, usuwanie owłosienia",
    image: "/gallery/1197425395724978.jpg",
    description: "Depilacja laserowa Primelase to najnowocześniejsza technologia trwałego usuwania owłosienia. Zabieg jest bezpieczny, skuteczny i niemal bezbolesny. Laser Primelase działa na wszystkie fototypy skóry, zapewniając trwałe efekty już po kilku sesjach.",
    benefits: [
      "Technologia Primelase — najwyższa skuteczność",
      "Bezbolesny i bezpieczny zabieg",
      "Efekty widoczne po pierwszym zabiegu",
      "Trwałe usunięcie owłosienia po serii zabiegów",
    ],
    faq: [
      { q: "Ile kosztuje depilacja laserowa?", a: "Ceny: pachy — 200 zł, wąsik — 100 zł, bikini płytkie — 220 zł, bikini głębokie — 300 zł, całe nogi — 550 zł, pakiet (nogi + pachy + bikini) — 750 zł." },
      { q: "Ile zabiegów potrzeba?", a: "Dla optymalnych efektów zalecamy serię 6-8 zabiegów w odstępach co 4-6 tygodni." },
      { q: "Czy depilacja laserowa jest bolesna?", a: "Laser Primelase ma wbudowany system chłodzenia, dzięki czemu zabieg jest niemal bezbolesny." },
      { q: "Jak przygotować się do zabiegu?", a: "Dzień przed zabiegiem należy ogolić okolicę poddawaną depilacji. Nie należy się opalać 2 tygodnie przed zabiegiem." },
    ],
  },
  "zabiegi-na-twarz": {
    category: "Zabiegi na twarz",
    title: "Zabiegi na twarz",
    seoTitle: "Zabiegi na twarz — dermaplaning, oczyszczanie",
    seoDesc: "Profesjonalne zabiegi na twarz w Grodzisku Mazowieckim. Dermaplaning, oczyszczanie twarzy, zabieg przeciwtrądzikowy. Salon Place of Beauty — umów wizytę!",
    seoKeywords: "zabiegi na twarz Grodzisk Mazowiecki, dermaplaning, oczyszczanie twarzy, zabieg przeciwtrądzikowy, kosmetyczka Grodzisk, pielęgnacja twarzy",
    image: "/gallery/1185245526942965.jpg",
    description: "Profesjonalne zabiegi na twarz dostosowane do indywidualnych potrzeb Twojej skóry. Oferujemy dermaplaning, głębokie oczyszczanie twarzy oraz specjalistyczne zabiegi przeciwtrądzikowe. Każdy zabieg poprzedza konsultacja, aby dobrać najlepszą pielęgnację.",
    benefits: [
      "Dermaplaning — natychmiastowy efekt gładkiej skóry",
      "Głębokie oczyszczanie porów",
      "Profesjonalne produkty kosmetyczne",
      "Indywidualny dobór zabiegu do typu skóry",
    ],
    faq: [
      { q: "Czym jest dermaplaning?", a: "Dermaplaning to zabieg złuszczający warstwę martwego naskórka i delikatny meszek z twarzy, poprawiający wygląd i wchłanianie kosmetyków." },
      { q: "Jak często robić oczyszczanie twarzy?", a: "Zalecamy oczyszczanie twarzy co 4-6 tygodni, w zależności od typu skóry." },
      { q: "Czy zabiegi są odpowiednie dla skóry wrażliwej?", a: "Tak, dobieramy zabiegi indywidualnie — mamy opcje również dla skóry wrażliwej i problematycznej." },
    ],
  },
  "stylizacja-paznokci": {
    category: "Stylizacja paznokci",
    title: "Stylizacja paznokci żelowych",
    seoTitle: "Przedłużanie i stylizacja paznokci żelowych",
    seoDesc: "Przedłużanie paznokci żelowych w Grodzisku Mazowieckim od 180 zł. Stylizacja, uzupełnienie żelowe. Salon Place of Beauty — piękne paznokcie na każdą okazję!",
    seoKeywords: "paznokcie żelowe Grodzisk Mazowiecki, przedłużanie paznokci, uzupełnienie żelowe, stylizacja paznokci, paznokcie żelowe cena, tipsy Grodzisk",
    image: "/gallery/840030858131102.jpg",
    description: "Paznokcie żelowe to idealne rozwiązanie dla osób pragnących długich, pięknych paznokci. Oferujemy przedłużanie metodą żelową oraz regularne uzupełnienia. Tworzymy stylizacje na każdą okazję — od eleganckich po artystyczne.",
    benefits: [
      "Trwałość do 4 tygodni",
      "Naturalne i eleganckie wykończenie",
      "Bogaty wybór kolorów i zdobień",
      "Wzmocnienie naturalnych paznokci",
    ],
    faq: [
      { q: "Ile kosztuje przedłużanie paznokci żelowych?", a: "Przedłużanie żelowe od 180 zł, uzupełnienie — 150 zł." },
      { q: "Jak długo trwa zabieg?", a: "Przedłużanie zajmuje ok. 1,5 godziny, uzupełnienie — ok. 1 godz. 15 min." },
      { q: "Jak często robić uzupełnienie?", a: "Uzupełnienie paznokci żelowych zalecamy co 3-4 tygodnie." },
    ],
  },
  kosmetyka: {
    category: "Kosmetyka",
    title: "Kosmetyka — henna brwi i rzęs",
    seoTitle: "Henna brwi i rzęs, regulacja brwi",
    seoDesc: "Henna brwi i rzęs w Grodzisku Mazowieckim od 20 zł. Regulacja brwi, depilacja wąsika nitką. Salon Place of Beauty — szybko, precyzyjnie, profesjonalnie!",
    seoKeywords: "henna brwi Grodzisk Mazowiecki, henna rzęs, regulacja brwi, depilacja wąsika nitką, brwi Grodzisk, kosmetyczka",
    image: "/gallery/632346295566227.jpg",
    description: "Zadbane brwi i rzęsy podkreślają piękno twarzy. Oferujemy profesjonalną hennę brwi i rzęs, precyzyjną regulację brwi oraz depilację wąsika metodą nitkową — szybką i delikatną alternatywę dla wosku.",
    benefits: [
      "Precyzyjna regulacja kształtu brwi",
      "Trwała henna — efekt do 4 tygodni",
      "Depilacja nitką — delikatna metoda",
      "Zabieg trwa zaledwie kilka minut",
    ],
    faq: [
      { q: "Ile kosztuje henna brwi?", a: "Henna brwi — 30 zł, henna + regulacja — 40 zł, henna rzęs — 30 zł, regulacja brwi — 20 zł." },
      { q: "Jak długo utrzymuje się henna?", a: "Efekt henny utrzymuje się 3-4 tygodnie, w zależności od typu skóry." },
      { q: "Czym jest depilacja nitką?", a: "Depilacja nitką to starożytna metoda usuwania włosków za pomocą nici bawełnianej — szybka, precyzyjna i delikatna (15 zł, 5 min)." },
    ],
  },
  piercing: {
    category: "Piercing",
    title: "Profesjonalny piercing",
    seoTitle: "Przekłuwanie uszu i nosa — piercing",
    seoDesc: "Profesjonalny piercing uszu i nosa w Grodzisku Mazowieckim. Przekłuwanie uszu od 100 zł, nosa 180 zł. Bezpieczne, sterylne warunki. Salon Place of Beauty!",
    seoKeywords: "piercing Grodzisk Mazowiecki, przekłuwanie uszu, przekłuwanie nosa, piercing uszy cena, piercing nos, kolczyk ucho Grodzisk",
    image: "/gallery/722422606558595.jpg",
    description: "Profesjonalny piercing uszu i nosa w bezpiecznych, sterylnych warunkach. Używamy wyłącznie jednorazowych narzędzi i biżuterii najwyższej jakości. Zabieg jest szybki i niemal bezbolesny.",
    benefits: [
      "Sterylne jednorazowe narzędzia",
      "Biżuteria najwyższej jakości",
      "Bezbolesna procedura",
      "Instrukcja pielęgnacji po zabiegu",
    ],
    faq: [
      { q: "Ile kosztuje piercing uszu?", a: "Przekłuwanie uszu od 100 zł w zależności od lokalizacji. Przekłuwanie nosa — 180 zł." },
      { q: "Czy piercing jest bolesny?", a: "Zabieg jest bardzo szybki i niemal bezbolesny. Trwa zaledwie kilka sekund." },
      { q: "Jak pielęgnować piercing po zabiegu?", a: "Po zabiegu otrzymasz szczegółową instrukcję pielęgnacji. Należy dezynfekować miejsce przekłucia 2 razy dziennie przez 4-6 tygodni." },
    ],
  },
  "modelowanie-ciala": {
    category: "Modelowanie ciała",
    title: "Modelowanie ciała EMS",
    seoTitle: "Elektrostymulacja mięśni EMS — modelowanie ciała",
    seoDesc: "Modelowanie ciała EMS w Grodzisku Mazowieckim — 100 zł za zabieg. Technologia HI-EMT: budowanie mięśni i redukcja tkanki tłuszczowej. Salon Place of Beauty!",
    seoKeywords: "EMS Grodzisk Mazowiecki, modelowanie ciała, elektrostymulacja mięśni, HI-EMT, redukcja tkanki tłuszczowej, odchudzanie Grodzisk",
    image: "/gallery/1137041761763342.jpg",
    description: "Elektrostymulacja mięśni EMS to nowoczesna technologia HI-EMT, która buduje mięśnie i redukuje tkankę tłuszczową bez wysiłku fizycznego. Jeden 30-minutowy zabieg odpowiada kilku tysiącom skurczów mięśni — efekty widoczne już po pierwszej sesji.",
    benefits: [
      "Technologia HI-EMT — najnowsza generacja",
      "Budowanie mięśni bez wysiłku",
      "Redukcja tkanki tłuszczowej",
      "30 minut = tysięce skurczów mięśni",
    ],
    faq: [
      { q: "Ile kosztuje zabieg EMS?", a: "Jeden zabieg EMS kosztuje 100 zł i trwa 30 minut." },
      { q: "Ile zabiegów potrzeba?", a: "Dla optymalnych efektów zalecamy serię 4-6 zabiegów w odstępach 2-3 dni." },
      { q: "Czy EMS jest bezpieczne?", a: "Tak, technologia HI-EMT jest w pełni bezpieczna i nieinwazyjna. Nie wymaga okresu rekonwalescencji." },
    ],
  },
};

export default function ServiceDetail() {
  const { slug } = useParams();
  const data = SERVICE_DATA[slug];
  const [services, setServices] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (data) {
      axios.get(`${API}/services/${encodeURIComponent(data.category)}`).then(r => setServices(r.data)).catch(() => {});
    }
  }, [slug, data]);

  if (!data) {
    return (
      <div className="py-32 text-center">
        <h1 className="font-heading text-3xl text-stone-900 mb-4">Usługa nie znaleziona</h1>
        <Link to="/uslugi" className="text-gold hover:underline">Wróć do listy usług</Link>
      </div>
    );
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": data.title,
    "description": data.seoDesc,
    "provider": {
      "@type": "BeautySalon",
      "name": "Place of Beauty",
      "address": { "@type": "PostalAddress", "streetAddress": "Garbarska 17/2", "addressLocality": "Grodzisk Mazowiecki", "postalCode": "05-825", "addressCountry": "PL" },
    },
    "areaServed": { "@type": "City", "name": "Grodzisk Mazowiecki" },
    ...(services.length > 0 && services[0].price !== "Zapytaj o cenę" ? {
      "offers": services.filter(s => s.price !== "Zapytaj o cenę").map(s => ({
        "@type": "Offer",
        "name": s.name,
        "price": s.price.replace(/[^\d]/g, ""),
        "priceCurrency": "PLN",
      })),
    } : {}),
  };

  return (
    <div>
      <SEO
        title={data.seoTitle}
        description={data.seoDesc}
        keywords={data.seoKeywords}
        path={`/uslugi/${slug}`}
        image={`https://placeof.beauty${data.image}`}
        jsonLd={jsonLd}
      />

      {/* Hero */}
      <section className="relative py-24 md:py-32 bg-stone-900 overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <img src={data.image} alt={data.title} className="w-full h-full object-cover" loading="eager" decoding="async" />
        </div>
        <div className="relative z-10 container mx-auto px-4 md:px-8 max-w-7xl">
          <Link to="/uslugi" className="inline-flex items-center gap-1 font-body text-xs uppercase tracking-wider text-gold hover:text-white transition-colors mb-6">
            <ChevronLeft className="w-4 h-4" /> Wszystkie usługi
          </Link>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="font-body text-xs uppercase tracking-[0.3em] text-gold mb-4 block">{data.category}</span>
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl text-white font-semibold mb-4">
              {data.title}
            </h1>
          </motion.div>
        </div>
      </section>

      {/* Description + Benefits */}
      <section className="py-16 md:py-24 bg-stone-50">
        <div className="container mx-auto px-4 md:px-8 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            <AnimatedSection>
              <h2 className="font-heading text-3xl font-semibold text-stone-900 mb-6">
                O <span className="italic">zabiegu</span>
              </h2>
              <p className="font-body text-base text-stone-600 leading-relaxed mb-8">{data.description}</p>
              <a href={BOOKSY_URL} target="_blank" rel="noopener noreferrer">
                <Button className="bg-gold hover:bg-yellow-600 text-white font-body text-sm tracking-wider uppercase px-8 h-12 rounded-none">
                  Umów wizytę <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </a>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <div className="bg-white border border-stone-200 p-8">
                <h3 className="font-heading text-xl font-semibold text-stone-900 mb-6">Dlaczego warto?</h3>
                <div className="space-y-4">
                  {data.benefits.map((b, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-gold/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-gold text-xs font-bold">{i + 1}</span>
                      </div>
                      <p className="font-body text-sm text-stone-700">{b}</p>
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Price List */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 md:px-8 max-w-4xl">
          <AnimatedSection>
            <h2 className="font-heading text-3xl font-semibold text-stone-900 mb-2 text-center">
              Cennik
            </h2>
            <p className="font-body text-sm text-stone-400 text-center mb-10">Kategoria: {data.category}</p>
          </AnimatedSection>

          <div className="space-y-1">
            {services.map((s, i) => (
              <AnimatedSection key={s.id} delay={i * 0.05}>
                <div className="flex items-center justify-between p-5 bg-stone-50 hover:bg-stone-100 border border-stone-100 transition-all duration-300">
                  <div className="flex-1 mr-4">
                    <h3 className="font-body text-sm font-medium text-stone-900">{s.name}</h3>
                    {s.description && <p className="font-body text-xs text-stone-400 mt-0.5">{s.description}</p>}
                  </div>
                  <div className="flex items-center gap-4 flex-shrink-0">
                    <div className="flex items-center gap-1 text-stone-400">
                      <Clock className="w-3.5 h-3.5" />
                      <span className="font-body text-xs">{s.duration}</span>
                    </div>
                    <Badge className="bg-stone-900 text-white font-body text-xs px-3 py-1 rounded-none">{s.price}</Badge>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>

          {services.length === 0 && (
            <p className="text-center font-body text-stone-400 py-8">Ładowanie cennika...</p>
          )}
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 md:py-24 bg-stone-50">
        <div className="container mx-auto px-4 md:px-8 max-w-4xl">
          <AnimatedSection className="text-center mb-12">
            <h2 className="font-heading text-3xl font-semibold text-stone-900">
              Najczęstsze <span className="italic">pytania</span>
            </h2>
          </AnimatedSection>

          <div className="space-y-4">
            {data.faq.map((item, i) => (
              <AnimatedSection key={i} delay={i * 0.05}>
                <details className="group bg-white border border-stone-200 p-6 cursor-pointer">
                  <summary className="font-body text-base font-medium text-stone-900 list-none flex justify-between items-center">
                    {item.q}
                    <span className="text-gold text-xl group-open:rotate-45 transition-transform">+</span>
                  </summary>
                  <p className="font-body text-sm text-stone-600 leading-relaxed mt-4">{item.a}</p>
                </details>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-stone-900">
        <div className="container mx-auto px-4 md:px-8 max-w-7xl text-center">
          <AnimatedSection>
            <h2 className="font-heading text-2xl sm:text-3xl text-white font-semibold mb-4">
              Umów wizytę na <span className="italic text-gold">{data.category.toLowerCase()}</span>
            </h2>
            <p className="font-body text-sm text-stone-400 mb-8 max-w-md mx-auto">
              Zarezerwuj termin online przez Booksy lub zadzwoń.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a href={BOOKSY_URL} target="_blank" rel="noopener noreferrer">
                <Button className="bg-gold hover:bg-yellow-600 text-white font-body text-sm tracking-wider uppercase px-10 h-12 rounded-none">
                  Umów wizytę na Booksy <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </a>
              <a href="tel:+48881777437">
                <Button variant="outline" className="border-white/30 text-white hover:bg-white/10 font-body text-sm tracking-wider uppercase px-10 h-12 rounded-none bg-transparent">
                  <Phone className="w-4 h-4 mr-2" /> 881 777 437
                </Button>
              </a>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}

export { SERVICE_DATA };
