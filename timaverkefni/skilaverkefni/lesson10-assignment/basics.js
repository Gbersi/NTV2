// Write a function that takes two numbers (a and b) as argument
// Sum a and b and return the result
const calcSum = (a, b) => {
  return a + b;
};

// Write a function that takes two values, say a and b, as arguments
// Return true if the two values are equal and of the same type
const strictEquality = (a, b) => {
  return a === b;
};

// Write a function that takes a value as argument
// Return the type of the value
const getTypeOfValue = (a) => {
  return typeof a;
};

// Write a function that takes a string (a) as argument
// Return the 1st character of the string a
const getFirstChar = (a) => {
  return a[0];
};

// Write a function that takes a string (a) and a number (n) as argument
// Return the nth character of 'a'
// Note: The tests assume that n is 1-indexed.
const getNthChar = (a, n) => {
  return a[n - 1];
};

// Write a function that takes a string (a) as argument
// Extract the first half of a and return the result
// Here we use Math.floor to round down if the length is odd.
const extractFirstHalfOfString = (a) => {
  return a.slice(0, Math.floor(a.length / 2));
};

// Write a function that takes a string (a) as argument
// Remove the last 3 characters of a and return the result
const removeLastNChractersOfString = (a) => {
  return a.slice(0, -3);
};

// Write a function that takes a number as argument
// If the number is even, return true; otherwise, return false
const checkIfNumberIsEven = (a) => {
  return a % 2 === 0;
};

// Write a function that takes two numbers (a and b) as arguments
// Return what percent b is of a (i.e. (b / a) * 100)
const getPercentageOfNumber = (a, b) => {
  return (b / a) * 100;
};

// Write a function that takes 6 values (a,b,c,d,e,f) as arguments
// Sum a and b, then subtract c, then multiply by d, divide by e,
// and finally raise to the power of f.
const useAllTheOperators = (a, b, c, d, e, f) => {
  return ((a + b - c) * d / e) ** f;
};

module.exports = {
  calcSum,
  strictEquality,
  getTypeOfValue,
  getFirstChar,
  getNthChar,
  extractFirstHalfOfString,
  removeLastNChractersOfString,
  checkIfNumberIsEven,
  getPercentageOfNumber,
  useAllTheOperators,
};
