# Divide and Conquer

Divide and conquer is a technique commonly used in algorithm design for recursively breaking down a 
large problem in smaller, more easily computable subproblems, which as a whole form the complete 
solution.

From Wikipedia:

> [Divide and conquer](https://en.wikipedia.org/wiki/Divide_and_conquer_algorithm) - Divide and 
conquer (D&C) is an algorithm design paradigm based on multi-branched recursion. A divide and 
conquer algorithm works by recursively breaking down a problem into two or more sub-problems of the 
same or related type, until these become simple enough to be solved directly. The solutions to the 
sub-problems are then combined to give a solution to the original problem.

One example of divide and conquer is from binary search. We recursively break down the problem space 
into halves, thereby eliminating the other half each time. Each half can be considered a smaller 
subproblem, until we reach some base case that can terminate the recursion, which in this case is 
when the middle element is equal to the searched element or when the `lo` and `hi` pointers cross.

### Visualization

The following is a very general visualization of what a divide and conquer sorting algorithm might 
look like (it is similar to [Merge Sort](/categories/algorithms/sorting/merge-sort)):

```
// Suppose we had an unsorted array a:
[1, 4, 6, 2, 5, 9, 10, 3]

// We could break it down into smaller subproblems like so, and sort the 
// smaller subarrays rather than the entire array, and then combine the 
// solutions:
[1, 4, 6, 2] [5, 9, 10, 3]

// We could break it down further into smaller subproblems like so, and sort 
// the even smaller subarrays:
[1, 4] [6, 2] [5, 9] [10, 3]
[1, 4] [2, 6] [5, 9] [3, 10]

// Then we can combine the solutions of the smaller subproblems:
[1, 2, 4, 6] [3, 5, 9, 10]

// Then we can combine the solutions of the smaller subproblems:
[1, 2, 3, 4, 5, 6, 9, 10]

// Now the array a is in sorted order.
```