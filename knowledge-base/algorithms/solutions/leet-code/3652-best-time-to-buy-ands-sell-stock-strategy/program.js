/**
 * @param {number[]} prices
 * @param {number[]} strategy
 * @param {number} k
 * @return {number}
 */
var maxProfit = function (prices, strategy, k) {
  const originalProfit = calcStrategy(prices, strategy);
  let maxProfit = originalProfit;

  console.log({ originalProfit });

  const lastModIndex = strategy.length - k;
  let deltas = 0;

  for (let startIndex = 0; startIndex <= lastModIndex; startIndex++) {
    const endFirst = startIndex + k / 2 - 1;
    const endSecond = startIndex + k - 1;

    if (startIndex === 0) {
      for (let i = startIndex; i <= endSecond; i++) {
        const newStrategy = i <= endFirst ? 0 : 1;
        const delta = calcDelta(prices, strategy, newStrategy, i);

        deltas += delta;

        // console.log({ i, delta });
      }
    } else {
      const pastFirst = calcDelta(prices, strategy, 0, startIndex - 1);
      const newMiddle = prices[endFirst] * (0 - 1);
      const newLast = calcDelta(prices, strategy, 1, endSecond);

      // console.log({ pastFirst, newLast, newMiddle, endFirst });

      deltas = deltas - pastFirst + newLast + newMiddle;
    }

    const newProfit = originalProfit + deltas;

    console.log({ newProfit, deltas });

    maxProfit = Math.max(maxProfit, newProfit);
  }

  return maxProfit;
};

function calcDelta(prices, strategy, newStrategy, i) {
  return prices[i] * (newStrategy - strategy[i]);
}

function calcStrategy(prices, strategy) {
  let sum = 0;

  for (let i = 0; i < prices.length; i++) {
    sum += prices[i] * strategy[i];
  }

  return sum;
}

// 11
console.log(maxProfit([0, 1, 2, 3, 4, 5], [-1, 0, 1, 1, 0, -1], 4));

// 10
// console.log(maxProfit([4, 2, 8], [-1, 0, 1], 2));

// delta = p*nS - p*oS
// p*nS = delta + p*oS
// Sum(all old prices) + delta of new prices
