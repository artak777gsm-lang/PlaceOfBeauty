import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Award, Users, Heart, Clock, MapPin, Car, CreditCard, Dog, Baby } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import SEO from "@/components/SEO";

function AnimatedSection({ children, className = "", delay = 0 }) {
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

const amenityIcons = {
  "Parking": Car,
  "Akceptacja kart płatniczych": CreditCard,
  "Zwierzęta dozwolone": Dog,
  "Przyjazne dla dzieci": Baby,
};

const values = [
  { icon: Award, title: "Profesjonalizm", desc: "Najwyższa jakość zabiegów z użyciem profesjonalnych produktów i nowoczesnego sprzętu." },
  { icon: Users, title: "Indywidualne podejście", desc: "Każdy klient jest wyjątkowy — dopasowujemy zabiegi do indywidualnych potrzeb." },
  { icon: Heart, title: "Pasja", desc: "Kosmetyka to nasza pasja. Dbamy o każdy detal, by zapewnić najlepsze efekty." },
  { icon: Clock, title: "Elastyczność", desc: "Pracujemy od poniedziałku do soboty, by dopasować się do Twojego grafiku." },
];

export default function About() {
  return (
    <div data-testid="about-page">
      <SEO
        title="O nas"
        description="Place of Beauty — profesjonalny salon kosmetyczny w sercu Grodziska Mazowieckiego. Indywidualne podejście, pasja i najwyższa jakość. Ocena 4.9/5 na podstawie 272 opinii."
        keywords="o nas Place of Beauty, salon kosmetyczny Grodzisk opinie, najlepszy salon kosmetyczny, Carika specjalistka, kosmetyczka Grodzisk Mazowiecki"
        path="/o-nas"
      />
      {/* Header */}
      <section className="relative py-24 md:py-32 bg-stone-900 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img
            src="/gallery/465318305602361.jpg"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative z-10 container mx-auto px-4 md:px-8 max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="font-body text-xs uppercase tracking-[0.3em] text-gold mb-4 block">O nas</span>
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl text-white font-semibold mb-4">
              Poznaj <span className="italic">Place of Beauty</span>
            </h1>
            <p className="font-body text-base text-stone-400 max-w-xl">
              Profesjonalny salon kosmetyczny w sercu Grodziska Mazowieckiego.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story */}
      <section className="py-24 md:py-32 bg-stone-50">
        <div className="container mx-auto px-4 md:px-8 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <AnimatedSection>
              <div className="relative">
                <div className="img-zoom">
                  <img
                    src="/gallery/1023899656410887.jpg"
                    alt="Wnętrze salonu Place of Beauty"
                    className="w-full aspect-[4/5] object-cover"
                    data-testid="about-main-image"
                  />
                </div>
                <div className="absolute -bottom-6 -right-6 bg-gold p-6 hidden md:block">
                  <div className="text-center">
                    <span className="font-heading text-3xl font-bold text-white block">4.9</span>
                    <span className="font-body text-xs uppercase tracking-wider text-white/80">Ocena</span>
                  </div>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <span className="font-body text-xs uppercase tracking-[0.2em] text-gold mb-6 block">Nasza historia</span>
              <h2 className="font-heading text-3xl sm:text-4xl font-semibold text-stone-900 mb-6">
                Twoje piękno to nasza <span className="italic">pasja</span>
              </h2>
              <div className="space-y-4 font-body text-sm text-stone-600 leading-relaxed">
                <p>
                  Place of Beauty to salon kosmetyczny w Grodzisku Mazowieckim, który powstał z miłości do piękna i profesjonalnej pielęgnacji. Oferujemy szeroką gamę zabiegów — od stylizacji paznokci, przez depilację laserową Primelase, po zabiegi pielęgnacyjne na twarz.
                </p>
                <p>
                  Nasz salon to miejsce, gdzie nowoczesne technologie spotykają się z ciepłą, przyjazną atmosferą. Każdy klient jest dla nas wyjątkowy, dlatego indywidualnie dobieramy zabiegi i produkty do potrzeb skóry.
                </p>
                <p>
                  Z dumą możemy pochwalić się oceną 4.9 na podstawie 272 opinii naszych zadowolonych klientów. To dla nas najlepsza motywacja do dalszego rozwoju i doskonalenia naszych usług.
                </p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 md:py-32 bg-white">
        <div className="container mx-auto px-4 md:px-8 max-w-7xl">
          <AnimatedSection className="mb-16">
            <span className="font-body text-xs uppercase tracking-[0.2em] text-gold mb-4 block">Nasze wartości</span>
            <h2 className="font-heading text-3xl sm:text-4xl font-semibold text-stone-900">
              Dlaczego <span className="italic">my</span>?
            </h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((v, i) => {
              const Icon = v.icon;
              return (
                <AnimatedSection key={i} delay={i * 0.1}>
                  <Card className="service-card p-6 rounded-none border border-stone-200 h-full" data-testid={`value-card-${i}`}>
                    <div className="w-12 h-12 bg-gold/10 flex items-center justify-center mb-5">
                      <Icon className="w-5 h-5 text-gold" />
                    </div>
                    <h3 className="font-heading text-lg font-medium text-stone-900 mb-2">{v.title}</h3>
                    <p className="font-body text-sm text-stone-500 leading-relaxed">{v.desc}</p>
                  </Card>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-24 md:py-32 bg-stone-50">
        <div className="container mx-auto px-4 md:px-8 max-w-7xl">
          <AnimatedSection className="mb-16">
            <span className="font-body text-xs uppercase tracking-[0.2em] text-gold mb-4 block">Nasz zespół</span>
            <h2 className="font-heading text-3xl sm:text-4xl font-semibold text-stone-900">
              Specjalistki <span className="italic">Place of Beauty</span>
            </h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatedSection>
              <Card className="service-card rounded-none border-0 overflow-hidden" data-testid="team-member-0">
                <div className="aspect-[3/4] img-zoom">
                  <img
                    src="/gallery/1185245526942965.jpg"
                    alt="Carika - specjalistka"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6 bg-white">
                  <h3 className="font-heading text-xl font-medium text-stone-900">Carika</h3>
                  <p className="font-body text-sm text-gold mt-1">Główna specjalistka</p>
                  <p className="font-body text-xs text-stone-500 mt-3 leading-relaxed">
                    Specjalizacja: manicure, pedicure, stylizacja paznokci, depilacja laserowa Primelase, piercing, kosmetyka
                  </p>
                </div>
              </Card>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Amenities */}
      <section className="py-24 md:py-32 bg-white">
        <div className="container mx-auto px-4 md:px-8 max-w-7xl">
          <AnimatedSection className="mb-16">
            <span className="font-body text-xs uppercase tracking-[0.2em] text-gold mb-4 block">Udogodnienia</span>
            <h2 className="font-heading text-3xl sm:text-4xl font-semibold text-stone-900">
              Komfort <span className="italic">naszych gości</span>
            </h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {["Parking", "Akceptacja kart płatniczych", "Zwierzęta dozwolone", "Przyjazne dla dzieci"].map((amenity, i) => {
              const Icon = amenityIcons[amenity] || Heart;
              return (
                <AnimatedSection key={amenity} delay={i * 0.08}>
                  <div className="flex items-center gap-4 p-5 border border-stone-200 bg-stone-50" data-testid={`amenity-${i}`}>
                    <Icon className="w-5 h-5 text-gold flex-shrink-0" />
                    <span className="font-body text-sm text-stone-700">{amenity}</span>
                  </div>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 md:py-32 bg-stone-50">
        <div className="container mx-auto px-4 md:px-8 max-w-4xl">
          <AnimatedSection className="mb-12 text-center">
            <span className="font-body text-xs uppercase tracking-[0.2em] text-gold mb-4 block">FAQ</span>
            <h2 className="font-heading text-3xl sm:text-4xl font-semibold text-stone-900">
              Najczęstsze <span className="italic">pytania</span>
            </h2>
          </AnimatedSection>

          <div className="space-y-4">
            {[
              { q: "Gdzie znajduje się salon Place of Beauty?", a: "Nasz salon mieści się przy ul. Garbarskiej 17/2 w Grodzisku Mazowieckim (05-825). Oferujemy parking dla klientów." },
              { q: "Jak umówić wizytę?", a: "Wizytę można umówić online przez Booksy (dostępne 24/7) lub telefonicznie pod numerem +48 881 777 437." },
              { q: "Jakie usługi oferuje salon?", a: "Oferujemy manicure hybrydowe i klasyczne, pedicure, stylizację paznokci żelowych, depilację laserową Primelase, zabiegi na twarz, makijaż okazjonalny i ślubny, henna brwi i rzęs, piercing oraz modelowanie ciała EMS." },
              { q: "Ile kosztuje manicure hybrydowy?", a: "Manicure hybrydowy kosztuje 120 zł i trwa około 1 godziny. Manicure klasyczny bez malowania — 70 zł, z malowaniem — 80 zł." },
              { q: "Ile kosztuje depilacja laserowa?", a: "Ceny depilacji laserowej Primelase: pachy — 200 zł, wąsik — 100 zł, bikini płytkie — 220 zł, bikini głębokie — 300 zł, całe nogi — 550 zł, pakiet (nogi + pachy + bikini) — 750 zł." },
              { q: "W jakich godzinach otwarty jest salon?", a: "Salon jest otwarty od poniedziałku do soboty w godzinach 9:00–20:00. W niedzielę zamknięte." },
              { q: "Czy w salonie można płacić kartą?", a: "Tak, akceptujemy płatności kartą oraz gotówką. Dostępny jest również parking dla klientów." },
            ].map((item, i) => (
              <AnimatedSection key={i} delay={i * 0.05}>
                <details className="group bg-white border border-stone-200 p-6 cursor-pointer" data-testid={`faq-${i}`}>
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
    </div>
  );
}
