# Hash Function

A hash function is a function to map data from an arbitrary size universe $U$ to an array of fixed 
size $M$. Hash functions take some object as input and output some number from $0$ to $M-1$, that 
can be used to index into the array. The values returned by the hash functions are called hashes, 
hash values, or hash codes.

The primary motivation behind using hash functions is to build data structures called hash 
tables/hash maps, and hash sets, which allow for efficient $O(1)$ operations like `contains`, 
`get`, `put`, and `delete`. Compare this to arrays or linked lists for example, where we require 
$O(N)$ time when they are unsorted. Even when they are sorted, we get $O(logN)$ time for search 
using binary search on an array, but even then we must still sort first, which takes $O(NlogN)$ time,
and then $O(N)$ time each time we want to add in a new element and maintain sorted order. Even with 
balanced binary search trees, like the red-black tree or AVL tree, we require $O(logN)$ time for 
search.

A hash function has the property that it will always return a number. We can take the absolute value 
of this number and $mod\,M$ to get a valid index into the array. 

### Properties

Given a hash function $h$, it has the properties that for some key
$x$:

- It is easy to compute $h(x)$
- Generally, it is computationally hard given $h(x)$ to compute $x$
- If $x = y$, then $h(x) = h(y)$

It should be noted that $h(x) = h(y)$ does not imply that $x = y$. This is an example of a 
collision: when two unequal keys (in whatever way that may be defined) hash to the same value. 
Surely, since we have a universe size of $U$ and only an array size $M$ and $U \gt M$, we are 
certain to have collisions eventually.
