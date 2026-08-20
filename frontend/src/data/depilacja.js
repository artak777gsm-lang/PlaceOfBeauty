/**
 * Baza treści SEO dla klastra "depilacja laserowa".
 * Semantyka i mapa słów kluczowych: /memory/SEO-semantyka-depilacja.md
 *
 * Ceny muszą być zgodne z SERVICES_DATA w backend/server.py oraz z Booksy.
 */

export const SITE_URL = "https://placeof.beauty";
export const BOOKSY_URL =
  "https://booksy.com/pl-pl/103643_place-of-beauty-carika_paznokcie_4424_grodzisk-mazowiecki";
export const PHONE = "+48881777437";
export const PHONE_DISPLAY = "+48 881 777 437";

export const SALON = {
  name: "Place of Beauty",
  street: "Garbarska 17/2",
  city: "Grodzisk Mazowiecki",
  postalCode: "05-825",
  region: "mazowieckie",
  lat: "52.1065",
  lng: "20.6314",
  rating: "4.9",
  reviewCount: "272",
};

export const HUB_PATH = "/uslugi/depilacja-laserowa";

/* ------------------------------------------------------------------ */
/* CENNIK — źródło prawdy dla wszystkich podstron                       */
/* ------------------------------------------------------------------ */

export const CENNIK = [
  {
    name: "Wąsik",
    area: "Górna warga",
    price: 100,
    duration: "10 min",
    zone: "wasik",
    desc: "Laserowe usuwanie wąsika — najczęściej wybierana strefa na twarzy.",
  },
  {
    name: "Pachy",
    area: "Doły pachowe",
    price: 200,
    duration: "15 min",
    zone: "pachy",
    desc: "Najszybszy zabieg i najszybciej widoczne efekty.",
  },
  {
    name: "Bikini płytkie",
    area: "Linia bikini",
    price: 220,
    duration: "20 min",
    zone: "bikini",
    desc: "Owłosienie wychodzące poza linię bielizny.",
  },
  {
    name: "Bikini głębokie",
    area: "Bikini całkowite",
    price: 300,
    duration: "30 min",
    zone: "bikini",
    desc: "Pełna depilacja okolic intymnych wraz z okolicą międzypośladkową.",
  },
  {
    name: "Całe nogi",
    area: "Łydki + uda",
    price: 550,
    duration: "50 min",
    zone: "nogi",
    desc: "Największa powierzchnia — największa oszczędność czasu na co dzień.",
  },
  {
    name: "Nogi + pachy + bikini",
    area: "Pakiet",
    price: 750,
    duration: "1 godz. 45 min",
    zone: "cennik",
    badge: "Oszczędzasz 220 zł",
    desc: "Najpopularniejszy pakiet — trzy strefy podczas jednej wizyty.",
  },
];

export const PAKIET_OSZCZEDNOSC = 220; // 550 + 200 + 220 = 970 zł osobno vs 750 zł w pakiecie

/* ------------------------------------------------------------------ */
/* TECHNOLOGIA PRIMELASE                                                */
/* ------------------------------------------------------------------ */

export const PRIMELASE_SPEC = [
  {
    label: "Długości fali",
    value: "755 / 810 / 940 / 1064 nm",
    desc: "Blend długości fal pozwala dobrać parametry do fototypu skóry i grubości włosa — od cienkiego meszku po grube włosy męskie.",
  },
  {
    label: "Moc",
    value: "do 4800 W",
    desc: "Jeden z najmocniejszych laserów diodowych na rynku. Wysoka moc = krótszy impuls i krótszy zabieg.",
  },
  {
    label: "Chłodzenie",
    value: "Crystal Freeze +5°C",
    desc: "Kontaktowe chłodzenie szafirowej głowicy schładza naskórek w trakcie impulsu — stąd komfort zabiegu.",
  },
  {
    label: "Tryb pracy",
    value: "statyczny i dynamiczny",
    desc: "Tryb dynamiczny (przesuwanie głowicy) skraca czas zabiegu na dużych powierzchniach, statyczny daje precyzję na małych strefach.",
  },
  {
    label: "Fototypy skóry",
    value: "I–VI wg Fitzpatricka",
    desc: "Fala 1064 nm pozwala bezpiecznie pracować także na ciemniejszej karnacji, na której klasyczne lasery bywają ryzykowne.",
  },
  {
    label: "Producent",
    value: "Cocoon Medical (Hiszpania)",
    desc: "Urządzenie klasy medycznej, stosowane w klinikach dermatologii estetycznej w całej Europie.",
  },
];

/* ------------------------------------------------------------------ */
/* FAZY WZROSTU WŁOSA                                                   */
/* ------------------------------------------------------------------ */

export const FAZY_WLOSA = [
  {
    name: "Anagen — faza wzrostu",
    share: "20–30% włosów",
    active: true,
    desc: "Włos jest połączony z macierzą i zawiera najwięcej melaniny. To jedyny moment, w którym wiązka lasera dociera do cebulki i trwale ją niszczy. Dlatego jeden zabieg nigdy nie usunie całego owłosienia — działa tylko na tę część włosów, która akurat rośnie.",
  },
  {
    name: "Katagen — faza przejściowa",
    share: "1–2% włosów",
    active: false,
    desc: "Włos odłącza się od brodawki i przestaje rosnąć. Trwa około 2 tygodni. Energia lasera nie jest w stanie skutecznie uszkodzić macierzy.",
  },
  {
    name: "Telogen — faza spoczynku",
    share: "70–80% włosów",
    active: false,
    desc: "Włos jest gotowy do wypadnięcia, a mieszek odpoczywa przed kolejnym cyklem. Laser tu nie zadziała — trzeba poczekać, aż mieszek wejdzie w anagen. To jest właśnie powód, dla którego zabiegi planujemy co 4–6 tygodni.",
  },
];

/* ------------------------------------------------------------------ */
/* PORÓWNANIE METOD DEPILACJI                                           */
/* ------------------------------------------------------------------ */

export const POROWNANIE_METOD = [
  {
    metoda: "Depilacja laserowa Primelase",
    trwalosc: "Trwała redukcja 80–95%",
    czestotliwosc: "6–8 zabiegów, potem 1× w roku",
    bol: "Niski",
    wrastajace: "Eliminuje problem",
    koszt: "Jednorazowa inwestycja",
    best: true,
  },
  {
    metoda: "Golenie maszynką",
    trwalosc: "1–3 dni",
    czestotliwosc: "Co 1–3 dni, dożywotnio",
    bol: "Brak, ale częste podrażnienia",
    wrastajace: "Nasila",
    koszt: "Ok. 200–400 zł rocznie",
  },
  {
    metoda: "Woskowanie",
    trwalosc: "2–4 tygodnie",
    czestotliwosc: "Co 3–4 tygodnie, dożywotnio",
    bol: "Wysoki",
    wrastajace: "Często powoduje",
    koszt: "Ok. 1200–2400 zł rocznie",
  },
  {
    metoda: "Sugaring (pasta cukrowa)",
    trwalosc: "2–4 tygodnie",
    czestotliwosc: "Co 3–4 tygodnie, dożywotnio",
    bol: "Średni",
    wrastajace: "Zdarza się",
    koszt: "Ok. 1200–2400 zł rocznie",
  },
  {
    metoda: "Depilator elektryczny",
    trwalosc: "2–3 tygodnie",
    czestotliwosc: "Co 2–3 tygodnie, dożywotnio",
    bol: "Wysoki",
    wrastajace: "Często powoduje",
    koszt: "Koszt urządzenia + czas",
  },
  {
    metoda: "Krem do depilacji",
    trwalosc: "3–7 dni",
    czestotliwosc: "Co tydzień",
    bol: "Brak, ryzyko uczulenia",
    wrastajace: "Nie rozwiązuje",
    koszt: "Ok. 300–500 zł rocznie",
  },
  {
    metoda: "IPL / fotodepilacja",
    trwalosc: "Czasowa redukcja",
    czestotliwosc: "10–12 zabiegów + podtrzymujące",
    bol: "Niski",
    wrastajace: "Ogranicza",
    koszt: "Zbliżony do lasera, mniejsza skuteczność",
  },
  {
    metoda: "Elektroliza",
    trwalosc: "Trwała, włos po włosie",
    czestotliwosc: "Bardzo wiele sesji",
    bol: "Wysoki",
    wrastajace: "Eliminuje",
    koszt: "Bardzo wysoki przy dużych strefach",
  },
];

/* ------------------------------------------------------------------ */
/* PRZYGOTOWANIE I PIELĘGNACJA                                          */
/* ------------------------------------------------------------------ */

export const PRZED_ZABIEGIEM = [
  {
    title: "Ogol strefę 12–24 godziny wcześniej",
    desc: "Włos musi zostać w mieszku, ale nie może wystawać ponad skórę — inaczej energia lasera spali go na powierzchni zamiast dotrzeć do cebulki.",
  },
  {
    title: "Nie woskuj i nie wyrywaj włosów przez 4 tygodnie",
    desc: "Wosk, pasta cukrowa, depilator i pęseta usuwają włos razem z korzeniem. Laser nie ma wtedy w co trafić, a zabieg jest po prostu stracony.",
  },
  {
    title: "Nie opalaj się 2–4 tygodnie przed zabiegiem",
    desc: "Dotyczy też solarium i samoopalacza. Melanina w opalonym naskórku pochłania energię lasera i zwiększa ryzyko podrażnienia lub przebarwienia.",
  },
  {
    title: "Odstaw kosmetyki złuszczające",
    desc: "Kwasy i retinol na 7 dni przed zabiegiem, peelingi mechaniczne na 3 dni. Naskórek ma być nienaruszony.",
  },
  {
    title: "Zgłoś przyjmowane leki",
    desc: "Izotretynoina, część antybiotyków, ziele dziurawca i leki moczopędne działają fotouczulająco. Powiedz o nich podczas konsultacji.",
  },
  {
    title: "Przyjdź z czystą skórą",
    desc: "Bez dezodorantu, balsamu, olejków i makijażu w strefie zabiegowej. Warstwa kosmetyku zaburza kontakt głowicy ze skórą.",
  },
];

export const PO_ZABIEGU = [
  {
    title: "Pierwsze 24–48 godzin",
    desc: "Bez sauny, basenu, gorącej kąpieli i intensywnego treningu. Lekkie zaczerwienienie i uczucie ciepła są normalne i zwykle mijają w kilka godzin.",
  },
  {
    title: "Chłodzenie i nawilżanie",
    desc: "Chłodny okład i kosmetyk łagodzący (pantenol, aloes) przez pierwsze dni. Unikaj kosmetyków z alkoholem i perfumowanych.",
  },
  {
    title: "SPF 50 przez 2 tygodnie",
    desc: "Depilowana skóra jest wrażliwa na słońce. Filtr chroni przed przebarwieniami — również jesienią i zimą, jeśli strefa jest odsłonięta.",
  },
  {
    title: "Włosy będą wypadać 1–3 tygodnie",
    desc: "To nie jest odrost, tylko naturalne wypychanie zniszczonych włosów przez skórę. Delikatny peeling po tygodniu przyspiesza ten proces.",
  },
  {
    title: "Golenie tak, wyrywanie nie",
    desc: "Pomiędzy zabiegami możesz się golić do woli. Wosk, pasta i depilator są zakazane przez cały czas trwania serii.",
  },
  {
    title: "Trzymaj się harmonogramu",
    desc: "Odstępy 4–6 tygodni nie są przypadkowe — wynikają z cyklu wzrostu włosa. Przerwanie serii cofa część efektów.",
  },
];

/* ------------------------------------------------------------------ */
/* EFEKTY W CZASIE                                                      */
/* ------------------------------------------------------------------ */

export const EFEKTY_TIMELINE = [
  {
    when: "1–3 dni po zabiegu",
    what: "Skóra wraca do normy. Włosy w strefie wyglądają, jakby dalej rosły — to zniszczone włosy wypychane przez naskórek.",
  },
  {
    when: "1–3 tygodnie",
    what: "Włosy zaczynają masowo wypadać. Skóra staje się wyraźnie gładsza — to pierwszy moment, w którym widać, że zabieg zadziałał.",
  },
  {
    when: "Po 1. zabiegu",
    what: "Redukcja rzędu 10–25% owłosienia. Odrost jest cieńszy i wolniejszy, golenie potrzebne rzadziej.",
  },
  {
    when: "Po 3. zabiegu",
    what: "Zwykle 40–60% mniej włosów. Większość klientek przestaje na tym etapie golić się codziennie.",
  },
  {
    when: "Po 6.–8. zabiegu",
    what: "Docelowa redukcja 80–95%. Pozostają pojedyncze, cienkie i jasne włoski.",
  },
  {
    when: "Podtrzymanie",
    what: "1–2 zabiegi w roku wystarczą, aby utrzymać efekt. Gospodarka hormonalna może z czasem pobudzić nowe mieszki — to normalne.",
  },
];

