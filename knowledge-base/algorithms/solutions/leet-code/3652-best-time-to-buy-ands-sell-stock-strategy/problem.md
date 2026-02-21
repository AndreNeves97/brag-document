# Problem Statement

[Problem link](https://leetcode.com/problems/best-time-to-buy-and-sell-stock-using-strategy/description/?source=submission-ac)

You are given two integer arrays prices and strategy, where:

prices[i] is the price of a given stock on the ith day.
strategy[i] represents a trading action on the ith day, where:
-1 indicates buying one unit of the stock.
0 indicates holding the stock.
1 indicates selling one unit of the stock.
You are also given an even integer k, and may perform at most one modification to strategy. A modification consists of:

Selecting exactly k consecutive elements in strategy.
Set the first k / 2 elements to 0 (hold).
Set the last k / 2 elements to 1 (sell).
The profit is defined as the sum of strategy[i] * prices[i] across all days.

Return the maximum possible profit you can achieve.

Note: There are no constraints on budget or stock ownership, so all buy and sell operations are feasible regardless of past actions.

 

Example 1:

Input: prices = [4,2,8], strategy = [-1,0,1], k = 2

Output: 10

Explanation:

Modification	Strategy	Profit Calculation	Profit
Original	[-1, 0, 1]	(-1 × 4) + (0 × 2) + (1 × 8) = -4 + 0 + 8	4
Modify [0, 1]	[0, 1, 1]	(0 × 4) + (1 × 2) + (1 × 8) = 0 + 2 + 8	10
Modify [1, 2]	[-1, 0, 1]	(-1 × 4) + (0 × 2) + (1 × 8) = -4 + 0 + 8	4
Thus, the maximum possible profit is 10, which is achieved by modifying the subarray [0, 1]​​​​​​​.

Example 2:

Input: prices = [5,4,3], strategy = [1,1,0], k = 2

Output: 9

Explanation:

Modification	Strategy	Profit Calculation	Profit
Original	[1, 1, 0]	(1 × 5) + (1 × 4) + (0 × 3) = 5 + 4 + 0	9
Modify [0, 1]	[0, 1, 0]	(0 × 5) + (1 × 4) + (0 × 3) = 0 + 4 + 0	4
Modify [1, 2]	[1, 0, 1]	(1 × 5) + (0 × 4) + (1 × 3) = 5 + 0 + 3	8
Thus, the maximum possible profit is 9, which is achieved without any modification.

 

Constraints:

2 <= prices.length == strategy.length <= 105
1 <= prices[i] <= 105
-1 <= strategy[i] <= 1
2 <= k <= prices.length
k is even


# Analysis

## Problem Analysis

### Basic Profit Formula

The profit is calculated as the sum of `prices[i] * strategy[i]` for all days:
```
profit = Σ(prices[i] * strategy[i]) for i = 0 to n-1
```

**Example from Example 1:**
- Original: `strategy = [-1, 0, 1]`, `prices = [4, 2, 8]`
- Profit = `(-1 × 4) + (0 × 2) + (1 × 8) = -4 + 0 + 8 = 4`

### Modification Rules

When we modify a window starting at index `modIndex` with length `k`:
1. First `k/2` elements (`modIndex` to `modIndex + k/2 - 1`) → changed to `0` (hold)
2. Last `k/2` elements (`modIndex + k/2` to `modIndex + k - 1`) → changed to `1` (sell)

### Key Requirements

- We can perform at most one modification
- The modification must cover exactly `k` consecutive elements
- The modification splits the window: first half becomes `0` (hold), second half becomes `1` (sell)
- Since `k` is even, the split is always clean (k/2 elements each)
- No constraints on budget or stock ownership means all operations are feasible

## Possible Solutions

### Approach 1: Naive Brute Force (O(n²))

**Algorithm:**
- Calculate the original profit by summing `prices[i] * strategy[i]` for all `i`
- For each possible window position of length `k`:
  - Create a copy of the strategy array
  - Apply the modification to the window (first k/2 → 0, last k/2 → 1)
  - Recalculate the total profit
  - Track the maximum profit seen

**Complexity:**
- Time: O(n²) - O(n) windows × O(n) to recalculate profit for each
- Space: O(n) - for the strategy copy

**Limitation:** Too slow for large inputs (n up to 10⁵).

### Approach 2: Delta Calculation (O(n×k))

**Key Insight:** Instead of recalculating the entire profit for each modification, we can calculate only the **delta** (change) in profit caused by the modification.

**How it works:**
- Calculate the original profit once: O(n)
- For each possible window position:
  - For each position `i` in the modified window:
    - Old contribution: `prices[i] * strategy[i]`
    - New contribution: `prices[i] * newStrategy[i]`
    - Delta: `prices[i] * (newStrategy[i] - strategy[i])`
  
  - For positions in first half (becoming `0`):
    - Delta = `-prices[i] * strategy[i]`
  
  - For positions in second half (becoming `1`):
    - Delta = `prices[i] * (1 - strategy[i])`
  
  - Sum all deltas to get total change for this window
  - Update maximum profit: `originalProfit + maxDelta`

**Example with Example 1, modifying window [0, 1]:**
- Original profit = 4
- Window indices: 0, 1 (k=2)
- Index 0: `strategy[0] = -1` → becomes `0`
  - Delta = `4 * (0 - (-1)) = 4 * 1 = +4`
- Index 1: `strategy[1] = 0` → becomes `1`
  - Delta = `2 * (1 - 0) = 2 * 1 = +2`
- Total delta = `+4 + 2 = +6`
- New profit = `4 + 6 = 10`

**Complexity:**
- Time: O(n) + O(n) windows × O(k) = O(n×k)
- Space: O(1)
- Much better than naive approach, especially when k << n

### Approach 3: Sliding Window Optimization (O(n))

**Key Insight:** When sliding from window starting at `i` to window starting at `i+1`, we can reuse the delta calculation by only adjusting for the elements that change.

**How it works:**
- Calculate delta for the first window [0...k-1] in O(k)
- For each subsequent window position:
  - When moving from window [i...i+k-1] to [i+1...i+k]:
    1. **Element at position `i` leaves** (was in first half, becoming `0`):
       - Remove its contribution: `+prices[i] * strategy[i]`
    
    2. **Element at position `i + k/2` moves** from second half to first half:
       - Was contributing (as second half, becoming `1`): `prices[i+k/2] * (1 - strategy[i+k/2])`
       - Now contributes (as first half, becoming `0`): `-prices[i+k/2] * strategy[i+k/2]`
       - Net change: `-prices[i+k/2]`
    
    3. **Element at position `i + k` enters** (is in second half, becoming `1`):
       - Add contribution: `prices[i+k] * (1 - strategy[i+k])`
  
  - Update delta using these three adjustments in O(1) time
  - Track maximum profit across all windows

**Complexity:**
- Time: O(k) + O(n) × O(1) = O(n)
- Space: O(1)
- Optimal time complexity, especially beneficial when k is large (close to n)

### Approach 4: Prefix Sum Approach (O(n))

**Intuition:** Use prefix sums to quickly compute range sums for each possible window position without recalculating.

**Data Structures:**
- `profitSum[i]`: Prefix sum of `strategy[j] × prices[j]` from `[0, i-1]`
  - Allows O(1) query for sum of original profit in any range
- `priceSum[i]`: Prefix sum of `prices[j]` from `[0, i-1]`
  - Allows O(1) query for sum of prices in any range

**How it works:**
- Build both prefix sum arrays in O(n)
- For each possible window ending at position `i` (covering `[i-k+1, i]`):
  - **Left profit** `[0, i-k]`: Use `profitSum[i-k+1]` to get original profit before window
  - **Modified window profit** `[i-k+1, i]`:
    - First half `[i-k+1, i-k/2]` becomes 0 → contributes `0`
    - Second half `[i-k/2+1, i]` becomes 1 → contributes sum of `prices[j]` in this range
    - Use `priceSum[i+1] - priceSum[i-k/2+1]` to get sum of prices in second half
  - **Right profit** `[i+1, n-1]`: Use `profitSum[n] - profitSum[i+1]` to get original profit after window
  - Total profit = leftProfit + modifiedWindowProfit + rightProfit
  - Track maximum across all windows

**Complexity:**
- Time: O(n) - O(n) to build prefix sums + O(n) to try each window
- Space: O(n) - for the two prefix sum arrays
- Clean and intuitive approach, each window calculation is O(1) using prefix sum queries

**Advantages:**
- Very readable and easy to understand
- All range queries are O(1) after preprocessing
- No complex sliding window logic needed


# Topics

- Array
- Sliding Window
- Prefix Sum
- Dynamic Programming (conceptually, as we're optimizing over all possible modifications)
- Greedy Algorithm (finding the best single modification)
