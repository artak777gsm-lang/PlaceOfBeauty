import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { ArrowRight, Star, Clock, MapPin, Sparkles, Scissors, Heart, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import axios from "axios";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;
const BOOKSY_URL = "https://booksy.com/pl-pl/103643_place-of-beauty-carika_paznokcie_4424_grodzisk-mazowiecki";

function AnimatedSection({ children, className = "", delay = 0 }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.7, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function Hero() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 600], [0, 150]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);

  return (
    <section data-testid="hero-section" className="relative h-[100vh] min-h-[600px] overflow-hidden">
      <motion.div style={{ y }} className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1659422980942-e17d377656d9?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzl8MHwxfHNlYXJjaHwxfHx3b21hbiUyMGJlYXV0aWZ1bCUyMHNraW4lMjBmYWNlJTIwbWFrZXVwJTIwY2xvc2UlMjB1cCUyMGx1eHVyeXxlbnwwfHx8fDE3NzQ0MTc5NzV8MA&ixlib=rb-4.1.0&q=85"
          alt="Place of Beauty - salon kosmetyczny"
          className="w-full h-full object-cover scale-105"
        />
        <div className="absolute inset-0 hero-gradient" />
      </motion.div>

      <motion.div
        style={{ opacity }}
        className="relative z-10 h-full flex items-center"
      >
        <div className="container mx-auto px-4 md:px-8 max-w-7xl">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="mb-4"
            >
              <span className="font-body text-xs uppercase tracking-[0.3em] text-white/70">
                Salon kosmetyczny &bull; Grodzisk Mazowiecki
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="font-heading text-4xl sm:text-5xl lg:text-6xl text-white font-semibold leading-tight mb-6"
            >
              Piękno, na które <span className="italic text-gold-light">zasługujesz</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="font-body text-base md:text-lg text-white/80 mb-10 max-w-lg leading-relaxed"
            >
              Odkryj profesjonalną pielęgnację i luksusowe zabiegi w sercu Grodziska Mazowieckiego.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <a href={BOOKSY_URL} target="_blank" rel="noopener noreferrer" data-testid="hero-booksy-btn">
                <Button className="bg-gold hover:bg-yellow-600 text-white font-body text-sm tracking-wider uppercase px-8 h-12 rounded-none transition-all duration-300 flex items-center gap-2">
                  Umów wizytę
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </a>
              <Link to="/uslugi" data-testid="hero-services-btn">
                <Button variant="outline" className="border-white/30 text-white hover:bg-white/10 font-body text-sm tracking-wider uppercase px-8 h-12 rounded-none transition-all duration-300 bg-transparent">
                  Nasze usługi
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.8 }}
          className="w-6 h-10 border-2 border-white/40 rounded-full flex items-start justify-center p-1.5"
        >
          <motion.div className="w-1.5 h-1.5 bg-white/60 rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
}

const featureIcons = [Sparkles, Scissors, Heart];
const features = [
  { title: "Profesjonalizm", desc: "Zespół doświadczonych specjalistów" },
  { title: "Szeroka oferta", desc: "Od manicure po depilację laserową" },
  { title: "Zadowolenie klientów", desc: "Ocena 4.9 na podstawie 272 opinii" },
];

