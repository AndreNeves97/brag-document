/**
 * @param {number} target
 * @param {number[]} nums
 * @return {number}
 */
var minSubArrayLen = function (target, nums) {
  const prefixSum = new Array(nums.length + 1).fill(0);

  for (let i = 0; i < nums.length; i++) {
    const num = nums[i];
    prefixSum[i + 1] = prefixSum[i] + num;
  }

  let minRange = 0;

  for (let i = 0; i < nums.length; i++) {
    let min = i;
    let max = nums.length - 1;

    let j = undefined;

    while (min <= max) {
      let middle = min + Math.floor((max - min) / 2);

      if (prefixSum[middle + 1] - prefixSum[i] < target) {
        min = middle + 1;
      } else {
        max = middle - 1;

        j = middle;
      }
    }

    if (j === undefined) {
      continue;
    }

    const newRange = j - i + 1;

    if (newRange <= 0) {
      continue;
    }

    if (minRange === 0) {
      minRange = newRange;
    } else if (newRange < minRange) {
      minRange = newRange;
    }
  }

  return minRange;
};

// console.log("Result: ", minSubArrayLen(7, [2, 3, 1, 2, 4, 3]));
console.log("Result: ", minSubArrayLen(4, [1, 4, 4]));
// console.log("Result: ", minSubArrayLen(11, [1, 1, 1, 1, 1, 1, 1, 1]));
