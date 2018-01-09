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

```
package com.algorithmhelper.datastructures.lists;

import java.util.Iterator;
import java.util.NoSuchElementException;
import com.algorithmhelper.datastructures.interfaces.List;

public class LinkedList<T> implements List<T> {

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
     * Initializes an empty LinkedList.
     */
    public LinkedList() {
        first = null;
        n = 0;
    }

    /**
     * Returns true if this LinkedList contains no elements, otherwise false.
     *
     * @return true if this LinkedList contains no elements, otherwise false
     */
    public boolean isEmpty() {
        return n == 0;
    }

    /**
     * Returns the number of elements contained in the LinkedList.
     *
     * @return the number of elements contained in the LinkedList
     */
    public int size() {
        return n;
    }

    /**
     * Returns true if the item is contained in the LinkedList, false otherwise.
     *
     * @param item, the item to be checked
     * @return true if the item is contained in the LinkedList, false otherwise
     * @throws IllegalArgumentException if the item is null
     */
    public boolean contains(T item) {
        if (item == null)
            throw new IllegalArgumentException("contains with null item");

        if (isEmpty())
            return false;
        Node<T> current = first;
        while (current.next != null) {
            if (current.item.equals(item))
                return true;
            current = current.next;
        }
        return false;
    }

    /**
     * Returns the element at the specified index in the LinkedList.
     *
     * @param i, the index into the LinkedList
     * @return the element at index i in the LinkedList
     * @throws IndexOutOfBoundsException if i is greater or equal to the length of the LinkedList
     *         or a negative number
     */
    public T get(int i) {
        if (i >= n || i < 0)
            throw new IndexOutOfBoundsException("get index out of bounds");

        if (i == 0 && first == null)
            return null;
        if (i == 0)
            return first.item;
        Node<T> current = first;
        for (int j = 0; j < i; j++)
            current = current.next;
        return current.item;
    }

    /**
     * Inserts the item at the specified index in the LinkedList.
     *
     * @param item, the item to be inserted
     * @param i, the index into the LinkedList
     * @throws IllegalArgumentException if the item is null
     * @throws IndexOutOfBoundsException if i is greater or equal to the length of the LinkedList
     *         or a negative number
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
            for (int j = 0; j < i-1; j++)
                current = current.next;
            current.next = new Node(item, current.next.next);
            n++;
        }
    }

    /**
     * Inserts the item to the front of the LinkedList.
     *
     * @param item, the item to be inserted
     * @throws IllegalArgumentException if the item is null
     */
    public void insertFront(T item) {
        if (item == null)
            throw new IllegalArgumentException("insertFront with null item");

        first = new Node(item, first);
        n++;
    }

    /**
     * Inserts the item to the back of the LinkedList.
     *
     * @param item, the item to be inserted
     * @throws IllegalArgumentException if the item is null
     */
    public void insertBack(T item) {
        if (item == null)
            throw new IllegalArgumentException("insertBack with null item");

        Node<T> current = first;
        for (int j = 0; j < n-1; j++)
            current = current.next;

        current.next = new Node(item, null);
        n++;
    }

    /**
     * Removes the item at the specified index in the LinkedList.
     *
     * @param i, the index into the LinkedList.
     * @throws IndexOutOfBoundsException if i is greater or equal to the length of the LinkedList
     *         or a negative number
     */
    public T remove(int i) {
        if (i >= n || i < 0)
            throw new IndexOutOfBoundsException("remove index out of bounds");

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
            n--;
            return item;
        }
    }

    /**
     * Removes the item from the LinkedList.
     *
     * @param item, the item to be deleted
     * @throws IllegalArgumentException if the item is null
     */
    public T remove(T item) {
        if (item == null)
            throw new IllegalArgumentException("remove with null item");

        if (isEmpty())
            throw new IllegalArgumentException("remove with empty LinkedList");

        int i = 0;
        Node<T> current = first;
        while (current.next != null) {
            if (current.equals(item))
                break;
            i++;
        }
        remove(i);
        return item;
    }

    /**
     * Removes the item at the front of the LinkedList, and returns it.
     *
     * @return the item at the front of the LinkedList
     * @throws NoSuchElementException if this LinkedList is empty
     */
    public T removeFront() {
        if (isEmpty())
            throw new NoSuchElementException("removeFront from empty LinkedList");

        T item = first.item;
        first = first.next;
        n--;
        return item;
    }

    /**
     * Removes the item at the back of the LinkedList, and returns it.
     *
     * @return the item at the back of the LinkedList
     * @throws NoSuchElementException if this LinkedList is empty
     */
    public T removeBack() {
        if (isEmpty())
            throw new NoSuchElementException("removeBack from empty LinkedList");

        if (n == 0)
            return removeFront();

        Node<T> current = first;
        for (int j = 0; j < n-2; j++)
            current = current.next;

        T item = current.next.item;
        current.next = null;
        n--;
        if (isEmpty())
            first = null;
        return item;
    }

    /**
     * Returns the item at the front of the LinkedList.
     *
     * @return the item at the front of the LinkedList
     * @throws NoSuchElementException if this LinkedList is empty
     */
    public T peekFront() {
        if (isEmpty())
            throw new NoSuchElementException("peekFront from empty LinkedList");

        return first.item;
    }

    /**
     * Returns the item at the back of the LinkedList.
     *
     * @return the item at the back of the LinkedList
     * @throws NoSuchElementException if this LinkedList is empty
     */
    public T peekBack() {
        if (isEmpty())
            throw new NoSuchElementException("peekBack from empty LinkedList");

        if (n == 0)
            return peekFront();

        Node<T> current = first;
        for (int j = 0; j < n-1; j++)
            current = current.next;
        return current.item;
    }

    /**
     * Returns a String representation of the LinkedList, in the form [x0, x1, ... xn] where
     * x0...xn are elements of the LinkedList in forward order.
     *
     * @return a String representation of the LinkedList, with elements separated by a comma and
     *         space
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
     * Returns an Iterator to the LinkedList that iterates through the elements of the LinkedList
     * in forward order.
     *
     * @return an Iterator to the LinkedList that iterates through the elements of the LinkedList
     *         in forward order
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
                if (!hasNext()) {
                    throw new NoSuchElementException("iterator does not have next element");
                }
                T item = current.item;
                current = current.next;
                return item;
            }
        };
    }
}
```

### Time Complexity

The following table describes the time complexity for performing the operations above on a linked 
list:

```
| Data Structure | get  | insert | insertFront | insertBack | remove | removeFront | removeBack | peekFront | peekBack |
|----------------|------|--------|-------------|------------|--------|-------------|------------|-----------|----------|
| linked list    | O(N) | O(N)   | O(1)        | O(N)       | O(N)   | O(1)        | O(N)       | O(1)      | O(N)     |
```