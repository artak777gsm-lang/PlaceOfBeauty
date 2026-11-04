import { Link } from "react-router-dom";
import SEO from "@/components/SEO";

/**
 * Strona dla adresów spoza serwisu. nginx odpowiada na nie statusem 404 i tą
 * właśnie treścią (build/404.html, prerenderowana), zamiast strony głównej
 * ze statusem 200 — wcześniej każdy literówkowy URL był dla Google duplikatem
 * strony głównej.
 */
export default function NotFound() {
  return (
    <div className="py-32 md:py-40 bg-stone-50">
      <SEO
        title="Nie znaleziono strony"
        description="Tej strony nie ma w serwisie Place of Beauty. Zobacz usługi i cennik salonu kosmetycznego w Grodzisku Mazowieckim albo umów wizytę na Booksy."
        path="/404"
        noindex
      />
      <div className="container mx-auto px-4 md:px-8 max-w-3xl text-center">
        <span className="font-body text-xs uppercase tracking-[0.3em] text-gold mb-4 block">Błąd 404</span>
        <h1 className="font-heading text-3xl sm:text-4xl text-stone-900 font-semibold mb-6">Nie znaleziono strony</h1>
        <p className="font-body text-base text-stone-600 mb-10">
          Adres mógł się zmienić albo zawierać literówkę. Place of Beauty to salon kosmetyczny przy
          ul. Garbarskiej 17/2 w Grodzisku Mazowieckim — poniżej najczęściej odwiedzane strony.
        </p>
        <nav aria-label="Najważniejsze strony" className="flex flex-wrap justify-center gap-x-6 gap-y-3 font-body text-sm">
          <Link to="/" className="text-gold hover:text-stone-900 transition-colors">Strona główna</Link>
          <Link to="/uslugi" className="text-gold hover:text-stone-900 transition-colors">Usługi i cennik</Link>
          <Link to="/uslugi/depilacja-laserowa" className="text-gold hover:text-stone-900 transition-colors">Depilacja laserowa</Link>
          <Link to="/uslugi/piercing" className="text-gold hover:text-stone-900 transition-colors">Piercing</Link>
          <Link to="/kontakt" className="text-gold hover:text-stone-900 transition-colors">Kontakt</Link>
        </nav>
      </div>
    </div>
  );
}
