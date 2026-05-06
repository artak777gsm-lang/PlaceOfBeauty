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
    seoTitle: "Manicure hybrydowe i klasyczne Grodzisk Mazowiecki",
    seoDesc: "Profesjonalny manicure hybrydowe w Grodzisku Mazowieckim od 70 zł. Manicure klasyczne, hybrydowe, męskie. Salon Place of Beauty — ocena 4.9/5 na Booksy. Trwałość do 3 tygodni. Umów wizytę online!",
    seoKeywords: "manicure Grodzisk Mazowiecki, manicure hybrydowe, manicure hybrydowy cena, manicure klasyczne, manicure męski, paznokcie Grodzisk, hybryda paznokcie, manicure blisko mnie, salon paznokci Grodzisk, manicure hybrydowy Grodzisk cena, stylizacja paznokci, lakier hybrydowy",
    image: "/gallery/1023044393163080.jpg",
    description: "Manicure hybrydowe to najpopularniejszy zabieg w naszym salonie — i nie bez powodu. Lakier hybrydowy łączy trwałość żelu z łatwością aplikacji klasycznego lakieru, dając efekt idealnych paznokci na 2-3 tygodnie bez odpryskiwań. W Place of Beauty w Grodzisku Mazowieckim oferujemy profesjonalny manicure hybrydowe, klasyczne z tradycyjnym lakierem, klasyczne bez malowania oraz manicure męski. Każdy zabieg zaczynamy od dokładnej pielęgnacji skórek i nadania kształtu paznokciom, a kończymy perfekcyjną stylizacją. Używamy wyłącznie produktów premium od renomowanych producentów, które zapewniają piękny kolor, blask i długotrwałość.",
    benefits: [
      "Trwałość hybrydy do 3 tygodni bez odpryskiwań",
      "Ponad 200 kolorów lakierów do wyboru",
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
      { q: "Ile kosztuje manicure hybrydowy w Grodzisku Mazowieckim?", a: "Manicure hybrydowe w Place of Beauty kosztuje 120 zł i trwa około 1 godziny. W cenę wliczona jest pielęgnacja skórek, nadanie kształtu i stylizacja kolorem." },
      { q: "Jak długo utrzymuje się manicure hybrydowy?", a: "Przy prawidłowej pielęgnacji manicure hybrydowe utrzymuje się 2-3 tygodnie bez odpryskiwań. Zalecamy używanie olejku do skórek dla przedłużenia efektu." },
      { q: "Czym różni się manicure hybrydowy od klasycznego?", a: "Manicure hybrydowe utwardzany jest lampą LED i trzyma się 2-3 tygodnie, podczas gdy klasyczny lakier utrzymuje się kilka dni. Hybryda jest odporniejsza na zarysowania i zachowuje blask przez cały okres noszenia." },
      { q: "Czy manicure hybrydowy niszczy paznokcie?", a: "Nie, przy profesjonalnym wykonaniu i zdejmowaniu manicure hybrydowe nie niszczy naturalnej płytki paznokcia. Ważne jest, aby nie zrywać hybrydy samodzielnie — zawsze zdejmuj ją w salonie." },
      { q: "Czy oferujecie manicure dla mężczyzn?", a: "Tak, oferujemy profesjonalny manicure męski za 70 zł. Zabieg obejmuje pielęgnację skórek, nadanie kształtu i polerowanie płytki — bez malowania." },
      { q: "Ile trwa zabieg manicure?", a: "Manicure hybrydowe trwa około 1 godziny, manicure klasyczne z malowaniem — 30 minut, bez malowania — 30 minut." },
      { q: "Jak przygotować się do zabiegu?", a: "Nie musisz się specjalnie przygotowywać. Jeśli masz starą hybrydę, zdejmiemy ją na miejscu (wliczone w cenę). Zalecamy nie obcinać skórek samodzielnie przed wizytą." },
      { q: "Jak dbać o paznokcie po manicure hybrydowym?", a: "Stosuj olejek do skórek codziennie, noś rękawiczki podczas sprzątania, unikaj mechanicznego uszkadzania paznokci i nie zrywaj hybrydy samodzielnie." },
      { q: "Czy mogę wybrać wzory i zdobienia?", a: "Oczywiście! Oferujemy szeroki wybór zdobień: od prostych wzorów po artystyczne stylizacje. Możesz przynieść inspirację ze zdjęcia lub zdać się na nasze doradztwo." },
      { q: "Jak umówić się na manicure?", a: "Najwygodniej przez Booksy — rezerwacja online dostępna 24/7. Możesz też zadzwonić pod numer +48 881 777 437." },
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
    seoTitle: "Depilacja laserowa Primelase Grodzisk Mazowiecki",
    seoDesc: "Depilacja laserowa Primelase w Grodzisku Mazowieckim. Pachy 200 zł, nogi 550 zł, bikini od 220 zł. Trwałe usuwanie owłosienia — efekty po 1. zabiegu. Salon Place of Beauty — ocena 4.9/5. Umów wizytę!",
    seoKeywords: "depilacja laserowa Grodzisk Mazowiecki, depilacja laserowa Primelase, depilacja laserowa cena, laser pachy, laser bikini, laser nogi, usuwanie owłosienia, depilacja laserowa blisko mnie, trwała depilacja, epilacja laserowa, depilacja laserowa opinie, laser na włosy, depilacja laserowa ile zabiegów, depilacja laserowa bikini cena, depilacja Primelase opinie",
    image: "/gallery/1197425395724978.jpg",
    description: "Depilacja laserowa Primelase w Place of Beauty to najnowocześniejsza metoda trwałego usuwania niechcianego owłosienia. Primelase to laser diodowy nowej generacji, który łączy trzy długości fali (755nm, 810nm, 1064nm), dzięki czemu skutecznie usuwa włosy na każdym fototypie skóry — od jasnej po ciemną. Zabieg jest bezpieczny, szybki i niemal bezbolesny dzięki zaawansowanemu systemowi chłodzenia. Już po pierwszym zabiegu zauważysz wyraźne zmniejszenie owłosienia. Po pełnej serii 6-8 zabiegów efekt jest trwały — gładka skóra bez golenia, woskowania i podrażnień. Nasz salon w Grodzisku Mazowieckim oferuje depilację laserową wszystkich partii ciała: pachy, nogi, bikini (płytkie i głębokie), wąsik, ręce oraz pakiety łączone w atrakcyjnych cenach.",
    benefits: [
      "Technologia Primelase z 3 długościami fali — najwyższa skuteczność",
      "Bezbolesny zabieg dzięki systemowi chłodzenia kontaktowego",
      "Efekty widoczne już po pierwszym zabiegu",
      "Trwałe usunięcie 90-95% owłosienia po serii zabiegów",
      "Bezpieczny dla wszystkich fototypów skóry (I-VI)",
      "Szybki zabieg — pachy w 15 minut, nogi w 50 minut",
      "Brak okresu rekonwalescencji — wracasz do codziennych aktywności od razu",
      "Pakiet nogi + pachy + bikini w cenie 750 zł (oszczędność 220 zł)",
    ],
    process: [
      { step: "Konsultacja", desc: "Oceniamy fototyp skóry, kolor włosów i omawiamy przeciwwskazania. Dobieramy optymalne parametry lasera." },
      { step: "Przygotowanie skóry", desc: "Oczyszczamy i dezynfekujemy okolicę poddawaną depilacji. Nakładamy żel kontaktowy." },
      { step: "Zabieg laserowy", desc: "Aplikujemy impulsy laserowe Primelase. System chłodzenia zapewnia komfort. Zabieg trwa od 10 do 50 minut w zależności od partii ciała." },
      { step: "Pielęgnacja po zabiegu", desc: "Nakładamy krem kojący. Omawiamy zasady pielęgnacji skóry po zabiegu." },
      { step: "Plan kolejnych sesji", desc: "Ustalamy harmonogram kolejnych zabiegów (co 4-6 tygodni) dla optymalnych efektów." },
    ],
    forWhom: {
      title: "Dla kogo jest depilacja laserowa?",
      suitable: [
        "Osoby zmęczone regularnym goleniem i woskowaniem",
        "Osoby z problemem wrastających włosków",
        "Kobiety i mężczyźni w każdym wieku (18+)",
        "Osoby o każdym fototypie skóry (I-VI)",
        "Osoby szukające trwałego rozwiązania na niechciane owłosienie",
      ],
      contraindications: [
        "Ciąża i karmienie piersią",
        "Aktywna opalenizna (2 tygodnie przed zabiegiem)",
        "Choroby skóry w okolicy poddawanej depilacji",
        "Przyjmowanie leków fotouczulających",
        "Świeży tatuaż w okolicy zabiegowej",
      ],
    },
    faq: [
      { q: "Ile kosztuje depilacja laserowa w Grodzisku Mazowieckim?", a: "Cennik depilacji laserowej Primelase w Place of Beauty: pachy — 200 zł (15 min), wąsik — 100 zł (10 min), bikini płytkie — 220 zł (20 min), bikini głębokie — 300 zł (30 min), całe nogi — 550 zł (50 min). Pakiet nogi + pachy + bikini — 750 zł (1 godz. 45 min), co daje oszczędność 220 zł." },
      { q: "Ile zabiegów depilacji laserowej potrzeba?", a: "Dla trwałego efektu zalecamy serię 6-8 zabiegów w odstępach co 4-6 tygodni. Włosy rosną w cyklach i laser działa tylko na włosy w fazie aktywnego wzrostu (anagen), dlatego potrzebna jest seria zabiegów, aby objąć wszystkie cykle." },
      { q: "Czy depilacja laserowa jest bolesna?", a: "Laser Primelase ma zaawansowany system chłodzenia kontaktowego, dzięki czemu zabieg jest niemal bezbolesny. Większość klientów opisuje uczucie jako delikatne mrowienie lub ciepło. Wrażliwość zależy od partii ciała — np. pachy są mniej wrażliwe niż bikini." },
      { q: "Jak przygotować się do depilacji laserowej?", a: "Dzień przed zabiegiem ogól okolicę poddawaną depilacji (nie woskuj ani nie wyrywaj włosków). Nie opalaj się 2 tygodnie przed zabiegiem. Nie stosuj samoopalacza. Skóra powinna być czysta, bez kremów i dezodorantów." },
      { q: "Czym depilacja laserowa różni się od woskowania?", a: "Depilacja laserowa daje trwałe efekty — po serii zabiegów włosy nie odrastają. Woskowanie usuwa włosy tymczasowo (na 2-4 tygodnie) i musi być powtarzane przez całe życie. Laser jest mniej bolesny i nie powoduje wrastania włosków." },
      { q: "Czy depilacja laserowa jest bezpieczna?", a: "Tak, depilacja laserowa Primelase jest w pełni bezpieczna i zatwierdzona medycznie. Laser działa selektywnie na melaninę we włosie, nie uszkadzając otaczającej skóry. W naszym salonie zabieg wykonuje przeszkolona specjalistka." },
      { q: "Kiedy widać efekty depilacji laserowej?", a: "Pierwsze efekty widoczne są już 1-2 tygodnie po pierwszym zabiegu — włosy zaczynają wypadać. Po każdej kolejnej sesji owłosienie jest coraz rzadsze i cieńsze. Po pełnej serii 6-8 zabiegów usunięte jest 90-95% włosów." },
      { q: "Czy depilacja laserowa działa na jasne włosy?", a: "Laser Primelase z trzema długościami fali radzi sobie z większością typów włosów. Najlepsze efekty osiąga na ciemnych włoskach, ale dzięki technologii trzech fal jest skuteczniejszy na jasne włosy niż tradycyjne lasery." },
      { q: "Co po zabiegu depilacji laserowej?", a: "Po zabiegu unikaj słońca i solarium przez 2 tygodnie, nie używaj sauny i gorącej kąpieli przez 24-48 godzin, stosuj krem z filtrem SPF 50 na depilowane okolice. Lekkie zaczerwienienie po zabiegu jest normalne i ustępuje w ciągu kilku godzin." },
      { q: "Czy mogę robić depilację laserową latem?", a: "Tak, pod warunkiem że chronisz depilowane okolice przed słońcem (filtr SPF 50) i nie opalasz się intensywnie. Zalecamy planowanie zabiegów tak, aby unikać bezpośredniej ekspozycji na słońce przez 2 tygodnie po zabiegu." },
      { q: "Jak umówić się na depilację laserową?", a: "Umów wizytę online przez Booksy (dostępne 24/7) lub zadzwoń pod numer +48 881 777 437. Pierwsza konsultacja jest bezpłatna." },
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

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": data.title,
      "description": data.seoDesc,
      "provider": {
        "@type": "BeautySalon",
        "name": "Place of Beauty",
        "address": { "@type": "PostalAddress", "streetAddress": "Garbarska 17/2", "addressLocality": "Grodzisk Mazowiecki", "postalCode": "05-825", "addressCountry": "PL" },
        "telephone": "+48881777437",
        "url": "https://placeof.beauty",
      },
      "areaServed": [
        { "@type": "City", "name": "Grodzisk Mazowiecki" },
        { "@type": "City", "name": "Milanówek" },
        { "@type": "City", "name": "Pruszków" },
      ],
      ...(services.length > 0 && services[0].price !== "Zapytaj o cenę" ? {
        "offers": services.filter(s => s.price !== "Zapytaj o cenę").map(s => ({
          "@type": "Offer",
          "name": s.name,
          "price": s.price.replace(/[^\d]/g, ""),
          "priceCurrency": "PLN",
        })),
      } : {}),
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": data.faq.map(f => ({
        "@type": "Question",
        "name": f.q,
        "acceptedAnswer": { "@type": "Answer", "text": f.a },
      })),
    },
  ];

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
