# Problem Statement

[Problem link](https://leetcode.com/problems/contains-duplicate-iii/description/?envType=problem-list-v2&envId=sliding-window)

You are given an integer array `nums` and two integers `indexDiff` and `valueDiff`.

Find a pair of indices `(i, j)` such that:
- `i != j`,
- `abs(i - j) <= indexDiff`, and
- `abs(nums[i] - nums[j]) <= valueDiff`.

Return `true` if such a pair exists, or `false` otherwise.

Example 1:

Input: `nums = [1,2,3,1]`, `indexDiff = 3`, `valueDiff = 0`

Output: `true`

Explanation: We can choose the indices `i = 0` and `j = 3`. We satisfy the three conditions:
- `i != j`, `0 != 3` is true.
- `abs(i - j) <= indexDiff`, `abs(0 - 3) <= 3` is true.
- `abs(nums[i] - nums[j]) <= valueDiff`, `abs(1 - 1) <= 0` is true.

Example 2:

Input: `nums = [1,0,1,1]`, `indexDiff = 1`, `valueDiff = 2`

Output: `true`

Explanation: We can choose the indices `i = 2` and `j = 3`. We satisfy the three conditions:
- `i != j`, `2 != 3` is true.
- `abs(i - j) <= indexDiff`, `abs(2 - 3) <= 1` is true.
- `abs(nums[i] - nums[j]) <= valueDiff`, `abs(1 - 1) <= 2` is true.

Example 3:

Input: `nums = [1,5,9,1,5,9]`, `indexDiff = 2`, `valueDiff = 3`

Output: `false`

Explanation: After trying all the possible pairs `(i, j)`, we cannot satisfy the three conditions, so we return `false`.

Constraints:

- `2 <= nums.length <= 10^5`
- `-10^9 <= nums[i] <= 10^9`
- `0 <= indexDiff <= 10^5`
- `0 <= valueDiff <= 10^9`


# Analysis

## Problem Analysis

### Key Requirements

- Find two **distinct indices** `i` and `j` in the array
- The **index difference** must be at most `indexDiff`: `abs(i - j) <= indexDiff`
- The **value difference** must be at most `valueDiff`: `abs(nums[i] - nums[j]) <= valueDiff`
- Return `true` if such a pair exists, `false` otherwise

### Problem Characteristics

- **Two Constraints**: We need to satisfy both index proximity and value proximity simultaneously
- **Sliding Window Pattern**: The index constraint (`abs(i - j) <= indexDiff`) suggests maintaining a window of size `indexDiff + 1`
- **Value Range Query**: For each element, we need to check if there's another element within `valueDiff` in the current window
- **Large Value Range**: Values can be as large as `10^9`, making direct indexing difficult

### Mathematical Properties

- **Index Constraint**: If we're at index `i`, we only need to check indices in the range `[i - indexDiff, i + indexDiff]` (but `i != j`)
- **Value Constraint**: For a value `nums[i]`, we need to find a value in the range `[nums[i] - valueDiff, nums[i] + valueDiff]`
- **Combined Constraint**: We need to find a value in the range `[nums[i] - valueDiff, nums[i] + valueDiff]` that exists at an index in `[i - indexDiff, i + indexDiff]`

### Key Insight

The challenge is efficiently checking if there exists a value within `valueDiff` of the current value, but only among indices within `indexDiff` of the current index. This requires maintaining a data structure that:
1. Supports fast range queries (finding values in a range)
2. Can be updated as we slide the window (add/remove elements)
3. Works efficiently with large value ranges

## Possible Solutions

### Approach 1: Brute Force (O(n × indexDiff))

**Algorithm:**
- For each index `i`:
  - Check all indices `j` in the range `[max(0, i - indexDiff), min(n-1, i + indexDiff)]` where `j != i`
  - If `abs(nums[i] - nums[j]) <= valueDiff`, return `true`
- Return `false` if no pair is found

**Complexity:**
- Time: O(n × indexDiff) - For each of n elements, check up to `2 × indexDiff` other elements
- Space: O(1) - No extra space needed

**Limitation:** With `indexDiff` up to `10^5` and `n` up to `10^5`, this could be O(10^10) operations, which is too slow.

### Approach 2: Sliding Window with Linear Search (O(n × indexDiff))

**Algorithm:**
- Maintain a sliding window of size `indexDiff + 1` using two pointers
- For each new element:
  - Check all elements in the current window to see if any value is within `valueDiff`
  - If found, return `true`
  - Remove the element that falls out of the window
  - Add the new element

**Complexity:**
- Time: O(n × indexDiff) - Same as brute force, but more organized
- Space: O(indexDiff) - To store the window

**Limitation:** Still O(n × indexDiff), which may be too slow for large inputs.

### Approach 3: Sliding Window with Sorted List / TreeSet (O(n × log(indexDiff)))

**Key Insight:** Use a sorted data structure to maintain the window, allowing binary search for range queries.

**Algorithm:**
1. **Initialize:**
   - Use a sorted list (or TreeSet) to maintain values in the current window
   - Use two pointers: `left = 0` and `right = 0`

2. **Process each element:**
   - While `right < n`:
     - If window size exceeds `indexDiff + 1`, remove `nums[left]` from the sorted list and increment `left`
     - For current value `nums[right]`, search for values in range `[nums[right] - valueDiff, nums[right] + valueDiff]` in the sorted list
     - If found, return `true`
     - Add `nums[right]` to the sorted list
     - Increment `right`
   - Return `false`

**Why it works:**
- The sorted list maintains all values in the current window in sorted order
- Binary search allows us to quickly find if any value in the range `[nums[i] - valueDiff, nums[i] + valueDiff]` exists
- The window size is maintained at `indexDiff + 1` to satisfy the index constraint

**Complexity:**
- Time: O(n × log(indexDiff)) - For each element, we do O(log(indexDiff)) operations (insert, delete, range query)
- Space: O(indexDiff) - To store the sorted list

**Advantages:**
- Efficient for moderate `indexDiff` values
- Clear and intuitive approach
- Works well when `indexDiff` is not too large

**Limitation:** When `indexDiff` is large (up to `10^5`), the log factor helps but may still be borderline.

### Approach 4: Sliding Window with Bucket Sort (O(n))

**Key Insight:** Divide the number line into buckets of size `valueDiff + 1`. If two numbers are in the same bucket or adjacent buckets, they might satisfy the value constraint.

**Algorithm:**
1. **Bucket Calculation:**
   - For a value `num`, its bucket ID is `Math.floor(num / (valueDiff + 1))`
   - Handle negative numbers: `bucketId = Math.floor((num + 1) / (valueDiff + 1)) - 1` for negative numbers, or use a simpler approach

2. **Sliding Window with Buckets:**
   - Maintain a map/dictionary: `bucketMap[bucketId] = value`
   - For each element `nums[i]`:
     - Calculate its bucket ID
     - If window size exceeds `indexDiff + 1`, remove the element at `i - indexDiff - 1` from its bucket
     - Check if the current bucket or adjacent buckets contain a value within `valueDiff`
     - If found, return `true`
     - Add `nums[i]` to its bucket
   - Return `false`

**Why it works:**
- If two numbers are in the same bucket, their difference is at most `valueDiff`
- If two numbers are in adjacent buckets, we need to verify the actual difference (it might be slightly more than `valueDiff`)
- The sliding window ensures we only check indices within `indexDiff`

**Complexity:**
- Time: O(n) - Each element is processed once, and bucket operations are O(1) on average
- Space: O(min(n, indexDiff)) - To store the buckets (at most `indexDiff + 1` elements)

**Advantages:**
- Optimal time complexity O(n)
- Efficient for large inputs
- Elegant use of bucketization

**Challenges:**
- Need to handle negative numbers correctly in bucket calculation
- Need to verify adjacent buckets (not just same bucket) to ensure the value difference is actually <= `valueDiff`

### Approach 5: Sliding Window with Ordered Set (O(n × log(indexDiff)))

**Key Insight:** Use a balanced BST or ordered set (like TreeSet in Java, sortedcontainers in Python) to maintain the window and perform range queries efficiently.

**Algorithm:**
- Similar to Approach 3, but using a more efficient ordered set data structure
- The ordered set supports:
  - Insertion: O(log n)
  - Deletion: O(log n)
  - Range queries: O(log n) to find the first element >= lower bound

**Complexity:**
- Time: O(n × log(indexDiff))
- Space: O(indexDiff)

**Advantages:**
- Clean implementation if ordered set is available
- Good balance between complexity and implementation difficulty

## Comparison of Approaches

| Approach | Time Complexity | Space Complexity | Best For |
|----------|----------------|------------------|----------|
| Brute Force | O(n × indexDiff) | O(1) | Understanding the problem |
| Sliding Window + Linear Search | O(n × indexDiff) | O(indexDiff) | Small indexDiff |
| Sliding Window + Sorted List | O(n × log(indexDiff)) | O(indexDiff) | Moderate indexDiff, clear implementation |
| Sliding Window + Bucket Sort | O(n) | O(indexDiff) | **Optimal solution**, large inputs |
| Sliding Window + Ordered Set | O(n × log(indexDiff)) | O(indexDiff) | When ordered set is available |

**Recommended Solution:** Approach 4 (Sliding Window with Bucket Sort) is the optimal solution, providing O(n) time complexity. However, Approach 3 (Sorted List) is also practical and easier to implement correctly, especially when dealing with edge cases.

## My Solutions

### Solution 1: Bucket Sort with Min Normalization (85ms)

**Key Strategy:** Use `findMin` to normalize all values to non-negative numbers before bucket calculation.

**Implementation Details:**
- Precompute the minimum value in the array: `O(n)`
- Normalize bucket ID calculation: `normalizedValue = min >= 0 ? value : value - min`
- This ensures all bucket IDs are non-negative, simplifying the bucket calculation
- Store one value per bucket (not a Set) for optimal performance
- Check current bucket and adjacent buckets (id-1, id+1) for potential matches

**Bucket ID Calculation:**
```javascript
const getBucketId = (value) => {
  const normalizedValue = min >= 0 ? value : value - min;
  return Math.floor(normalizedValue / (valueDiff + 1));
};
```

**Advantages:**
- Simple normalization strategy: shift all values by the minimum
- Easy to understand and implement
- Handles negative numbers correctly without complex conditional logic
- Good performance: 85ms runtime

**Trade-offs:**
- Requires an initial `O(n)` pass to find the minimum
- Slightly more memory overhead (storing the min value)

**Performance:** 85ms on LeetCode

### Solution 2: Bucket Sort with Direct Negative Handling (AI Solution)

**Key Strategy:** Handle negative numbers directly in the bucket ID calculation without normalization.

**Implementation Details:**
- No preprocessing needed
- Direct bucket calculation with conditional logic for negative numbers
- Uses `Math.floor((num + 1) / (valueDiff + 1)) - 1` for negative numbers
- Special case handling for `valueDiff === 0`

**Bucket ID Calculation:**
```javascript
const getBucketId = (num) => {
  if (valueDiff === 0) {
    return num; // Each unique value gets its own bucket
  }
  return num < 0
    ? Math.floor((num + 1) / (valueDiff + 1)) - 1
    : Math.floor(num / (valueDiff + 1));
};
```

**Advantages:**
- No preprocessing step (no `findMin` call)
- More mathematically elegant
- Potentially faster for arrays with no negative numbers

**Trade-offs:**
- More complex conditional logic
- Requires understanding of floor division behavior with negative numbers

**Performance:** Typically faster than Solution 1 due to no preprocessing

### Comparison

| Aspect | Solution 1 (Min Normalization) | Solution 2 (Direct Handling) |
|--------|--------------------------------|------------------------------|
| Preprocessing | O(n) to find min | None |
| Bucket Calculation | Simple normalization | Conditional logic |
| Code Complexity | Lower | Slightly higher |
| Runtime | 85ms | Typically < 100ms |
| Readability | More intuitive | More mathematical |

**Conclusion:** Both solutions are valid implementations of Approach 4. Solution 1 uses a normalization strategy that's easier to understand, while Solution 2 is more mathematically elegant and avoids preprocessing. The choice depends on code clarity preferences and specific performance requirements.


# Topics

- Array
- Sliding Window ⭐
- Sorting
- Bucket Sort
- Ordered Set

