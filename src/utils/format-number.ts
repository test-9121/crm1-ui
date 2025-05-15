
// Format a number to a locale string with appropriate formatting
export function formatNumber(value: number): string {
  return new Intl.NumberFormat('en-US').format(value);
}

// Format a number as currency (USD by default)
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount);
}

// Format a number as a percentage
export function formatPercent(value: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'percent',
    minimumFractionDigits: 0,
    maximumFractionDigits: 1,
  }).format(value / 100);
}

// Format large numbers in a shortened form (e.g., 1.2k, 1.2M)
export function formatShortNumber(value: number): string {
  if (value < 1000) {
    return value.toString();
  } else if (value < 1000000) {
    return `${(value / 1000).toFixed(1)}k`;
  } else if (value < 1000000000) {
    return `${(value / 1000000).toFixed(1)}M`;
  } else {
    return `${(value / 1000000000).toFixed(1)}B`;
  }
}
