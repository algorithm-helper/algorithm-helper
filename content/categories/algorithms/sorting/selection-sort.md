# Selection Sort

Selection sort is a sorting algorithm based on the idea of iterating through an array and swapping 
the current element with the minimum element from that index to the end of the array. It is an 
in-place, comparison sort.

### Visualization

The following visualizes selection sort:

```
// Suppose we have the unordered array a:

a = [1, 5, 7, 2, 0, -1]

// Swap a[0] = 1 with the minimum element from a[1...5]:

[-1, 5, 7, 2, 0, 1]

// Swap a[1] = 5 with the minimum element from a[2...5]:

[-1, 0, 7, 2, 5, 1]

// Swap a[2] = 7 with the minimum element from a[3...5]:

[-1, 0, 1, 2, 5, 7]

// Swap a[3] = 2 with the minimum element from a[4...5] (which is already 2):

[-1, 0, 1, 2, 5, 7]

// Swap a[4] = 5 with the minimum element from a[5...5] (which is already 5):

[-1, 0, 1, 2, 5, 7]

// Now the array a is in sorted order.
```

Selection sort is generally implemented with two for loops: one that iterates through the elements 
of the array (at index $i$), and the other that iterates through the elements of the array from 
index $i$ until the end of the array, looking for the next minimum element, `min`.

It is clear that other than requiring $O(1)$ space to hold `min`, we do not need extra space. But 
for time complexity, if we calculate the number of comparisons that we are making:

$number\,of\,comparisons = (N - 1) + (N - 2) + ... + 2 + 1$

$= N(N - 1)/2$

$= (N^2 - N)/2$

$= O(N^2)$

This algorithm takes $O(N^2)$ time.

The advantages of this algorithm are that it is very simple to implement, understand, is in-place 
and requires $O(1)$ space. But consider situations where elements are already in order, then 
selection sort still takes $O(N^2)$ time. However, it is not stable because it swaps non-adjacent 
elements.

### Implementation

##### Java

```
package com.algorithmhelper.algorithms.sorting;

public class SelectionSort {

    /**
     * Sorts the array arr.
     *
     * @param arr, the array to be sorted.
     * @throws IllegalArgumentException if arr is null
     */
    public static void sort(Comparable[] arr) {
        if (arr == null)
            throw new IllegalArgumentException("sort with null arr");

        int n = arr.length;

        for (int i = 0; i < n; i++) {
            int min = i;
            for (int j = i+1; j < n; j++) {
                if (less(arr[j], arr[min]))
                    min = j;
            }
            swap(arr, i, min);
        }
    }

    /**
     * Helper function that returns true if x is less than y, otherwise false.
     *
     * @param x
     * @param y
     * @return true if x is less than y, otherwise false
     */
    private static boolean less(Comparable x, Comparable y) {
        return x.compareTo(y) < 0;
    }

    /**
     * Helper method that swaps the elements at index i and j in the array a.
     *
     * @param arr
     * @param i
     * @param j
     */
    private static void swap(Comparable[] arr, int i, int j) {
        Comparable temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }
}
```

### Time Complexity

This algorithm takes $O(N^2)$ time in the worst case.

It requires a variable `min`, and thus requires $O(1)$ auxiliary space.

It is in-place, and not stable.

```
| Algorithm      | time complexity | space complexity | in-place | stable | type       |
|----------------|-----------------|------------------|----------|--------|------------|
| selection sort | O(N^2)          | O(1)             | yes      | no     | comparison |
```