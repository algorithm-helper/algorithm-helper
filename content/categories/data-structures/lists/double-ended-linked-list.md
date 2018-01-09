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

```
package com.algorithmhelper.datastructures.lists;

import java.util.Iterator;
import java.util.NoSuchElementException;
import com.algorithmhelper.datastructures.interfaces.List;

public class DoubleEndedLinkedList<T> implements List<T> {

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
     * Initializes an empty DoubleEndedLinkedList.
     */
    public DoubleEndedLinkedList() {
        first = null;
        last = null;
        n = 0;
    }

    /**
     * Returns true if this DoubleEndedLinkedList contains no elements, otherwise false.
     *
     * @return true if this DoubleEndedLinkedList contains no elements, otherwise false
     */
    public boolean isEmpty() {
        return n == 0;
    }

    /**
     * Returns the number of elements contained in the DoubleEndedLinkedList.
     *
     * @return the number of elements contained in the DoubleEndedLinkedList
     */
    public int size() {
        return n;
    }

    /**
     * Returns the element at the specified index in the DoubleEndedLinkedList.
     *
     * @param i, the index into the DoubleEndedLinkedList
     * @return the element at index i in the DoubleEndedLinkedList
     * @throws IndexOutOfBoundsException if i is greater or equal to the length of the
     *         DoubleEndedLinkedList or a negative number
     */
    public T get(int i) {
        if (i >= n || i < 0)
            throw new IndexOutOfBoundsException("get index out of bounds");

        if (i == 0 && first == null ||
                i == n-1 && last == null)
            return null;

        if (i == 0)
            return first.item;
        else if (i == n-1)
            return last.item;

        Node<T> current = first;
        for (int j = 0; j < i; j++)
            current = current.next;
        return current.item;
    }

    /**
     * Inserts the item at the specified index in the DoubleEndedLinkedList.
     *
     * @param item, the item to be inserted
     * @param i, the index into the DoubleEndedLinkedList
     * @throws IllegalArgumentException if the item is null
     * @throws IndexOutOfBoundsException if i is greater or equal to the length
     *         of the DoubleEndedLinkedList or a negative number
     */
    public void insert(int i, T item) {
        if (item == null)
            throw new IllegalArgumentException("insert with null item");
        if (i >= n || i < 0)
            throw new IndexOutOfBoundsException("insert index out of bounds");

        if (i == 0) {
            insertFront(item);
        } else if (i == n-1) {
            insertBack(item);
        } else {
            Node<T> current = first;
            for (int j = 0; j < i; j++)
                current = current.next;

            Node<T> newNode = new Node(item, current, current.prev);
            current.prev = newNode;
            current.prev.next = newNode;
            n++;
        }
    }

    /**
     * Inserts the item to the front of the DoubleEndedLinkedList.
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
     * Inserts the item to the back of the DoubleEndedLinkedList.
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
     * Removes the item at the specified index in the DoubleEndedLinkedList.
     *
     * @param i, the index into the DoubleEndedLinkedList
     * @throws IndexOutOfBoundsException if i is greater or equal to the length
     *         of the DoubleEndedLinkedList or a negative number
     */
    public T remove(int i) {
        if (i >= n || i < 0)
            throw new IndexOutOfBoundsException("insert index out of bounds");

        if (i == 0) {
            return removeFront();
        } else if (i == n-1) {
            return removeBack();
        } else {
            Node<T> current = first;
            for (int j = 0; j < i-1; j++)
                current = current.next;

            T item = current.next.item;
            current.next = null;
            current.next = current.next.next;
            current.next.prev = current;
            n--;
            return item;
        }
    }

    /**
     * Removes the item at the front of the DoubleEndedLinkedList, and returns it.
     *
     * @return the item at the front of the DoubleEndedLinkedList
     * @throws NoSuchElementException if this DoubleEndedLinkedList is empty
     */
    public T removeFront() {
        if (isEmpty()) {
            throw new NoSuchElementException("removeFront from empty DoubleEndedLinkedList");
        }

        T item = first.item;
        first = first.next;
        first.prev = null;

        n--;

        if (isEmpty())
            last = null;
        return item;
    }

    /**
     * Removes the item at the back of the DoubleEndedLinkedList, and returns it.
     *
     * @return the item at the back of the DoubleEndedLinkedList
     * @throws NoSuchElementException if this DoubleEndedLinkedList is empty
     */
    public T removeBack() {
        if (isEmpty()) {
            throw new NoSuchElementException("removeBack from empty DoubleEndedLinkedList");
        }

        T item = last.item;
        last = last.prev;
        last.next = null;

        n--;

        if (isEmpty())
            first = null;
        return item;
    }

    /**
     * Returns the item at the front of the DoubleEndedLinkedList.
     *
     * @return the item at the front of the DoubleEndedLinkedList
     * @throws NoSuchElementException if this DoubleEndedLinkedList is empty
     */
    public T peekFront() {
        if (isEmpty()) {
            throw new NoSuchElementException("peekFront from empty DoubleEndedLinkedList");
        }
        return first.item;
    }

    /**
     * Returns the item at the back of the DoubleEndedLinkedList.
     *
     * @return the item at the back of the DoubleEndedLinkedList
     * @throws NoSuchElementException if this DoubleEndedLinkedList is empty
     */
    public T peekBack() {
        if (isEmpty()) {
            throw new NoSuchElementException("peekBack from empty DoubleEndedLinkedList");
        }
        return last.item;
    }

    /**
     * Returns a String representation of the DoubleEndedLinkedList, in the form [x0, x1, ... xn]
     * where x0...xn are elements of the DoubleEndedLinkedList in forward order.
     *
     * @return a String representation of the DoubleEndedLinkedList, with elements separated by a
     *         comma and space
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
     * Returns an Iterator to the DoubleEndedLinkedList that iterates through the elements of the
     * DoubleEndedLinkedList in forward order.
     *
     * @return an Iterator to the DoubleEndedLinkedList that iterates through the elements of the
     *         in forward order.
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
ended linked list:

```
| Data Structure           | get  | insert | insertFront | insertBack | remove | removeFront | removeBack | peekFront | peekBack |
|--------------------------|------|--------|-------------|------------|--------|-------------|------------|-----------|----------|
| double ended linked list | O(N) | O(N)   | O(1)        | O(1)       | O(N)   | O(1)        | O(1)       | O(1)      | O(1)     |
```