# Priority Queue

### Priority Max/Min Queue

### Double Ended Priority Queue

### Visualization

### Operations

### Implementation (Priority Max Queue)

##### Java

```
package com.example;

import com.example.utils.BinaryMaxHeap;

import java.util.NoSuchElementException;

public class PriorityMaxQueue<T extends Comparable<T>> {

    private BinaryMaxHeap<T> heap;

    /**
     * Initializes an empty PriorityMaxQueue.
     */
    public PriorityMaxQueue() {
        heap = new BinaryMaxHeap();
    }

    /**
     * Initializes a PriorityMaxQueue from an initial array of elements.
     */
    public PriorityMaxQueue(T[] a) {
        heap = new BinaryMaxHeap();
        for (T item : a) {
            heap.insert(item);
        }
    }

    /**
     * Returns true if the PriorityMaxQueue is empty, false otherwise.
     *
     * @return true if the PriorityMaxQueue is empty, false otherwise
     */
    public boolean isEmpty() {
        return heap.isEmpty();
    }

    /**
     * Returns the number of elements in the PriorityMaxQueue.
     *
     * @return the number of elements in the PriorityMaxQueue
     */
    public int size() {
        return heap.size();
    }

    /**
     * Inserts item into the PriorityMaxQueue.
     *
     * @param item, the item to be inserted
     */
    public void insert(T item) {
        if (item == null)
            throw new IllegalArgumentException("insert with null item");
        heap.insert(item);
    }

    /**
     * Removes element with the largest priority from the PriorityMaxQueue.
     *
     * @return element with the largest priority from the PriorityMaxQueue
     * @throws IllegalArgumentException if the PriorityMaxQueue is empty
     */
    public T removeMax() {
        if (isEmpty())
            throw new IllegalArgumentException("removeMax with empty " +
                    "PriorityMaxQueue");
        return heap.extractMax();
    }

    /**
     * Returns element with the largest priority from the PriorityMaxQueue,
     * but does not remove it.
     *
     * @return element with the largest priority from the PriorityMaxQueue,
     *         but does not remove it
     * @throws IllegalArgumentException if the PriorityMaxQueue is empty
     */
    public T max() {
        if (isEmpty())
            throw new NoSuchElementException("max with empty " +
                    "PriorityMaxQueue");
        return heap.max();
    }
}
```

### Implementation (Priority Min Queue)

##### Java

```
package com.example;

import com.example.utils.BinaryMinHeap;

import java.util.NoSuchElementException;

public class PriorityMinQueue<T extends Comparable<T>> {

    private BinaryMinHeap<T> heap;

    /**
     * Initializes an empty PriorityMinQueue.
     */
    public PriorityMinQueue() {
        heap = new BinaryMinHeap();
    }

    /**
     * Initializes a PriorityMinQueue from an initial array of elements.
     */
    public PriorityMinQueue(T[] a) {
        heap = new BinaryMinHeap();
        for (T item : a) {
            heap.insert(item);
        }
    }

    /**
     * Returns true if the PriorityMinQueue is empty, false otherwise.
     *
     * @return true if the PriorityMinQueue is empty, false otherwise
     */
    public boolean isEmpty() {
        return heap.isEmpty();
    }

    /**
     * Returns the number of elements in the PriorityMinQueue.
     *
     * @return the number of elements in the PriorityMinQueue
     */
    public int size() {
        return heap.size();
    }

    /**
     * Inserts item into the PriorityMinQueue.
     *
     * @param item, the item to be inserted
     */
    public void insert(T item) {
        if (item == null)
            throw new IllegalArgumentException("insert with null item");
        heap.insert(item);
    }

    /**
     * Removes element with the smallest priority from the PriorityMinQueue.
     *
     * @return element with the smallest priority from the PriorityMinQueue
     * @throws IllegalArgumentException if the PriorityMinQueue is empty
     */
    public T removeMax() {
        if (isEmpty())
            throw new IllegalArgumentException("removeMax with empty " +
                    "PriorityMinQueue");
        return heap.extractMin();
    }

    /**
     * Returns element with the smallest priority from the PriorityMinQueue,
     * but does not remove it.
     *
     * @return element with the smallest priority from the PriorityMinQueue,
     *         but does not remove it
     * @throws IllegalArgumentException if the PriorityMinQueue is empty
     */
    public T min() {
        if (isEmpty())
            throw new NoSuchElementException("min with empty " +
                    "PriorityMinQueue");
        return heap.min();
    }
}
```

