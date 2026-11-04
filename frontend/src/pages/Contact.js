import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { MapPin, Phone, Clock, Facebook, Instagram, ArrowRight, Navigation } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import SEO from "@/components/SEO";
import { FaqList } from "@/components/depilacja/Blocks";
import { faqJsonLd } from "@/lib/seoSchema";

const BOOKSY_URL = "https://booksy.com/pl-pl/103643_place-of-beauty-carika_paznokcie_4424_grodzisk-mazowiecki";

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

// Udogodnienia (parking, karta, dzieci, zwierzęta) — jak na profilu Booksy.
// Godziny: salon pracuje pn–sob 9–20, a Booksy celowo pokazuje terminy tylko
// do 16:00 — wizyty po 16:00 salon umawia telefonicznie (05.11.2026).
const CONTACT_FAQ = [
  {
    q: "Gdzie dokładnie jest salon Place of Beauty?",
    a: "Przy ul. Garbarskiej 17/2 w Grodzisku Mazowieckim (05-825), na rogu ulicy Bałtyckiej. Z Milanówka, Brwinowa, Podkowy Leśnej i Pruszkowa dojazd samochodem zajmuje kilkanaście minut.",
  },
  {
    q: "Czy salon jest czynny w soboty?",
    a: "Tak. Place of Beauty jest czynny od poniedziałku do soboty w godzinach 9:00–20:00. W niedziele salon jest zamknięty.",
  },
  {
    q: "Dlaczego na Booksy nie widać terminów po 16:00?",
    a: "Rezerwacja online na Booksy obejmuje wizyty do 16:00. Salon pracuje do 20:00 — na wizytę po 16:00 umówisz się telefonicznie pod numerem 881 777 437.",
  },
  {
    q: "Czy trzeba się wcześniej umówić?",
    a: "Tak, pracujemy według zapisu. Wolne terminy do 16:00 zobaczysz w rezerwacji online na Booksy. Na późniejszą godzinę albo gdy nie widzisz pasującego terminu, zadzwoń pod numer 881 777 437.",
  },
  {
    q: "Czy przy salonie można zaparkować?",
    a: "Tak, przy salonie jest parking dla klientów.",
  },
  {
    q: "Jak można zapłacić?",
    a: "Kartą płatniczą albo gotówką.",
  },
  {
    q: "Czy mogę przyjść z dzieckiem lub z psem?",
    a: "Tak. Salon jest przyjazny dla dzieci, a zwierzęta są mile widziane.",
  },
];

const hours = [
  { day: "Poniedziałek", time: "9:00–20:00", open: true },
  { day: "Wtorek", time: "9:00–20:00", open: true },
  { day: "Środa", time: "9:00–20:00", open: true },
  { day: "Czwartek", time: "9:00–20:00", open: true },
  { day: "Piątek", time: "9:00–20:00", open: true },
  { day: "Sobota", time: "9:00–20:00", open: true },
  { day: "Niedziela", time: "Zamknięte", open: false },
];

