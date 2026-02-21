# Solution: Longest Duplicate Substring

## Approach

This solution uses **Binary Search + Rabin-Karp Rolling Hash** to efficiently find the longest duplicate substring in O(n log n) time complexity.

### Key Strategy

1. **Binary Search on Length**: Instead of checking all possible substring lengths, we use binary search to find the maximum length that has duplicates.
2. **Rabin-Karp Rolling Hash**: For each candidate length, we use rolling hash to check for duplicate substrings in O(n) time without explicitly creating substring objects.
3. **Hash Collision Handling**: When hash matches are found, we verify by comparing actual substrings to handle potential hash collisions.

## Algorithm Overview

1. Binary search on substring length (minLength = 1, maxLength = n-1)
2. For each candidate length:
   - Use rolling hash to compute hash for all substrings of that length
   - Store hashes in a Map along with the substring
   - If a hash collision occurs, verify by comparing actual substrings
   - If duplicate found, try longer lengths; otherwise try shorter lengths
3. Return the longest duplicate substring found

## Implementation Details

### Main Function: `longestDupSubstring`

The main function implements binary search on the substring length. For each candidate length, it slides a window through the string and uses rolling hash to efficiently compute hashes for all substrings of that length. Hashes are stored in a Map for duplicate detection. When a hash match is found, the function verifies it's not a collision by comparing the actual substrings.

**Key Points:**
- Uses binary search to find the maximum length with duplicates
- For each length, slides a window through the string
- Uses rolling hash for O(1) hash updates per position
- Stores hashes in a Map for duplicate detection
- Verifies hash collisions by comparing actual substrings

### Hash Function

The hash function computes a polynomial hash for a string using base 26 and a large prime modulus. It processes characters from right to left, multiplying each character's value by the appropriate power of the base.

**Hash Formula:**
- For a string "abc", the hash is computed as: `hash("abc") = a*26² + b*26¹ + c*26⁰`
- Uses base 26 (for lowercase English letters) and modulus 1e9 + 7
- Characters are mapped: 'a' → 1, 'b' → 2, ..., 'z' → 26

### Rolling Hash Function

The rolling hash function efficiently updates the hash when sliding the window by one position. It removes the contribution of the leftmost character, shifts the remaining hash, and adds the new rightmost character.

**Rolling Hash Formula:**
- When sliding from position i to i+1: `newHash = ((oldHash - s[i] * base^(L-1)) * base + s[i+L]) % mod`
- This allows O(1) hash computation for each new position
- The addition of largerPrime in subtraction prevents negative values

### Optimized Power Calculation

The power calculation function caches previously computed powers to avoid redundant calculations. When computing a power, if a smaller power has already been computed, it continues from there rather than starting from scratch.

**Optimization:**
- Caches previously computed powers to avoid redundant calculations
- When computing `base^k`, if we've already computed `base^j` where `j < k`, we continue from there
- Reduces time complexity for repeated power calculations

### Collision Detection

The collision detection function verifies that two substrings with matching hashes are actually identical by comparing them character-by-character.

**Purpose:**
- When two different substrings have the same hash (collision), we verify by comparing character-by-character
- Ensures correctness even when hash collisions occur (rare but possible)

## Complexity Analysis

### Time Complexity: O(n log n)
- **Binary Search**: O(log n) iterations
- **Rolling Hash Check**: O(n) per iteration
  - O(n) positions to check
  - O(1) hash computation per position (rolling hash)
  - O(1) average case for Map operations
- **Collision Verification**: O(L) worst case, but rare
- **Total**: O(n log n)

### Space Complexity: O(n)
- **Hash Map**: Stores at most O(n) hash values and substrings
- **Auxiliary Variables**: O(1)

## Key Insights

1. **Binary Search Applicability**: The problem has a monotonic property - if a substring of length L has duplicates, we can try longer lengths. If not, we need shorter lengths.

2. **Rolling Hash Efficiency**: Instead of computing hash from scratch for each substring (O(L) per substring), rolling hash allows O(1) updates, reducing the per-iteration complexity from O(nL) to O(n).

3. **Hash Collision Handling**: While hash collisions are rare with a large prime modulus, we must verify to ensure correctness. The collision detection adds minimal overhead in practice.

4. **Power Calculation Optimization**: By caching computed powers, we avoid redundant calculations when computing hashes for different substrings.

## Runtime Parameters

The solution uses configurable runtime parameters:
- **hashingPrime**: Base for the hash function (26 for lowercase English letters)
- **largerPrime**: Modulus to prevent integer overflow and reduce collisions (default: 1e9 + 7)
- **performanceProfiling**: Enable to track power calculation optimizations
- **logging**: Enable for debugging output

## Example Walkthrough

For input `s = "banana"`:

1. **Binary Search Iteration 1**: Try length = 3
   - Check all substrings of length 3: "ban", "ana", "nan", "ana"
   - Hash("ana") appears twice → duplicate found
   - Try longer: length = 4

2. **Binary Search Iteration 2**: Try length = 4
   - Check all substrings of length 4: "bana", "anan", "nana"
   - No duplicates found
   - Try shorter: length = 3

3. **Result**: "ana" is the longest duplicate substring

## Testing

The solution includes comprehensive tests covering:
- Hash function correctness
- Rolling hash correctness
- Power calculation optimization
- Edge cases (empty string, no duplicates)
- Large input cases

See `longest-duplicate-substring.test.ts` for all test cases.

