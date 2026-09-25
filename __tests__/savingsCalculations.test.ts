import {savingsProgress} from '../src/calculations/finance';

describe('savings goal calculations', () => {
  test('calculates target progress and required contribution', () => {
    const result = savingsProgress(800000, 250000, '2026-12-20', '2026-09-20');
    expect(result.percentage).toBeCloseTo(31.25);
    expect(result.remaining).toBe(550000);
    expect(result.requiredWeekly).toBeGreaterThan(0);
    expect(result.requiredMonthly).toBeGreaterThan(0);
  });
  test('completed goal is capped at 100%', () => {
    const result = savingsProgress(100000, 120000, '2026-12-20', '2026-09-20');
    expect(result.percentage).toBe(100);
    expect(result.remaining).toBe(0);
    expect(result.onTrack).toBe(true);
  });
});
