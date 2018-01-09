# Fisher-Yates Shuffle

Fisher-Yates shuffle, also called Knuth shuffle, is one of the most commonly used shuffling 
algorithms, with the property that it can lead to all permutations to occur, all permutations are 
equally likely, and is in-place.

### Pseudocode

The following is pseudocode for Fisher-Yates shuffle:

```
A : the unshuffled array
n : the length of A

for i from 0 to n-2:
  r : random number between i and n-1 inclusive
  swap A[i] and A[r]
```

Note that the reason why we stop the for loop at `n-2` is because by the time we reach `i = n-1`, 
when we pick `r`, it has no other choice than to be `n-1` itself.

The intuition behind why this algorithm works is by considering the probability of elements being 
chosen at each iteration of `i`. When `i = 0`, all of the remaining items have the same `1/n` chance 
of being selected. When `i = 1`, since we took on element out, it follows that we only have `n-1` 
elements left to choose, and since we are choosing from elements at `[1...n-1]`, all of the elements 
have again the same chance of being selected (`1/(n-1)`), and so on, until we have one element left.

One thing to note is that this algorithm is limited to the randomness of the the random number 
generator itself, as well as how efficient it is. We assume that it generates the number in $O(1)$ 
time. Since we generate a random number $f$ or each element in the array and swaps take $O(1)$ time, 
this algorithm runs in $O(N)$ time.

### Implementation

##### Java

```
package com.algorithmhelper.algorithms.shuffling;

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
            Comparable temp = arr[random];
            arr[random] = arr[i];
            arr[i] = temp;
        }
    }
}
```

### Time Complexity

The time complexity of Fisher-Yates shuffle is $O(N)$ since we do a random swap for each of the $N$ 
elements in the array.

Since we just require a temporary variable `temp` to faciliate swapping elements, it requires $O(1)$ 
auxiliary space.

```
| Algorithm            | time complexity | space complexity |
|----------------------|-----------------|------------------|
| fisher-yates shuffle | O(N)            | O(1)             |
```