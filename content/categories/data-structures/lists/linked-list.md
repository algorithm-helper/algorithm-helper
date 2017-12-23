# Linked List

A linked list is a linear sequence of nodes, that have pointer fields to the next nodes in the 
sequence. A node contains a field `item` that stores some data associated with the node, and a 
pointer `next` that points to the subsequent node in the linked list, or `null` if there is no next 
node.

### Visualization

A linked list can be visualized as the following picture:

```
first 
  |
 ----      ----             ----
| a1 | -> | a2 | -> ... -> | an | -|| null
 ----      ----             ---- 
```

Nodes point to `next` nodes, until it points to `null`, which indicates the end of the linked list.

### Operations

Linked lists use the following operations:

- `get`
    - Given a particular valid index `i` (within 0 and the size of the linked
    list), retrieve the `item` at that node.
- `insert`
    - Given a particular valid index `i`, insert the new node at that position 
    and update its `item` and `next` fields. While inserting at the front or 
    back (when `i=0` or `i=n-1`, respectively), `insertFront` or `insertBack` 
    could just be called instead. When a node is inserted in between two other 
    nodes, intuitively this is done by linking the before node to the new node, 
    and then the new node to the after node.
- `insertFront`
    - Insert the new node at the front of the linked list, if the linked list is
    initially empty, then `first` points to this new node. Otherwise, point
    the `next` field of the new node to the original `first` node, and then 
    update `first` by pointing it at the new node.
- `insertBack`
    - Since we do not have a `last` pointer (which is discussed in the
    article on [Double Ended Linked Lists](/categories/data-structures/lists/double-ended-linked-list)),
    we must traverse until we reach the last node, and then point the last node's
    `next` to the new node.
- `remove`
    - Given a particular index `i`, remove the node at that position. Similar
    to insert, if `i=0` or `i=n-1`, then `removeFront` or `removeBack` could
    just be called instead, respectively. A node is removed by pointing 
    `next` of the before node to the after node.
- `removeFront`
    - Remove the node at the front of the linked list, and this is done by 
    pointing `first` to the `next` node of `first`.
- `removeBack`
    - Remove the node at the back of the linked list, and this is done by 
    traversing through the entire linked list until reaching the node 
    just before the last node, and then pointing its `next` to null.
- `peekFront`
    - Return the `item` of the node at the front of the linked list.
- `peekBack`
    - Return the `item` of the node at the back of the linked list, and this 
    is done by traversing through the entire linked list until reaching the 
    last node, and then return its `item`.

### Implementations

##### Java

View the source code [here](https://github.com/algorithm-helper/implementations/blob/master/java/com/algorithmhelper/datastructures/lists/LinkedList.java).

<script src="https://gist.github.com/eliucs/4b5ca73445ac7f4ed5aa0049b5457f17.js"></script>

### Time Complexity

The following table describes the time complexity for performing the operations above on a linked 
list:

```
| Data Structure | get  | insert | insertFront | insertBack | remove | removeFront | removeBack | peekFront | peekBack |
|----------------|------|--------|-------------|------------|--------|-------------|------------|-----------|----------|
| linked list    | O(N) | O(N)   | O(1)        | O(N)       | O(N)   | O(1)        | O(N)       | O(1)      | O(N)     |
```