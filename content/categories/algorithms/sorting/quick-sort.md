# Quick Sort

Quick Sort is a sorting algorithm based on the idea of partitioning, which is to bring an element
`pivot` to an index $i$ such that all elements at indices less than $i$ (not necessarily in sorted 
order) are less than the pivot, and all elements at indices greater than $i$ are greater than the 
pivot. By recursively applying this method on both of the unsorted sides, we eventually reach the 
point where both sides are sorted and thus the entire array is sorted.

Partitioning is the basic operation to divide this array. We always choose the first element of the 
array to be the `pivot`, but this causes problems, mainly that this method can lead to inefficient 
worst cases, such as if the first element is always the maximum element in the array. We must have a 
way of selecting the partition element that would result in fairly equal sizes for the two left and 
right half subarrays, or otherwise guard against this worst case probabilistically.

Thus, we must randomly shuffle the elements of the array. We use Fisher-Yates Shuffle, also called 
Knuth Shuffle. Further information on this can be found in the article on 
[Fisher-Yates Shuffle](/categories/algorithms/shuffling/fisher-yates-shuffle).

Then we take two pointer `lo` and `hi` starting from the beginning after the `pivot` and the end of 
the array, respectively. We increment the `lo` pointer and decrement the `hi` pointer, swapping 
elements that are out of place. Then swap the `pivot` to the index `lo`. Intuitively, since all of 
the elements left of the `pivot` are less than the `pivot`, and all of the element right of the 
`pivot` are greater than the `pivot`, it follows that the `pivot` must be in the correct position in 
the final order of the array. And if this process is continued recursively on both halves, then the 
final array in the end must be sorted.

Since probabilistically and on average, we are partitioning the array into halves, at most we can 
break it in halves $logN$ times. In addition to the partitioning operation itself, which takes $O(N)$ 
time, thus overall, quick sort runs in  $O(NlogN)$ time.

While it is possible that the partitioning element that we select can happen in the worst case to 
always be the largest element in the array, and then the algorithm runs in $O(N^2)$ time, the chance 
of this happening is probabilistically low.

### Visualization

The following visualizes quick sort:

```
// Suppose we have the unordered array a, that has already been randomly
// shuffled:

a = [9, 5, 7, 12, 0, -1, 8, 3]

// The partitioning element p = a[0] = 9, lo = a[1] = 5, hi = a[7] = 3

p   lo                 hi

[9, 5, 7, 12, 0, -1, 8, 3]

// We move the lo pointer until we have an element > 9 and we move the
// hi pointer until we have an element < 9 and then swap the two elements.
// Here, lo moves to a[3] = 12, since 12 > 9 and hi swaps at a[7] = 3, since
// 3 < 9:

p         lo           hi

[9, 5, 7, 12, 0, -1, 8, 3]

p         lo           hi

[9, 5, 7, 3, 0, -1, 8, 12]

// Then hi moves to a[6] = 8 and lo moves to a[4] = 0, and these elements get
// swapped:

p            lo     hi

[9, 5, 7, 3, 0, -1, 8, 12]

// We continuously increment the lo pointer until they cross:

                    lo
p                   hi

[9, 5, 7, 3, 8, -1, 0, 12]

// Then we swap a[lo] = 0 with p:

                    p
                    lo
                    hi

[0, 5, 7, 3, 8, -1, 9, 12]

// We recursively do this on the left side of p = 9 and then on the right side:

 p  lo          hi

[0, 5, 7, 3, 8, -1, 9, 12]

p  lo            hi

[0, -1, 7, 3, 8, 5, 9, 12]

    p
    lo           hi

[-1, 0, 7, 3, 8, 5, 9, 12]

// We recursively do this on the left side of p = 0 and then on the right side.
// The left side is already sorted, so we do the right side:

        p  lo    hi

[-1, 0, 7, 3, 8, 5, 9, 12]

        p     lo hi

[-1, 0, 7, 3, 8, 5, 9, 12]

        p     lo hi

[-1, 0, 7, 3, 5, 8, 9, 12]

              p
              lo hi

[-1, 0, 3, 5, 7, 8, 9, 12]

// Then the right side of p = 9, but it is already sorted, thus now the array
// is sorted:

[-1, 0, 3, 5, 7, 8, 9, 12]
```