### Implementation (Double Ended Priority Queue)

##### Java

```
package com.example;

import java.util.NoSuchElementException;

public class DoubleEndedPriorityQueue<T extends Comparable<T>> {

    private RedBlackTreeSet pq;

    /**
     * Initializes an empty DoubleEndedPriorityQueue.
     */
    public DoubleEndedPriorityQueue() {
        pq = new RedBlackTreeSet();
    }

    /**
     * Initializes a DoubleEndedPriorityQueue from an initial array of elements.
     */
    public DoubleEndedPriorityQueue(T[] a) {
        pq = new RedBlackTreeSet();
        for (T item : a) {
            pq.put(item);
        }
    }

    /**
     * Returns true if the DoubleEndedPriorityQueue is empty, false otherwise.
     *
     * @return true if the DoubleEndedPriorityQueue is empty, false otherwise
     */
    public boolean isEmpty() {
        return pq.isEmpty();
    }

    /**
     * Returns the number of elements in the DoubleEndedPriorityQueue.
     *
     * @return the number of elements in the DoubleEndedPriorityQueue
     */
    public int size() {
        return pq.size();
    }

    /**
     * Inserts item into the DoubleEndedPriorityQueue.
     *
     * @param item, the item to be inserted
     */
    public void insert(T item) {
        if (item == null)
            throw new IllegalArgumentException("insert with null item");
        pq.put(item);
    }

    /**
     * Removes element with the largest priority from the DoubleEndedPriorityQueue.
     *
     * @return element with the largest priority from the DoubleEndedPriorityQueue
     * @throws IllegalArgumentException if the DoubleEndedPriorityQueue is empty
     */
    public T removeMax() {
        if (isEmpty())
            throw new IllegalArgumentException("removeMax with empty " +
                    "DoubleEndedPriorityQueue");
        T maxElement = (T) pq.max();
        pq.deleteMax();
        return maxElement;
    }

    /**
     * Removes element with the smallest priority from the DoubleEndedPriorityQueue.
     *
     * @return element with the smallest priority from the DoubleEndedPriorityQueue
     * @throws IllegalArgumentException if the DoubleEndedPriorityQueue is empty
     */
    public T removeMin() {
        if (isEmpty())
            throw new IllegalArgumentException("removeMin with empty " +
                    "DoubleEndedPriorityQueue");
        T minElement = (T) pq.min();
        pq.deleteMin();
        return minElement;
    }

    /**
     * Returns element with the largest priority from the DoubleEndedPriorityQueue,
     * but does not remove it.
     *
     * @return element with the largest priority from the DoubleEndedPriorityQueue,
     *         but does not remove it
     * @throws IllegalArgumentException if the DoubleEndedPriorityQueue is empty
     */
    public T max() {
        if (isEmpty())
            throw new NoSuchElementException("max with empty " +
                    "DoubleEndedPriorityQueue");
        T maxElement = (T) pq.max();
        return maxElement;
    }

    /**
     * Returns element with the smallest priority from the DoubleEndedPriorityQueue,
     * but does not remove it.
     *
     * @return element with the smallest priority from the DoubleEndedPriorityQueue,
     *         but does not remove it
     * @throws IllegalArgumentException if the DoubleEndedPriorityQueue is empty
     */
    public T min() {
        if (isEmpty())
            throw new NoSuchElementException("min with empty " +
                    "DoubleEndedPriorityQueue");
        T minElement = (T) pq.min();
        return minElement;
    }
}
```

### Time Complexity

```
```
