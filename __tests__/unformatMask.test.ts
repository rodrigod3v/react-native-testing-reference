
import { unformatMask } from './unformatMask';

describe('unformatMask', () => {
  it('should remove non-digit characters from a string', () => {
    const value = 'R$ 1.234,56';
    const unformatted = unformatMask(value);
    expect(unformatted).toBe('123456');
  });

  it('should return the same string if it contains only digits', () => {
    const value = '123456';
    const unformatted = unformatMask(value);
    expect(unformatted).toBe('123456');
  });

  it('should return an empty string if the input is an empty string', () => {
    const value = '';
    const unformatted = unformatMask(value);
    expect(unformatted).toBe('');
  });

  it('should return "-" for non-string input', () => {
    const value: any = 12345;
    const unformatted = unformatMask(value);
    expect(unformatted).toBe('-');
  });
});
