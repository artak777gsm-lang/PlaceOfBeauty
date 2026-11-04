import { useState, useEffect, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import { ArrowRight, Clock, Phone, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import SEO from "@/components/SEO";
import { breadcrumbJsonLd } from "@/components/depilacja/Blocks";
import { SITE_URL, FACTS_CHECKED } from "@/data/depilacja";
import { salonRef, areaServedNodes, webPageJsonLd } from "@/lib/seoSchema";
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

/**
 * Wiersz cennika z API → Offer. Cena przychodzi tekstem: "120 zł" to cena
 * dokładna, "od 100 zł" — minimalna, więc obok price idzie
 * priceSpecification.minPrice. Samo minPrice bez price Google liczy jako
 * błąd oferty ("brak price"), stąd oba pola. "Zapytaj o cenę" i inne opisy
 * bez kwoty nie dają oferty.
 */
function offerFromRow(row, url) {
  const m = /^\s*(od\s+)?(\d+)\s*zł/i.exec(row.price || "");
  if (!m) return null;
  const offer = {
    "@type": "Offer",
    name: row.name,
    price: m[2],
    priceCurrency: "PLN",
    availability: "https://schema.org/InStock",
    url,
  };
  if (m[1]) offer.priceSpecification = { "@type": "PriceSpecification", minPrice: m[2], priceCurrency: "PLN" };
  return offer;
}

const SERVICE_DATA = {
  manicure: {
    category: "Manicure",
    title: "Manicure hybrydowe i klasyczne",
    seoTitle: "Manicure hybrydowe i klasyczne Grodzisk Mazowiecki",
    seoDesc: "Manicure w Grodzisku Mazowieckim od 80 zł: hybrydowe 140 zł, klasyczne, męski i laminacja Yokaba. Place of Beauty — ocena 4.9/5 na Booksy. Umów wizytę online!",
    seoKeywords: "manicure Grodzisk Mazowiecki, manicure hybrydowe, manicure hybrydowy cena, manicure klasyczne, manicure męski, paznokcie Grodzisk, hybryda paznokcie, manicure blisko mnie, salon paznokci Grodzisk, manicure hybrydowy Grodzisk cena, stylizacja paznokci, lakier hybrydowy",
    image: "/gallery/1023044393163080.jpg",
    lead: "Manicure hybrydowe w Place of Beauty przy ul. Garbarskiej 17/2 w Grodzisku Mazowieckim kosztuje 140 zł, a na dłuższych paznokciach 150 zł. Zabieg trwa około godziny, a hybryda utrzymuje się 2–3 tygodnie. Manicure klasyczne kosztuje 80 zł bez malowania i 90 zł z malowaniem, manicure męski 80 zł, a laminacja paznokci Yokaba 120 zł.",
    h2About: "Na czym polega manicure hybrydowy?",
    h2Price: "Ile kosztuje manicure w Grodzisku Mazowieckim?",
    h2Faq: "Manicure — pytania i odpowiedzi",
    ctaAccent: "manicure",
    description: "Manicure hybrydowe to najpopularniejszy zabieg w naszym salonie — i nie bez powodu. Lakier hybrydowy łączy trwałość żelu z łatwością aplikacji klasycznego lakieru, dając efekt idealnych paznokci na 2-3 tygodnie bez odpryskiwań. W Place of Beauty w Grodzisku Mazowieckim oferujemy profesjonalny manicure hybrydowe, klasyczne z tradycyjnym lakierem, klasyczne bez malowania oraz manicure męski. Każdy zabieg zaczynamy od dokładnej pielęgnacji skórek i nadania kształtu paznokciom, a kończymy perfekcyjną stylizacją. Używamy wyłącznie produktów premium od renomowanych producentów, które zapewniają piękny kolor, blask i długotrwałość.",
    benefits: [
      "Trwałość hybrydy do 3 tygodni bez odpryskiwań",
      "Duży wybór kolorów lakierów hybrydowych",
      "Profesjonalne produkty premium",
      "Indywidualne doradztwo w doborze kolorów i kształtów",
      "Pielęgnacja skórek i nawilżenie dłoni w cenie",
      "Sterylne narzędzia jednorazowe lub autoklawowane",
    ],
    process: [
      { step: "Konsultacja", desc: "Omawiamy Twoje oczekiwania, dobieramy kolor i kształt paznokci." },
      { step: "Przygotowanie", desc: "Delikatne usunięcie skórek, nadanie kształtu i zmatowienie płytki." },
      { step: "Aplikacja bazy", desc: "Nakładamy bazę ochronną, która chroni naturalny paznokieć." },
      { step: "Koloryzacja", desc: "Dwie warstwy koloru utwardzane lampą LED." },
      { step: "Wykończenie", desc: "Top coat zapewniający blask i ochronę. Nawilżenie skórek olejkiem." },
    ],
    faq: [
      { q: "Ile kosztuje manicure hybrydowy w Grodzisku Mazowieckim?", a: "Manicure hybrydowe w Place of Beauty kosztuje 140 zł (na dłuższych paznokciach — 150 zł) i trwa około 1 godziny. W cenę wliczona jest pielęgnacja skórek, nadanie kształtu i stylizacja kolorem." },
      { q: "Jak długo utrzymuje się manicure hybrydowy?", a: "Przy prawidłowej pielęgnacji manicure hybrydowe utrzymuje się 2-3 tygodnie bez odpryskiwań. Zalecamy używanie olejku do skórek dla przedłużenia efektu." },
      { q: "Czym różni się manicure hybrydowy od klasycznego?", a: "Manicure hybrydowe utwardzany jest lampą LED i trzyma się 2-3 tygodnie, podczas gdy klasyczny lakier utrzymuje się kilka dni. Hybryda jest odporniejsza na zarysowania i zachowuje blask przez cały okres noszenia." },
      { q: "Czy manicure hybrydowy niszczy paznokcie?", a: "Nie, przy profesjonalnym wykonaniu i zdejmowaniu manicure hybrydowe nie niszczy naturalnej płytki paznokcia. Ważne jest, aby nie zrywać hybrydy samodzielnie — zawsze zdejmuj ją w salonie." },
      { q: "Ile kosztuje laminacja paznokci Yokaba?", a: "Laminacja paznokci Yokaba kosztuje 120 zł i trwa 30 minut. To zabieg regenerujący i wzmacniający naturalną płytkę paznokcia — polecany przy paznokciach cienkich, łamliwych i zniszczonych, także jako przerwa od stylizacji hybrydowej. Wygładza płytkę i nadaje jej naturalny połysk." },
      { q: "Ile kosztuje zdjęcie hybrydy?", a: "Samo zdjęcie hybrydy kosztuje 20 zł i trwa 15 minut, a zdjęcie hybrydy połączone z manicure klasycznym — 80 zł (40 minut). Zdjęcie stylizacji wykonanej w innym salonie jest przy manicure hybrydowym płatne dodatkowo." },
      { q: "Czy oferujecie manicure dla mężczyzn?", a: "Tak, oferujemy profesjonalny manicure męski za 80 zł. Zabieg obejmuje pielęgnację skórek, nadanie kształtu i polerowanie płytki — bez malowania." },
      { q: "Ile trwa zabieg manicure?", a: "Manicure hybrydowe trwa około 1 godziny, manicure klasyczne z malowaniem — 30 minut, bez malowania — 30 minut." },
      { q: "Jak przygotować się do zabiegu?", a: "Nie musisz się specjalnie przygotowywać. Hybrydę wykonaną w innym salonie zdejmiemy na miejscu za dodatkową opłatą (20 zł) — zaznacz to przy rezerwacji. Zalecamy nie obcinać skórek samodzielnie przed wizytą." },
      { q: "Jak dbać o paznokcie po manicure hybrydowym?", a: "Stosuj olejek do skórek codziennie, noś rękawiczki podczas sprzątania, unikaj mechanicznego uszkadzania paznokci i nie zrywaj hybrydy samodzielnie." },
      { q: "Czy mogę wybrać wzory i zdobienia?", a: "Oczywiście! Oferujemy szeroki wybór zdobień: od prostych wzorów po artystyczne stylizacje. Możesz przynieść inspirację ze zdjęcia lub zdać się na nasze doradztwo." },
      { q: "Jak umówić się na manicure?", a: "Najwygodniej przez Booksy — rezerwacja online dostępna 24/7. Możesz też zadzwonić pod numer +48 881 777 437." },
    ],
  },
  pedicure: {
    category: "Pedicure",
    title: "Pedicure klasyczne i hybrydowe",
    seoTitle: "Pedicure klasyczne i hybrydowe",
    seoDesc: "Pedicure w Grodzisku Mazowieckim od 150 zł: klasyczne, hybrydowe, kwasowe Mavex i lecznicze. Sama hybryda u stóp — 140 zł. Place of Beauty — umów wizytę online!",
    seoKeywords: "pedicure Grodzisk Mazowiecki, pedicure hybrydowe, pedicure kwasowe, pedicure leczniczy, pedicure cena, stopy pielęgnacja",
    image: "/gallery/834394008694787.jpg",
    lead: "Pedicure w Place of Beauty przy ul. Garbarskiej 17/2 w Grodzisku Mazowieckim kosztuje 150 zł w wersji klasycznej z lakierem i 170 zł z lakierem hybrydowym. Pedicure kwasowe Mavex z hybrydą to 180 zł, pedicure leczniczy od 150 zł, a sama hybryda u stóp 140 zł. Zabieg trwa od 45 minut do 1 godz. 10 min.",
    h2About: "Jakie rodzaje pedicure wykonujemy?",
    h2Price: "Ile kosztuje pedicure w Grodzisku Mazowieckim?",
    h2Faq: "Pedicure — pytania i odpowiedzi",
    ctaAccent: "pedicure",
    description: "Zadbane stopy to komfort i piękno przez cały rok. Oferujemy pedicure klasyczne, hybrydowe, kwasowe Mavex oraz lecznicze. Każdy zabieg dobieramy indywidualnie do stanu stóp, zapewniając najlepsze efekty pielęgnacyjne.",
    benefits: [
      "Zabieg kwasowy Mavex — głęboka regeneracja",
      "Pedicure leczniczy dla problematycznych stóp",
      "Profesjonalne narzędzia sterylizowane",
      "Relaksująca atmosfera zabiegu",
    ],
    faq: [
      { q: "Ile kosztuje pedicure?", a: "Pedicure klasyczne z lakierem — 150 zł, z hybrydą — 170 zł, kwasowe Mavex z hybrydą — 180 zł, sama hybryda u stóp — 140 zł. Pedicure leczniczy — od 150 zł, ostateczną cenę ustalamy po konsultacji." },
      { q: "Ile trwa pedicure?", a: "Pedicure klasyczne z lakierem trwa około godziny, pedicure z hybrydą i pedicure kwasowe Mavex z hybrydą — około 1 godz. 10 min, pedicure leczniczy — około godziny, a sama hybryda u stóp — 45 minut." },
      { q: "Czym jest pedicure kwasowe Mavex?", a: "To pedicure, w którym skórę stóp zmiękcza się i regeneruje preparatami z kwasami marki Mavex. W Place of Beauty kończymy go lakierem hybrydowym — zabieg kosztuje 180 zł i trwa około 1 godz. 10 min." },
      { q: "Czym jest pedicure leczniczy?", a: "To zabieg podologiczny dostosowany do stanu stóp: opracowanie paznokci i skóry, usunięcie zrogowaceń, modzeli i odcisków oraz pielęgnacja końcowa. Kosztuje od 150 zł i trwa około godziny — ostateczną cenę ustalamy po konsultacji, zależnie od zakresu pracy i problemu." },
      { q: "Czy mogę zrobić samą hybrydę na paznokciach stóp?", a: "Tak. Hybryda u stóp bez pełnego pedicure kosztuje 140 zł i trwa 45 minut." },
      { q: "Jak często robić pedicure?", a: "Zalecamy pedicure co 3-4 tygodnie, aby stopy były zawsze zadbane." },
      { q: "Jak umówić się na pedicure?", a: "Przez Booksy — rezerwacja online działa całą dobę i od razu widać wolne terminy — albo telefonicznie pod numerem +48 881 777 437." },
    ],
  },
  // Uwaga: strefa "depilacja-laserowa" ma własny, rozbudowany klaster stron
  // (src/pages/DepilacjaLaserowa.js + src/pages/DepilacjaStrefa.js, dane w src/data/depilacja.js).
  // Trasa /uslugi/depilacja-laserowa jest obsługiwana tam, dlatego nie duplikujemy jej tutaj.
  "stylizacja-paznokci": {
    category: "Stylizacja paznokci",
    title: "Stylizacja paznokci żelowych",
    seoTitle: "Przedłużanie i stylizacja paznokci żelowych",
    seoDesc: "Przedłużanie paznokci żelowych w Grodzisku Mazowieckim od 200 zł. Stylizacja, uzupełnienie żelowe. Salon Place of Beauty — piękne paznokcie na każdą okazję!",
    seoKeywords: "paznokcie żelowe Grodzisk Mazowiecki, przedłużanie paznokci, uzupełnienie żelowe, stylizacja paznokci, paznokcie żelowe cena, tipsy Grodzisk",
    image: "/gallery/840030858131102.jpg",
    lead: "Przedłużanie paznokci żelem w Place of Beauty przy ul. Garbarskiej 17/2 w Grodzisku Mazowieckim kosztuje od 200 zł i trwa około 1,5 godziny. Uzupełnienie żelowe kosztuje 160 zł (ok. 1 godz. 15 min) i zalecamy je co 3–4 tygodnie. Naprawa jednego paznokcia to 20 zł, zdjęcie paznokci żelowych 25 zł, a akrylowych 50 zł.",
    h2About: "Na czym polega przedłużanie paznokci żelem?",
    h2Price: "Ile kosztują paznokcie żelowe?",
    h2Faq: "Paznokcie żelowe — pytania i odpowiedzi",
    ctaAccent: "stylizację paznokci",
    description: "Paznokcie żelowe to idealne rozwiązanie dla osób pragnących długich, pięknych paznokci. Oferujemy przedłużanie metodą żelową oraz regularne uzupełnienia. Tworzymy stylizacje na każdą okazję — od eleganckich po artystyczne.",
    benefits: [
      "Trwałość do 4 tygodni",
      "Naturalne i eleganckie wykończenie",
      "Bogaty wybór kolorów i zdobień",
      "Wzmocnienie naturalnych paznokci",
    ],
    faq: [
      { q: "Ile kosztuje przedłużanie paznokci żelowych?", a: "Przedłużanie żelowe od 200 zł, uzupełnienie — 160 zł. Naprawa jednego paznokcia żelowego — 20 zł, dwóch — 30 zł, trzech — 50 zł." },
      { q: "Jak długo trwa zabieg?", a: "Przedłużanie zajmuje ok. 1,5 godziny, uzupełnienie — ok. 1 godz. 15 min." },
      { q: "Jak często robić uzupełnienie?", a: "Uzupełnienie paznokci żelowych zalecamy co 3-4 tygodnie." },
      { q: "Jak długo utrzymują się paznokcie żelowe?", a: "Do 4 tygodni. Potem paznokieć odrasta i stylizację uzupełniamy — uzupełnienie żelowe kosztuje 160 zł." },
      { q: "Ile kosztuje zdjęcie paznokci żelowych lub akrylowych?", a: "Zdjęcie paznokci żelowych kosztuje 25 zł (15 min), a z manicure klasycznym — 90 zł (45 min). Zdjęcie paznokci akrylowych kosztuje 50 zł (15 min). Przy grubej lub zniszczonej stylizacji cena zdjęcia żelu może się zmienić." },
      { q: "Czy zdejmiecie paznokcie zrobione w innym salonie?", a: "Tak. Zdjęcie żelu lub hybrydy wykonanych w innym salonie jest płatne dodatkowo, według cennika zdjęć: żel 25 zł, akryl 50 zł." },
      { q: "Czym jest naprawa paznokcia żelowego?", a: "To poprawka pojedynczego uszkodzonego paznokcia: 20 zł za jeden, 30 zł za dwa i 50 zł za trzy paznokcie, około 15 minut. Naprawa nie oznacza zrobienia paznokcia od nowa — w takim przypadku cena może się zmienić." },
    ],
  },
  kosmetyka: {
    category: "Kosmetyka",
    title: "Kosmetyka — henna brwi i rzęs",
    seoTitle: "Regulacja i henna brwi, henna rzęs",
    seoDesc: "Regulacja brwi i henna brwi w Grodzisku Mazowieckim od 20 zł, henna rzęs 30 zł. Plus depilacja wąsika nitką. Salon Place of Beauty — szybko, precyzyjnie, profesjonalnie!",
    seoKeywords: "regulacja brwi Grodzisk Mazowiecki, henna brwi Grodzisk Mazowiecki, rzęsy Grodzisk Mazowiecki, henna rzęs, depilacja wąsika nitką, brwi Grodzisk, kosmetyczka",
    image: "/gallery/632346295566227.jpg",
    lead: "Regulacja brwi w Place of Beauty przy ul. Garbarskiej 17/2 w Grodzisku Mazowieckim kosztuje 20 zł i trwa 10 minut. Henna brwi to 30 zł, henna brwi z regulacją 50 zł (20 minut), a henna rzęs 30 zł. Efekt henny utrzymuje się 3–4 tygodnie. Wąsik usuwamy także nitką — 15 zł, 5 minut.",
    h2About: "Na czym polega regulacja i henna brwi?",
    h2Price: "Ile kosztuje regulacja i henna brwi?",
    h2Faq: "Brwi i rzęsy — pytania i odpowiedzi",
    ctaAccent: "brwi i rzęsy",
    description: "Brwi nadają twarzy wyraz, dlatego regulację traktujemy jako osobny, precyzyjny zabieg — dobieramy kształt do rysów twarzy, usuwamy zbędne włoski pęsetą i wykańczamy henną, która koloryzuje skórę i włoski jednocześnie, wydłużając efekt do 3-4 tygodni względem samej koloryzacji żelem. Rzęsy henny są tym samym zabiegiem w mniejszej skali — podkreślają spojrzenie bez tuszu na co dzień. Do tego depilacja wąsika metodą nitkową, szybka i delikatna alternatywa dla wosku.",
    benefits: [
      "Regulacja brwi dobrana do kształtu twarzy",
      "Henna brwi — koloryzacja włosków i skóry, efekt do 4 tygodni",
      "Henna rzęs — podkreślone spojrzenie bez tuszu",
      "Depilacja nitką — delikatna metoda",
      "Każdy zabieg trwa od 5 do 20 minut",
    ],
    process: [
      { step: "Dobór kształtu", desc: "Oceniamy naturalną linię brwi i rysy twarzy, aby regulacja i henna wyglądały spójnie, a nie sztucznie." },
      { step: "Regulacja", desc: "Usunięcie zbędnych włosków pęsetą wzdłuż wyznaczonej linii — precyzyjnie, bez podrażnień." },
      { step: "Henna", desc: "Nałożenie henny na włoski i skórę pod nimi — stąd trwalszy efekt niż przy zwykłej koloryzacji żelem." },
      { step: "Wykończenie", desc: "Zmycie henny, korekta finalnego kształtu i nawilżenie skóry wokół brwi." },
    ],
    faq: [
      { q: "Ile kosztuje regulacja brwi w Grodzisku Mazowieckim?", a: "Sama regulacja brwi kosztuje 20 zł i trwa 10 minut. Henna brwi z regulacją kosztuje 50 zł i trwa 20 minut." },
      { q: "Ile kosztuje henna brwi?", a: "Henna brwi — 30 zł (15 min), henna brwi z regulacją — 50 zł (20 min), henna rzęs — 30 zł (15 min), sama regulacja brwi — 20 zł (10 min)." },
      { q: "Jak długo utrzymuje się henna?", a: "Efekt henny utrzymuje się 3-4 tygodnie, w zależności od typu skóry — dłużej niż zwykła koloryzacja żelem, bo henna barwi też skórę pod włoskami." },
      { q: "Czy henna rzęs jest bezpieczna?", a: "Tak, to zabieg nieinwazyjny — henna barwi tylko włoski i nie wymaga wcześniejszej stymulacji rzęs. Przed pierwszym zabiegiem pytamy o alergie na barwniki." },
      { q: "Czym różni się regulacja brwi od henny?", a: "Regulacja to nadanie kształtu przez usunięcie zbędnych włosków — efekt widać od razu, ale kolor zostaje bez zmian. Henna koloryzuje włoski i skórę pod nimi, pogrubiając wizualnie brwi. Najczęściej robi się je razem." },
      { q: "Czym jest depilacja nitką?", a: "Depilacja nitką to starożytna metoda usuwania włosków za pomocą nici bawełnianej — szybka, precyzyjna i delikatna (15 zł, 5 min)." },
    ],
  },
  piercing: {
    category: "Piercing",
    title: "Piercing i przekłuwanie uszu w Grodzisku Mazowieckim",
    seoTitle: "Piercing Grodzisk Mazowiecki — przekłuwanie uszu i nosa",
    seoDesc: "Przekłuwanie uszu w Grodzisku Mazowieckim: płatek 100 zł, oba płatki 180 zł, chrząstka (helix, tragus, conch) 150 zł, nos i pępek 150 zł. Sterylna igła. Place of Beauty.",
    seoKeywords: "piercing Grodzisk Mazowiecki, przekłuwanie uszu Grodzisk Mazowiecki, przekłuwanie uszu, przekłuwanie nosa, przekłuwanie pępka, piercing uszu cena, helix, tragus, piercing igłą, kolczyk w uchu Grodzisk",
    image: "/gallery/722422606558595.jpg",
    lead: "Przekłuwanie uszu w Place of Beauty przy ul. Garbarskiej 17/2 w Grodzisku Mazowieckim kosztuje 100 zł za płatek ucha i 180 zł za oba płatki. Przekłucie chrząstki ucha (helix, tragus, conch i inne), nosa albo pępka kosztuje 150 zł. Przekłuwamy sterylną igłą, a wizyta trwa 20–30 minut.",
    h2About: "Jak wygląda przekłuwanie uszu?",
    h2Price: "Ile kosztuje przekłuwanie uszu, nosa i pępka?",
    h2Faq: "Piercing — pytania i odpowiedzi",
    ctaAccent: "piercing",
    description: "Przekłuwanie uszu, nosa i pępka wykonujemy w salonie Place of Beauty przy ul. Garbarskiej 17/2 w Grodzisku Mazowieckim. Przekłuwamy metodą igłową — sterylną, jednorazową igłą, w sterylnych warunkach. Przed zabiegiem oceniamy budowę ucha, dobieramy miejsce przekłucia i biżuterię, a po zabiegu dostajesz zalecenia dotyczące pielęgnacji i gojenia. Przekłucie płatka ucha kosztuje 100 zł, obu płatków 180 zł, a przekłucia chrząstki ucha (m.in. helix, tragus, conch, daith, rook), nosa i pępka — 150 zł.",
    benefits: [
      "Metoda igłowa — sterylna, jednorazowa igła",
      "Ocena budowy ucha przed przekłuciem",
      "Dobór miejsca przekłucia i biżuterii",
      "Płatek, chrząstka ucha, nos i pępek",
      "Zalecenia pielęgnacyjne po zabiegu",
    ],
    process: [
      { step: "Wybór miejsca przekłucia", desc: "Oceniamy budowę ucha, nosa lub pępka i razem wybieramy miejsce przekłucia oraz biżuterię. Od miejsca zależy cena: płatek 100 zł, chrząstka ucha 150 zł." },
      { step: "Dezynfekcja", desc: "Miejsce przekłucia dokładnie dezynfekujemy. Pracujemy wyłącznie sterylnymi, jednorazowymi narzędziami." },
      { step: "Przekłucie igłą", desc: "Przekłuwamy sterylną igłą — samo przekłucie trwa kilka sekund." },
      { step: "Zalecenia pielęgnacyjne", desc: "Na koniec dostajesz zalecenia, jak dbać o przekłucie do czasu zagojenia." },
    ],
    faq: [
      { q: "Ile kosztuje przekłuwanie uszu w Grodzisku Mazowieckim?", a: "Przekłucie płatka ucha (lobe) kosztuje w Place of Beauty 100 zł, a obu płatków — 180 zł. Przekłucie górnej części płatka (upper lobe) oraz chrząstki ucha — helix, forward helix, flat, conch, daith, rook, tragus, anti-tragus, snug — kosztuje 150 zł, tak samo industrial i orbital." },
      { q: "Ile kosztuje przekłucie nosa i pępka?", a: "Przekłucie skrzydełka nosa (nostril) kosztuje 150 zł, przekłucie pępka — także 150 zł. Każda z tych wizyt trwa około 30 minut." },
      { q: "Czy przekłuwacie uszy pistoletem czy igłą?", a: "Igłą. Wszystkie przekłucia — płatek, chrząstkę ucha, nos i pępek — wykonujemy metodą igłową, sterylną igłą, w sterylnych warunkach." },
      { q: "Ile trwa przekłuwanie uszu?", a: "Przekłucie płatka i większości chrząstek ucha to wizyta około 20 minut. Oba płatki, upper lobe, flat, industrial, orbital, nos i pępek — około 30 minut. Samo przekłucie trwa kilka sekund." },
      { q: "Czy przekłuwacie chrząstkę ucha?", a: "Tak. Wykonujemy przekłucia helix, forward helix, flat, conch, daith, rook, tragus, anti-tragus i snug, a także industrial i orbital — każde za 150 zł. To, czy dane przekłucie da się wykonać, zależy od budowy ucha; oceniamy ją przed zabiegiem." },
      { q: "Czy piercing jest bolesny?", a: "Samo przekłucie trwa kilka sekund. Odczucia zależą od miejsca — przekłucie płatka ucha jest zwykle łagodniejsze niż przekłucie chrząstki." },
      { q: "Jak pielęgnować piercing po zabiegu?", a: "Po zabiegu dostajesz zalecenia dotyczące pielęgnacji i gojenia. Przekłucie płatka dezynfekuj 2 razy dziennie przez 4–6 tygodni; przekłucia chrząstki goją się dłużej. Do czasu zagojenia nie zdejmuj biżuterii i nie dotykaj przekłucia nieumytymi rękami." },
      { q: "Jak umówić się na piercing w Grodzisku Mazowieckim?", a: "Wolne terminy zobaczysz w rezerwacji online na Booksy — każde przekłucie jest tam osobną usługą. Jeśli nie widzisz pasującego terminu, zadzwoń pod numer 881 777 437 — pracujemy według zapisu." },
    ],
  },
  "modelowanie-ciala": {
    category: "Modelowanie ciała",
    title: "Modelowanie ciała EMS",
    seoTitle: "Elektrostymulacja mięśni EMS — modelowanie ciała",
    seoDesc: "Modelowanie ciała EMS w Grodzisku Mazowieckim — 100 zł za zabieg. Technologia HI-EMT: budowanie mięśni i redukcja tkanki tłuszczowej. Salon Place of Beauty!",
    seoKeywords: "EMS Grodzisk Mazowiecki, modelowanie ciała, elektrostymulacja mięśni, HI-EMT, redukcja tkanki tłuszczowej, odchudzanie Grodzisk",
    image: "/gallery/1137041761763342.jpg",
    h2About: "Na czym polega zabieg EMS?",
    h2Price: "Ile kosztuje zabieg EMS?",
    h2Faq: "EMS — pytania i odpowiedzi",
    ctaAccent: "zabieg EMS",
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
  // "loading" | "ready" | "empty" | "error". Pusta kategoria wisiała
  // wcześniej na "Ładowanie cennika..." u każdego odwiedzającego i
  // w snapshotach pre-renderu.
  const [priceState, setPriceState] = useState("loading");

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!data) return undefined;
    // Komponent nie jest montowany od nowa przy przejściu między usługami,
    // więc spóźniona odpowiedź poprzedniej kategorii nie może nadpisać
    // cennika bieżącej strony.
    let cancelled = false;
    setServices([]);
    setPriceState("loading");
    axios
      .get(`${API}/services/${encodeURIComponent(data.category)}`)
      .then((r) => {
        if (cancelled) return;
        // Odpowiedź, która nie jest tablicą (np. HTML zamiast JSON), to błąd,
        // a nie pusty cennik — inaczej strona twierdziłaby, że ceny nie ma.
        if (!Array.isArray(r.data)) {
          setPriceState("error");
          return;
        }
        setServices(r.data);
        setPriceState(r.data.length ? "ready" : "empty");
      })
      .catch(() => {
        if (!cancelled) setPriceState("error");
      });
    return () => {
      cancelled = true;
    };
  }, [slug, data]);

  if (!data) {
    return (
      <div className="py-32 text-center">
        <h1 className="font-heading text-3xl text-stone-900 mb-4">Usługa nie znaleziona</h1>
        <Link to="/uslugi" className="text-gold hover:underline">Wróć do listy usług</Link>
      </div>
    );
  }

  const path = `/uslugi/${slug}`;
  const pageUrl = `${SITE_URL}${path}`;
  const offers = services.map((row) => offerFromRow(row, pageUrl)).filter(Boolean);

  // Salon opisujemy raz, w public/index.html — tutaj tylko referencja po @id
  // (salonRef). Pełny węzeł BeautySalon z adresem bez @id robił z każdej
  // strony usługi drugi, osobny salon.
  const jsonLd = [
    webPageJsonLd({
      name: data.title,
      description: data.lead || data.seoDesc,
      path,
      image: data.image,
      breadcrumbId: `${pageUrl}#breadcrumb`,
    }),
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "@id": `${pageUrl}#service`,
      name: data.title,
      description: data.seoDesc,
      url: pageUrl,
      image: `${SITE_URL}${data.image}`,
      serviceType: data.category,
      provider: salonRef(),
      areaServed: areaServedNodes(),
      ...(offers.length ? { offers } : {}),
    },
    {
      ...breadcrumbJsonLd(
        [
          { name: "Strona główna", path: "/" },
          { name: "Usługi", path: "/uslugi" },
          { name: data.category },
        ],
        SITE_URL,
      ),
      "@id": `${pageUrl}#breadcrumb`,
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: data.faq.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ];

  return (
    <div>
      <SEO
        title={data.seoTitle}
        // Domyślny sufiks dopisuje "Grodzisk Mazowiecki"; gdy miasto jest już w
        // tytule, wychodziło dwa razy i tytuł urywał się w wynikach.
        titleSuffix={/Grodzisk/.test(data.seoTitle) ? " | Place of Beauty" : undefined}
        description={data.seoDesc}
        keywords={data.seoKeywords}
        path={path}
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
            {/* Odpowiedź w pierwszym akapicie: cena, adres, czas. To zdanie
                silniki odpowiedzi cytują bez reszty strony. */}
            {data.lead && (
              <p className="font-body text-base md:text-lg text-stone-300 leading-relaxed max-w-3xl">{data.lead}</p>
            )}
          </motion.div>
        </div>
      </section>

      {/* Description + Benefits */}
      <section className="py-16 md:py-24 bg-stone-50">
        <div className="container mx-auto px-4 md:px-8 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            <AnimatedSection>
              <h2 className="font-heading text-3xl font-semibold text-stone-900 mb-6">
                {data.h2About || <>O <span className="italic">zabiegu</span></>}
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

      {/* Process - if available */}
      {data.process && (
        <section className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-4 md:px-8 max-w-4xl">
            <AnimatedSection className="text-center mb-12">
              <h2 className="font-heading text-3xl font-semibold text-stone-900">
                Jak wygląda <span className="italic">zabieg?</span>
              </h2>
            </AnimatedSection>
            <div className="space-y-6">
              {data.process.map((p, i) => (
                <AnimatedSection key={i} delay={i * 0.08}>
                  <div className="flex gap-6 items-start">
                    <div className="w-12 h-12 bg-stone-900 flex items-center justify-center flex-shrink-0">
                      <span className="font-heading text-lg text-gold font-bold">{i + 1}</span>
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
      )}

      {/* For Whom - if available */}
      {data.forWhom && (
        <section className="py-16 md:py-24 bg-stone-50">
          <div className="container mx-auto px-4 md:px-8 max-w-4xl">
            <AnimatedSection className="text-center mb-12">
              <h2 className="font-heading text-3xl font-semibold text-stone-900">
                {data.forWhom.title}
              </h2>
            </AnimatedSection>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <AnimatedSection>
                <div className="bg-white border border-stone-200 p-8">
                  <h3 className="font-heading text-lg font-medium text-stone-900 mb-4 flex items-center gap-2">
                    <span className="text-green-600">✓</span> Zabieg jest dla Ciebie, jeśli:
                  </h3>
                  <ul className="space-y-3">
                    {data.forWhom.suitable.map((s, i) => (
                      <li key={i} className="font-body text-sm text-stone-600 flex items-start gap-2">
                        <span className="text-gold mt-0.5">•</span> {s}
                      </li>
                    ))}
                  </ul>
                </div>
              </AnimatedSection>
              <AnimatedSection delay={0.15}>
                <div className="bg-white border border-stone-200 p-8">
                  <h3 className="font-heading text-lg font-medium text-stone-900 mb-4 flex items-center gap-2">
                    <span className="text-red-500">✕</span> Przeciwwskazania:
                  </h3>
                  <ul className="space-y-3">
                    {data.forWhom.contraindications.map((c, i) => (
                      <li key={i} className="font-body text-sm text-stone-600 flex items-start gap-2">
                        <span className="text-stone-400 mt-0.5">•</span> {c}
                      </li>
                    ))}
                  </ul>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </section>
      )}

      {/* Price List */}
      <section className={`py-16 md:py-24 ${data.forWhom ? 'bg-white' : 'bg-white'}`}>
        <div className="container mx-auto px-4 md:px-8 max-w-4xl">
          <AnimatedSection>
            <h2 className="font-heading text-3xl font-semibold text-stone-900 mb-2 text-center">
              {data.h2Price || "Cennik"}
            </h2>
            <p className="font-body text-sm text-stone-500 text-center mb-10">
              Ceny zgodne z rezerwacją online na Booksy — stan na{" "}
              <time dateTime={FACTS_CHECKED.iso}>{FACTS_CHECKED.label}</time>.
            </p>
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

          {priceState === "loading" && (
            <p className="text-center font-body text-stone-400 py-8">Ładowanie cennika...</p>
          )}
          {priceState === "empty" && (
            <p className="text-center font-body text-stone-500 py-8">
              Cenę i termin ustalimy telefonicznie — zadzwoń pod{" "}
              <a href="tel:+48881777437" className="text-gold hover:underline">881 777 437</a>.
            </p>
          )}
          {priceState === "error" && (
            <p className="text-center font-body text-stone-500 py-8">
              Nie udało się wczytać cennika. Aktualne ceny podamy telefonicznie:{" "}
              <a href="tel:+48881777437" className="text-gold hover:underline">881 777 437</a>.
            </p>
          )}
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 md:py-24 bg-stone-50">
        <div className="container mx-auto px-4 md:px-8 max-w-4xl">
          <AnimatedSection className="text-center mb-12">
            <h2 className="font-heading text-3xl font-semibold text-stone-900">
              {data.h2Faq || <>Najczęstsze <span className="italic">pytania</span></>}
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
              Umów wizytę na <span className="italic text-gold">{data.ctaAccent || data.category.toLowerCase()}</span>
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