function FeaturesBar() {
  return (
    <section data-testid="features-section" className="bg-stone-900 py-12 md:py-16">
      <div className="container mx-auto px-4 md:px-8 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((f, i) => {
            const Icon = featureIcons[i];
            return (
              <AnimatedSection key={i} delay={i * 0.1}>
                <div className="flex items-start gap-4" data-testid={`feature-${i}`}>
                  <div className="w-10 h-10 border border-gold/30 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5 text-gold" />
                  </div>
                  <div>
                    <h3 className="font-heading text-lg text-stone-50 font-medium mb-1">{f.title}</h3>
                    <p className="font-body text-sm text-stone-400">{f.desc}</p>
                  </div>
                </div>
              </AnimatedSection>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function ServicesPreview() {
  const [categories, setCategories] = useState([]);
  const [services, setServices] = useState([]);

  useEffect(() => {
    axios.get(`${API}/categories`).then((r) => setCategories(r.data.slice(0, 6))).catch(() => {});
    axios.get(`${API}/services`).then((r) => setServices(r.data)).catch(() => {});
  }, []);

  const categoryImages = {
    "Manicure": "https://images.unsplash.com/photo-1772322586649-fc11154e76b9?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1MDV8MHwxfHNlYXJjaHwxfHxiZWF1dHklMjBzYWxvbiUyMG5haWwlMjBhcnQlMjBtYW5pY3VyZSUyMGNsb3NlJTIwdXB8ZW58MHx8fHwxNzc0NDE4MTA3fDA&ixlib=rb-4.1.0&q=85",
    "Pedicure": "https://images.pexels.com/photos/3997388/pexels-photo-3997388.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    "Depilacja laserowa": "https://images.pexels.com/photos/7664093/pexels-photo-7664093.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    "Kosmetyka": "https://images.unsplash.com/photo-1674867374000-a0a3178badfc?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzl8MHwxfHNlYXJjaHw0fHx3b21hbiUyMGJlYXV0aWZ1bCUyMHNraW4lMjBmYWNlJTIwbWFrZXVwJTIwY2xvc2UlMjB1cCUyMGx1eHVyeXxlbnwwfHx8fDE3NzQ0MTc5NzV8MA&ixlib=rb-4.1.0&q=85",
    "Zabiegi na twarz": "https://images.unsplash.com/photo-1659422980942-e17d377656d9?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzl8MHwxfHNlYXJjaHwxfHx3b21hbiUyMGJlYXV0aWZ1bCUyMHNraW4lMjBmYWNlJTIwbWFrZXVwJTIwY2xvc2UlMjB1cCUyMGx1eHVyeXxlbnwwfHx8fDE3NzQ0MTc5NzV8MA&ixlib=rb-4.1.0&q=85",
    "Stylizacja paznokci": "https://images.unsplash.com/photo-1615146038466-ea2f700c5deb?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1MDV8MHwxfHNlYXJjaHwyfHxiZWF1dHklMjBzYWxvbiUyMG5haWwlMjBhcnQlMjBtYW5pY3VyZSUyMGNsb3NlJTIwdXB8ZW58MHx8fHwxNzc0NDE4MTA3fDA&ixlib=rb-4.1.0&q=85",
    "Makijaż": "https://images.pexels.com/photos/4974568/pexels-photo-4974568.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    "Modelowanie ciała": "https://images.pexels.com/photos/13068357/pexels-photo-13068357.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    "Piercing": "https://images.pexels.com/photos/1654834/pexels-photo-1654834.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  };

  return (
    <section data-testid="services-preview" className="py-24 md:py-32 bg-stone-50">
      <div className="container mx-auto px-4 md:px-8 max-w-7xl">
        <AnimatedSection>
          <div className="mb-16">
            <span className="font-body text-xs uppercase tracking-[0.2em] text-gold mb-4 block">Nasze usługi</span>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-semibold text-stone-900 mb-4">
              Odkryj naszą <span className="italic">ofertę</span>
            </h2>
            <p className="font-body text-base text-stone-500 max-w-xl">
              Profesjonalne zabiegi kosmetyczne dopasowane do Twoich potrzeb.
            </p>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat, i) => {
            const count = services.filter((s) => s.category === cat).length;
            return (
              <AnimatedSection key={cat} delay={i * 0.08}>
                <Link to="/uslugi" data-testid={`service-card-${i}`}>
                  <Card className="service-card group relative overflow-hidden rounded-none border-0 bg-white h-72 cursor-pointer">
                    <div className="absolute inset-0 img-zoom">
                      <img
                        src={categoryImages[cat] || categoryImages["Manicure"]}
                        alt={cat}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-stone-900/40 group-hover:bg-stone-900/60 transition-all duration-500" />
                    </div>
                    <div className="relative z-10 h-full flex flex-col justify-end p-6">
                      <span className="font-body text-xs uppercase tracking-[0.15em] text-gold mb-1">{count} usług</span>
                      <h3 className="font-heading text-xl text-white font-medium">{cat}</h3>
                    </div>
                  </Card>
                </Link>
              </AnimatedSection>
            );
          })}
        </div>

        <AnimatedSection delay={0.4} className="text-center mt-12">
          <Link to="/uslugi" data-testid="all-services-btn">
            <Button variant="outline" className="border-stone-300 text-stone-700 hover:border-gold hover:text-gold font-body text-sm tracking-wider uppercase px-8 h-12 rounded-none transition-all duration-300">
              Zobacz pełną ofertę
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </AnimatedSection>
      </div>
    </section>
  );
}

function ReviewsPreview() {
  const [reviews, setReviews] = useState([]);
  useEffect(() => {
    axios.get(`${API}/reviews`).then((r) => setReviews(r.data)).catch(() => {});
  }, []);

  return (
    <section data-testid="reviews-preview" className="py-24 md:py-32 bg-white overflow-hidden">
      <div className="container mx-auto px-4 md:px-8 max-w-7xl mb-12">
        <AnimatedSection>
          <span className="font-body text-xs uppercase tracking-[0.2em] text-gold mb-4 block">Opinie klientów</span>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-semibold text-stone-900">
              Zaufali <span className="italic">nam</span>
            </h2>
            <div className="flex items-center gap-3">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-gold text-gold" />
                ))}
              </div>
              <span className="font-body text-sm text-stone-500">4.9 / 5 &bull; 272 opinie</span>
            </div>
          </div>
        </AnimatedSection>
      </div>

      <div className="relative">
        <div className="flex animate-marquee whitespace-nowrap">
          {[...reviews, ...reviews].map((review, i) => (
            <div key={i} className="inline-block w-[350px] mx-3 flex-shrink-0">
              <Card className="p-6 rounded-none border border-stone-200 bg-stone-50 h-full whitespace-normal">
                <div className="flex mb-3">
                  {[...Array(review.rating)].map((_, j) => (
                    <Star key={j} className="w-4 h-4 fill-gold text-gold" />
                  ))}
                </div>
                <p className="font-body text-sm text-stone-600 leading-relaxed mb-4 line-clamp-3">
                  "{review.text}"
                </p>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-body text-sm font-medium text-stone-900">{review.name}</p>
                    <p className="font-body text-xs text-stone-400">{review.service}</p>
                  </div>
                  <span className="font-body text-xs text-stone-400">{review.date}</span>
                </div>
              </Card>
            </div>
          ))}
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-8 max-w-7xl mt-12">
        <AnimatedSection className="text-center">
          <Link to="/opinie" data-testid="all-reviews-btn">
            <Button variant="outline" className="border-stone-300 text-stone-700 hover:border-gold hover:text-gold font-body text-sm tracking-wider uppercase px-8 h-12 rounded-none">
              Wszystkie opinie
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </AnimatedSection>
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section data-testid="cta-section" className="relative py-32 md:py-40 overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="https://images.pexels.com/photos/4974568/pexels-photo-4974568.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
          alt="Salon kosmetyczny"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-stone-900/70" />
      </div>

      <div className="relative z-10 container mx-auto px-4 md:px-8 max-w-7xl text-center">
        <AnimatedSection>
          <span className="font-body text-xs uppercase tracking-[0.3em] text-gold mb-6 block">Zarezerwuj wizytę</span>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl text-white font-semibold mb-6 max-w-3xl mx-auto leading-tight">
            Zadbaj o siebie <span className="italic">już dziś</span>
          </h2>
          <p className="font-body text-base text-white/70 mb-10 max-w-lg mx-auto">
            Umów się na wizytę online przez Booksy i doświadcz profesjonalnej pielęgnacji.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a href={BOOKSY_URL} target="_blank" rel="noopener noreferrer" data-testid="cta-booksy-btn">
              <Button className="bg-gold hover:bg-yellow-600 text-white font-body text-sm tracking-wider uppercase px-10 h-14 rounded-none transition-all duration-300">
                Umów wizytę na Booksy
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </a>
            <a href="tel:+48881777437" data-testid="cta-phone-btn">
              <Button variant="outline" className="border-white/30 text-white hover:bg-white/10 font-body text-sm tracking-wider uppercase px-10 h-14 rounded-none transition-all duration-300 bg-transparent">
                <Phone className="w-4 h-4 mr-2" />
                881 777 437
              </Button>
            </a>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

