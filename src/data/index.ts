import bundleData from './bundle.json';
import type { BundleCatalog } from '@/types';

export const bundleCatalog = bundleData as BundleCatalog;

export function getProductById(productId: string) {
  return bundleCatalog.products.find((product) => product.id === productId);
}

export function getProductsForStep(stepIndex: number) {
  const step = bundleCatalog.steps[stepIndex];

  if (!step) {
    return [];
  }

  return step.productIds
    .map((productId) => getProductById(productId))
    .filter((product): product is NonNullable<typeof product> => product !== undefined);
}

export function getStepCount() {
  return bundleCatalog.steps.length;
}

export { bundleData };