One advantage of quick sort is that is it in-place since it requires no extra space except for 
variables for the pointers. It is probabilistically fast in most cases, easy to implement and good 
with caching in terms of internal memory mechanisms.

However, it is unstable, and stability may be a desirable property. It is possible for quick sort to 
slow down to $O(N^2)$ in situations where the `pivot` selections are bad, but this is guarded 
against probabilistically.

Another downside to a naive quick sort implementation is that it does not handle repeated elements 
because it would make unnecessary partitions.

### Quick Sort Three-Way

Quick sort three-way is a modification of quick sort that aims to solve the Dutch National Flag 
Problem as well as fix regular quick sort's problem with identical keys. The Dutch National Flag 
Problem, proposed by Dijkstra, it to sort keys of three colors: red, white, and blue (like the 
actual flag of the Netherlands). The regular quick sort is not robust enough to handle repeated 
elements.

The main idea behind quick sort three way is that our left and right pointers now are `lt` and `gt`, 
representing less than and greater than. Any elements between the two pointers are equal to the 
pivot.

The following visualizes quick sort three-way:

```
// Suppose we have the unordered array a, that has already been randomly
// shuffled:

a = [9, 5, 7, 12, 0, -1, 9, 5, 8, 3]

// We have lt and gt. lt increments until index 3, and then swaps with the
// element at gt because a[gt] = 3 < 9:

 p  lt                        gt

[9, 5, 7, 12, 0, -1, 9, 5, 8, 3]

p         lt                  gt

[9, 5, 7, 12, 0, -1, 9, 5, 8, 3]

p         lt                  gt

[9, 5, 7, 3, 0, -1, 9, 5, 8, 12]

// gt then decrements to index 8, where a[gt] = 8 < 9, and lt then
// increment to index 6, where a[lt] = 9, then the elements swap:

p                   lt    gt

[9, 5, 7, 3, 0, -1, 9, 5, 8, 12]

p                   lt    gt

[9, 5, 7, 3, 0, -1, 8, 5, 9, 12]

// Then lt increments to index 7, but after this lt and gt will cross, so
// we stop by swapping the pivot with a[lt]:

p                      lt gt

[9, 5, 7, 3, 0, -1, 8, 5, 9, 12]

p                      lt gt

[5, 5, 7, 3, 0, -1, 8, 9, 9, 12]

// Now we do this recursively on the left side of lt:

p   lt                 gt

[5, 5, 7, 3, 0, -1, 8, 9, 9, 12]

p   lt          gt

[5, 5, 7, 3, 0, -1, 8, 9, 9, 12]

p   lt           gt

[5, -1, 7, 3, 0, 5, 8, 9, 9, 12]

p       lt       gt

[5, -1, 7, 3, 0, 5, 8, 9, 9, 12]

p       lt       gt

[5, -1, 5, 3, 0, 7, 8, 9, 9, 12]

p       lt    gt

[5, -1, 5, 3, 0, 7, 8, 9, 9, 12]

p       lt    gt

[5, -1, 0, 3, 5, 7, 8, 9, 9, 12]

p          lt gt

[5, -1, 0, 3, 5, 7, 8, 9, 9, 12]

p          lt gt

[3, -1, 0, 5, 5, 7, 8, 9, 9, 12]

// We continue recursively on the left side:

p   lt gt

[3, -1, 0, 5, 5, 7, 8, 9, 9, 12]

p   lt gt

[0, -1, 3, 5, 5, 7, 8, 9, 9, 12]

// We continue recursively on the left side:

    lt
p   gt

[0, -1, 3, 5, 5, 7, 8, 9, 9, 12]

    lt
p   gt

[-1, 0, 3, 5, 5, 7, 8, 9, 9, 12]

// We continue recursively on the right side (of 9).

                       p  lt gt

[-1, 0, 3, 5, 5, 7, 8, 9, 9, 12]

// Now the array a is in sorted order.
```

Even though with quick sort three way, its `lt` and `gt` pointers divide this array into three 
partitions, it can be misleading to say that the most we can divide this array is $log_3N$ times. We are 
not necessarily able to take advantage of this fact in an array with no repeated values, and thus 
quick sort three way just becomes regular quick sort. Thus this algorithm runs in $O(NlogN)$ time.

### Implementation

##### Java

