export const runtimeParams = {
  performanceProfiling: false,
  hashingPrime: 26,
  largerPrime: 1e9 + 7,
  logging: false,
};

/**
 * @param {string} s
 * @return {string}
 */
export var longestDupSubstring = function (s) {
  let minLength = 1,
    maxLength = s.length;

  let foundSubstring = "";

  while (minLength <= maxLength) {
    const searchLength = Math.floor((maxLength - minLength) / 2) + minLength;
    const hashesMap = new Map();

    let foundDuplicate = false;

    log("\n");
    log({ minLength, maxLength, searchLength });

    let windowHash;

    for (let left = 0; left < s.length - searchLength + 1; left++) {
      const right = left + searchLength - 1;

      if (!windowHash) {
        const window = s.substring(left, right + 1);
        windowHash = hash(window);
      } else {
        windowHash = rollHash(windowHash, s[left - 1], searchLength, s[right]);
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

let lastComputedExpoent: number | undefined = undefined;
let lastComputedPower: number | undefined = undefined;

export function resetEnvValues() {
  lastComputedExpoent = undefined;
  lastComputedPower = undefined;

  runtimeParams.performanceProfiling = false;
  runtimeParams.hashingPrime = 26;
  runtimeParams.largerPrime = 1e9 + 7;
}

export function primePower(expoent): { value: number; calculations?: number } {
  if (expoent === 0) {
    return { value: 1 };
  }

  if (expoent === 1) {
    return { value: runtimeParams.hashingPrime };
  }

  let calculations = 0;

  if (lastComputedExpoent === undefined || lastComputedExpoent !== expoent) {
    let power = 1;
    let i = 1;

    if (lastComputedExpoent < expoent) {
      i = lastComputedExpoent + 1;
      power = lastComputedPower;
    }

    while (i <= expoent) {
      power = (power * runtimeParams.hashingPrime) % runtimeParams.largerPrime;

      if (runtimeParams.performanceProfiling) {
        calculations++;
      }

      i++;
    }

    lastComputedExpoent = expoent;
    lastComputedPower = power;
  }

  if (runtimeParams.performanceProfiling) {
    return {
      value: lastComputedPower,
      calculations,
    };
  }

  return { value: lastComputedPower };
}

/**
 * Computes hash in forward order (left to right)
 * hash("abc") = a*26^2 + b*26^1 + c*26^0
 *
 * @param {string} s
 * @returns {number} - string hash representation
 */
export function hash(s, shift = 0) {
  let result = 0;

  for (let i = s.length - 1; i >= 0; i--) {
    const charCode = s.charCodeAt(i) - 96;
    result =
      (result + charCode * primePower(shift + s.length - (i + 1)).value) %
      runtimeParams.largerPrime;
  }

  return result;
}

/**
 * Calculates the new hash value appling the rolling hash techinique
 * The new hash will represent the old string, without the first letter, and with the new letter at end
 * Standard formula: newHash = ((oldHash - oldChar * base^(L-1)) * base + newChar) % mod
 * @param {string} newLetter
 */
export function rollHash(oldHash, oldFirstLetter, size, newLetter) {
  const firstLetterHash = hash(oldFirstLetter, size - 1);
  const newLetterHash = hash(newLetter);

  const hashWithoutFirstLetter =
    (oldHash - firstLetterHash + runtimeParams.largerPrime) %
    runtimeParams.largerPrime;

  const shiftedHash =
    (hashWithoutFirstLetter * runtimeParams.hashingPrime) %
    runtimeParams.largerPrime;

  return (shiftedHash + newLetterHash) % runtimeParams.largerPrime;
}

function log(...messages) {
  if (runtimeParams.logging) {
    console.log(...messages);
  }
}
