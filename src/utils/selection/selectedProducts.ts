import type { ReviewLineItem, SelectedProducts } from '@/types';
import { bundleCatalog } from '@/data';
import {
  getProductLineName,
  getVariantImage,
  resolveVariantId,
} from '@/utils/selection';

function buildReviewLineItem(
  productId: string,
  variantId: string,
  quantity: number,
): ReviewLineItem | null {
  const product = bundleCatalog.products.find((item) => item.id === productId);

  if (!product) {
    return null;
  }

  const resolvedVariantId = resolveVariantId(product, variantId);
  const unitPrice = product.price;
  const unitCompareAtPrice = product.compareAtPrice ?? product.price;

  return {
    productId: product.id,
    variantId: resolvedVariantId,
    name: getProductLineName(product, resolvedVariantId),
    category: product.category,
    image: getVariantImage(product, resolvedVariantId),
    quantity,
    unitPrice,
    unitCompareAtPrice,
    linePrice: unitPrice * quantity,
    lineCompareAtPrice: unitCompareAtPrice * quantity,
    metadata: product.metadata,
    isRequired: product.isRequired,
    isMonthly: product.isMonthly,
  };
}

export function buildSelectedReviewLineItems(
  selectedProducts: SelectedProducts,
): ReviewLineItem[] {
  const lineItems: ReviewLineItem[] = [];

  for (const [productId, selection] of Object.entries(selectedProducts)) {
    for (const [variantId, quantity] of Object.entries(selection.variants)) {
      if (quantity <= 0) {
        continue;
      }

      const lineItem = buildReviewLineItem(productId, variantId, quantity);

      if (lineItem) {
        lineItems.push(lineItem);
      }
    }
  }

  return lineItems;
}

export function getSelectedProducts(selectedProducts: SelectedProducts) {
  return buildSelectedReviewLineItems(selectedProducts);
}

export function getSelectedCountPerStep(selectedProducts: SelectedProducts) {
  return bundleCatalog.steps.map((step) => {
    const productIds = new Set(step.productIds);

    return Object.entries(selectedProducts).reduce((count, [productId, selection]) => {
      if (!productIds.has(productId)) {
        return count;
      }

      const hasSelection = Object.values(selection.variants).some(
        (quantity) => quantity > 0,
      );

      return hasSelection ? count + 1 : count;
    }, 0);
  });
}
