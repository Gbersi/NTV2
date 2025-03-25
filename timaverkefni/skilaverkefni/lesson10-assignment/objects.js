// Write a function that takes an object (a) and a string (b) as argument
// Return true if the object has a property with key 'b' and that property is truthy
const checkIfPropertyExistsAndTruthy = (a, b) => {
  return Boolean(a[b]);
};

// Write a function that takes an object with two properties as argument
// It should return the value of the property with key country
const getCountry = (obj) => {
  return obj.country;
};

// Write a function that takes an object with two properties as argument
// It should return the value of the property with key 'prop-2'
const getWeirdKeyValue = (obj) => {
  return obj['prop-2'];
};

// Write a function that takes an object with two properties as argument
// It should return the value of the property with key equal to the provided string
const getPropertyByString = (obj, key) => {
  return obj[key];
};

// Write a function that takes an object (a) and a string (b) as argument
// Return true if the object has a property with key 'b' (even if the value is undefined)
const checkIfPropertyExists = (a, b) => {
  return Object.prototype.hasOwnProperty.call(a, b);
};

// Write a function that takes a string as argument
// Create an object that has a property with key 'key' and value equal to the string
const createObjectWithKeyValue = (a) => {
  return { key: a };
};

// Write a function that takes two strings (a and b) as arguments
// Create an object that has a property with key equal to a and value equal to b
const createObjectWithKeyAndValue = (a, b) => {
  return { [a]: b };
};

// Write a function that takes two arrays (a and b) as arguments
// Create an object that has properties with keys from array a and corresponding values from array b
const createObjectFromArrays = (a, b) => {
  const obj = {};
  a.forEach((key, index) => {
    obj[key] = b[index];
  });
  return obj;
};

// Write a function that takes an object (a) as argument
// Return an array with all object keys
const extractKeysFromObject = (a) => {
  return Object.keys(a);
};

// Write a function that takes an object as argument
// Return the property 'b' of object 'a' inside the original object if it exists; otherwise return undefined
const getNestedProperty = (obj) => {
  return obj.a ? obj.a.b : undefined;
};

// Write a function that takes an object as argument
// Return the sum of all object values
const calcSumOfAllObjectValues = (a) => {
  return Object.values(a).reduce((acc, val) => acc + val, 0);
};

// Write a function that takes an object as argument
// Return a new object with all the original properties except for the property with key 'b'
const removePropertyB = (obj) => {
  const { b, ...rest } = obj;
  return rest;
};

// Write a function that takes two objects as arguments
// The property 'b' in the second object should be renamed to 'd' when merging
// Return the resulting merged object
const mergeAndFixObjects = (x, y) => {
  const { b: wrongB, ...restY } = y;
  return { ...x, ...restY, d: wrongB };
};

// Write a function that takes an object (a) and a number (b) as arguments
// Multiply all values of a by b and return the new object
const multipyAllValuesByB = (a, b) => {
  const result = {};
  for (const key in a) {
    if (a.hasOwnProperty(key)) {
      result[key] = a[key] * b;
    }
  }
  return result;
};

module.exports = {
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
  multipyAllValuesByB,
};
