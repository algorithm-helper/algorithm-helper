# Collision Resolution

A collision is when two unequal keys hash to the same index in the hash table/hash map or hash set. 
Intuitively, we must have some way to keep track of the keys that have been hashed to a certain slot 
in the array. Say we have two different keys $x$ and $y$ that hash to the same slot, we must be able 
to differentiate between $x$ and $y$ at that slot. The two main ides of collision resolution are 
separate chaining and linear probing.

### Approaches

One of the common ways for collision resolution is through the use of separate chaining. The main 
idea behind it is that at the slots in the array, each slot points to a linked list structure. 
Whenever we need to insert a (`key`, `val`) pair into the hash map, we hash the `key` into a hash 
value to index into the array, and create a node with the (`key`, `val`) pair and insert that into 
the linked list. The article on the 
[Hash Table / Hash Map](/categories/data-structures/hashing/hash-table-hash-map) has more 
information on how the ratio between the size of the array $M$ and the total amount of keys $N$ can be 
kept so that on average, the size of the linked list is about 5, thus allowing for efficient $O(1)$ 
time for operations like `contains`, `get`, `put`, and `delete`.

The following visualizes separate chaining:

```
// Suppose we have the following array, where each slot in the array points
// to an initially empty linked list, and that we have a hash function h:
Index 
  0     [] -> ||
  1     [] -> ||
  2     [] -> ||
  3     [] -> ||

// Suppose h("abc") = 2
// insert(("abc", 1)):
Index 
  0     [] -> ||
  1     [] -> ||
  2     [] -> ("abc", 1) -> ||
  3     [] -> ||

// Suppose h("def") = 1
// insert(("def", 2)):
Index 
  0     [] -> ||
  1     [] -> ("def", 2) -> ||
  2     [] -> ("abc", 1) -> ||
  3     [] -> ||

// Suppose h("ghi") = 1
// insert(("ghi", 3)):
Index 
  0     [] -> ||
  1     [] -> ("ghi", 3) -> ("def", 2) -> ||
  2     [] -> ("abc", 1) -> ||
  3     [] -> ||

// Suppose h("jkl") = 1
// insert(("jkl", 4)):
Index 
  0     [] -> ||
  1     [] -> ("jkl", 4) -> ("ghi", 3) -> ("def", 2) -> ||
  2     [] -> ("abc", 1) -> ||
  3     [] -> ||

// contains("ghi"):
true

// contains("mno"):
false

// delete("ghi"):
Index 
  0     [] -> ||
  1     [] -> ("jkl", 4) -> ("def", 2) -> ||
  2     [] -> ("abc", 1) -> ||
  3     [] -> ||
```

Another common way for collision resolution is through the use of linear probing, also called open 
addressing. The main idea behind it is that at the slots in the array, each slot holds the (`key`, 
`val`) pair. However, if we were to hash another `key` into that same slot, we continuously check 
adjacent slots until finding the next empty slot (which is `null`), and store the (`key`, `val`) 
pair there. Every time another adjacent slot must be checked is called a probe. Then it follows that 
if many `keys` hash to the same slot, there will be a long series of unavailable slots to check 
until finding the next empty slot. These called clusters. The article on the 
[Hash Table / Hash Map](/categories/data-structures/hashing/hash-table-hash-map) has more 
information on how the ratio between the size of the array $M$ and the total amount of keys $N$ can be
kept so that on average, the number of needed probes is between 1.5 and 2.5, thus allowing for 
$O(1)$ amortized time for operations like `contains`, `get`, `put`, and `delete`.

The following visualizes linear probing:

```
// Suppose we have the following array, and that we have a hash function h:
Index 
  0     []
  1     []
  2     []
  3     []
  4     []
  5     []
  6     []
  7     []

// Suppose h("abc") = 2
// insert(("abc", 1)):
Index 
  0     []
  1     []
  2     [("abc", 1)]
  3     []
  4     []
  5     []
  6     []
  7     []

// Suppose h("def") = 1
// insert(("def", 2)):
Index 
  0     []
  1     [("def", 2)]
  2     [("abc", 1)]
  3     []
  4     []
  5     []
  6     []
  7     []

// Suppose h("ghi") = 1
// insert(("ghi", 3)):
Index 
  0     []
  1     [("def", 2)] // This slot is taken, check next slot
  2     [("abc", 1)] // This slot is taken, check next slot
  3     [("ghi", 3)]
  4     []
  5     []
  6     []
  7     []

// Suppose h("jkl") = 3
// insert(("jkl", 4)):
Index 
  0     []
  1     [("def", 2)]
  2     [("abc", 1)] 
  3     [("ghi", 3)] // This slot is taken, check next slot
  4     [("jkl", 4)]
  5     []
  6     []
  7     []

// contains("ghi"):
true

// contains("mno"):
false

// delete("ghi"):
Index 
  0     []
  1     [("def", 2)]
  2     [("abc", 1)] 
  3     []
  4     [("jkl", 4)]
  5     []
  6     []
  7     []

// Rehash everything:
Index 
  0     []
  1     [("def", 2)]
  2     [("abc", 1)] 
  3     [("jkl", 4)]
  4     []
  5     []
  6     []
  7     []
```
