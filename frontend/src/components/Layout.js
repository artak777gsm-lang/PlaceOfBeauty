import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone, MapPin, Clock, Facebook, Instagram, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";

const BOOKSY_URL = "https://booksy.com/pl-pl/103643_place-of-beauty-carika_paznokcie_4424_grodzisk-mazowiecki";

const navLinks = [
  { name: "Strona główna", path: "/" },
  { name: "Usługi", path: "/uslugi" },
  { name: "O nas", path: "/o-nas" },
  { name: "Galeria", path: "/galeria" },
  { name: "Opinie", path: "/opinie" },
  { name: "Kontakt", path: "/kontakt" },
];

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <motion.header
      data-testid="navbar"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "glass-header-scrolled" : "glass-header"
      }`}
    >
      <div className="container mx-auto px-4 md:px-8 max-w-7xl">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link to="/" className="flex items-center gap-2" data-testid="logo-link">
            <span className="font-heading text-xl md:text-2xl font-semibold tracking-tight text-stone-900">
              Place of <span className="text-gold italic">Beauty</span>
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-8" data-testid="desktop-nav">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                data-testid={`nav-${link.path.replace("/", "") || "home"}`}
                className={`gold-underline text-sm font-body font-medium tracking-wide uppercase transition-colors duration-300 ${
                  location.pathname === link.path
                    ? "text-gold"
                    : "text-stone-600 hover:text-stone-900"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-3">
            <a
              href={`tel:+48881777437`}
              className="flex items-center gap-2 text-sm text-stone-600 hover:text-stone-900 transition-colors"
              data-testid="nav-phone"
            >
              <Phone className="w-4 h-4" />
              <span className="font-body">881 777 437</span>
            </a>
            <a
              href={BOOKSY_URL}
              target="_blank"
              rel="noopener noreferrer"
              data-testid="nav-booksy-btn"
            >
              <Button className="bg-gold hover:bg-stone-900 text-white font-body text-sm tracking-wider uppercase px-6 h-10 rounded-none transition-all duration-300">
                Umów wizytę
              </Button>
            </a>
          </div>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <button data-testid="mobile-menu-btn" className="p-2">
                <Menu className="w-6 h-6 text-stone-900" />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] bg-stone-50 p-0">
              <div className="flex flex-col h-full pt-12 px-6">
                <div className="mb-8">
                  <span className="font-heading text-2xl font-semibold text-stone-900">
                    Place of <span className="text-gold italic">Beauty</span>
                  </span>
                </div>
                <nav className="flex flex-col gap-1" data-testid="mobile-nav">
                  {navLinks.map((link, i) => (
                    <motion.div
                      key={link.path}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                    >
                      <Link
                        to={link.path}
                        data-testid={`mobile-nav-${link.path.replace("/", "") || "home"}`}
                        className={`block py-3 text-base font-body font-medium tracking-wide ${
                          location.pathname === link.path
                            ? "text-gold"
                            : "text-stone-700"
                        }`}
                      >
                        {link.name}
                      </Link>
                    </motion.div>
                  ))}
                </nav>
                <Separator className="my-6" />
                <a
                  href={BOOKSY_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-testid="mobile-booksy-btn"
                >
                  <Button className="w-full bg-gold hover:bg-stone-900 text-white font-body text-sm tracking-wider uppercase h-12 rounded-none">
                    Umów wizytę
                  </Button>
                </a>
                <div className="mt-6 space-y-3 text-sm text-stone-500 font-body">
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-gold" />
                    <a href="tel:+48881777437">+48 881 777 437</a>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-gold" />
                    <span>Garbarska 17/2, Grodzisk Maz.</span>
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </motion.header>
  );
}

function Footer() {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 600);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <footer data-testid="footer" className="bg-stone-900 text-stone-50">
        <div className="container mx-auto px-4 md:px-8 max-w-7xl py-16 md:py-24">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            <div className="lg:col-span-1">
              <h3 className="font-heading text-3xl font-semibold mb-4">
                Place of <span className="text-gold italic">Beauty</span>
              </h3>
              <p className="font-body text-stone-400 text-sm leading-relaxed mb-6">
                Profesjonalny salon kosmetyczny w Grodzisku Mazowieckim. Twoje piękno to nasza pasja.
              </p>
              <div className="flex gap-4">
                <a
                  href="https://www.facebook.com/placeofbeauty"
                  target="_blank"
                  rel="noopener noreferrer"
                  data-testid="footer-facebook"
                  className="w-10 h-10 border border-stone-700 flex items-center justify-center hover:border-gold hover:text-gold transition-colors duration-300"
                >
                  <Facebook className="w-4 h-4" />
                </a>
                <a
                  href="https://www.instagram.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  data-testid="footer-instagram"
                  className="w-10 h-10 border border-stone-700 flex items-center justify-center hover:border-gold hover:text-gold transition-colors duration-300"
                >
                  <Instagram className="w-4 h-4" />
                </a>
              </div>
            </div>

            <div>
              <h4 className="font-body text-xs uppercase tracking-[0.2em] text-gold mb-6">Nawigacja</h4>
              <nav className="flex flex-col gap-3">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className="font-body text-sm text-stone-400 hover:text-stone-50 transition-colors duration-300"
                  >
                    {link.name}
                  </Link>
                ))}
              </nav>
            </div>

            <div>
              <h4 className="font-body text-xs uppercase tracking-[0.2em] text-gold mb-6">Kontakt</h4>
              <div className="space-y-4 font-body text-sm text-stone-400">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-gold mt-1 flex-shrink-0" />
                  <span>Garbarska 17/2<br />05-825 Grodzisk Mazowiecki</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-gold flex-shrink-0" />
                  <a href="tel:+48881777437" className="hover:text-stone-50 transition-colors">+48 881 777 437</a>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-body text-xs uppercase tracking-[0.2em] text-gold mb-6">Godziny otwarcia</h4>
              <div className="space-y-2 font-body text-sm text-stone-400">
                <div className="flex justify-between">
                  <span>Poniedziałek - Sobota</span>
                  <span className="text-stone-50">9:00 - 20:00</span>
                </div>
                <div className="flex justify-between">
                  <span>Niedziela</span>
                  <span className="text-stone-50">Zamknięte</span>
                </div>
              </div>
              <a
                href={BOOKSY_URL}
                target="_blank"
                rel="noopener noreferrer"
                data-testid="footer-booksy-btn"
                className="inline-block mt-6"
              >
                <Button className="bg-gold hover:bg-yellow-600 text-white font-body text-xs tracking-wider uppercase px-6 h-10 rounded-none">
                  Zarezerwuj wizytę
                </Button>
              </a>
            </div>
          </div>

          <Separator className="my-12 bg-stone-800" />

          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="font-body text-xs text-stone-500">
              &copy; {new Date().getFullYear()} Place of Beauty. Wszelkie prawa zastrzeżone.
            </p>
            <p className="font-body text-xs text-stone-500">
              Garbarska 17/2, 05-825 Grodzisk Mazowiecki
            </p>
          </div>
        </div>
      </footer>

      <AnimatePresence>
        {showTop && (
          <motion.button
            data-testid="scroll-to-top-btn"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="fixed bottom-6 right-6 z-50 w-12 h-12 bg-gold text-white flex items-center justify-center shadow-lg hover:bg-stone-900 transition-colors duration-300"
          >
            <ChevronUp className="w-5 h-5" />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}

export default function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-16 md:pt-20">{children}</main>
      <Footer />
    </div>
  );
}
