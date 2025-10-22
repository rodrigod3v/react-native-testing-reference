
import { formattedEmoji } from './formatEmoji';
import { EmojiData } from '../commons/context/EmojisContext';

const defaultEmoji = '🎖️';

const emojiMap = new Map<string, EmojiData>();
emojiMap.set('apple', {
  id: 'apple',
  name: 'Red Apple',
  keywords: ['fruit', 'food'],
  skins: [{ unified: '1f34e', native: '🍎' }],
  version: 1,
});
emojiMap.set('banana', {
    id: 'banana',
    name: 'Banana',
    keywords: ['fruit', 'food'],
    skins: [{ unified: '1f34c', native: '🍌' }],
    version: 1,
  });
emojiMap.set('no-skins', {
    id: 'no-skins',
    name: 'No Skins',
    keywords: [],
    skins: [],
    version: 1,
});


describe('formattedEmoji', () => {
  it('should return default emoji if emojiItem is undefined', () => {
    expect(formattedEmoji(undefined, emojiMap)).toBe(defaultEmoji);
  });

  it("should return default emoji if emojiItem is 'undefined'", () => {
    expect(formattedEmoji('undefined', emojiMap)).toBe(defaultEmoji);
  });

  it('should return the native emoji for a valid emoji name', () => {
    expect(formattedEmoji('apple', emojiMap)).toBe('🍎');
  });

  it('should return the native emoji for a valid emoji name with colons', () => {
    expect(formattedEmoji(':apple:', emojiMap)).toBe('🍎');
  });

  it('should return default emoji if emoji is not in the map', () => {
    expect(formattedEmoji('grape', emojiMap)).toBe(defaultEmoji);
  });

  it('should return default emoji if emoji has no skins', () => {
    expect(formattedEmoji('no-skins', emojiMap)).toBe(defaultEmoji);
  });
});
