
import { compareArrayObj } from '../../commons/utils/helpers/compareArrayObj';

describe('compareArrayObj', () => {
  const obj1 = { id: 1, name: 'test' };
  const obj2 = { id: 2, name: 'test2' };
  const obj3 = { id: 1, name: 'test' };

  it('should return false for two identical arrays of objects', () => {
    const arr1 = [obj1, obj2];
    const arr2 = [obj3, obj2];
    expect(compareArrayObj(arr1, arr2)).toBe(false);
  });

  it('should return true for two arrays with same objects in different order', () => {
    const arr1 = [obj1, obj2];
    const arr2 = [obj2, obj1];
    expect(compareArrayObj(arr1, arr2)).toBe(true);
  });

  it('should return true for two arrays with different objects', () => {
    const arr1 = [obj1];
    const arr2 = [obj2];
    expect(compareArrayObj(arr1, arr2)).toBe(true);
  });

  it('should return true for two arrays with different lengths', () => {
    const arr1 = [obj1, obj2];
    const arr2 = [obj1];
    expect(compareArrayObj(arr1, arr2)).toBe(true);
  });

  it('should return false for two empty arrays', () => {
    const arr1: unknown[] = [];
    const arr2: unknown[] = [];
    expect(compareArrayObj(arr1, arr2)).toBe(false);
  });
});
