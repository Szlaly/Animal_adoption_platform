db = db.getSiblingDB('menhely'); // adatbázis kiválasztása vagy létrehozása

// felhasználók
db.users.insertMany([
  {
    name: "Admin Felhasználó 1",
    email: "admin1@menhely.hu",
    password: "$2b$10$lyXAK6wVSVGi4MhFb746Qu8FKJYlaWofyImsRj1GvwWhF1BWLKKFC", // admin123
    role: "admin"
  },
  {
    name: "Admin Felhasználó 2",
    email: "admin2@menhely.hu",
    password: "$2b$10$lyXAK6wVSVGi4MhFb746Qu8FKJYlaWofyImsRj1GvwWhF1BWLKKFC", // admin123
    role: "admin"
  },
  {
    name: "Admin Felhasználó 3",
    email: "admin3@menhely.hu",
    password: "$2b$10$lyXAK6wVSVGi4MhFb746Qu8FKJYlaWofyImsRj1GvwWhF1BWLKKFC", // admin123
    role: "admin"
  },
  {
    name: "Sima Felhasználó 1",
    email: "user1@menhely.hu",
    password: "$2b$10$lyXAK6wVSVGi4MhFb746Qu8FKJYlaWofyImsRj1GvwWhF1BWLKKFC", // admin123 (használhatod egységesen)
    role: "user"
  },
  {
    name: "Sima Felhasználó 2",
    email: "user2@menhely.hu",
    password: "$2b$10$lyXAK6wVSVGi4MhFb746Qu8FKJYlaWofyImsRj1GvwWhF1BWLKKFC", // admin123
    role: "user"
  }
]);

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
    imageUrl: "https://placedog.net/300/200?id=1",
    story: "Bodri egy hűséges családi kedvenc, aki imád játszani a gyerekekkel."
  },
  {
    name: "Cirmi",
    age: 2,
    species: "macska",
    breed: "házi",
    description: "Csendes, dorombolós cica.",
    health: "oltva",
    likedBy: [],
    imageUrl: "https://placekitten.com/300/200",
    story: "Cirmi a menhely csendes lelke, aki mindig a napos ablakban alszik."
  },
  {
    name: "Nyuszi",
    age: 1,
    species: "nyúl",
    breed: "törpenyúl",
    description: "Puha szőrű, játékos nyuszi.",
    health: "oltva",
    likedBy: [],
    imageUrl: "https://placebear.com/300/200", // nincs nyúl kép, placeholder
    story: "Nyuszi szereti a répát és a simogatást."
  },
  {
    name: "Luna",
    age: 3,
    species: "kutya",
    breed: "labrador",
    description: "Barátságos és energikus labrador.",
    health: "oltva, féregtelenítve",
    likedBy: [],
    imageUrl: "https://placedog.net/300/200?id=2",
    story: "Luna imád a parkban futni és labdázni."
  },
  {
    name: "Mici",
    age: 4,
    species: "macska",
    breed: "perzsa",
    description: "Elegáns perzsa macska.",
    health: "oltva",
    likedBy: [],
    imageUrl: "https://placekitten.com/301/201",
    story: "Mici a menhely királynője, nagyon öntörvényű."
  },
  {
    name: "Füles",
    age: 2,
    species: "nyúl",
    breed: "óriásnyúl",
    description: "Nagy termetű, nyugodt nyúl.",
    health: "oltva",
    likedBy: [],
    imageUrl: "https://placebear.com/301/201",
    story: "Füles imádja, ha a kertben ugrálhat."
  },
  {
    name: "Rex",
    age: 5,
    species: "kutya",
    breed: "németjuhász",
    description: "Hűséges és okos németjuhász.",
    health: "oltva, féregtelenítve",
    likedBy: [],
    imageUrl: "https://placedog.net/300/200?id=3",
    story: "Rex a menhely őrzője, mindig résen van."
  },
  {
    name: "Sziámi",
    age: 3,
    species: "macska",
    breed: "sziámi",
    description: "Kedves és beszédes macska.",
    health: "oltva",
    likedBy: [],
    imageUrl: "https://placekitten.com/302/202",
    story: "Sziámi nagyon szelíd és igényli az emberi társaságot."
  },
  {
    name: "Panni",
    age: 2,
    species: "kutya",
    breed: "uszkár",
    description: "Kicsi, bolyhos uszkár.",
    health: "oltva, féregtelenítve",
    likedBy: [],
    imageUrl: "https://placedog.net/300/200?id=4",
    story: "Panni imád ugrálni és trükköket tanulni."
  },
  {
    name: "Szöszke",
    age: 1,
    species: "macska",
    breed: "hosszúszőrű házi",
    description: "Fiatal, játékos cica.",
    health: "oltva",
    likedBy: [],
    imageUrl: "https://placekitten.com/303/203",
    story: "Szöszke mindig a legnagyobb kalandokra kész."
  },
  {
    name: "Kormi",
    age: 6,
    species: "kutya",
    breed: "keverék",
    description: "Nyugodt, szerető családi kutya.",
    health: "oltva",
    likedBy: [],
    imageUrl: "https://placedog.net/300/200?id=5",
    story: "Kormi szeret napozni a kertben."
  },
  {
    name: "Manci",
    age: 3,
    species: "macska",
    breed: "rövidszőrű házi",
    description: "Barátságos, dorombolós cica.",
    health: "oltva",
    likedBy: [],
    imageUrl: "https://placekitten.com/304/204",
    story: "Manci imádja a napfényt és az öleléseket."
  },
  {
    name: "Nyafi",
    age: 1,
    species: "nyúl",
    breed: "törpenyúl",
    description: "Vidám és játékos nyuszi.",
    health: "oltva",
    likedBy: [],
    imageUrl: "https://placebear.com/302/202",
    story: "Nyafi imádja a friss zöldségeket."
  },
  {
    name: "Buksi",
    age: 4,
    species: "kutya",
    breed: "beagle",
    description: "Kedves, kíváncsi kutya.",
    health: "oltva, féregtelenítve",
    likedBy: [],
    imageUrl: "https://placedog.net/300/200?id=6",
    story: "Buksi mindig szimatol a környéken."
  },
  {
    name: "Cicó",
    age: 5,
    species: "macska",
    breed: "maine coon",
    description: "Nagy termetű, barátságos macska.",
    health: "oltva",
    likedBy: [],
    imageUrl: "https://placekitten.com/305/205",
    story: "Cicó imádja a hosszú alvásokat."
  },
  {
    name: "Hopp",
    age: 2,
    species: "nyúl",
    breed: "óriásnyúl",
    description: "Gyors és fürge nyuszi.",
    health: "oltva",
    likedBy: [],
    imageUrl: "https://placebear.com/303/203",
    story: "Hopp nagyon szeret futkározni a kertben."
  },
  {
    name: "Zara",
    age: 3,
    species: "kutya",
    breed: "szetter",
    description: "Elegáns, gyors kutya.",
    health: "oltva, féregtelenítve",
    likedBy: [],
    imageUrl: "https://placedog.net/300/200?id=7",
    story: "Zara szeret a mezőn szaladgálni."
  },
  {
    name: "Nóri",
    age: 2,
    species: "macska",
    breed: "házi",
    description: "Szelíd, emberközpontú cica.",
    health: "oltva",
    likedBy: [],
    imageUrl: "https://placekitten.com/306/206",
    story: "Nóri imádja az emberi közelséget."
  },
  {
    name: "Vuk",
    age: 1,
    species: "kutya",
    breed: "keverék",
    description: "Fiatal, játékos kutya.",
    health: "oltva, féregtelenítve",
    likedBy: [],
    imageUrl: "https://placedog.net/300/200?id=8",
    story: "Vuk imádja a labdázást és a simogatást."
  },
  {
    name: "Lili",
    age: 3,
    species: "nyúl",
    breed: "törpenyúl",
    description: "Csendes és szelíd nyuszi.",
    health: "oltva",
    likedBy: [],
    imageUrl: "https://placebear.com/304/204",
    story: "Lili szeret csendben üldögélni a kertben."
  }
]);
