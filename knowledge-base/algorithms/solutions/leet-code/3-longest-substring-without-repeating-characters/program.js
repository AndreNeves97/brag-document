/**
 * Approach:
 *  - Frequency map of the sliding window
 */

/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function (s) {
  let charsFrequencyInWindow = new Map();
  let count = 0;

  let left = 0;
  let right = 0;

  let maxLength = 0;

  // pwwkewia
  while (right < s.length) {
    const currentChar = s.charAt(right);

    // if (getValue(charsFrequencyInWindow, currentChar) > 0) {
    //   maxLength = Math.max(maxLength, count);

    //   // Restarting counting
    //   count = 0;
    //   charsFrequencyInWindow = new Map();

    //   left = right;
    // }

    if (getValue(charsFrequencyInWindow, currentChar) > 0) {
      maxLength = Math.max(maxLength, count);

      // Shrink window until the currentChar doesn't have conflict
      while (
        left < right &&
        getValue(charsFrequencyInWindow, currentChar) > 0
      ) {
        const charToRemove = s.charAt(left);

        // console.log("CONFLICT! Removing", charToRemove);

        increment(charsFrequencyInWindow, charToRemove, -1);
        count--;

        left++;
      }
    }

    increment(charsFrequencyInWindow, currentChar, 1);
    count++;

    // console.log({ left, right, currentChar, count, charsFrequencyInWindow });
    right++;
  }

  return Math.max(maxLength, count);
};

/**
 *
 * @param {Map<string, number>} map
 * @param {string} key
 * @param {number} amount
 */
function increment(map, key, amount) {
  if (!map.has(key)) {
    map.set(key, amount);
    return;
  }

  const currentValue = map.get(key) || 0;
  map.set(key, currentValue + amount);
}

/**
 *
 * @param {Map<string, number>} map
 * @param {string} key
 */
function getValue(map, key) {
  if (!map.has(key)) {
    return 0;
  }

  return map.get(key);
}

console.log("result", lengthOfLongestSubstring("pwwkew"));
