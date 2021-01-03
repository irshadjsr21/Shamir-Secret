/**
 * Shamir's Secret module.
 *
 * For all the operations for shamir's secret.
 */

/**
 * @description
 * Generates a random number in the given `max` and `min` range.
 *
 * @param {Object} options Options for generating random number.
 * @param {Number} options.min The minimum limit
 * @param {Number} options.max The maximum limit
 * @returns {Number} A random number
*/
const getRandom = ({ min = -100, max = 100 } = {}) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

/**
 * @description
 * Gets the `y` of a line given it's `x`, `m` and `c`.
 *
 * @param {Number} x `x` of the point
 * @param {Number} m Slope of the line
 * @param {Number} c The y intercept of the line.
 * @returns {Number} `y` of the point
*/
const getY = (x, m, c) => {
  return m * x + c;
};

/**
 * @description
 * Creates the share from the given secret.
 *
 * @param {Array<Number>} secretArr Secret array
 * @param {Object} options Option for creating the share
 * @param {Number} options.n The number of share to be created
 * @returns {Array} The shares array
*/
const createShares = (secretArr, { n = 4 } = {}) => {
  const m = getRandom();
  const shares = [];
  for (let i = 0; i < n; i++) {
    const currentShare = []
    for (const sec of secretArr) {
      secret = Number(sec);
      const x = getRandom({ min: 1, max: 255 });
      currentShare.push([x, getY(x, m, secret)]);
    }

    shares.push(currentShare);
  }
  return shares;
};

/**
 * @description
 * Compute the secret from the given shares. (Requires atleast 2 shares).
 *
 * @param {Array} shares The shares array
 * @returns {Array} The secret array
*/
const getSecret = shares => {
  if (!shares || !Array.isArray(shares)) {
    throw new Error("Shares should be an array.");
  }

  if (shares.length < 2)
    throw new Error("Not enough shares to get the secret.");

  const secretArr = [];

  for (let i=0;i<shares[0].length;i++) {
    const [x1, y1] = shares[0][i];
    const [x2, y2] = shares[1][i];
    const m = (y1 - y2) / (x1 - x2);
    const c = y1 - m * x1;
    secretArr.push(c);
  }

  return secretArr;
};

module.exports = { createShares, getSecret };