/* ------------------------------------------------------------------ */
/* MITY I FAKTY                                                         */
/* ------------------------------------------------------------------ */

export const MITY = [
  {
    mit: "Po jednym zabiegu włosy znikną na zawsze",
    fakt: "Laser działa wyłącznie na włosy w fazie anagenu, czyli na 20–30% owłosienia naraz. Dlatego potrzebna jest seria 6–8 zabiegów rozłożona na kilka miesięcy.",
  },
  {
    mit: "Depilacja laserowa jest bardzo bolesna",
    fakt: "Przy laserze z chłodzeniem kontaktowym większość osób opisuje odczucie jako ciepło i lekkie mrowienie. Bardziej wrażliwe są strefy o cienkiej skórze — bikini głębokie i wąsik.",
  },
  {
    mit: "Laser powoduje raka skóry",
    fakt: "Laser depilacyjny emituje światło z zakresu podczerwieni, które nie ma właściwości jonizujących i nie uszkadza DNA komórek. To zupełnie inna fizyka niż promieniowanie UV z solarium.",
  },
  {
    mit: "Latem nie można robić depilacji laserowej",
    fakt: "Można, o ile nie opalasz strefy zabiegowej i stosujesz SPF 50. Warunkiem jest nieopalona skóra — nie kalendarz.",
  },
  {
    mit: "Po laserze włosy odrastają grubsze",
    fakt: "Jest odwrotnie — odrost jest cieńszy, jaśniejszy i wolniejszy. Efekt „grubszych włosów” pojawia się po goleniu, bo maszynka ścina włos na najgrubszym odcinku.",
  },
  {
    mit: "Trzeba zapuścić włosy przed zabiegiem",
    fakt: "To zasada z woskowania. Przy laserze jest dokładnie odwrotnie — strefę golimy 12–24 godziny przed wizytą.",
  },
  {
    mit: "Laser działa na każdy kolor włosa",
    fakt: "Laser namierza melaninę. Włosy siwe, białe i bardzo jasny rudy mają jej zbyt mało, aby zabieg był skuteczny. Kwalifikację przeprowadzamy na bezpłatnej konsultacji.",
  },
  {
    mit: "Depilacja laserowa jest tylko dla kobiet",
    fakt: "Mężczyźni to coraz większa część klientów — najczęściej plecy, kark, klatka piersiowa i strefa intymna. Grubszy włos męski bywa nawet wdzięczniejszym celem dla lasera.",
  },
];

/* ------------------------------------------------------------------ */
/* FOTOTYPY SKÓRY                                                       */
/* ------------------------------------------------------------------ */

export const FOTOTYPY = [
  { typ: "I", opis: "Bardzo jasna skóra, piegi, włosy rude lub blond", efekt: "Bezpiecznie — skuteczność zależy od koloru włosa" },
  { typ: "II", opis: "Jasna skóra, trudno się opala, często się oparza", efekt: "Bardzo dobre efekty przy ciemnym włosie" },
  { typ: "III", opis: "Jasna oliwkowa skóra, opala się stopniowo", efekt: "Optymalny kontrast skóra–włos" },
  { typ: "IV", opis: "Oliwkowa skóra, łatwo się opala, rzadko oparza", efekt: "Bardzo dobre efekty, parametry dobierane ostrożniej" },
  { typ: "V", opis: "Ciemna skóra, prawie nigdy nie ulega oparzeniom", efekt: "Praca dłuższą falą 1064 nm" },
  { typ: "VI", opis: "Bardzo ciemna skóra", efekt: "Możliwa dzięki fali 1064 nm — wymaga doświadczenia operatora" },
];

/* ------------------------------------------------------------------ */
/* SŁOWNIK POJĘĆ                                                        */
/* ------------------------------------------------------------------ */

export const SLOWNIK = [
  { term: "Depilacja a epilacja", def: "Depilacja to usunięcie włosa nad powierzchnią skóry (golenie, krem). Epilacja usuwa włos wraz z cebulką. Zabieg laserem bywa nazywany zamiennie depilacją i epilacją laserową — potocznie oznaczają to samo." },
  { term: "Selektywna fototermoliza", def: "Zasada, na której opiera się laser: wiązka jest pochłaniana wybiórczo przez melaninę we włosie, zamienia się w ciepło i niszczy macierz mieszka, nie uszkadzając otaczającej skóry." },
  { term: "Melanina", def: "Barwnik odpowiadający za kolor włosa i skóry. To ona pochłania światło lasera — dlatego ciemny włos na jasnej skórze jest najłatwiejszym celem." },
  { term: "Anagen", def: "Faza aktywnego wzrostu włosa, jedyna faza podatna na działanie lasera. W danym momencie znajduje się w niej 20–30% owłosienia." },
  { term: "Fototyp skóry", def: "Klasyfikacja karnacji w skali Fitzpatricka (I–VI), na podstawie której dobiera się długość fali i energię zabiegu." },
  { term: "Laser diodowy", def: "Typ lasera używany w depilacji, ceniony za powtarzalną wiązkę i skuteczność na szerokim zakresie fototypów. Primelase jest laserem diodowym o mocy do 4800 W." },
  { term: "IPL", def: "Intensywne światło impulsowe — nie laser, lecz szerokie spektrum światła. Tańsze w eksploatacji, ale mniej precyzyjne i wymagające większej liczby zabiegów." },
  { term: "Efekt paradoksalny", def: "Rzadkie zjawisko pobudzenia cienkiego meszku do wzrostu, głównie na twarzy i szyi, przy zbyt niskiej energii zabiegu. Zapobiega mu prawidłowy dobór parametrów." },
  { term: "Hirsutyzm", def: "Nadmierne owłosienie typu męskiego u kobiet, najczęściej na tle hormonalnym (np. PCOS). Laser skutecznie redukuje objaw, ale nie leczy przyczyny." },
  { term: "Wrastające włosy", def: "Włos, który nie przebił naskórka i rośnie pod skórą, wywołując stan zapalny. Depilacja laserowa jest jedną z niewielu metod, które ten problem realnie likwidują." },
];

/* ------------------------------------------------------------------ */
/* OKOLICA — areaServed                                                 */
/* ------------------------------------------------------------------ */

export const OKOLICE = [
  "Milanówek",
  "Podkowa Leśna",
  "Brwinów",
  "Pruszków",
  "Żyrardów",
  "Jaktorów",
  "Nadarzyn",
  "Błonie",
  "Ożarów Mazowiecki",
  "Baranów",
  "Radziejowice",
  "Michałowice",
];

/* ------------------------------------------------------------------ */
/* OPINIE (rzeczywiste, z Booksy)                                       */
/* ------------------------------------------------------------------ */

export const OPINIE = [
  {
    name: "Paulina",
    date: "listopad 2025",
    text: "Bardzo profesjonalne podejście do Klienta. Super atmosfera i co najważniejsze efekty widoczne już po pierwszym razie.",
    rating: 5,
  },
  {
    name: "Наталя",
    date: "styczeń 2026",
    text: "Polecam!",
    rating: 5,
  },
];

/* ------------------------------------------------------------------ */
/* FAQ — strona główna klastra. Pytania NIE powtarzają się na podstronach */
/* ------------------------------------------------------------------ */

