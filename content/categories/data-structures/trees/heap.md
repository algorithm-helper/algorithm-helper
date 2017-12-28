# Heap

A heap is a tree type data structure that satisfies the heap property. The heap property differs 
depending on whether we are considering max heaps or min heaps. With a max heap, the heap property 
is that the parent node is always greater than its children. With a min heap, the heap property is 
that the parent node is always less than its children. We consider binary heaps, which are heaps 
where each node has at most two children.

They are most commonly implemented using a single dynamically resizing array, and to determine left 
children nodes, right children nodes, and parent nodes, were can use array arithmetic.

Heaps has the property that they are always balanced, and thus the height of a heap is always 
$logN$. Heaps are a useful data type for implementing priority queues, since we can extract the 
minimum or the maximum element (depending on whether it is a max heap or a min heap) in $O(logN)$ 
time (more can be read on the article on the 
[Priority Queue](/categories/data-structures/trees/priority-queue)).

Given an index $i$:

- The parent node is at $i/2$ (where $i/2 \gt 1$)
- The left node is at $2i$ (where $2i \leq the\,size\,of\,the\,binary\,heap$)
- The right node is at $2i+1$ (where $2i+1 \leq the\,size\,of\,the\,binary\,heap$)

### Heapify Up / Heapify Down

Heaps use the basic operations `heapifyUp` and `heapifyDown`, which are used to rebalance the heap 
structure and maintain the heap property. For the purposes of the example, we will consider the 
binary max heap. The operation `heapifyUp` checks the node against its parent node, and if it is 
larger than its parent, they swap. This continues until the max heap property is restored:

```
// Suppose we start off with the following binary max heap:

               10
             /    \
            7      5
           / \    / \
          3   2  1   

// insert(8):
// Then we place the node 8 into the next available space in the tree, which
// happens to the right link of node 5:

               10
             /    \
            7      5
           / \    / \
          3   2  1   8

// However, now we do not satisfy the max heap property, so we perform
// heapifyUp from node 8:

               10
             /    \
            7      8
           / \    / \
          3   2  1   5

// Now we have satisfied the max heap property, so we have a binary max heap.
```

For the operation `heapifyDown`, we consider that node with its two children, and if both the 
children are greater than the node, we swap it with the greater of its two children:

```
// Suppose we start off with the following binary max heap:

               5
             /   \
            7     9
           / \   / \
          3   2 1   4

// This does not satify the max heap property since the node 9 > node 5, then
// we swap 5 and its right Node:

               9
             /   \
            7     5
           / \   / \
          3   2 1   4

// Now we have satisfied the max heap property, so we have a binary max heap.
```

Note that generally, Heaps are implemented as a 1-indexed array rather than being 0-indexed. This 
has to do with the arithmetic working out easier.

### Binary Max Heap

A binary max heap is a binary tree type structure that satisfies the (max) heap property, which is 
that the parent node is always larger than its left and right children nodes. It generally supports 
the operations `insert`, `extractMax`, and `max`, which inserts an element into the data structure, 
removes the largest element, and returns the largest element without removing it, respectively.

It is implemented with a dynamically resizing array, and we use array arithmetic to determine the 
index of the left, right and parent nodes. 

When we perform the operation `extractMax`, the main idea is that we swap the maximum element with 
the last element in the array, `heapifyDown` starting from the root element (element at index 1), 
and remove the last element in the array:

```
// Suppose we have the following binary max heap represented as an array:

[null, 10, 7, 5, 3, 2, 1, 4]

// This corresponds to the tree:

               10
             /    \
            7      5
           / \    / \
          3   2  1   4

// extractMax():
10

// We swap the root node 10 with the last element in the array, noe 4:

               4
             /   \
            7     5
           / \   / \
          3   2 1   10

// The last element in the array is removed:

               4
             /   \
            7     5
           / \   / \
          3   2 1   

// We heapifyDown from node 4, since it is smaller than both its left and right
// child nodes, we swap with the larger of the two, which is node 7:

               7
             /   \
            4     5
           / \   / \
          3   2 1   

// Now we have satisfied the max heap property, so we have a binary max heap.
```

Since max is simply returning the element at array index 1, it is done in $O(1)$ time. For the 
operations `insert` and `extractMax`, intuitively because we have to swap at most $H$ amount of 
times, where $H$ is the height of tree structure, and the tree is completely balanced, its time 
complexity is $O(logN)$.

