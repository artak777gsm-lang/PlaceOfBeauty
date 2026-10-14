// Cennik w bazie → zgodny z rezerwacją online na Booksy (stan na 14.10.2026).
//
// Uruchomienie na serwerze, po kopii zapasowej kolekcji services:
//   mongosh placeofbeauty --quiet --file backend/migrations/2026-10-14-booksy-prices.js
//
// Skrypt jest idempotentny: istniejące pozycje dopasowuje po (category, name)
// i nadpisuje tylko cenę, czas i opis; brakujące dopisuje. Usuwa wyłącznie
// kategorie usług, których salon nie wykonuje (zabiegi na twarz, makijaż).
// Poprawia też godziny i liczbę opinii w salon_info (czyta je panel admina).
// Strefy depilacji laserowej zostają bez zmian (poza czasem pakietu) — mają
// własne strony i ich ceny już zgadzają się z Booksy.

const { randomUUID } = require("crypto");

const UPDATES = [
  ["Manicure", "Manicure hybrydowe", { price: "140 zł" }],
  ["Manicure", "Manicure hybrydowe na dłuższych paznokciach", { description: "Manicure hybrydowe na dłuższych paznokciach" }],
  ["Manicure", "Manicure klasyczne bez malowania", { price: "80 zł", description: "Klasyczna pielęgnacja paznokci z bazą" }],
  ["Manicure", "Manicure klasyczne z malowaniem", { price: "90 zł" }],
  ["Manicure", "Manicure męski", { price: "80 zł" }],
  ["Pedicure", "Pedicure klasyczne z lakierem", { price: "150 zł" }],
  ["Pedicure", "Pedicure klasyczny + hybryda", { price: "170 zł" }],
  ["Pedicure", "Pedicure kwasowe + hybryda", { description: "Zabieg kwasowy Mavex z hybrydą" }],
  ["Stylizacja paznokci", "Przedłużanie żelowe", { price: "od 200 zł" }],
  ["Stylizacja paznokci", "Uzupełnienie żelowe", { price: "160 zł" }],
  ["Depilacja laserowa", "Nogi + pachy + bikini", { duration: "1 godz. 15 min" }],
  ["Piercing", "Przekłuwanie uszu", { price: "od 120 zł" }],
  ["Piercing", "Przekłuwanie nosa", { price: "200 zł" }],
];

const INSERTS = [
  { category: "Manicure", name: "Manicure hybrydowe na dłuższych paznokciach", price: "150 zł", duration: "1 godz.", description: "Manicure hybrydowe na dłuższych paznokciach" },
  { category: "Manicure", name: "Laminacja paznokci Yokaba", price: "120 zł", duration: "30 min", description: "Laminacja naturalnej płytki paznokcia systemem Yokaba" },
  { category: "Manicure", name: "Zdjęcie hybrydy", price: "20 zł", duration: "15 min", description: "Usunięcie lakieru hybrydowego" },
  { category: "Manicure", name: "Zdjęcie hybrydy z manicure klasycznym", price: "80 zł", duration: "40 min", description: "Usunięcie hybrydy i manicure klasyczne" },
  { category: "Pedicure", name: "Hybryda u stóp", price: "140 zł", duration: "45 min", description: "Lakier hybrydowy na paznokciach stóp" },
  { category: "Stylizacja paznokci", name: "Naprawa 1 paznokcia żelowego", price: "20 zł", duration: "15 min", description: "Naprawa uszkodzonego paznokcia żelowego" },
  { category: "Stylizacja paznokci", name: "Naprawa 2 paznokci żelowych", price: "30 zł", duration: "15 min", description: "Naprawa uszkodzonych paznokci żelowych" },
  { category: "Stylizacja paznokci", name: "Naprawa 3 paznokci żelowych", price: "50 zł", duration: "15 min", description: "Naprawa uszkodzonych paznokci żelowych" },
  { category: "Stylizacja paznokci", name: "Zdjęcie żelowych paznokci", price: "25 zł", duration: "15 min", description: "Usunięcie paznokci żelowych" },
  { category: "Stylizacja paznokci", name: "Zdjęcie żelowych paznokci z manicure klasycznym", price: "90 zł", duration: "45 min", description: "Usunięcie żelu i manicure klasyczne" },
  { category: "Stylizacja paznokci", name: "Zdjęcie akrylowych paznokci", price: "50 zł", duration: "15 min", description: "Usunięcie paznokci akrylowych" },
];

let missing = 0;
// Wstawki idą przed aktualizacjami, żeby aktualizacja nowej pozycji (opis)
// znalazła ją już przy pierwszym uruchomieniu.
for (const row of INSERTS) {
  if (db.services.findOne({ category: row.category, name: row.name })) {
    print(`JEST ${row.category} / ${row.name}`);
    continue;
  }
  db.services.insertOne({ id: randomUUID(), image: "", ...row });
  print(`NOWA ${row.category} / ${row.name} — ${row.price}`);
}
for (const [category, name, fields] of UPDATES) {
  const r = db.services.updateOne({ category, name }, { $set: fields });
  if (r.matchedCount !== 1) missing += 1;
  print(`${r.matchedCount === 1 ? "OK " : "BRAK"} ${category} / ${name} ← ${JSON.stringify(fields)}`);
}
const removed = db.services.deleteMany({ category: { $in: ["Zabiegi na twarz", "Makijaż"] } });
print(`usunięte pozycje twarz/makijaż: ${removed.deletedCount}`);
const info = db.salon_info.updateMany({}, {
  $set: {
    hours: {
      "Poniedziałek": "9:00–16:00",
      "Wtorek": "9:00–16:00",
      "Środa": "9:00–16:00",
      "Czwartek": "9:00–15:30",
      "Piątek": "9:00–16:00",
      "Sobota": "Zamknięte",
      "Niedziela": "Zamknięte",
    },
    reviews_count: 306,
  },
});
print(`salon_info: dopasowane ${info.matchedCount}, zmienione ${info.modifiedCount}`);
print(`pozycji w cenniku: ${db.services.countDocuments({})}, nieznalezionych do aktualizacji: ${missing}`);
