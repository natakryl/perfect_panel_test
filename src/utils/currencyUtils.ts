export const formatCurrency = (value: number, isFiat: boolean): string => {
  if (isFiat) {
    return (Math.floor(value * 100) / 100).toFixed(2);
  }
  return value.toFixed(18);
};

export const calculateConversion = (
  amount: number,
  fromRate: number,
  toRate: number,
  commissionRate: number
): { converted: number; commission: number; total: number } => {
  const converted = (amount * fromRate) / toRate;
  const commission = converted * commissionRate;
  const total = converted - commission;

  return {
    converted,
    commission,
    total,
  };
};

export const isFiatCurrency = (currency: string): boolean => {
  return /^[A-Z]{3}$/.test(currency);
}; 