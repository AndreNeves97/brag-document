export const runtimeParams = {
  performanceProfiling: false,
  heavyValidation: false,
  logging: false,
};

export function maxSumOfThreeSubarrays(nums: number[], k: number): number[] {
  const numbersList = new NumbersList(nums);
  const slidingWindow = new SlidingWindow(numbersList, k);

  const maximumSumAlgorithm = new MaximumSumBruteForceAlgorithm(slidingWindow);
  return maximumSumAlgorithm.exec();
}

/**
 * Strategy:
 * - Use DP to calculate the better range from left and right
 *   - betterStartLeft: A list of start-pointers. betterStartLeft[i] is the start point of the better subarray inside the range [0, i + k[
 *   - The calculation is always based on the previous value:
 *    - betterStartLeft[0] = 0
 *    - betterStartLeft[1] = sum(1, 1 + k) > sum(0, 0 + k)? 1 : 0
 *    - betterStartLeft[2] = sum(2, 2 + k) > sum(betterStartLeft[1], betterStartLeft[1] + k)? 2 : betterStartLeft[1]
 *    ...
 *    - betterStartLeft[i] = sum(i, i + k) > sum(betterStartLeft[i - 1], betterStartLeft[i - 1] + k)? i : betterStartLeft[i - 1]
 *
 *   - The same logic for betterStartRight. But betterStartRight[i] is the start point for the better subarray inside the range [i, nums.length - k[
 *
 */
export class MaximumSumDynamicProgrammingAlgorithm {
  public betterStartLeft: number[];
  public betterStartRight: number[];

  constructor(private slidingWindow: SlidingWindow) {
    this.slidingWindow = slidingWindow;

    this.betterStartLeft = new Array(
      slidingWindow.nums.length - 2 * slidingWindow.k - 1
    ).fill(0);

    this.betterStartRight = new Array(slidingWindow.nums.length - 1);

    this.calculateBetterStartLeftValues();
    this.calculateBetterStartRightValues();
  }

  private calculateBetterStartLeftValues() {
    for (let i = 1; i < this.betterStartLeft.length; i++) {
      const currentRangeSum = this.slidingWindow.nums.sumInterval(
        i,
        this.slidingWindow.getEndFor(i)
      );

      const betterRangeStart = this.betterStartLeft[i - 1];
      const betterRangeSum = this.slidingWindow.nums.sumInterval(
        betterRangeStart,
        this.slidingWindow.getEndFor(betterRangeStart)
      );

      if (currentRangeSum > betterRangeSum) {
        this.betterStartLeft[i] = i;
      } else {
        this.betterStartLeft[i] = betterRangeStart;
      }
    }
  }

  private calculateBetterStartRightValues() {
    const k = this.slidingWindow.k;
    const length = this.slidingWindow.nums.length;

    this.betterStartRight[length - k] = length - k;

    for (let i = length - k - 1; i >= 2 * k; i--) {
      const currentRangeSum = this.slidingWindow.nums.sumInterval(
        i,
        this.slidingWindow.getEndFor(i)
      );

      const betterRangeStart = this.betterStartRight[i + 1];
      const betterRangeSum = this.slidingWindow.nums.sumInterval(
        betterRangeStart,
        this.slidingWindow.getEndFor(betterRangeStart)
      );

      if (currentRangeSum > betterRangeSum) {
        this.betterStartRight[i] = i;
      } else {
        this.betterStartRight[i] = betterRangeStart;
      }
    }
  }

  public exec(): number[] {
    return [];
  }
}

export class MaximumSumBruteForceAlgorithm {
  private maxSum: number = 0;
  private betterSumPositions: number[];

  constructor(private slidingWindow: SlidingWindow) {
    this.betterSumPositions = [
      this.slidingWindow.startLeft,
      this.slidingWindow.startMiddle,
      this.slidingWindow.startRight,
    ];
  }

