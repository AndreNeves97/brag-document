# Problem Statement

[Problem link](https://leetcode.com/problems/maximum-sum-of-3-non-overlapping-subarrays/description/?envType=problem-list-v2&envId=sliding-window)

Given an integer array `nums` and an integer `k`, find three non-overlapping subarrays of length `k` with maximum sum and return the starting indices of these subarrays.

Return the result as a list of indices. If there are multiple answers, return the lexicographically smallest one.

Example 1:

Input: nums = [1,2,1,2,6,7,5,1], k = 2

Output: [0, 3, 5]

Explanation: The subarrays [1, 2], [2, 6], and [7, 5] correspond to the starting indices [0, 3, 5]. The total sum is 1 + 2 + 2 + 6 + 7 + 5 = 23. Although [1, 3, 5] is also a valid answer, [0, 3, 5] is lexicographically smaller.

Example 2:

Input: nums = [1,2,1,2,1,2,1,2,1], k = 2

Output: [0, 2, 4]

Constraints:

- 1 <= nums.length <= 20,000
- 1 <= nums[i] <= 100,000
- 1 <= k <= floor(nums.length / 3)


# Analysis

## Problem Analysis

### Key Requirements

- Find **exactly three** non-overlapping subarrays
- Each subarray has **exactly length k**
- Maximize the **total sum** of all three subarrays
- Return the **starting indices** of the three subarrays
- If multiple solutions exist, return the **lexicographically smallest** one

### Mathematical Properties

- **Non-overlapping constraint**: If one subarray starts at index `i` and has length `k`, the next subarray must start at index `i + k` or later
- **Subarray sum calculation**: For a subarray starting at index `i` with length `k`, the sum is `nums[i] + nums[i+1] + ... + nums[i+k-1]`
- **Lexicographic ordering**: When comparing two solutions `[a1, a2, a3]` and `[b1, b2, b3]`, we compare `a1` vs `b1` first. If equal, compare `a2` vs `b2`, and so on.

### Problem Characteristics

- **Fixed subarray length**: All three subarrays must have the same length `k`
- **Fixed count**: We need exactly three subarrays, not more or less
- **Optimization problem**: We want to maximize the sum, not just find any valid solution
- **Constraint satisfaction**: The three subarrays must be non-overlapping

### Key Insight

Since all subarrays have the same length `k`, we can:
1. Precompute the sum of every possible subarray of length `k` (using prefix sums)
2. For each possible position of the middle subarray, find the best left and right subarrays
3. This reduces the problem from O(n³) to O(n) or O(n²) depending on the approach

## Possible Solutions

### Approach 1: Brute Force (O(n³))

**Algorithm:**
- For each possible starting index `i` of the first subarray:
  - For each possible starting index `j` of the second subarray (where `j >= i + k`):
    - For each possible starting index `l` of the third subarray (where `l >= j + k`):
      - Calculate the sum of all three subarrays
      - Track the maximum sum and the lexicographically smallest indices

**Complexity:**
- Time: O(n³) - O(n) first positions × O(n) second positions × O(n) third positions
- Space: O(1)

**Limitation:** Too slow for large inputs (n up to 20,000), would result in O(8×10¹²) operations.

### Approach 2: Dynamic Programming with Prefix Sums (O(n))

**Key Insight:** Use prefix sums to quickly calculate subarray sums, and use DP to track the best single and double subarray solutions.

**Algorithm:**
1. **Precompute prefix sums:**
   - `prefixSum[i] = sum of nums[0...i-1]`
   - Subarray sum from `i` to `i+k-1` = `prefixSum[i+k] - prefixSum[i]`

2. **Precompute subarray sums:**
   - `subarraySum[i] = sum of subarray starting at index i with length k`
   - This is `prefixSum[i+k] - prefixSum[i]`

3. **Build DP arrays:**
   - `left[i]` = best starting index for a single subarray in range `[0, i]`
   - `right[i]` = best starting index for a single subarray in range `[i, n-k]`
   - For `left[i]`: compare `subarraySum[i]` with `subarraySum[left[i-1]]`, keep the one with larger sum (or lexicographically smaller if equal)
   - For `right[i]`: similar logic but scanning from right to left

4. **Find optimal triple:**
   - For each possible middle subarray starting at index `i` (where `k <= i <= n-2k`):
     - Left subarray: use `left[i-k]` (best subarray ending before the middle one)
     - Right subarray: use `right[i+k]` (best subarray starting after the middle one)
     - Calculate total sum: `subarraySum[left[i-k]] + subarraySum[i] + subarraySum[right[i+k]]`
     - Track the maximum sum and lexicographically smallest indices

**Why it works:**
- By precomputing `left` and `right` arrays, we can find the best left and right subarrays for any middle position in O(1) time
- The `left` array ensures we always have the best (or lexicographically smallest) subarray to the left of any position
- The `right` array ensures we always have the best (or lexicographically smallest) subarray to the right of any position

**Complexity:**
- Time: O(n) - O(n) to build prefix sums + O(n) to build left/right arrays + O(n) to try all middle positions
- Space: O(n) - for prefix sums, subarray sums, and left/right arrays

**Advantages:**
- Optimal time complexity
- Clean and intuitive approach
- Handles lexicographic ordering naturally

### Approach 3: Sliding Window with Two Passes (O(n))

**Key Insight:** Use sliding window technique to efficiently compute subarray sums, then use a two-pass approach to find optimal positions.

**Algorithm:**
1. **First pass - compute subarray sums:**
   - Use sliding window to compute sum of each subarray of length `k`
   - Store in `subarraySum[i]` for starting index `i`

2. **Second pass - find optimal positions:**
   - For each possible middle subarray position:
     - Use precomputed arrays (similar to DP approach) to find best left and right subarrays
     - Track maximum sum

**Complexity:**
- Time: O(n) - similar to DP approach
- Space: O(n) - for storing subarray sums and helper arrays

**Note:** This is essentially the same as Approach 2, just emphasizing the sliding window technique for computing subarray sums.

### Approach 4: Greedy with Three Pointers (O(n²))

**Algorithm:**
- Fix the middle subarray at each possible position
- For each fixed middle position, use two pointers to find the best left and right subarrays
- This requires scanning left and right for each middle position

**Complexity:**
- Time: O(n²) - O(n) middle positions × O(n) to find best left/right
- Space: O(1) or O(n) depending on implementation

**Limitation:** Slower than DP approach, but might be more intuitive for some.

## Comparison of Approaches

| Approach | Time Complexity | Space Complexity | Best For |
|----------|----------------|------------------|----------|
| Brute Force | O(n³) | O(1) | Understanding the problem |
| Dynamic Programming + Prefix Sum | O(n) | O(n) | **Optimal solution** |
| Sliding Window + Two Passes | O(n) | O(n) | Emphasizing sliding window technique |
| Greedy with Three Pointers | O(n²) | O(1) or O(n) | Alternative approach |

**Recommended Solution:** Approach 2 (Dynamic Programming with Prefix Sums) is the optimal solution, achieving O(n) time complexity by precomputing the best left and right subarrays for any given middle position.

### Key Techniques

- **Prefix Sum**: Enables O(1) calculation of any subarray sum
- **Dynamic Programming**: Precomputes optimal solutions for subproblems (best single subarray in left/right ranges)
- **Lexicographic Ordering**: When sums are equal, choose the lexicographically smaller indices


# Topics

- Array
- Dynamic Programming ⭐ (primary approach)
- Prefix Sum
- Sliding Window (for computing subarray sums)

