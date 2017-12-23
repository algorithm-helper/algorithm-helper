# Double Ended Linked List

A double ended linked list, also called a doubly linked list, is a linear sequence of nodes that 
have pointer fields to the next and previous nodes in the sequence. It is identical to a linked 
list, where nodes contain a field `item` that stores some data associated with the node, except it 
has two pointers, `next` which points to the subsequent node and `prev` which points to the previous 
node, or `null` if there is no next or previous node. In addition, the double ended linked list also 
has a pointer `last`, which points to the ending node.

### Visualization

A double ended linked list can be visualized as the following picture:

```
first                          last
  |                             |
 ----       ----               ----
| a1 | <-> | a2 | <-> ... <-> | an | -|| null
 ----       ----               ---- 
```

Nodes point to `next` nodes, as well as `prev` nodes, until it points to `null`, which indicates the 
end of the double ended linked list.

### Operations

Double ended linked lists use the following operations:

- `get`
    - Given a particular valid index `i` (within 0 and the size of the double 
    ended linked list), retrieve the `item` at that node.
- `insert`
    - Given a particular valid index `i`, insert the new node at that position 
    and update its `item`, `next` and `prev` fields. While inserting at the 
    front or back (when `i=0` or `i=n-1`, respectively), `insertFront` or 
    `insertBack` could just be called instead. When a node is inserted in 
    between two other nodes, intuitively this is done by linking the before 
    node's `next` to the new node, and then the new node's `next` to the after 
    node, and the after node's `prev` to the new node, and the new node's `prev` 
    to the before node.
- `insertFront`
    - Insert the new node at the front of the double ended linked list, if the 
    double ended linked list is initially empty, then `first` and `last` points 
    to this new node. Otherwise, point the `next` field of the new node to the 
    original `first` node, point the `prev`field to `null` and then update 
    `first` by pointing it at the new node.
- `insertBack`
    - Insert the new node at the end of the double ended linked list, if the 
    double ended linked list is initially empty, then `first` and `last` points 
    to this new node. Otherwise, point the `prev` field of the new node to the 
    original `last` node, point the `next` field to `null` and then update 
    `last` by pointing it at the new node.
- `remove`
    - Given a particular index `i`, remove the node at that position. Similar
    to insert, if `i=0` or `i=n-1`, then `removeFront` or `removeBack` could
    just be called instead, respectively. A node is removed by pointing 
    `next` of the before node to the after node, and by pointing `prev` of the 
    after node to the before node.
- `removeFront`
    - Remove the node at the front of the double ended linked list, and this is 
    done by pointing `first` to the `next` node of `first`, and then updating 
    the `prev` field of the new `first` node to be `null`.
- `removeBack`
    - Remove the node at the end of the double ended linked list, and this is 
    done by pointing `last` to the `prev` node of `last`, and then updating the 
    `next` field of the new `last` node to be `null`.
- `peekFront`
    - Return the `item` of `first`.
- `peekBack`
    - Return the `item` of `last`.

It is clear that comparing the double ended linked list to the regular linked list that while it is 
slightly more involved because of how the `prev` pointers and the `last` pointer have to be managed, 
it becomes more efficient to perform operations at the front and the end of the double ended linked 
list, since they can be directly accessed, and done in `O(1)` time.

### Implementations

##### Java

View the source code [here](https://github.com/algorithm-helper/implementations/blob/master/java/com/algorithmhelper/datastructures/lists/DoubleEndedLinkedList.java).

<script src="https://gist.github.com/eliucs/2165c125c621e000ac05fa21c8823ccb.js"></script>

### Time Complexity

The following table describes the time complexity for performing the operations above on a double 
ended linked list:

```
| Data Structure           | get  | insert | insertFront | insertBack | remove | removeFront | removeBack | peekFront | peekBack |
|--------------------------|------|--------|-------------|------------|--------|-------------|------------|-----------|----------|
| double ended linked list | O(N) | O(N)   | O(1)        | O(1)       | O(N)   | O(1)        | O(1)       | O(1)      | O(1)     |
```