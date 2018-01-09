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
(FIFO) and last-in-first-out (LIFO), if we were to insert 3 elements $(A, B, C)$ into the double 
ended queue in that order, we cannot get the second element $B$ without either removing the first
element $A$ or the third element $C$.

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

```
package com.algorithmhelper.datastructures.lists;

import java.util.Iterator;
import java.util.NoSuchElementException;
import com.algorithmhelper.datastructures.interfaces.Queue;
import com.algorithmhelper.datastructures.interfaces.Stack;

public class DoubleEndedQueue<T> implements Stack<T>, Queue<T> {

    private Node<T> first;
    private Node<T> last;
    private int n;

    private class Node<T> {
        private T item;
        private Node<T> next;
        private Node<T> prev;

        public Node() {}

        public Node(T item, Node<T> next, Node<T> prev) {
            this.item = item;
            this.next = next;
            this.prev = prev;
        }
    }

    /**
     * Initializes an empty DoubleEndedQueue.
     */
    public DoubleEndedQueue() {
        first = null;
        last = null;
        n = 0;
    }

    /**
     * Returns true if this DoubleEndedQueue contains no elements, otherwise false.
     *
     * @return true if this DoubleEndedQueue contains no elements, otherwise false
     */
    public boolean isEmpty() {
        return n == 0;
    }

    /**
     * Returns the number of elements contained in the DoubleEndedQueue.
     *
     * @return the number of elements contained in the DoubleEndedQueue
     */
    public int size() {
        return n;
    }

    /**
     * Inserts the item to the front of the DoubleEndedQueue.
     *
     * @param item, the item to be inserted
     * @throws IllegalArgumentException if the item is null
     */
    public void insertFront(T item) {
        if (item == null)
            throw new IllegalArgumentException("insertFront with null item");

        Node<T> oldFirst = first;
        first = new Node(item, oldFirst, null);

        if (isEmpty())
            last = first;
        else
            oldFirst.prev = first;
        n++;
    }

    /**
     * Inserts the item to the back of the DoubleEndedQueue.
     *
     * @param item, the item to be inserted
     * @throws IllegalArgumentException if the item is null
     */
    public void insertBack(T item) {
        if (item == null)
            throw new IllegalArgumentException("insertBack with null item");

        Node<T> oldLast = last;
        last = new Node(item, null, oldLast);

        if (isEmpty())
            first = last;
        else
            oldLast.next = last;
        n++;
    }

    /**
     * Removes the item at the front of the DoubleEndedQueue, and returns it.
     *
     * @return the item at the front of the DoubleEndedQueue
     * @throws NoSuchElementException if this DoubleEndedQueue is empty
     */
    public T removeFront() {
        if (isEmpty())
            throw new NoSuchElementException("removeFront from empty DoubleEndedQueue");

        T item = first.item;
        first = first.next;
        first.prev = null;

        n--;

        if (isEmpty())
            last = null;
        return item;
    }

    /**
     * Removes the item at the back of the DoubleEndedQueue, and returns it.
     *
     * @return the item at the back of the DoubleEndedQueue
     * @throws NoSuchElementException if this DoubleEndedQueue is empty
     */
    public T removeBack() {
        if (isEmpty())
            throw new NoSuchElementException("removeBack from empty DoubleEndedQueue");

        T item = last.item;
        last = last.prev;
        last.next = null;

        n--;

        if (isEmpty())
            first = null;
        return item;
    }

    /**
     * Returns the item at the front of the DoubleEndedQueue.
     *
     * @return the item at the front of the DoubleEndedQueue
     * @throws NoSuchElementException if this DoubleEndedQueue is empty
     */
    public T peekFront() {
        if (isEmpty())
            throw new NoSuchElementException("peekFront from empty DoubleEndedQueue");

        return first.item;
    }

    /**
     * Returns the item at the back of the DoubleEndedQueue.
     *
     * @return the item at the back of the DoubleEndedQueue
     * @throws NoSuchElementException if this DoubleEndedQueue is empty
     */
    public T peekBack() {
        if (isEmpty())
            throw new NoSuchElementException("peekBack from empty DoubleEndedQueue");

        return last.item;
    }

    /**
     * Inserts the item to the back of the DoubleEndedQueue.
     *
     * @param item, the item to be inserted
     */
    public void push(T item) {
        insertBack(item);
    }

    /**
     * Inserts the item to the back of the DoubleEndedQueue.
     *
     * @param item, the item to be inserted
     */
    public void enqueue(T item) {
        insertBack(item);
    }

    /**
     * Removes the item at the back of the DoubleEndedQueue, and returns it.
     */
    public T pop() {
        return removeBack();
    }

    /**
     * Removes the item at the front of the DoubleEndedQueue, and returns it.
     */
    public T dequeue() {
        return removeFront();
    }

    /**
     * Returns the item at the front of the DoubleEndedQueue.
     */
    public T peek() {
        return peekFront();
    }

    /**
     * Returns a String representation of the DoubleEndedQueue, in the form [x0, x1, ... xn] where
     * x0...xn are elements of the DoubleEndedQueue in forward order.
     *
     * @return a String representation of the DoubleEndedQueue, with elements separated by a comma
     *         and space
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
     * Returns an Iterator to the DoubleEndedQueue that iterates through the elements of the
     * DoubleEndedQueue in forward order.
     *
     * @return an Iterator to the DoubleEndedQueue that iterates through the elements of the
     *         DoubleEndedQueueue in forward order
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
                    throw new NoSuchElementException("iterator does not have next element");
                T item = current.item;
                current = current.next;
                return item;
            }
        };
    }
}
```

### Time Complexity

The following table describes the time complexity for performing the operations above on a double 
ended queue:

```
| Data Structure     | insertFront | insertBack | removeFront | removeBack | peekFront | peekBack |
|--------------------|-------------|------------|-------------|------------|-----------|----------|
| double ended queue | O(1)        | O(1)       | O(1)        | O(1)       | O(1)      | O(1)     |
```
