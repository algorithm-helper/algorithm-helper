# Introduction

The topic in this section is hashing, and these data structures are primarily concerned with using 
hash functions to implement efficient data structures. The following data structures are going to be 
covered in this topic: hash tables/hash maps and hash sets.

The main motivation behind hashing is to speed up lookup. Consider searching a linear data structure 
for a given `key`. In an unsorted array, or a linked list for example, this would take $O(N)$ time. 
Even with a balanced binary tree data structure, say a red-black tree, this would take $O(logN)$ 
time. However, we could use a hash function to compute some index into the array, and whenever we 
need to lookup a `key`, instead of traversing through the data structure trying to find the `key`, 
we can just compute the index with the hash function and immediately get to the "vicinity" of where 
to find the `key`. This is further clarified in the article on 
[Hash Functions](/categories/data-structures/hashing/hash-function).

### Visualization

The following visualizes the general idea behind hashing:

```
// Suppose we had a universe U of possible keys, some key x from U, a hash 
// function h, and an array of size M:
 - - - -
|       |               Index 
|       |                 0   [ ]
|   U   | --> h(x) -->    1   [ ]
|       |                 2   [ ]
|       |                ...  [ ]
 - - - -                 M-1  [ ]

// We take the hash value of x, h(x) to find an index into the array, and 
// store x there, say for example h(x) = 2:
 - - - -
|       |               Index 
|       |                 0   [ ]
|   U   | --> h(x) -->    1   [ ]
|       |                 2   [x]
|       |                ...  [ ]
 - - - -                 M-1  [ ]
```

### Terminology

We first look at some terminology and definitions with hashing.

A hash function is a function to map keys from a universe of all possible keys $U$ to an index value 
into an array of size $M$. This index value is in $\\{1, 2, ... , m-1\\}$.

From Wikipedia:

> [Hash Function](https://en.wikipedia.org/wiki/Hash_function) - a hash function is any function 
that can be used to map data of arbitrary size to data of fixed size. The values returned by a hash 
function are called hash values, hash codes, digests, or simple hashes. One use is a data structure 
called a hash table, widely used in computer software for rapid data lookup.

---

Since there are much more possible keys than there are available locations in the array, eventually 
there will be two different keys that will hash to the same slot. This is called a collision.

From Wikipedia:

> [Collision](https://en.wikipedia.org/wiki/Collision_%28computer_science%29) - a collision or clash 
occurs when two different inputs to a function, typically one used to compress large data items into 
a smaller or fixed size, produce the same output, called a hash value, checksum, fingerprint, or 
digest. Collisions are unavoidable whenever members of a very large set are mapped to a relatively
short bit string.

It becomes clear that this hash function $h$ must also "evenly distribute" the keys over the $M$ 
possible slots. Intuitively, this must be case for the hash table/hash map or hash set to not have 
its performance degenerate to $O(N)$ time. For example, if $h$ produces hash values of 2 more often 
then other values, then given a arbitrary amount of keys to be hashed, there will be an imbalance at
index 2. In the case of linear probing for example (more can be read on linear probing in the 
article on [Collision Resolution](/categories/data-structures/hashing/collision-resolution)), not 
only would this result in a larger cluster starting at index 2, but because the probability to hash 
to index 2 is higher, then the probability for the cluster to grow at index 2 also becomes larger, 
which leads to performance degenerating to $O(N)$.

---

We assume that $h$ evenly distributes keys to slots, and this is called the Simple Uniform Hashing 
Assumption. 

From Wikipedia:

> [Simple Uniform Hashing Assumption](https://en.wikipedia.org/wiki/SUHA_%28computer_science%29) -
The SUHA (Simple Uniform Hashing Assumption) is a basic assumption that facilitates the mathematical 
analysis of hash tables. The assumption states that a hypothetical hashing function will evenly 
distribute items into the slots of a hash table. Moreover, each item to be hashed has an equal 
probability of being placed into a slot, regardless of the other elements already placed. This 
assumption generalizes the details of the hash function and allows for certain assumptions about the 
stochastic system.
