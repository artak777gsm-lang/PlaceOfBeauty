// Cennik w bazie → zgodny z rezerwacją online na Booksy (stan na 4.11.2026).
//
// Uruchomienie na serwerze, po kopii zapasowej (services, salon_info, homepage):
//   mongosh placeofbeauty --quiet --file backend/migrations/2026-11-04-booksy-sync.js
//
// Co się zmieniło na Booksy od 14.10:
//  - piercing: zamiast dwóch pozycji ("uszy od 120 zł", "nos 200 zł", 10 min)
//    jest 15 usług wykonywanych metodą igłową — płatek 100 zł, oba płatki
//    180 zł, każda chrząstka ucha, nos i pępek 150 zł, 20–30 min. Strona
//    /uslugi/piercing i odpowiedzi AI w Google cytowały stare kwoty;
//  - henna brwi z regulacją: 50 zł zamiast 40 zł;
//  - liczba opinii: 313 (było 306).
//
// Skrypt jest idempotentny: kategorię Piercing zastępuje w całości listą
// z Booksy, pozostałe pola nadpisuje ($set).

const { randomUUID } = require("crypto");

const PIERCING = [
  ["Lobe — przekłucie płatka ucha", "100 zł", "20 min", "Klasyczne przekłucie płatka ucha metodą igłową, z doborem biżuterii"],
  ["2 × lobe — przekłucie obu płatków", "180 zł", "30 min", "Przekłucie płatków obu uszu metodą igłową"],
  ["Upper lobe — górna część płatka", "150 zł", "30 min", "Przekłucie górnej części płatka ucha sterylną igłą"],
  ["Helix — zewnętrzna chrząstka ucha", "150 zł", "20 min", "Przekłucie zewnętrznej chrząstki ucha sterylną igłą"],
  ["Forward helix — przednia chrząstka ucha", "150 zł", "20 min", "Przekłucie przedniej części chrząstki ucha metodą igłową"],
  ["Flat — płaska część chrząstki", "150 zł", "30 min", "Przekłucie płaskiej części chrząstki ucha sterylną igłą"],
  ["Conch — środek małżowiny", "150 zł", "20 min", "Przekłucie środkowej części małżowiny ucha metodą igłową"],
  ["Daith — wewnętrzny fałd chrząstki", "150 zł", "20 min", "Przekłucie wewnętrznego fałdu chrząstki ucha sterylną igłą"],
  ["Rook — wewnętrzny fałd chrząstki", "150 zł", "20 min", "Przekłucie wewnętrznego fałdu chrząstki ucha metodą igłową"],
  ["Tragus", "150 zł", "20 min", "Przekłucie chrząstki przy wejściu do kanału słuchowego"],
  ["Anti-tragus", "150 zł", "20 min", "Przekłucie chrząstki nad płatkiem ucha — zależnie od budowy ucha"],
  ["Snug — wewnętrzny wał chrząstki", "150 zł", "20 min", "Przekłucie wewnętrznego wału chrząstki ucha sterylną igłą"],
  ["Industrial", "150 zł", "30 min", "Dwa przekłucia górnej chrząstki ucha połączone jednym kolczykiem"],
  ["Orbital", "150 zł", "30 min", "Dwa przekłucia połączone jednym kółkiem"],
  ["Nostril — przekłucie nosa", "150 zł", "30 min", "Przekłucie skrzydełka nosa metodą igłową"],
  ["Navel — przekłucie pępka", "150 zł", "30 min", "Przekłucie pępka metodą igłową"],
];

const removed = db.services.deleteMany({ category: "Piercing" });
print(`piercing: usunięte stare pozycje ${removed.deletedCount}`);
db.services.insertMany(
  PIERCING.map(([name, price, duration, description]) => ({
    id: randomUUID(),
    category: "Piercing",
    name,
    price,
    duration,
    description,
    image: "",
  })),
);
print(`piercing: dodane ${PIERCING.length} pozycji z Booksy`);

const henna = db.services.updateOne(
  { category: "Kosmetyka", name: "Henna + regulacja" },
  { $set: { price: "50 zł", duration: "20 min", description: "Henna brwi połączona z regulacją kształtu" } },
);
print(`${henna.matchedCount === 1 ? "OK " : "BRAK"} Kosmetyka / Henna + regulacja ← 50 zł`);

const info = db.salon_info.updateMany({}, { $set: { reviews_count: 313 } });
print(`salon_info: dopasowane ${info.matchedCount}, zmienione ${info.modifiedCount}`);

// Kafelek "Zadowolenie klientów" na stronie głównej przychodzi z bazy.
let tiles = 0;
db.homepage.find({ "features.desc": /opinii/ }).forEach((doc) => {
  const features = doc.features.map((f) =>
    /opinii/.test(f.desc || "") ? { ...f, desc: "Ocena 4.9 na podstawie 313 opinii" } : f,
  );
  db.homepage.updateOne({ _id: doc._id }, { $set: { features } });
  tiles += 1;
});
print(`homepage: poprawione dokumenty z kafelkiem oceny ${tiles}`);
print(`pozycji w cenniku: ${db.services.countDocuments({})}, w tym piercing: ${db.services.countDocuments({ category: "Piercing" })}`);
