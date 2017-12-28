# Time and Space Complexity

This article will elaborate further on the time and space complexities of the operations on the 
algorithms for sorting discussed in this topic.

### Comparisons

We start off describing the time, space complexities, in-placeness and stability of the 
comparison-based sorting algorithms: selection sort, insertion sort, shell sort, merge sort, 
merge sort bottom-up, quick sort, quick sort three-way, and heap sort:

```
| Algorithm            | time complexity | space complexity | in-place | stable | type       |
|----------------------|-----------------|------------------|----------|--------|------------|
| selection sort       | O(N^2)          | O(1)             | yes      | no     | comparison |
| insertion sort       | O(N^2)          | O(1)             | yes      | yes    | comparison |
| shell sort           | O(N^(3/2))      | O(1)             | yes      | no     | comparison |
| merge sort           | O(NlogN)        | O(N)             | no       | yes    | comparison |
| merge sort bottom-up | O(NlogN)        | O(N)             | no       | yes    | comparison |
| quick sort           | O(NlogN)        | O(1)             | yes      | no     | comparison |
| quick sort three-way | O(NlogN)        | O(1)             | yes      | no     | comparison |
| heap sort            | O(NlogN)        | O(1)             | yes      | no     | comparison |
```

For selection sort, in the worst case, the array has all of the elements in reverse (descending) 
order. Then as we iterate through the array, for each index $i$, we must traverse N elements to find 
the next minimum, and then $N-1$ elements, and so on:

$= N + (N - 1) + ... + 2 + 1$

$= N(N + 1)/2$

$= N^2/2 + N/2$

$= O(N^2)$

And thus selection sort runs in $O(N^2)$ time.

For insertion sort, in the worst case, the array has all of the elements in reverse (descending) 
order. Then as we iterate through the array, for each index $i$, we must traverse 1 element to 
insert the element into the correct position in the left subarray, then 2 elements, and so on, 
until N elements:

$= 1 + 2 + ... + (N - 1) + N$

$= N(N + 1)/2$

$= N^2/2 + N/2$

$= O(N^2)$

And thus insertion sort runs in $O(N^2)$ time.

For shell sort, the time complexity highly depends on the sequence being used, and in the 
implementation we use one of Knuth's: $3x + 1$. It is an open question as to what is the best 
sequence, and the proof for $3x + 1$ is a lot more involved. Based on the literature, it is 
$O(N^{3/2})$.

For merge sort, we can halve the array at most lgN times, and since the total size of all of the 
subarrays to merge is $N$, it runs in $O(NlogN)$ time.

For quick sort, under the assumption that the array is randomly shuffled, the partitioning element 
is able to partition the array in half each time, probabilistically. Since we can halve the array 
at most $logN$ times, and since the total size of all of the subarrays to recursively sort is $N$, 
it runs in $O(NlogN)$ time.

For heap sort, for each of N elements, we call the `heapifyDown` operation. Since a binary heap is 
near perfectly balanced and thus the height of the tree structure it represents is of at most size 
$logN$, when we call `heapifyDown`, it swaps the root element at most $logN$ times, and thus the 
algorithm overall runs in $O(NlogN)$ time.

---

We describe the time, space complexities, in-placeness and stability of the distribution-based 
sorting algorithms: bucket sort and radix sort:

```
| Algorithm        | time complexity | space complexity | in-place | stable | type         |
|------------------|-----------------|------------------|----------|--------|--------------|
| bucket sort      | O(N+K)          | O(K)             | no       | no     | distribution |
| radix sort (LSD) | O(N+W)          | O(1)             | no       | no     | distribution |
```

For bucket sort, we first initialize an array of size $K$, where $K$ is the absolutely maximum 
number in the array. Then for each of the $N$ elements in the array, we increment its corresponding 
bucket by 1, and then read the bucket elements out back into the original array. Thus it runs in 
$O(N+K)$ time.

For radix sort (LSD), we initialize an array of size 10, where each index corresponds to a digit 
between 0 and 9. For each $w$-th digit from $1\,to\,W$, where $W$ is the number of digits of the 
maximum number, we assign the number to the bucket corresponding to the $w$-th digit. Thus it runs 
in $O(N+W)$ time.
