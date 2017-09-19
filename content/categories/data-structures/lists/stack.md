# Stack

A stack is a linear data structure in which elements are inserted and 
removed in last-in-first-out (LIFO) procedure, and can be implemented 
using a linked list or a vector/dynamically resizing array. The operation
`push` adds an element to the top of the stack, the operation `pop`
removes the top-most element of the stack, and the operation `peek`
returns the top-most element's `item`, without removing it from the stack.
Since it is LIFO, if we `push` two elements, we cannot retrieve the 
first one before popping out the second one.

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
    - Using vector/dynamically resizing array:
        - Insert the element at `n`, then increment `n`, resize the array if
        necessary.
- `pop`
    - Using linked list: 
        - Save the node at `first`, then point `first` to its `next` node, then
        return the saved node.
    - Using vector/dynamically resizing array:
        - Save the element at `n`, then decrement `n`, resize the array if 
        necessary, then return the saved node.
- `peek`
    - Using linked list: 
        - Return the `item` of the node at the front of the linked list.
    - Using vector/dynamically resizing array:
        - Return the element at `n`.

With a linked list, a stack is essentially only limited to `insertFront`, 
`removeFront` and `peekFront`. With a vector/dynamically resizing array,
a stack is essentially only limited to `insertBack`, `removeBack` and 
`peekBack`.

### Implementation (using Linked List)

##### Java

```
package com.example;

import java.util.Iterator;
import java.util.NoSuchElementException;

public class StackLinkedList<T> implements Iterable<T> {

    private Node<T> first;
    private int n;

    private class Node<T> {
        private T item;
        private Node<T> next;

        public Node() {}

        public Node(T item, Node<T> next) {
            this.item = item;
            this.next = next;
        }
    }

    /**
     * Initializes an empty StackLinkedList.
     */
    public StackLinkedList() {
        first = null;
        n = 0;
    }

    /**
     * Return true is this StackLinkedList contains no elements, otherwise
     * false.
     *
     * @return true is this StackLinkedList contains no elements, otherwise
     *         false
     */
    public boolean isEmpty() {
        return first == null;
    }

    /**
     * Returns the number of elements contained in the StackLinkedList.
     *
     * @return the number of elements contained in the StackLinkedList
     */
    public int size() {
        return n;
    }

    /**
     * Inserts item to the top of the StackLinkedList.
     *
     * @param item, the item to be inserted
     * @throws IllegalArgumentException if the item is null
     */
    public void push(T item) {
        if (item == null)
            throw new IllegalArgumentException("push with null item");

        Node<T> oldFirst = first;
        first = new Node(item, oldFirst);
        n++;
    }

    /**
     * Removes item at the top of the StackLinkedList, and returns it.
     *
     * @return the item at the top of the StackLinkedList
     * @throws NoSuchElementException if this StackLinkedList is empty
     */
    public T pop() {
        if (isEmpty())
            throw new NoSuchElementException("pop from empty " +
                    "StackLinkedList");
        T item = first.item;
        first = first.next;
        n--;
        return item;
    }

    /**
     * Returns the item at the top of the StackLinkedList.
     *
     * @return the item at the top of the StackLinkedList
     * @throws NoSuchElementException if this StackLinkedList is empty
     */
    public T peek() {
        if (isEmpty())
            throw new NoSuchElementException("peek from empty " +
                    "StackLinkedList");
        return first.item;
    }

    /**
     * Returns a String representation of the StackLinkedList, in the form
     * [x0, x1, ... xn] where x0...xn are elements of the StackLinkedList in
     * reverse order.
     *
     * @return a String representation of the StackLinkedList, with elements
     *         separated by a comma and space
     */
    public String toString() {
        if (isEmpty())
            return "[]";

        StringBuilder sb = new StringBuilder();
        sb.append('[');
        for (T item : this) {
            sb.append(item);
            sb.append(',');
            sb.append(' ');
        }
        sb.append(']');
        return sb.toString();
    }

    /**
     * Returns an Iterator to the StackLinkedList that iterates through the
     * elements of the StackLinkedList in reverse order.
     *
     * @return an Iterator to the StackLinkedList that iterates through the
     *         elements of the StackLinkedList in reverse order.
     */
    public Iterator<T> iterator() {
        return new Iterator<T>() {

            private Node<T> current = first;

            @Override
            public boolean hasNext() {
                return current != null;
            }

            @Override
            public T next() {
                if (!hasNext())
                    throw new NoSuchElementException("iterator does not have " +
                            "next element");
                T item = current.item;
                current = current.next;
                return item;
            }
        };
    }
}

```

