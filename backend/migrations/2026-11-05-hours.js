// Godziny w salon_info → rzeczywiste: poniedziałek–sobota 9:00–20:00.
//
// Uruchomienie na serwerze, po kopii zapasowej salon_info:
//   mongosh placeofbeauty --quiet --file backend/migrations/2026-11-05-hours.js
//
// 14.10 godziny wzięto z Booksy (pn–pt 9–16, czw. do 15:30), ale Booksy celowo
// pokazuje terminy online tylko do 16:00 — wizyty po 16:00 salon umawia
// telefonicznie (ustalone z salonem 05.11.2026). Skrypt jest idempotentny.

const info = db.salon_info.updateMany({}, {
  $set: {
    hours: {
      "Poniedziałek": "9:00–20:00",
      "Wtorek": "9:00–20:00",
      "Środa": "9:00–20:00",
      "Czwartek": "9:00–20:00",
      "Piątek": "9:00–20:00",
      "Sobota": "9:00–20:00",
      "Niedziela": "Zamknięte",
    },
  },
});
print(`salon_info: dopasowane ${info.matchedCount}, zmienione ${info.modifiedCount}`);