  public exec(): number[] {
    const length = this.slidingWindow.nums.length;
    const k = this.slidingWindow.k;

    for (let newLeft = 0; newLeft < length - 3 * k + 1; newLeft++) {
      this.slidingWindow.setLeft(newLeft);
      for (
        let newMiddle = this.slidingWindow.endLeft + 1;
        newMiddle < length - 2 * k + 1;
        newMiddle++
      ) {
        this.slidingWindow.setMiddle(newMiddle);

        for (
          let newRight = this.slidingWindow.endMiddle + 1;
          newRight < length - k + 1;
          newRight++
        ) {
          this.slidingWindow.setRight(newRight);

          const sum = this.slidingWindow.getSubArraysSum();

          if (sum > this.maxSum) {
            this.maxSum = sum;
            this.betterSumPositions = [newLeft, newMiddle, newRight];
          }
        }
      }
    }

    return this.betterSumPositions;
  }
}

export class SlidingWindow {
  private left: number = 0;
  private middle: number = 0;
  private right: number = 0;

  constructor(public nums: NumbersList, public k: number) {
    this.nums = nums;
    this.k = k;

    this.middle = this.endLeft + 1;
    this.right = this.endMiddle + 1;
  }

  public getSubArraysSum(): number {
    return (
      this.nums.sumInterval(this.left, this.endLeft) +
      this.nums.sumInterval(this.middle, this.endMiddle) +
      this.nums.sumInterval(this.right, this.endRight)
    );
  }

  public setLeft(left: number): void {
    this.left = left;
    this.validatePositions();
  }

  public setMiddle(middle: number): void {
    this.middle = middle;
    this.validatePositions();
  }

  public setRight(right: number): void {
    this.right = right;
    this.validatePositions();
  }

  private validatePositions(): void {
    if (runtimeParams.heavyValidation && !this.isValid) {
      throw new Error(
        `Invalid positions: ${this.left}, ${this.middle}, ${this.right}`
      );
    }
  }

  public get startLeft(): number {
    return this.left;
  }

  public get startRight(): number {
    return this.right;
  }

  public get startMiddle(): number {
    return this.middle;
  }

  public get endLeft(): number {
    return this.left + this.k - 1;
  }

  public get endRight(): number {
    return this.right + this.k - 1;
  }

  public get endMiddle(): number {
    return this.middle + this.k - 1;
  }

  public getEndFor(value: number): number {
    return value + this.k - 1;
  }

  public get isValid(): boolean {
    // Is out of left boundary
    if (this.left < 0 || this.middle < 0 || this.right < 0) {
      return false;
    }

    // Is out of right boundary
    if (
      this.endLeft >= this.nums.length ||
      this.endMiddle >= this.nums.length ||
      this.endRight >= this.nums.length
    ) {
      return false;
    }

    // Is not in order
    if (this.left > this.middle || this.middle > this.right) {
      return false;
    }

    // Is overlapping
    if (this.endLeft >= this.middle || this.endMiddle >= this.right) {
      return false;
    }

    return true;
  }
}

export class NumbersList {
  private prefixSums: number[] = [];

  constructor(private nums: number[]) {
    this.prefixSums = this.calculatePrefixSums();
  }

  public sumInterval(start: number, end: number): number {
    if (start > end) {
      return 0;
    }

    if (start < 0) {
      start = 0;
    }

    if (end >= this.nums.length) {
      end = this.nums.length - 1;
    }

    return this.prefixSums[end + 1] - this.prefixSums[start];
  }

  private calculatePrefixSums(): number[] {
    const prefixSums: number[] = new Array(this.nums.length + 1).fill(0);
    let sum = 0;

    for (let i = 0; i < this.nums.length; i++) {
      sum += this.nums[i];
      prefixSums[i + 1] = sum;
    }

    return prefixSums;
  }

  public get length(): number {
    return this.nums.length;
  }
}

function log(...messages) {
  if (runtimeParams.logging) {
    console.log(...messages);
  }
}
