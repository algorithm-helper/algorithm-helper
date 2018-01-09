# Insertion Sort

Insertion sort is a sorting algorithm based on the idea of iterating through the array with index 
$i$ and keeping the invariant that all elements to the left of $i$ are sorted, and all elements to 
the right of $i$ must be inserted into the subarray $[0...i]$. "Inserting" is essentially an 
operation to insert an element $i$ into the correct place in an already sorted array.

The `insert` operation can be implemented as a helper function, but in the implementations, it is 
done, but rather done with the main algorithm because it is simple. This algorithm works because of 
the invariant that inserting an element into a sorted array results in a sorted array, and it we 
keep growing the size of the sorted subarray, it will eventually result in the entire array being 
sorted.

Insertion sort can run in $O(N)$ time if the array has the property that it has a low amount of 
inversions. An inversion in an array is where two elements are out of order:

From Wikipedia:

> [Inversion](https://en.wikipedia.org/wiki/Inversion_%28discrete_mathematics%29) - A sequence has 
an inversion where two of its elements are out of their natural order.

### Visualization

The following visualizes insertion sort:

```
// Suppose we have the unordered array a:

a = [1, 5, 7, 2, 0, -1]

// Insert a[1] = 5 into the (trivially) sorted subarray a[0..0]:

a = [1, 5, 7, 2, 0, -1]

// Insert a[2] = 7 into the sorted subarray a[0..1]:

a = [1, 5, 7, 2, 0, -1]

// Insert a[3] = 2 into the sorted subarray a[0..2]:

a = [1, 2, 5, 7, 0, -1]

// Insert a[4] = 0 into the sorted subarray a[0..3]:

a = [0, 1, 2, 5, 7, -1]

// Insert a[5] = -1 into the sorted subarray a[0..4]:

a = [-1, 0, 1, 2, 5, 7]

// Now the array a is in sorted order.
```

The advantage to insertion sort is its performance in situations where the array is already in 
near-sorted order, or in other words, with a small number of inversions. Intuitively, this is 
because `insert` then becomes more efficient, as it does not need to traverse a large number of 
elements in the sorted subarray to find the correct position to insert. 

Another advantage to insertion sort is that it is stable and in-place. It is clear to see why it is 
stable, since the algorithm does not swap elements that are identical.

Its simplicity means that it has much less overhead than the more complicated algorithms below, and 
in-practice, for a small number of elements, insertion sort is faster, and usually other more 
advanced algorithms "cut-off" to insertion sort if the number of elements is below a certain number.

### Implementation

##### Java

```
package com.algorithmhelper.algorithms.sorting;

public class InsertionSort {

    /**
     * Sorts the array arr.
     *
     * @param arr, the array to be sorted.
     * @throws IllegalArgumentException if arr is null
     */
    public static void sort(Comparable[] arr) {
        int n = arr.length;
        for (int i = 0; i < n; i++) {
            for (int j = i; j > 0; j--) {
                if (less(arr[j], arr[j-1]))
                    swap(arr, j, j-1);
                else
                    break;
            }
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

It requires $O(1)$ auxiliary space.

It is in-place and stable.

```
| Algorithm      | time complexity | space complexity | in-place | stable | type       |
|----------------|-----------------|------------------|----------|--------|------------|
| insertion sort | O(N^2)          | O(1)             | yes      | yes    | comparison |
```