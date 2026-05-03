import { getDb } from "../database";
import { Car } from "../types/Car";

// Loads every car record from the database.
export async function getAllCars(): Promise<Car[]> {
  const db = getDb();
  const cars = await db.collection("cars").find().toArray();
  return cars as unknown as Car[];
}

// Looks up a single car by its local numeric identifier.
export async function getCarByID(id: number): Promise<Car | null> {
  const db = getDb();
  const car = await db.collection("cars").findOne({ localID: id });
  return car as unknown as Car | null;
}

// Inserts a new car record into the collection.
export async function addCar(car: Car): Promise<void> {
  const db = getDb();
  await db.collection("cars").insertOne(car);
}

// Applies a partial update to the car identified by the given local ID.
export async function updateCar(
  id: number,
  updatedCar: Partial<Car>,
): Promise<void> {
  const db = getDb();
  await db.collection("cars").updateOne({ localID: id }, { $set: updatedCar });
}

// Deletes the car record with the matching local ID.
export async function deleteCar(id: number): Promise<void> {
  const db = getDb();
  await db.collection("cars").deleteOne({ localID: id });
}

// Finds cars that contain the requested tag value.
export async function searchCarsByTag(tag: string): Promise<Car[]> {
  const db = getDb();
  const cars = await db.collection("cars").find({ tags: tag }).toArray();
  return cars as unknown as Car[];
}

// Finds cars whose country field matches the requested value.
export async function searchCarsByCountry(country: string): Promise<Car[]> {
  const db = getDb();
  const cars = await db.collection("cars").find({ country }).toArray();
  return cars as unknown as Car[];
}

// Finds cars whose price falls within the provided range.
export async function searchCarsByPriceRange(
  minPrice: number,
  maxPrice: number,
): Promise<Car[]> {
  const db = getDb();
  const cars = await db
    .collection("cars")
    .find({ price: { $gte: minPrice, $lte: maxPrice } })
    .toArray();
  return cars as unknown as Car[];
}

// Finds cars whose year falls within the provided range.
export async function searchCarsByYearRange(
  minYear: number,
  maxYear: number,
): Promise<Car[]> {
  const db = getDb();
  const cars = await db
    .collection("cars")
    .find({ year: { $gte: minYear, $lte: maxYear } })
    .toArray();
  return cars as unknown as Car[];
}

// Finds cars made by the requested manufacturer.
export async function searchCarsByManufacturer(
  manufacturer: string,
): Promise<Car[]> {
  const db = getDb();
  const cars = await db.collection("cars").find({ manufacturer }).toArray();
  return cars as unknown as Car[];
}

// Finds cars whose type matches the requested value.
export async function searchCarsByType(type: string): Promise<Car[]> {
  const db = getDb();
  const cars = await db.collection("cars").find({ type }).toArray();
  return cars as unknown as Car[];
}

// Performs a case-insensitive name search across car records.
export async function searchCarsByName(name: string): Promise<Car[]> {
  const db = getDb();
  const cars = await db
    .collection("cars")
    .find({ name: { $regex: name, $options: "i" } })
    .toArray();
  return cars as unknown as Car[];
}
