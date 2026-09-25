import {financialHealthScore} from '../src/calculations/finance';

describe('financial health score', () => {
  test('is deterministic, bounded and explainable', () => {
    const score = financialHealthScore({
      income: 400000,
      expenses: 250000,
      savings: 80000,
      monthlyDebt: 50000,
      budgetUsedPercent: 85,
      onTimePaymentRatio: 0.9,
      debtReductionPercent: 20,
    });
    expect(score.total).toBeGreaterThanOrEqual(0);
    expect(score.total).toBeLessThanOrEqual(100);
    expect(score.explanation).toHaveLength(5);
    expect(score.total).toBe(score.savings + score.debtBurden + score.budgetDiscipline + score.cashFlow + score.paymentConsistency);
  });
});
