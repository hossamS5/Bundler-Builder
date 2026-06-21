import type { SelectedProducts } from './domain';

export interface BundleState {
  activeStep: number;
  selectedProducts: SelectedProducts;
  activeVariants: Record<string, string>;
}

export interface BundleActions {
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
