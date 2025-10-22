
import { formatValueForSI } from './formatValueForSI';

describe('formatValueForSI', () => {
  it('should return " - " for non-numeric, NaN, or falsy input', () => {
    expect(formatValueForSI(NaN)).toBe(' - ');
    expect(formatValueForSI(0)).toBe(' - ');
  });

  it('should format numbers less than 1000 without SI units', () => {
    expect(formatValueForSI(999)).toBe('R$ 999');
  });

  it('should format numbers in the thousands with "k"', () => {
    expect(formatValueForSI(1000)).toBe('R$ 1 k');
    expect(formatValueForSI(1500)).toBe('R$ 1 k');
    expect(formatValueForSI(999999)).toBe('R$ 999 k');
  });

  it('should format numbers in the millions with "mi"', () => {
    expect(formatValueForSI(1000000)).toBe('R$ 1 mi');
    expect(formatValueForSI(1500000)).toBe('R$ 1 mi');
    expect(formatValueForSI(999999999)).toBe('R$ 999 mi');
  });

  it('should format numbers in the billions with "bi"', () => {
    expect(formatValueForSI(1000000000)).toBe('R$ 1 bi');
    expect(formatValueForSI(1500000000)).toBe('R$ 1 bi');
    expect(formatValueForSI(999999999999)).toBe('R$ 999 bi');
  });

  it('should handle negative numbers correctly', () => {
    expect(formatValueForSI(-999)).toBe('R$ -999');
    expect(formatValueForSI(-1000)).toBe('R$ -1 k');
    expect(formatValueForSI(-1000000)).toBe('R$ -1 mi');
    expect(formatValueForSI(-1000000000)).toBe('R$ -1 bi');
  });
});