export const HUB_FAQ = [
  {
    q: "Na czym polega depilacja laserowa?",
    a: "Depilacja laserowa polega na selektywnej fototermolizie — wiązka światła jest pochłaniana przez melaninę zawartą we włosie, zamienia się w ciepło i trwale niszczy macierz mieszka włosowego. Otaczająca skóra pozostaje nienaruszona, bo nie zawiera tak dużego stężenia barwnika. Mieszek pozbawiony macierzy nie jest w stanie wyprodukować nowego włosa.",
  },
  {
    q: "Ile kosztuje depilacja laserowa w Grodzisku Mazowieckim?",
    a: "Cennik depilacji laserowej Primelase w Place of Beauty: wąsik — 100 zł (10 min), pachy — 200 zł (15 min), bikini płytkie — 220 zł (20 min), bikini głębokie — 300 zł (30 min), całe nogi — 550 zł (50 min). Pakiet nogi + pachy + bikini kosztuje 750 zł zamiast 970 zł, czyli 220 zł taniej.",
  },
  {
    q: "Ile zabiegów depilacji laserowej potrzeba?",
    a: "Standardowo 6–8 zabiegów. Liczba wynika z cyklu wzrostu włosa: laser niszczy tylko włosy w fazie anagenu, a jest ich w danym momencie 20–30%. Osoby z jasnym lub cienkim włosem oraz z zaburzeniami hormonalnymi mogą potrzebować 8–10 sesji. Dokładny plan ustalamy na bezpłatnej konsultacji.",
  },
  {
    q: "Co ile tygodni wykonuje się kolejne zabiegi?",
    a: "Najczęściej co 4–6 tygodni. Na twarzy, gdzie cykl włosa jest krótszy, odstępy są bliższe 4 tygodniom, a na nogach i plecach mogą sięgać 8–10 tygodni. Odstęp dobieramy tak, aby trafić w kolejną porcję włosów wchodzących w fazę wzrostu.",
  },
  {
    q: "Czy depilacja laserowa boli?",
    a: "Primelase pracuje z kontaktowym chłodzeniem szafirowej głowicy, które schładza naskórek w momencie impulsu. Większość klientów opisuje odczucie jako ciepło i lekkie mrowienie, porównywalne z pstryknięciem gumką. Zdecydowanie mniej boli niż woskowanie. Najbardziej wrażliwe strefy to bikini głębokie i wąsik.",
  },
  {
    q: "Kiedy widać pierwsze efekty depilacji laserowej?",
    a: "Pierwsze efekty pojawiają się 1–3 tygodnie po zabiegu — zniszczone włosy są wypychane przez naskórek i wypadają. Po pierwszej sesji owłosienie zmniejsza się zwykle o 10–25%, odrost jest cieńszy i wolniejszy. Docelowa redukcja 80–95% pojawia się po pełnej serii.",
  },
  {
    q: "Czy depilacja laserowa jest trwała?",
    a: "Zniszczony mieszek nie odtwarza włosa, więc efekt jest trwały. Nie oznacza to jednak matematycznego zera — realny cel to redukcja 80–95% owłosienia. Skóra ma mieszki uśpione, które gospodarka hormonalna może z czasem uaktywnić, dlatego zaleca się 1–2 zabiegi podtrzymujące w roku.",
  },
  {
    q: "Jak przygotować się do depilacji laserowej?",
    a: "Ogol strefę 12–24 godziny przed wizytą, nie woskuj i nie wyrywaj włosów przez 4 tygodnie, nie opalaj się przez 2–4 tygodnie (dotyczy też solarium i samoopalacza), odstaw kwasy i retinol na tydzień, a w dniu zabiegu przyjdź bez dezodorantu, balsamu i makijażu w depilowanej okolicy.",
  },
  {
    q: "Czy trzeba się golić przed depilacją laserową?",
    a: "Tak, i to jest kluczowa różnica względem woskowania. Włos musi zostać w mieszku, ale nie może wystawać ponad skórę — inaczej energia lasera spali go na powierzchni, wywoła nieprzyjemny zapach i podrażnienie, zamiast dotrzeć do cebulki.",
  },
  {
    q: "Co robić po zabiegu depilacji laserowej?",
    a: "Przez 24–48 godzin unikaj sauny, basenu, gorących kąpieli i intensywnego treningu. Stosuj kosmetyki łagodzące z pantenolem lub aloesem oraz filtr SPF 50 przez 2 tygodnie. Nie wyrywaj włosów — golenie między zabiegami jest dozwolone bez ograniczeń.",
  },
  {
    q: "Czy można się opalać po depilacji laserowej?",
    a: "Przez 2 tygodnie po zabiegu depilowaną okolicę należy chronić przed słońcem i solarium oraz stosować SPF 50. Świeżo potraktowana laserem skóra ma podwyższone ryzyko przebarwień pozapalnych, a opalenizna utrudnia też przeprowadzenie kolejnej sesji.",
  },
  {
    q: "Czy można robić depilację laserową latem?",
    a: "Tak. Warunkiem nie jest pora roku, tylko brak aktywnej opalenizny w strefie zabiegowej. Jeżeli planujesz urlop nad morzem, zaplanuj zabieg co najmniej 2 tygodnie przed wyjazdem i 2–4 tygodnie po powrocie. Strefy zakryte ubraniem — bikini, pachy — można spokojnie depilować przez cały rok.",
  },
  {
    q: "Jakie są przeciwwskazania do depilacji laserowej?",
    a: "Ciąża i karmienie piersią, aktywna opalenizna, choroby skóry w strefie zabiegowej, aktywna opryszczka, świeże blizny i tatuaże, przyjmowanie leków fotouczulających (m.in. izotretynoina, niektóre antybiotyki, ziele dziurawca), padaczka światłoczuła, choroby nowotworowe oraz niewyrównana cukrzyca. Pełną kwalifikację przeprowadzamy na konsultacji.",
  },
  {
    q: "Czy można robić depilację laserową w ciąży?",
    a: "Nie wykonujemy zabiegów u kobiet w ciąży i karmiących piersią. Nie ma dowodów na szkodliwość dla dziecka, ale brakuje też badań potwierdzających bezpieczeństwo, a gospodarka hormonalna w tym okresie i tak zaburza efekty. Serię najlepiej zaplanować po zakończeniu karmienia.",
  },
  {
    q: "Czy można wykonać zabieg podczas miesiączki?",
    a: "Zabiegi na nogach, pachach czy twarzy można wykonać bez przeszkód. W przypadku bikini zalecamy przełożenie wizyty — ze względów higienicznych oraz dlatego, że w tych dniach wrażliwość na ból jest wyraźnie większa.",
  },
  {
    q: "Czy można wykonać depilację laserową na tatuażu?",
    a: "Nie. Barwnik tatuażu silnie pochłania energię lasera, co grozi oparzeniem skóry i zniszczeniem wzoru. Tatuaż omijamy z marginesem kilku centymetrów, a pozostałą część strefy depilujemy normalnie.",
  },
  {
    q: "Co z pieprzykami i znamionami w strefie zabiegowej?",
    a: "Znamiona barwnikowe zabezpieczamy białym ołówkiem dermatologicznym i omijamy wiązką. Jeżeli zmiana wygląda nietypowo, przed rozpoczęciem serii prosimy o konsultację dermatologiczną — depilacja może poczekać, zdrowie skóry nie.",
  },
  {
    q: "Czy laser działa na jasne, rude i siwe włosy?",
    a: "Laser namierza melaninę, więc im ciemniejszy włos, tym lepszy efekt. Włosy siwe i białe nie zawierają jej praktycznie wcale — na nich zabieg nie zadziała. Blond i rude reagują słabiej i wymagają większej liczby sesji. Kwalifikację przeprowadzamy indywidualnie na bezpłatnej konsultacji, bo liczy się realny kontrast między włosem a skórą.",
  },
  {
    q: "Czy depilacja laserowa jest bezpieczna dla ciemnej karnacji?",
    a: "Tak. Dłuższa fala 1064 nm słabiej wnika w melaninę naskórka, a mocniej dociera do mieszka, co pozwala bezpiecznie pracować na fototypach V i VI. Kluczowy jest prawidłowy dobór parametrów — dlatego zabieg wykonuje przeszkolona specjalistka, a nie urządzenie domowe.",
  },
  {
    q: "Jakie mogą być skutki uboczne?",
    a: "Najczęściej rumień i lekki obrzęk wokół mieszków, ustępujące w kilka godzin. Rzadziej pojawia się przejściowa suchość, świąd lub drobne strupki. Poważne powikłania — oparzenia i przebarwienia — są następstwem zabiegu na opalonej skórze lub źle dobranych parametrów i praktycznie nie występują przy prawidłowej kwalifikacji.",
  },
  {
    q: "Czym depilacja laserowa różni się od woskowania?",
    a: "Woskowanie usuwa włos razem z cebulką, ale mieszek pozostaje żywy i po 2–4 tygodniach produkuje nowy włos — powtarzasz to całe życie. Laser niszczy macierz mieszka, więc efekt się kumuluje i po serii zabiegów problem znika. Laser jest też mniej bolesny i, w przeciwieństwie do wosku, likwiduje wrastające włoski zamiast je wywoływać.",
  },
  {
    q: "Czym laser różni się od IPL i fotodepilacji?",
    a: "IPL to lampa błyskowa emitująca szerokie spektrum światła, rozpraszające się w skórze. Laser daje jedną, spójną długość fali skupioną dokładnie na mieszku. W praktyce oznacza to mniej zabiegów, lepszą powtarzalność i skuteczność także na cieńszym włosie. Urządzenia domowe IPL mają moc kilkadziesiąt razy niższą niż laser gabinetowy.",
  },
  {
    q: "Od ilu lat można wykonywać depilację laserową?",
    a: "Zabiegi wykonujemy od 18. roku życia. U osób młodszych gospodarka hormonalna wciąż się kształtuje, więc efekt bywa nietrwały — organizm potrafi uaktywnić nowe mieszki mimo prawidłowo przeprowadzonej serii.",
  },
  {
    q: "Czy depilacja laserowa pomaga na wrastające włoski?",
    a: "To jeden z najczęstszych powodów, dla których klienci przechodzą na laser. Wrastanie bierze się z uszkadzania mieszka przez golenie i wyrywanie. Laser likwiduje sam mieszek, więc problem znika u źródła — zwykle już po 2–3 zabiegach widać wyraźną poprawę, także przy nawracającym zapaleniu mieszków włosowych.",
  },
  {
    q: "Czy laser pomoże przy nadmiernym owłosieniu hormonalnym?",
    a: "Tak, przy hirsutyzmie i owłosieniu związanym z PCOS depilacja laserowa skutecznie redukuje objaw i bardzo poprawia komfort życia. Nie leczy jednak przyczyny — hormony nadal mogą uaktywniać nowe mieszki, dlatego przy tych wskazaniach seria bywa dłuższa i zalecane są regularne zabiegi podtrzymujące.",
  },
  {
    q: "Ile trwa jeden zabieg?",
    a: "Od 10 minut przy wąsiku, przez 15 minut na pachach i 20–30 minut na bikini, po 50 minut przy całych nogach. Pakiet trzech stref to około 1 godziny 45 minut. Dużą część czasu zajmuje przygotowanie skóry i pielęgnacja po zabiegu — sama praca lasera jest krótsza.",
  },
  {
    q: "Czy mogę wykonać kilka stref podczas jednej wizyty?",
    a: "Tak i jest to najwygodniejsze rozwiązanie. Najczęściej wybierany zestaw — nogi, pachy i bikini — mamy w pakiecie za 750 zł zamiast 970 zł. Rezerwując wizytę, zaznacz wszystkie interesujące Cię strefy, abyśmy zarezerwowali odpowiednio długi termin.",
  },
  {
    q: "Czy konsultacja przed serią jest płatna?",
    a: "Konsultacja jest bezpłatna. Oceniamy podczas niej fototyp skóry, kolor i grubość włosa, omawiamy przeciwwskazania i przyjmowane leki, dobieramy parametry oraz układamy harmonogram całej serii wraz z kosztem.",
  },
  {
    q: "Co się stanie, jeśli przerwę serię zabiegów?",
    a: "Efekty już uzyskane nie cofną się — zniszczone mieszki pozostają zniszczone. Włosy, które nie zdążyły przejść przez fazę anagenu w trakcie serii, będą jednak rosnąć dalej. Po dłuższej przerwie zwykle nie trzeba zaczynać od zera, ale plan aktualizujemy podczas kolejnej wizyty.",
  },
  {
    q: "Czy zabieg jest higieniczny?",
    a: "Głowicę lasera dezynfekujemy przed każdym klientem, stosujemy jednorazowe podkłady i rękawiczki, a żel kontaktowy nakładamy w sposób wykluczający kontakt opakowania ze skórą. Klient i operator pracują w okularach ochronnych dobranych do długości fali.",
  },
  {
    q: "Czy przyjmujecie klientów spoza Grodziska Mazowieckiego?",
    a: "Tak, na depilację laserową przyjeżdżają do nas klienci z Milanówka, Podkowy Leśnej, Brwinowa, Pruszkowa, Żyrardowa, Jaktorowa, Nadarzyna, Błonia i Ożarowa Mazowieckiego. Salon przy ul. Garbarskiej 17/2 leży blisko centrum, z dogodnym dojazdem i miejscami parkingowymi.",
  },
  {
    q: "Jak umówić się na depilację laserową?",
    a: "Najwygodniej przez Booksy — rezerwacja online działa 24/7 i od razu widzisz wolne terminy. Możesz też zadzwonić pod numer +48 881 777 437. Salon jest czynny od poniedziałku do soboty w godzinach 9:00–20:00.",
  },
];

/* ------------------------------------------------------------------ */
/* STREFY — podstrony klastra /uslugi/depilacja-laserowa/:strefa        */
/* ------------------------------------------------------------------ */

