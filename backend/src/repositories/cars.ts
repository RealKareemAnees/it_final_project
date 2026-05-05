import { promises as fs } from "fs";
import { join } from "path";
import { Car } from "../types/Car";

const DATA_DIR = join(__dirname, "../../data");
const CARS_FILE = join(DATA_DIR, "cars.json");

// Helper to read cars from file
async function readCars(): Promise<Car[]> {
  try {
    const content = await fs.readFile(CARS_FILE, "utf-8");
    return JSON.parse(content);
  } catch {
    return [];
  }
}

// Helper to write cars to file
async function writeCars(cars: Car[]): Promise<void> {
  await fs.writeFile(CARS_FILE, JSON.stringify(cars, null, 2), "utf-8");
}

// Loads every car record from the database.
export async function getAllCars(): Promise<Car[]> {
  return readCars();
}

// Looks up a single car by its local numeric identifier.
export async function getCarByID(id: number): Promise<Car | null> {
  const cars = await readCars();
  return cars.find((car) => car.localID === id) || null;
}

// Inserts a new car record into the collection.
export async function addCar(car: Car): Promise<void> {
  const cars = await readCars();
  cars.push(car);
  await writeCars(cars);
}

// Applies a partial update to the car identified by the given local ID.
export async function updateCar(
  id: number,
  updatedCar: Partial<Car>,
): Promise<void> {
  const cars = await readCars();
  const index = cars.findIndex((car) => car.localID === id);
  if (index !== -1) {
    cars[index] = { ...cars[index], ...updatedCar };
    await writeCars(cars);
  }
}

// Deletes the car record with the matching local ID.
export async function deleteCar(id: number): Promise<void> {
  const cars = await readCars();
  const filtered = cars.filter((car) => car.localID !== id);
  await writeCars(filtered);
}

// Finds cars that contain the requested tag value.
export async function searchCarsByTag(tag: string): Promise<Car[]> {
  const cars = await readCars();
  return cars.filter((car) => car.tags.includes(tag));
}

// Finds cars whose country field matches the requested value.
export async function searchCarsByCountry(country: string): Promise<Car[]> {
  const cars = await readCars();
  return cars.filter((car) => car.country === country);
}

// Finds cars whose price falls within the provided range.
export async function searchCarsByPriceRange(
  minPrice: number,
  maxPrice: number,
): Promise<Car[]> {
  const cars = await readCars();
  return cars.filter((car) => car.price >= minPrice && car.price <= maxPrice);
}

// Finds cars whose year falls within the provided range.
export async function searchCarsByYearRange(
  minYear: number,
  maxYear: number,
): Promise<Car[]> {
  const cars = await readCars();
  return cars.filter((car) => car.year >= minYear && car.year <= maxYear);
}

// Finds cars made by the requested manufacturer.
export async function searchCarsByManufacturer(
  manufacturer: string,
): Promise<Car[]> {
  const cars = await readCars();
  return cars.filter((car) => car.manufacturer === manufacturer);
}

// Finds cars whose type matches the requested value.
export async function searchCarsByType(type: string): Promise<Car[]> {
  const cars = await readCars();
  return cars.filter((car) => car.type === type);
}

// Performs a case-insensitive name search across car records.
export async function searchCarsByName(name: string): Promise<Car[]> {
  const cars = await readCars();
  const regex = new RegExp(name, "i");
  return cars.filter((car) => regex.test(car.name));
}
