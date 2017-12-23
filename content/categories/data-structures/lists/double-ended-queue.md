# Double Ended Queue

A double ended queue, also known as a deque, is a linear data structure that generalizes a queue, 
and has properties similar to both a stack and a queue combined. It has operations `insertFront` 
which adds an element to the front of the double ended queue (similar to `push` in a stack), 
`insertBack` which adds an element to the back of the double ended queue (similar to `enqueue` in a 
queue), `removeFront` which removes an element at the front of the double ended queue (similar to 
`pop` in a stack or `dequeue` in a queue), `removeBack` which removes an element at the back of the 
double ended queue, `peekFront` which returns the front-most element's `item` without removing it 
from the double ended queue and `peekBack` which returns the back-most element's `item` without 
removing it from the double ended queue. Since it is similar to a combination of first-in-first-out 
(FIFO) and last-in-first-out (LIFO), if we were to insert 3 elements (A, B, C) into the double ended 
queue in that order, we cannot get the second element B without either removing the first element A 
or the third element C.

### Visualization

The following visualizes the state of the double ended queue, starting from an empty double ended 
queue:

```
// Starting double ended queue:
[]

// insertFront(1):
[1]

// insertFront(2):
[2, 1]

// insertBack(3):
[2, 1, 3]

// insertBack(4):
[2, 1, 3, 4]

// removeFront():
[1, 3, 4]

// removeFront():
[3, 4]

// removeBack():
[3]

// removeBack():
[]

// removeFront():
Exception: cannot removeFront from empty double ended queue.
```

### Operations

- `insertFront`
    - Insert a node at the front of the double ended queue by pointing `first`
    to the new node, if this is the first node to be inserted, then also 
    point `last` to this new node.
- `insertBack`
    - Insert a node at the end of the double ended queue by pointing `last`
    to the new node, if this is the first node to be inserted, then also 
    point `first` to this new node.
- `removeFront`
    - Save the node at `first`, then point `first` to its `next` node, then 
    return the saved node.
- `removeBack`
    - Save the node at `last`, then point `last` to its `prev` node, then 
    return the saved node.
- `peekFront`
    - Return the `item` of the node at the front of the linked list.
- `peekBack`
    - Return the `item` of the node at the end of the linked list.

### Implementation

##### Java

View the source code [here](https://github.com/algorithm-helper/implementations/blob/master/java/com/algorithmhelper/datastructures/lists/DoubleEndedQueue.java).

<script src="https://gist.github.com/eliucs/f38b24f47e1829c2b04833c54a073d2f.js"></script>

### Time Complexity

The following table describes the time complexity for performing the operations above on a double 
ended queue:

```
| Data Structure     | insertFront | insertBack | removeFront | removeBack | peekFront | peekBack |
|--------------------|-------------|------------|-------------|------------|-----------|----------|
| double ended queue | O(1)        | O(1)       | O(1)        | O(1)       | O(1)      | O(1)     |
```
