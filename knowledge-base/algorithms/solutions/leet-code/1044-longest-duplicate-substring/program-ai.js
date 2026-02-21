/**
 * @param {string} s
 * @return {string}
 */
var longestDupSubstring = function (s) {
  let minLength = 1,
    maxLength = s.length;

  let foundSubstring = "";

  log({ s });

  while (minLength <= maxLength) {
    const searchLength = Math.floor((maxLength - minLength) / 2) + minLength;
    const hashesMap = new Map();

    let foundDuplicate = false;

    // if (searchLength !== 3) {
    //   break;
    // }

    log("\n");
    log({ minLength, maxLength, searchLength });

    // Precompute base^(searchLength-1) for rolling hash efficiency
    let power = 1;
    for (let i = 1; i < searchLength; i++) {
      power = (power * hashingPrime) % largerPrime;
    }

    let windowHash;

    for (let left = 0; left < s.length - searchLength + 1; left++) {
      const right = left + searchLength - 1;

      if (!windowHash) {
        const window = s.substring(left, right + 1);
        windowHash = hash(window);

        log("first hash", { window, windowHash });
      } else {
        windowHash = rollHash(windowHash, s[left - 1], s[right], power);

        log("rolled hash", {
          windowHash,
          confirmation: hash(s.substring(left, right + 1)),
          substring: s.substring(left, right + 1),
        });

        if (windowHash === Infinity || isNaN(windowHash)) {
          return;
        }

        // return;
      }

      // log({
      //   window: s.substring(left, right + 1),
      //   windowHash,
      // });

      if (windowHash === Infinity || isNaN(windowHash)) {
        break;
      }

      const substring = s.substring(left, right + 1);

      if (
        hashesMap.has(windowHash) &&
        disambiguateColision(hashesMap.get(windowHash), substring)
      ) {
        foundDuplicate = true;

        log("Found!", {
          searchLength,
          substring,
          windowHash,
        });

        foundSubstring = substring;
        break;
      }

      hashesMap.set(windowHash, substring);
    }

    if (foundDuplicate) {
      minLength = searchLength + 1;
    } else {
      maxLength = searchLength - 1;
    }
  }

  return foundSubstring;
};

function disambiguateColision(searchTerm, window) {
  for (let i = 0; i < searchTerm.length; i++) {
    if (searchTerm[i] !== window[i]) {
      return false;
    }
  }

  return true;
}

const hashingPrime = 26;
const largerPrime = 1e9 + 7;

/**
 * Computes hash in forward order (left to right)
 * hash("abc") = a*26^2 + b*26^1 + c*26^0
 * @param {string} s
 * @returns {number} - string hash representation
 */
function hash(s) {
  let result = 0;

  for (let i = 0; i < s.length; i++) {
    const charCode = s.charCodeAt(i) - 96;
    result = (result * hashingPrime + charCode) % largerPrime;
  }

  return result;
}

/**
 * Calculates the new hash value applying the rolling hash technique
 * The new hash will represent the old string, without the first letter, and with the new letter at end
 * Standard formula: newHash = ((oldHash - oldChar * base^(L-1)) * base + newChar) % mod
 * To handle negative values correctly with modulus: add mod before taking modulus
 *
 * @param {number} oldHash - current hash value
 * @param {string} oldFirstLetter - character being removed (leftmost)
 * @param {string} newLetter - character being added (rightmost)
 * @param {number} power - precomputed value of base^(size-1) for efficiency
 * @returns {number} - new hash value
 */
function rollHash(oldHash, oldFirstLetter, newLetter, power) {
  const oldCharCode = oldFirstLetter.charCodeAt(0) - 96;
  const newCharCode = newLetter.charCodeAt(0) - 96;

  // Remove leftmost character's contribution, handle negative with modulus
  // Formula: ((oldHash - oldChar * power + mod) % mod) * base + newChar
  let newHash =
    (oldHash + largerPrime - ((oldCharCode * power) % largerPrime)) %
    largerPrime;
  newHash = (newHash * hashingPrime + newCharCode) % largerPrime;

  return newHash;
}

