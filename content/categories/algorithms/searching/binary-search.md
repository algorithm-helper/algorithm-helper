# Binary Search

Binary search is an algorithm for searching for elements in a sorted array in `O(lgN)` time. It is 
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

View the source code [here](https://github.com/algorithm-helper/implementations/blob/master/java/com/algorithmhelper/algorithms/searching/BinarySearch.java).

<script src="https://gist.github.com/eliucs/a0f6788d17be8bf616cab52ef81cf658.js"></script>

### Time Complexity

Intuitively, we can halve at most `lgN` times, and thus this algorithm runs in `O(lgN)` time.

Since it requires three pointers (`lo`, `mid`, and `hi`), we need `O(1)` auxiliary space.

The following describes the time and space complexity of binary search:

```
| Algorithm     | time complexity | space complexity |
|---------------|-----------------|------------------|
| binary search | O(lgN)          | O(1)             |
```