import type { PricingSummary, ReviewLineItem, ShippingConfig } from '@/types';

export function calculateSubtotal(
  lineItems: ReviewLineItem[],
  shipping: ShippingConfig,
): number {
  const productSubtotal = lineItems.reduce(
    (total, item) => total + item.linePrice,
    0,
  );

  return productSubtotal + shipping.price;
}

export function calculateCompareAtSubtotal(
  lineItems: ReviewLineItem[],
  shipping: ShippingConfig,
): number {
  const productCompareAtSubtotal = lineItems.reduce(
    (total, item) => total + item.lineCompareAtPrice,
    0,
  );

  return productCompareAtSubtotal + shipping.compareAtPrice;
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

export function buildPricingSummary(
  lineItems: ReviewLineItem[],
  shipping: ShippingConfig,
): PricingSummary {
  const subtotal = calculateSubtotal(lineItems, shipping);
  const compareAtSubtotal = calculateCompareAtSubtotal(lineItems, shipping);
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
