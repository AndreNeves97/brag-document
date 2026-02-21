/**
 * Approach 4: Sliding Window with Bucket Sort (O(n))
 *
 * Key Insight: Divide the number line into buckets of size (valueDiff + 1).
 * If two numbers are in the same bucket or adjacent buckets, they might satisfy the value constraint.
 *
 * @param {number[]} nums
 * @param {number} indexDiff
 * @param {number} valueDiff
 * @return {boolean}
 */
var containsNearbyAlmostDuplicate = function (nums, indexDiff, valueDiff) {
  // Edge case: if valueDiff < 0, no pair can satisfy the constraint
  if (valueDiff < 0) return false;

  // Map to store buckets: bucketId -> value (we only need to store one value per bucket
  // since if two values are in the same bucket, they satisfy valueDiff constraint)
  const bucketMap = new Map();

  /**
   * Calculate bucket ID for a given value
   * Bucket size is (valueDiff + 1)
   * For negative numbers, we use Math.floor((num + 1) / (valueDiff + 1)) - 1
   * This ensures correct bucketing for negative numbers
   */
  const getBucketId = (num) => {
    if (valueDiff === 0) {
      // If valueDiff is 0, each unique value gets its own bucket
      return num;
    }
    // Handle negative numbers correctly
    return num < 0
      ? Math.floor((num + 1) / (valueDiff + 1)) - 1
      : Math.floor(num / (valueDiff + 1));
  };

  for (let i = 0; i < nums.length; i++) {
    const num = nums[i];
    const bucketId = getBucketId(num);

    // Check if current bucket already has a value (same bucket = within valueDiff)
    if (bucketMap.has(bucketId)) {
      return true;
    }

    // Check left adjacent bucket
    if (bucketMap.has(bucketId - 1)) {
      const adjacentValue = bucketMap.get(bucketId - 1);
      if (Math.abs(num - adjacentValue) <= valueDiff) {
        return true;
      }
    }

    // Check right adjacent bucket
    if (bucketMap.has(bucketId + 1)) {
      const adjacentValue = bucketMap.get(bucketId + 1);
      if (Math.abs(num - adjacentValue) <= valueDiff) {
        return true;
      }
    }

    // Add current number to its bucket
    bucketMap.set(bucketId, num);

    // Maintain sliding window: remove element that's outside indexDiff range
    if (i >= indexDiff) {
      const removeIndex = i - indexDiff;
      const removeNum = nums[removeIndex];
      const removeBucketId = getBucketId(removeNum);
      bucketMap.delete(removeBucketId);
    }
  }

  return false;
};

// Test cases
console.log("Test 1:", containsNearbyAlmostDuplicate([-1, -1], 1, 0)); // Expected: true
console.log("Test 2:", containsNearbyAlmostDuplicate([1, 0, 1, 1], 1, 2)); // Expected: true
console.log("Test 3:", containsNearbyAlmostDuplicate([1, 5, 9, 1, 5, 9], 2, 3)); // Expected: false
console.log(
  "Test 4:",
  containsNearbyAlmostDuplicate([-10, 16, 9, -4, 22, 10, 4, -5, 5], 2, 12)
); // Test case
console.log("Test 5:", containsNearbyAlmostDuplicate([1, 2, 3, 1], 3, 0)); // Expected: true