```
package com.algorithmhelper.algorithms.sorting;

import com.algorithmhelper.algorithms.shuffling.FisherYatesShuffle;

public class QuickSort {

    /**
     * Sorts the array arr.
     *
     * @param arr, the array to be sorted.
     * @throws IllegalArgumentException if arr is null
     */
    public static void sort(Comparable[] arr) {
        if (arr == null)
            throw new IllegalArgumentException("sort with null arr");

        FisherYatesShuffle.shuffle(arr);
        sort(arr, 0, arr.length - 1);
    }

    /**
     * Helper method that sorts the array arr by partitioning it into two halves, where all
     * elements below the partition index are less than the partition and all elements above the
     * partition index are greater than the partition, and recursively sorts the two partitions.
     *
     * @param arr
     * @param lo
     * @param hi
     */
    private static void sort(Comparable[] arr, int lo, int hi) {
        if (hi <= lo)
            return;

        int j = partition(arr, lo, hi);
        sort(arr, lo, j-1);
        sort(arr, j+1, hi);
    }

    /**
     * Helper function that partitions the array and returns the index j of the element such that
     * all elements at indices below j are less than the element and that all elements at indices
     * above j are greater than the element.
     *
     * @param arr
     * @param lo
     * @param hi
     * @return the index j of the element such that all elements at indices below j are less than
     *         the element and that all elements at indices above j are greater than the element.
     */
    private static int partition(Comparable[] arr, int lo, int hi) {
        int i = lo;
        int j = hi + 1;
        Comparable first = arr[lo];

        while (true) {
            while (less(arr[++i], first)) {
                if (i == hi)
                    break;
            }

            while (less(first, arr[--j])) {
                if (j == lo)
                    break;
            }

            if (i >= j)
                break;

            swap(arr, i, j);
        }
        swap(arr, lo, j);
        return j;
    }

    /**
     * Helper function that returns true if x is less than y, otherwise false.
     *
     * @param x
     * @param y
     * @return true if x is less than y, otherwise false
     */
    private static boolean less(Comparable x, Comparable y) {
        return x.compareTo(y) < 0;
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

### Implementation (Three-Way)

##### Java

```
package com.algorithmhelper.algorithms.sorting;

import com.algorithmhelper.algorithms.shuffling.FisherYatesShuffle;

public class QuickSortThreeWay {

    /**
     * Sorts the array arr.
     *
     * @param arr, the array to be sorted.
     * @throws IllegalArgumentException if arr is null
     */
    public static void sort(Comparable[] arr) {
        if (arr == null)
            throw new IllegalArgumentException("sort with null arr");

        FisherYatesShuffle.shuffle(arr);
        sort(arr, 0, arr.length - 1);
    }

    /**
     * Helper function that sorts the array by partitioning it such that elements less than the
     * partition index are strictly less than the partition element, elements greater than the gt
     * index are strictly greater than the partition, and elements within the index and the gt
     * index are equal to the partition element.
     *
     * @param arr
     * @param lo
     * @param hi
     */
    private static void sort(Comparable[] arr, int lo, int hi) {
        if (hi <= lo)
            return;

        int lt = lo;
        int gt = hi;
        Comparable first = arr[lo];
        int i = lo;

        while (i <= gt) {
            int cmp = arr[i].compareTo(first);

            if (cmp < 0)
                swap(arr, lt++, i++);
            else if (cmp > 0)
                swap(arr, i, gt--);
            else
                i++;
        }

        sort(arr, lo, lt-1);
        sort(arr, gt+1, hi);
    }

    /**
     * Helper function that returns true if x is less than y, otherwise false.
     *
     * @param x
     * @param y
     * @return true if x is less than y, otherwise false
     */
    private static boolean less(Comparable x, Comparable y) {
        return x.compareTo(y) < 0;
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

The time complexity of quick sort and quick sort three way is $O(NlogN)$, and random shuffling of 
the elements probablistically guards against $O(N^2)$.

With regular quick sort, we require two pointers `lo` and `hi`, and thus require $O(1)$ auxiliary 
space. With quick sort three-way, we require pointers `lt` and `gt`, and thus require $O(1)$ 
auxiliary space.

It is an in-place sort, but is not stable.

```
| Algorithm            | time complexity | space complexity | in-place | stable | type       |
|----------------------|-----------------|------------------|----------|--------|------------|
| quick sort           | O(NlogN)        | O(1)             | yes      | no     | comparison |
| quick sort three way | O(NlogN)        | O(1)             | yes      | no     | comparison |
```