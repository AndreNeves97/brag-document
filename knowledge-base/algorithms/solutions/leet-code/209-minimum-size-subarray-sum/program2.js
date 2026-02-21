/**
 * @param {number} target
 * @param {number[]} nums
 * @return {number}
 *
 * Optimized solution using Sliding Window / Two Pointers approach
 * Time Complexity: O(n) - each element visited at most twice
 * Space Complexity: O(1) - only using a few variables
 */
var minSubArrayLen = function (target, nums) {
  let left = 0;
  let sum = 0;
  let minLength = Infinity;

  // Expand window by moving right pointer
  for (let right = 0; right < nums.length; right++) {
    sum += nums[right];

    // Shrink window from left while sum >= target
    while (sum >= target) {
      minLength = Math.min(minLength, right - left + 1);
      sum -= nums[left];
      left++;
    }
  }

  return minLength === Infinity ? 0 : minLength;
};

// console.log("Result: ", minSubArrayLen(7, [2, 3, 1, 2, 4, 3]));
console.log("Result: ", minSubArrayLen(4, [1, 4, 4]));
// console.log("Result: ", minSubArrayLen(11, [1, 1, 1, 1, 1, 1, 1, 1]));
