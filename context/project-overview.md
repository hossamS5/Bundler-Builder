# Bundle Builder Project

## Goal

Build a production-quality React application that recreates the provided Figma design.

The application is a multi-step security system bundle builder where users can:

- Select cameras
- Select a monitoring plan
- Select sensors
- Select extra protection

The UI consists of:

1. Builder section (left)
2. Live review panel (right)

The application must be:

- Data-driven
- Responsive
- Maintainable
- Scalable
- Type-safe

---

## Core Requirements

### Accordion Flow

Step 1: Cameras

Step 2: Plan

Step 3: Sensors

Step 4: Extra Protection

Only one step should be expanded at a time.

---

### Product Selection

Products may have:

- Image
- Title
- Description
- Discount badge
- Variant selector
- Quantity selector
- Pricing information

Products are rendered from JSON data.

---

### Variant Behaviour

Each variant maintains its own quantity.

Example:

Wyze Cam V3

Black: 2
White: 1

Review panel must display both entries separately.

---

### Review Panel

Must update in real time.

Displays:

- Cameras
- Sensors
- Accessories
- Plan

Displays:

- Quantity
- Price
- Savings
- Shipping
- Total

---

### Persistence

Save configuration to localStorage.

Restore configuration automatically on reload.

---

## Technical Goals

Prioritize:

- Readability
- Reusability
- Separation of concerns
- Accessibility
- Clean state management
