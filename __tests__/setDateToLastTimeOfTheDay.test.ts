
import { setDateToLastTimeOfTheDay } from './setDateToLastTimeOfTheDay';

describe('setDateToLastTimeOfTheDay', () => {
  it('should set the time of a date to the end of the day', () => {
    const date = new Date('2023-10-26T12:34:56.789Z');
    const result = setDateToLastTimeOfTheDay(date);
    expect(result.getHours()).toBe(23);
    expect(result.getMinutes()).toBe(59);
    expect(result.getSeconds()).toBe(59);
  });
});
