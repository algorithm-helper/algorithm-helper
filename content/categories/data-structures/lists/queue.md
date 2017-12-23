# Queue

A queue is a linear data structure in which elements are inserted and removed in first-in-first-out 
(FIFO) procedure, and can be implemented using a linked list or a dynamic array. The operation 
`enqueue` adds an element to the back of the queue, the operation `dequeue` removes the front-most 
element of the queue, and the operation `peek` returns the front-most element's `item`, without 
removing it from the queue. Since it is FIFO, if we `enqueue` two elements, we cannot retrieve the 
second one before dequeuing out the first one.

### Visualization

The following visualizes the state of the queue, starting from an empty queue:

```
// Starting queue:
[]

// enqueue(1):
[1]

// enqueue(2):
[1, 2]

// enqueue(3):
[1, 2, 3]

// enqueue(4):
[1, 2, 3, 4]

// dequeue():
[2, 3, 4]

// dequeue():
[3, 4]

// dequeue():
[4]

// dequeue():
[]

// dequeue():
Exception: cannot dequeue from empty queue.
```

### Operations

Note that we are using a double ended linked list, as well as a modified dynamic array with a 
`first` index to be able to track the array index of the front-most element in the queue.

- `enqueue`
    - Using linked list: 
        - Insert a node at the end of the linked list by pointing `last`
        to the new node, and if it is the first element to be inserted, point
        `first` to the new node as well.
    - Using dynamic array:
        - Insert the element at the `last` index, then increment `last`, resize 
        the array if necessary.
- `dequeue`
    - Using linked list: 
        - Save the node at `first`, then point `first` to its `next` node, then 
        return the saved node.
    - Using dynamic array:
        - Save the element at the `first` index, then increment `first`, resize 
        the array if necessary.
- `peek`
    - Using linked list: 
        - Return the `item` of the node at the front of the linked list.
    - Using dynamic array:
        - Return the element at the `first` index.

With a linked list, a queue is essentially only limited to `insertBack`, 
`removeFront` and `peekFront`. With a dynamic array,
a stack is essentially only limited to `insertBack`, `removeFront` and 
`peekBack`. 

Note that with the dynamic array implementation, because when we are dequeuing elements we need to 
increment `first`, the `first` index does not necessarily correspond to index 0. It follows that 
this would waste unnecessary amounts of space at the front of the array, before `first`. So whenever 
we need to resize the array, the elements get copied to the new array starting at index 0, and the
`first` and `last` indices are updated accordingly. See the implementation below for clarification.

### Implementation (Queue Interface)

##### Java

View the source code [here](https://github.com/algorithm-helper/implementations/tree/master/java/com/algorithmhelper/datastructures/interfaces/Queue.java).

<script src="https://gist.github.com/eliucs/b42be2fb7d50eb09c9f7868e20b4913e.js"></script>

### Implementation (using Linked List)

##### Java

View the source code [here](https://github.com/algorithm-helper/implementations/blob/master/java/com/algorithmhelper/datastructures/lists/QueueLinkedList.java).

<script src="https://gist.github.com/eliucs/c009375664ac0daf9ab4151000b47d0f.js"></script>

### Implementation (using Dynamic Array)

##### Java

View the source code [here](https://github.com/algorithm-helper/implementations/blob/master/java/com/algorithmhelper/datastructures/lists/QueueDynamicArray.java).

<script src="https://gist.github.com/eliucs/f17a23d0a7419953a7f9fe9ffa369372.js"></script>

### Time Complexity

The following table describes the time complexity for performing the operations above on a queue, 
comparing between the linked list and the dynamic array implementation:

```
| Data Structure              | enqueue | dequeue | peek |
|-----------------------------|---------|---------|------|
| queue (using linked list)   | O(1)    | O(1)    | O(1) |
| queue (using dynamic array) | O(1)*   | O(1)*   | O(1) |
```

\* Amortized