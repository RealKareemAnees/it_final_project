import { IncomingMessage, ServerResponse } from "http";
import {
  addToWishList,
  getUserInfoByUsername,
  removeFromWishList,
  updateUser,
} from "../repositories/users";
import { getAuthenticatedUser, safeUser } from "../lib/auth";
import { parseBody, sendJSON } from "../lib/http";

// Handles authenticated user profile and wishlist endpoints.
export async function handleUserRoutes(
  req: IncomingMessage,
  res: ServerResponse,
  urlPath: string,
  method: string,
): Promise<boolean> {
  if (urlPath === "/api/users/me" && method === "GET") {
    // Resolves the currently signed-in user from the request cookie.
    const user = await getAuthenticatedUser(req);
    if (!user) {
      // Rejects the request when no authenticated user can be found.
      sendJSON(res, { error: "Unauthorized" }, 401);
      return true;
    }

    // Returns the sanitized user profile to the client.
    sendJSON(res, { user: safeUser(user) });
    return true;
  }

  if (urlPath === "/api/users/update" && method === "POST") {
    // Resolves the currently signed-in user from the request cookie.
    const user = await getAuthenticatedUser(req);
    if (!user) {
      // Rejects theme updates when the caller is not authenticated.
      sendJSON(res, { error: "Unauthorized" }, 401);
      return true;
    }

    // Reads the JSON payload that contains the requested theme change.
    const body = await parseBody(req);
    // Normalizes the theme value to one of the supported options.
    const nextTheme = body.theme === "dark" ? "dark" : "light";
    // Persists the theme choice for this user.
    await updateUser(user.username, { theme: nextTheme });

    // Reloads the updated record so the response reflects the saved state.
    const updated = await getUserInfoByUsername(user.username);
    // Returns the sanitized updated user profile.
    sendJSON(res, { success: true, user: safeUser(updated) });
    return true;
  }

  if (urlPath === "/api/users/wishlist/add" && method === "POST") {
    // Resolves the currently signed-in user from the request cookie.
    const user = await getAuthenticatedUser(req);
    if (!user) {
      // Rejects wishlist updates when the caller is not authenticated.
      sendJSON(res, { error: "Unauthorized" }, 401);
      return true;
    }

    // Reads the JSON payload that contains the car identifier to add.
    const body = await parseBody(req);
    const { carId } = body;

    if (!carId) {
      // Rejects the request when the required car identifier is missing.
      sendJSON(res, { error: "carId required" }, 400);
      return true;
    }

    // Avoids inserting duplicate wishlist entries for the same car.
    if (!user.wishList.includes(carId)) {
      // Appends the car id to the user's wishlist in the database.
      await addToWishList(user.username, carId);
    }

    // Reloads the updated user record so the client receives current wishlist data.
    const updated = await getUserInfoByUsername(user.username);
    // Returns the latest wishlist array to the client.
    sendJSON(res, {
      success: true,
      wishList: updated?.wishList || [],
    });
    return true;
  }

  if (urlPath === "/api/users/wishlist/remove" && method === "POST") {
    // Resolves the currently signed-in user from the request cookie.
    const user = await getAuthenticatedUser(req);
    if (!user) {
      // Rejects wishlist updates when the caller is not authenticated.
      sendJSON(res, { error: "Unauthorized" }, 401);
      return true;
    }

    // Reads the JSON payload that contains the car identifier to remove.
    const body = await parseBody(req);
    const { carId } = body;

    if (!carId) {
      // Rejects the request when the required car identifier is missing.
      sendJSON(res, { error: "carId required" }, 400);
      return true;
    }

    // Removes the car id from the user's wishlist in the database.
    await removeFromWishList(user.username, carId);

    // Reloads the updated user record so the client receives current wishlist data.
    const updated = await getUserInfoByUsername(user.username);
    // Returns the latest wishlist array to the client.
    sendJSON(res, {
      success: true,
      wishList: updated?.wishList || [],
    });
    return true;
  }

  return false;
}
