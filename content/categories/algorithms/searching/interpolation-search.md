# Interpolation Search

Interpolation search is an algorithm for searching for elements in a sorted array that are evenly 
distributed, in $O(loglogN)$ time on average. The main idea behind this algorithm is to take advantage 
of the fact that the elements are evenly distributed, for example, if the array is a linearly 
increasing sequence of numbers. Given two endpoints into this array, for example at index `lo` and
`hi`, which are the first index and last index respectively, we can take `y = mx + b` (where `x` 
represents the index numbers and `y` represents the value at that index number) to interpolate, or 
in other words, to approximate where the key will be.

### Visualization

On average, this algorithm runs in $O(loglogN)$ time when we have an evenly distributed, sorted 
array. It is intuitive why this algorithm would be faster than binary search for this case, and why 
its time complexity is better than $O(logN)$. 

While with binary search we take successive halves one after the other, it has no other method to 
approximate the location of the searched key except the fact that we know that we can eliminate half 
the problem space each time. Whereas with interpolation search, taking `y = mx + b` can, in $O(1)$ 
time, approximate the linear relationship of the data as a whole. This linear approximation is 
useful because by interpolating into the index of where the key "ought" to be, we get close to the 
key.

The following is a visualization of interpolation search:

```
// Suppose we have the following sorted array a where the keys are 
// uniformly distributed:

2 4 6 8 9 10 13 15 16 17 18 20 21 22 24 25 27 29 30

// search(23):

// We have lo = 0, hi = 18, a[lo] = 2, a[hi] = 30:

lo                    mid                        hi

2 4 6 8 9 10 13 15 16 17 18 20 21 22 24 25 27 29 30

// Then the line y = mx + b can be found with the formula:
// y - y0 = m(x - x0), where m is the slope, and m = (y1 - y0)/(x1 - x0)
// Then:
// m = (30 - 2) / (18 - 0) = 28/18
// Then the equation becomes:
// y - 2 = 28/18 * (x - 0)
// y = 28/18 * x + 2

// Then given that the search key is 23, we set y = 23 and solve for x,
// which gives us the interpolation for the correct index:

// 23 = 28/18 * x + 2
// x = 21 * 18 / 28
// x = 13.5 = 13 (rounded down)

// Then we go to index 13:

                                  lo    mid      hi

2 4 6 8 9 10 13 15 16 17 18 20 21 22 24 25 27 29 30

// We have lo = 13, hi = 18, a[lo] = 23, a[hi] = 30:
// Then the line y = mx + b can be found with the formula:
// y - y0 = m(x - x0), where m is the slope, and m = (y1 - y0)/(x1 - x0)
// Then:
// m = (30 - 23) / (18 - 13) = 7/5
// Then the equation becomes:
// y - 23 = 7/5 * (x - 13)
// y = 7/5 * x + 4.8

// Then given that the search key is 23, we set y = 23 and solve for x,
// which gives us the interpolation for the correct index:

// 23 = 7/5 * x + 4.8
// x = 18.2 * 5 / 7
// x = 13

// Then we go to index 13, but clearly since we were here before, it must
// be that the key 23 does not exist in the array.

                                  hi
                                  mid
                                  lo

2 4 6 8 9 10 13 15 16 17 18 20 21 22 24 25 27 29 30
```

It is important to note that for non-uniformly distributed elements, this strategy fails. Consider 
elements that follow an exponential function, then interpolation search is analogous to continuously 
taking the slope at an index, or taking the derivative of the function. But the derivative of an 
exponential function is generally some constant multiplied by itself.

If we continuously take the derivative of the index to find the next index, intuitively we would 
have to do this $N$ times until we reach the end. Thus in in this case, this algorithm runs in 
$O(N)$ time.

### Implementation 

##### Java

```
package com.algorithmhelper.algorithms.searching;

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

The time complexity of this algorithm is $O(loglogN)$.

Since it requires three pointers (`lo`, `mid`, and `hi`), we need $O(1)$ auxiliary space.

```
| Algorithm            | time complexity | space complexity |
|----------------------|-----------------|------------------|
| interpolation search | O(loglogN)      | O(1)             |
```