export const STREFY = {
  pachy: {
    slug: "pachy",
    ctaAccent: "depilację laserową pach",
    introAccent: "pachy",
    zone: "Pachy",
    breadcrumb: "Pachy",
    h1: "Depilacja laserowa pach",
    seoTitle: "Depilacja laserowa pach — 200 zł, 15 min | Place of Beauty",
    seoDesc:
      "Depilacja laserowa pach Primelase w Grodzisku Mazowieckim — 200 zł, 15 minut. Seria 6–8 sesji i koniec z goleniem, podrażnieniami i ciemnymi pachami.",
    seoKeywords:
      "depilacja laserowa pachy, depilacja laserowa pach cena, depilacja laserowa pachy Grodzisk Mazowiecki, laser na pachy, ile kosztuje depilacja laserowa pach, depilacja laserowa pachy ile zabiegów, depilacja pach laserem opinie, ciemne pachy po goleniu, epilacja laserowa pach, usuwanie owłosienia pach",
    image: "/gallery/1186873956780122.jpg",
    imageAlt: "Depilacja laserowa pach laserem Primelase w salonie Place of Beauty w Grodzisku Mazowieckim",
    lead:
      "Pachy to strefa, od której zaczyna większość naszych klientek. Kwadrans na fotelu, jedna z najmniej wrażliwych okolic ciała i efekt widoczny szybciej niż gdziekolwiek indziej.",
    facts: [
      { label: "Cena", value: "200 zł" },
      { label: "Czas zabiegu", value: "15 minut" },
      { label: "Seria", value: "6–8 zabiegów" },
      { label: "Odstępy", value: "co 4–6 tygodni" },
      { label: "Odczucia", value: "Niskie" },
    ],
    intro: [
      "Codzienne golenie pach kończy się zawsze tak samo: zaczerwienieniem, pieczeniem po dezodorancie i szarym cieniem, który widać nawet zaraz po ogoleniu. Ten cień to nie brud ani przebarwienie — to ciemny włos prześwitujący przez wyjątkowo cienką skórę pachy. Żadna maszynka tego nie rozwiąże, bo problem siedzi pod powierzchnią.",
      "Depilacja laserowa pach usuwa przyczynę zamiast maskować skutek. Wiązka lasera Primelase dociera do macierzy mieszka włosowego i trwale ją niszczy, a skóra pachy stopniowo się rozjaśnia i przestaje reagować na kosmetyki podrażnieniem.",
      "Pachy reagują na laser wyjątkowo dobrze. Włos jest tu gruby i mocno wysycony melaniną, czyli stanowi idealny cel dla wiązki, a powierzchnia jest na tyle mała, że cały zabieg zamyka się w kwadransie — spokojnie mieści się w przerwie na lunch.",
    ],
    sections: [
      {
        h2: "Dlaczego warto zacząć właśnie od pach",
        bullets: [
          { title: "Najkrótszy zabieg w cenniku", desc: "15 minut razem z przygotowaniem skóry i pielęgnacją po zabiegu." },
          { title: "Najszybciej widoczny efekt", desc: "Gruby, ciemny włos pochłania energię najlepiej — po pierwszej serii pachy bywają najczystszą strefą całego ciała." },
          { title: "Koniec z podrażnieniami po dezodorancie", desc: "Golenie mikrouszkadza naskórek, a antyperspirant wchodzi w te mikroskaleczenia. Bez golenia problem znika." },
          { title: "Rozjaśnienie skóry pach", desc: "Zniknięcie prześwitującego włosa likwiduje efekt „szarej pachy”, którego nie da się zmyć ani wybielić." },
          { title: "Idealna strefa na start", desc: "Niska cena i niska wrażliwość — dobry sposób, żeby sprawdzić, jak Twoja skóra reaguje na laser, zanim zdecydujesz się na większe partie." },
          { title: "Całoroczna dostępność", desc: "Pachy są zakryte ubraniem, więc opalenizna nie przeszkadza — serię można prowadzić także latem." },
        ],
      },
      {
        h2: "Jak przebiega zabieg depilacji laserowej pach",
        paragraphs: [
          "Na wizytę przychodzisz z ogoloną strefą — najlepiej ogolić pachy 12–24 godziny wcześniej, bez dezodorantu i balsamu w dniu zabiegu. Specjalistka ocenia stan skóry, zakłada okulary ochronne i nakłada chłodzący żel kontaktowy.",
          "Następnie prowadzi głowicę Primelase wzdłuż dołu pachowego, pokrywając całą powierzchnię nakładającymi się impulsami. Szafirowa końcówka schładza naskórek w momencie impulsu, dzięki czemu zabieg odbierasz jako ciepło i mrowienie, a nie ból. Na jedną pachę przypada zwykle około 3 minut pracy.",
          "Po zabiegu skóra dostaje kojący preparat. Przez pierwszą dobę odpuszczasz siłownię, saunę i antyperspirant — wystarczy delikatny dezodorant bez alkoholu. Przez kolejne 1–3 tygodnie włosy będą wypadać samoistnie.",
        ],
      },
      {
        h2: "Efekty po kolejnych zabiegach",
        bullets: [
          { title: "Po 1. zabiegu", desc: "Włosy wypadają w ciągu 1–3 tygodni, odrost jest wyraźnie wolniejszy. Zamiast golić się codziennie, sięgasz po maszynkę co kilka dni." },
          { title: "Po 3. zabiegu", desc: "Zwykle około połowy owłosienia mniej. Odrastające włoski są cieńsze i jaśniejsze, skóra pachy zauważalnie się rozjaśnia." },
          { title: "Po 6.–8. zabiegu", desc: "Redukcja rzędu 80–95%. Pozostają pojedyncze, ledwo widoczne włoski, a golenie przestaje być częścią codziennej rutyny." },
          { title: "Podtrzymanie", desc: "Jeden zabieg w roku wystarcza, aby utrzymać efekt — także wtedy, gdy hormony pobudzą pojedyncze uśpione mieszki." },
        ],
      },
      {
        h2: "Depilacja laserowa pach a golenie — rachunek czasu",
        paragraphs: [
          "Przy goleniu co drugi dzień to około 180 razy w roku. Nawet licząc bardzo ostrożnie dwie minuty na raz, wychodzi 6 godzin rocznie spędzonych pod prysznicem tylko na pachach — i tak przez całe życie, do tego z kosztem wymiennych ostrzy.",
          "Pełna seria depilacji laserowej pach to 6–8 wizyt po 15 minut, czyli około 2 godzin łącznie, rozłożonych na kilka miesięcy. Po niej temat zamyka się na lata, z jednym zabiegiem przypominającym w roku.",
        ],
      },
    ],
    faq: [
      {
        q: "Ile kosztuje depilacja laserowa pach?",
        a: "Jeden zabieg depilacji laserowej pach kosztuje 200 zł i trwa 15 minut. Pełna seria 6–8 zabiegów to wydatek rzędu 1200–1600 zł rozłożony na kilka miesięcy. Pachy wchodzą też w skład pakietu nogi + pachy + bikini za 750 zł.",
      },
      {
        q: "Ile zabiegów potrzeba na pachy?",
        a: "Zazwyczaj 6–8 zabiegów w odstępach 4–6 tygodni. Pachy należą do stref, które reagują na laser najlepiej, bo włos jest tu gruby i ciemny — u części osób satysfakcjonujący efekt pojawia się już po 5–6 sesjach.",
      },
      {
        q: "Czy depilacja laserowa pach boli?",
        a: "To jedna z najmniej wrażliwych stref. Dzięki kontaktowemu chłodzeniu głowicy Primelase odczucie sprowadza się do ciepła i krótkiego mrowienia przy impulsie. W porównaniu z woskowaniem pach różnica jest ogromna.",
      },
      {
        q: "Czy po depilacji laserowej pach mogę używać dezodorantu?",
        a: "Przez pierwsze 24–48 godzin lepiej odstawić antyperspiranty z solami glinu i kosmetyki z alkoholem, bo mogą szczypać podrażnioną skórę. Potem wracasz do swoich zwykłych kosmetyków bez ograniczeń.",
      },
      {
        q: "Czy laser pomoże na ciemne pachy?",
        a: "Jeśli ciemny odcień bierze się z ciemnego włosa prześwitującego przez cienką skórę — a tak jest w większości przypadków — to tak, skóra stopniowo się rozjaśnia wraz z ubywaniem włosów. Jeśli przyczyną są przebarwienia pozapalne po latach golenia, laser depilacyjny ich nie usunie, ale zatrzyma ich pogłębianie.",
      },
      {
        q: "Czy depilacja laserowa zmniejsza pocenie się pach?",
        a: "Nie. Laser depilacyjny działa na mieszki włosowe, a nie na gruczoły potowe. Wiele osób odczuwa jednak, że po zabiegach pachy pozostają dłużej świeże — bez włosów pot szybciej odparowuje i mniej sprzyja bakteriom odpowiedzialnym za zapach.",
      },
      {
        q: "Czy między zabiegami mogę golić pachy?",
        a: "Tak i jest to wręcz zalecane. Zakazane są tylko metody usuwające włos z cebulką: wosk, pasta cukrowa, depilator i pęseta. Maszynka nie narusza mieszka, więc nie przeszkadza w serii.",
      },
      {
        q: "Kiedy zobaczę pierwszy efekt na pachach?",
        a: "Około 1–3 tygodni po pierwszym zabiegu, gdy zniszczone włosy zaczną wypadać. Wcześniej możesz mieć wrażenie, że włosy dalej rosną — to naturalne wypychanie martwych włosów przez naskórek, a nie odrost.",
      },
      {
        q: "Czy pachy można połączyć z inną strefą w trakcie jednej wizyty?",
        a: "Tak, to najczęstszy scenariusz. Pachy zajmują tylko 15 minut, więc bez problemu dokładamy je do bikini lub nóg. Najkorzystniejszy jest pakiet nogi + pachy + bikini za 750 zł zamiast 970 zł.",
      },
      {
        q: "Czy po zabiegu pach mogę iść na trening?",
        a: "Zalecamy odczekać 24–48 godzin. Pot i tarcie odzieży o świeżo potraktowaną laserem skórę mogą wywołać podrażnienie, a wysoka temperatura ciała nasila zaczerwienienie. Spacer czy lekka aktywność nie są problemem.",
      },
    ],
    related: ["bikini", "nogi", "cennik"],
  },

  nogi: {
    slug: "nogi",
    ctaAccent: "depilację laserową nóg",
    introAccent: "nogi",
    zone: "Nogi",
    breadcrumb: "Nogi",
    h1: "Depilacja laserowa nóg",
    seoTitle: "Depilacja laserowa nóg — całe nogi 550 zł | Place of Beauty",
    seoDesc:
      "Depilacja laserowa całych nóg (łydki + uda) Primelase w Grodzisku Mazowieckim — 550 zł, 50 minut. Gładkie nogi bez golenia i wrastających włosków.",
    seoKeywords:
      "depilacja laserowa nóg, depilacja laserowa nogi cena, depilacja laserowa całe nogi, depilacja laserowa łydki, depilacja laserowa uda, laser na nogi cena, depilacja laserowa nóg Grodzisk Mazowiecki, depilacja laserowa nogi ile zabiegów, wrastające włoski nogi, gładkie nogi bez golenia",
    image: "/gallery/1137041761763342.jpg",
    imageAlt: "Depilacja laserowa nóg laserem Primelase — salon Place of Beauty Grodzisk Mazowiecki",
    lead:
      "Nogi to największa powierzchnia ciała i jednocześnie strefa, na której depilacja laserowa zwraca się najszybciej — pod względem czasu, kosztów i komfortu skóry.",
    facts: [
      { label: "Cena", value: "550 zł" },
      { label: "Zakres", value: "Łydki + uda" },
      { label: "Czas zabiegu", value: "50 minut" },
      { label: "Seria", value: "6–8 zabiegów" },
      { label: "Odstępy", value: "co 6–8 tygodni" },
    ],
    intro: [
      "Golenie nóg to rytuał, który powtarza się co dwa, trzy dni przez większość życia. Efekt trzyma się kilkadziesiąt godzin, a w zamian dostajesz szorstki odrost, wysuszoną skórę po maszynce i — u wielu osób — powracające wrastające włoski na łydkach.",
      "Depilacja laserowa nóg zamyka ten temat na dobre. Zabieg obejmuje całe nogi, czyli łydki wraz z udami, i trwa około 50 minut — laser Primelase pracuje w trybie dynamicznym, przesuwając głowicę po skórze, co pozwala szybko pokryć dużą powierzchnię.",
      "To także strefa, w której najwyraźniej widać różnicę w kosztach. Jedna seria zabiegów kończy temat na lata, podczas gdy woskowanie nóg co miesiąc jest wydatkiem, który wraca co roku, bez końca.",
    ],
    sections: [
      {
        h2: "Co obejmuje depilacja całych nóg",
        paragraphs: [
          "W cenie 550 zł depilujemy nogi w całości: łydki, kolana i uda, wraz z okolicą wewnętrznej strony ud, która przy goleniu podrażnia się najczęściej. Palce i stopy obejmujemy zabiegiem na życzenie, w ramach tego samego czasu.",
          "Jeśli zależy Ci tylko na wybranym fragmencie — samych łydkach albo samych udach — powiedz o tym przy rezerwacji. Wycenę mniejszego zakresu ustalamy indywidualnie podczas bezpłatnej konsultacji, bo zależy ona od powierzchni i gęstości owłosienia.",
        ],
      },
      {
        h2: "Dlaczego akurat nogi opłacają się najbardziej",
        bullets: [
          { title: "Największa oszczędność czasu", desc: "Golenie nóg co 2–3 dni to kilkanaście godzin rocznie. Pełna seria laserowa to około 7 godzin — jednorazowo." },
          { title: "Koniec z wrastającymi włoskami", desc: "Łydki to klasyczne miejsce wrastania po maszynce i wosku. Laser niszczy mieszek, więc nie ma czemu wrastać." },
          { title: "Skóra przestaje być szorstka", desc: "Bez codziennego zdrapywania naskórka maszynką nogi zostają gładkie także w dotyku, nie tylko wizualnie." },
          { title: "Brak siniaków i zadrapań", desc: "Odpada ryzyko skaleczeń przy goleniu na sucho i w pośpiechu." },
          { title: "Rajstopy i sport bez kompromisów", desc: "Nie musisz planować golenia pod wyjście, basen czy trening." },
          { title: "Efekt kumulacyjny", desc: "Każdy kolejny zabieg pracuje na trwałym rezultacie, a nie zaczyna wszystko od zera jak wosk." },
        ],
      },
      {
        h2: "Kiedy zacząć serię, żeby mieć gładkie nogi na lato",
        paragraphs: [
          "Seria 6–8 zabiegów w odstępach 6–8 tygodni zajmuje od 9 do 14 miesięcy. Jeśli celujesz w sezon plażowy, najlepszym momentem na start jest jesień lub początek zimy — do czerwca zdążysz przejść większość serii, a skóra przez cały ten czas i tak jest zakryta.",
          "Start wiosną również ma sens, ale trzeba pamiętać o zasadzie braku aktywnej opalenizny: zabieg planujemy co najmniej 2 tygodnie przed wyjazdem i 2–4 tygodnie po powrocie z urlopu. Latem po każdej sesji obowiązkowy jest filtr SPF 50 na nogach.",
        ],
      },
      {
        h2: "Sport, opalanie i pielęgnacja nóg po zabiegu",
        bullets: [
          { title: "Pierwsze 48 godzin", desc: "Bez biegania, siłowni, basenu i sauny. Tarcie i pot na świeżo potraktowanej skórze to najczęstsza przyczyna podrażnień." },
          { title: "SPF 50 przez 2 tygodnie", desc: "Nogi są najczęściej odsłanianą strefą — bez filtra ryzykujesz przebarwienia pozapalne." },
          { title: "Nawilżanie codziennie", desc: "Balsam bez alkoholu i substancji zapachowych przyspiesza regenerację i ułatwia wypadanie włosów." },
          { title: "Peeling po tygodniu", desc: "Delikatny peeling enzymatyczny pomaga naskórkowi pozbyć się martwych włosów. Wcześniej nie złuszczaj." },
          { title: "Golenie bez ograniczeń", desc: "Między sesjami możesz się golić do woli — zakazane są tylko wosk, pasta cukrowa i depilator." },
        ],
      },
    ],
    faq: [
      {
        q: "Ile kosztuje depilacja laserowa nóg?",
        a: "Depilacja laserowa całych nóg — łydek wraz z udami — kosztuje 550 zł za zabieg i trwa 50 minut. Pełna seria 6–8 sesji to koszt rzędu 3300–4400 zł. W pakiecie z pachami i bikini płacisz 750 zł za wizytę zamiast 970 zł.",
      },
      {
        q: "Co dokładnie obejmuje zabieg „całe nogi”?",
        a: "Łydki, kolana i uda wraz z wewnętrzną stroną ud. Stopy i palce dodajemy na życzenie w ramach tego samego zabiegu. Bikini stanowi osobną strefę i jest wyceniane oddzielnie.",
      },
      {
        q: "Czy mogę zrobić same łydki albo same uda?",
        a: "Tak. Zakres i cenę mniejszej partii ustalamy indywidualnie na bezpłatnej konsultacji, ponieważ zależą od powierzchni oraz gęstości owłosienia. Warto jednak wiedzieć, że przy pełnych nogach cena za centymetr skóry wypada zdecydowanie korzystniej.",
      },
      {
        q: "Ile zabiegów potrzeba na nogi?",
        a: "Standardowo 6–8 zabiegów, w odstępach 6–8 tygodni. Na nogach cykl wzrostu włosa jest dłuższy niż na twarzy, dlatego przerwy między sesjami są tu większe — a cała seria trwa od 9 do 14 miesięcy.",
      },
      {
        q: "Czy depilacja laserowa nóg boli?",
        a: "Nogi to duża, ale mało wrażliwa powierzchnia — odczucia są łagodne, porównywalne z ciepłem i mrowieniem. Bardziej wyczuwalna bywa wewnętrzna strona ud i okolica kolan, gdzie skóra jest cieńsza. Chłodzenie kontaktowe głowicy działa przez cały zabieg.",
      },
      {
        q: "Czy laser pomoże na wrastające włoski na nogach?",
        a: "Tak, to jeden z głównych powodów, dla których klienci rezygnują z maszynki na rzecz lasera. Wrastanie bierze się z uszkadzania ujścia mieszka przy goleniu i wyrywaniu. Laser eliminuje sam mieszek, więc problem znika u źródła — poprawę widać zwykle już po 2–3 zabiegach.",
      },
      {
        q: "Czy po zabiegu na nogach mogę iść pobiegać lub na basen?",
        a: "Odczekaj 48 godzin. Pot, chlorowana woda i tarcie odzieży sportowej o rozgrzaną skórę to najczęstsze przyczyny podrażnień po zabiegu. Spokojny spacer jest jak najbardziej w porządku.",
      },
      {
        q: "Czy laser zadziała na jasne włosy na nogach?",
        a: "Skuteczność zależy od zawartości melaniny. Ciemny blond i włosy brązowe reagują dobrze, bardzo jasny blond i rudy — słabiej i wymagają większej liczby sesji. Włosy siwe i białe nie poddają się zabiegowi. Realną ocenę zrobimy podczas bezpłatnej konsultacji.",
      },
      {
        q: "Ile trwa cała seria depilacji nóg?",
        a: "Od 9 do 14 miesięcy, w zależności od tego, czy odstępy między zabiegami wynoszą 6 czy 8 tygodni oraz ile sesji okaże się potrzebnych. To dłużej niż przy pachach, bo cykl wzrostu włosa na nogach jest dłuższy.",
      },
      {
        q: "Czy przed zabiegiem na nogach trzeba zapuścić włosy?",
        a: "Nie — to zasada z woskowania. Nogi golimy 12–24 godziny przed wizytą. Włos ma pozostać w mieszku, ale nie może wystawać ponad skórę, bo wtedy energia lasera zużywa się na powierzchni zamiast dotrzeć do cebulki.",
      },
    ],
    related: ["bikini", "pachy", "cennik"],
  },
};

