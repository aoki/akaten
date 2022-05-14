const isPrime = (n) => {
  // Number.MAX_SAFE_INTEGER; (2^53 - 1)
  // 9,007,199,254,740,991
  if (n > Number.MAX_SAFE_INTEGER) {
    throw new Error(
      `N should be less than MAX_SAFE_INTEGER(${Number.MAX_SAFE_INTEGER}).`
    );
  }

  if (n <= 1) {
    throw new Error(`N should be greater than 1.`);
  }

  if (n === 2) {
    return true;
  }

  for (i = 3; i * i <= n; i += 2) {
    if (n % i == 0) {
      return false;
    }
  }
  return true;
};

module.exports = isPrime;
