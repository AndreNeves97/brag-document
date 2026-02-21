/**
 * Approach:
 * - Sliding window to find the optimal range
 * - Char-indexed hashtable: Used to map the string requirements (t), and used to compare with the comparing string
 *
 */

/**
 * @param {string} s
 * @param {string} t
 * @return {string}
 */
var minWindow = function (s, t) {
  const maskHashTable = createMaskHashTable(t);
  const originalTable = [...maskHashTable];

  let remainingChars = t.length;

  // console.log({ maskHashTable });

  let left = 0;

  let minSubstring = "";

  for (let right = 0; right < s.length; right++) {
    let result;

    let addingChars = true;

    do {
      if (addingChars) {
        const currrentChar = s[right];
        const currrentCharCode = charToCode(currrentChar);

        if (maskHashTable[currrentCharCode] > 0) {
          maskHashTable[currrentCharCode]--;
          remainingChars--;
        } else {
          if (originalTable[currrentCharCode] > 0) {
            // console.log("exception. overstock", {
            //   currrentChar,
            //   originalTable,
            // });
            maskHashTable[currrentCharCode]--;
          }
        }
      }

      addingChars = false;

      result = remainingChars === 0;

      // console.log({
      //   left,
      //   right,
      //   substring: s.substring(left, right + 1),
      //   result,
      //   maskHashTable,
      // });

      if (result) {
        const substring = s.substring(left, right + 1);

        if (substring.length < minSubstring.length || minSubstring == "") {
          minSubstring = substring;

          // console.log({ minSubstring });
        }

        const charToRemove = s[left];
        const charCodeToRemove = charToCode(charToRemove);

        if (originalTable[charCodeToRemove] > 0) {
          if (maskHashTable[charCodeToRemove] >= 0) {
            remainingChars++;
          }

          maskHashTable[charCodeToRemove]++;
        }

        left++;
      }
    } while (result && left <= right);
  }

  return minSubstring;
};

function createMaskHashTable(t) {
  const table = new Array(58).fill(0);

  for (const char of t) {
    const charCode = charToCode(char);
    table[charCode]++;
  }

  return table;
}

/**
 *
 * @param {string} char
 */
function charToCode(char) {
  return char.charCodeAt(0) - 65;
}

// console.log("Result: ", minWindow("ADOBECODEBANC", "ABC"));
console.log("Result: ", minWindow("a", "aa"));
