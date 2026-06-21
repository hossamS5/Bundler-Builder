import type { PricingSummary, ReviewLineItem } from '@/types';
import { bundleCatalog } from '@/data';

export function calculateSubtotal(lineItems: ReviewLineItem[]): number {
  const productSubtotal = lineItems.reduce(
    (total, item) => total + item.linePrice,
    0,
  );

  return productSubtotal + bundleCatalog.pricing.shipping.price;
}

export function calculateCompareAtSubtotal(lineItems: ReviewLineItem[]): number {
  const productCompareAtSubtotal = lineItems.reduce(
    (total, item) => total + item.lineCompareAtPrice,
    0,
  );

  return productCompareAtSubtotal + bundleCatalog.pricing.shipping.compareAtPrice;
}

export function calculateDiscount(
  subtotal: number,
  compareAtSubtotal: number,
): number {
  return Math.max(0, compareAtSubtotal - subtotal);
}

export function calculateTotal(subtotal: number): number {
  return subtotal;
}

export function calculateSavings(
  subtotal: number,
  compareAtSubtotal: number,
): number {
  return calculateDiscount(subtotal, compareAtSubtotal);
}

export function buildPricingSummary(lineItems: ReviewLineItem[]): PricingSummary {
  const subtotal = calculateSubtotal(lineItems);
  const compareAtSubtotal = calculateCompareAtSubtotal(lineItems);
  const discount = calculateDiscount(subtotal, compareAtSubtotal);
  const total = calculateTotal(subtotal);
  const savings = calculateSavings(subtotal, compareAtSubtotal);

  return {
    subtotal,
    compareAtSubtotal,
    discount,
    total,
    savings,
  };
}
