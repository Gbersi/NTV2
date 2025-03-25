const {
  calcSum,
  strictEquality,
  getTypeOfValue,
  getFirstChar,
  getNthChar,
  extractFirstHalfOfString,
  removeLastNChractersOfString,
  checkIfNumberIsEven,
  getPercentageOfNumber,
  useAllTheOperators
} = require('./basics')

test('calcSum', () => {
  expect(calcSum(1, 2)).toBe(3)
})

describe('strictEquality function', () => {
  test('returns false when comparing 2 and 3', () => {
    expect(strictEquality(2, 3)).toBe(false);
  });

  test('returns true when comparing 3 and 3', () => {
    expect(strictEquality(3, 3)).toBe(true);
  });

  test('returns false when comparing 1 and "1"', () => {
    expect(strictEquality(1, '1')).toBe(false);
  });

  test('returns true when comparing "10" and "10"', () => {
    expect(strictEquality('10', '10')).toBe(true);
  });
});

describe('getTypeOfValue function', () => {
  test('returns "number" when value is 1', () => {
    expect(getTypeOfValue(1)).toBe('number');
  });

  test('returns "boolean" when value is false', () => {
    expect(getTypeOfValue(false)).toBe('boolean');
  });

  test('returns "object" when value is an empty object', () => {
    expect(getTypeOfValue({})).toBe('object');
  });

  test('returns "object" when value is null', () => {
    expect(getTypeOfValue(null)).toBe('object');
  });

  test('returns "string" when value is "string"', () => {
    expect(getTypeOfValue('string')).toBe('string');
  });

  test('returns "object" when value is an array', () => {
    expect(getTypeOfValue(['array'])).toBe('object');
  });
});

describe('getFirstChar function', () => {
  test('returns "a" when the string is "abcd"', () => {
    expect(getFirstChar('abcd')).toBe('a');
  });

  test('returns "z" when the string is "zyxbwpl"', () => {
    expect(getFirstChar('zyxbwpl')).toBe('z');
  });

  test('returns "g" when the string is "gfedcba"', () => {
    expect(getFirstChar('gfedcba')).toBe('g');
  });
});

describe('getNthChar function', () => {
  test('returns "a" when input is "abcd" and index is 1', () => {
    expect(getNthChar('abcd', 1)).toBe('a');
  });

  test('returns "w" when input is "zyxbwpl" and index is 5', () => {
    expect(getNthChar('zyxbwpl', 5)).toBe('w');
  });

  test('returns "e" when input is "gfedcba" and index is 3', () => {
    expect(getNthChar('gfedcba', 3)).toBe('e');
  });
});

describe('extractFirstHalfOfString function', () => {
  test('returns "abcd" when input is "abcdefgh"', () => {
    expect(extractFirstHalfOfString('abcdefgh')).toBe('abcd');
  });

  test('returns "12" when input is "1234"', () => {
    expect(extractFirstHalfOfString('1234')).toBe('12');
  });

  test('returns "ged" when input is "gedcba"', () => {
    expect(extractFirstHalfOfString('gedcba')).toBe('ged');
  });
});

describe('removeLastNChractersOfString function', () => {
  test('returns "abcd" when input is "abcdefg"', () => {
    expect(removeLastNChractersOfString('abcdefg')).toBe('abcd');
  });

  test('returns "1" when input is "1234"', () => {
    expect(removeLastNChractersOfString('1234')).toBe('1');
  });

  test('returns "fged" when input is "fgedcba"', () => {
    expect(removeLastNChractersOfString('fgedcba')).toBe('fged');
  });
});

describe('checkIfNumberIsEven function', () => {
  test('returns true when input is 10', () => {
    expect(checkIfNumberIsEven(10)).toBe(true);
  });

  test('returns true when input is -4', () => {
    expect(checkIfNumberIsEven(-4)).toBe(true);
  });

  test('returns false when input is 5', () => {
    expect(checkIfNumberIsEven(5)).toBe(false);
  });

  test('returns false when input is -111', () => {
    expect(checkIfNumberIsEven(-111)).toBe(false);
  });
});

describe('getPercentageOfNumber function', () => {
  test('returns 50 when inputs are 100 and 50', () => {
    expect(getPercentageOfNumber(100, 50)).toBe(50);
  });

  test('returns 10 when inputs are 10 and 1', () => {
    expect(getPercentageOfNumber(10, 1)).toBe(10);
  });

  test('returns 5 when inputs are 500 and 25', () => {
    expect(getPercentageOfNumber(500, 25)).toBe(5);
  });
});

describe('useAllTheOperators function', () => {
  test('returns 10.5 when inputs are 6, 5, 4, 3, 2, 1', () => {
    expect(useAllTheOperators(6, 5, 4, 3, 2, 1)).toBe(10.5);
  });

  test('returns 2744 when inputs are 6, 2, 1, 4, 2, 3', () => {
    expect(useAllTheOperators(6, 2, 1, 4, 2, 3)).toBe(2744);
  });

  test('returns -8 when inputs are 2, 3, 6, 4, 2, 3', () => {
    expect(useAllTheOperators(2, 3, 6, 4, 2, 3)).toBe(-8);
  });
});