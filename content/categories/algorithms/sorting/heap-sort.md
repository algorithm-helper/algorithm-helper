# Heap Sort

### Visualization

### Implementation

##### Java

```
package com.example;

public class HeapSort<T extends Comparable<T>> {

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

        for (int i = n/2; i >= 1; i--)
            heapifyDown(arr, i, n);

        while (n > 1) {
            swap(arr, 1, n--);
            heapifyDown(arr, 1, n);
        }
    }

    /**
     * Restores the (min) heap invariant by continuously moving i
     * down the heap if it is larger than its two children.
     *
     * @param arr
     * @param i
     * @param n
     */
    private static void heapifyDown(Comparable[] arr, int i, int n) {
        while (2*i <= n) {
            int j = 2*i;
            if (j < n && less(arr, j, j+1)) j++;
            if (!less(arr, i, j))
                break;
            swap(arr, i, j);
            i = j;
        }
    }

    /**
     * Helper function that returns true if the element at index i is
     * less than the element at index j in the array arr, otherwise false.
     *
     * @param arr
     * @param i
     * @param j
     * @return true if the element at index i is less than the element at
     *         index j in the array arr, otherwise false.
     */
    private static boolean less(Comparable[] arr, int i, int j) {
        return arr[i-1].compareTo(arr[j-1]) < 0;
    }

    /**
     * Helper method that swaps the elements at index i and j in the
     * array a.
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

```
```