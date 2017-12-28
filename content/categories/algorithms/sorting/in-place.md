# In-Place

In-place, or in-placeness in the context of sorting algorithms refers to whether or not we need 
auxiliary space in order to perform the sort. This is important in the context of memory usage and 
space complexity. We do still need $O(1)$ extra space for auxiliary variables, which are commonly 
pointers.

From Wikipedia:

> [In-place algorithm](https://en.wikipedia.org/wiki/In-place_algorithm) - An in-place algorithm is 
an algorithm which transforms input using no auxiliary data structure. However a small amount of 
extra storage space is allowed for auxiliary variables. The input is usually overwritten by the 
output as the algorithm executes. In-place algorithm updates input sequence only through 
replacement or swapping of elements. An algorithm which is not in-place is sometimes called 
not-in-place or out-of-place.

### Example

The following visualizes a sorting algorithm that is in-place:

```
// Suppose that we had the following nearly sorted array a, and pointers 
// i and j:

        i   j  

1 2 3 4 7 6 5 8 9

// We can swap a[i] and a[j] to bring the array into sorted order. Assuming
// all of the previous elements were done in the same way in this algorithm,
// clearly it is done in-place.
```

