import { useCallback } from "react";

import { useBundleStore } from "@/store";
import type { Product } from "@/types";
import {
  getProductVariantIds,
  isProductSelected,
  resolveVariantId,
} from "@/utils/selection";

export interface ProductSelectionState {
  activeVariantId: string;
  quantity: number;
  isSelected: boolean;
  selectVariant: (variantId: string) => void;
  increment: () => void;
  decrement: () => void;
}

export function useProductSelection(product: Product): ProductSelectionState {
  const productSelection = useBundleStore(
    (state) => state.selectedProducts[product.id],
  );
  const activeVariantRaw = useBundleStore(
    (state) => state.activeVariants[product.id],
  );

  const setActiveVariant = useBundleStore((state) => state.setActiveVariant);
  const incrementVariantQuantity = useBundleStore(
    (state) => state.incrementVariantQuantity,
  );
  const decrementVariantQuantity = useBundleStore(
    (state) => state.decrementVariantQuantity,
  );

  const fallbackVariantId = getProductVariantIds(product)[0];
  const activeVariantId = resolveVariantId(
    product,
    activeVariantRaw ?? fallbackVariantId,
  );

  const quantity = productSelection?.variants[activeVariantId] ?? 0;
  const isSelected = isProductSelected(productSelection?.variants);

  const selectVariant = useCallback(
    (variantId: string) => {
      setActiveVariant(product.id, variantId);
    },
    [product.id, setActiveVariant],
  );

  const increment = useCallback(() => {
    incrementVariantQuantity(product.id, activeVariantId);
  }, [product.id, activeVariantId, incrementVariantQuantity]);

  const decrement = useCallback(() => {
    decrementVariantQuantity(product.id, activeVariantId);
  }, [product.id, activeVariantId, decrementVariantQuantity]);

  return {
    activeVariantId,
    quantity,
    isSelected,
    selectVariant,
    increment,
    decrement,
  };
}
