import type {
  BundleCatalog,
  PricingSummary,
  ReviewCategoryGroup,
  ReviewLineItem,
  SelectedProducts,
} from "@/types";
import { REVIEW_CATEGORY_LABELS, REVIEW_CATEGORY_ORDER } from "@/types";
import { buildPricingSummary } from "@/utils/pricing";
import {
  buildSelectedReviewLineItems,
  getSelectedCountPerStep,
  getSelectedProducts,
} from "@/utils/selection/selectedProducts";

/**
 * Every selector is a pure function of (catalog + selected state). The catalog
 * is provided by the caller (loaded from the backend) rather than read from a
 * module-level singleton, which keeps selectors testable and SSR-safe.
 */
export interface BundleSelectorContext {
  catalog: BundleCatalog;
  selectedProducts: SelectedProducts;
}

export function selectSelectedProducts(context: BundleSelectorContext) {
  return getSelectedProducts(context.catalog, context.selectedProducts);
}

export function selectSelectedCountPerStep(context: BundleSelectorContext) {
  return getSelectedCountPerStep(context.catalog, context.selectedProducts);
}

export function selectReviewLineItems(
  context: BundleSelectorContext,
): ReviewLineItem[] {
  return buildSelectedReviewLineItems(context.catalog, context.selectedProducts);
}

export function selectReviewCategoryGroups(
  context: BundleSelectorContext,
): ReviewCategoryGroup[] {
  const lineItems = selectReviewLineItems(context);

  return REVIEW_CATEGORY_ORDER.map((category) => ({
    category,
    label: REVIEW_CATEGORY_LABELS[category],
    items: lineItems.filter((item) => item.category === category),
  })).filter((group) => group.items.length > 0);
}

export function selectSubtotal(context: BundleSelectorContext): number {
  return selectPricingSummary(context).subtotal;
}

export function selectCompareAtSubtotal(
  context: BundleSelectorContext,
): number {
  return selectPricingSummary(context).compareAtSubtotal;
}

export function selectDiscount(context: BundleSelectorContext): number {
  return selectPricingSummary(context).discount;
}

export function selectTotal(context: BundleSelectorContext): number {
  return selectPricingSummary(context).total;
}

export function selectSavings(context: BundleSelectorContext): number {
  return selectPricingSummary(context).savings;
}

export function selectPricingSummary(
  context: BundleSelectorContext,
): PricingSummary {
  return buildPricingSummary(
    selectReviewLineItems(context),
    context.catalog.pricing.shipping,
  );
}

export function selectShippingLineItem(catalog: BundleCatalog) {
  return catalog.pricing.shipping;
}

export function selectFinancingConfig(catalog: BundleCatalog) {
  return catalog.pricing.financing;
}

export function selectSatisfactionGuaranteeLabel(catalog: BundleCatalog) {
  return catalog.pricing.satisfactionGuaranteeLabel;
}

export function selectSteps(catalog: BundleCatalog) {
  return catalog.steps;
}

export function selectProducts(catalog: BundleCatalog) {
  return catalog.products;
}
