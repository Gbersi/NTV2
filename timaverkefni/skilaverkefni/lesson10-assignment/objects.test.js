const {
  checkIfPropertyExistsAndTruthy,
  getCountry,
  getWeirdKeyValue,
  getPropertyByString,
  checkIfPropertyExists,
  createObjectWithKeyValue,
  createObjectWithKeyAndValue,
  createObjectFromArrays,
  extractKeysFromObject,
  getNestedProperty,
  calcSumOfAllObjectValues,
  removePropertyB,
  mergeAndFixObjects,
  multipyAllValuesByB
} = require('./objects')

describe('Object Functions Tests', () => {
  test('checkIfPropertyExistsAndTruthy', () => {
    expect(checkIfPropertyExistsAndTruthy({ a: 1, b: 2, c: 3 }, 'b')).toBe(true);
    expect(checkIfPropertyExistsAndTruthy({ x: 'a', y: null, z: 'c' }, 'y')).toBe(false);
    expect(checkIfPropertyExistsAndTruthy({ x: 'a', b: 'b', z: undefined }, 'z')).toBe(false);
  });

  test('getCountry', () => {
    expect(getCountry({ continent: 'Asia', country: 'Japan' })).toBe('Japan');
    expect(getCountry({ country: 'Sweden', continent: 'Europe' })).toBe('Sweden');
  });

  test('getWeirdKeyValue', () => {
    expect(getWeirdKeyValue({ one: 1, 'prop-2': 2 })).toBe(2);
    expect(getWeirdKeyValue({ 'prop-2': 'two', prop: 'test' })).toBe('two');
  });

  test('getPropertyByString', () => {
    expect(getPropertyByString({ continent: 'Asia', country: 'Japan' }, 'continent')).toBe('Asia');
    expect(getPropertyByString({ country: 'Sweden', continent: 'Europe' }, 'country')).toBe('Sweden');
  });

  test('checkIfPropertyExists', () => {
    expect(checkIfPropertyExists({ a: 1, b: 2, c: 3 }, 'b')).toBe(true);
    expect(checkIfPropertyExists({ x: 'a', y: 'b', z: 'c' }, 'a')).toBe(false);
    expect(checkIfPropertyExists({ x: 'a', y: 'b', z: undefined }, 'z')).toBe(true);
  });

  test('createObjectWithKeyValue', () => {
    expect(createObjectWithKeyValue('a')).toEqual({ key: 'a' });
    expect(createObjectWithKeyValue('z')).toEqual({ key: 'z' });
  });

  test('createObjectWithKeyAndValue', () => {
    expect(createObjectWithKeyAndValue('a', 'b')).toEqual({ a: 'b' });
    expect(createObjectWithKeyAndValue('z', 'x')).toEqual({ z: 'x' });
  });

  test('createObjectFromArrays', () => {
    expect(createObjectFromArrays(['a', 'b', 'c'], [1, 2, 3])).toEqual({ a: 1, b: 2, c: 3 });
  });

  test('extractKeysFromObject', () => {
    expect(extractKeysFromObject({ a: 1, b: 2, c: 3 })).toEqual(['a', 'b', 'c']);
  });

  test('getNestedProperty', () => {
    expect(getNestedProperty({ a: { b: { c: 3 } } })).toEqual({ c: 3 });
    expect(getNestedProperty({ a: { b: 2 } })).toBe(2);
  });

  test('calcSumOfAllObjectValues', () => {
    expect(calcSumOfAllObjectValues({ a: 1, b: 2, c: 3 })).toBe(6);
  });

  test('removePropertyB', () => {
    expect(removePropertyB({ a: 1, b: 7, c: 3 })).toEqual({ a: 1, c: 3 });
  });

  test('mergeAndFixObjects', () => {
    expect(mergeAndFixObjects({ a: 1, b: 2 }, { c: 3, b: 4, e: 5 })).toEqual({ a: 1, b: 2, c: 3, e: 5, d: 4 });
  });

  test('multipyAllValuesByB', () => {
    expect(multipyAllValuesByB({ a: 1, b: 2, c: 3 }, 3)).toEqual({ a: 3, b: 6, c: 9 });
  });
});
