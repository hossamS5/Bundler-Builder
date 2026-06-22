# Bundle Builder

Production-ready React foundation for a multi-step security system bundle builder.

## Tech Stack

- React 19
- TypeScript
- Vite
- TailwindCSS
- Zustand

## Run

```bash
npm install
npm run dev
```

```bash
npm run build
npm run preview
```

## Architecture

Feature-based layout with strict separation of concerns:

- `src/features/` — feature boundaries (`bundle-builder`, `review-panel`, `persistence`)
- `src/store/` — Zustand store for selections, quantities, and active step
- `src/selectors/` — derived data (totals, savings, review groups)
- `src/utils/` — pure business logic (pricing, selection helpers, formatting)
- `src/data/` — JSON catalog + JSON schemas
- `src/types/` — explicit domain and store types
- `src/components/ui/` — reusable Tailwind primitives (Button, Card, Badge)
- `src/components/common/` — app-level reusable components (QuantityStepper, PriceDisplay)
- `src/components/icons/` — inline SVG icons (StepIcon, ChevronIcon)
- `src/hooks/` — store/selector bridges for React

## Data

Product cards, steps, and initial selections are driven by `src/data/bundle.json`.

JSON schemas live in `src/data/schemas/`.

## Persistence

`Save my system for later` will use `src/features/persistence/` to write `activeStep` and `selectedProducts` to `localStorage`. Saved state is restored automatically on reload.

## Current Status

Foundation complete. UI components are intentionally not implemented yet.

## Decisions

- Variant quantities are tracked per variant ID; products without variants use `default`.
- Active variant selection is UI state stored separately from persisted selections.
- Pricing, savings, and review grouping are computed in selectors/utils, not in components.
- The app loads with **no selections** — the shopper starts from an empty system and builds it up.
- UI is built with **pure TailwindCSS** (no component library). Reusable primitives live in
  `src/components/ui/`; the accordion is a custom component driven by Zustand `activeStep`.
