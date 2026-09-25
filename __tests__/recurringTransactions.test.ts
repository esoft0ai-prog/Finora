import {nextOccurrence} from '../src/calculations/finance';

describe('recurring transaction dates', () => {
  test('daily, weekly, monthly and yearly recurrence', () => {
    expect(nextOccurrence('2026-01-10T10:00:00.000Z', 'daily')).toBe('2026-01-11T10:00:00.000Z');
    expect(nextOccurrence('2026-01-10T10:00:00.000Z', 'weekly')).toBe('2026-01-17T10:00:00.000Z');
    expect(nextOccurrence('2026-01-10T10:00:00.000Z', 'monthly')).toBe('2026-02-10T10:00:00.000Z');
    expect(nextOccurrence('2026-01-10T10:00:00.000Z', 'yearly')).toBe('2027-01-10T10:00:00.000Z');
    expect(nextOccurrence('2026-01-10T10:00:00.000Z', 'custom', 3)).toBe('2026-01-13T10:00:00.000Z');
  });
});