//
// test("banana");
// test("abacateacate");
// test(
//   "pmyiaxmicpmvqywlkisfzzutlxxjipitwcfxgqqfnxizowkqfmzsvkxryknasyvthozahbmapwqocupxcktmmtddxgatzftamrsvtddjpbnrojcqonmzxmknashplmykdbadiiccdkbyyzifqxvqfwgwihxgnrhqlmqprnjawuzcotutbkgnykuuwtzzzppmoyfmplhpznpnlwwbndekakpsmehzmbcfoyudgwsvehzgsfwqdkihiiwxfskicrbmoevxvpmmymihlkmgnuyohcofzfkehccwxezxypnnvqzrilr"
// );

test(
  "okmzpmxzwjbfssktjtebhhxfphcxefhonkncnrumgduoaeltjvwqwydpdsrbxsgmcdxrthilniqxkqzuuqzqhlccmqcmccfqddncchadnthtxjruvwsmazlzhijygmtabbzelslebyrfpyyvcwnaiqkkzlyillxmkfggyfwgzhhvyzfvnltjfxskdarvugagmnrzomkhldgqtqnghsddgrjmuhpgkfcjkkkaywkzsikptkrvbnvuyamegwempuwfpaypmuhhpuqrufsgpiojhblbihbrpwxdxzolgqmzoyeblpvvrnbnsdnonhpmbrqissifpdavvscezqzclvukfgmrmbmmwvzfpxcgecyxneipexrzqgfwzdqeeqrugeiupukpveufmnceetilfsqjprcygitjefwgcvqlsxrasvxkifeasofcdvhvrpmxvjevupqtgqfgkqjmhtkyfsjkrdczmnettzdxcqexenpxbsharuapjmdvmfygeytyqfcqigrovhzbxqxidjzxfbrlpjxibtbndgubwgihdzwoywqxegvxvdgaoarlauurxpwmxqjkidwmfuuhcqtljsvruinflvkyiiuwiiveplnxlviszwkjrvyxijqrulchzkerbdyrdhecyhscuojbecgokythwwdulgnfwvdptzdvgamoublzxdxsogqpunbtoixfnkgbdrgknvcydmphuaxqpsofmylyijpzhbqsxryqusjnqfikvoikwthrmdwrwqzrdmlugfglmlngjhpspvnfddqsvrajvielokmzpmxzwjbfssktjtebhhxfphcxefhonkncnrumgduoaeltjvwqwydpdsrbxsgmcdxrthilniqxkqzuuqzqhlccmqcmccfqddncchadnthtxjruvwsmazlzhijygmtabbzelslebyrfpyyvcwnaiqkkzlyillxmkfggyfwgzhhvyzfvnltjfxskdarvugagmnrzomkhldgqtqnghsddgrjmuhpgkfcjkkkaywkzsikptkrvbnvuyamegwempuwfpaypmuhhpuqrufsgpiojhblbihbrpwxdxzolgqmzoyeblpvvrnbnsdnonhpmbrqissifpdavvscezqzclvukfgmrmbmmwvzfpxcgecyxneipexrzqgfwzdqeeqrugeiupukpveufmnceetilfsqjprcygitjefwgcvqlsxrasvxkifeasofcdvhvrpmxvjevupqtgqfgkqjmhtkyfsjkrdczmnettzdxcqexenpxbsharuapjmdvmfygeytyqfcqigrovhzbxqxidjzxfbrlpjxibtbndgubwgihdzwoywqxegvxvdgaoarlauurxpwmxqjkidwmfuuhcqtljsvruinflvkyiiuwiiveplnxlviszwkjrvyxijqrulchzkerbdyrdhecyhscuojbecgokythwwdulgnfwvdptzdvgamoublzxdxsogqpunbtoixfnkgbdrgknvcydmphuaxqpsofmylyijpzhbqsxryqusjnqfikvoikwthrmdwrwqzrdmlugfglmlngjhpspvnfddqsvrajviel"
);

function test(s) {
  console.log("\n\n[Test] ", { s, result: longestDupSubstring(s) });
}

function log(...messages) {
  console.log(...messages);
}
