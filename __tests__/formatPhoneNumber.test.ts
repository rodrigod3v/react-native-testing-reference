
import { formatPhoneNumber } from './formatPhoneNumber';

describe('formatPhoneNumber', () => {
  it('should format a valid phone number', () => {
    const phoneNumber = '5511987654321';
    const formatted = formatPhoneNumber(phoneNumber);
    expect(formatted).toBe('+55 (11) 9 8765-4321');
  });

  it('should format a phone number with non-digit characters', () => {
    const phoneNumber = '+55 (11) 98765-4321';
    const formatted = formatPhoneNumber(phoneNumber);
    expect(formatted).toBe('+55 (11) 9 8765-4321');
  });

  it('should handle incomplete phone numbers', () => {
    const phoneNumber = '55119';
    const formatted = formatPhoneNumber(phoneNumber);
    expect(formatted).toBe('+55 (11) 9 - ');
  });

  it('should handle phone numbers with more than 13 digits', () => {
    const phoneNumber = '5511987654321000';
    const formatted = formatPhoneNumber(phoneNumber);
    expect(formatted).toBe('+55 (11) 9 8765-4321');
  });
});
