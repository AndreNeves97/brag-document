# DSA Patterns Summary

Source: [LinkedIn Post by Ashish Pratap Singh](https://www.linkedin.com/posts/ashishps1_dsa-was-hard-until-i-learned-these-20-patterns-activity-7419244061485875200-YgY2/?rcm=ACoAABs0ul0BsB4K_c-c0vQJeGSfYIYIQt2QEi0)

DSA was HARD until I Learned these 20 Patterns:

1. [**Prefix Sum**](https://algomaster.io/learn/dsa/prefix-sum-introduction)
   - **Definition**: Precomputing sum of all elements from beginning to each index.
   - **Formula**: `sum(left, right) = prefix[right] - prefix[left - 1]`
   - **Use Cases**: Multiple range sum queries on static array, counting subarrays with specific sum, finding equilibrium points, 2D grid problems.
   - **Complexity**: O(n) preprocessing, O(1) query.

2. [**Two Pointers**](https://algomaster.io/learn/dsa/two-pointers-introduction)
   - **Definition**: Uses two pointers to traverse a data structure (array/string) to avoid nested loops.
   - **Variants**: Opposite Direction (converging), Same Direction (parallel), Trigger-Based.
   - **Use Cases**: Sorted arrays (pair sum), Palindrome checking, Merging sorted sequences, In-place modification.
   - **Complexity**: Typically reduces O(n²) to O(n).

3. [**Sliding Window**](https://algomaster.io/learn/dsa/sliding-window-introduction)
   - **Definition**: Maintains a "window" over data that slides to check/compute properties of subarrays.
   - **Types**: Fixed-size (max sum of size k) vs Variable-size (smallest subarray with sum >= target).
   - **Use Cases**: Subarrays/substrings satisfying criteria (sum, distinct chars), Optimization problems on contiguous segments.
   - **Complexity**: O(n) as each element is added/removed at most once.

4. [**Fast & Slow Pointers**](https://algomaster.io/learn/dsa/fast-slow-pointers-introduction)
   - **Definition**: Two pointers moving at different speeds (e.g., 1 step vs 2 steps). Also known as Tortoise and Hare.
   - **Use Cases**: Cycle detection in linked lists/arrays, Finding middle of linked list, Palindrome linked list check, Finding cycle start.
   - **Complexity**: O(n) time, O(1) space.

5. [**LinkedList In-place Reversal**](https://algomaster.io/learn/dsa/linked-list-in-place-reversal-introduction)
   - **Definition**: Reversing links between nodes without extra space.
   - **Technique**: Uses 3 pointers (prev, curr, next).
   - **Use Cases**: Reverse whole list, Reverse sublist (m to n), Reverse in k-groups, Palindrome check.
   - **Complexity**: O(n) time, O(1) space.

6. [**Frequency Counting**](https://algomaster.io/learn/dsa/frequency-counting-introduction)
   - **Definition**: Counting occurrences of elements using Hash Maps or Arrays.
   - **Use Cases**: Anagrams, Permutations, Duplicate detection, Comparing collections (composition vs order).
   - **Complexity**: O(n) time, O(k) space (k = unique elements).

7. [**Monotonic Stack**](https://algomaster.io/learn/dsa/monotonic-stack-introduction)
   - **Definition**: Stack maintaining elements in specific order (increasing/decreasing).
   - **Use Cases**: Next Greater/Smaller Element, Stock Span, Histogram Area.
   - **Complexity**: O(n) as each element pushed/popped at most once.

8. [**Bit Manipulation**](https://algomaster.io/learn/dsa/bit-manipulation-introduction)
   - **Definition**: Direct manipulation of bits using AND, OR, XOR, NOT, Shifts.
   - **Techniques**: Check/Set/Clear/Toggle bits, Power of 2 check, Counting set bits (Kernighan's), XOR for unique element.
   - **Use Cases**: Optimization, Flag management, Math problems, Subsets.
   - **Complexity**: O(1) or O(bits) operations.

9. [**Top ‘K’ Elements**](https://algomaster.io/learn/dsa/top-k-elements-introduction)
   - **Definition**: Finding k largest/smallest/frequent elements.
   - **Technique**: Min-Heap (for k smallest) or Max-Heap (for k largest).
   - **Use Cases**: Leaderboards, Most frequent items, Streaming data.
   - **Complexity**: O(N log K) time, O(K) space.

10. [**Overlapping Intervals**](https://algomaster.io/learn/dsa/intervals-introduction)
    - **Definition**: Handling ranges with start/end points.
    - **Techniques**: Sorting by start or end time.
    - **Use Cases**: Merging intervals, Insert interval, Meeting rooms (overlap check), Activity selection.
    - **Complexity**: Usually O(N log N) due to sorting.

11. [**Modified Binary Search**](https://algomaster.io/learn/dsa/binary-search-introduction)
    - **Definition**: Efficient search in sorted/monotonic search spaces.
    - **Variants**: Lower/Upper bound, First/Last occurrence, Search in Rotated Array, Search on Answer.
    - **Use Cases**: Finding exact value, boundary, or optimizing a value in a range.
    - **Complexity**: O(log N).

12. [**Binary Tree Traversal**](https://algomaster.io/learn/dsa/binary-tree-introduction)
    - **Definition**: Visiting nodes in specific order.
    - **Types**: Inorder (Left-Root-Right), Preorder (Root-Left-Right), Postorder (Left-Right-Root), Level Order (BFS).
    - **Use Cases**: BST processing (Inorder), Copying/Serialization (Preorder), Deletion/Bottom-up (Postorder).
    - **Complexity**: O(N).

13. [**Depth-First Search (DFS)**](https://algomaster.io/learn/dsa/dfs-introduction)
    - **Definition**: Graph traversal exploring as deep as possible before backtracking.
    - **Implementation**: Recursion or Stack.
    - **Use Cases**: Path finding, Cycle detection, Connected components, Topological sort, Maze/Grid traversal.
    - **Complexity**: O(V + E).

14. [**Breadth-First Search (BFS)**](https://algomaster.io/learn/dsa/bfs-introduction)
    - **Definition**: Graph traversal exploring level by level.
    - **Implementation**: Queue.
    - **Use Cases**: Shortest path in unweighted graph, Level order traversal, Connected components, Word ladder.
    - **Complexity**: O(V + E).

15. [**Shortest Path**](https://algomaster.io/learn/dsa/shortest-path-introduction)
    - **Definition**: Finding path with minimum weight/edges.
    - **Algorithms**: BFS (Unweighted), Dijkstra (Non-negative weighted), Bellman-Ford (Negative weights), Floyd-Warshall (All-pairs).
    - **Use Cases**: Navigation, Network routing.
    - **Complexity**: BFS O(V+E), Dijkstra O((V+E)logV).

16. [**Matrix Traversal**](https://algomaster.io/learn/dsa/matrix-traversal-introduction)
    - **Definition**: Navigating 2D grids as implicit graphs.
    - **Techniques**: Direction arrays, Boundary checks, DFS/BFS on grid.
    - **Use Cases**: Islands, Path in grid, Spiral traversal, Word search.
    - **Complexity**: O(M * N).

17. [**Backtracking**](https://algomaster.io/learn/dsa/backtracking-introduction)
    - **Definition**: Building solution step-by-step and undoing invalid choices.
    - **Template**: Choose -> Explore -> Unchoose.
    - **Use Cases**: Permutations, Combinations, Subsets, Sudoku, N-Queens, Path finding.
    - **Complexity**: Often Exponential.

18. [**Prefix Search (Trie)**](https://algomaster.io/learn/dsa/tries-introduction)
    - **Definition**: Tree structure for storing strings by shared prefixes.
    - **Structure**: Root -> Nodes with children (map/array) + EndOfWord flag.
    - **Use Cases**: Autocomplete, Spell check, Prefix matching, Word search.
    - **Complexity**: O(L) per operation (L = word length).

19. [**Greedy**](https://algomaster.io/learn/dsa/greedy-introduction)
    - **Definition**: Making locally optimal choice at each step.
    - **Requirements**: Greedy Choice Property, Optimal Substructure.
    - **Use Cases**: Interval scheduling, Fractional Knapsack, Huffman coding, Dijkstra, Prim/Kruskal.
    - **Complexity**: Usually efficient (O(N log N) or O(N)).

20. [**Dynamic Programming Patterns**](https://blog.algomaster.io/p/20-patterns-to-master-dynamic-programming)
    - **Definition**: Breaking problems into overlapping subproblems and caching results.
    - **Patterns**: Fibonacci, Knapsack (0/1, Unbounded), LCS, LIS, Palindromes, Subset Sum, Matrix Chain, Grid DP, Bitmasking, etc.
    - **Use Cases**: Optimization, Counting ways, Min/Max cost/path.
    - **Complexity**: Polynomial (O(N), O(N^2), etc.) vs Exponential brute force.

Resource mentioned: [algomaster.io](https://algomaster.io)
