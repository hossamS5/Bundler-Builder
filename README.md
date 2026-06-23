# Bundle Builder

A multi-step security-system bundle builder: a React + TypeScript frontend that
builds a bundle from a catalog served by a Node.js + Express backend.

The repository is split into two projects:

| Path        | Description                                              |
| ----------- | ------------------------------------------------------- |
| `/` (root)  | Frontend — React 19, Vite, TailwindCSS, Zustand         |
| `/server`   | Backend API — Node.js, Express, JSON file database      |

## Tech Stack

**Frontend**

- React 19 + TypeScript
- Vite
- TailwindCSS
- Zustand (client state: selections, quantities, active step)
- TanStack Query (server state: catalog fetching/caching)
- Axios (HTTP client)
- Zod (runtime validation of API responses)

**Backend**

- Node.js + Express
- JSON file as the database (`server/data/bundle.json`)

## Quick Start

> **Important:** The frontend and backend are two separate apps and must run in
> **two separate terminals at the same time**. They have their own
> `package.json`, so you install dependencies in each one. Start the backend
> first (the frontend needs the API to load the catalog), then start the
> frontend. Keep **both** terminals running while you use the app.

### Terminal 1 — Backend

```bash
cd server
npm install
npm run dev
```

Leave this running. The API starts at `http://localhost:4000`.
See [`server/README.md`](server/README.md) for details.

### Terminal 2 — Frontend

Open a **second terminal** in the repository root (do not close Terminal 1):

```bash
npm install
npm run dev
```

Then open the printed URL (default `http://localhost:5173`).

The frontend proxies `/api/*` to the backend at `http://localhost:4000`
(see `vite.config.ts`), so no CORS or hardcoded host is needed in development.

If you only run the frontend without the backend, the app will show an error
screen with a retry button because the catalog cannot be loaded.

### Production build

```bash
npm run build      # type-check + bundle to dist/
npm run preview    # preview the production build
```

## Configuration

The frontend reads `VITE_API_URL` (defaults to `/api`, which is proxied to the
backend in dev). For a deployed environment, create a `.env` at the root:

```bash
VITE_API_URL=https://your-api-host.com/api
```

## How the data flows

1. On load, `useCatalogQuery` (TanStack Query) calls `fetchCatalog()`.
2. `src/api/client.ts` (Axios) requests `GET /api/catalog`.
3. The response is validated at runtime with Zod (`src/api/schemas.ts`).
4. `CatalogProvider` exposes the catalog via `useCatalog()` and hydrates the
   store (sets step count, reconciles any persisted selections against the live
   catalog).
5. Selectors/utils derive all display data (totals, savings, review groups) from
   `catalog` + selected state — never from a hardcoded import.

While the catalog loads the app shows a loading state; on failure it shows an
error screen with a retry button.

## Architecture

Feature-based layout with strict separation of concerns:

- `src/api/` — Axios client, catalog API, and Zod schemas
- `src/config/` — typed environment access (`VITE_API_URL`)
- `src/features/` — feature boundaries (`bundle-builder`, `review-panel`, `catalog`, `persistence`)
- `src/store/` — Zustand store for selections, quantities, and active step
- `src/selectors/` — derived data (totals, savings, review groups); pure functions of `(catalog, state)`
- `src/utils/` — pure business logic (pricing, selection helpers, formatting)
- `src/data/` — catalog access helpers + JSON schemas
- `src/types/` — explicit domain and store types
- `src/components/ui/` — reusable Tailwind primitives (Button, Card, Badge)
- `src/components/common/` — app-level reusable components (QuantityStepper, PriceDisplay)
- `src/components/icons/` — inline SVG icons (StepIcon, ChevronIcon)
- `src/hooks/` — store/selector bridges for React

## Persistence

`Save my system for later` uses `src/features/persistence/` to write `activeStep`
and `selectedProducts` to `localStorage`. Saved state is restored automatically
on reload and reconciled against the catalog currently served by the backend
(unknown products/variants are dropped).

## Decisions

- The catalog is fetched from the backend at runtime; the frontend bundles no
  product data. Selectors/utils take the catalog as a parameter (no singleton),
  which keeps them pure and testable.
- Server state (catalog) is managed by TanStack Query; client state (selections)
  is managed by Zustand — clear separation of the two.
- API responses are validated with Zod before use; the frontend never trusts the
  wire shape.
- Variant quantities are tracked per variant ID; products without variants use `default`.
- Pricing, savings, and review grouping are computed in selectors/utils, not components.
- The app loads with **no selections** — the shopper starts from an empty system.
- UI is built with **pure TailwindCSS** (no component library). The accordion is
  a custom component driven by Zustand `activeStep`.
```
