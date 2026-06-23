# Bundle Builder — Backend API

Node.js + Express API that serves the product catalog for the Bundle Builder
frontend. Data is stored in a JSON file (`data/bundle.json`) as a stand-in
database until a real database is connected.

## Requirements

- Node.js >= 18 (uses native ES modules)

## Setup

```bash
cd server
npm install
```

Optionally copy the example environment file and adjust values:

```bash
cp .env.example .env
```

> `.env` is optional — sensible defaults are used when it is absent.

## Run

```bash
npm run dev     # start with nodemon (auto-reload on changes)
npm start       # start once with node
```

The server logs the URLs it serves on startup:

```
API server running at http://localhost:4000
  Catalog:  http://localhost:4000/api/catalog
  Health:   http://localhost:4000/api/health
```

## Environment variables

| Variable      | Default                  | Description                                                        |
| ------------- | ------------------------ | ----------------------------------------------------------------- |
| `PORT`        | `4000`                   | Port the API listens on                                           |
| `HOST`        | `localhost`              | Host the API binds to                                             |
| `PUBLIC_URL`  | `http://HOST:PORT`       | Base URL used to build absolute image URLs                        |
| `CORS_ORIGIN` | `http://localhost:5173`  | Comma-separated list of allowed frontend origins                  |

## API

Base path: `/api`

| Method | Endpoint              | Description                                  |
| ------ | --------------------- | -------------------------------------------- |
| GET    | `/api/health`         | Health check (`{ status, timestamp }`)       |
| GET    | `/api/catalog`        | Full catalog (products, steps, pricing)      |
| GET    | `/api/products`       | All products                                 |
| GET    | `/api/products/:id`   | Single product by id (404 if missing)        |

Product/variant images are returned as **absolute URLs** (e.g.
`http://localhost:4000/products/wyzeCam-v4.png`) and are served statically from
`/products`.

Errors use a consistent shape:

```json
{ "error": { "message": "Product \"foo\" was not found" } }
```

## Project structure

```
server/
├── data/
│   └── bundle.json          # JSON "database" (catalog source of truth)
├── public/
│   └── products/            # product images, served statically at /products
└── src/
    ├── index.js             # entry point: creates the app and listens
    ├── app.js               # Express app: middleware, static assets, routes
    ├── config/              # environment-driven configuration
    ├── lib/                 # jsonDb (read/write), asyncHandler, HttpError, paths
    ├── services/            # business logic (reads JSON, maps image URLs)
    ├── controllers/         # thin request/response handlers
    ├── routes/              # route definitions
    └── middleware/          # notFound + centralized error handler
```

## Swapping the JSON database

Only the service layer (`src/services/`) touches the data via `src/lib/jsonDb.js`.
To migrate to a real database, replace the calls in `jsonDb.js` (or the service)
with your DB client — routes, controllers, and the frontend require no changes.
```
