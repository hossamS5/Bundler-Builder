import { create } from "zustand";

import { loadPersistedBundleState } from "@/features/persistence";
import type { BundleStore } from "@/types";
import { clampQuantity, reconcileSelections } from "@/utils/selection";

const DEFAULT_ACTIVE_STEP = 0;

function createInitialState(): Pick<
  BundleStore,
  "activeStep" | "selectedProducts" | "activeVariants" | "stepCount"
> {
  const persistedState = loadPersistedBundleState();

  return {
    activeStep: persistedState?.activeStep ?? DEFAULT_ACTIVE_STEP,
    selectedProducts: persistedState
      ? structuredClone(persistedState.selectedProducts)
      : {},
    activeVariants: {},
    // Populated once the catalog is loaded from the backend (hydrateFromCatalog).
    stepCount: 0,
  };
}

export const useBundleStore = create<BundleStore>((set, get) => ({
  ...createInitialState(),

  hydrateFromCatalog: (catalog) => {
    set((state) => {
      const maxStep = catalog.steps.length - 1;

      return {
        stepCount: catalog.steps.length,
        // Drop any persisted selections that no longer exist in the catalog.
        selectedProducts: reconcileSelections(catalog, state.selectedProducts),
        activeStep: Math.min(Math.max(state.activeStep, -1), maxStep),
      };
    });
  },

  setActiveStep: (step) => {
    const { stepCount } = get();
    const maxStep = stepCount > 0 ? stepCount - 1 : step;
    // -1 is a valid "no step expanded" (collapsed) state for the accordion.
    const nextStep = Math.min(Math.max(step, -1), maxStep);

    set({ activeStep: nextStep });
  },

  goToNextStep: () => {
    const { activeStep, setActiveStep } = get();
    setActiveStep(activeStep + 1);
  },

  setActiveVariant: (productId, variantId) => {
    set((state) => ({
      activeVariants: {
        ...state.activeVariants,
        [productId]: variantId,
      },
    }));
  },

  setVariantQuantity: (productId, variantId, quantity) => {
    const safeQuantity = clampQuantity(quantity);

    set((state) => {
      const currentSelection = state.selectedProducts[productId] ?? {
        variants: {},
      };

      return {
        selectedProducts: {
          ...state.selectedProducts,
          [productId]: {
            variants: {
              ...currentSelection.variants,
              [variantId]: safeQuantity,
            },
          },
        },
      };
    });
  },

  incrementVariantQuantity: (productId, variantId) => {
    const { selectedProducts, setVariantQuantity } = get();
    const currentQuantity =
      selectedProducts[productId]?.variants[variantId] ?? 0;

    setVariantQuantity(productId, variantId, currentQuantity + 1);
  },

  decrementVariantQuantity: (productId, variantId) => {
    const { selectedProducts, setVariantQuantity } = get();
    const currentQuantity =
      selectedProducts[productId]?.variants[variantId] ?? 0;

    setVariantQuantity(productId, variantId, currentQuantity - 1);
  },

  restoreFromPersisted: (state) => {
    set({
      activeStep: state.activeStep,
      selectedProducts: structuredClone(state.selectedProducts),
    });
  },

  resetToInitial: () => {
    set({
      activeStep: DEFAULT_ACTIVE_STEP,
      selectedProducts: {},
      activeVariants: {},
    });
  },
}));
