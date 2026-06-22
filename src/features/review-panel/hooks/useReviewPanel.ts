import { useMemo } from "react";

import {
  selectFinancingConfig,
  selectPricingSummary,
  selectReviewCategoryGroups,
  selectReviewLineItems,
  selectSatisfactionGuaranteeLabel,
  selectShippingLineItem,
} from "@/selectors";
import { useBundleStore } from "@/store";
import type {
  FinancingConfig,
  PricingSummary,
  ReviewCategoryGroup,
  ShippingConfig,
} from "@/types";

export interface ReviewPanelViewModel {
  categoryGroups: ReviewCategoryGroup[];
  hasItems: boolean;
  itemCount: number;
  shipping: ShippingConfig;
  financing: FinancingConfig;
  guaranteeLabel: string;
  pricing: PricingSummary;
}

/**
 * Single source of derived data for the review panel.
 * All values come from selectors — no business logic lives in components.
 */
export function useReviewPanel(): ReviewPanelViewModel {
  const selectedProducts = useBundleStore((state) => state.selectedProducts);

  return useMemo(() => {
    const context = { selectedProducts };
    const lineItems = selectReviewLineItems(context);

    return {
      categoryGroups: selectReviewCategoryGroups(context),
      hasItems: lineItems.length > 0,
      itemCount: lineItems.reduce((total, item) => total + item.quantity, 0),
      shipping: selectShippingLineItem(),
      financing: selectFinancingConfig(),
      guaranteeLabel: selectSatisfactionGuaranteeLabel(),
      pricing: selectPricingSummary(context),
    };
  }, [selectedProducts]);
}
