import type { Car } from "../types/Car";

export const seedCars: Car[] = [
  {
    localID: 101,
    name: "Aston Martin DB11",
    manufacturer: "Aston Martin",
    type: "GT",
    year: 2021,
    price: 215000,
    country: "UK",
    tags: ["grand tourer", "luxury", "v12"],
    images: [
      "/assets/images/slide-1-images/aston-martin.jpg",
      "/assets/images/car-types/luxury.jpg",
      "/assets/images/countries/german.avif",
    ],
    description:
      "A long distance grand tourer with a handcrafted cabin and a smooth V12 character.",
  },
  {
    localID: 102,
    name: "Audi R8 V10",
    manufacturer: "Audi",
    type: "Supercar",
    year: 2020,
    price: 169000,
    country: "Germany",
    tags: ["supercar", "v10", "quattro"],
    images: [
      "/assets/images/slide-1-images/audi.avif",
      "/assets/images/countries/german.avif",
      "/assets/images/car-types/sports.jpg",
    ],
    description:
      "A mid engine performance icon with sharp handling and an unmistakable V10 sound.",
  },
  {
    localID: 103,
    name: "Porsche 911 GT3 RS",
    manufacturer: "Porsche",
    type: "Track",
    year: 2022,
    price: 223000,
    country: "Germany",
    tags: ["track", "aero", "flat-six"],
    images: [
      "/assets/images/slide-1-images/porsche.jpg",
      "/assets/images/countries/german.jpeg",
      "/assets/images/car-types/racing.jpg",
    ],
    description:
      "A focused track machine with vivid steering, aero grip, and a race bred flat six.",
  },
  {
    localID: 104,
    name: "Ford Mustang Fastback",
    manufacturer: "Ford",
    type: "Muscle",
    year: 1967,
    price: 78000,
    country: "USA",
    tags: ["classic", "v8", "muscle"],
    images: [
      "/assets/images/countries/american.jpeg",
      "/assets/images/car-types/muscle.jpg",
      "/assets/images/car-types/roadster.jpg",
    ],
    description:
      "A timeless muscle coupe with a long hood, bold stance, and unmistakable V8 rumble.",
  },
  {
    localID: 105,
    name: "Ferrari 296 GTB",
    manufacturer: "Ferrari",
    type: "Supercar",
    year: 2023,
    price: 320000,
    country: "Italy",
    tags: ["hybrid", "v6", "italian"],
    images: [
      "/assets/images/countries/italian.jpeg",
      "/assets/images/car-types/sports.jpg",
      "/assets/images/slide-1-images/porsche.jpg",
    ],
    description:
      "A sharp hybrid supercar pairing compact V6 power with elegant Italian design.",
  },
  {
    localID: 106,
    name: "Nissan GT-R Nismo",
    manufacturer: "Nissan",
    type: "Performance",
    year: 2021,
    price: 210000,
    country: "Japan",
    tags: ["awd", "turbo", "jdm"],
    images: [
      "/assets/images/countries/japan.jpg",
      "/assets/images/car-types/racing.jpg",
      "/assets/images/slide-1-images/audi.avif",
    ],
    description:
      "A tech driven performance icon with all wheel drive grip and relentless turbo punch.",
  },
];

