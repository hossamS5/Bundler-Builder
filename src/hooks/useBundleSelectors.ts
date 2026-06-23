import { useMemo } from "react";

import {
  selectCompareAtSubtotal,
  selectDiscount,
  selectFinancingConfig,
  selectPricingSummary,
  selectReviewCategoryGroups,
  selectReviewLineItems,
  selectSatisfactionGuaranteeLabel,
  selectSavings,
  selectSelectedCountPerStep,
  selectSelectedProducts,
  selectShippingLineItem,
  selectSteps,
  selectSubtotal,
  selectTotal,
} from "@/selectors";
import { useCatalog } from "@/features/catalog";
import { useBundleStore } from "@/store";

export function useBundleSelectors() {
  const catalog = useCatalog();
  const selectedProducts = useBundleStore((state) => state.selectedProducts);
  const activeStep = useBundleStore((state) => state.activeStep);
  const activeVariants = useBundleStore((state) => state.activeVariants);

  return useMemo(() => {
    const context = { catalog, selectedProducts };

    return {
      activeStep,
      activeVariants,
      selectedProducts,
      selectedReviewProducts: selectSelectedProducts(context),
      selectedCountPerStep: selectSelectedCountPerStep(context),
      reviewLineItems: selectReviewLineItems(context),
      reviewCategoryGroups: selectReviewCategoryGroups(context),
      subtotal: selectSubtotal(context),
      compareAtSubtotal: selectCompareAtSubtotal(context),
      discount: selectDiscount(context),
      total: selectTotal(context),
      savings: selectSavings(context),
      pricingSummary: selectPricingSummary(context),
      shipping: selectShippingLineItem(catalog),
      financing: selectFinancingConfig(catalog),
      satisfactionGuaranteeLabel: selectSatisfactionGuaranteeLabel(catalog),
      steps: selectSteps(catalog),
    };
  }, [catalog, activeStep, activeVariants, selectedProducts]);
}
