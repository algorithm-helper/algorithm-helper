# Binary Search

### Visualization

### Implementation 

##### Java

```
package com.example;

public class BinarySearch {

    /**
     * Returns the index of the search key x in the sorted array arr, or
     * -1 if the key is not found.
     *
     * @param arr, the array to be searched in
     * @param x, the key to be searched for
     * @return the index of the search key x in the array arr, or
     *         -1 if the key is not found
     * @throws IllegalArgumentException if arr is null
     * @throws IllegalArgumentException if x is null
     */
    public static int search(Comparable[] arr, Comparable x) {
        if (arr == null)
            throw new IllegalArgumentException("search with null arr");
        if (x == null)
            throw new IllegalArgumentException("search with null x");

        int lo = 0;
        int hi = arr.length - 1;
        while (lo <= hi) {
            int mid = lo + (hi - lo)/2;

            int cmp = x.compareTo(arr[mid]);

            if (cmp < 0)
                hi = mid - 1;
            else if (cmp > 0)
                lo = mid + 1;
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