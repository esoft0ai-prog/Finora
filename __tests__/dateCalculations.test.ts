import {addDays, daysBetween, isValidDate, startOfMonth, endOfMonth} from '../src/utils/date';

describe('date helpers', () => {
  test('calculates calendar ranges', () => {
    const d = new Date(2026, 1, 14, 12, 0, 0);
    expect(startOfMonth(d)).toBe('2026-02-01');
    expect(endOfMonth(d)).toBe('2026-02-28');
    expect(addDays('2026-02-28', 1)).toBe('2026-03-01');
    expect(daysBetween('2026-09-01', '2026-09-25')).toBe(24);
  });
  test('rejects malformed dates', () => {
    expect(isValidDate('2026-09-25')).toBe(true);
    expect(isValidDate('not-a-date')).toBe(false);
  });
});
