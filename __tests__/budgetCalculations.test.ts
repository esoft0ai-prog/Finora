import {budgetStatus} from '../src/calculations/finance';

describe('budget calculations', () => {
  test('calculates remaining and pace', () => {
    const result = budgetStatus(50000, 20000, '2026-09-01', '2026-09-30', '2026-09-10');
    expect(result.remaining).toBe(30000);
    expect(result.percentage).toBeCloseTo(40);
    expect(result.pace).toBeCloseTo(2000);
    expect(result.projected).toBeCloseTo(60000);
    expect(result.willExceed).toBe(true);
    expect(result.daysUntilExceeded).toBe(15);
  });
  test('handles exceeded budget', () => {
    const result = budgetStatus(10000, 12000, '2026-09-01', '2026-09-30', '2026-09-10');
    expect(result.remaining).toBe(0);
    expect(result.daysUntilExceeded).toBe(0);
  });
});
