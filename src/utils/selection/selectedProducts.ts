import type { BundleCatalog, ReviewLineItem, SelectedProducts } from '@/types';
import {
  getProductLineName,
  getVariantImage,
  resolveVariantId,
} from '@/utils/selection';

function buildReviewLineItem(
  catalog: BundleCatalog,
  productId: string,
  variantId: string,
  quantity: number,
): ReviewLineItem | null {
  const product = catalog.products.find((item) => item.id === productId);

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
  catalog: BundleCatalog,
  selectedProducts: SelectedProducts,
): ReviewLineItem[] {
  const lineItems: ReviewLineItem[] = [];

  for (const [productId, selection] of Object.entries(selectedProducts)) {
    for (const [variantId, quantity] of Object.entries(selection.variants)) {
      if (quantity <= 0) {
        continue;
      }

      const lineItem = buildReviewLineItem(catalog, productId, variantId, quantity);

      if (lineItem) {
        lineItems.push(lineItem);
      }
    }
  }

  return lineItems;
}

export function getSelectedProducts(
  catalog: BundleCatalog,
  selectedProducts: SelectedProducts,
) {
  return buildSelectedReviewLineItems(catalog, selectedProducts);
}

export function getSelectedCountPerStep(
  catalog: BundleCatalog,
  selectedProducts: SelectedProducts,
) {
  return catalog.steps.map((step) => {
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

/**
 * Drops persisted selections that no longer exist in the catalog (unknown
 * products / variants) and prunes non-positive quantities. Keeps the store
 * consistent with whatever the backend currently serves.
 */
export function reconcileSelections(
  catalog: BundleCatalog,
  selectedProducts: SelectedProducts,
): SelectedProducts {
  const reconciled: SelectedProducts = {};

  for (const [productId, selection] of Object.entries(selectedProducts)) {
    const product = catalog.products.find((item) => item.id === productId);

    if (!product) {
      continue;
    }

    const validVariantIds = new Set(
      (product.variants ?? []).map((variant) => variant.id),
    );

    const variants: Record<string, number> = {};

    for (const [variantId, quantity] of Object.entries(selection.variants)) {
      const isKnownVariant =
        validVariantIds.size === 0 || validVariantIds.has(variantId);

      if (isKnownVariant && quantity > 0) {
        variants[variantId] = quantity;
      }
    }

    if (Object.keys(variants).length > 0) {
      reconciled[productId] = { variants };
    }
  }

  return reconciled;
}
