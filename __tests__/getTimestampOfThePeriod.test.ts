
import { getTimestampOfThePeriod } from './getTimestampOfThePeriod';
import { getTime, startOfDay, sub } from 'date-fns';

describe('getTimestampOfThePeriod', () => {
  const date = new Date('2023-10-26T12:00:00.000Z');

  it('should return the correct timestamp when subtracting one month', () => {
    const duration = { months: 1 };
    const expectedTimestamp = getTime(startOfDay(sub(date, duration)));
    const timestamp = getTimestampOfThePeriod(date, duration);
    expect(timestamp).toBe(expectedTimestamp);
  });

  it('should return the correct timestamp when subtracting one year', () => {
    const duration = { years: 1 };
    const expectedTimestamp = getTime(startOfDay(sub(date, duration)));
    const timestamp = getTimestampOfThePeriod(date, duration);
    expect(timestamp).toBe(expectedTimestamp);
  });

  it('should return the correct timestamp for a zero duration', () => {
    const duration = { days: 0 };
    const expectedTimestamp = getTime(startOfDay(date));
    const timestamp = getTimestampOfThePeriod(date, duration);
    expect(timestamp).toBe(expectedTimestamp);
  });
});
