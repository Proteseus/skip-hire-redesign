export const formatPrice = (priceBeforeVat: number, vat: number): string => {
  const totalPrice = priceBeforeVat * (1 + vat / 100);
  return `£${totalPrice.toFixed(0)}`;
};

export const formatPriceBreakdown = (priceBeforeVat: number, vat: number) => {
  const vatAmount = priceBeforeVat * (vat / 100);
  const totalPrice = priceBeforeVat + vatAmount;
  
  return {
    beforeVat: `£${priceBeforeVat.toFixed(0)}`,
    vatAmount: `£${vatAmount.toFixed(0)}`,
    total: `£${totalPrice.toFixed(0)}`
  };
};

export const formatHirePeriod = (days: number): string => {
  if (days === 1) return '1 day hire';
  if (days === 7) return '1 week hire';
  if (days === 14) return '2 weeks hire';
  if (days === 21) return '3 weeks hire';
  if (days === 28) return '4 weeks hire';
  return `${days} days hire`;
};