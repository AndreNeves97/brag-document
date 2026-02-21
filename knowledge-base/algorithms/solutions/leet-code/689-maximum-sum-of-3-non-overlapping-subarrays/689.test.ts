import {
  MaximumSumBruteForceAlgorithm,
  MaximumSumDynamicProgrammingAlgorithm,
  maxSumOfThreeSubarrays,
  NumbersList,
  runtimeParams,
  SlidingWindow,
} from "./program";

beforeEach(() => {
  runtimeParams.performanceProfiling = false;
  runtimeParams.heavyValidation = true;
  runtimeParams.logging = false;
});

test.each([
  [1, [1, 2, 1, 2, 6, 7, 5, 1], 2, [0, 3, 5]],
  [2, [1, 2, 1, 2, 1, 2, 1, 2, 1], 2, [0, 2, 4]],
])(
  "validate 3 non-overlapping subarrays with maximum sum (%d)",
  (testId, nums, k, response) => {
    expect(maxSumOfThreeSubarrays(nums, k)).toEqual(response);
  }
);

describe("validate prefix sums", () => {
  test.each([
    [0, 0, 1],
    [1, 1, 2],
    [0, 1, 3],
    [1, 3, 5],
    [2, 6, 21],
  ])("validate sum interval %d to %d", (start, end, result) => {
    const numbersList = new NumbersList([1, 2, 1, 2, 6, 7, 5, 1]);
    expect(numbersList.sumInterval(start, end)).toEqual(result);
  });
});

describe("validate sliding window", () => {
  test("validate initial sliding window positions", () => {
    const k = 2;
    const slidingWindow = new SlidingWindow(
      new NumbersList([1, 2, 1, 2, 6, 7, 5, 1]),
      k
    );

    expect(slidingWindow.isValid).toEqual(true);

    expect(slidingWindow.startLeft).toEqual(0);
    expect(slidingWindow.startMiddle).toEqual(2);
    expect(slidingWindow.startRight).toEqual(4);

    expect(slidingWindow.endLeft).toEqual(1);
    expect(slidingWindow.endMiddle).toEqual(3);
    expect(slidingWindow.endRight).toEqual(5);
  });

  test("validate subarrays sum", () => {
    const k = 2;
    const slidingWindow = new SlidingWindow(
      new NumbersList([1, 2, 1, 2, 6, 7, 5, 1]),
      k
    );

    expect(slidingWindow.getSubArraysSum()).toEqual(19);
  });
});

describe("validate maximum sum brute force algorithm", () => {
  test("validate brute force", () => {
    const nums = [1, 2, 1, 2, 6, 7, 5, 1];
    const k = 2;

    const result = [0, 3, 5];

    const slidingWindow = new SlidingWindow(new NumbersList(nums), k);
    const maximumSumAlgorithm = new MaximumSumBruteForceAlgorithm(
      slidingWindow
    );

    expect(maximumSumAlgorithm.exec()).toEqual(result);
  });
});

describe("validate maximum sum dynamic programming algorithm", () => {
  test("validate calculate of better start point from left", () => {
    const nums = [1, 2, 1, 2, 6, 7, 5, 1, 10, 3, 15, 2];
    const k = 2;

    const result = [0, 3, 5];

    const slidingWindow = new SlidingWindow(new NumbersList(nums), k);
    const dpAlgorithm = new MaximumSumDynamicProgrammingAlgorithm(
      slidingWindow
    );

    const leftPointers = dpAlgorithm.betterStartLeft;

    expect(leftPointers[0]).toBe(0);
    expect(leftPointers[1]).toBe(0);
    expect(leftPointers[2]).toBe(0);
    expect(leftPointers[3]).toBe(3);
    expect(leftPointers[4]).toBe(4);
    expect(leftPointers[5]).toBe(4);
    expect(leftPointers[6]).toBe(4);
    expect(leftPointers[7]).toBe(undefined);
  });

  test("validate calculate of better start point from left", () => {
    const nums = [1, 2, 1, 2, 6, 7, 10, 1, 10, 3, 15, 2];
    const k = 2;

    const result = [0, 3, 5];

    const slidingWindow = new SlidingWindow(new NumbersList(nums), k);
    const dpAlgorithm = new MaximumSumDynamicProgrammingAlgorithm(
      slidingWindow
    );

    const leftPointers = dpAlgorithm.betterStartLeft;

    expect(leftPointers[0]).toBe(0);
    expect(leftPointers[1]).toBe(0);
    expect(leftPointers[2]).toBe(0);
    expect(leftPointers[3]).toBe(3);
    expect(leftPointers[4]).toBe(4);
    expect(leftPointers[5]).toBe(5);
    expect(leftPointers[6]).toBe(5);
    expect(leftPointers[7]).toBe(undefined);
  });

  test("validate calculate of better start point from right", () => {
    const nums = [1, 2, 1, 2, 6, 7, 5, 1, 10, 3, 15, 2];
    const k = 2;

    const result = [0, 3, 5];

    const slidingWindow = new SlidingWindow(new NumbersList(nums), k);
    const dpAlgorithm = new MaximumSumDynamicProgrammingAlgorithm(
      slidingWindow
    );

    const rightPointers = dpAlgorithm.betterStartRight;

    expect(rightPointers[11]).toBe(undefined);
    expect(rightPointers[10]).toBe(10);
    expect(rightPointers[9]).toBe(9);
    expect(rightPointers[8]).toBe(9);
    expect(rightPointers[7]).toBe(9);
    expect(rightPointers[6]).toBe(9);
    expect(rightPointers[5]).toBe(9);
    expect(rightPointers[4]).toBe(9);
    expect(rightPointers[3]).toBe(undefined);
    expect(rightPointers[2]).toBe(undefined);
    expect(rightPointers[1]).toBe(undefined);
    expect(rightPointers[0]).toBe(undefined);
  });

  test("validate calculate of better start point from right", () => {
    const nums = [1, 2, 1, 2, 6, 9, 10, 1, 10, 3, 15, 2];
    const k = 2;

    const result = [0, 3, 5];

    const slidingWindow = new SlidingWindow(new NumbersList(nums), k);
    const dpAlgorithm = new MaximumSumDynamicProgrammingAlgorithm(
      slidingWindow
    );

    const rightPointers = dpAlgorithm.betterStartRight;

    expect(rightPointers[11]).toBe(undefined);
    expect(rightPointers[10]).toBe(10);
    expect(rightPointers[9]).toBe(9);
    expect(rightPointers[8]).toBe(9);
    expect(rightPointers[7]).toBe(9);
    expect(rightPointers[6]).toBe(9);
    expect(rightPointers[5]).toBe(5);
    expect(rightPointers[4]).toBe(5);
    expect(rightPointers[3]).toBe(undefined);
    expect(rightPointers[2]).toBe(undefined);
    expect(rightPointers[1]).toBe(undefined);
    expect(rightPointers[0]).toBe(undefined);
  });
});