### Binary Min Heap

A binary min heap is a binary tree type structure that satisfies the min heap property, which is 
that the parent node is always smaller than its left and right children nodes. It generally supports 
`insert`, `extractMin`, and `min`, which inserts an element into the data structure, removes the 
smallest element, and returns the smallest element without removing it, respectively.

It is implemented with a dynamically resizing array, and we use array arithmetic to determine the 
index of left, right, and parent nodes, as explained above.

When we perform the operation `extractMin`, the main idea is that we swap the minimum element with 
the last element in the array, `heapifyDown` starting from the root (at index 1) and remove the last 
element in the array:

```
// Suppose we have the following binary min heap represented as an array:

[null, 1, 3, 2, 10, 7, 5, 4]

// This corresponds to the tree:

               1
             /   \
            3     2
           / \   / \
         10   7 5   4

// extractMin():
1

// We swap the root node 1 with the last element in the array, node 4:

               4
             /   \
            3     2
           / \   / \
         10   7 5   1

// The last element in the array is removed:

               4
             /   \
            3     2
           / \   / \
         10   7 5   

// We heapifyDown from node 4, since it is larger than both its left and right
// child nodes, we swap with the smaller of the two, which is node 2:

               2
             /   \
            3     4
           / \   / \
         10   7 5   

// Now we have satisfied the min heap property, so we have a binary min heap.
```

Since min is simply returning the element at array index 1, it is done in $O(1)$ time. For the 
operations `insert` and `extractMin`, intuitively because we have to swap at most $H$ amount of 
times, where $H$ is the height of tree structure, and the tree is completely balanced, its time 
complexity is $O(logN)$.

### Operations

For binary max heap:

- `insert`
    - Inserts an element into the heap. This is done by inserting the element
    at the next available position in the underlying dynamically resizing array
    and continuously calling `heapifyUp` until the heap property is restored, 
    and the new element is in the correct place.
- `extractMax`
    - Removes the maximum element in the heap and then returns it. This is done
    by swapping the maximum element, which is at the root of the heap, at index
    1 in the underlying dynmically resizing array, with the last element in the
    array. Then the `size` of the heap is decremented, which effectively 
    removes the last element (the maximum element) from the heap since there is
    no more reference to it. Then starting from the root element (at index 1),
    `heapifyDown` is continously called until the heap property is restored.
- `max`
    - Returns the maximum element in the heap by returning the element at the
    root of the heap, which is at index 1 in the underlying dynamically resizing 
    array.

For binary min heap:

- `insert`
    - Inserts an element into the heap. This is done by inserting the element
    at the next available position in the underlying dynamically resizing array
    and continuously calling `heapifyUp` until the heap property is restored, 
    and the new element is in the correct place.
- `extractMin`
    - Removes the minimum element in the heap and then returns it. This is done
    by swapping the minimum element, which is at the root of the heap, at index
    1 in the underlying dynmically resizing array, with the last element in the
    array. Then the `size` of the heap is decremented, which effectively 
    removes the last element (the minimum element) from the heap since there is
    no more reference to it. Then starting from the root element (at index 1),
    `heapifyDown` is continously called until the heap property is restored.
- `min`
    - Returns the minimum element in the heap by returning the element at the
    root of the heap, which is at index 1 in the underlying dynamically resizing 
    array.

### Implementation (Binary Max Heap)

##### Java

<script src="https://gist.github.com/eliucs/b2e1269522ade4a8b7386dcd1b7d6663.js"></script>

### Implementation (Binary Min Heap)

##### Java

<script src="https://gist.github.com/eliucs/379477c3cb13add9c5a7d4e696766ed1.js"></script>

### Time Complexity

The following table describes the time complexity for performing the operations above on an binary 
max heap:

```
| Data Structure  | insert  | extractMax  | max  |
|-----------------|---------|-------------|------|
| binary max heap | O(logN) | O(logN)     | O(1) |
```

The following table describes the time complexity for performing the operations above on an binary 
min heap:

```
| Data Structure  | insert  | extractMin  | min  |
|-----------------|---------|-------------|------|
| binary min heap | O(logN) | O(logN)     | O(1) |
```

