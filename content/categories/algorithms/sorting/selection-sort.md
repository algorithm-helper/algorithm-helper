# Selection Sort

### Visualization

### Implementation

##### Java

```
package com.example;

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
     * Helper function that returns true if x is less than y, otherwise
     * false.
     *
     * @param x
     * @param y
     * @return true if x is less than y, otherwise false
     */
    private static boolean less(Comparable x, Comparable y) {
        return x.compareTo(y) < 0;
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