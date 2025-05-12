db = db.getSiblingDB('menhely'); // adatbázis kiválasztása vagy létrehozása

// felhasználók
db.users.insertOne({
  name: "Admin Felhasználó",
  email: "admin@menhely.hu",
  password: "$2b$10$lyXAK6wVSVGi4MhFb746Qu8FKJYlaWofyImsRj1GvwWhF1BWLKKFC", //admin123
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
    imageUrl: "https://placedog.net/300/200?id=1"
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
