/**
 * Approach:
 * - Sliding window to find the optimal range
 * - Bitwise operations: To verify if some substring contains all characters of the mask
 *
 * Note: Works, but not for all cases. Some cases, the mask string has repetition of chars
 */

/**
 * @param {string} s
 * @param {string} t
 * @return {string}
 */
var minWindow = function (s, t) {
  const maskBits = convertToBits(t);

  let left = 0;

  let minSubstring = "";

  for (let right = 0; right < s.length; right++) {
    let result;

    do {
      const substring = s.substring(left, right + 1);
      const substringBits = convertToBits(substring);
      result = containsAllChars(substringBits, maskBits);

      console.log({ left, right, substring, result });

      if (result) {
        left++;

        if (substring.length < minSubstring.length || minSubstring == "") {
          minSubstring = substring;

          console.log({ minSubstring });
        }
      }
    } while (result && left <= right);

    console.log("next");
  }

  return minSubstring;
};

function containsAllChars(stringBits, maskBits) {
  // console.log("stringBits: " + stringBits.toString(2));
  // console.log("maskBits: " + maskBits.toString(2));

  return (stringBits & maskBits) === maskBits;
}

/**
 * A - 0
 * Z - 25
 * a - 32
 * z - 57
 *
 * Examples:
 *
 * - ABCDGH
 * - 11001111
 *
 * - ABCDGHLMNORSVXYZ
 * - 11101001100111100011001111
 *
 * @param {string} s
 *
 */
function convertToBits(s) {
  let bits = 0;

  for (const char of s) {
    const charCode = char.charCodeAt(0) - 65;
    bits |= 1 << charCode;
  }

  return bits;
}

// console.log("Result: ", minWindow("ADOBECODEBANC", "ABC"));
console.log("Result: ", minWindow("a", "aa"));
