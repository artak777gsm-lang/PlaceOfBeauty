import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Star, Quote, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import axios from "axios";

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

export default function Reviews() {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    axios.get(`${API}/reviews`).then((r) => setReviews(r.data)).catch(() => {});
  }, []);

  return (
    <div data-testid="reviews-page">
      {/* Header */}
      <section className="relative py-24 md:py-32 bg-stone-900 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img
            src="/gallery/840030858131102.jpg"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative z-10 container mx-auto px-4 md:px-8 max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="font-body text-xs uppercase tracking-[0.3em] text-gold mb-4 block">Opinie</span>
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl text-white font-semibold mb-4">
              Co mówią nasi <span className="italic">klienci</span>
            </h1>
            <p className="font-body text-base text-stone-400 max-w-xl">
              Opinie z platformy Booksy od naszych zadowolonych klientów.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Rating summary */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-8 max-w-7xl">
          <AnimatedSection>
            <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16" data-testid="rating-summary">
              <div className="text-center">
                <span className="font-heading text-6xl font-bold text-stone-900">4.9</span>
                <div className="flex justify-center mt-2 mb-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-gold text-gold" />
                  ))}
                </div>
                <span className="font-body text-sm text-stone-500">na 5.0</span>
              </div>
              <div className="text-center">
                <span className="font-heading text-4xl font-bold text-stone-900">272</span>
                <p className="font-body text-sm text-stone-500 mt-1">opinie na Booksy</p>
              </div>
              <div className="text-center">
                <span className="font-heading text-4xl font-bold text-gold">98%</span>
                <p className="font-body text-sm text-stone-500 mt-1">ocen 5 gwiazdek</p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Reviews grid */}
      <section className="py-16 md:py-24 bg-stone-50">
        <div className="container mx-auto px-4 md:px-8 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reviews.map((review, i) => (
              <AnimatedSection key={review.id} delay={i * 0.06}>
                <Card className="service-card p-6 rounded-none border border-stone-200 bg-white h-full flex flex-col" data-testid={`review-card-${i}`}>
                  <Quote className="w-8 h-8 text-gold/30 mb-4" />
                  <p className="font-body text-sm text-stone-600 leading-relaxed flex-1 mb-6">
                    "{review.text}"
                  </p>
                  <div className="flex items-center gap-1 mb-3">
                    {[...Array(review.rating)].map((_, j) => (
                      <Star key={j} className="w-4 h-4 fill-gold text-gold" />
                    ))}
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-body text-sm font-medium text-stone-900">{review.name}</p>
                      <p className="font-body text-xs text-stone-400">{review.service}</p>
                    </div>
                    <span className="font-body text-xs text-stone-400">{review.date}</span>
                  </div>
                </Card>
              </AnimatedSection>
            ))}
          </div>

          <AnimatedSection className="text-center mt-16">
            <p className="font-body text-sm text-stone-500 mb-6">
              Chcesz zobaczyć więcej opinii? Odwiedź nasz profil na Booksy.
            </p>
            <a
              href={`${BOOKSY_URL}#reviews-section`}
              target="_blank"
              rel="noopener noreferrer"
              data-testid="reviews-booksy-link"
            >
              <Button variant="outline" className="border-stone-300 text-stone-700 hover:border-gold hover:text-gold font-body text-sm tracking-wider uppercase px-8 h-12 rounded-none">
                Wszystkie opinie na Booksy
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </a>
          </AnimatedSection>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-stone-900">
        <div className="container mx-auto px-4 md:px-8 max-w-7xl text-center">
          <AnimatedSection>
            <h2 className="font-heading text-2xl sm:text-3xl text-white font-semibold mb-4">
              Dołącz do grona <span className="italic text-gold">zadowolonych klientów</span>
            </h2>
            <p className="font-body text-sm text-stone-400 mb-8 max-w-md mx-auto">
              Zarezerwuj wizytę i przekonaj się sama o jakości naszych usług.
            </p>
            <a href={BOOKSY_URL} target="_blank" rel="noopener noreferrer" data-testid="reviews-cta-btn">
              <Button className="bg-gold hover:bg-yellow-600 text-white font-body text-sm tracking-wider uppercase px-10 h-12 rounded-none">
                Umów wizytę
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </a>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