Object.assign(STREFY, {
  bikini: {
    slug: "bikini",
    ctaAccent: "depilację laserową bikini",
    introAccent: "bikini",
    zone: "Bikini",
    breadcrumb: "Bikini",
    h1: "Depilacja laserowa bikini",
    seoTitle: "Depilacja laserowa bikini — od 220 zł | Place of Beauty",
    seoDesc:
      "Depilacja laserowa bikini w Grodzisku Mazowieckim: płytkie 220 zł, głębokie 300 zł. Laser Primelase — dyskretnie, higienicznie, bez wrastających włosków.",
    seoKeywords:
      "depilacja laserowa bikini, depilacja laserowa bikini cena, depilacja laserowa bikini głębokie, depilacja laserowa bikini płytkie, bikini brazylijskie laser, depilacja laserowa bikini Grodzisk Mazowiecki, depilacja laserowa bikini ile zabiegów, depilacja intymna laserem, wrastające włoski bikini, depilacja laserowa okolic intymnych",
    image: "/gallery/1186874330113418.jpg",
    imageAlt: "Depilacja laserowa bikini laserem Primelase w salonie Place of Beauty Grodzisk Mazowiecki",
    lead:
      "Bikini to strefa, w której depilacja laserowa daje najbardziej odczuwalną zmianę jakości życia: koniec z wrastającymi włoskami, zapaleniem mieszków i podrażnieniami po każdym goleniu.",
    facts: [
      { label: "Bikini płytkie", value: "220 zł / 20 min" },
      { label: "Bikini głębokie", value: "300 zł / 30 min" },
      { label: "Seria", value: "6–8 zabiegów" },
      { label: "Odstępy", value: "co 4–6 tygodni" },
      { label: "Odczucia", value: "Wyższa wrażliwość" },
    ],
    intro: [
      "Okolice intymne mają cienką skórę, gęste ujścia mieszków i stały kontakt z bielizną. To połączenie sprawia, że każda mechaniczna metoda depilacji — maszynka, wosk, pasta cukrowa — prędzej czy później kończy się czerwonymi krostkami, wrastającymi włoskami i zapaleniem mieszków włosowych.",
      "Depilacja laserowa działa inaczej: nie narusza naskórka, tylko przez niego przechodzi. Energia zostaje pochłonięta dopiero w mieszku, który trwale przestaje produkować włos. Skóra bikini nie jest drażniona, więc ma szansę się wygoić — u większości osób stany zapalne ustępują już w trakcie serii.",
      "W Place of Beauty w Grodzisku Mazowieckim oferujemy dwa warianty: bikini płytkie, obejmujące owłosienie wychodzące poza linię bielizny, oraz bikini głębokie — pełną depilację okolic intymnych wraz z okolicą międzypośladkową.",
    ],
    sections: [
      {
        h2: "Bikini płytkie, głębokie i brazylijskie — czym się różnią",
        bullets: [
          { title: "Bikini płytkie — 220 zł", desc: "Owłosienie wychodzące poza linię bielizny lub kostiumu: pachwiny i górna część wzgórka łonowego. Wybór dla osób, którym zależy na estetyce w stroju kąpielowym." },
          { title: "Bikini głębokie — 300 zł", desc: "Pełna depilacja okolic intymnych: wzgórek łonowy, wargi sromowe i okolica międzypośladkowa. Odpowiednik tego, co w salonach nazywa się bikini całkowitym." },
          { title: "A bikini brazylijskie?", desc: "To nazwa marketingowa, nie osobny zabieg. Zwykle oznacza usunięcie całości owłosienia z pozostawieniem wąskiego paska — w naszym cenniku mieści się w bikini głębokim, a zakres ustalamy indywidualnie przed zabiegiem." },
        ],
      },
      {
        h2: "Wrastające włoski i zapalenie mieszków — dlaczego laser to rozwiązuje",
        paragraphs: [
          "Wrastający włos to włos, który po ścięciu lub wyrwaniu nie przebił naskórka i zawinął się pod skórą. Organizm traktuje go jak ciało obce i uruchamia stan zapalny — stąd bolesne, czerwone grudki, które w okolicy bikini potrafią utrzymywać się tygodniami i zostawiać przebarwienia.",
          "Każde kolejne golenie pogarsza sytuację, bo ostrze ścina włos ukośnie i uszkadza ujście mieszka. Wosk działa jeszcze bardziej brutalnie — rozrywa mieszek, który goi się z bliznowaceniem.",
          "Laser przerywa to błędne koło, bo likwiduje sam mieszek. Nie ma mieszka — nie ma włosa, który mógłby wrosnąć. Poprawę widać zwykle po 2–3 zabiegach, a po pełnej serii problem u większości osób znika całkowicie.",
        ],
      },
      {
        h2: "Higiena i dyskrecja zabiegu",
        bullets: [
          { title: "Zabieg w osobnym gabinecie", desc: "Pracujemy w zamkniętym pomieszczeniu, bez przechodzących osób. Zabieg wykonuje kobieta." },
          { title: "Jednorazowe materiały", desc: "Podkłady jednorazowe, rękawiczki i zdezynfekowana głowica przed każdym klientem." },
          { title: "Odsłaniamy tylko to, co konieczne", desc: "Pozostała część ciała pozostaje przykryta przez cały czas trwania zabiegu." },
          { title: "Bez oceniania", desc: "Widzimy tę strefę codziennie i w każdej możliwej odmianie. Nie ma powodu do skrępowania — jeśli czujesz się niepewnie, powiedz o tym, dostosujemy tempo." },
        ],
      },
      {
        h2: "Jak przygotować się do depilacji bikini",
        bullets: [
          { title: "Ogol strefę dzień wcześniej", desc: "Dokładnie i ostrym ostrzem, 12–24 godziny przed wizytą. Nie golimy tuż przed wyjściem — skóra powinna zdążyć się uspokoić." },
          { title: "Odstaw wosk na 4 tygodnie", desc: "Także pastę cukrową, depilator i pęsetę. Włos musi być w mieszku." },
          { title: "Świeża skóra, bez kosmetyków", desc: "Bez balsamu, olejku i talku w dniu zabiegu." },
          { title: "Wybierz bawełnianą bieliznę", desc: "Luźna, bawełniana bielizna po zabiegu ogranicza tarcie i podrażnienia." },
          { title: "Przełóż wizytę podczas miesiączki", desc: "Ze względów higienicznych i dlatego, że wrażliwość na ból jest wtedy wyraźnie wyższa." },
        ],
      },
    ],
    faq: [
      {
        q: "Ile kosztuje depilacja laserowa bikini?",
        a: "Bikini płytkie kosztuje 220 zł za zabieg (20 minut), a bikini głębokie 300 zł (30 minut). Pełna seria 6–8 zabiegów to odpowiednio około 1320–1760 zł oraz 1800–2400 zł. Bikini płytkie wchodzi też w skład pakietu nogi + pachy + bikini za 750 zł.",
      },
      {
        q: "Czym różni się bikini płytkie od głębokiego?",
        a: "Bikini płytkie obejmuje owłosienie wychodzące poza linię bielizny — pachwiny i górną część wzgórka łonowego. Bikini głębokie to pełna depilacja okolic intymnych wraz z okolicą międzypośladkową. Zakres zawsze ustalamy przed zabiegiem, żeby nie było niedomówień.",
      },
      {
        q: "Czy bikini brazylijskie to to samo co bikini głębokie?",
        a: "W praktyce tak. „Brazylijskie” to nazwa handlowa, która zwykle oznacza usunięcie całego owłosienia z pozostawieniem wąskiego paska. U nas mieści się to w zabiegu bikini głębokiego — wystarczy powiedzieć, jaki kształt chcesz zachować.",
      },
      {
        q: "Czy depilacja laserowa bikini boli?",
        a: "Bikini jest wrażliwsze niż pachy czy nogi, bo skóra jest tu cienka, a zakończenia nerwowe gęstsze. Chłodzenie kontaktowe Primelase mocno redukuje odczucia — klientki opisują je jako krótkie ukłucia ciepła. Zdecydowana większość osób, które wcześniej woskowały bikini, ocenia laser jako znacznie łagodniejszy.",
      },
      {
        q: "Ile zabiegów potrzeba na bikini?",
        a: "Zwykle 6–8 zabiegów co 4–6 tygodni. Owłosienie w tej strefie jest silnie zależne od hormonów, więc przy PCOS lub zaburzeniach hormonalnych seria bywa dłuższa i częściej potrzebne są zabiegi podtrzymujące.",
      },
      {
        q: "Czy mogę zrobić depilację bikini podczas okresu?",
        a: "Prosimy o przełożenie wizyty. Powód jest podwójny: higiena zabiegu oraz to, że w trakcie miesiączki próg bólu jest wyraźnie niższy i ta sama energia lasera jest odbierana jako dużo bardziej nieprzyjemna.",
      },
      {
        q: "Czy zabieg jest dyskretny?",
        a: "Tak. Odbywa się w zamkniętym gabinecie, wykonuje go kobieta, a odsłonięta pozostaje wyłącznie depilowana okolica. Używamy jednorazowych podkładów i dezynfekujemy głowicę przed każdym klientem.",
      },
      {
        q: "Czy laser pomoże na wrastające włoski i krostki w okolicy bikini?",
        a: "To jeden z najczęstszych powodów, dla których klientki decydują się na tę strefę. Laser niszczy mieszek, więc znika sama możliwość wrastania. Poprawę widać zwykle po 2–3 zabiegach, a po pełnej serii problem u większości osób ustępuje całkowicie.",
      },
      {
        q: "Co robić po depilacji laserowej bikini?",
        a: "Przez 24–48 godzin bez basenu, sauny, gorącej kąpieli i intensywnego wysiłku. Noś luźną, bawełnianą bieliznę, stosuj kosmetyk łagodzący z pantenolem i nie złuszczaj skóry przez pierwszy tydzień. Golenie między sesjami jest dozwolone.",
      },
      {
        q: "Czy po zabiegu bikini mogę korzystać z basenu?",
        a: "Odczekaj co najmniej 48 godzin. Chlorowana woda podrażnia świeżo potraktowaną laserem skórę, a wysoka temperatura w strefie saun i jacuzzi nasila zaczerwienienie.",
      },
      {
        q: "Czy depilacja bikini jest dostępna także dla mężczyzn?",
        a: "Tak, męska depilacja strefy intymnej jest u nas standardową usługą. Szczegóły zakresu i wycenę ustalamy podczas bezpłatnej konsultacji.",
      },
    ],
    related: ["pachy", "dla-mezczyzn", "cennik"],
  },

  wasik: {
    slug: "wasik",
    ctaAccent: "depilację laserową wąsika",
    introAccent: "wąsik i twarz",
    zone: "Wąsik i twarz",
    breadcrumb: "Wąsik",
    h1: "Depilacja laserowa wąsika i twarzy",
    seoTitle: "Depilacja laserowa wąsika — 100 zł | Place of Beauty",
    seoDesc:
      "Laserowe usuwanie wąsika i owłosienia twarzy w Grodzisku Mazowieckim — 100 zł, zabieg 10 minut. Skuteczne również przy nadmiernym owłosieniu na tle hormonalnym.",
    seoKeywords:
      "depilacja laserowa wąsika, depilacja wąsika laserem cena, depilacja laserowa twarzy, laser na wąsik, depilacja laserowa broda kobieta, usuwanie wąsika Grodzisk Mazowiecki, depilacja laserowa wąsik ile zabiegów, meszek nad górną wargą, hirsutyzm depilacja laserowa, owłosienie hormonalne twarz",
    image: "/gallery/1185245526942965.jpg",
    imageAlt: "Depilacja laserowa wąsika laserem Primelase — Place of Beauty Grodzisk Mazowiecki",
    lead:
      "Ciemny wąsik nad górną wargą to jeden z najczęstszych powodów kompleksów — i jedna z najszybszych metamorfoz, jakie da się osiągnąć w dziesięć minut.",
    facts: [
      { label: "Cena", value: "100 zł" },
      { label: "Czas zabiegu", value: "10 minut" },
      { label: "Seria", value: "8–10 zabiegów" },
      { label: "Odstępy", value: "co 4 tygodnie" },
      { label: "Odczucia", value: "Wyższa wrażliwość" },
    ],
    intro: [
      "Owłosienie nad górną wargą powiększa się z wiekiem i pod wpływem hormonów. Golenie w tym miejscu odpada, bo odrost jest szorstki i widoczny po jednym dniu, a wosk i nitka usuwają włos tylko na 2–3 tygodnie i drażnią cienką skórę twarzy.",
      "Depilacja laserowa wąsika daje efekt, którego żadna z tych metod nie osiągnie: włos staje się coraz cieńszy i jaśniejszy, aż przestaje być widoczny. Zabieg trwa 10 minut i kosztuje 100 zł.",
      "Twarz rządzi się jednak własnymi prawami. Włosy rosną tu w krótszym cyklu i są często cieńsze niż na ciele, dlatego seria bywa dłuższa niż w innych strefach — zwykle 8–10 zabiegów w odstępach około czterech tygodni.",
    ],
    sections: [
      {
        h2: "Dlaczego twarz wymaga większej liczby zabiegów",
        paragraphs: [
          "Cykl wzrostu włosa na twarzy jest krótszy niż na nogach czy plecach — mieszki szybciej wchodzą w fazę anagenu, ale też szybciej z niej wychodzą. To dobra i zła wiadomość jednocześnie: zabiegi można powtarzać częściej, ale trzeba ich wykonać więcej.",
          "Druga przyczyna jest hormonalna. Owłosienie twarzy u kobiet jest wrażliwe na androgeny, a przy zespole policystycznych jajników, insulinooporności czy w okresie menopauzy organizm potrafi uaktywniać nowe mieszki mimo prawidłowo przeprowadzonej serii. Laser świetnie redukuje objaw, ale nie wpływa na jego hormonalną przyczynę.",
          "Dlatego przy strefach twarzy standardem są zabiegi podtrzymujące — zwykle dwa razy w roku. To nadal nieporównywalnie mniej niż wizyty co trzy tygodnie na wosk.",
        ],
      },
      {
        h2: "Jakie strefy twarzy depilujemy",
        bullets: [
          { title: "Wąsik — 100 zł", desc: "Okolica nad górną wargą. Najczęściej wybierana strefa twarzy i najszybszy zabieg w całym cenniku." },
          { title: "Broda i linia żuchwy", desc: "Owłosienie pojawiające się na tle hormonalnym. Wycena indywidualna podczas konsultacji." },
          { title: "Policzki i baki", desc: "Wymagają szczególnej ostrożności ze względu na ryzyko efektu paradoksalnego przy cienkim meszku — kwalifikujemy indywidualnie." },
          { title: "Szyja i kark", desc: "Często łączone ze strefą brody, zwłaszcza u mężczyzn." },
          { title: "Środek brwi", desc: "Precyzyjne usunięcie owłosienia między brwiami, alternatywa dla regulacji co dwa tygodnie." },
        ],
      },
      {
        h2: "Laser, nitka czy wosk na wąsik",
        paragraphs: [
          "Depilacja nitką i wosk usuwają włos wraz z cebulką, ale mieszek zostaje żywy — po 2–3 tygodniach wszystko wraca. Obie metody drażnią cienką skórę twarzy, a przy regularnym stosowaniu potrafią prowadzić do przebarwień pozapalnych nad wargą.",
          "Laser jest wolniejszy w działaniu, ale kumulatywny: każdy zabieg trwale usuwa część mieszków, więc owłosienie systematycznie rzednie zamiast wracać do punktu wyjścia.",
          "Jeśli potrzebujesz efektu na jutro — nitka jest szybsza i mamy ją w ofercie kosmetyki za 15 zł. Jeśli chcesz przestać się tym zajmować na dobre — laser jest jedyną z tych metod, która to umożliwia. Nie łącz obu naraz: w trakcie serii laserowej nitka i wosk są zabronione.",
        ],
      },
      {
        h2: "Pielęgnacja twarzy po zabiegu",
        bullets: [
          { title: "Makijaż dopiero po 24 godzinach", desc: "Podkład i pudry na świeżo potraktowanej skórze mogą zatkać podrażnione ujścia mieszków." },
          { title: "SPF 50 codziennie przez 2 tygodnie", desc: "Twarz jest zawsze odsłonięta — bez filtra ryzyko przebarwień jest tu największe z wszystkich stref." },
          { title: "Odstaw kwasy i retinol", desc: "Na 7 dni przed i 7 dni po zabiegu. Naskórek musi być nienaruszony." },
          { title: "Kosmetyki łagodzące", desc: "Pantenol, aloes, alantoina. Bez alkoholu i mocnych zapachów przez pierwsze dni." },
          { title: "Nie wyskubuj pojedynczych włosków", desc: "Pęseta w trakcie serii to najczęstszy błąd. Zamiast tego przytnij lub zgol." },
        ],
      },
    ],
    faq: [
      {
        q: "Ile kosztuje depilacja laserowa wąsika?",
        a: "Jeden zabieg kosztuje 100 zł i trwa 10 minut. Przy typowej serii 8–10 zabiegów pełne usunięcie wąsika to koszt rzędu 800–1000 zł rozłożony na kilka miesięcy.",
      },
      {
        q: "Ile zabiegów potrzeba na wąsik?",
        a: "Zwykle 8–10 zabiegów w odstępach około czterech tygodni. Twarz wymaga więcej sesji niż ciało, bo cykl wzrostu włosa jest tu krótszy, a owłosienie silnie zależy od hormonów.",
      },
      {
        q: "Czy depilacja laserowa wąsika boli?",
        a: "Skóra nad górną wargą jest cienka i dobrze unerwiona, więc jest to strefa wrażliwsza niż pachy czy nogi. Zabieg trwa jednak zaledwie kilka minut, a chłodzenie kontaktowe głowicy wyraźnie łagodzi odczucia. Większość klientek ocenia go jako mniej nieprzyjemny niż depilacja woskiem.",
      },
      {
        q: "Czy laser pomoże przy owłosieniu hormonalnym i PCOS?",
        a: "Tak, przy hirsutyzmie i owłosieniu towarzyszącym zespołowi policystycznych jajników depilacja laserowa bardzo skutecznie redukuje objaw. Nie leczy jednak przyczyny — androgeny mogą nadal uaktywniać nowe mieszki, dlatego przy tych wskazaniach zalecamy dłuższą serię i regularne zabiegi podtrzymujące, najlepiej równolegle z opieką endokrynologiczną.",
      },
      {
        q: "Czym jest efekt paradoksalny na twarzy?",
        a: "To rzadkie zjawisko pobudzenia cienkiego meszku do wzrostu zamiast jego usunięcia — dotyczy głównie policzków, żuchwy i szyi. Przyczyną jest zbyt niska energia zabiegu, która stymuluje mieszek zamiast go zniszczyć. Zapobiega mu prawidłowa kwalifikacja i dobór parametrów, dlatego strefy z delikatnym meszkiem oceniamy szczególnie uważnie.",
      },
      {
        q: "Czy laser usunie jasny meszek z twarzy?",
        a: "Zwykle nie. Meszek zawiera bardzo mało melaniny, więc laser nie ma czego namierzyć, a próba jego usunięcia niesie ryzyko efektu paradoksalnego. Do meszku lepszym rozwiązaniem jest dermaplaning, który mamy w ofercie zabiegów na twarz.",
      },
      {
        q: "Czy po zabiegu na twarzy mogę nałożyć makijaż?",
        a: "Odczekaj około 24 godzin. Świeżo po zabiegu skóra jest zaczerwieniona, a ujścia mieszków otwarte — podkład i pudry mogą je zatkać i wywołać wypryski. Krem łagodzący z pantenolem możesz nałożyć od razu.",
      },
      {
        q: "Czy depilacja wąsika nitką czy laserem jest lepsza?",
        a: "Nitka daje natychmiastowy efekt na 2–3 tygodnie i kosztuje 15 zł — dobra opcja doraźna. Laser działa wolniej, ale trwale usuwa mieszki, więc owłosienie z sesji na sesję rzednie. W trakcie serii laserowej nitki i wosku nie wolno stosować, bo usuwają włos z cebulki i zabieg traci sens.",
      },
      {
        q: "Jak często powtarzać zabieg na twarzy po zakończeniu serii?",
        a: "Zwykle wystarczają dwa zabiegi podtrzymujące w roku. Twarz reaguje na zmiany hormonalne — po ciąży, w okresie menopauzy lub przy zaburzeniach endokrynologicznych częstotliwość może się chwilowo zwiększyć.",
      },
      {
        q: "Czy można depilować laserowo brodę i policzki?",
        a: "Tak, choć te strefy kwalifikujemy indywidualnie. Grube, ciemne włosy na brodzie i linii żuchwy reagują bardzo dobrze. Przy delikatnym meszku na policzkach ryzyko efektu paradoksalnego jest wyższe, dlatego decyzję podejmujemy po ocenie skóry na bezpłatnej konsultacji.",
      },
    ],
    related: ["pachy", "bikini", "cennik"],
  },
});

