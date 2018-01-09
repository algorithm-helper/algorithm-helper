# Bucket Sort

Bucket sort, also called counting sort, is a sorting algorithm primarily intended for sorting 
integers. Unlike the above sorting algorithms, bucket sort is not (fully) a comparison sort, but 
instead is a distribution sort, by distributing them to `buckets` corresponding to each bucket, and 
then sorting the `buckets` using some comparison based sort or by making a bucket size large 
enough and reading out from each bucket from the first index to the last.

The algorithm works by finding the maximum value in the array, and making that the bucket size. We 
iterate through the array, and for each element at index $i$, we increment the bucket size at $i$ 
by 1, thereby sorting by "counting". Then we can simply read the bucket sizes in order for the final 
order of the array.

### Visualization

The following visualizes bucket sort:

```
// Suppose we have the unordered array a:

a = [1, 4, 2, 5, 3, 2]

// Then we find the maximum element, which is 5, and then create a bucket
// size of 6 (5 + 1), and initialize all elements in it to 0:

bucket = [0, 0, 0, 0, 0, 0]

// Then we iterate through the array, and increment the bucket at position i:

// For a[0] = 1, bucket[1]++:

bucket = [0, 1, 0, 0, 0, 0]

// For a[1] = 4, bucket[4]++:

bucket = [0, 1, 0, 0, 1, 0]

// For a[2] = 2, bucket[2]++:

bucket = [0, 1, 1, 0, 1, 0]

// For a[3] = 5, bucket[5]++:

bucket = [0, 1, 1, 0, 1, 1]

// For a[4] = 3, bucket[3]++:

bucket = [0, 1, 1, 1, 1, 1]

// For a[5] = 2, bucket[2]++:

bucket = [0, 1, 2, 1, 1, 1]

// Then we simply read back the values of the bucket to get:

a = [1, 2, 2, 3, 4, 5]

// Now the array a is in sorted order.
```

This particular approach to implementing bucket sort is flawed because of one key defect, which is 
that we need to know the maximum value and construct a bucket of that size. This fails if all of our 
integers are 0 or negative, or if any of the numbers are negative. Then there is no valid index for 
them.

However, for the latter problem, we can solve this by also finding the minimum number and augmenting 
the bucket by that size to take account for negative numbers.

Furthermore, consider a situation where one of the elements is large, say 
`Integer.MAX_VALUE (2^31 - 1)`, and all the remaining numbers are small, say less than 10. Then 
there is much wasted space just to accommodate for that number.

In the average case and a more ideal case which is where the maximum (or minimum element) is not 
substantially larger (or smaller) than the rest of the elements, or in other words, when the 
relative size between the maximum element is negligible compared to all N elements, then this 
algorithm runs in $O(N)$ time.

But generally and intuitively, since we always have to build an array of size $K$, where $K$ is the 
(absolutely) largest value in the array, then we take $O(K)$ time to build the bucket. Then since 
the bucket sort algorithm itself then takes $O(N)$ time, then the overall running time of this 
algorithm is $O(N + K)$.

The problem with this algorithm is that it is unstable, its efficiency is limited to integer keys, 
and it is not in-place, but can potentially require a substantial amount of auxiliary space.

### Implementation

##### Java

```
package com.algorithmhelper.algorithms.sorting;

public class BucketSort {

    /**
     * Sorts the array arr.
     *
     * @param arr, the array to be sorted.
     * @throws IllegalArgumentException if arr is null
     */
    public static void sort(int[] arr) {
        if (arr == null)
            throw new IllegalArgumentException("sort with null array");

        int maxValue = maxValue(arr);
        int[] bucket = new int[maxValue+1];

        for (int i = 0; i < bucket.length; i++) {
            bucket[i] = 0;
        }

        for (int i = 0; i < arr.length; i++) {
            bucket[arr[i]]++;
        }

        int out = 0;
        for (int i = 0; i < bucket.length; i++) {
            for (int j = 0; j < bucket[i]; j++) {
                arr[out++] = i;
            }
        }
    }

    /**
     * Helper function to find the max element in an array of integers.
     *
     * @param arr, the array of integers
     * @return the max element in an array of integers
     */
    private static int maxValue(int[] arr) {
        int max = Integer.MIN_VALUE;
        for (int i : arr) {
            if (arr[i] > max)
                max = i;
        }
        return max;
    }
}
```

### Time Complexity

The time complexity of this algorithm is $O(N + K)$, where $K$ is the absolutely maximum element in 
the array.

Since we need to initialize `buckets` by building an array of size $K$, we require $O(K)$ auxiliary 
space.

It is not in-place since we require incrementing bucket values in the auxiliary array, and it is 
not stable. 

```
| Algorithm   | time complexity | space complexity | in-place | stable | type         |
|-------------|-----------------|------------------|----------|--------|--------------|
| bucket sort | O(N+K)          | O(K)             | no       | no     | distribution |
```