import type { Car } from "../types/car.interface";

export interface BrowseFilters {
  country: string;
  type: string;
  brand: string;
  tag: string;
}

export const carCatalog: Car[] = [
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
  {
    localID: 107,
    name: "Range Rover Sport",
    manufacturer: "Land Rover",
    type: "SUV",
    year: 2022,
    price: 99000,
    country: "UK",
    tags: ["suv", "luxury", "offroad"],
    images: [
      "/assets/images/car-types/SUV.jpg",
      "/assets/images/car-types/offroader.jpg",
      "/assets/images/car-types/luxury.jpg",
    ],
    description:
      "A refined SUV that blends comfort, technology, and confident off road ability.",
  },
  {
    localID: 108,
    name: "BMW M4 Competition",
    manufacturer: "BMW",
    type: "Coupe",
    year: 2021,
    price: 82000,
    country: "Germany",
    tags: ["coupe", "track", "turbo"],
    images: [
      "/assets/images/countries/german.avif",
      "/assets/images/car-types/sports.jpg",
      "/assets/images/slide-1-images/audi.avif",
    ],
    description:
      "A balanced rear drive coupe with sharp chassis tuning and a high output turbo six.",
  },
  {
    localID: 109,
    name: "Toyota GR Supra",
    manufacturer: "Toyota",
    type: "Sports",
    year: 2020,
    price: 58000,
    country: "Japan",
    tags: ["sports", "inline-6", "jdm"],
    images: [
      "/assets/images/countries/japan.jpg",
      "/assets/images/car-types/roadster.jpg",
      "/assets/images/car-types/sports.jpg",
    ],
    description:
      "A modern sports car with classic proportions and a punchy turbo inline six.",
  },
  {
    localID: 110,
    name: "Lamborghini Huracan Evo",
    manufacturer: "Lamborghini",
    type: "Supercar",
    year: 2020,
    price: 260000,
    country: "Italy",
    tags: ["v10", "italian", "aero"],
    images: [
      "/assets/images/countries/italian.jpeg",
      "/assets/images/car-types/racing.jpg",
      "/assets/images/slide-1-images/porsche.jpg",
    ],
    description:
      "A low slung V10 supercar with crisp dynamics and a dramatic road presence.",
  },
  {
    localID: 111,
    name: "Mercedes-AMG GT",
    manufacturer: "Mercedes",
    type: "GT",
    year: 2021,
    price: 118000,
    country: "Germany",
    tags: ["gt", "luxury", "v8"],
    images: [
      "/assets/images/countries/german.avif",
      "/assets/images/car-types/luxury.jpg",
      "/assets/images/slide-1-images/porsche.jpg",
    ],
    description:
      "A long hood GT with deep V8 torque and a cabin crafted for long drives.",
  },
  {
    localID: 112,
    name: "Chevrolet Corvette C8",
    manufacturer: "Chevrolet",
    type: "Sports",
    year: 2021,
    price: 90000,
    country: "USA",
    tags: ["mid-engine", "v8", "american"],
    images: [
      "/assets/images/countries/american.jpeg",
      "/assets/images/car-types/sports.jpg",
      "/assets/images/car-types/racing.jpg",
    ],
    description:
      "A mid engine American sports car offering supercar pace with daily usability.",
  },
];

function normalize(value: string): string {
  return value.trim().toLowerCase();
}

function uniqueSorted(values: string[]): string[] {
  return Array.from(new Set(values)).sort((a, b) => a.localeCompare(b));
}

export const filterOptions = {
  countries: uniqueSorted(carCatalog.map((car) => car.country)),
  types: uniqueSorted(carCatalog.map((car) => car.type)),
  brands: uniqueSorted(carCatalog.map((car) => car.manufacturer)),
  tags: uniqueSorted(carCatalog.flatMap((car) => car.tags)),
};

export function filterCars(filters: BrowseFilters): Car[] {
  const country = normalize(filters.country);
  const type = normalize(filters.type);
  const brand = normalize(filters.brand);
  const tag = normalize(filters.tag);

  return carCatalog.filter((car) => {
    const matchesCountry = !country || normalize(car.country) === country;
    const matchesType = !type || normalize(car.type) === type;
    const matchesBrand = !brand || normalize(car.manufacturer) === brand;
    const matchesTag = !tag || car.tags.some((item) => normalize(item) === tag);

    return matchesCountry && matchesType && matchesBrand && matchesTag;
  });
}

export function getCarById(id: number): Car | undefined {
  return carCatalog.find((car) => car.localID === id);
}
