
import { formatToNotShowValues } from './formatToNotShowValues';

describe('formatToNotShowValues', () => {
  it('should replace all characters with bullets and limit to 4', () => {
    const value = '12345678';
    const formatted = formatToNotShowValues(value);
    expect(formatted).toBe('••••');
  });

  it('should handle strings shorter than 4 characters', () => {
    const value = '123';
    const formatted = formatToNotShowValues(value);
    expect(formatted).toBe('•••');
  });

  it('should handle an empty string', () => {
    const value = '';
    const formatted = formatToNotShowValues(value);
    expect(formatted).toBe('');
  });
});
