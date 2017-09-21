# Sattolo's Algorithm

### Visualization

### Implementation

##### Java

```
package com.example;

public class SattoloShuffle {

    /**
     * Shuffles the elements in array arr in uniformly random
     * order with Java's Math.random() to generate pseudorandom
     * numbers.
     *
     * @param arr, the array to be shuffled
     * @throws IllegalArgumentException if the arr is null
     */
    public static void shuffle(Comparable[] arr) {
        if (arr == null)
            throw new IllegalArgumentException("shuffle with null arr");

        int n = arr.length;
        for (int i = n; i > 1; i--) {
            int random = (int) (Math.random() * (i-1));
            Comparable temp = arr[random];
            arr[random] = arr[i-1];
            arr[i-1] = temp;
        }
    }
}
```

### Time Complexity

```
```