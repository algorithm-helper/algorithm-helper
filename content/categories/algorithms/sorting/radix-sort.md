# Radix Sort

### Visualization

### Implementation

##### Java

```
package com.example;

public class RadixSort {

    /**
     * Sorts the array arr.
     *
     * @param arr, the array to be sorted.
     * @throws IllegalArgumentException if arr is null
     */
    public static void sort(int[] arr) {
        if (arr == null)
            throw new IllegalArgumentException("sort with null arr");

        int n = arr.length;
        int maxValue = maxValue(arr);

        for (int exp = 1; maxValue / exp > 0; exp *= 10)
            bucketSort(arr, n, exp);
    }

    /**
     * Helper method that bucket sorts the array based on
     * a particular digit, represented by the exp to 10.
     *
     * @param arr
     * @param n
     * @param exp
     */
    private static void bucketSort(int[] arr, int n, int exp) {
        int out[] = new int[n];
        int[] bucket = new int[10];

        for (int i = 0; i < 10; i++)
            bucket[i] = 0;

        for (int i = 0; i < n; i++)
            bucket[(arr[i]/exp) % 10]++;

        for (int i = 1; i < 10; i++)
            bucket[i] += bucket[i-1];

        for (int i = n-1; i >= 0; i--) {
            arr[i] = bucket[(arr[i]/exp)%10] - 1;
            bucket[(arr[i]/exp)%10 ]--;
        }
    }

    /**
     * Helper function to find the max element in an array
     * of integers.
     *
     * @param arr, the array of integers
     * @return the max element in an array of integers
     */
    private static int maxValue(int[] arr) {
        int max = Integer.MIN_VALUE;
        for (int i : arr) {
            if (arr[i] > max)
                max = i;
        }
        return max;
    }
}
```

### Time Complexity

```
```