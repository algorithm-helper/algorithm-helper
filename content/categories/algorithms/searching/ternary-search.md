# Ternary Search

Ternary search is an algorithm for finding the maximum or minimum element in a unimodal function in 
$O(logN)$ time. A unimodal function is one that has one minimum or one maximum, in other words, one 
mode. 

For example, suppose we have a function $f$. We know that some maximum lies between the interval 
$[A, B]$. They have the property that:

- For all $a$, $b$ such that $A <= a < b <= x$, $f(a) < f(b)$
- For all $a$, $b$ such that $x <= a < b <= B$, $f(a) > f(b)$

### Visualization

The main idea behind ternary search is that with indices `lo` and `hi`, which represent the first 
index and last index respectively, we divide the array into three intervals with indices `m` and 
`n` so that we get the intervals: `[lo...m]`, `[m+1...n]` and `[n+1...hi]`. Let the unimodal 
function be `f`. If `f(m) < f(n)`, then we know that the mode cannot be located in the interval 
`[lo...m]`, so we only search the other two intervals. Similarly, if `f(m) > f(n)`, then we know 
that the mode cannot be located in the interval `[n+1...hi]`, so we only search the other two 
intervals.

By continuously doing this, we will get to a point where the `f(m)` and `f(n)` are close to each 
other, then we can take the middle of the two to determine the mode. Note that this applies in the 
case of a continuous unimodal function. We implement this but use an array to represent a discrete 
unimodal function.

Similar to binary search, since we are continuously splitting the array into three intervals, we can 
only at most split it at most $log_3N$ times. Thus, this algorithm runs in $O(logN)$ time.

The following is a visualization of ternary search:

```
// Suppose we have the following array a which represents a discrete unimodal 
// function:
1 2 3 4 5 6 7 8 9 100 9 8 7 6 4 3 2 1 1 1 0

// mode():

// Then lo = 0, hi = 21, m = 7, n = 14:

lo            m               n           hi   

1 2 3 4 5 6 7 8 9 100 9 8 7 6 4 3 2 1 1 1 0

// Since a[m] = 8 > a[n] = 4, we know that the mode must be contained in the
// interval [lo...n-1]:

lo      m          n        hi  

1 2 3 4 5 6 7 8 9 100 9 8 7 6 4 3 2 1 1 1 0

// Since a[m] = 5 < a[n] = 100, we know that the mode must be contained in the
// interval [m+1...hi]:

          lo    m     n     hi  

1 2 3 4 5 6 7 8 9 100 9 8 7 6 4 3 2 1 1 1 0

// Now that we have m and n sufficiently close (only one apart), we can say
// that the mode must be between m and n, which is 100. Thus we have found
// the mode.
```

### Implementation 

##### Java

```
package com.algorithmhelper.algorithms.searching;

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

Intuitively, since we can divide the array at most $log_3N$ times, thus this algorithm runs in 
$O(logN)$ time.

Since it requires four pointers (`left`, `right`, `leftThird`, `rightThird`), we need $O(1)$ 
auxiliary space. Since it requires four pointers (`left`, `right`, `leftThird`, `rightThird`), 
we need $O(1)$ auxiliary space.

The following describes the time and space complexity of ternary search:

```
| Algorithm      | time complexity | space complexity |
|----------------|-----------------|------------------|
| ternary search | O(logN)         | O(1)             |
```