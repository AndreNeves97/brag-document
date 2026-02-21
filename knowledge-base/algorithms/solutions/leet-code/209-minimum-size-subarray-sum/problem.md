# Problem Statement

[Problem link](https://leetcode.com/problems/minimum-size-subarray-sum/description/?envType=problem-list-v2&envId=prefix-sum)

Given an array of positive integers `nums` and a positive integer `target`, return the minimal length of a contiguous subarray `[nums[l], nums[l+1], ..., nums[r-1], nums[r]]` of which the sum is greater than or equal to `target`. If there is no such subarray, return `0` instead.

Example 1:

Input: target = 7, nums = [2,3,1,2,4,3]

Output: 2

Explanation: The subarray [4,3] has the minimal length under the problem constraint.

Example 2:

Input: target = 4, nums = [1,4,4]

Output: 1

Example 3:

Input: target = 11, nums = [1,1,1,1,1,1,1,1]

Output: 0

Constraints:

- 1 <= target <= 10⁹
- 1 <= nums.length <= 10⁵
- 1 <= nums[i] <= 10⁴


# Analysis

## Problem Analysis

### Key Requirements

- Find the **minimal length** of a contiguous subarray
- The subarray sum must be **greater than or equal to** the target
- All integers in the array are **positive** (this is crucial for certain approaches)
- Return `0` if no such subarray exists

### Mathematical Properties

Since all elements are positive:
- **Monotonicity**: If a subarray starting at index `i` with length `L` has sum >= target, then any subarray starting at `i` with length > `L` will also have sum >= target
- **Prefix Sum Property**: For a subarray from index `i` to `j`, the sum can be calculated as `prefixSum[j+1] - prefixSum[i]`
- **Sliding Window Validity**: When expanding a window, the sum can only increase. When shrinking a window, the sum can only decrease.

### Problem Characteristics

- **Contiguous subarray**: We're looking for consecutive elements, not any subset
- **Minimal length**: Among all valid subarrays, we want the shortest one
- **Positive integers**: This property enables efficient sliding window and binary search approaches

## Possible Solutions

### Approach 1: Brute Force (O(n²))

**Algorithm:**
- For each possible starting index `i`:
  - For each possible ending index `j` (where `j >= i`):
    - Calculate the sum of subarray `nums[i...j]`
    - If sum >= target, track the minimal length seen so far

**Complexity:**
- Time: O(n²) - O(n) starting positions × O(n) ending positions
- Space: O(1)

**Limitation:** Too slow for large inputs (n up to 10⁵), would result in O(10¹⁰) operations.

### Approach 2: Sliding Window / Two Pointers (O(n))

**Key Insight:** Since all elements are positive, we can use a dynamic window that expands and contracts efficiently.

**Algorithm:**
- Maintain two pointers: `left` (start of window) and `right` (end of window)
- Initialize `left = 0`, `sum = 0`, `minLength = infinity`
- Expand the window by moving `right` pointer:
  - Add `nums[right]` to the current sum
  - While `sum >= target`:
    - Update `minLength = min(minLength, right - left + 1)`
    - Shrink the window by moving `left` pointer forward and subtracting `nums[left]` from sum
- Return `minLength` if found, otherwise `0`

**Why it works:**
- When `sum >= target`, we've found a valid subarray. Since all elements are positive, we can safely shrink from the left to find a potentially shorter valid subarray.
- Once we shrink past a valid point, we expand again from the right.
- Each element is visited at most twice (once by `right`, once by `left`), giving O(n) time complexity.

**Complexity:**
- Time: O(n) - each element is visited at most twice
- Space: O(1) - only using a few variables

**Advantages:**
- Optimal time complexity
- Constant space complexity
- Intuitive and easy to implement

### Approach 3: Binary Search with Prefix Sum (O(n log n))

**Key Insight:** For each starting position, we can use binary search to find the minimal ending position where the subarray sum >= target.

**Algorithm:**
- Build a prefix sum array `prefixSum` where `prefixSum[i] = sum of nums[0...i-1]`
- For each starting index `i`:
  - We need to find the smallest `j >= i` such that `prefixSum[j+1] - prefixSum[i] >= target`
  - This is equivalent to finding the smallest `j` where `prefixSum[j+1] >= target + prefixSum[i]`
  - Use binary search on the prefix sum array to find this `j`
  - If found, update `minLength = min(minLength, j - i + 1)`

**Why it works:**
- Prefix sum allows O(1) calculation of any subarray sum
- Since prefix sum is monotonically increasing (all elements positive), binary search is valid
- For each starting position, binary search finds the minimal valid ending position in O(log n) time

**Complexity:**
- Time: O(n log n) - O(n) starting positions × O(log n) binary search per position
- Space: O(n) - for the prefix sum array

**Advantages:**
- Works even if elements weren't all positive (though less efficient)
- Demonstrates binary search technique on prefix sums
- Good for understanding prefix sum applications

**When to use:**
- When you need to solve similar problems where elements might not be positive
- When you want to practice binary search on prefix sums

### Approach 4: Prefix Sum with Linear Search (O(n²))

**Algorithm:**
- Build prefix sum array
- For each starting index `i`:
  - Linearly search for the first ending index `j` where `prefixSum[j+1] - prefixSum[i] >= target`
  - Update minimal length if found

**Complexity:**
- Time: O(n²) - similar to brute force but with O(1) sum calculation
- Space: O(n) - for prefix sum array

**Limitation:** Still O(n²) time, not optimal for large inputs.

## Comparison of Approaches

| Approach | Time Complexity | Space Complexity | Best For |
|----------|----------------|------------------|----------|
| Brute Force | O(n²) | O(1) | Understanding the problem |
| Sliding Window | O(n) | O(1) | **Optimal solution** |
| Binary Search + Prefix Sum | O(n log n) | O(n) | Learning binary search techniques |
| Prefix Sum + Linear | O(n²) | O(n) | Not recommended |

**Recommended Solution:** Approach 2 (Sliding Window) is the optimal solution for this problem, taking advantage of the positive integers constraint to achieve O(n) time and O(1) space.


# Topics

- Array
- Sliding Window
- Two Pointers
- Prefix Sum
- Binary Search (alternative approach)
