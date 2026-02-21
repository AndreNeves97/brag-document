# Problem Statement

[Problem link](https://leetcode.com/problems/longest-substring-without-repeating-characters/description/?envType=problem-list-v2&envId=sliding-window)

Given a string `s`, find the length of the longest substring without repeating characters.

Example 1:

Input: s = "abcabcbb"

Output: 3

Explanation: The answer is "abc", with the length of 3.

Example 2:

Input: s = "bbbbb"

Output: 1

Explanation: The answer is "b", with the length of 1.

Example 3:

Input: s = "pwwkew"

Output: 3

Explanation: The answer is "wke", with the length of 3. Notice that the answer must be a substring, "pwke" is a subsequence and not a substring.

Constraints:

- 0 <= s.length <= 5 * 10⁴
- s consists of English letters, digits, symbols and spaces.


# Analysis

## Problem Analysis

### Key Requirements

- Find the **length** of the longest substring (not just the substring itself)
- The substring must have **no repeating characters** (all characters must be unique)
- The substring must be **contiguous** (not a subsequence)
- Return `0` if the string is empty

### Problem Characteristics

- **Substring vs Subsequence**: We need contiguous characters, not any sequence of characters
- **Character Uniqueness**: Each character in the substring must appear exactly once
- **Optimization Goal**: Maximize the length of valid substrings
- **Sliding Window Pattern**: As we expand the window, we need to ensure no duplicates exist

### Mathematical Properties

- **Monotonicity**: If a substring starting at index `i` with length `L` is valid (no duplicates), then any substring within it is also valid, but we want the longest
- **Invalidity Condition**: Once we encounter a duplicate character, we need to shrink the window from the left until the duplicate is removed
- **Character Tracking**: We need to efficiently track which characters are currently in the window

### Key Insight

When we encounter a duplicate character at position `right`, we don't need to restart from `right + 1`. Instead, we can move the left pointer to the position immediately after the last occurrence of that character, since any substring before that position would still contain the duplicate.

## Possible Solutions

### Approach 1: Brute Force (O(n³))

**Algorithm:**
- For each possible starting index `i`:
  - For each possible ending index `j` (where `j >= i`):
    - Check if substring `s[i...j]` contains all unique characters
    - Track the maximum length seen

**Complexity:**
- Time: O(n³) - O(n²) substrings × O(n) to check each substring for duplicates
- Space: O(min(n, m)) - where m is the size of character set, for storing seen characters

**Limitation:** Too slow for large inputs (n up to 5×10⁴), would result in O(10¹²) operations in worst case.

### Approach 2: Brute Force with Set (O(n²))

**Algorithm:**
- For each possible starting index `i`:
  - Use a hash set to track characters seen so far
  - Expand from `i` by moving `j` from `i` to the end:
    - If `s[j]` is already in the set, stop expanding from this starting position
    - Otherwise, add `s[j]` to the set and update the maximum length

**Complexity:**
- Time: O(n²) - O(n) starting positions × O(n) characters checked per position
- Space: O(min(n, m)) - for the hash set

**Limitation:** Still O(n²), which is too slow for the constraint (n up to 5×10⁴).

### Approach 3: Sliding Window with Hash Set (O(n))

**Key Insight:** Use a sliding window technique with a hash set to efficiently track characters in the current window and remove duplicates.

**Algorithm:**
1. **Initialize:**
   - Use two pointers: `left = 0` and `right = 0`
   - Use a hash set `charSet` to store characters in the current window
   - Track `maxLength = 0`

2. **Expand the window:**
   - While `right < s.length`:
     - If `s[right]` is not in `charSet`:
       - Add `s[right]` to `charSet`
       - Update `maxLength = max(maxLength, right - left + 1)`
       - Move `right` forward
     - Else (duplicate found):
       - Remove `s[left]` from `charSet`
       - Move `left` forward
   - Return `maxLength`

**Why it works:**
- We maintain a window `[left, right]` with all unique characters
- When we encounter a duplicate, we shrink from the left until the duplicate is removed
- Each character is visited at most twice (once by `right`, once by `left`), giving O(n) time complexity

**Complexity:**
- Time: O(n) - each character is visited at most twice
- Space: O(min(n, m)) - for the hash set, where m is the size of the character set (typically 128 for ASCII)

**Advantages:**
- Optimal time complexity
- Clear and intuitive logic
- Easy to understand and implement

### Approach 4: Sliding Window with Hash Map (O(n))

**Key Insight:** Instead of using a set, use a hash map to store the last seen index of each character. This allows us to jump the left pointer directly to the correct position.

**Algorithm:**
1. **Initialize:**
   - Use two pointers: `left = 0` and `right = 0`
   - Use a hash map `charIndex` to store the last seen index of each character
   - Track `maxLength = 0`

2. **Expand the window:**
   - While `right < s.length`:
     - If `s[right]` exists in `charIndex` and `charIndex[s[right]] >= left`:
       - Move `left = charIndex[s[right]] + 1` (skip past the duplicate)
     - Update `charIndex[s[right]] = right`
     - Update `maxLength = max(maxLength, right - left + 1)`
     - Move `right` forward
   - Return `maxLength`

**Why it works:**
- When we find a duplicate character, we know exactly where it was last seen
- We can jump `left` directly to the position after the last occurrence, skipping all intermediate positions
- This avoids the need to remove characters one by one from a set

**Complexity:**
- Time: O(n) - each character is visited exactly once
- Space: O(min(n, m)) - for the hash map

**Advantages:**
- Most efficient sliding window approach
- Each character is processed exactly once (not twice like the set approach)
- Cleaner and more direct pointer movement

**When to use:**
- This is the optimal approach for this problem
- Preferred when you need maximum efficiency

## Comparison of Approaches

| Approach | Time Complexity | Space Complexity | Best For |
|----------|----------------|------------------|----------|
| Brute Force (nested loops + check) | O(n³) | O(1) | Understanding the problem |
| Brute Force with Set | O(n²) | O(min(n, m)) | Learning the problem structure |
| Sliding Window with Set | O(n) | O(min(n, m)) | Good balance of clarity and efficiency |
| Sliding Window with Hash Map | O(n) | O(min(n, m)) | **Optimal solution** |

**Recommended Solution:** Approach 4 (Sliding Window with Hash Map) is the optimal solution for this problem, providing O(n) time complexity with each character processed exactly once.


# Solutions Analysis

## Solution: Frequency Map Sliding Window (`program.js`)

### Strategy
This solution implements a sliding window approach using a frequency map (Map) to track character frequencies in the current window. When a duplicate character is encountered, it shrinks the window from the left until the duplicate is removed.

### Key Components

```10:60:contents/algorithms/leet-code/3-longest-substring-without-repeating-characters/program.js
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
```

Helper functions:

```62:89:contents/algorithms/leet-code/3-longest-substring-without-repeating-characters/program.js
function increment(map, key, amount) {
  if (!map.has(key)) {
    map.set(key, amount);
    return;
  }

  const currentValue = map.get(key) || 0;
  map.set(key, currentValue + amount);
}

function getValue(map, key) {
  if (!map.has(key)) {
    return 0;
  }

  return map.get(key);
}
```

### Strengths

1. **Correct implementation**: The sliding window logic correctly handles duplicates by shrinking from the left
2. **Frequency tracking**: Uses a Map to track character frequencies, which provides flexibility (though a Set would suffice for this problem since we only need to check for presence)
3. **Explicit count tracking**: Uses a `count` variable to track the current window size, making the logic clear and readable
4. **Helper functions**: Well-structured with `increment()` and `getValue()` helper functions that make the code more maintainable

### Key Implementation Details

1. **`charsFrequencyInWindow`**: A Map that tracks the frequency of each character currently in the window
2. **`count`**: Tracks the current size of the valid window (all characters have frequency ≤ 1)
3. **Duplicate detection**: When `getValue(charsFrequencyInWindow, currentChar) > 0`, it means the character already exists in the window
4. **Window shrinking**: The inner `while` loop removes characters from the left (`left++`) until the duplicate character is removed from the window

### Logic Flow

1. **Expand window** (`right` pointer):
   - Check if `currentChar` already exists in the window (frequency > 0)
   - If duplicate found:
     - Update `maxLength` with the current `count` (before adding the duplicate)
     - Shrink window from left until the duplicate character is removed
   - Add `currentChar` to the frequency map and increment `count`
   - Move `right` forward

2. **Shrink window** (`left` pointer):
   - Remove characters from the left one by one
   - Decrement their frequencies in the map
   - Decrement `count`
   - Continue until the duplicate character is removed (its frequency becomes 0)

3. **Final result**: Return the maximum between `maxLength` and the final `count` (handles the case where the longest substring extends to the end)

### Comparison to Optimal Approach

This solution is similar to **Approach 3 (Sliding Window with Hash Set)** but uses a Map instead of a Set. Key differences:

| Aspect | This Solution (Frequency Map) | Approach 4 (Index Map - Optimal) |
|--------|-------------------------------|----------------------------------|
| **Data Structure** | Map<char, frequency> | Map<char, lastIndex> |
| **Duplicate Handling** | Shrink window character-by-character | Jump left pointer directly |
| **Character Visits** | Each character visited up to twice | Each character visited exactly once |
| **Time Complexity** | O(n) | O(n) |
| **Space Complexity** | O(min(n, m)) | O(min(n, m)) |

While both have O(n) time complexity, Approach 4 is more efficient because it avoids the inner while loop - it can jump the `left` pointer directly to `charIndex[currentChar] + 1` instead of moving it one position at a time.

### Potential Improvements

1. **Use Set instead of Map**: Since we only need to check if a character exists (frequency > 0), a Set would be simpler and slightly more efficient than a Map with frequency counts

2. **Index-based optimization**: Could use Approach 4's strategy - store last seen index instead of frequency, allowing direct jumps instead of character-by-character shrinking

3. **Simplify helper functions**: The `increment()` and `getValue()` functions are clear but add some overhead; direct Map operations might be slightly faster

### Edge Cases Handled

- ✅ Empty string: Returns 0 (initial `maxLength` is 0)
- ✅ All same characters: Correctly handles (e.g., "bbbbb" → 1)
- ✅ No duplicates: Works correctly (e.g., "abc" → 3)
- ✅ Substring at the end: `Math.max(maxLength, count)` handles this correctly

### Time Complexity
- **O(n)**: Each character is visited by `right` pointer once, and by `left` pointer at most once
- In worst case (all characters unique except last one), each character could be visited twice

### Space Complexity
- **O(min(n, m))**: Where m is the size of the character set (typically 128 for ASCII)
- The Map stores at most m entries (one per unique character)

### Conclusion

This is a **correct and efficient solution** that implements the sliding window pattern properly. While not the most optimal approach (Approach 4 with index-based jumping would be faster), it demonstrates clear logic and correct handling of edge cases. The frequency-based approach, while slightly over-engineered for this problem (a Set would suffice), still achieves O(n) time complexity and is easy to understand and maintain.


# Topics

- String
- Sliding Window ⭐
- Hash Table
- Two Pointers

