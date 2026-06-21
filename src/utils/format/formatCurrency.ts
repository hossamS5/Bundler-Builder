const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

export function formatCurrency(value: number): string {
  return currencyFormatter.format(value);
}

export function formatMonthlyPrice(value: number): string {
  return `${formatCurrency(value)}/mo`;
}

export function formatFreeLabel(): string {
  return 'FREE';
}

export function formatPriceLabel(
  value: number,
  options?: { isMonthly?: boolean },
): string {
  if (value === 0) {
    return formatFreeLabel();
  }

  if (options?.isMonthly) {
    return formatMonthlyPrice(value);
  }

  return formatCurrency(value);
}
