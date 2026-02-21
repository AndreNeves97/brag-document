/**
 * Approach:
 *  - Frequency map of the sliding window
 */

/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function (s) {
  let charsIndex = new Map();

  let left = 0;
  let right = 0;

  let maxLength = 0;

  // abcabcbb
  while (right < s.length) {
    const currentChar = s.charAt(right);

    if (charsIndex.has(currentChar) && charsIndex.get(currentChar) >= left) {
      left = charsIndex.get(currentChar) + 1;
    }

    // console.log({ left, right, currentChar });

    charsIndex.set(currentChar, right);
    maxLength = Math.max(maxLength, right - left + 1);

    right++;
  }

  return maxLength;
};

console.log("result", lengthOfLongestSubstring("abcabcbb"));
