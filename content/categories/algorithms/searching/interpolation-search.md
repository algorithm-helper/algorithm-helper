# Interpolation Search

### Visualization

### Implementation 

##### Java

```
package com.example;

public class InterpolationSearch {

    /**
     * Returns the index of the search key x in the sorted array arr, or
     * -1 if the key is not found.
     *
     * @param arr, the array to be searched in
     * @param x, the key to be searched for
     * @return the index of the search key x in the array arr, or
     *         -1 if the key is not found
     * @throws IllegalArgumentException if arr is null
     */
    public static int search(int[] arr, int x) {
        if (arr == null)
            throw new IllegalArgumentException("search with null arr");

        int lo = 0;
        int hi = arr.length - 1;

        while (lo <= hi && x >= arr[lo] && x <= arr[hi]) {

            int mid = lo + (int)(((double) (hi - lo) / (arr[hi] - arr[lo])) *
                    (x - arr[lo]));

            if (arr[mid] < x)
                lo = mid + 1;
            else if (arr[mid] > x)
                hi = mid - 1;
            else
                return mid;
        }
        return -1;
    }

}
```

### Time Complexity

```
```