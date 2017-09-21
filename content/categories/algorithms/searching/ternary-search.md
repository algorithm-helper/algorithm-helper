# Ternary Search

### Visualization

### Implementation 

##### Java

```
package com.example;

public class TernarySearch {

    /**
     * Returns the index of the minimum or maximum element of the discrete
     * unimodal function represented by arr.
     *
     * @param arr, the array to be searched in
     * @return the index of the minimum or maximum element of the discrete
     *         unimodal function represented by arr
     * @throws IllegalArgumentException if arr is null
     * @throws IllegalArgumentException if x is null
     */
    public static int search(Comparable[] arr) {
        if (arr == null)
            throw new IllegalArgumentException("search with null arr");

        int left = 0;
        int right = arr.length - 1;

        while (true) {

            if (left == right)
                return (left + right)/2;

            int leftThird = left + (right - left)/3;
            int rightThird = right - (right - left)/3;

            int cmp = arr[leftThird].compareTo(arr[rightThird]);

            if (cmp < 0)
                left = leftThird;
            else
                right = rightThird;
        }
    }
}
```

### Time Complexity

```
```