export default function Contact() {
  // Liczone po zamontowaniu i pomijane w pre-renderze (headless Chrome ma
  // navigator.webdriver): inaczej HTML zamrażałby "(Dziś)" przy dniu budowy.
  const [dayIndex, setDayIndex] = useState(null);
  useEffect(() => {
    if (navigator.webdriver) return;
    const today = new Date().getDay();
    setDayIndex(today === 0 ? 6 : today - 1);
  }, []);

  return (
    <div data-testid="contact-page">
      <SEO
        title="Kontakt"
        description="Place of Beauty, Garbarska 17/2, Grodzisk Mazowiecki. Tel. +48 881 777 437. Pon.–sob. 9:00–20:00, według zapisu (po 16:00 telefonicznie). Parking, płatność kartą."
        keywords="Place of Beauty kontakt, adres salon Grodzisk Mazowiecki, telefon salon kosmetyczny, godziny otwarcia, Garbarska 17 Grodzisk, dojazd do salonu"
        path="/kontakt"
        jsonLd={faqJsonLd(CONTACT_FAQ)}
      />
      {/* Header */}
      <section className="relative py-24 md:py-32 bg-stone-900 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img
            src="/gallery/1080256257441893.jpg"
            alt="Wnętrze salonu Place of Beauty w Grodzisku Mazowieckim"
            className="w-full h-full object-cover"
            loading="lazy"
            decoding="async"
          />
        </div>
        <div className="relative z-10 container mx-auto px-4 md:px-8 max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="font-body text-xs uppercase tracking-[0.3em] text-gold mb-4 block">Kontakt</span>
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl text-white font-semibold mb-4">
              Kontakt i <span className="italic">dojazd</span>
            </h1>
            <p className="font-body text-base text-stone-300 max-w-3xl leading-relaxed">
              Place of Beauty mieści się przy ul. Garbarskiej 17/2 (róg Bałtyckiej), 05-825 Grodzisk
              Mazowiecki. Salon jest czynny od poniedziałku do soboty w godzinach 9:00–20:00, w niedziele jest
              zamknięty. Pracujemy według zapisu — online na Booksy rezerwujesz wizyty do 16:00, a na
              późniejsze godziny pod numerem +48 881 777 437. Przy salonie jest parking, można płacić kartą.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-24 md:py-32 bg-stone-50">
        <div className="container mx-auto px-4 md:px-8 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            {/* Info */}
            <div>
              <AnimatedSection>
                <span className="font-body text-xs uppercase tracking-[0.2em] text-gold mb-6 block">Dane kontaktowe</span>
                <h2 className="font-heading text-3xl sm:text-4xl font-semibold text-stone-900 mb-10">
                  Zapraszamy do <span className="italic">salonu</span>
                </h2>
              </AnimatedSection>

              <div className="space-y-8">
                <AnimatedSection delay={0.1}>
                  <div className="flex items-start gap-5" data-testid="contact-address">
                    <div className="w-12 h-12 bg-gold/10 flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-5 h-5 text-gold" />
                    </div>
                    <div>
                      <h3 className="font-body text-xs uppercase tracking-[0.15em] text-stone-400 mb-1">Adres</h3>
                      <p className="font-body text-base text-stone-900 font-medium">Garbarska 17/2 (róg Bałtyckiej)</p>
                      <p className="font-body text-sm text-stone-600">05-825 Grodzisk Mazowiecki</p>
                      <a
                        href="https://maps.google.com/?daddr=Garbarska%2017%2F2%2C%2005-825%20Grodzisk%20Mazowiecki%2C%20Poland"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 mt-2 font-body text-xs uppercase tracking-wider text-gold hover:text-stone-900 transition-colors"
                        data-testid="contact-directions-link"
                      >
                        <Navigation className="w-3.5 h-3.5" />
                        Pokaż dojazd
                      </a>
                    </div>
                  </div>
                </AnimatedSection>

                <AnimatedSection delay={0.2}>
                  <div className="flex items-start gap-5" data-testid="contact-phone">
                    <div className="w-12 h-12 bg-gold/10 flex items-center justify-center flex-shrink-0">
                      <Phone className="w-5 h-5 text-gold" />
                    </div>
                    <div>
                      <h3 className="font-body text-xs uppercase tracking-[0.15em] text-stone-400 mb-1">Telefon</h3>
                      <a href="tel:+48881777437" className="font-body text-base text-stone-900 font-medium hover:text-gold transition-colors">
                        +48 881 777 437
                      </a>
                    </div>
                  </div>
                </AnimatedSection>

                <AnimatedSection delay={0.3}>
                  <div className="flex items-start gap-5" data-testid="contact-social">
                    <div className="w-12 h-12 bg-gold/10 flex items-center justify-center flex-shrink-0">
                      <Instagram className="w-5 h-5 text-gold" />
                    </div>
                    <div>
                      <h3 className="font-body text-xs uppercase tracking-[0.15em] text-stone-400 mb-1">Social media</h3>
                      <div className="flex flex-wrap gap-x-6 gap-y-1">
                        <a
                          href="https://www.instagram.com/place_of_beauty_carika/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-body text-base text-stone-900 font-medium hover:text-gold transition-colors"
                        >
                          Instagram
                        </a>
                        <a
                          href="https://www.facebook.com/placeofbeauty"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 font-body text-base text-stone-900 font-medium hover:text-gold transition-colors"
                        >
                          <Facebook className="w-4 h-4" aria-hidden="true" /> Facebook
                        </a>
                      </div>
                    </div>
                  </div>
                </AnimatedSection>

                <Separator className="my-6" />

                <AnimatedSection delay={0.4}>
                  <div data-testid="contact-hours">
                    <div className="flex items-center gap-3 mb-6">
                      <Clock className="w-5 h-5 text-gold" />
                      <h3 className="font-body text-xs uppercase tracking-[0.15em] text-stone-400">Godziny otwarcia</h3>
                    </div>
                    <div className="space-y-3">
                      {hours.map((h, i) => (
                        <div
                          key={h.day}
                          className={`flex justify-between items-center py-2 px-3 ${
                            i === dayIndex ? "bg-gold/10 border-l-2 border-gold" : ""
                          }`}
                          data-testid={`hours-${i}`}
                        >
                          <span className={`font-body text-sm ${i === dayIndex ? "text-stone-900 font-medium" : "text-stone-600"}`}>
                            {h.day}
                            {i === dayIndex && <span className="text-gold text-xs ml-2">(Dziś)</span>}
                          </span>
                          <span className={`font-body text-sm ${h.open ? "text-stone-900" : "text-stone-400"}`}>
                            {h.time}
                          </span>
                        </div>
                      ))}
                    </div>
                    <p className="font-body text-xs text-stone-500 mt-4">
                      Pracujemy według zapisu. Online na Booksy rezerwujesz wizyty do 16:00 — na późniejsze godziny
                      albo gdy nie widzisz pasującego terminu, zadzwoń:{" "}
                      <a href="tel:+48881777437" className="text-gold hover:underline">881 777 437</a>.
                    </p>
                  </div>
                </AnimatedSection>

                <AnimatedSection delay={0.5}>
                  <a href={BOOKSY_URL} target="_blank" rel="noopener noreferrer" data-testid="contact-booksy-btn">
                    <Button className="bg-gold hover:bg-yellow-600 text-white font-body text-sm tracking-wider uppercase px-8 h-12 rounded-none mt-4 w-full sm:w-auto transition-all duration-300">
                      Zarezerwuj wizytę na Booksy
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </a>
                </AnimatedSection>
              </div>
            </div>

            {/* Map */}
            <AnimatedSection delay={0.2}>
              <div className="h-full min-h-[500px]" data-testid="contact-map">
                <iframe
                  title="Place of Beauty - Lokalizacja"
                  // Wyszukanie po nazwie i adresie trafia w wizytówkę salonu;
                  // dawny osadzony link wskazywał inne miejsce (~250 m obok).
                  src="https://maps.google.com/maps?q=Place%20of%20Beauty%20Carika%2C%20Garbarska%2017%2F2%2C%2005-825%20Grodzisk%20Mazowiecki&hl=pl&z=16&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0, minHeight: "500px" }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="grayscale contrast-[1.1]"
                />
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      <FaqList items={CONTACT_FAQ} sub="Dojazd, godziny, parking i płatność." />
    </div>
  );
}
