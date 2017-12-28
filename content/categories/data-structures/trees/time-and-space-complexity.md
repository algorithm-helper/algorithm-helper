# Time and Space Complexity

This article will elaborate further on the time and space complexities of the operations on the tree 
data structures discussed in this topic. Data structures with similar operations will be grouped 
together.

### Comparisons

We start off with binary search trees, red-black trees, and AVL trees, because they have the same 
operations: `contains`, `get`, `put`, `max`/`min`, `delete`, `deleteMax`/`deleteMin`, 
`floor`/`ceil`, `select`, and `rank`. We describe their time complexities below.

```
| Data Structure     | contains  | get     | put     | max     | min     | delete  | deleteMax  | deleteMin  | floor   | ceil    | select  | rank    |
|--------------------|-----------|---------|---------|---------|---------|---------|------------|------------|---------|---------|---------|---------|
| binary search tree | O(H)      | O(H)    | O(H)    | O(H)    | O(H)    | O(H)    | O(H)       | O(H)       | O(H)    | O(H)    | O(H)    | O(H)    |
| red-black tree     | O(logN)   | O(logN) | O(logN) | O(logN) | O(logN) | O(logN) | O(logN)    | O(logN)    | O(logN) | O(logN) | O(logN) | O(logN) |
| AVL tree           | O(logN)   | O(logN) | O(logN) | O(logN) | O(logN) | O(logN) | O(logN)    | O(logN)    | O(logN) | O(logN) | O(logN) | O(logN) |
```

For the binary search tree, the operation `contains` requires traversing down the tree until finding
the correct node with the given `key`, or reaching `null` and determining that the `key` does not in 
fact, exist in the tree. But because of the fact that a regular binary search tree does not 
guarantee balance, we can only say that it runs in $O(H)$ time, where $H$ is the height of the tree. 
The height of the tree can be at most exactly $N$, and that would be a situation where the binary 
search tree has degenerated into a linked list, where there is a severe imbalance in the tree. But 
for red-black trees and AVL trees on the other hand, because they self-balance, their heights are at
most $2logN$, and thus the operation `contains` runs in $O(logN)$ time. This is true for all of the 
remaining operations: `put`, `max`/`min`, `delete`, `deleteMax`/`deleteMin`, `floor`/`ceil`, 
`select`, and `rank`.

---

We will look at heaps (implemented with dynamically resizing arrays), with the binary max heap and 
the binary min heap. The time complexities for the operations `insert`, `extractMax`, `extractMin`, 
`max`, and `min` are described below:

```
| Data Structure  | insert  | extractMax | extractMin  | max  | min  |
|-----------------|---------|------------|-------------|------|------|
| binary max heap | O(logN) | O(logN)    | n/a         | O(1) | n/a  |
| binary min heap | O(logN) | n/a        | O(logN)     | n/a  | O(1) |
```

Note that we do not consider the operation `extractMin` or `min` for binary heaps and vice versa.

For both the binary max heap and the binary min heap, the operation `insert` relies on the basic 
operation `heapifyUp`. But because the heap is perfectly balanced, the amount of nodes to swap 
during that `heapifyUp` operation is no more than $logN$, and thus `insert` runs in $O(logN)$ time.

For both the binary max heap and the binary min heap, the operation `extractMax` or `extractMin` 
relies on the basic operation `heapifyDown`. Similarly, because the heap is perfectly balanced, the 
amount of nodes to swap down during that `heapifyDown` operation is no more than $logN$, and thus 
`extractMax` and `extractMin` run in $O(logN)$ time.

The operation `max` and `min` is simply a matter of returning the element at index 1, and thus is 
done in $O(1)$ time.

---

We will look at the following priority queues: priority max queue (implemented with a binary max 
heap), priority min queue (implemented with a binary min heap), and double ended priority queue 
(implemented with a red-black tree). The time complexities for the operations `insert`, 
`extractMax`, `extractMin`, `max`, and `min` are described below:

```
| Data Structure              | insert  | extractMax  | extractMin  | max     | min     |
|-----------------------------|---------|-------------|-------------|---------|---------|
| priority max queue          | O(logN) | O(logN)     | n/a         | O(1)    | n/a     |
| priority min queue          | O(logN) | n/a         | O(logN)     | n/a     | O(1)    |
| double ended priority queue | O(logN) | O(logN)     | O(logN)     | O(logN) | O(logN) |
```

For the priority max queue and the priority min queue, the operations `insert`, `extractMax`, and 
`extractMax` depends on their respective underlying binary heap, and thus they run in $O(logN)$ time. 
The same is true for `max` and `min`, and thus those operations run in $O(1)$ time.

For the double ended priority queue, the operations `insert`, `extractMax`, `extractMin`, `max`, and 
`min` depend on its underlying red-black tree, and thus those operations all run in $O(logN)$ time.

---

We will look at union find/disjoint, and the time complexities for `union` and `connected` are 
described below:

```
| Data Structure            | union   | connected  |
|---------------------------|---------|------------|
| union find / disjoint set | O(logN) | O(logN)    |
```

For the operations `union` and `connected`, we consider two elements `i` and `j`. The operation 
`union` is a matter of linking the root-most node of the trees from traversing up the parent of `i` 
and `j`, and then comparing which tree starting from that root has the larger size, and linking the 
root of the smaller tree to the root of the larger tree. Since there are at most $logN$ nodes
to traverse up the tree, this is done in $O(logN)$ time.

Similarly with the operation `connected`, we traverse up the parent nodes of `i` and `j` until we 
reach their root-most nodes and compare the roots. Since there are at most $logN$ nodes to traverse 
up the tree, this is done in $O(logN)$ time.