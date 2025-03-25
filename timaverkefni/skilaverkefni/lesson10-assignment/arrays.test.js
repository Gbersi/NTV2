const {
  mergeAllArrays,
  getNthCharacterInArray,
  removeFirstThreeElements,
  removeLastNElements,
  countNumberOfElements,
  countNumberOfNegativeValues,
  calcSumOfArrayOfNumbers,
  calcAvgOfArrayOfNumbers,
  getLongestStringFromArray,
  areAllEqual,
} = require('./arrays')

// Jest Test Cases
test('getNthCharacterInArray', () => {
  expect(getNthCharacterInArray([1, 2, 3, 4, 5], 3)).toBe(3);
  expect(getNthCharacterInArray([10, 9, 8, 7, 6], 5)).toBe(6);
  expect(getNthCharacterInArray([7, 2, 1, 6, 3], 1)).toBe(7);
});

test('removeFirstThreeElements', () => {
  expect(removeFirstThreeElements([1, 2, 3, 4])).toEqual([4]);
  expect(removeFirstThreeElements([5, 4, 3, 2, 1, 0])).toEqual([2, 1, 0]);
  expect(removeFirstThreeElements([99, 1, 1])).toEqual([]);
});

test('removeLastNElements', () => {
  expect(removeLastNElements([1, 2, 3, 4, 5], 2)).toEqual([4, 5]);
  expect(removeLastNElements([1, 2, 3], 6)).toEqual([1, 2, 3]);
  expect(removeLastNElements([1, 2, 3, 4, 5, 6, 7, 8], 3)).toEqual([6, 7, 8]);
});

test('countNumberOfElements', () => {
  expect(countNumberOfElements([1, 2, 2, 4])).toBe(4);
  expect(countNumberOfElements([9, 9, 9])).toBe(3);
  expect(countNumberOfElements([4, 3, 2, 1, 0])).toBe(5);
});

test('countNumberOfNegativeValues', () => {
  expect(countNumberOfNegativeValues([1, -2, 2, -4])).toBe(2);
  expect(countNumberOfNegativeValues([0, 9, 1])).toBe(0);
  expect(countNumberOfNegativeValues([4, -3, 2, 1, 0])).toBe(1);
});

test('calcSumOfArrayOfNumbers', () => {
  expect(calcSumOfArrayOfNumbers([10, 100, 40])).toBe(150);
  expect(calcSumOfArrayOfNumbers([10, 100, 1000, 1])).toBe(1111);
  expect(calcSumOfArrayOfNumbers([-50, 0, 50, 200])).toBe(200);
});

test('calcAvgOfArrayOfNumbers', () => {
  expect(calcAvgOfArrayOfNumbers([10, 100, 40])).toBe(50);
  expect(calcAvgOfArrayOfNumbers([10, 100, 1000])).toBe(370);
  expect(calcAvgOfArrayOfNumbers([-50, 0, 50, 200])).toBe(50);
});

test('getLongestStringFromArray', () => {
  expect(getLongestStringFromArray(['help', 'me'])).toBe('help');
  expect(getLongestStringFromArray(['I', 'need', 'candy'])).toBe('candy');
});

test('areAllEqual', () => {
  expect(areAllEqual([true, true, true, true])).toBe(true);
  expect(areAllEqual(['test', 'test', 'test'])).toBe(true);
  expect(areAllEqual([1, 1, 1, 2])).toBe(false);
  expect(areAllEqual(['10', 10, 10, 10])).toBe(false);
});

test('mergeAllArrays', () => {
  expect(mergeAllArrays([1, 2, 3], [4, 5, 6])).toEqual([1, 2, 3, 4, 5, 6]);
  expect(mergeAllArrays(['a', 'b', 'c'], [4, 5, 6])).toEqual(['a', 'b', 'c', 4, 5, 6]);
  expect(mergeAllArrays([true, true], [1, 2], ['a', 'b'])).toEqual([true, true, 1, 2, 'a', 'b']);
});