function InfoBar() {
  return (
    <section data-testid="info-bar" className="py-16 bg-stone-50">
      <div className="container mx-auto px-4 md:px-8 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <AnimatedSection>
            <div className="flex items-center gap-4" data-testid="info-address">
              <div className="w-12 h-12 bg-gold/10 flex items-center justify-center flex-shrink-0">
                <MapPin className="w-5 h-5 text-gold" />
              </div>
              <div>
                <h4 className="font-body text-xs uppercase tracking-[0.15em] text-stone-400 mb-1">Adres</h4>
                <p className="font-body text-sm text-stone-900">Garbarska 17/2, 05-825 Grodzisk Mazowiecki</p>
              </div>
            </div>
          </AnimatedSection>
          <AnimatedSection delay={0.1}>
            <div className="flex items-center gap-4" data-testid="info-hours">
              <div className="w-12 h-12 bg-gold/10 flex items-center justify-center flex-shrink-0">
                <Clock className="w-5 h-5 text-gold" />
              </div>
              <div>
                <h4 className="font-body text-xs uppercase tracking-[0.15em] text-stone-400 mb-1">Godziny otwarcia</h4>
                <p className="font-body text-sm text-stone-900">Pon - Sob: 9:00 - 20:00</p>
              </div>
            </div>
          </AnimatedSection>
          <AnimatedSection delay={0.2}>
            <div className="flex items-center gap-4" data-testid="info-phone">
              <div className="w-12 h-12 bg-gold/10 flex items-center justify-center flex-shrink-0">
                <Phone className="w-5 h-5 text-gold" />
              </div>
              <div>
                <h4 className="font-body text-xs uppercase tracking-[0.15em] text-stone-400 mb-1">Telefon</h4>
                <p className="font-body text-sm text-stone-900">
                  <a href="tel:+48881777437" className="hover:text-gold transition-colors">+48 881 777 437</a>
                </p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <div data-testid="home-page">
      <Hero />
      <FeaturesBar />
      <ServicesPreview />
      <ReviewsPreview />
      <CTASection />
      <InfoBar />
    </div>
  );
}
