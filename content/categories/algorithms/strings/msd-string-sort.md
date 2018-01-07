# MSD String Sort

MSD string sort, which is most significant digit sort, is a string sorting algorithm in which we
look at the digits from left (most significant) to right (least significant). The main approach is 
that we sort the set of strings character by character starting from the left, and use the same key
index counting method as for [LSD string sort](/categories/algorithms/strings/lsd-string-sort). 
Then we recursively sort all the strings that start with each character. 

One of the key advantages of MSD string sort over LSD string sort is that it works on strings with 
variable lengths. Furthermore, because we only need to continue recursively calling MSD string sort
on a partition of strings with the same character at a position $i$, we end up only examining 
just enough keys to be able to sort them. This leads to the observation that the more random the set 
of strings to sort, the faster this algorithm will run. because randomness probabilistically 
protects against large partitions of strings that share the same prefix (the substring from index 
$0...i$). This is ideal for situations where strings are generally random, like bank account 
numbers, license plates numbers, or social security numbers.

### Visualization

The following is a visualization of MSD string sort.

```
// Suppose that we have the following set of strings:
[adabra, abra, aba, brada, bracad, ada, acada]

// Starting with i = 0:
adabra
abra
aba
brada
bracad
ada
acada

// Sorted:
adabra
abra
aba
ada
acada
brada
bracad

// Recursively sort the a's, i = 1:
adabra      
abra
aba
ada
acada

// Sorted:
abra
aba
acada
adabra      
ada

// Recursively sort the b's, i = 2:
abra
aba

// Sorted:
aba
abra

// Recursively sort the c's, i = 2:
acada

// Sorted:
acada

// Recursively sort the d's, i = 2:
adabra      
ada

// Sorted:
ada
adabra

// Recursively sort the b's, i = 1:
brada
bracad

// Sorted:
brada
bracad

// Recursively sort the r's, i = 2:
brada
bracad

// Sorted:
brada
bracad

// Recursively sort the a's, i = 3:
brada
bracad

// Sorted:
brada
bracad

// Thus we have the final sorted list of strings:
abra
aba
acada
adabra      
ada
bracad
brada
```

### Implementation

##### Java

<script src="https://gist.github.com/eliucs/11595a44566ace78f5d21ed706e03eb8.js"></script>

### Time Complexity

In the worst case, we must sort characters at $M$ positions, where $M$ is the length of the string,
and to sort the strings by character, we need to go through the $N$ strings and compute $N$ 
frequencies, and $R$ frequency cumulates, this algorithm runs in $O(M(N+R))$ time. However, when 
$N$ is large, then the size of $R$ becomes negligible compared to $N$, so we can consider this 
algorithm to run in $O(MN)$ time. Note that this is virtually the same as LSD string sort, however,
we base it on the fact that there are large prefix matches, which is probabilistically unlikely
given random strings. In this case, we can consider $M$ to instead be the length of the longest
matching substring during the execution of the algorithm.

Since we always need a `count` array of size $R$ and the auxiliary array `aux` of size $N$, this
algorithm requires $O(N+R)$ space. Note that this is the same as LSD string sort as well.

```
| Algorithm       | time complexity | space complexity |
|-----------------|-----------------|------------------|
| msd string sort | O(MN)           | O(N+R)           |
```
