# Radix Sort

Radix sort is a sorting algorithm that is primarily intended for use on integer keys but would work
with floats in a similar way. Its main approach is to bucket sort the elements based on the position 
of the digits, either from the most significant digit first to lest significant digit last (Radix 
Sort LSD) or least significant digit first to most significant digit last (Radix Sort MSD). In the 
implementation, only the LSD version is considered.

Instead of initializing a bucket size to be the size of the (absolutely) maximum element in the 
array like in bucket sort, we always make it 10, one for each digit from 0 to 9, then based on which 
digit we are looking at, we bucket sort the elements.

This algorithm works and its correctness can be seen intuitively:

- When we compare just the one's digits, then the subsequence of all the single digit numbers must 
be sorted,
- When we compare just the ten's digits after, then the subsequence of all the two digit numbers 
must be sorted, in addition to the subsequence of all the single digit numbers must be sorted at the 
0 index.
- When we compare just the hundred's digits after, the the subsequence of all the three digit 
numbers must be sorted, in addition to the subsequence of all the single and two digit numbers at 
the 0 index.

And so on until the least significant digit.

### Visualization

The following visualizes radix sort:

```
// Suppose we have the unordered array a:

a = [14, 42, 25, 32, 202, 100]

// We build a bucket size of 10, one for each digit between 0 - 9, each
// number represents an index in the array:

bucket:

[0]
[1]
[2]
[3]
[4]
[5]
[6]
[7]
[8]
[9]

// Then we iterate through the array, and store the element based on the
// one's digit:

bucket:

[0] 100
[1]
[2] 42, 32, 202
[3]
[4] 14
[5] 25
[6]
[7]
[8]
[9]

// We collect the terms, now the array a looks like this:

a = [100, 42, 32, 202, 14, 25]

// Then we iterate through the array, and store the element based on the
// tens's digit:

bucket:

[0] 100, 202
[1] 14
[2] 25
[3] 32
[4] 42
[5]
[6]
[7]
[8]
[9]

// We collect the terms, now the array a looks like this:

a = [100, 202, 14, 25, 32, 42]

// Then we iterate through the array, and store the element based on the
// hundreds's digit (if the number has none, it is 0):

bucket:

[0] 14, 25, 32, 42
[1] 100
[2] 202
[3]
[4]
[5]
[6]
[7]
[8]
[9]

// We collect the terms, now the array a looks like this:

a = [14, 25, 32, 42, 100, 202]

// Now the array a is in sorted order.
```

Since we do not need to make any comparisons, and are just putting the numbers in the corresponding 
bucket, that takes $O(N)$ time. Since the number of times we have to do the bucket assigning is 
dependent on the number with the maximum number of digits, define that as $W$, then the overall 
running time of this algorithm is $O(N + W)$.

Furthermore, since we are in base 10, the maximum number, define that as $K$, can only have at most 
about $logK$ digits, since each digit corresponds to a exponent of 10. Thus we can see that although 
the algorithm is in $O(N + W)$ time, it is at most $O(N + logK)$ time, when we have to consider the 
(absolutely) maximum number in the array.

The advantage to this algorithm is that it is stable as we are adding numbers to the buckets in the 
same order they appeared in the original array. Furthermore, it solves one of the key flaws with 
bucket sort which is where if we have a maximum number that is significantly larger than the others 
then we waste space. We do not have that problem here, since our space is only constrained to the 
bucket of size 10, and that the maximum number has little effect, since we only consider $log$ of 
that number.

### Implementation

##### Java

```
package com.algorithmhelper.algorithms.sorting;

public class RadixSort {

    /**
     * Sorts the array arr.
     *
     * @param arr, the array to be sorted.
     * @throws IllegalArgumentException if arr is null
     */
    public static void sort(int[] arr) {
        if (arr == null)
            throw new IllegalArgumentException("sort with null arr");

        int n = arr.length;
        int maxValue = maxValue(arr);

        for (int exp = 1; maxValue / exp > 0; exp *= 10)
            bucketSort(arr, n, exp);
    }

    /**
     * Helper method that bucket sorts the array based on a particular digit, represented by
     * the exp to 10.
     *
     * @param arr
     * @param n
     * @param exp
     */
    private static void bucketSort(int[] arr, int n, int exp) {
        int out[] = new int[n];
        int[] bucket = new int[10];

        for (int i = 0; i < 10; i++)
            bucket[i] = 0;

        for (int i = 0; i < n; i++)
            bucket[(arr[i]/exp) % 10]++;

        for (int i = 1; i < 10; i++)
            bucket[i] += bucket[i-1];

        for (int i = n-1; i >= 0; i--) {
            arr[i] = bucket[(arr[i]/exp)%10] - 1;
            bucket[(arr[i]/exp)%10 ]--;
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

The time complexity of this algorithm is $O(N + W)$, where $W$ is the number of digits of the 
absolutely maximum number in the array.

Unlike bucket sort, it requires a bucket size of exactly 10 for each digit, and thus it requires 
$O(1)$ auxiliary space.

It is not in-place, since it requires copying elements to the buckets, and it is not stable.

```
| Algorithm        | time complexity | space complexity | in-place | stable | type         |
|------------------|-----------------|------------------|----------|--------|--------------|
| radix sort (LSD) | O(N+W)          | O(1)             | no       | no     | distribution |
```