# Problem Statement

[Problem link](https://leetcode.com/problems/minimum-window-substring/description/)

Given two strings `s` and `t`, return the **minimum window substring** of `s` such that every character in `t` (including duplicates) is included in the window. If there is no such substring, return the empty string `""`.

The testcases will be generated such that the answer is **unique**.

A **substring** is a contiguous sequence of characters within the string.

Example 1:

Input: s = "ADOBECODEBANC", t = "ABC"

Output: "BANC"

Explanation: The minimum window substring "BANC" includes 'A', 'B', and 'C' from string t.

Example 2:

Input: s = "a", t = "a"

Output: "a"

Explanation: The entire string s is the minimum window.

Example 3:

Input: s = "a", t = "aa"

Output: ""

Explanation: Both 'a's from t must be included in the window. Since the largest window of s only has one 'a', return empty string.

Constraints:

- 1 <= s.length, t.length <= 10⁵
- s and t consist of uppercase and lowercase English letters.


# Analysis

## Problem Analysis

### Key Requirements

- Find the **minimum window substring** in `s` that contains **all characters** from `t`
- Characters in `t` can have **duplicates**, and all occurrences must be included in the window
- Return the **shortest** such substring
- Return empty string `""` if no valid window exists
- The substring must be **contiguous** (not a subsequence)

### Character Frequency Requirements

- If `t = "AAB"`, the window must contain at least 2 'A's and 1 'B'
- Simply checking if all unique characters are present is **not sufficient**
- We need to track **character frequencies**, not just character presence

### Problem Characteristics

- **Sliding Window Pattern**: We need to find a contiguous substring with a specific property
- **Hash Table Requirement**: Need to track character frequencies in both `t` and the current window
- **Optimization Goal**: Minimize window size while maintaining the validity condition
- **Two Pointers**: Use left and right pointers to expand and contract the window

### Mathematical Properties

- **Monotonicity**: If window `[left, right]` is valid, then any window `[left, right + k]` is also valid (expanding right)
- **Contractibility**: If window `[left, right]` is valid, we can try to shrink it from the left to find a shorter valid window
- **Character Counting**: For a window to be valid, for each character `c` in `t`, `count(c in window) >= count(c in t)`

## Possible Solutions

### Approach 1: Brute Force (O(n² × m))

**Algorithm:**
- For each possible starting index `i` in `s`:
  - For each possible ending index `j` (where `j >= i`):
    - Extract substring `s[i...j]`
    - Check if it contains all characters from `t` with required frequencies
    - Track the minimum valid substring seen

**Complexity:**
- Time: O(n² × m) - O(n²) substrings × O(m) to check each substring against `t`
- Space: O(m) - for storing character frequencies of `t`

**Limitation:** Too slow for large inputs (n and m up to 10⁵), would result in O(10¹⁵) operations in worst case.

### Approach 2: Sliding Window with Hash Table (O(n + m))

**Key Insight:** Use a sliding window technique with hash tables to efficiently track character frequencies and determine when the window is valid.

**Algorithm:**
1. **Preprocessing:**
   - Create a frequency map `required` for characters in `t`: count how many times each character appears in `t`
   - Track `requiredCount` = number of unique characters in `t`
   - Initialize `windowCount` = 0 (number of unique characters in current window that satisfy the requirement)

2. **Sliding Window:**
   - Use two pointers: `left = 0` and `right = 0`
   - Expand window by moving `right` pointer:
     - Add `s[right]` to window frequency map
     - If `s[right]` is in `required` and window frequency equals required frequency, increment `windowCount`
     - When `windowCount == requiredCount`, we have a valid window
   
   - Contract window by moving `left` pointer:
     - While window is still valid (`windowCount == requiredCount`):
       - Update minimum window if current window is shorter
       - Remove `s[left]` from window frequency map
       - If `s[left]` is in `required` and window frequency becomes less than required, decrement `windowCount`
       - Move `left` forward

3. **Result:**
   - Return the minimum valid substring found, or `""` if none exists

**Example Walkthrough (s = "ADOBECODEBANC", t = "ABC"):**
- `required = {A: 1, B: 1, C: 1}`, `requiredCount = 3`
- Expand to "ADOBEC": window has A, B, C → valid, windowCount = 3
- Try to contract: "ADOBEC" → "DOBEC" (removed A, invalid) → "OBEC" → "BEC" → "EC" (invalid)
- Expand again: "ECODEBA" → "ECODEBAN" → "ECODEBANC": has A, B, C → valid
- Contract: "CODEBANC" → "ODEBANC" → "DEBANC" → "EBANC" → "BANC": valid and minimal

**Complexity:**
- Time: O(n + m) - O(m) to build `required` map + O(n) for sliding window (each character visited at most twice)
- Space: O(m) - for the hash tables storing character frequencies

**Advantages:**
- Optimal time complexity
- Efficient and intuitive approach
- Classic sliding window pattern

### Approach 3: Optimized Sliding Window with Filtered String (O(n + m))

**Key Insight:** Filter out characters from `s` that are not in `t` to reduce the search space.

**Algorithm:**
1. Create filtered list of indices and characters: `filtered = [(i, s[i]) for i in range(len(s)) if s[i] in t]`
2. Apply sliding window technique on the filtered list
3. Use original indices to construct the substring

**Why it helps:**
- Reduces the number of positions to check
- Especially beneficial when `s` contains many characters not in `t`
- Still O(n) in worst case, but can be faster in practice

**Complexity:**
- Time: O(n + m) - same asymptotic complexity, but may be faster in practice
- Space: O(n + m) - for the filtered list and hash tables

**When to use:**
- When `s` is much longer than `t` and contains many irrelevant characters
- May not always be faster due to overhead of creating filtered list

## Comparison of Approaches

| Approach | Time Complexity | Space Complexity | Best For |
|----------|----------------|------------------|----------|
| Brute Force | O(n² × m) | O(m) | Understanding the problem |
| Sliding Window + Hash Table | O(n + m) | O(m) | **Optimal solution** |
| Filtered Sliding Window | O(n + m) | O(n + m) | Cases with many irrelevant characters |

**Recommended Solution:** Approach 2 (Sliding Window with Hash Table) is the optimal solution, achieving O(n + m) time complexity with O(m) space. It's the classic approach for this type of problem and demonstrates the sliding window technique with character frequency tracking.


# Solutions Analysis

## Solution 1: Bitwise Approach (`program.js`)

### Strategy
This solution attempts to use bitwise operations to track character presence. It converts both `t` and the current window substring to bit masks, then uses bitwise AND to check if all required characters are present.

### Key Components

```1:85:contents/algorithms/leet-code/76-minimum-window-substring/program.js
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
```

### Strengths
- **Creative approach**: Uses bitwise operations, which is an interesting optimization idea
- **Correct sliding window structure**: The two-pointer approach is correctly implemented
- **Efficient character mapping**: Maps characters to bit positions efficiently

### Critical Flaws

1. **Doesn't handle character frequencies**: The bitwise approach only tracks character **presence**, not **count**. This is the fundamental flaw.
   - Example: `t = "aa"` requires 2 'a's, but `convertToBits("a")` and `convertToBits("aa")` produce the same bit mask
   - Fails on test case `s = "a", t = "aa"` - should return `""` but will incorrectly find a match

2. **Inefficient substring extraction**: Uses `substring(left, right + 1)` inside the loop, which creates new strings repeatedly - O(n) operation each time

3. **Minor code quality**: In `convertToBits`, the variable is named `char` (which is actually a string in JavaScript), though the code works correctly

### Why It Fails
The problem explicitly requires handling **duplicates** in `t`. A bitmask can only tell you if a character exists, not how many times. The comment in the code acknowledges this: *"Works, but not for all cases. Some cases, the mask string has repetition of chars"*

### Time Complexity
- **Intended**: O(n²) due to substring creation in nested loops
- **Actual**: Could be even worse due to the do-while loop structure

### Space Complexity
- O(1) for the bit masks (just two integers)

---

## Solution 2: Frequency-Based Hash Table (`program2.js`)

### Strategy
This solution correctly implements the sliding window approach using frequency tracking. It uses a character-indexed array (hash table) to track required frequencies and remaining characters needed.

### Key Components

```1:110:contents/algorithms/leet-code/76-minimum-window-substring/program2.js
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
```

### Strengths

1. **Correctly handles character frequencies**: Uses a hash table (character-indexed array) to track required counts
2. **Tracks remaining characters**: Uses `remainingChars` counter to efficiently determine when window is valid
3. **Proper sliding window**: Correctly expands with `right` pointer and contracts with `left` pointer
4. **Handles overstock**: When a character appears more times than needed (lines 39-45), it tracks negative counts but doesn't affect `remainingChars`

### Key Implementation Details

1. **`maskHashTable`**: Tracks remaining required counts for each character (decremented as characters are found)
2. **`originalTable`**: Stores the original required counts (used to determine if a character is relevant)
3. **`remainingChars`**: Counts total characters still needed across all character types
4. **Character code mapping**: Uses `charCodeAt(0) - 65` to map A-Z (0-25) and a-z (32-57) to array indices

### Logic Flow

1. **Expand window** (`right` pointer):
   - When adding `s[right]`, if it's a required character and still needed (`maskHashTable[code] > 0`), decrement both the hash table and `remainingChars`
   - If it's a required character but already overstocked (`maskHashTable[code] <= 0`), just decrement the hash table (tracking excess)

2. **Check validity**: Window is valid when `remainingChars === 0`

3. **Contract window** (`left` pointer):
   - When removing `s[left]`, if it's a required character:
     - If current count is non-negative (`>= 0`), increment `remainingChars` (we now need one more)
     - Always increment the hash table count
     - Move `left` forward

### Potential Improvements

1. **Avoid substring creation in loop**: Line 62 creates a new substring every time. Could track indices instead and create substring only once at the end
2. **Cleaner overstock handling**: The else block (lines 39-45) could be simplified - the logic handles it but could be more explicit
3. **Typo**: `currrentChar` should be `currentChar` (minor)

### Time Complexity
- **O(n + m)**: 
  - O(m) to build `originalTable` and `maskHashTable`
  - O(n) for the sliding window (each character visited at most twice)

### Space Complexity
- **O(1)**: The hash table is fixed-size (58 elements for A-Z and a-z), independent of input size
- Plus O(1) for variables

---

## Comparison Summary

| Aspect | Solution 1 (Bitwise) | Solution 2 (Hash Table) |
|--------|---------------------|------------------------|
| **Correctness** | ❌ Fails on duplicate characters | ✅ Handles all cases correctly |
| **Time Complexity** | O(n²) or worse | O(n + m) |
| **Space Complexity** | O(1) | O(1) - fixed size array |
| **Conceptual Clarity** | Creative but flawed | Standard, well-understood approach |
| **Production Ready** | ❌ No | ✅ Yes (with minor improvements) |

## Key Learnings

1. **Character frequency matters**: This problem requires counting occurrences, not just checking existence. Bitmasks are insufficient.

2. **Sliding window pattern**: Both solutions correctly identify this as a sliding window problem, demonstrating good pattern recognition.

3. **Efficient tracking**: Solution 2's use of `remainingChars` counter is a clever optimization to avoid checking all character frequencies on each validity check.

4. **Edge case handling**: Solution 1 fails on the edge case where `t` contains duplicates, highlighting the importance of thorough testing with frequency requirements.

**Conclusion**: Solution 2 (`program2.js`) is the correct, production-ready solution that properly implements the sliding window technique with frequency tracking. Solution 1 demonstrates creative thinking but fundamentally misunderstands the problem's requirements regarding character frequencies.


# Topics

- String
- Hash Table
- Sliding Window ⭐ (primary approach)
- Two Pointers