Object.assign(STREFY, {
  "dla-mezczyzn": {
    slug: "dla-mezczyzn",
    ctaAccent: "depilację laserową",
    introAccent: "dla mężczyzn",
    zone: "Dla mężczyzn",
    breadcrumb: "Dla mężczyzn",
    h1: "Depilacja laserowa dla mężczyzn",
    seoTitle: "Depilacja laserowa dla mężczyzn | Place of Beauty",
    seoDesc:
      "Męska depilacja laserowa Primelase w Grodzisku Mazowieckim: plecy, kark, klatka piersiowa, pachy, nogi, strefa intymna. Grubszy włos = lepsza reakcja na laser.",
    seoKeywords:
      "depilacja laserowa dla mężczyzn, depilacja laserowa męska, depilacja laserowa mężczyzn cena, depilacja laserowa plecy mężczyzna, depilacja laserowa klatka piersiowa, depilacja laserowa kark, męska depilacja intymna, depilacja laserowa dla mężczyzn Grodzisk Mazowiecki, laser dla mężczyzn owłosienie, depilacja laserowa nogi męskie",
    image: "/gallery/1132183195582532.jpg",
    imageAlt: "Depilacja laserowa dla mężczyzn — laser Primelase, Place of Beauty Grodzisk Mazowiecki",
    lead:
      "Męskie owłosienie jest grubsze i ciemniejsze niż damskie, co w przypadku lasera jest zaletą — więcej melaniny oznacza lepsze pochłanianie energii i szybszy efekt.",
    facts: [
      { label: "Pachy", value: "200 zł / 15 min" },
      { label: "Wąsik i kontur brody", value: "od 100 zł" },
      { label: "Całe nogi", value: "550 zł / 50 min" },
      { label: "Plecy, kark, klatka", value: "wycena na konsultacji" },
      { label: "Seria", value: "8–10 zabiegów" },
    ],
    intro: [
      "Depilacja laserowa przestała być usługą wyłącznie damską. Wśród naszych klientów są sportowcy, którzy nie chcą tracić czasu na golenie nóg, mężczyźni zmęczeni owłosieniem pleców, do którego sami nie sięgają, oraz ci, którym maszynka na karku wywołuje uporczywe wrastające włoski.",
      "Z punktu widzenia fizyki zabiegu męski włos to dobra wiadomość. Jest grubszy i ciemniejszy, więc zawiera więcej melaniny — a to melanina pochłania wiązkę lasera i przekazuje energię do macierzy mieszka. Efekt bywa dzięki temu widoczny szybciej niż u kobiet.",
      "Jest też druga strona medalu: męskie owłosienie jest gęstsze i silnie zależne od androgenów, dlatego seria zwykle liczy 8–10 zabiegów, a na plecach i klatce piersiowej zalecane są regularne zabiegi podtrzymujące.",
    ],
    sections: [
      {
        h2: "Najczęściej wybierane strefy męskie",
        bullets: [
          { title: "Plecy i barki", desc: "Strefa numer jeden. Samodzielne golenie pleców jest praktycznie niewykonalne, a wosk przy tej powierzchni bardzo bolesny." },
          { title: "Kark i szyja", desc: "Miejsce, w którym po maszynce najczęściej pojawiają się wrastające włoski i zapalenie mieszków — laser rozwiązuje to trwale." },
          { title: "Klatka piersiowa i brzuch", desc: "Pełne usunięcie albo przerzedzenie owłosienia. Zakres ustalamy tak, żeby efekt wyglądał naturalnie." },
          { title: "Pachy — 200 zł", desc: "Krótki zabieg, mniej potu zatrzymywanego przez włosy i koniec z podrażnieniami po dezodorancie." },
          { title: "Nogi — 550 zł", desc: "Wybór kolarzy, triatlonistów i pływaków, ale też mężczyzn, którym po prostu przeszkadza owłosienie łydek." },
          { title: "Strefa intymna", desc: "Standardowa usługa, wykonywana z zachowaniem pełnej dyskrecji. Zakres i wycenę ustalamy na konsultacji." },
          { title: "Kontur brody", desc: "Wyrównanie linii zarostu na szyi i policzkach, żeby nie trzeba było jej codziennie poprawiać maszynką." },
        ],
      },
      {
        h2: "Dlaczego męski włos dobrze reaguje na laser",
        paragraphs: [
          "Skuteczność depilacji laserowej zależy od kontrastu między włosem a skórą oraz od ilości melaniny w łodydze włosa. Męskie owłosienie na plecach, klatce i karku jest zwykle znacznie grubsze niż damskie, a więc pochłania więcej energii i szybciej przekazuje ją do macierzy mieszka.",
          "Primelase pracuje z mocą sięgającą 4800 W i blendem czterech długości fali, dzięki czemu radzi sobie zarówno z bardzo grubym włosem, jak i z ciemniejszą karnacją. Duże powierzchnie — plecy, klatka — obsługujemy w trybie dynamicznym, co skraca czas zabiegu.",
          "Ograniczeniem pozostaje siwizna. Włosy siwe i białe nie mają melaniny, więc laser ich nie usunie. Jeśli zarost lub owłosienie klatki jest w części siwe, na konsultacji szczerze powiemy, jakiego efektu można się spodziewać, zamiast obiecywać niemożliwe.",
        ],
      },
      {
        h2: "Kontur brody, czyli depilacja bez utraty zarostu",
        paragraphs: [
          "Nie usuwamy zarostu w całości — celem jest wyrównanie jego granic. Laserem likwidujemy owłosienie poniżej linii szyi i na policzkach powyżej naturalnej linii brody, dzięki czemu kontur pozostaje ostry bez codziennego poprawiania maszynką.",
          "Ten zabieg planujemy szczególnie ostrożnie. Granica raz usunięta jest trwała, więc linię wyznaczamy wspólnie przed pierwszym impulsem i zaczynamy zachowawczo — zawsze można usunąć więcej, nigdy odwrotnie.",
        ],
      },
      {
        h2: "Czego spodziewać się po serii",
        bullets: [
          { title: "8–10 zabiegów", desc: "Gęstsze i zależne od hormonów owłosienie męskie zwykle wymaga dłuższej serii niż damskie." },
          { title: "Odstępy 6–10 tygodni", desc: "Na plecach i nogach cykl wzrostu włosa jest długi, więc przerwy są większe niż przy strefach damskich." },
          { title: "Przerzedzenie zamiast wyłysienia", desc: "Jeśli nie chcesz gładkiej skóry, możemy prowadzić serię tak, by owłosienie zostało wyraźnie przerzedzone, ale nadal widoczne." },
          { title: "Zabiegi podtrzymujące", desc: "1–2 razy w roku, bo androgeny mogą z czasem uaktywnić kolejne mieszki." },
          { title: "Koniec z wrastaniem na karku", desc: "Najczęściej zgłaszana korzyść po serii — u fryzjera i pod kołnierzykiem koszuli." },
        ],
      },
    ],
    faq: [
      {
        q: "Czy mężczyźni faktycznie robią depilację laserową?",
        a: "Tak i jest ich coraz więcej. Najczęściej wybierają plecy, kark, klatkę piersiową i strefę intymną, a sportowcy — nogi. Zabieg wykonujemy dokładnie tak samo jak u kobiet, z tą różnicą, że seria bywa dłuższa ze względu na grubsze i gęstsze owłosienie.",
      },
      {
        q: "Ile kosztuje depilacja laserowa dla mężczyzn?",
        a: "Ceny stref występujących w cenniku są takie same jak dla kobiet: pachy 200 zł, wąsik 100 zł, całe nogi 550 zł, bikini od 220 zł. Strefy typowo męskie — plecy, kark, klatka piersiowa, brzuch — wyceniamy indywidualnie na bezpłatnej konsultacji, ponieważ powierzchnia i gęstość owłosienia różnią się bardzo mocno między osobami.",
      },
      {
        q: "Ile zabiegów potrzebuje mężczyzna?",
        a: "Zwykle 8–10 zabiegów, czyli o kilka więcej niż przy typowej serii damskiej. Powodem jest większa gęstość owłosienia i silniejszy wpływ androgenów, które potrafią stopniowo uaktywniać kolejne mieszki.",
      },
      {
        q: "Czy męskie włosy są trudniejsze do usunięcia?",
        a: "Sam włos jest wręcz łatwiejszym celem, bo grubszy i ciemniejszy oznacza więcej melaniny. Trudniejsza jest natomiast gęstość owłosienia i jego hormonalne podłoże — dlatego seria trwa dłużej, a nie dlatego, że laser działa gorzej.",
      },
      {
        q: "Czy depilacja pleców boli?",
        a: "Plecy mają grubą skórę i są jedną z mniej wrażliwych stref — odczucia są łagodne. Bardziej wyczuwalne bywają barki i okolica kręgosłupa, gdzie skóra przylega do kości. Chłodzenie kontaktowe działa przez cały zabieg.",
      },
      {
        q: "Czy można usunąć laserem całą brodę?",
        a: "Technicznie tak, ale robimy to bardzo rzadko i tylko po dokładnym omówieniu konsekwencji — efekt jest trwały i nieodwracalny. Znacznie częściej wykonujemy konturowanie: usuwamy owłosienie poniżej linii szyi i powyżej naturalnej linii policzka, żeby zarost nie wymagał codziennego poprawiania.",
      },
      {
        q: "Czy depilacja laserowa ma sens dla kolarzy i pływaków?",
        a: "Ma, i to podwójny. Znika cotygodniowe golenie całych nóg, a wraz z nim podrażnienia i wrastające włoski, które przy codziennych treningach potrafią być realnym problemem. Skóra po serii jest gładka bez mikrourazów po maszynce.",
      },
      {
        q: "Czy mężczyzna nie będzie czuł się nieswojo w salonie kosmetycznym?",
        a: "Zabieg odbywa się w zamkniętym gabinecie, odsłaniamy wyłącznie depilowaną strefę i pracujemy na jednorazowych materiałach. Męscy klienci to u nas codzienność, a termin możesz wybrać samodzielnie w rezerwacji online na Booksy, bez rozmowy telefonicznej.",
      },
      {
        q: "Czy owłosienie wróci po kilku latach?",
        a: "Mieszki zniszczone przez laser nie odtwarzają włosa. Androgeny mogą jednak z czasem uaktywnić mieszki, które wcześniej były uśpione — u mężczyzn dzieje się to częściej niż u kobiet. Dlatego zalecamy 1–2 zabiegi podtrzymujące rocznie, co w praktyce wystarcza, by utrzymać efekt.",
      },
      {
        q: "Czy mogę zrobić tylko przerzedzenie zamiast pełnego usunięcia?",
        a: "Tak. Regulując liczbę zabiegów i pokrycie strefy, możemy doprowadzić owłosienie do stanu wyraźnie rzadszego, ale nadal widocznego. Cel określ na konsultacji przed pierwszym zabiegiem — plan serii układamy pod niego.",
      },
    ],
    related: ["pachy", "nogi", "cennik"],
  },

  cennik: {
    slug: "cennik",
    ctaAccent: "wizytę",
    introHeading: "Cennik depilacji laserowej",
    introAccent: "Primelase",
    zone: "Cennik",
    breadcrumb: "Cennik",
    h1: "Depilacja laserowa — cennik",
    seoTitle: "Depilacja laserowa — cennik 2026 | Place of Beauty",
    seoDesc:
      "Pełny cennik depilacji laserowej Primelase w Grodzisku Mazowieckim: wąsik 100 zł, pachy 200 zł, bikini 220–300 zł, całe nogi 550 zł, pakiet 3 stref 750 zł.",
    seoKeywords:
      "depilacja laserowa cennik, ile kosztuje depilacja laserowa, depilacja laserowa cena, cennik depilacji laserowej Grodzisk Mazowiecki, depilacja laserowa pakiet cena, depilacja laserowa ile kosztuje seria, depilacja laserowa cennik 2026, czy depilacja laserowa się opłaca, depilacja laserowa koszt serii",
    image: "/gallery/1080256257441893.jpg",
    imageAlt: "Cennik depilacji laserowej Primelase w salonie Place of Beauty Grodzisk Mazowiecki",
    lead:
      "Pełny, aktualny cennik depilacji laserowej Primelase wraz z kosztem całej serii — bez gwiazdek i dopłat ujawnianych dopiero na miejscu.",
    facts: [
      { label: "Zakres cen", value: "100–750 zł" },
      { label: "Najtańsza strefa", value: "Wąsik — 100 zł" },
      { label: "Pakiet 3 stref", value: "750 zł" },
      { label: "Oszczędność w pakiecie", value: "220 zł" },
      { label: "Konsultacja", value: "Bezpłatna" },
    ],
    intro: [
      "Cena zabiegu w Place of Beauty zależy wyłącznie od strefy ciała — nie od gęstości owłosienia, płci ani liczby impulsów. To, co widzisz w cenniku, płacisz przy kasie.",
      "Poniżej znajdziesz ceny pojedynczych zabiegów, wyliczenie kosztu całej serii oraz porównanie z tym, ile realnie kosztuje golenie i woskowanie przez lata. Ceny są zgodne z tymi w rezerwacji online na Booksy.",
    ],
    sections: [
      {
        h2: "Ile kosztuje cała seria depilacji laserowej",
        paragraphs: [
          "Depilacja laserowa to nie pojedynczy zabieg, tylko seria — najczęściej 6–8 sesji, a w strefach twarzy i u mężczyzn 8–10. Poniższe kwoty pokazują realny koszt całego procesu, rozłożony na kilkanaście miesięcy.",
        ],
        table: {
          head: ["Strefa", "Cena zabiegu", "Seria", "Koszt serii"],
          rows: [
            ["Wąsik", "100 zł", "8–10", "800–1000 zł"],
            ["Pachy", "200 zł", "6–8", "1200–1600 zł"],
            ["Bikini płytkie", "220 zł", "6–8", "1320–1760 zł"],
            ["Bikini głębokie", "300 zł", "6–8", "1800–2400 zł"],
            ["Całe nogi", "550 zł", "6–8", "3300–4400 zł"],
            ["Pakiet: nogi + pachy + bikini", "750 zł", "6–8", "4500–6000 zł"],
          ],
        },
      },
      {
        h2: "Pakiet nogi + pachy + bikini — 750 zł",
        paragraphs: [
          "Trzy najczęściej wybierane strefy w jednej wizycie. Osobno kosztowałyby 970 zł (550 zł + 200 zł + 220 zł), w pakiecie płacisz 750 zł — czyli 220 zł mniej za każdą wizytę.",
          "Przy pełnej serii 6–8 zabiegów daje to od 1320 do 1760 zł oszczędności. Cały pakiet zamyka się w 1 godzinie 45 minut, więc jedna wizyta zamiast trzech osobnych terminów.",
        ],
      },
      {
        h2: "Czy depilacja laserowa się opłaca",
        paragraphs: [
          "Laser to wydatek skoncentrowany w pierwszym roku, golenie i woskowanie — comiesięczny, ponawiany przez całe życie. W wyliczeniu dla lasera uwzględniliśmy pełną serię w pierwszym roku oraz jeden zabieg podtrzymujący (550 zł) w każdym kolejnym. Ceny woskowania i akcesoriów do golenia to szacunki rynkowe — traktuj je jako rząd wielkości, nie ofertę.",
        ],
        table: {
          head: ["Metoda", "Koszt roczny (szacunek)", "Koszt w 10 lat", "Efekt po 10 latach"],
          rows: [
            ["Golenie maszynką", "200–400 zł", "2000–4000 zł", "Bez zmian — golisz dalej"],
            ["Woskowanie w salonie", "1200–2400 zł", "12 000–24 000 zł", "Bez zmian — woskujesz dalej"],
            ["Depilacja laserowa (nogi)", "3300–4400 zł w 1. roku, potem 550 zł", "8250–9350 zł łącznie", "80–95% mniej włosów na stałe"],
          ],
        },
      },
      {
        h2: "Co wpływa na koszt, a co nie",
        bullets: [
          { title: "Nie płacisz za gęstość owłosienia", desc: "Cena strefy jest stała niezależnie od tego, ile masz włosów i ile impulsów wykona laser." },
          { title: "Nie ma dopłaty za płeć", desc: "Strefy z cennika kosztują tyle samo dla kobiet i mężczyzn." },
          { title: "Konsultacja jest bezpłatna", desc: "Ocena fototypu, kwalifikacja i plan serii nie są dodatkowo płatne." },
          { title: "Strefy spoza cennika wyceniamy indywidualnie", desc: "Plecy, klatka piersiowa, brzuch, ramiona czy pośladki — wycena zależy od powierzchni i zapada na konsultacji, przed jakimkolwiek zabiegiem." },
          { title: "Łączenie stref się opłaca", desc: "Kilka stref podczas jednej wizyty to jeden dojazd i jeden termin — a w przypadku pakietu także niższa cena." },
        ],
      },
    ],
    faq: [
      {
        q: "Ile kosztuje cała seria depilacji laserowej?",
        a: "Zależy od strefy: wąsik 800–1000 zł, pachy 1200–1600 zł, bikini płytkie 1320–1760 zł, bikini głębokie 1800–2400 zł, całe nogi 3300–4400 zł. Pakiet trzech stref to 4500–6000 zł za pełną serię. Kwoty rozkładają się na kilkanaście miesięcy — płacisz za każdą wizytę osobno.",
      },
      {
        q: "Czy trzeba płacić za całą serię z góry?",
        a: "Nie. Płacisz za każdy zabieg osobno, po jego wykonaniu. Nie wymagamy przedpłat ani wykupienia całego pakietu sesji z góry.",
      },
      {
        q: "Czy są pakiety i rabaty?",
        a: "Tak. Pakiet nogi + pachy + bikini kosztuje 750 zł zamiast 970 zł, czyli 220 zł taniej przy każdej wizycie. Aktualne promocje sezonowe znajdziesz w rezerwacji online na Booksy.",
      },
      {
        q: "Czy cena zależy od gęstości owłosienia?",
        a: "Nie. Cena strefy jest stała — nie liczymy impulsów ani nie różnicujemy stawki w zależności od tego, ile masz włosów. Gęstsze owłosienie może natomiast oznaczać, że seria będzie o jedną lub dwie sesje dłuższa.",
      },
      {
        q: "Czy można płacić kartą?",
        a: "Tak, przyjmujemy płatność kartą i gotówką. Dla klientów dostępny jest parking przy salonie na ul. Garbarskiej 17/2.",
      },
      {
        q: "Ile zaoszczędzę w porównaniu z woskowaniem?",
        a: "Woskowanie nóg w salonie to szacunkowo 1200–2400 zł rocznie i wydatek, który wraca co roku. Pełna seria laserowa na nogach to 3300–4400 zł w pierwszym roku plus około 550 zł rocznie za zabieg podtrzymujący. Próg opłacalności wypada zwykle między drugim a czwartym rokiem — tym szybciej, im częściej korzystasz z woskowania. Po dziesięciu latach różnica to zwykle kilka tysięcy złotych na korzyść lasera, a do tego dochodzi efekt, którego wosk nie daje w ogóle.",
      },
      {
        q: "Ile kosztuje depilacja stref, których nie ma w cenniku?",
        a: "Plecy, klatkę piersiową, brzuch, ramiona, pośladki i inne partie wyceniamy indywidualnie na bezpłatnej konsultacji — cena zależy od powierzchni i gęstości owłosienia. Wycenę poznajesz przed zabiegiem, nigdy po.",
      },
      {
        q: "Czy w cenie zabiegu jest coś dodatkowo wliczone?",
        a: "W cenę wchodzi konsultacja, przygotowanie skóry, żel kontaktowy, sam zabieg, preparat kojący po zabiegu oraz ustalenie terminu kolejnej sesji. Nie doliczamy opłat za materiały ani za okulary ochronne.",
      },
      {
        q: "Czy ceny w cenniku są aktualne?",
        a: "Tak — cennik na stronie utrzymujemy zgodny z tym w rezerwacji online na Booksy. Jeśli zauważysz rozbieżność, obowiązuje cena widoczna w Booksy w momencie rezerwacji.",
      },
      {
        q: "Czy mogę podarować depilację laserową w prezencie?",
        a: "Skontaktuj się z nami telefonicznie pod numerem +48 881 777 437 — ustalimy szczegóły i dobierzemy strefę do potrzeb obdarowanej osoby. Pamiętaj, że przed pierwszym zabiegiem zawsze konieczna jest konsultacja i kwalifikacja.",
      },
    ],
    related: ["pachy", "nogi", "bikini"],
  },
});

