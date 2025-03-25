// Write a function that takes an array (a) and a value (n) as argument
// Return the nth element of 'a'
// Note: The test cases assume n is 1-indexed.
const getNthCharacterInArray = (a, n) => {
  return a[n - 1];
};

// Write a function that takes an array (a) as argument
// Remove the first 3 elements of 'a' and return the result
const removeFirstThreeElements = (a) => {
  return a.slice(3);
};

// Write a function that takes an array (a) and a number (n) as arguments
// It should return the last n elements of a
const removeLastNElements = (a, n) => {
  return a.slice(-n);
};

// Write a function that takes an array (a) as argument
// Return the number of elements in a
const countNumberOfElements = (a) => {
  return a.length;
};

// Write a function that takes an array of numbers as argument
// Return the number of negative values in the array
const countNumberOfNegativeValues = (a) => {
  return a.filter(num => num < 0).length;
};

// Write a function that takes an array of numbers as argument
// It should return the sum of the numbers in the array
const calcSumOfArrayOfNumbers = (a) => {
  return a.reduce((acc, cur) => acc + cur, 0);
};

// Write a function that takes an array of numbers as argument
// It should return the average of the numbers in the array
const calcAvgOfArrayOfNumbers = (arr) => {
  if (arr.length === 0) return 0;
  return calcSumOfArrayOfNumbers(arr) / arr.length;
};

// Write a function that takes an array of strings as argument
// Return the longest string in the array
const getLongestStringFromArray = (arr) => {
  return arr.reduce((longest, current) =>
    current.length > longest.length ? current : longest, ''
  );
};

// Write a function that takes an array as argument
// Return true if all elements in the array are strictly equal; false otherwise
const areAllEqual = (arr) => {
  return arr.every(el => el === arr[0]);
};

// Write a function that takes an arbitrary number of arrays as arguments
// It should return a single array containing the values of all arrays
const mergeAllArrays = (...arrays) => {
  return arrays.flat();
};

module.exports = {
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
};
