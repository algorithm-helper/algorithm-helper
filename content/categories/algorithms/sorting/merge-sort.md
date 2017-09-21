# Merge Sort

### Visualization

### Implementation

##### Java

```
package com.example;

public class MergeSort {

    /**
     * Sorts the array arr.
     *
     * @param arr, the array to be sorted.
     * @throws IllegalArgumentException if arr is null
     */
    public static Comparable[] sort(Comparable[] arr) {
        if (arr == null)
            throw new IllegalArgumentException("sort with null arr");

        int n = arr.length;
        if (n == 1)
            return arr;

        Comparable[] left = new Comparable[n/2];
        Comparable[] right = new Comparable[n - n/2];

        for (int i = 0; i < left.length; i++)
            left[i] = arr[i];
        for (int i = 0; i < right.length; i++)
            right[i] = arr[i + n/2];

        return merge(sort(left), sort(right));
    }

    /**
     * Helper function that returns a sorted merged array of two sorted
     * arrays a and b.
     *
     * @param a, the first sorted array
     * @param b, the second sorted array
     * @return a sorted merged array of two sorted arrays a and b.
     */
    private static Comparable[] merge(Comparable[] a, Comparable[] b) {
        Comparable[] c = new Comparable[a.length + b.length];
        int i = 0;
        int j = 0;
        for (int k = 0; k < c.length; k++) {
            if (i >= a.length)
                c[k] = b[j++];
            else if (j >= b.length)
                c[k] = a[i++];
            else if (a[i].compareTo(b[j]) <= 0)
                c[k] = a[i++];
            else
                c[k] = b[j++];
        }
        return c;
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

### Implementation (Bottom-Up)

##### Java

```
package com.example;

public class MergeSortBottomUp {

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
        Comparable[] aux = new Comparable[n];
        for (int i = 1; i < n; i *= 2) {
            for (int lo = 0; lo < n - i; lo += 2*i) {
                int mid = lo + i -1;
                int hi = Math.min(lo + 2*i - 1, n-1);
                merge(arr, aux, lo, mid, hi);
            }
        }

    }

    /**
     * Helper function that merges array arr, keeps stablility using
     * an auxiliary array aux.
     *
     * @param arr
     * @param aux
     * @param lo
     * @param mid
     * @param hi
     */
    private static void merge(Comparable[] arr, Comparable[] aux,
                              int lo, int mid, int hi) {
        for (int i = lo; i <= hi; i++)
            aux[i] = arr[i];

        int i = lo;
        int j = mid + 1;
        
        for (int k = lo; k <= hi; k++) {
            if (i > mid)
                arr[k] = aux[j++];
            else if (j > hi)
                arr[k] = aux[i++];
            else if (less(aux[j], aux[i]))
                arr[k] = aux[j++];
            else
                arr[k] = aux[i++];
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