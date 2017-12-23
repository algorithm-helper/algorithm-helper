# Merge Sort

Merge sort is a sorting algorithm based on the technique of divide and conquer to recursively break 
the original array in halves, sorting the smaller halves (easier subproblems) and then combining the 
sorted halves in a step called merging, with an operation called `merge`.

Merging is the basic operation that combines two of these subarrays. Given two sorted arrays `a` and 
`b`, we merge by using two pointers `i` and `j`, one for array `a` and one for array `b`. In an 
auxiliary array, we compare the `a[i]` and `b[j]`, and the minimum of the two is added to the next 
entry of the auxiliary array, and we increment the corresponding pointer. We do this until both 
pointers have reached the end of their corresponding arrays.

The main idea behind merge sort is recursively dividing the array into halves until they become of 
size 1. Then for each pair of halves, we call the above `merge` operation.

Intuitively, since the `merge` operation takes the length of the longest array at most, it is done 
in `O(N)` time. Since we can only halve the array at most `lgN` times, it follows that merge sort 
overall runs in `O(NlogN)` time.

### Visualization

The following visualizes merge sort:

```
// Suppose we have the unordered array a:

a = [9, 5, 7, 2, 0, -1, 8, 3]

// We break the array a down into two halves:

[9, 5, 7, 2] [0, -1, 8, 3]

// We recursively break it into two halves:

[9, 5] [7, 2] [0, -1, 8, 3]

// We recursively break it into two halves:

[9] [5] [7, 2] [0, -1, 8, 3]

// We merge the two halves to sorted order:

[5, 9] [7, 2] [0, -1, 8, 3]

// We recursively break it into two halves:

[5, 9] [7] [2] [0, -1, 8, 3]

// We merge the two halves to sorted order:

[5, 9] [2, 7] [0, -1, 8, 3]

// We merge the two halves to sorted order:

[2, 5, 7, 9] [0, -1, 8, 3]

// We recursively break it into two halves:

[2, 5, 7, 9] [0, -1] [8, 3]

// We recursively break it into two halves:

[2, 5, 7, 9] [0] [-1] [8, 3]

// We merge the two halves to sorted order:

[2, 5, 7, 9] [-1, 0] [8, 3]

// We recursively break it into two halves:

[2, 5, 7, 9] [-1, 0] [8] [3]

// We merge the two halves to sorted order:

[2, 5, 7, 9] [-1, 0] [3, 8]

// We merge the two halves to sorted order:

[2, 5, 7, 9] [-1, 0, 3, 8]

// We merge the two halves to sorted order:

[-1, 0, 2, 3, 5, 7, 8, 9]

// Now the array a is in sorted order.
```

One of the properties of merge sort is that is is stable, as in merge routine we can specify that if 
the element in the first array is equal to the element in the second array to choose the element in 
the first array, thereby making equal elements end up in the same order.

Another possibly desirable and undesirable properties of merge sort is that its time complexity is 
`O(NlogN)`, since we always recursively break it down. This may be desired if predictability of the 
algorithm's running time is needed, but otherwise this is a disadvantage. Consider nearly sorted or 
completely sorted arrays. Merge Sort then has no advantage over this fact and will run in `O(NlgN)`
regardless.

### Merge Sort Bottom-Up

Merge sort bottom-up is a modification of merge sort in that instead of recursively dividing the 
arrays and merging, for every pass, we merge for increasing sizes of subarrays. Starting from 1, we 
go through the array, merging subarrays of size 1, then 2, 4, ... etc.

The following visualizes merge sort bottom-up:

```
// Suppose we have the unordered array a:

a = [9, 5, 7, 2, 0, -1, 8, 3]

// Then we merge subarrays of size 1:

[5, 9, 7, 2, 0, -1, 8, 3]
[5, 9, 2, 7, 0, -1, 8, 3]
[5, 9, 7, 2, -1, 0, 8, 3]
[5, 9, 7, 2, -1, 0, 3, 8]

// Then we merge subarrays of size 2:

[2, 5, 7, 9, -1, 0, 3, 8]
[2, 5, 7, 9, -1, 0, 3, 8]

// Then we merge subarrays of size 4:

[-1, 0, 2, 3, 5, 7, 8, 9]

// Now the array a is in sorted order.
```

The advantage to this modification is that we do not need any recursion. We also do not need to 
declare many subarrays when we divide the array into halves.

Likewise with regular merge sort, this algorithm runs in `O(NlgN)`.

### Implementation

##### Java

View the source code [here](https://github.com/algorithm-helper/implementations/blob/master/java/com/algorithmhelper/algorithms/sorting/MergeSort.java).

<script src="https://gist.github.com/eliucs/e4ea2d9c92be553f4a0011c277c9187c.js"></script>

### Implementation (Bottom-Up)

##### Java

View the source code [here](https://github.com/algorithm-helper/implementations/blob/master/java/com/algorithmhelper/algorithms/sorting/MergeSortBottomUp.java).

<script src="https://gist.github.com/eliucs/44837486e6580bcdf3c8ae1c2e9359aa.js"></script>

### Time Complexity

The time complexity of both merge sort and merge sort bottom-up is `O(NlogN)`.

Since they both require an auxiliary array of size N, they require `O(N)` auxiliary space.

Both of them require copying elements to an auxiliary array, and thus are not in-place. But they are 
stable sorts since the merging operation can be made to respect the original order of identical 
elements.

```
| Algorithm            | time complexity | space complexity | in-place | stable | type       |
|----------------------|-----------------|------------------|----------|--------|------------|
| merge sort           | O(NlogN)        | O(N)             | no       | yes    | comparison |
| merge sort bottom-up | O(NlogN)        | O(N)             | no       | yes    | comparison |
```