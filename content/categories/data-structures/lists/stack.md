# Stack

A stack is a linear data structure in which elements are inserted and removed in last-in-first-out 
(LIFO) procedure, and can be implemented using a linked list or a dynamic array. The operation 
`push` adds an element to the top of the stack, the operation `pop` removes the top-most element of 
the stack, and the operation `peek` returns the top-most element's `item`, without removing it from 
the stack. Since it is LIFO, if we `push` two elements, we cannot retrieve the first one before 
popping out the second one.

### Visualization

The following visualizes the state of the stack, starting from an empty stack:

```
// Starting stack:
[]

// push(1):
[1]

// push(2):
[1, 2]

// push(3):
[1, 2, 3]

// push(4):
[1, 2, 3, 4]

// pop():
[1, 2, 3]

// pop():
[1, 2]

// pop():
[1]

// pop():
[]

// pop():
Exception: cannot pop from empty stack.
```

### Operations

- `push`
    - Using linked list: 
        - Insert a node at the front of the linked list by pointing `first`
        to the new node.
    - Using dynamic array:
        - Insert the element at `n`, then increment `n`, resize the array if
        necessary.
- `pop`
    - Using linked list: 
        - Save the node at `first`, then point `first` to its `next` node, then
        return the saved node.
    - Using dynamic array:
        - Save the element at `n`, then decrement `n`, resize the array if 
        necessary, then return the saved node.
- `peek`
    - Using linked list: 
        - Return the `item` of the node at the front of the linked list.
    - Using dynamic array:
        - Return the element at `n`.

With a linked list, a stack is essentially only limited to `insertFront`, `removeFront` and 
`peekFront`. With a dynamic array, a stack is essentially only limited to `insertBack`, `removeBack` 
and `peekBack`.

### Implmentation (Stack Interface)

The following provides the interface for the `Stack` class.

##### Java

<script src="https://gist.github.com/eliucs/401f801b070f1deb3fb4ce73c435a5eb.js"></script>

### Implementation (using Linked List)

##### Java

<script src="https://gist.github.com/eliucs/9c63ed46f51102c2e5efbf24cb4181bf.js"></script>

### Implementation (using Dynamic Array)

##### Java

<script src="https://gist.github.com/eliucs/972f87410dbbf18da96cb87cd918108f.js"></script>

### Time Complexity

The following table describes the time complexity for performing the operations above on a stack, 
comparing between the linked list and the dynamic array implementation:

```
| Data Structure              | push  | pop   | peek |
|-----------------------------|-------|-------|------|
| stack (using linked list)   | O(1)  | O(1)  | O(1) |
| stack (using dynamic array) | O(1)* | O(1)* | O(1) |
```

\* Amortized
