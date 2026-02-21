# Problem Statement

[Problem link](https://leetcode.com/problems/longest-duplicate-substring/description/?envType=problem-list-v2&envId=sliding-window)

Given a string `s`, consider all **duplicated substrings**: (contiguous) substrings of `s` that occur 2 or more times. A duplicated substring that occurs the most number of times is called a **most duplicated substring**.

If two or more duplicated substrings have the same maximum number of occurrences, return the **longest** one. If two or more duplicated substrings have the same maximum number of occurrences and the same length, return the one with the **smallest starting index**.

Return an empty string if no duplicated substring exists.

Example 1:

Input: s = "banana"

Output: "ana"

Explanation: "ana" appears twice in "banana" (at positions 1 and 3), and it's the longest duplicated substring.

Example 2:

Input: s = "abcd"

Output: ""

Explanation: No duplicated substring exists.

Constraints:

- 2 <= s.length <= 3 * 10⁴
- s consists of lowercase English letters.


# Analysis

## Problem Analysis

### Key Requirements

- Find the **longest** substring that appears **at least twice** in the given string
- If multiple substrings have the same maximum occurrences, return the **longest** one
- If multiple substrings have the same maximum occurrences and same length, return the one with the **smallest starting index**
- Return empty string if no duplicate substring exists
- The substring must be **contiguous** (not a subsequence)

### Problem Characteristics

- **Substring vs Subsequence**: We need contiguous characters that appear multiple times
- **Duplicate Detection**: Need to efficiently find substrings that occur at least twice
- **Optimization Goal**: Maximize the length of the duplicate substring
- **Tie-breaking**: When multiple substrings have same occurrences, prefer longer ones; when same length, prefer earlier starting index

### Mathematical Properties

- **Monotonicity**: If a substring of length `L` has duplicates, then any substring of length `L-1` within it also has duplicates (but we want the longest)
- **Binary Search Applicability**: We can binary search on the length of the substring - if a substring of length `L` has duplicates, we can try longer lengths; if not, we need to try shorter lengths
- **Rolling Hash**: For efficient substring comparison, we can use rolling hash (Rabin-Karp) to compute hash values in O(1) time per position

### Key Insight

The problem can be solved efficiently by combining:
1. **Binary Search** on the substring length to find the maximum length that has duplicates
2. **Rabin-Karp Rolling Hash** to efficiently check if any substring of a given length appears at least twice

## Possible Solutions

### Approach 1: Brute Force (O(n³))

**Algorithm:**
- For each possible substring length `L` from `n-1` down to `1`:
  - For each possible starting position `i`:
    - Extract substring `s[i...i+L-1]`
    - Check if this substring appears again in the string (starting at position `j > i`)
    - If found, return this substring
- Return empty string if no duplicates found

**Complexity:**
- Time: O(n³) - O(n) lengths × O(n) starting positions × O(n) to check for duplicates
- Space: O(n) - for storing substrings

**Limitation:** Too slow for large inputs (n up to 3×10⁴), would result in O(10¹²) operations in worst case.

### Approach 2: Brute Force with Hash Set (O(n²))

**Algorithm:**
- For each possible substring length `L` from `n-1` down to `1`:
  - Use a hash set to store all substrings of length `L`
  - For each starting position `i`:
    - Extract substring `s[i...i+L-1]`
    - If substring already in set, return it (found duplicate)
    - Otherwise, add it to the set
- Return empty string if no duplicates found

**Complexity:**
- Time: O(n²) - O(n) lengths × O(n) substrings per length × O(n) to create substring (or O(1) if using hash)
- Space: O(n²) - storing all substrings of a given length

**Limitation:** Still O(n²) time and O(n²) space, which is too slow and memory-intensive for the constraint (n up to 3×10⁴).

### Approach 3: Binary Search + Hash Set (O(n² log n))

**Key Insight:** Use binary search on the substring length to reduce the search space, then check for duplicates using a hash set.

**Algorithm:**
1. **Binary Search on Length:**
   - `left = 1`, `right = n-1`
   - While `left <= right`:
     - `mid = (left + right) / 2`
     - Check if any substring of length `mid` appears at least twice
     - If yes, try longer lengths (`left = mid + 1`)
     - If no, try shorter lengths (`right = mid - 1`)

2. **Check for Duplicates (for a given length `L`):**
   - Use a hash set to store all substrings of length `L`
   - For each starting position `i` from `0` to `n-L`:
     - Extract substring `s[i...i+L-1]`
     - If substring already in set, return the starting position
     - Otherwise, add it to the set
   - Return -1 if no duplicates found

**Complexity:**
- Time: O(n² log n) - O(log n) binary search iterations × O(n) substrings × O(n) to create each substring
- Space: O(n²) - storing all substrings of a given length in the hash set

**Advantages:**
- Reduces search space using binary search
- Clear and intuitive approach

**Limitation:** Still O(n²) per binary search iteration due to substring creation, which can be slow for large inputs.

### Approach 4: Binary Search + Rabin-Karp Rolling Hash (O(n log n))

**Key Insight:** Use binary search on length combined with Rabin-Karp rolling hash to efficiently check for duplicate substrings without explicitly creating substring objects.

**Algorithm:**
1. **Binary Search on Length:**
   - `left = 1`, `right = n-1`
   - Track the best result found so far
   - While `left <= right`:
     - `mid = (left + right) / 2`
     - Check if any substring of length `mid` appears at least twice using rolling hash
     - If yes, update best result and try longer lengths (`left = mid + 1`)
     - If no, try shorter lengths (`right = mid - 1`)

2. **Rabin-Karp Rolling Hash (for a given length `L`):**
   - Choose a base (e.g., 26 for lowercase letters) and a modulus (e.g., 2³² or a large prime)
   - Compute hash for first substring of length `L`: `s[0...L-1]`
   - Store this hash in a set along with the starting index
   - For each subsequent position `i` from `1` to `n-L`:
     - Update hash using rolling hash formula:
       ```
       newHash = (oldHash * base - s[i-1] * base^L + s[i+L-1]) % modulus
       ```
     - If hash already in set, return the starting index (found duplicate)
     - Otherwise, add hash to set
   - Return -1 if no duplicates found

3. **Handle Hash Collisions:**
   - Since hash collisions are possible, when a hash match is found, verify by comparing the actual substrings
   - Alternatively, store both hash and the substring (or starting index) to verify

**Why Rolling Hash Works:**
- Computing hash for `s[i+1...i+L]` from `s[i...i+L-1]` takes O(1) time
- We can check all substrings of length `L` in O(n) time instead of O(n²)
- Combined with binary search, we get O(n log n) overall complexity

**Complexity:**
- Time: O(n log n) - O(log n) binary search iterations × O(n) to check all substrings of a given length using rolling hash
- Space: O(n) - for storing hash values in the set

**Advantages:**
- Optimal time complexity for this problem
- Efficient substring comparison without creating substring objects
- Scales well for large inputs

**Implementation Details:**
- **Base**: Typically 26 for lowercase English letters (or 256 for all ASCII)
- **Modulus**: Use a large prime or 2³² to reduce collision probability
- **Hash Collision Handling**: When hash matches, verify by comparing actual substrings (rare but necessary for correctness)

### Approach 5: Suffix Array / Suffix Tree (O(n log n) or O(n))

**Key Insight:** Use advanced string data structures like suffix arrays or suffix trees to find longest repeated substring.

**Algorithm:**
- Build a suffix array or suffix tree for the string
- Find the longest common prefix (LCP) between adjacent suffixes
- The maximum LCP value corresponds to the longest duplicate substring

**Complexity:**
- Time: O(n log n) for suffix array construction, or O(n) for suffix tree
- Space: O(n) for the data structure

**Advantages:**
- Very efficient for string problems
- Can find all repeated substrings efficiently

**Limitation:**
- More complex to implement
- Overkill for this specific problem
- Binary Search + Rabin-Karp is simpler and sufficient

## Comparison of Approaches

| Approach | Time Complexity | Space Complexity | Best For |
|----------|----------------|------------------|----------|
| Brute Force (nested loops) | O(n³) | O(1) | Understanding the problem |
| Brute Force with Hash Set | O(n²) | O(n²) | Learning the problem structure |
| Binary Search + Hash Set | O(n² log n) | O(n²) | Intermediate solution |
| Binary Search + Rabin-Karp | O(n log n) | O(n) | **Optimal solution** |
| Suffix Array/Tree | O(n log n) or O(n) | O(n) | Advanced string problems |

**Recommended Solution:** Approach 4 (Binary Search + Rabin-Karp Rolling Hash) is the optimal solution for this problem, providing O(n log n) time complexity with efficient substring comparison using rolling hash.


# Topics

- String
- Binary Search ⭐
- Sliding Window
- Hash Table
- Rolling Hash (Rabin-Karp)