export const STREFY_LISTA = ["pachy", "nogi", "bikini", "wasik", "dla-mezczyzn", "cennik"];

/* ------------------------------------------------------------------ */
/* PRZEBIEG ZABIEGU (HowTo)                                             */
/* ------------------------------------------------------------------ */

export const PROCES = [
  {
    step: "Bezpłatna konsultacja i kwalifikacja",
    desc: "Oceniamy fototyp skóry w skali Fitzpatricka, kolor i grubość włosa, omawiamy przeciwwskazania oraz przyjmowane leki. Na tej podstawie dobieramy długość fali i energię, a także szacujemy liczbę zabiegów w serii.",
  },
  {
    step: "Golenie strefy 12–24 godziny przed wizytą",
    desc: "Włos ma zostać w mieszku, ale nie może wystawać ponad skórę. Wosk, pasta cukrowa i pęseta są zabronione przez 4 tygodnie przed zabiegiem.",
  },
  {
    step: "Przygotowanie skóry w gabinecie",
    desc: "Oczyszczamy i dezynfekujemy strefę, zabezpieczamy znamiona barwnikowe, zakładamy okulary ochronne i nakładamy chłodzący żel kontaktowy.",
  },
  {
    step: "Zabieg laserem Primelase",
    desc: "Prowadzimy głowicę nakładającymi się impulsami, pokrywając całą powierzchnię. Chłodzenie kontaktowe schładza naskórek w trakcie każdego impulsu. Zabieg trwa od 10 minut przy wąsiku do 50 minut przy całych nogach.",
  },
  {
    step: "Pielęgnacja bezpośrednio po zabiegu",
    desc: "Nakładamy preparat kojący i omawiamy zalecenia: SPF 50 przez 2 tygodnie, bez sauny i treningu przez 24–48 godzin, bez wyrywania włosów do końca serii.",
  },
  {
    step: "Ustalenie terminu kolejnej sesji",
    desc: "Kolejny zabieg planujemy za 4–6 tygodni (na nogach i plecach 6–10), tak aby trafić w następną porcję włosów wchodzących w fazę anagenu.",
  },
];

