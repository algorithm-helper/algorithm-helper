# Heap Sort

Heap sort is a sorting algorithm based on the idea of using heaps, specifically max heaps for 
sorting an array through the heap operations `heapifyDown`. More on this can be found in the article 
on [Heaps](/categories/data-structures/trees/heap).

The approach to using a heap is that from the array, we build up the heap structure, in-place. Then 
we continuously swap the top of the max heap (which is the largest element in the heap) with the 
last element in the array. We then "remove" that element from the heap and into the finalized array 
by decrementing the size of the heap.

Then we apply the operation `heapifyDown` on the current root element of the heap, and continue this 
process until the heap is of size 0. The correctness of this algorithm can be seen intuitively, if 
we move the root of the max heap, which is the current max element, to the back of the heap, then in 
the finalized array that element must be in the correct position.

Since heaps are completely balanced binary trees, the height of a heap is at most $logN$. 
Furthermore, when we call the `heapifyDown` operation, the most we must displace a wrongly 
positioned root item is at the bottom of the heap, so this element must travel the height of the 
tree. Intuitively, since the height is $logN$, and we must do this for all the $N$ items, this 
algorithm's running time is $O(NlogN)$.

### Visualization

The following visualizes heap sort:

```
// Suppose we have the unordered array a:

a = [9, 5, 7, 12, 0, -1, 8]

// This corresponds to the following tree structure:

                     9
                  /     \
                 5       7
                / \     / \
              12   0  -1   8

// But we must construct a heap out of this, so we apply heapifyDown on the
// elements:

// heapifyDown from 9 does nothing:

a = [9, 5, 7, 12, 0, -1, 8]

// heapifyDown from 5 swaps it with 12, and swaps 12 with 9:

a = [12, 9, 7, 5, 0, -1, 8]

// heapifyDown from 7 swaps it with 8:

a = [12, 9, 8, 5, 0, -1, 7]

// This corresponds to the following tree structure, which is a valid max heap:

                     12
                  /     \
                 9       8
                / \     / \
               5   0  -1   7

// Swap the root element with the last element in the heap, then remove the
// last element from the heap:

                     7
                  /     \
                 9       8
                / \     / \
               5   0  -1   12

                     7
                  /     \
                 9       8
                / \     / \
               5   0  -1   

// Then we heapifyDown from the root:

                     9
                  /     \
                 7       8
                / \     / \
               5   0  -1   

// Now the final array a looks like this, with 12 in the correct final position:

a = [9, 7, 8, 5, 0, -1, 12]

// Swap the root element with the last element in the heap, then remove the
// last element from the heap:

                    -1
                  /     \
                 7       8
                / \     / \
               5   0   9   

                    -1
                  /     \
                 7       8
                / \     / \
               5   0      

// Then we heapifyDown from the root:

                     8
                  /     \
                 7      -1
                / \     / \
               5   0      

// Now the final array a looks like this, with 9 in the correct final position:

a = [8, 7, -1, 5, 0, 9, 12]

// Swap the root element with the last element in the heap, then remove the
// last element from the heap:

                     0
                  /     \
                 7      -1
                / \     / \
               5   8      

                     0
                  /     \
                 7      -1
                / \     / \
               5         

// Then we heapifyDown from the root:

                     7
                  /     \
                 0      -1
                / \     / \
               5         

                     7
                  /     \
                 5      -1
                / \     / \
               0         

// Now the final array a looks like this, with 8 in the correct final position:

a = [7, 5, -1, 0, 8, 9, 12]

// Swap the root element with the last element in the heap, then remove the
// last element from the heap:

                     0
                  /     \
                 5      -1
                / \     / \
               7        

                     0
                  /     \
                 5      -1
                / \     / \

// Then we heapifyDown from the root:

                     5
                  /     \
                 0      -1
                / \     / \

// Now the final array a looks like this, with 7 in the correct final position:

a = [5, 0, -1, 7, 8, 9, 12]

// Swap the root element with the last element in the heap, then remove the
// last element from the heap:

                     -1
                  /     \
                 0       5
                / \     / \

                     -1
                  /     \
                 0       
                / \     

// Then we heapifyDown from the root, but -1 is already less than 0:

                     -1
                  /     \
                 0       
                / \     


// We can stop here because the final array a is already sorted, with 5
// in the correct position:

a = [-1, 0, 5, 7, 8, 9, 12]
```

The advantage to heap sort is that because it is in-place, as we can build up the heap structure 
within the original array itself, so the extra space usage is only $O(1)$.

But heap sort is not stable, making it an undesirable property if stability is needed.

### Implementation

##### Java

```
package com.algorithmhelper.algorithms.sorting;

public class HeapSort<T extends Comparable<T>> {

    /**
     * Sorts the array arr.
     *
     * @param arr, the array to be sorted.
     * @throws IllegalArgumentException if arr is null
     */
    public static void sort(Comparable[] arr) {
        if (arr == null)
            throw new IllegalArgumentException("sort with null arr");

        int n = arr.length;

        for (int i = n/2; i >= 1; i--)
            heapifyDown(arr, i, n);

        while (n > 1) {
            swap(arr, 1, n--);
            heapifyDown(arr, 1, n);
        }
    }

    /**
     * Restores the (min) heap invariant by continuously moving i down the heap if it is larger
     * than its two children.
     *
     * @param arr
     * @param i
     * @param n
     */
    private static void heapifyDown(Comparable[] arr, int i, int n) {
        while (2*i <= n) {
            int j = 2*i;
            if (j < n && less(arr, j, j+1)) j++;
            if (!less(arr, i, j))
                break;
            swap(arr, i, j);
            i = j;
        }
    }

    /**
     * Helper function that returns true if the element at index i is less than the element at
     * index j in the array arr, otherwise false.
     *
     * @param arr
     * @param i
     * @param j
     * @return true if the element at index i is less than the element at index j in the array
     * arr, otherwise false.
     */
    private static boolean less(Comparable[] arr, int i, int j) {
        return arr[i-1].compareTo(arr[j-1]) < 0;
    }

    /**
     * Helper method that swaps the elements at index i and j in the array a.
     *
     * @param arr
     * @param i
     * @param j
     */
    private static void swap(Comparable[] arr, int i, int j) {
        Comparable temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }
}
```

### Time Complexity

The time complexity of heap sort is $O(NlogN)$.

Since it is done in-place in the array and requires variables `i` and `j` for the `heapifyDown` 
operation, it requires $O(1)$ auxiliary space.

It is in-place, and not stable.

```
| Algorithm | time complexity | space complexity | in-place | stable | type       |
|-----------|-----------------|------------------|----------|--------|------------|
| heap sort | O(NlogN)        | O(1)             | yes      | no     | comparison |
```