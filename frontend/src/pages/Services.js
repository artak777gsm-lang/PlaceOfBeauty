import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight, Search, Clock, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import SEO from "@/components/SEO";
import axios from "axios";
import { Link } from "react-router-dom";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;
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

const categoryIcons = {
  "Manicure": "/gallery/1023044393163080.jpg",
  "Pedicure": "/gallery/834394008694787.jpg",
  "Depilacja laserowa": "/gallery/1197425395724978.jpg",
  "Kosmetyka": "/gallery/632346295566227.jpg",
  "Zabiegi na twarz": "/gallery/1185245526942965.jpg",
  "Stylizacja paznokci": "/gallery/840030858131102.jpg",
  "Modelowanie ciała": "/gallery/1137041761763342.jpg",
  "Piercing": "/gallery/722422606558595.jpg",
};

const categorySlugs = {
  "Manicure": "manicure",
  "Pedicure": "pedicure",
  "Depilacja laserowa": "depilacja-laserowa",
  "Kosmetyka": "kosmetyka",
  "Zabiegi na twarz": "zabiegi-na-twarz",
  "Stylizacja paznokci": "stylizacja-paznokci",
  "Modelowanie ciała": "modelowanie-ciala",
  "Piercing": "piercing",
};

export default function Services() {
  const [services, setServices] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState("Wszystkie");
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedCats, setExpandedCats] = useState({});

  useEffect(() => {
    axios.get(`${API}/services`).then((r) => setServices(r.data)).catch(() => {});
    axios.get(`${API}/categories`).then((r) => setCategories(r.data)).catch(() => {});
  }, []);

  const toggleCat = (cat) => {
    setExpandedCats(prev => ({ ...prev, [cat]: !prev[cat] }));
  };

  const filtered = services.filter((s) => {
    const matchCat = activeCategory === "Wszystkie" || s.category === activeCategory;
    const matchSearch = s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  const groupedServices = {};
  filtered.forEach((s) => {
    if (!groupedServices[s.category]) groupedServices[s.category] = [];
    groupedServices[s.category].push(s);
  });

  return (
    <div data-testid="services-page">
      <SEO
        title="Usługi i Cennik"
        description="Pełny cennik usług kosmetycznych Place of Beauty Grodzisk Mazowiecki: manicure hybrydowe 120 zł, pedicure 140 zł, depilacja laserowa Primelase od 100 zł, zabiegi na twarz, makijaż, henna brwi."
        keywords="cennik salon kosmetyczny Grodzisk, cena manicure, cena pedicure, cennik depilacji laserowej, cena manicure hybrydowego, cena przedłużania paznokci, usługi kosmetyczne Grodzisk Mazowiecki"
        path="/uslugi"
      />
      {/* Header */}
      <section className="relative py-24 md:py-32 bg-stone-900 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img
            src="/gallery/632346295566227.jpg"
            alt="Usługi salon kosmetyczny Place of Beauty"
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
            <span className="font-body text-xs uppercase tracking-[0.3em] text-gold mb-4 block">Cennik</span>
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl text-white font-semibold mb-4">
              Nasze <span className="italic">usługi</span>
            </h1>
            <p className="font-body text-base text-stone-400 max-w-xl">
              Pełna lista zabiegów i usług kosmetycznych z cenami.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Service Cards */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4 md:px-8 max-w-7xl">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {[
              { name: "Manicure", slug: "manicure", img: "/gallery/1023044393163080.jpg" },
              { name: "Pedicure", slug: "pedicure", img: "/gallery/834394008694787.jpg" },
              { name: "Stylizacja paznokci", slug: "stylizacja-paznokci", img: "/gallery/840030858131102.jpg" },
              { name: "Depilacja laserowa", slug: "depilacja-laserowa", img: "/gallery/1197425395724978.jpg" },
              { name: "Zabiegi na twarz", slug: "zabiegi-na-twarz", img: "/gallery/1185245526942965.jpg" },
              { name: "Kosmetyka", slug: "kosmetyka", img: "/gallery/632346295566227.jpg" },
              { name: "Modelowanie ciała", slug: "modelowanie-ciala", img: "/gallery/1137041761763342.jpg" },
              { name: "Piercing", slug: "piercing", img: "/gallery/722422606558595.jpg" },
            ].map((s, i) => (
              <AnimatedSection key={s.slug} delay={i * 0.05}>
                <Link to={`/uslugi/${s.slug}`}>
                  <Card className="service-card group relative overflow-hidden rounded-none border-0 h-44 sm:h-52 cursor-pointer">
                    <div className="absolute inset-0 img-zoom">
                      <img src={s.img} alt={s.name} className="w-full h-full object-cover" loading="lazy" decoding="async" />
                      <div className="absolute inset-0 bg-stone-900/40 group-hover:bg-stone-900/60 transition-all duration-500" />
                    </div>
                    <div className="relative z-10 h-full flex flex-col justify-end p-4 sm:p-5">
                      <h3 className="font-heading text-base sm:text-lg text-white font-medium leading-tight">{s.name}</h3>
                      <span className="font-body text-xs text-gold mt-1 uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-1">
                        Szczegóły <ArrowRight className="w-3 h-3" />
                      </span>
                    </div>
                  </Card>
                </Link>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="sticky top-16 md:top-20 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200">
        <div className="container mx-auto px-4 md:px-8 max-w-7xl py-4">
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
              <Input
                data-testid="services-search"
                placeholder="Szukaj usługi..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 rounded-none border-stone-200 font-body text-sm h-10"
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              <button
                data-testid="filter-all"
                onClick={() => setActiveCategory("Wszystkie")}
                className={`font-body text-xs uppercase tracking-wider px-4 py-2 transition-all duration-300 ${
                  activeCategory === "Wszystkie"
                    ? "bg-stone-900 text-white"
                    : "bg-stone-100 text-stone-600 hover:bg-stone-200"
                }`}
              >
                Wszystkie
              </button>
              {categories.map((cat) => (
                <button
                  key={cat}
                  data-testid={`filter-${cat}`}
                  onClick={() => setActiveCategory(cat)}
                  className={`font-body text-xs uppercase tracking-wider px-4 py-2 transition-all duration-300 ${
                    activeCategory === cat
                      ? "bg-stone-900 text-white"
                      : "bg-stone-100 text-stone-600 hover:bg-stone-200"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services List */}
      <section className="py-16 md:py-24 bg-stone-50">
        <div className="container mx-auto px-4 md:px-8 max-w-7xl">
          {Object.entries(groupedServices).map(([category, items], ci) => {
            const isExpanded = expandedCats[category] !== false;
            const visibleItems = isExpanded ? items : items.slice(0, 4);
            
            return (
              <AnimatedSection key={category} delay={ci * 0.05} className="mb-12">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 overflow-hidden flex-shrink-0 img-zoom">
                    <img
                      src={categoryIcons[category] || categoryIcons["Manicure"]}
                      alt={category}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h2 className="font-heading text-2xl font-semibold text-stone-900" data-testid={`category-title-${ci}`}>
                      {category}
                    </h2>
                    <span className="font-body text-sm text-stone-400">{items.length} usług</span>
                  </div>
                  {categorySlugs[category] && (
                    <Link to={`/uslugi/${categorySlugs[category]}`} className="font-body text-xs uppercase tracking-wider text-gold hover:text-stone-900 transition-colors flex items-center gap-1">
                      Szczegóły <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  )}
                </div>

                <div className="space-y-1">
                  {visibleItems.map((service, si) => (
                    <div
                      key={service.id}
                      data-testid={`service-item-${ci}-${si}`}
                      className="group flex items-center justify-between p-4 bg-white hover:bg-stone-50 border border-stone-100 transition-all duration-300"
                    >
                      <div className="flex-1 mr-4">
                        <h3 className="font-body text-sm font-medium text-stone-900 group-hover:text-gold transition-colors">
                          {service.name}
                        </h3>
                        {service.description && (
                          <p className="font-body text-xs text-stone-400 mt-0.5">{service.description}</p>
                        )}
                      </div>
                      <div className="flex items-center gap-4 flex-shrink-0">
                        <div className="flex items-center gap-1 text-stone-400">
                          <Clock className="w-3.5 h-3.5" />
                          <span className="font-body text-xs">{service.duration}</span>
                        </div>
                        <Badge className="bg-stone-900 hover:bg-stone-800 text-white font-body text-xs px-3 py-1 rounded-none">
                          {service.price}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>

                {items.length > 4 && (
                  <button
                    onClick={() => toggleCat(category)}
                    className="flex items-center gap-1 mt-3 font-body text-xs text-gold hover:text-stone-900 transition-colors uppercase tracking-wider"
                    data-testid={`toggle-cat-${ci}`}
                  >
                    {isExpanded ? "Zwiń" : `Pokaż wszystkie (${items.length})`}
                    {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                  </button>
                )}

                {ci < Object.keys(groupedServices).length - 1 && (
                  <Separator className="mt-8" />
                )}
              </AnimatedSection>
            );
          })}

          {Object.keys(groupedServices).length === 0 && (
            <div className="text-center py-16">
              <p className="font-body text-stone-400">Nie znaleziono usług</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-stone-900">
        <div className="container mx-auto px-4 md:px-8 max-w-7xl text-center">
          <AnimatedSection>
            <h2 className="font-heading text-2xl sm:text-3xl text-white font-semibold mb-4">
              Gotowa na <span className="italic text-gold">wizytę</span>?
            </h2>
            <p className="font-body text-sm text-stone-400 mb-8 max-w-md mx-auto">
              Zarezerwuj termin online przez Booksy — szybko i wygodnie.
            </p>
            <a href={BOOKSY_URL} target="_blank" rel="noopener noreferrer" data-testid="services-booksy-btn">
              <Button className="bg-gold hover:bg-yellow-600 text-white font-body text-sm tracking-wider uppercase px-10 h-12 rounded-none">
                Umów wizytę na Booksy
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </a>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