/* ------------------------------------------------------------------ */
/* DLA KOGO / PRZECIWWSKAZANIA                                          */
/* ------------------------------------------------------------------ */

export const DLA_KOGO = [
  "Osoby zmęczone goleniem co drugi dzień i woskowaniem co miesiąc",
  "Osoby z nawracającymi wrastającymi włoskami i zapaleniem mieszków włosowych",
  "Osoby z ciemnym włosem — niezależnie od karnacji, także fototyp V i VI",
  "Kobiety z nadmiernym owłosieniem na tle hormonalnym (hirsutyzm, PCOS)",
  "Mężczyźni chcący usunąć lub przerzedzić owłosienie pleców, karku i klatki piersiowej",
  "Sportowcy, dla których golenie nóg jest cotygodniowym obowiązkiem",
  "Osoby ze skłonnością do podrażnień po maszynce i kosmetykach depilacyjnych",
  "Osoby pełnoletnie, które chcą zamknąć temat owłosienia na lata, a nie na tydzień",
];

export const PRZECIWWSKAZANIA = [
  "Ciąża i karmienie piersią",
  "Aktywna opalenizna, solarium lub samoopalacz w ciągu ostatnich 2–4 tygodni",
  "Włosy siwe, białe i bardzo jasne — brak melaniny uniemożliwia działanie lasera",
  "Choroby skóry, aktywne infekcje i opryszczka w strefie zabiegowej",
  "Leki i zioła fotouczulające (izotretynoina, część antybiotyków, dziurawiec)",
  "Świeży tatuaż lub blizna w depilowanej okolicy",
  "Padaczka światłoczuła",
  "Choroba nowotworowa, niewyrównana cukrzyca, stan po przeszczepie",
  "Bielactwo i skłonność do bliznowców w strefie zabiegowej",
  "Wiek poniżej 18 lat",
];

export const KORZYSCI = [
  {
    title: "Trwała redukcja 80–95% owłosienia",
    desc: "Laser niszczy macierz mieszka włosowego, a nie tylko sam włos. Zniszczony mieszek nie odtwarza się — efekt kumuluje się z każdą sesją zamiast wracać do punktu wyjścia.",
  },
  {
    title: "Komfort dzięki chłodzeniu kontaktowemu",
    desc: "Szafirowa głowica Crystal Freeze schładza naskórek dokładnie w momencie impulsu. Zabieg odbierany jest jako ciepło i mrowienie, nieporównywalnie łagodniej niż woskowanie.",
  },
  {
    title: "Skuteczność na każdym fototypie skóry",
    desc: "Blend czterech długości fali, z falą 1064 nm włącznie, pozwala bezpiecznie pracować także na ciemnej karnacji — fototypy I–VI.",
  },
  {
    title: "Koniec z wrastającymi włoskami",
    desc: "Laser likwiduje mieszek, więc znika sama możliwość wrastania. To najczęściej zgłaszana korzyść przy bikini, karku i łydkach.",
  },
  {
    title: "Krótkie zabiegi bez rekonwalescencji",
    desc: "Pachy w 15 minut, wąsik w 10, całe nogi w 50. Po zabiegu wracasz do codziennych zajęć — jedynym ograniczeniem jest 24–48 godzin bez sauny i treningu.",
  },
  {
    title: "Pakiet trzech stref taniej o 220 zł",
    desc: "Nogi, pachy i bikini podczas jednej wizyty kosztują 750 zł zamiast 970 zł — przy pełnej serii daje to nawet 1760 zł oszczędności.",
  },
];
