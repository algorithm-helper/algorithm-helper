# Fisher-Yates Shuffle

### Visualization

### Implementation

##### Java

```
package com.example;

public class FisherYatesShuffle {

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
        for (int i = 0; i < n-1; i++) {
            int random = (int) (Math.random() * (n - 1));
            Comparable swap = arr[random];
            arr[random] = arr[i];
            arr[i] = swap;
        }
    }
}
```

### Time Complexity

```
```