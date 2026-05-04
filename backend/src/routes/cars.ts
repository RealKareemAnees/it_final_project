import { IncomingMessage, ServerResponse } from "http";
import {
  addCar,
  deleteCar,
  getAllCars,
  getCarByID,
  updateCar,
} from "../repositories/cars";
import { requireAdmin } from "../lib/auth";
import { parseBody, sendJSON } from "../lib/http";
import { Car } from "../types/Car";

// Handles car listing, search, and admin CRUD endpoints.
export async function handleCarRoutes(
  req: IncomingMessage,
  res: ServerResponse,
  urlPath: string,
  method: string,
  url: string,
): Promise<boolean> {
  if (urlPath === "/api/cars/all" && method === "GET") {
    // Loads every car record from the database for the public listing page.
    const cars = await getAllCars();
    // Sends the full car collection back to the client.
    sendJSON(res, { cars });
    return true;
  }

  if (urlPath === "/api/cars/search" && method === "GET") {
    // Reads the query string parameters that define the search filters.
    const params = new URLSearchParams(url.split("?")[1] || "");
    // Starts from the full car list and narrows it down step by step.
    let results: Car[] = await getAllCars();

    if (params.has("name")) {
      const name = params.get("name")!;
      // Narrows the in-memory car list to records whose names contain the search term.
      results = results.filter((car) =>
        car.name.toLowerCase().includes(name.toLowerCase()),
      );
    }

    if (params.has("manufacturer")) {
      const manufacturer = params.get("manufacturer")!;
      // Narrows the in-memory car list to records whose manufacturer matches the search term.
      results = results.filter((car) =>
        car.manufacturer.toLowerCase().includes(manufacturer.toLowerCase()),
      );
    }

    if (params.has("type")) {
      const type = params.get("type")!;
      // Narrows the in-memory car list to records whose type matches the search term.
      results = results.filter((car) =>
        car.type.toLowerCase().includes(type.toLowerCase()),
      );
    }

    if (params.has("country")) {
      const country = params.get("country")!;
      // Narrows the in-memory car list to records whose country matches the search term.
      results = results.filter((car) =>
        car.country.toLowerCase().includes(country.toLowerCase()),
      );
    }

    if (params.has("tag")) {
      const tag = params.get("tag")!;
      // Narrows the in-memory car list to records whose tags contain the search term.
      results = results.filter((car) =>
        car.tags.some((value) =>
          value.toLowerCase().includes(tag.toLowerCase()),
        ),
      );
    }

    if (params.has("minPrice") && params.has("maxPrice")) {
      const minPrice = Number(params.get("minPrice")!);
      const maxPrice = Number(params.get("maxPrice")!);
      // Narrows the in-memory car list to records whose price falls inside the requested range.
      results = results.filter(
        (car) => car.price >= minPrice && car.price <= maxPrice,
      );
    }

    if (params.has("minYear") && params.has("maxYear")) {
      const minYear = Number(params.get("minYear")!);
      const maxYear = Number(params.get("maxYear")!);
      // Narrows the in-memory car list to records whose year falls inside the requested range.
      results = results.filter(
        (car) => car.year >= minYear && car.year <= maxYear,
      );
    }

    // Sends the filtered car results back to the client.
    sendJSON(res, { cars: results });
    return true;
  }

  if (urlPath.startsWith("/api/cars/") && method === "GET") {
    const idPart = urlPath.split("/api/cars/")[1];
    const id = Number(idPart);
    if (!idPart || Number.isNaN(id)) {
      sendJSON(res, { error: "Invalid car id" }, 400);
      return true;
    }

    const car = await getCarByID(id);
    if (!car) {
      sendJSON(res, { error: "Car not found" }, 404);
      return true;
    }

    sendJSON(res, { car });
    return true;
  }

  if (urlPath === "/api/cars/add" && method === "POST") {
    // Checks that the caller has admin privileges before allowing a write.
    const admin = await requireAdmin(req);
    if (!admin) {
      // Rejects the request when it is not made by an admin.
      sendJSON(res, { error: "Admin only" }, 403);
      return true;
    }

    // Reads the new car payload from the request body.
    const body = await parseBody(req);
    const car: Car = body;

    if (!car.name || !car.manufacturer) {
      // Rejects incomplete car records before inserting them.
      sendJSON(res, { error: "Car name and manufacturer required" }, 400);
      return true;
    }

    // Inserts the new car record into the collection.
    await addCar(car);
    // Returns the newly created car to the caller.
    sendJSON(res, { success: true, car });
    return true;
  }

  if (urlPath === "/api/cars/update" && method === "POST") {
    // Checks that the caller has admin privileges before allowing a write.
    const admin = await requireAdmin(req);
    if (!admin) {
      // Rejects the request when it is not made by an admin.
      sendJSON(res, { error: "Admin only" }, 403);
      return true;
    }

    // Reads the update payload from the request body.
    const body = await parseBody(req);
    const { id, ...updates } = body;

    if (!id) {
      // Rejects the request when the target car id is missing.
      sendJSON(res, { error: "Car id required" }, 400);
      return true;
    }

    // Applies the partial update to the selected car record.
    await updateCar(id, updates);
    // Reloads the updated record so the response includes the saved state.
    const updated = await getCarByID(id);
    // Returns the updated car document to the caller.
    sendJSON(res, { success: true, car: updated });
    return true;
  }

  if (urlPath === "/api/cars/delete" && method === "POST") {
    // Checks that the caller has admin privileges before allowing a write.
    const admin = await requireAdmin(req);
    if (!admin) {
      // Rejects the request when it is not made by an admin.
      sendJSON(res, { error: "Admin only" }, 403);
      return true;
    }

    // Reads the delete target from the request body.
    const body = await parseBody(req);
    const { id } = body;

    if (!id) {
      // Rejects the request when the target car id is missing.
      sendJSON(res, { error: "Car id required" }, 400);
      return true;
    }

    // Deletes the selected car record from the collection.
    await deleteCar(id);
    // Confirms the deletion to the caller.
    sendJSON(res, { success: true });
    return true;
  }

  return false;
}
