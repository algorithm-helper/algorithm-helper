# Quick Sort

### Visualization

### Implementation

##### Java

```
package com.example;

import com.example.utils.FisherYatesShuffle;

public class QuickSort {

    /**
     * Sorts the array arr.
     *
     * @param arr, the array to be sorted.
     * @throws IllegalArgumentException if arr is null
     */
    public static void sort(Comparable[] arr) {
        if (arr == null)
            throw new IllegalArgumentException("sort with null arr");

        FisherYatesShuffle.shuffle(arr);
        sort(arr, 0, arr.length - 1);
    }

    /**
     * Helper method that sorts the array arr by partitioning it
     * into two halves, where all elements below the partition index are less
     * than the partition and all elements above the partition index are
     * greater than the partition, and recursively sorts the two partitions.
     *
     * @param arr
     * @param lo
     * @param hi
     */
    private static void sort(Comparable[] arr, int lo, int hi) {
        if (hi <= lo)
            return;

        int j = partition(arr, lo, hi);
        sort(arr, lo, j-1);
        sort(arr, j+1, hi);
    }

    /**
     * Helper function that partitions the array and returns the index j
     * of the element such that all elements at indices below j are less
     * than the element and that all elements at indices above j are
     * greater than the element.
     *
     * @param arr
     * @param lo
     * @param hi
     * @return the index j of the element such that all elements at
     *         indices below j are less than the element and that all
     *         elements at indices above j are greater than the element.
     */
    private static int partition(Comparable[] arr, int lo, int hi) {
        int i = lo;
        int j = hi + 1;
        Comparable first = arr[lo];

        while (true) {
            while (less(arr[++i], first)) {
                if (i == hi)
                    break;
            }

            while (less(first, arr[--j])) {
                if (j == lo)
                    break;
            }

            if (i >= j)
                break;

            swap(arr, i, j);
        }
        swap(arr, lo, j);
        return j;
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

### Implementation (Three-Way)

##### Java

```
package com.example;

import com.example.utils.FisherYatesShuffle;

public class QuickSortThreeWay {

    /**
     * Sorts the array arr.
     *
     * @param arr, the array to be sorted.
     * @throws IllegalArgumentException if arr is null
     */
    public static void sort(Comparable[] arr) {
        if (arr == null)
            throw new IllegalArgumentException("sort with null arr");

        FisherYatesShuffle.shuffle(arr);
        sort(arr, 0, arr.length - 1);
    }

    /**
     * Helper function that sorts the array by partitioning it such that
     * elements less than the partition index are strictly less than the
     * partition element, elements greater than the gt index are strictly
     * greater than the partition, and elements within the index and the gt
     * index are equal to the partition element.
     *
     * @param arr
     * @param lo
     * @param hi
     */
    private static void sort(Comparable[] arr, int lo, int hi) {
        if (hi <= lo)
            return;

        int lt = lo;
        int gt = hi;
        Comparable first = arr[lo];
        int i = lo;

        while (i <= gt) {
            int cmp = arr[i].compareTo(first);

            if (cmp < 0)
                swap(arr, lt++, i++);
            else if (cmp > 0)
                swap(arr, i, gt--);
            else
                i++;
        }

        sort(arr, lo, lt-1);
        sort(arr, gt+1, hi);
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