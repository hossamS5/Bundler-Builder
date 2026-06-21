import { create } from "zustand";

import { bundleCatalog } from "@/data";
import { loadPersistedBundleState } from "@/features/persistence";
import type { BundleStore } from "@/types";
import { clampQuantity } from "@/utils/selection";

function cloneSelectedProducts() {
  return structuredClone(bundleCatalog.initialState.selectedProducts);
}

function createInitialState(): Pick<
  BundleStore,
  "activeStep" | "selectedProducts" | "activeVariants"
> {
  const persistedState = loadPersistedBundleState();

  if (persistedState) {
    return {
      activeStep: persistedState.activeStep,
      selectedProducts: structuredClone(persistedState.selectedProducts),
      activeVariants: structuredClone(
        bundleCatalog.initialState.activeVariants,
      ),
    };
  }

  return {
    activeStep: bundleCatalog.initialState.activeStep,
    selectedProducts: cloneSelectedProducts(),
    activeVariants: structuredClone(bundleCatalog.initialState.activeVariants),
  };
}

export const useBundleStore = create<BundleStore>((set, get) => ({
  ...createInitialState(),

  setActiveStep: (step) => {
    const maxStep = bundleCatalog.steps.length - 1;
    const nextStep = Math.min(Math.max(step, 0), maxStep);

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
      activeStep: bundleCatalog.initialState.activeStep,
      selectedProducts: cloneSelectedProducts(),
      activeVariants: structuredClone(
        bundleCatalog.initialState.activeVariants,
      ),
    });
  },
}));
