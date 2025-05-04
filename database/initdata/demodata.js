db = db.getSiblingDB('menhely'); // adatbázis kiválasztása vagy létrehozása

// felhasználók
db.users.insertOne({
  name: "Admin Felhasználó",
  email: "admin@menhely.hu",
  passwordHash: "demo-hash", // ide jelszó hash is jöhet, ha előre legyártod
  role: "admin"
});

// állatok
db.animals.insertMany([
  {
    name: "Bodri",
    age: 4,
    species: "kutya",
    breed: "keverék",
    description: "Barátságos, aktív kutya.",
    health: "oltva, féregtelenítve",
    likedBy: [],
    imageUrl: "https://example.com/bodri.jpg"
  },
  {
    name: "Cirmi",
    age: 2,
    species: "macska",
    breed: "házi",
    description: "Csendes, dorombolós cica.",
    health: "oltva",
    likedBy: [],
    imageUrl: "https://example.com/cirmi.jpg"
  }
]);
