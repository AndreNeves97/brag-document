/**
 * Search in the text with time complexity O(text.length + searchTerm.length)
 * @param {string} text The Text to search in
 * @param {string} searchTerm
 */
function searchWithRollingHash(text, searchTerm) {
  const searchLength = searchTerm.length;
  const searchHash = hash(searchTerm);

  log({ text, searchTerm, searchHash });

  let windowHash;

  for (let left = 0; left < text.length - searchLength + 1; left++) {
    const right = left + searchLength - 1;

    if (!windowHash) {
      const window = text.substring(left, right + 1);
      windowHash = hash(window);
    } else {
      windowHash = rollHash(
        windowHash,
        text[left - 1],
        searchLength,
        text[right]
      );
    }

    if (windowHash === searchHash) {
      if (disambiguateColision(searchTerm, text.substring(left, right + 1))) {
        return {
          match: true,
          searchTerm,
          before: text.substring(0, left),
          after: text.substring(right + 1),
        };
      }
    }
  }

  return {
    match: false,
  };
}

function disambiguateColision(searchTerm, window) {
  for (let i = 0; i < searchTerm.length; i++) {
    if (searchTerm[i] !== window[i]) {
      return false;
    }
  }

  return true;
}

const hashingPrime = 26;

/**
 *
 * @param {string} s
 * @returns {number} - string hash representation
 */
function hash(s, shift = 0) {
  let result = 0;

  for (let i = 0; i < s.length; i++) {
    const charCode = s.charCodeAt(i) - 96;
    result += charCode * Math.pow(hashingPrime, shift + s.length - (i + 1));
  }

  return result;
}

/**
 * Calculates the new hash value appling the rolling hash techinique
 * The new hash will represent the old string, without the first letter, and with the new letter at end
 * @param {string} newLetter
 */
function rollHash(oldHash, oldFirstLetter, size, newLetter) {
  return (
    (oldHash - hash(oldFirstLetter, size - 1)) * hashingPrime + hash(newLetter)
  );
}

//
test("andre marcelino de souza neves", "souza");

function test(...args) {
  console.log("\n\n[Test] ", { args, result: searchWithRollingHash(...args) });
}

function log(...messages) {
  console.log(...messages);
}
