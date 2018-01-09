# Binary Search

Binary search is an algorithm for searching for elements in a sorted array in $O(logN)$ time. It is 
commonly used as it is fairly straightforward to implement and is intuitive, because it is generally 
how humans search in a sorted list of elements, like a dictionary.

The main idea behind the algorithm is to continuously divide up the problem space into two halves, 
the left and the right, and the index to the `mid`. Suppose we have an array `a`, and are searching 
for an element `x`. If `a[mid] = x`, then we are done. If `x < a[mid]`, then we can take advantage 
of the property that the array is in sorted order by eliminating all elements greater than `a[mid]` 
because we know that they will all be greater than `x`. Then we continue to search in the left half. 
On the other hand, if `x > a[mid]`, then we eliminate all elements less than `a[mid]`, and only 
search on the right half.

### Visualization

Since we have an ordered array, we set `lo` to be the first index, `hi` to be the last index and 
`mid` to be the middle index. We know that all elements in `[lo...mid-1]` must be less than (or 
equal to) the middle element, and that all elements in `[mid+1...hi]` must be greater than (or 
equal to) the middle element. Thus if we compare the searched element to the middle element, 
depending on whether it is less or greater, we search the left half (elements in `[lo...mid-1]`) or 
the right half (elements in `[mid+1...hi]`), effectively halving our problem space every time.

The following is a visualization of binary search:

```
// Suppose we had the following sorted array a:
1 2 3 4 6 8 9 12 14 16 23 45 67

// search(45):

// Then lo = 0, hi = 12, mid = 6:

lo          mid              hi

1 2 3 4 6 8 9 12 14 16 23 45 67

// Since 45 > a[mid] = 9, we change lo to be mid+1, and recalculate mid:

              lo    mid      hi

1 2 3 4 6 8 9 12 14 16 23 45 67

// Since 45 > a[mid] = 16, we change lo to be mid+1, and recalculate mid:

                       lo mid hi

1 2 3 4 6 8 9 12 14 16 23 45 67

// 45 = a[mid], thus we have found 45.
```

### Implementation 

##### Java

```
package com.algorithmhelper.algorithms.searching;

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

Intuitively, we can halve at most $logN$ times, and thus this algorithm runs in $O(logN)$ time.

Since it requires three pointers (`lo`, `mid`, and `hi`), we need $O(1)$ auxiliary space.

The following describes the time and space complexity of binary search:

```
| Algorithm     | time complexity  | space complexity |
|---------------|------------------|------------------|
| binary search | O(logN)          | O(1)             |
```