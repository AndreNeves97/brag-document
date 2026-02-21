/**
 * @param {number[]} nums
 * @param {number} indexDiff
 * @param {number} valueDiff
 * @return {boolean}
 */
var containsNearbyAlmostDuplicate = function (nums, indexDiff, valueDiff) {
  const { min, max, buckets } = groupInBuckets(nums);

  let left = 0,
    right = 0;

  let currentFoundValueIndexInMinBucket = 0;

  log({ indexDiff, valueDiff });
  log({ min, max }, "\n\n");

  buckets.forEach((bucket, index) => {
    log({
      index,
      bucket: {
        ...bucket,
        list: bucket.list.map((item) => item.value),
      },
    });
  });

  log("\n\n======\n\n");

  while (left <= right && right < buckets.length) {
    const currentMinBucket = buckets[left];
    const currentMaxBucket = buckets[right];

    log({ left, right });

    if (
      currentMinBucket.max + valueDiff > currentMaxBucket.max &&
      right < buckets.length - 1
    ) {
      right++;
      log("\n==== EXPAND ====", { right });
      continue;
    }

    log({
      currentMinBucket: {
        ...currentMinBucket,
        list: currentMinBucket.list.map((item) => item.value),
      },
      currentMaxBucket: {
        ...currentMaxBucket,
        list: currentMaxBucket.list.map((item) => item.value),
      },
    });

    const currentFoundValue =
      currentMinBucket.list[currentFoundValueIndexInMinBucket];

    const maxPairValue = currentFoundValue.value + valueDiff;

    let targetBucketIndex = left;

    do {
      const targetBucket = buckets[targetBucketIndex];

      log({
        currentFoundValue,
        maxPairValue,
        targetBucketIndex,
        targetBucket: {
          ...targetBucket,
          list: targetBucket.list.map((item) => item.value),
        },
      });

      let pairItem = undefined;

      for (let i = 0; i < targetBucket.list.length; i++) {
        candidatePairItem = targetBucket.list[i];

        if (
          (targetBucket === currentMinBucket &&
            i === currentFoundValueIndexInMinBucket) ||
          candidatePairItem.value < currentFoundValue.value
        ) {
          continue;
        }

        log({ candidatePairItem, currentFoundValue });

        if (
          Math.abs(candidatePairItem.value - currentFoundValue.value) <=
            valueDiff &&
          Math.abs(
            candidatePairItem.originalIndex - currentFoundValue.originalIndex
          ) <= indexDiff
        ) {
          pairItem = candidatePairItem;
          break;
        }
      }

      if (pairItem) {
        log("Found!!! ", {
          currentFoundValue,
          pairItem,
        });
        return true;
      }

      targetBucketIndex++;
    } while (
      targetBucketIndex <= right &&
      maxPairValue >= buckets[targetBucketIndex].min
    );

    currentFoundValueIndexInMinBucket++;

    log({ currentFoundValueIndexInMinBucket });

    if (currentFoundValueIndexInMinBucket >= currentMinBucket.list.length) {
      left++;
      currentFoundValueIndexInMinBucket = 0;
      continue;
    }
  }

  return false;
};

/**
 *
 * @param {number[]} nums
 * @returns List of buckets
 */
function groupInBuckets(nums) {
  const max = findMax(nums);
  const min = findMin(nums);
  const bucketsCount = Math.floor(Math.sqrt(nums.length));

  const buckets = Array.from({ length: bucketsCount }, () => ({
    list: new Array(),
    min: Infinity,
    max: -Infinity,
  }));

  log({ min, max, bucketsCount });

  nums.forEach((num, originalIndex) => {
    const index = hashIndex(num, min, max, bucketsCount);
    const bucket = buckets[index];

    bucket.list.push({ value: num, originalIndex });

    bucket.min = Math.min(bucket.min, num);
    bucket.max = Math.max(bucket.max, num);
  });

  return { min, max, buckets };
}

function hashIndex(value, min, max, bucketsCount) {
  if (max === min) {
    return 0;
  }

  const normalizedValue = (value - min) / (max - min);
  return Math.floor(normalizedValue * (bucketsCount - 1));
}

/**
 *
 * @param {number[]} list
 * @returns number
 */
function findMax(list) {
  let max = -Infinity;

  list.forEach((value) => {
    max = Math.max(max, value);
  });

  return max;
}

/**
 *
 * @param {number[]} list
 * @returns number
 */
function findMin(list) {
  let min = Infinity;

  list.forEach((value) => {
    min = Math.min(min, value);
  });

  return min;
}

// log("Result", containsNearbyAlmostDuplicate([-1, -1], 1, 0));
// log("Result", containsNearbyAlmostDuplicate([-1, -1], 1, 0));
// log("Result", containsNearbyAlmostDuplicate([1, 0, 1, 1], 1, 2));
log("Result", containsNearbyAlmostDuplicate([1, 5, 9, 1, 5, 9], 2, 3));
// log(
//   "Result",
//   containsNearbyAlmostDuplicate([-10, 16, 9, -4, 22, 10, 4, -5, 5], 2, 12)
// );

function log(...messages) {
  console.log(...messages);
}
