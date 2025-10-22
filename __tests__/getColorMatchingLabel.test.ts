
import { getColorMatchingLabel } from './getColorMatchingLabel';

describe('getColorMatchingLabel', () => {
  it('should return the correct color for a given label', () => {
    const label = 'renda fixa';
    const color = getColorMatchingLabel(label);
    expect(color).toBe('#FC8D62');
  });

  it('should return the correct color for a given label with different casing', () => {
    const label = 'Renda Fixa';
    const color = getColorMatchingLabel(label);
    expect(color).toBe('#FC8D62');
  });

  it('should return white for a label that does not exist', () => {
    const label = 'non-existent-label';
    const color = getColorMatchingLabel(label);
    expect(color).toBe('#fff');
  });

  it('should return white for an empty label', () => {
    const label = '';
    const color = getColorMatchingLabel(label);
    expect(color).toBe('#fff');
  });
});
