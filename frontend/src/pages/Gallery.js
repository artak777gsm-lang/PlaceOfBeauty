import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { X, ZoomIn } from "lucide-react";
import axios from "axios";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

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

export default function Gallery() {
  const [items, setItems] = useState([]);
  const [activeFilter, setActiveFilter] = useState("Wszystkie");
  const [lightboxItem, setLightboxItem] = useState(null);
  const [galleryCategories, setGalleryCategories] = useState([]);

  useEffect(() => {
    axios.get(`${API}/gallery`).then((r) => {
      setItems(r.data);
      const cats = [...new Set(r.data.map((i) => i.category))];
      setGalleryCategories(cats);
    }).catch(() => {});
  }, []);

  const filtered = activeFilter === "Wszystkie" ? items : items.filter((i) => i.category === activeFilter);

  return (
    <div data-testid="gallery-page">
      {/* Header */}
      <section className="relative py-24 md:py-32 bg-stone-900 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img
            src="/gallery/1023044393163080.jpg"
            alt="Galeria"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative z-10 container mx-auto px-4 md:px-8 max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="font-body text-xs uppercase tracking-[0.3em] text-gold mb-4 block">Portfolio</span>
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl text-white font-semibold mb-4">
              Nasza <span className="italic">galeria</span>
            </h1>
            <p className="font-body text-base text-stone-400 max-w-xl">
              Zobacz efekty naszej pracy i wnętrze salonu.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters */}
      <section className="sticky top-16 md:top-20 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200">
        <div className="container mx-auto px-4 md:px-8 max-w-7xl py-4">
          <div className="flex gap-2 flex-wrap">
            {["Wszystkie", ...galleryCategories].map((cat) => (
              <button
                key={cat}
                data-testid={`gallery-filter-${cat}`}
                onClick={() => setActiveFilter(cat)}
                className={`font-body text-xs uppercase tracking-wider px-4 py-2 transition-all duration-300 ${
                  activeFilter === cat
                    ? "bg-stone-900 text-white"
                    : "bg-stone-100 text-stone-600 hover:bg-stone-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid - Masonry */}
      <section className="py-16 md:py-24 bg-stone-50">
        <div className="container mx-auto px-4 md:px-8 max-w-7xl">
          <div className="masonry-grid">
            {filtered.map((item, i) => (
              <AnimatedSection key={item.id} delay={i * 0.05}>
                <motion.div
                  className="group relative cursor-pointer img-zoom"
                  onClick={() => setLightboxItem(item)}
                  data-testid={`gallery-item-${i}`}
                  whileHover={{ scale: 1.01 }}
                  transition={{ duration: 0.3 }}
                >
                  <img
                    src={item.url}
                    alt={item.alt}
                    className="w-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-stone-900/0 group-hover:bg-stone-900/40 transition-all duration-500 flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <ZoomIn className="w-8 h-8 text-white" />
                    </div>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-stone-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="font-body text-xs uppercase tracking-wider text-gold">{item.category}</span>
                    <p className="font-body text-sm text-white mt-1">{item.alt}</p>
                  </div>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-16">
              <p className="font-body text-stone-400">Brak zdjęć w tej kategorii</p>
            </div>
          )}
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxItem && (
          <motion.div
            data-testid="gallery-lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-stone-900/95 flex items-center justify-center p-4"
            onClick={() => setLightboxItem(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-4xl max-h-[85vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={lightboxItem.url}
                alt={lightboxItem.alt}
                className="max-w-full max-h-[85vh] object-contain"
              />
              <button
                data-testid="lightbox-close"
                onClick={() => setLightboxItem(null)}
                className="absolute -top-12 right-0 w-10 h-10 bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
              >
                <X className="w-5 h-5 text-white" />
              </button>
              <div className="mt-4">
                <span className="font-body text-xs uppercase tracking-wider text-gold">{lightboxItem.category}</span>
                <p className="font-body text-sm text-white mt-1">{lightboxItem.alt}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
