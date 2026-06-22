import type {
  PricingSummary,
  ReviewCategoryGroup,
  ReviewLineItem,
  SelectedProducts,
} from "@/types";
import { REVIEW_CATEGORY_LABELS, REVIEW_CATEGORY_ORDER } from "@/types";
import { bundleCatalog } from "@/data";
import { buildPricingSummary } from "@/utils/pricing";
import {
  buildSelectedReviewLineItems,
  getSelectedCountPerStep,
  getSelectedProducts,
} from "@/utils/selection/selectedProducts";

export interface BundleSelectorContext {
  selectedProducts: SelectedProducts;
}

export function selectSelectedProducts(context: BundleSelectorContext) {
  return getSelectedProducts(context.selectedProducts);
}

export function selectSelectedCountPerStep(context: BundleSelectorContext) {
  return getSelectedCountPerStep(context.selectedProducts);
}

export function selectReviewLineItems(
  context: BundleSelectorContext,
): ReviewLineItem[] {
  return buildSelectedReviewLineItems(context.selectedProducts);
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
  return buildPricingSummary(selectReviewLineItems(context)).subtotal;
}

export function selectCompareAtSubtotal(
  context: BundleSelectorContext,
): number {
  return buildPricingSummary(selectReviewLineItems(context)).compareAtSubtotal;
}

export function selectDiscount(context: BundleSelectorContext): number {
  return buildPricingSummary(selectReviewLineItems(context)).discount;
}

export function selectTotal(context: BundleSelectorContext): number {
  return buildPricingSummary(selectReviewLineItems(context)).total;
}

export function selectSavings(context: BundleSelectorContext): number {
  return buildPricingSummary(selectReviewLineItems(context)).savings;
}

export function selectPricingSummary(
  context: BundleSelectorContext,
): PricingSummary {
  return buildPricingSummary(selectReviewLineItems(context));
}

export function selectShippingLineItem() {
  return bundleCatalog.pricing.shipping;
}

export function selectFinancingConfig() {
  return bundleCatalog.pricing.financing;
}

export function selectSatisfactionGuaranteeLabel() {
  return bundleCatalog.pricing.satisfactionGuaranteeLabel;
}

export function selectSteps() {
  return bundleCatalog.steps;
}

export function selectProducts() {
  return bundleCatalog.products;
}
