import type { Product } from '@/types';
import { DEFAULT_VARIANT_ID } from '@/types';

export function getProductVariantIds(product: Product): string[] {
  if (product.variants && product.variants.length > 0) {
    return product.variants.map((variant) => variant.id);
  }

  return [DEFAULT_VARIANT_ID];
}

export function getDefaultVariantId(product: Product): string {
  return getProductVariantIds(product)[0];
}

export function resolveVariantId(product: Product, variantId: string): string {
  const variantIds = getProductVariantIds(product);

  if (variantIds.includes(variantId)) {
    return variantId;
  }

  return getDefaultVariantId(product);
}

export function getVariantDisplayName(
  product: Product,
  variantId: string,
): string | undefined {
  if (variantId === DEFAULT_VARIANT_ID) {
    return undefined;
  }

  return product.variants?.find((variant) => variant.id === variantId)?.name;
}

export function getVariantImage(product: Product, variantId: string): string {
  if (variantId === DEFAULT_VARIANT_ID) {
    return product.image;
  }

  const variant = product.variants?.find((item) => item.id === variantId);

  return variant?.image ?? product.image;
}

export function getProductLineName(product: Product, variantId: string): string {
  const variantName = getVariantDisplayName(product, variantId);

  if (!variantName) {
    return product.name;
  }

  return `${product.name} (${variantName})`;
}

export function clampQuantity(quantity: number): number {
  return Math.max(0, quantity);
}

export function isProductSelected(
  variants: Record<string, number> | undefined,
): boolean {
  if (!variants) {
    return false;
  }

  return Object.values(variants).some((quantity) => quantity > 0);
}

export function getDistinctSelectedProductCount(
  variants: Record<string, number> | undefined,
): number {
  if (!variants) {
    return 0;
  }

  return Object.values(variants).filter((quantity) => quantity > 0).length;
}

export function countDistinctProductsWithSelections(
  variantsByProduct: Record<string, Record<string, number>>,
): number {
  return Object.values(variantsByProduct).filter((variants) =>
    isProductSelected(variants),
  ).length;
}