### Implementation (using Vector)

##### Java

```
package com.example;

import java.util.Iterator;
import java.util.NoSuchElementException;

public class StackResizingArray<T> implements Iterable<T> {

    private T[] arr;
    private int n;

    /**
     * Initializes an empty StackResizingArray.
     */
    public StackResizingArray() {
        arr = (T[]) new Object[1];
        n = 0;
    }

    /**
     * Return true is this StackResizingArray contains no elements, otherwise
     * false.
     *
     * @return true is this StackResizingArray contains no elements, otherwise
     *         false
     */
    public boolean isEmpty() {
        return n == 0;
    }

    /**
     * Returns the number of elements contained in the StackResizingArray.
     *
     * @return the number of elements contained in the StackResizingArray
     */
    public int size() {
        return n;
    }

    /**
     * Resizes the StackResizingArray arr field to newSize.
     *
     * @param newSize, the new size of the arr
     * @throws IllegalArgumentException if newSize <= 0
     */
    private void resize(int newSize) {
        if (newSize <= 0)
            throw new IllegalArgumentException("resize with invalid newSize");

        T[] temp = (T[]) new Object[newSize];
        for (int i = 0; i < n; i++)
            temp[i] = arr[i];
        arr = temp;
    }

    /**
     * Inserts item to the top of the StackResizingArray, but if the arr
     * exceeds its capacity, then double the size of the arr.
     *
     * @param item, the item to be inserted
     * @throws IllegalArgumentException if the item is null
     */
    public void push(T item) {
        if (item == null)
            throw new IllegalArgumentException("push with null item");

        if (n == arr.length)
            resize(2 * arr.length);
        arr[n++] = item;
    }

    /**
     * Removes item at the top of the StackResizingArray, and returns it, but
     * if the arr is below a quarter of the arr capacity, halve the arr size
     *
     * @return the item at the top of the StackResizingArray
     * @throws NoSuchElementException if this StackResizingArray is empty
     */
    public T pop() {
        if (isEmpty())
            throw new NoSuchElementException("pop from empty " +
                    "StackResizingArray");
        T item = arr[--n];
        arr[n] = null;
        if (n > 0 && n == arr.length/4)
            resize(arr.length/2);
        return item;
    }

    /**
     * Returns the item at the top of the StackResizingArray.
     *
     * @return the item at the top of the StackResizingArray
     * @throws NoSuchElementException if this StackResizingArray is empty
     */
    public T peek() {
        if (isEmpty())
            throw new NoSuchElementException("peek from empty " +
                    "StackResizingArray");
        return arr[n-1];
    }

    /**
     * Returns a String representation of the StackResizingArray, in the form
     * [x0, x1, ... xn] where x0...xn are elements of the StackResizingArray in
     * reverse order.
     *
     * @return a String representation of the StackResizingArray, with elements
     *         separated by a comma and space
     */
    public String toString() {
        if (isEmpty())
            return "[]";

        StringBuilder sb = new StringBuilder();
        sb.append('[');
        for (T item : this) {
            sb.append(item);
            sb.append(',');
            sb.append(' ');
        }
        sb.append(']');
        return sb.toString();
    }

    /**
     * Returns an Iterator to the StackResizingArray that iterates through the
     * elements of the StackResizingArray in reverse order.
     *
     * @return an Iterator to the StackResizingArray that iterates through the
     *         elements of the StackResizingArray in reverse order.
     */
    public Iterator<T> iterator() {
        return new Iterator<T>() {

            private int i = n;

            @Override
            public boolean hasNext() {
                return i > 0;
            }

            @Override
            public T next() {
                if (!hasNext())
                    throw new NoSuchElementException("iterator does not have " +
                            "next element");
                return arr[--i];
            }
        };
    }
}
```

### Time Complexity

The following table describes the time complexity for performing the operations 
above on a stack, comparing between the linked list and the vector/dynamically 
resizing array implementation:

```
| Data Structure                                    | push  | pop   | peek |
|---------------------------------------------------|-------|-------|------|
| stack (using linked list)                         | O(1)  | O(1)  | O(1) |
| stack (using vector / dynamically resizing array) | O(1)* | O(1)* | O(1) |
```

\* Amortized
