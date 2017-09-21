# Jump Search

### Visualization

### Implementation 

##### Java

```
package com.example;

public class JumpSearch {

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

        int jump = (int) Math.sqrt(arr.length);

        int prev = 0;
        while (arr[Math.min(jump, arr.length) - 1].compareTo(x) == -1) {
            prev = jump;
            jump += (int) Math.sqrt(arr.length);
            if (prev >= arr.length)
                return -1;
        }

        while (arr[prev].compareTo(x) == -1) {
            prev++;

            if (prev == Math.min(jump, arr.length))
                return -1;
        }

        if (arr[prev] == x)
            return prev;
        return -1;
    }

}
```

### Time Complexity

```
```