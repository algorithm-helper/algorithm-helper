# Shell Sort

Shell sort, also called Shell's method, is a sorting algorithm based on the idea of h-sorting, which 
is like insertion sort, but at intervals of size $h$, or in other words, the subsequence of every 
$h$-th element is sorted. An array that is $h$-sorted, and then $k$-sorted is still $h$-sorted, 
where $h \gt k$. 

We define some increasing integer sequence to define our $h$ values, and then $h$-sort the array 
based on those $h$ values, in reverse, until $h$ = 1, where effectively we are doing regular 
insertion sort. But this takes advantage of the fact that by the time $h = 1$, the array is already 
nearly sorted (or in other words, with a low number of inversions), an ideal situation for insertion 
sort, as the algorithm runs in around $O(N)$ time for nearly sorted arrays.

### Visualization

The sequence we choose is one of Knuth's: $3x + 1$. Thus we first calculate the integers of the 
sequence: $1, 4, 7, 10 ...$ and then $h$-sort in reverse of these values. The following visualizes 
shell sort:

```
// Suppose we have the unordered array a:

a = [9, 5, 7, 2, 0, -1, 8]

// We start with h = 7, so this array gets sorted at indices in steps of 7:

a = [8, 5, 7, 2, 0, -1, 9]

// Next h = 4, so this array gets sorted at indices in steps of 4:

a = [2, 5, 7, 8, 0, -1, 9]

// Next h = 1, so this array gets sorted at indices in steps of 1, which is
// regular Insertion Sort:

a = [-1, 0, 2, 5, 7, 8, 9]

// Now the array a is in sorted order.
```

The main advantage shell sort has over insertion sort is that by reducing the array to be nearly 
ordered, at the end, one pass of insertion sort finishes off the sort efficiently.

Determining the time complexity of shell sort is highly dependent on the chosen gap sequence, and it 
is still an open question as to the best known gap sequence (which as of Sep. 2017 is $O(Nlog^2N)$). 
Based on literature, for the sequence $3x + 1$, this algorithm runs in $O(N^{3/2})$ time.

It is an in-place sort, and not stable. It is obvious why it is not stable, 
because when it $h$-sorts, it can bring repeated values out of their original 
order.

### Implementation

##### Java

<script src="https://gist.github.com/eliucs/9e55b34e78b110a8755687297427d172.js"></script>

### Time Complexity

The time complexity of this algorithm is $O(N^{3/2})$.

Since it requires an extra variable to keep track of $h$, it requires $O(1)$ auxiliary space.

It is in-place, and not stable.

```
| Algorithm  | time complexity | space complexity | in-place | stable | type       |
|------------|-----------------|------------------|----------|--------|------------|
| shell sort | O(N^(3/2))      | O(1)             | yes      | no     | comparison |
```
