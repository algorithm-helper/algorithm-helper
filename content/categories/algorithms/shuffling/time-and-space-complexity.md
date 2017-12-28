# Time and Space Complexity

This article will elaborate further on the time and space complexities of the operations on the 
algorithms for shuffling discussed in this topic.

### Comparisons

We start off describing the time and space complexities of Fisher-Yates shuffle and Sattolo's 
algorithm:

```
| Algorithm            | time complexity | space complexity |
|----------------------|-----------------|------------------|
| fisher-yates shuffle | O(N)            | O(1)             |
| sattolo's algorithm  | O(N)            | O(1)             |
```

For both Fisher-Yates shuffle and Sattolo's algorithm, for each of the $N$ elements in the array, we 
swap it with an element determined randomly. The swap is an $O(1)$ time operation, and thus the time 
complexity for both algorithms is $O(N)$.

Since they both require an additional temporary variable `temp` to facilitate with the swapping, 
they require $O(1)$ auxiliary space.
