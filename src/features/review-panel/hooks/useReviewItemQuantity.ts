import { useCallback } from "react";

import { useBundleStore } from "@/store";

export interface ReviewItemQuantityControls {
  onIncrement: () => void;
  onDecrement: () => void;
}

/**
 * Binds a review line's stepper to the same store keys the product card uses,
 * keeping both quantity controls perfectly in sync.
 */
export function useReviewItemQuantity(
  productId: string,
  variantId: string,
): ReviewItemQuantityControls {
  const incrementVariantQuantity = useBundleStore(
    (state) => state.incrementVariantQuantity,
  );
  const decrementVariantQuantity = useBundleStore(
    (state) => state.decrementVariantQuantity,
  );

  const onIncrement = useCallback(() => {
    incrementVariantQuantity(productId, variantId);
  }, [incrementVariantQuantity, productId, variantId]);

  const onDecrement = useCallback(() => {
    decrementVariantQuantity(productId, variantId);
  }, [decrementVariantQuantity, productId, variantId]);

  return { onIncrement, onDecrement };
}
