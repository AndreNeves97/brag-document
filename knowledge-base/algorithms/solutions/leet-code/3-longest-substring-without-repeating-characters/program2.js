/**
 * Approach:
 *  - Frequency map of the sliding window
 */

/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function (s) {
  let charsSet = new Set();
  let count = 0;

  let left = 0;
  let right = 0;

  let maxLength = 0;

  // pwwkewia
  while (right < s.length) {
    const currentChar = s.charAt(right);

    if (charsSet.has(currentChar)) {
      maxLength = Math.max(maxLength, count);

      // Shrink window until the currentChar doesn't have conflict
      while (left < right && charsSet.has(currentChar)) {
        const charToRemove = s.charAt(left);

        // console.log("CONFLICT! Removing", charToRemove);

        charsSet.delete(charToRemove);
        count--;

        left++;
      }
    }

    charsSet.add(currentChar);
    count++;

    // console.log({ left, right, currentChar, count, charsFrequencyInWindow });
    right++;
  }

  return Math.max(maxLength, count);
};

console.log("result", lengthOfLongestSubstring("pwwkew"));
