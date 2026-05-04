# Backend API Reference

This backend exposes JSON APIs only — it no longer serves HTML pages. Authentication uses an HttpOnly cookie named `sessionId`. Frontend apps should make requests to the backend (example base URL: `http://localhost:3000`) and include credentials so the cookie is sent/received.

## Base notes

- Responses are JSON. On error the body contains an `error` string and an appropriate HTTP status code.
- Many success responses include `{ success: true, ... }` or return domain objects like `{ cars }`.
- Authentication is cookie-based (`sessionId`). Use `fetch(..., { credentials: 'include' })` or equivalent.
- The server does not set CORS headers; host frontend on the same origin or add a proxy/CORS layer.

## Authentication

- POST `/api/auth/register`
  - Body: `{ "username": string, "password": string }`
  - Success: `{ success: true, user }` (user is sanitized; password removed)
  - Errors: `400` (missing fields), `409` (user exists)

- POST `/api/auth/login`
  - Body: `{ "username": string, "password": string }`
  - Success: `{ success: true, user }` and sets `Set-Cookie: sessionId=...` (HttpOnly)
  - Errors: `400`, `401` (invalid credentials)

- POST `/api/auth/logout`
  - Body: empty
  - Success: `{ success: true }` and clears the cookie

Note: the server creates a default admin at startup (`username: admin`, `password: admin`) if missing.

## User endpoints (authenticated)

- GET `/api/users/me`
  - Returns the current signed-in user: `{ user }` or `401` when not authenticated.

- POST `/api/users/update`
  - Body: `{ "theme": "light" | "dark" }`
  - Returns: `{ success: true, user }` with updated theme

- POST `/api/users/wishlist/add`
  - Body: `{ "carId": string }`
  - Returns: `{ success: true, wishList: string[] }`

- POST `/api/users/wishlist/remove`
  - Body: `{ "carId": string }`
  - Returns: `{ success: true, wishList: string[] }`

All user endpoints require the `sessionId` cookie.

## Cars endpoints

- GET `/api/cars/all`
  - Returns: `{ cars: Car[] }` — the full collection.

- GET `/api/cars/search` (query params)
  - Query params supported: `name`, `manufacturer`, `type`, `country`, `tag`, `minPrice`, `maxPrice`, `minYear`, `maxYear`
  - Example: `/api/cars/search?name=audi&minPrice=20000&maxPrice=50000`
  - Returns: `{ cars: Car[] }` filtered by provided params.

- POST `/api/cars/add` (admin only)
  - Body: `Car` object (see type below). Required fields: `name`, `manufacturer`.
  - Returns: `{ success: true, car }`

- POST `/api/cars/update` (admin only)
  - Body: `{ "id": number, ...updates }` where `id` is `localID` of the car.
  - Returns: `{ success: true, car }` (updated record)

- POST `/api/cars/delete` (admin only)
  - Body: `{ "id": number }`
  - Returns: `{ success: true }`

Admin routes require the authenticated user to have role `admin`. Login as admin or promote a user server-side.

## Contact / Feedback

- POST `/api/contact`
  - Body: `{ "name": string, "email": string, "message": string }`
  - Returns: `{ success: true }` or `400` when fields missing.

- GET `/api/admin/feedback` (admin only)
  - Returns: `{ feedback: Feedback[] }`

## Types

- Car

  {
  name: string,
  type: string,
  manufacturer: string,
  year: number,
  images: string[],
  description: string,
  country: string,
  tags: string[],
  price: number,
  localID: number
  }

- User (stored shape)

  {
  \_id?: string,
  username: string,
  password: string,
  wishList: string[],
  theme: "light" | "dark",
  role?: "user" | "admin"
  }

Note: API responses that include `user` will return a sanitized user (password removed).

## Frontend usage patterns

- Always include credentials so cookies are sent/accepted:

```js
fetch("/api/auth/login", {
  method: "POST",
  credentials: "include",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ username, password }),
});
```

- Check for HTTP status and `error` property in JSON responses:

```js
const res = await fetch("/api/users/me", { credentials: "include" });
const body = await res.json();
if (!res.ok) {
  console.error(body.error);
} else {
  /* use body.user */
}
```

- Searching cars (example):

```js
const res = await fetch("/api/cars/search?name=audi&minPrice=20000");
const { cars } = await res.json();
```

- Adding/removing wishlist (authenticated):

```js
await fetch("/api/users/wishlist/add", {
  method: "POST",
  credentials: "include",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ carId }),
});
```

- Admin actions require an admin session. Use the admin account created at startup or create/promote an admin user.

## Errors & troubleshooting

- If you receive `401 Unauthorized` for authenticated endpoints, ensure the browser included the cookie (`credentials: 'include'`) and the session is still valid.
- If you receive CORS errors, either serve frontend from the same origin, set up a reverse proxy, or add CORS headers in the backend.

---

If you want, I can also:

- add short TypeScript client wrappers for these endpoints, or
- remove unused HTML helpers and `public/` references from the backend.
