import {debtToIncome, calculateDebtTotalPayable, estimateInterest, paymentsRemaining, payoffDate} from '../src/calculations/finance';

describe('debt calculations', () => {
  test('fixed interest', () => {
    expect(calculateDebtTotalPayable(100000, 15000, 'fixed')).toBe(115000);
    expect(estimateInterest(100000, 15000, 'fixed')).toBe(15000);
  });
  test('percentage and simple interest', () => {
    expect(calculateDebtTotalPayable(200000, 10, 'percentage')).toBeCloseTo(220000);
    expect(calculateDebtTotalPayable(200000, 12, 'simple', 6)).toBeCloseTo(212000);
  });
  test('payment count and DTI', () => {
    expect(paymentsRemaining(105000, 20000)).toBe(6);
    expect(debtToIncome(60000, 300000)).toBeCloseTo(20);
  });
  test('payoff date follows frequency', () => {
    const debt = {currentBalance: 60000, minimumPayment: 20000, paymentFrequency: 'monthly' as const};
    expect(payoffDate(debt, new Date('2026-01-15T12:00:00Z'))).toBe('2026-04-15');
  });
});
