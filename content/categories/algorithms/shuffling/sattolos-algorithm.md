# Sattolo's Algorithm

Sattolo's algorithm is a shuffling algorithm that is a variant and very similar to the Fisher-Yates 
shuffle except that it results in a single cycle of numbers. 

A cycle in this context refers to elements' indices pointing to other elements and form a cycle. An 
example is an array `a = [0, 4, 1, 3, 2]`. We see that `a[0]` refers to itself (`0 -> 0 -> ... 0`), 
`a[3]` refers to itself (`3 -> 3 -> ... 3`) but `a[1]` forms a cycle 
(`4 -> 2 -> 1 -> 4 -> 2 -> 1 ...`).

Sattolo's modification to Fisher-Yates shuffle is that instead of choosing a number in `[i, n-1]`, 
we choose between `[i+1, n-1]`, which intuitively can be seen as that elements cannot be 
"randomized" to themselves, or in other words, they cannot have the same original position.

### Pseudocode

The following is pseudocode for Sattolo's algorithm:

```
for i from 0 to n-2:
  r : random number between i+1 and n-1 inclusive
  swap A[i] and A[r]
```

The implication behind this algorithm is that it is biased, because of the fact that we lose all 
permutations where any element is in the same position as it was in the original array. Whereas in 
Fisher-Yates shuffle we can get all $N!$ permutations, in Sattolo's algorithm we only get $(N-1)!$ 
permutations.

But likewise with Fisher-Yates, this algorithm runs in $O(N)$ time.

### Implementation

##### Java

```
package com.algorithmhelper.algorithms.shuffling;

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

The time complexity of Sattolo's algorithm is $O(N)$ since we do a random swap for each of the $N$ 
elements in the array.

Since we just require a temporary variable `temp` to faciliate swapping elements, it requires $O(1)$ 
auxiliary space.

```
| Algorithm           | time complexity | space complexity |
|---------------------|-----------------|------------------|
| sattolo's algorithm | O(N)            | O(1)             |
```