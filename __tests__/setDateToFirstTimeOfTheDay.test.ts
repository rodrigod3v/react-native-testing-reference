
import { setDateToFirstTimeOfTheDay } from './setDateToFirstTimeOfTheDay';

describe('setDateToFirstTimeOfTheDay', () => {
  it('should set the time of a date to the beginning of the day', () => {
    const date = new Date('2023-10-26T12:34:56.789Z');
    const result = setDateToFirstTimeOfTheDay(date);
    expect(result.getHours()).toBe(0);
    expect(result.getMinutes()).toBe(0);
    expect(result.getSeconds()).toBe(0);
  });
});
