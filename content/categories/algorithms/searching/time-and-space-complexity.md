# Time and Space Complexity

This article will elaborate further on the time and space complexities of the operations on the 
algorithms for searching discussed in this topic.

### Comparisons

We start off describing the time and space complexities of binary search,
ternary search, jump search, and interpolation search:

```
| Algorithm            | time complexity | space complexity |
|----------------------|-----------------|------------------|
| binary search        | O(logN)         | O(1)             |
| ternary search       | O(logN)         | O(1)             |
| jump search          | O(sqrtN)        | O(1)             |
| interpolation search | O(loglogN)      | O(1)             |
```

For binary search, since we halve the problem space each time by either only searching the left or 
the right of the `mid` element, clearly we can only halve at most $logN$ times, and thus it runs in 
$O(logN)$ time. We only require three pointers (`lo`, `mid`, `hi`), and thus it requires $O(1)$ 
auxiliary space.

For ternary search, since we divide the problem space into three inverals each time, and only 
searching either the left, middle, or right third, clearly we can only do this at most $log_3N$
times, and thus it runs in $O(logN)$ time. We only require four pointers (`left`, `right`, 
`leftThird`, `rightThird`), and thus it requires $O(1)$ auxiliary space.

For jump search, we skip elements in "steps" or "jumps" of size $\sqrt{N}$. Then once we reach an 
interval in which the element may be in, we linear search this interval. Suppose that the $k$-th 
jump we reach the smallest element greater than the given element. When we step back to the $k-1$-th 
jump and then perform the linear search, the amount of elements to search within this interval
is of size $\sqrt{N}$. Since it takes $\sqrt{N}$ jumps, and then after linear search
of $\sqrt{N}$ elements, it follows that we take $\sqrt{N} + \sqrt{N} = 2\sqrt{N} = O(\sqrt{N})$ time.

For interpolation search, we know that the sorted array also has the property that the elements are 
evenly distributed. When we interpolate, we are able to approximate the linear relationship of the 
elements, and by using $y = mx + b$, index into a location close to the target. Intuitively, it must 
be better than binary search because calculating $y = mx + b$ and plugging in the searched 
elemented for y is an $O(1)$ operation, but already immediately gets close to the target element. 
While binary search is halving the problem space each time (hence $O(logN)$ time complexity), 
interpolation search can be seen as being "able to eliminate more than half" at each step of the 
algorithm. The proof by 
[Perl, Itai & Avni](http://www.cs.technion.ac.il/~itai/publications/Algorithms/p550-perl.pdf) 
is more involved, but it shows that it runs in $O(loglogN)$ time.
