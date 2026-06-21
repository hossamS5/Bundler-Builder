# Code Standards

## TypeScript

Never use:

- any
- unknown without validation

Always create explicit types.

---

Bad

const product: any = {}

Good

const product: Product = {}

---

## Components

Prefer:

- Small components
- Focused responsibilities

Maximum recommended size:

200 lines

Extract if larger.

---

## Props

Always define explicit interfaces.

Example

interface ProductCardProps {
product: Product;
}

---

## State

Local state:

- UI only

Global state:

- Bundle selections
- Pricing
- Active step

Use Zustand.

---

## Styling

Use Tailwind only.

Avoid inline styles.

Avoid CSS files unless necessary.

---

## Naming

Components:

PascalCase

ProductCard.tsx

Hooks:

useBundle.ts

Utilities:

calculateTotal.ts

Types:

Product.ts

---

## Imports

Order:

1. React
2. External libraries
3. Internal modules
4. Types
5. Styles
