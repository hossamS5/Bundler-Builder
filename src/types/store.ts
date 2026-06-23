import type { BundleCatalog, SelectedProducts } from './domain';

export interface BundleState {
  activeStep: number;
  selectedProducts: SelectedProducts;
  activeVariants: Record<string, string>;
  /** Number of steps in the loaded catalog. 0 until hydrated. */
  stepCount: number;
}

export interface BundleActions {
  hydrateFromCatalog: (catalog: BundleCatalog) => void;
  setActiveStep: (step: number) => void;
  goToNextStep: () => void;
  setActiveVariant: (productId: string, variantId: string) => void;
  setVariantQuantity: (
    productId: string,
    variantId: string,
    quantity: number,
  ) => void;
  incrementVariantQuantity: (productId: string, variantId: string) => void;
  decrementVariantQuantity: (productId: string, variantId: string) => void;
  restoreFromPersisted: (state: Pick<BundleState, 'activeStep' | 'selectedProducts'>) => void;
  resetToInitial: () => void;
}

export type BundleStore = BundleState & BundleActions;
