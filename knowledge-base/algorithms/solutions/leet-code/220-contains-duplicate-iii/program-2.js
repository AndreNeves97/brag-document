/**
 * @param {number[]} nums
 * @param {number} indexDiff
 * @param {number} valueDiff
 * @return {boolean}
 */
var containsNearbyAlmostDuplicate = function (nums, indexDiff, valueDiff) {
  if (valueDiff < 0) return false;

  const min = findMin(nums);
  const buckets = new Map();

  const getBucketId = (value) => {
    const normalizedValue = min >= 0 ? value : value - min;
    return Math.floor(normalizedValue / (valueDiff + 1));
  };

  const storeInBucket = (value) => {
    const id = getBucketId(value);
    buckets.set(id, value);

    // log("store", { value, id });
  };

  const removeFromBucket = (value) => {
    const id = getBucketId(value);

    if (!buckets.has(id)) {
      return;
    }

    buckets.delete(id);

    // log("remove", { value, id });
  };

  log({ indexDiff, valueDiff });
  log({ min }, "\n\n");

  // left >= i - indexDiff

  // indexes less than (i - indexDiff) should be removed

  for (let i = 0; i < nums.length; i++) {
    const elementIndexToRemove = i - indexDiff - 1;
    if (elementIndexToRemove >= 0) {
      const elementToRemove = nums[elementIndexToRemove];
      removeFromBucket(elementToRemove);
    }

    const num = nums[i];
    const id = getBucketId(num);

    if (buckets.has(id)) {
      return true;
    }

    const prevBucket = buckets.get(id - 1);
    const bucket = buckets.get(id);
    const nextBucket = buckets.get(id + 1);

    const predicate = (bucketItem) => {
      return (
        bucketItem !== undefined && Math.abs(bucketItem - num) <= valueDiff
      );
    };

    const candidates = [];

    if (predicate(prevBucket)) {
      candidates.push(prevBucket);
    }
    if (predicate(bucket)) {
      candidates.push(bucket);
    }

    if (predicate(nextBucket)) {
      candidates.push(nextBucket);
    }

    // log({ id, num, prevBucket, bucket, nextBucket, candidates });

    if (candidates.filter((candidate) => candidate !== undefined).length) {
      log("\ncandidates of", {
        num,
        i,
      });
      log(candidates.filter((candidate) => candidate !== undefined));
      log("\n");

      return true;
    }

    storeInBucket(num);
  }

  return false;
};

/**
 *
 * @param {number[]} list
 * @returns number
 */
function findMin(list) {
  let min = Infinity;
  for (let i = 0; i < list.length; i++) {
    if (list[i] < min) {
      min = list[i];
    }
  }
  return min;
}

// log("Result", containsNearbyAlmostDuplicate([-1, -1], 1, 0));
// log("Result", containsNearbyAlmostDuplicate([-1, -1], 1, 0));
// log("Result", containsNearbyAlmostDuplicate([1, 0, 1, 1], 1, 2));
// log("Result", containsNearbyAlmostDuplicate([1, 5, 9, 1, 5, 9], 2, 3));
// log("Result", containsNearbyAlmostDuplicate([0, 5, 0], 2, 4));

// Grouped in the side bucket (1, 2)
// log(
//   "Result",
//   containsNearbyAlmostDuplicate(
//     [
//       -2, -6, 13, -10, 19, 9, -4, -12, -8, 1, 22, 10, -9, 4, -5, 9, 0, 5, -8,
//       16, 1, 2, -7, -11, -3, 3, -2, 2, -1, 6, 10, 7, 2, 11, 5, 12, 8, 17,
//     ],
//     2,
//     3
//   )
// );

// Grouped from right to left bucket (7, 4)
// log(
//   "Result",
//   containsNearbyAlmostDuplicate(
//     [
//       -2, -6, 13, -10, 16, 9, -4, -11, -5, 1, 22, 10, -9, 4, -5, 5, 0, 5, -8, 6,
//       1, 2, -7, -11, -3, 3, -2, 2, -1, 6, 18, 7, 8, 4, 11, 5, 12, 8, 17,
//     ],
//     2,
//     3
//   )
// );

// Map(9) {
//   2 => [ -2, 0, -3, -2, -1 ],
//   1 => [ -6, -4, -5, -5, -7 ],
//   6 => [ 13, 16 ],
//   0 => [ -10, -11, -9, -8, -11 ],
//   5 => [ 9, 10, 11, 12 ],
//   3 => [
//     1, 4, 1, 2,
//     3, 2, 4
//   ],
//   8 => [ 22 ],
//   4 => [
//     5, 5, 6, 6,
//     7, 8, 5, 8
//   ],
//   7 => [ 18, 17 ]
// }

// Grouped from left to right bucket (4, 7)
// log(
//   "Result",
//   containsNearbyAlmostDuplicate(
//     [
//       -2, -6, 13, -10, 16, 9, -4, -11, -5, 1, 22, 10, -9, 4, -5, 5, 0, 5, -8, 6,
//       1, 2, -7, -11, -3, 3, -2, 2, -1, 6, 18, 4, 7, 11, 5, 12, 8, 17,
//     ],
//     2,
//     3
//   )
// );

function log(...messages) {
  console.log(...messages);
}
