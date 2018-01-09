# Jump Search

Jump search is an algorithm for searching for elements in a sorted array in $O(\sqrt{N})$ time. The 
main idea behind this algorithm is to continuously take "steps" or "jumps" of elements of $\sqrt{N}$,
where $N$ is the size of the array. By skipping elements of $\sqrt{N}$, we can get to an interval 
close to the key, and then linearly search that interval until we find the key or not.

### Visualization

Since we can only make $\sqrt{N}$ number of these jumps, and even if we have to linearly search in 
that block, we search $\sqrt{N}$ items until we can find if the key exists or not. Thus, this 
algorithm runs in $O(\sqrt{N})$ time.

The following is a visualization of jump search:

```
// Suppose we have the following sorted array a:

1 2 3 4 6 8 9 12 14 16 23 45 67 78 99 100 101

// search(100):

// Since the array is of size 16, we take jumps of sqrt(16) = 4, until
// we reach a point where the jump becomes greater than 100, then we take a
// jump back 4, and linearly search. Let j be the current "jumped" position:

j

1 2 3 4 6 8 9 12 14 16 23 45 67 78 99 100 101

// Since a[j] = 1 < 100, we continue:

        j

1 2 3 4 6 8 9 12 14 16 23 45 67 78 99 100 101

// Since a[j] = 6 < 100, we continue:

                 j

1 2 3 4 6 8 9 12 14 16 23 45 67 78 99 100 101

// Since a[j] = 14 < 100, we continue:

                             j

1 2 3 4 6 8 9 12 14 16 23 45 67 78 99 100 101

// Since a[j] = 67 < 100, we continue:

                                          j

1 2 3 4 6 8 9 12 14 16 23 45 67 78 99 100 101

// Since a[j] = 101 > 100, we take a jump back to index 12 and linearly
search to index 15 until we have found the element or not:

                                j

1 2 3 4 6 8 9 12 14 16 23 45 67 78 99 100 101

// Since a[j] = 78 < 100, we increment j by 1:

                                   j

1 2 3 4 6 8 9 12 14 16 23 45 67 78 99 100 101

// Since a[j] = 99 < 100, we increment j by 1:

                                      j

1 2 3 4 6 8 9 12 14 16 23 45 67 78 99 100 101

// Thus a[j] = 100, so we have found the key.
```

### Implementation 

##### Java

```
package com.algorithmhelper.algorithms.searching;

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

Since we jump sqrtN times to get close to where the searched element is in the array, and only 
linear search an interval of size $\sqrt{N}$, this algorithm runs in $O(\sqrt{N})$ time.

Since it requires two pointers `jump` and `prev`, we need $O(1)$ auxiliary space.

The following describes the time and space complexity of jump search:

```
| Algorithm   | time complexity | space complexity |
|-------------|-----------------|------------------|
| jump search | O(sqrtN)        | O(1)             |
```
