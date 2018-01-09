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

With a linked list, a queue is essentially only limited to `insertBack`, `removeFront` and 
`peekFront`. With a dynamic array, a stack is essentially only limited to `insertBack`, 
`removeFront` and `peekBack`. 

Note that with the dynamic array implementation, because when we are dequeuing elements we need to 
increment `first`, the `first` index does not necessarily correspond to index 0. It follows that 
this would waste unnecessary amounts of space at the front of the array, before `first`. So whenever 
we need to resize the array, the elements get copied to the new array starting at index 0, and the
`first` and `last` indices are updated accordingly. See the implementation below for clarification.

### Implementation (Queue Interface)

##### Java

```
package com.algorithmhelper.datastructures.interfaces;

public interface Queue<T> extends Iterable<T> {

    /**
     * Returns true if the Queue contains no elements, otherwise false.
     *
     * @return true if the Queue contains no elements, otherwise false
     */
    boolean isEmpty();

    /**
     * Returns the number of elements contained in the Queue.
     *
     * @return the number of elements contained in the Queue
     */
    int size();

    /**
     * Inserts the item to the back of the Queue.
     *
     * @param item, the item to be inserted
     */
    void enqueue(T item);

    /**
     * Removes the item at the front of the Queue, and returns it.
     *
     * @return the item at the front of the Queue
     */
    T dequeue();

    /**
     * Returns the item at the front of the Queue.
     *
     * @return the item at the front of the Queue
     */
    T peek();
}
```

### Implementation (using Linked List)

##### Java

```
package com.algorithmhelper.datastructures.lists;

import java.util.Iterator;
import java.util.NoSuchElementException;
import com.algorithmhelper.datastructures.interfaces.Queue;

public class QueueLinkedList<T> implements Queue<T> {

    private Node<T> first;
    private Node<T> last;
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
     * Initializes an empty QueueLinkedList.
     */
    public QueueLinkedList() {
        first = null;
        last = null;
        n = 0;
    }

    /**
     * Returns true if this QueueLinkedList contains no elements, otherwise false.
     *
     * @return true if this QueueLinkedList contains no elements, otherwise false
     */
    public boolean isEmpty() {
        return first == null;
    }

    /**
     * Returns the number of elements contained in the QueueLinkedList.
     *
     * @return the number of elements contained in the QueueLinkedList
     */
    public int size() {
        return n;
    }

    /**
     * Inserts the item to the back of the QueueLinkedList.
     *
     * @param item, the item to be inserted
     * @throws IllegalArgumentException if the item is null
     */
    public void enqueue(T item) {
        if (item == null)
            throw new IllegalArgumentException("enqueue with null item");

        Node<T> oldLast = last;
        last = new Node(item, null);

        if (isEmpty())
            first = last;
        else
            oldLast.next = last;
        n++;
    }

    /**
     * Removes the item at the front of the QueueLinkedList, and returns it.
     *
     * @return the item at the front of the QueueLinkedList
     * @throws NoSuchElementException if this QueueLinkedList is empty
     */
    public T dequeue() {
        if (isEmpty())
            throw new NoSuchElementException("dequeue from empty QueueLinkedList");

        T item = first.item;
        first = first.next;
        n--;

        if (isEmpty())
            last = null;
        return item;
    }

    /**
     * Returns the item at the front of the QueueLinkedList.
     *
     * @return the item at the front of the QueueLinkedList
     * @throws NoSuchElementException if this QueueLinkedList is empty
     */
    public T peek() {
        if (isEmpty())
            throw new NoSuchElementException("peek from empty QueueLinkedList");
        return first.item;
    }

    /**
     * Returns a String representation of the QueueLinkedList, in the form [x0, x1, ... xn] where
     * x0...xn are elements of the QueueLinkedList in forward order.
     *
     * @return a String representation of the QueueLinkedList, with elements separated by a comma
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
     * Returns an Iterator to the QueueLinkedList that iterates through the elements of the
     * QueueLinkedList in forward order.
     *
     * @return an Iterator to the QueueLinkedList that iterates through the elements of the
     *         QueueLinkedList in forward order.
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

### Implementation (using Dynamic Array)

##### Java

```
package com.algorithmhelper.datastructures.lists;

import java.util.Iterator;
import java.util.NoSuchElementException;
import com.algorithmhelper.datastructures.interfaces.Queue;

public class QueueDynamicArray<T> implements Queue<T> {

    private T[] arr;
    private int first;
    private int last;
    private int n;

    /**
     * Initializes an empty QueueDynamicArray.
     */
    public QueueDynamicArray() {
        arr = (T[]) new Object[2];
        n = 0;
        first = 0;
        last = 0;
    }

    /**
     * Returns true if this QueueDynamicArray contains no elements, otherwise false.
     *
     * @return true if this QueueDynamicArray contains no elements, otherwise false
     */
    public boolean isEmpty() {
        return n == 0;
    }

    /**
     * Returns the number of elements contained in the QueueDynamicArray.
     *
     * @return the number of elements contained in the QueueDynamicArray
     */
    public int size() {
        return n;
    }

    /**
     * Resizes the QueueDynamicArray arr field to newSize.
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
     * Inserts the item to the back of the QueueDynamicArray, but if the arr exceeds its capacity,
     * then double the size of the arr.
     *
     * @param item, the item to be inserted
     * @throws IllegalArgumentException if the item is null
     */
    public void enqueue(T item) {
        if (item == null)
            throw new IllegalArgumentException("enqueue with null item");

        if (n == arr.length)
            resize(2 * arr.length);
        arr[last++] = item;
        if (last == arr.length)
            last = 0;
        n++;
    }

    /**
     * Removes the item at the front of the QueueDynamicArray, and returns it, but if the arr is
     * below a quarter of the arr capacity, halve the arr size.
     *
     * @return the item at the front of the QueueDynamicArray
     * @throws NoSuchElementException if this QueueDynamicArray is empty
     */
    public T dequeue() {
        if (isEmpty())
            throw new NoSuchElementException("dequeue from empty QueueDynamicArray");

        T item = arr[first];
        arr[first] = null;
        n--;
        first++;
        if (first == arr.length)
            first = 0;
        if (n > 0 && n == arr.length/4)
            resize(arr.length/2);
        return item;
    }

    /**
     * Returns the item at the front of the QueueDynamicArray.
     *
     * @return the item at the front of the QueueDynamicArray
     * @throws NoSuchElementException if this QueueDynamicArray is empty
     */
    public T peek() {
        if (isEmpty())
            throw new NoSuchElementException("peek from empty QueueDynamicArray");
        return arr[first];
    }

    /**
     * Returns a String representation of the QueueDynamicArray, in the form [x0, x1, ... xn]
     * where x0...xn are elements of the QueueDynamicArray in forward order.
     *
     * @return a String representation of the QueueDynamicArray, with elements separated by a comma
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
     * Returns an Iterator to the QueueDynamicArray that iterates through the elements of the
     * QueueDynamicArray in forward order.
     *
     * @return an Iterator to the QueueDynamicArray that iterates through the elements of the
     *         QueueDynamicArray in forward order.
     */
    public Iterator<T> iterator() {
        return new Iterator<T>() {

            private int i = 0;

            @Override
            public boolean hasNext() {
                return i < n;
            }

            @Override
            public T next() {
                if (!hasNext())
                    throw new NoSuchElementException("iterator does not have next element");
                T item = arr[(i + first) % arr.length];
                i++;
                return item;
            }
        };
    }
}
```

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