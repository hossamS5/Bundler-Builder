# State Management

Use Zustand.

---

## Store Shape

type BundleStore = {

activeStep: number;

selectedProducts: Record<
string,
{
variants: Record<string, number>;
}

> ;

}

---

## Responsibilities

Store owns:

- selections
- quantities
- variant counts
- active step

---

## Derived Data

Create selectors for:

selectedProducts

selectedCountPerStep

subtotal

discount

total

savings

Never calculate these inside components.

---

## Persistence

Persist only:

- selectedProducts
- activeStep

Use localStorage.
