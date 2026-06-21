# Architecture

## Stack

- React 19
- TypeScript
- Vite
- TailwindCSS
- Zustand
- shadcn/ui

---

## Architecture Style

Feature-based architecture.

Structure:

src/

├── features
├── components
├── store
├── data
├── hooks
├── types
├── utils

---

## Features

### bundle-builder

Responsible for:

- Accordion
- Step navigation
- Product rendering

---

### review-panel

Responsible for:

- Selected items
- Pricing
- Checkout summary

---

### persistence

Responsible for:

- Save bundle
- Restore bundle

---

## Principles

### Single Responsibility

Each component has one reason to change.

### Presentational Components

Components should be as dumb as possible.

### Business Logic

Business logic belongs in:

- Zustand store
- selectors
- utility functions

Never inside UI components.
