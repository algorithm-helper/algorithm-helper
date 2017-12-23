# Dynamic Array

A dynamic array, also called a vector or dynamically resizing array, is a linear data structure 
using an array. They overcome the problem of having arrays being of fixed size by copying the 
contents of the array into a larger array once the original has become full, or into a smaller array 
once elements get removed at a certain point, to avoid using up large amounts of memory. A dynamic 
array has an array back-end and an index, which represents the number of elements in the array, and 
is incremented every time an element is inserted and decremented every time an element is removed. 
This index also represents the next index location in the array to insert.

### Resizing

One of the concerns with the array is resizing is a question of when it becomes full, how much do 
we resize it by? Consider the naive implementation, where every time a new element is inserted, the 
elements of the original array are copied over to an array of size 1 larger. The problem with this 
is that this would mean that because the entire array needs to be copied each time, this operation 
is done in `O(N)` time. Moreover, when elements get removed from the array, there is no mechanism to 
make the array shrink to save space.

We can amortize the cost of inserting (read more about this in the article on 
[Amortization](/categories/data-structures/lists/amortization)). The resizing strategy is to double 
the size of the array when it becomes full. Consider `N` number of insertions. For insertion, this 
works because the cost of the doubling has been amortized overall the `N` insertions. We only have
to double `lgN` times. So the total cost of the insertion becomes:

```
= O(2^0 + 2^1 + ... 2^lgN)
= O(N)
```

But this is the total cost over N elements. So per element it becomes:

```
= O(N)/N
= O(1)
```

Now we consider when elements get removed. The naive implementation of deletion is to never shrink 
the array when elements are removed, or to halve the size of the array once the array becomes half 
full. First, this wastes an unnecessary amount of space, and second, consider what happens when we 
do a number of insertions and deletions of one element at example when the array is half full.
Then each operation causes the data structure to be repeatedly doubled and halved, which take 
uncessary `O(N)` time, each time. To avoid situations like this, the array size will be halved once 
the array is a quarter full.

### Visualization

The following visualizes the state of the array, starting from an empty array 
of size 1:

```
// Starting array:
[  ]

// Insert a1:
[a1]

// Insert a2, by first doubling the size of the array:
[a1][a2]

// Insert a3, by first doubling the size of the array:
[a1][a2][a3][  ]

// Insert a4:
[a1][a2][a3][a4]

// Insert a5, by first doubling the size of the array:
[a1][a2][a3][a4][a5][  ][  ][  ]

// Insert a6:
[a1][a2][a3][a4][a5][a6][  ][  ]

// Insert a7:
[a1][a2][a3][a4][a5][a6][a7][  ]

// Remove last element:
[a1][a2][a3][a4][a5][a6][  ][  ]

// Remove last element:
[a1][a2][a3][a4][a5][  ][  ][  ]

// Remove last element:
[a1][a2][a3][a4][  ][  ][  ][  ]

// Remove last element:
[a1][a2][a3][  ][  ][  ][  ][  ]

// Remove last element, then halve the size of the array since it is 
// only a quarter full:
[a1][a2][  ][  ]
```

### Operations

Vectors use the following operations:

- `get`
    - Given a particular valid index `i` (within 0 and the size of the dynamic 
    array), retrieve the `item` at that index into the array.
- `insert`
    - Given a particular valid index `i`, insert the new element at that 
    position by shifting all elements in the array at `i` to the right, resize 
    the array if necessary. While inserting at the front or back (when `i=0` or 
    `i=n-1`, respectively), `insertFront` or `insertBack` could just be called 
    instead.
- `insertFront`
    - Insert the element at index 0 by shifting all elements from index 0 over 
    to the right, and then assigning index 0 to be the new element, resize the 
    array if necessary.
- `insertBack`
    - Insert the element at index `n`, then incrementing `n`, resize the 
    array if necessary.
- `remove`
    - Given a particular index `i`, remove the element at that position by 
    shifting all elements from index `i+1` to the left, and then decrement `n`,
    resize the array if necessary.
- `removeFront`
    - Remove the element at the front of the dynamic array by shifting all 
    elements in the array from index 1 over to the left, and then decrement `n`, 
    resize the array if necessary.
- `removeBack`
    - Remove the element at the end of the dynamic array by decrementing `n`, 
    resize the array if necessary.
- `peekFront`
    - Return the `item` at index 0.
- `peekBack`
    - Return the `item` at index `n-1`.

It is clear that while we can retrieve elements at particular indices, and perform operations on the 
end of the array efficiently in `O(1)` time since we can conveniently just increment and decrement 
`n`, other operations like inserting or removing an element at an arbitrary position in the array 
are done in `O(N)` time since they require shifting over elements in the array. Insertion or 
removing the first item is even worse, as we need to shift the entire array's contents, also in 
`O(N)` time.

### Implementations

##### Java

View the source code [here](https://github.com/algorithm-helper/implementations/blob/master/java/com/algorithmhelper/datastructures/lists/DynamicArray.java).

<script src="https://gist.github.com/eliucs/e48f984426ed1ae08c1cbf3f3ef46c5b.js"></script>

### Time Complexity

The following table describes the time complexity for performing the operations above on a dynamic 
array:

```
| Data Structure   | get  | insert | insertFront | insertBack | remove | removeFront | removeBack | peekFront | peekBack |
|------------------|------|--------|-------------|------------|--------|-------------|------------|-----------|----------|
| dynamic array    | O(1) | O(N)   | O(N)        | O(1)*      | O(N)   | O(N)        | O(1)*      | O(1)      | O(1)     |
```

\* Amortized