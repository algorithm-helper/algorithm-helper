# Time and Space Complexity

This article will elaborate further on the time and space complexities of the operations on the 
algorithms discussed in this topic.

### Comparisons

We start off describing the time and space complexities of the following string sorting algorithms:
LSD string sort, and MSD string sort:

```
| Algorithm       | time complexity | space complexity |
|-----------------|-----------------|------------------|
| lsd string sort | O(MN)           | O(N+R)           |
| msd string sort | O(MN)           | O(N+R)           |
```

For both algorithms, we must sort characters at $M$ positions, where $M$ is the length of the 
string, and to sort the strings by character we need to go through the $N$ strings and compute $N$ 
frequencies, and $R$ frequency cumulates, and thus the algorithms run in $O(M(N+R))$ time. However, 
when $N$ is large, then the size of $R$ becomes negligible compared to $N$, so we can consider this 
algorithm to run in $O(MN)$ time. For LSD string sort, this is the case always, because all strings
are of the same length and we always need to sort at $M$ positions. Although this is the worst case
for MSD string sort, in cases where we have random strings, this is protected against
probabilistically because we recursively sort partitions of strings in the array only as much as
we need to. For example, if a string shares a prefix with another string, but it is of shorter 
length, we return -1, and do not need to sort further. Thus, we should consider the $M$ to rather
be the length of the longest prefix, which in most cases, is small, and thus MSD string sort runs
much closer to $O(N)$ time in these situations.

As for space complexity, since we always need a `count` array of size $R$ and the auxiliary array 
`aux` of size $N$, both algorithms requires $O(N+R)$ space.

---

Next, we look at tries: R-way trie, and ternary search trie:

```
| Data Structure      | space complexity | get     | contains | put     | delete  |
|---------------------|------------------|---------|----------|---------|---------|
| r-way trie          | O(NR)            | O(M)    | O(M)     | O(M)    | O(M)    |
| ternary search trie | O(N)             | O(logN) | O(logN)  | O(logN) | O(logN) |
```

For the R-way trie, with all of the described operations above (`get`, `contains`, `put`, `delete`), 
we need to traverse at most $M$ nodes, since the height of the R-way trie only gets as long as the 
longest string `key` inserted into it, thus all operations run in time proportional to $O(M)$. 
However, every node needs an array of size $R$ of nodes, and with $N$ nodes the R-way trie needs 
space proportional to $O(NR)$. While this data structure is efficient time-wise, it is not 
space-wise. Although with a smaller radix (such as $128$ or $256$ for ASCII or ASCII Extended, 
respectively), space would be more managable, with a larger radix such as that for Unicode-16, we 
need a radix of $65535$. 

FOr the ternary search trie, if we had all random string keys, then it would follow that as we build 
up the ternary search trie, all operations (i.e. `get`, `contains`, `put`, `delete`) involve 
reducing the search space by $3$ each time, and we should be expecting the height of the trie to be 
$log_3N$, and thus for all operations, it runs in time proportional to $O(logN)$. Since each node 
requires exactly $3$ children, it follows that we need about $3N$ space, and thus need space 
proportional to $O(N)$.

---

Next, we look at string matching algorithms: the Knuth-Morris-Pratt algorithm, the Boyer-Moore 
algorithm, and the Rabin-Karp algorithm:

```
| Algorithm                    | time complexity | space complexity |
|------------------------------|-----------------|------------------|
| knuth-morris-pratt algorithm | O(N+MR)         | O(MR)            |
| boyer-moore algorithm        | O(N/M)          | O(R)             |
| rabin-karp algorithm         | O(N)            | O(1)             |
```

For the Knuth-Morris-Pratt algorithm, we need to build up the deterministic finite automaton (DFA).
When we build the DFA, each character in the pattern is processed once, and for each character, for 
each radix, we must set the value to be the index of the next state, which takes $O(MR)$ time, and 
$O(MR)$ space for the $M \times R$ sized array. Every character of the text is processed once as it
used to transition to the next state in the DFA, which takes $O(N)$ time. Thus this algorithm as a
whole has a time complexity of $O(N + MR)$ and space complexity of $O(MR)$.

FOr the Boyer-Moore algorithm, in typical situations we are able to skip characters by $M$, it 
follows that we only need to examine $N/M$ characters. In the worst case however, such as if we need 
to shift by 1 each time, then the algorithm would take $NM$ time. However, this situation is 
unlikely, so we take the time complexity to be $O(N/M)$. Since we need to build the skip table of 
size $R$, we need extra space of $O(R)$.

For the Rabin-Karp algorithm, for each consecutive window of $M$ characters in the text, we can 
compute the hash and compare it with the hash of the pattern string in $O(1)$ time, and thus for 
$N$ characters in the text, this algorithm has an overall time complexity of $O(N)$. Since we just 
need to store the hash for every computation, we need $O(1)$ space.
