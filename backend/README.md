# IT Final Project — Backend

Minimal TypeScript + Express backend using MongoDB native driver (no ORM).

Quick start

```bash
cd backend
npm install
cp .env.example .env
# edit .env if needed (MONGODB_URI)
npm run dev
```

Build & run

```bash
npm run build
npm start
```

Endpoints

- `GET /` — health
- `GET /users` — list users
- `POST /users` — create user (json: { name, email, age? })
- `GET /users/:id` — get by id
- `PUT /users/:id` — update
- `DELETE /users/:id` — delete

Notes

- Uses the native `mongodb` driver. No ORM.
- DB URI via `MONGODB_URI` in environment.
