# Priority Queue

A priority queue is an abstract data type that is used to insert and extract elements based off of 
some priority value. There are three variants: the priority max queue, the priority min queue, and 
the double ended priority queue, which allows us to retrieve the element of the maximum priority 
efficiently with the operation `extractMax`, retrieve the element of the minimum priority 
efficiently with the operation `extractMin`, or retrieve both the element with the maximum and 
minimum priority efficiently. 

### Priority Max Queue

A priority max queue is a priority queue that supports the operations `insert`, `extractMax`, and 
`max`, which allow us to insert an element of some priority into the data structure, remove and 
return the element of maximum priority, and return the element of maximum priority without removing 
it from the priority max queue, respectively.

This data structure is best suitable to be implemented with a binary max heap, and thus we are able 
to run the operations `insert` and `extractMax` in $O(logN)$ time, and return the `max` in $O(1)$ 
time.

### Priority Min Queue

A priority min queue is a priority queue that supports the operations `insert`, `extractMin`, and 
`min`, which allow us to insert an element of some priority into the data structure, remove and 
return the element of minimum priority, and return the element of minimum priority without removing 
it from the priority min queue, respectively.

This data structure is best suitable to be implemented with a binary min heap, and thus we are able 
to run the operations `insert` and `extractMin` in $O(logN)$ time, and return the `min` in $O(1)$
time.

### Double Ended Priority Queue

A double ended priority queue is a priority queue that supports the operations `insert`, 
`extractMax`, `extractMin`, `max`, and `min`, which allow us to insert an element of some priority 
into the data structure, remove and return the element of maximum priority, remove and return the 
element of minimum priority, return the element of maximum priority without removing it from the 
double ended priority queue, and return the element of minimum priority without removing it from the 
double ended priority queue.

This data structure is best suitable to be implemented with some balanced tree structure, like a 
red-black tree, and thus we are able to run all of the operations in $O(logN)$ time.

### Visualization

The following demonstrates the state of a priority max queue, starting with an empty priority max 
queue, and a lower number represents a higher priority. It is essentially the same with a priority 
min queue:

```
// Suppose that we start off with the following empty priority max queue:
{}

// insert(1):
{1}

// insert(10):
{1, 10}

// insert(5):
{1, 10, 5}

// insert(3):
{1, 10, 5, 3}

// extractMax():
1

// max():
3

// insert(2):
{10, 5, 3, 2}

// extractMax():
2

// extractMax():
3

// max():
5
```

The following demonstrates the state of a double ended priority queue, starting with an empty double 
ended priority queue, and a lower number represents a higher priority:

```
// Suppose that we start off with the following empty double ended priority 
// queue:
{}

// insert(1):
{1}

// insert(10):
{1, 10}

// insert(5):
{1, 10, 5}

// insert(3):
{1, 10, 5, 3}

// extractMax():
1

// max():
3

// min():
10

// insert(2):
{10, 5, 3, 2}

// extractMin():
10

// extractMin():
5

// max():
2
```

### Operations

For priority max queue:

- `insert`
    - Inserts the element into the priority queue, this is done by inserting it
    into the underlying binary max heap.
- `extractMax`
    - Removes the element with the maximum priority and returns it, this is done
    by calling `extractMax` from the underlying binary max heap.
- `max`
    - Returns the element with the maximum priority without removing it, this is
    done by calling `max` from the underlying binary max heap.

For priority min queue:

- `insert`
    - Inserts the element into the priority queue, this is done by inserting it
    into the underlying binary min heap.
- `extractMin`
    - Removes the element with the minimum priority and returns it, this is done
    by calling `extractMin` from the underlying binary min heap.
- `min`
    - Returns the element with the minimum priority without removing it, this is
    done by calling `min` from the underlying binary min heap.

For double ended priority queue:

- `insert`
    - Inserts the element into the priority queue, this is done by inserting it
    into the underlying red-black tree.
- `extractMax`
    - Removes the element with the maximum priority and returns it, this is done
    by calling `extractMax` from the underlying binary max heap.
- `extractMin`
    - Removes the element with the minimum priority and returns it, this is done
    by calling `extractMin` from the underlying binary min heap.
- `max`
    - Returns the element with the maximum priority without removing it, this is
    done by calling `max` from the underlying binary max heap.
- `min`
    - Returns the element with the minimum priority without removing it, this is
    done by calling `min` from the underlying binary min heap.

### Implementation (Priority Max Queue)

##### Java

```
package com.algorithmhelper.datastructures.trees;

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
     * Inserts the item into the PriorityMaxQueue.
     *
     * @param item, the item to be inserted
     */
    public void insert(T item) {
        if (item == null)
            throw new IllegalArgumentException("insert with null item");
        heap.insert(item);
    }

    /**
     * Removes the element with the largest priority from the PriorityMaxQueue.
     *
     * @return element with the largest priority from the PriorityMaxQueue
     * @throws IllegalArgumentException if the PriorityMaxQueue is empty
     */
    public T removeMax() {
        if (isEmpty())
            throw new IllegalArgumentException("removeMax with empty PriorityMaxQueue");
        return heap.extractMax();
    }

    /**
     * Returns the element with the largest priority from the PriorityMaxQueue, but does not remove
     * it.
     *
     * @return element with the largest priority from the PriorityMaxQueue, but does not remove it
     * @throws IllegalArgumentException if the PriorityMaxQueue is empty
     */
    public T max() {
        if (isEmpty())
            throw new NoSuchElementException("max with empty PriorityMaxQueue");
        return heap.max();
    }
}
```

### Implementation (Priority Min Queue)

##### Java

```
package com.algorithmhelper.datastructures.trees;

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
     * Inserts the item into the PriorityMinQueue.
     *
     * @param item, the item to be inserted
     */
    public void insert(T item) {
        if (item == null)
            throw new IllegalArgumentException("insert with null item");
        heap.insert(item);
    }

    /**
     * Removes the element with the smallest priority from the PriorityMinQueue.
     *
     * @return element with the smallest priority from the PriorityMinQueue
     * @throws IllegalArgumentException if the PriorityMinQueue is empty
     */
    public T removeMin() {
        if (isEmpty())
            throw new IllegalArgumentException("removeMin with empty PriorityMinQueue");
        return heap.extractMin();
    }

    /**
     * Returns the element with the smallest priority from the PriorityMinQueue, but does not
     * remove it.
     *
     * @return element with the smallest priority from the PriorityMinQueue, but does not remove
     *         it
     * @throws IllegalArgumentException if the PriorityMinQueue is empty
     */
    public T min() {
        if (isEmpty())
            throw new NoSuchElementException("min with empty PriorityMinQueue");
        return heap.min();
    }
}
```

### Implementation (Double Ended)

##### Java

```
package com.algorithmhelper.datastructures.trees;

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
     * Inserts the item into the DoubleEndedPriorityQueue.
     *
     * @param item, the item to be inserted
     */
    public void insert(T item) {
        if (item == null)
            throw new IllegalArgumentException("insert with null item");
        pq.put(item);
    }

    /**
     * Removes the element with the largest priority from the DoubleEndedPriorityQueue.
     *
     * @return element with the largest priority from the DoubleEndedPriorityQueue
     * @throws IllegalArgumentException if the DoubleEndedPriorityQueue is empty
     */
    public T removeMax() {
        if (isEmpty())
            throw new IllegalArgumentException("removeMax with empty DoubleEndedPriorityQueue");
        T maxElement = (T) pq.max();
        pq.deleteMax();
        return maxElement;
    }

    /**
     * Removes the element with the smallest priority from the DoubleEndedPriorityQueue.
     *
     * @return element with the smallest priority from the DoubleEndedPriorityQueue
     * @throws IllegalArgumentException if the DoubleEndedPriorityQueue is empty
     */
    public T removeMin() {
        if (isEmpty())
            throw new IllegalArgumentException("removeMin with empty DoubleEndedPriorityQueue");
        T minElement = (T) pq.min();
        pq.deleteMin();
        return minElement;
    }

    /**
     * Returns the element with the largest priority from the DoubleEndedPriorityQueue,
     * but does not remove it.
     *
     * @return element with the largest priority from the DoubleEndedPriorityQueue,
     *         but does not remove it
     * @throws IllegalArgumentException if the DoubleEndedPriorityQueue is empty
     */
    public T max() {
        if (isEmpty())
            throw new NoSuchElementException("max with empty DoubleEndedPriorityQueue");
        T maxElement = (T) pq.max();
        return maxElement;
    }

    /**
     * Returns the element with the smallest priority from the DoubleEndedPriorityQueue,
     * but does not remove it.
     *
     * @return element with the smallest priority from the DoubleEndedPriorityQueue,
     *         but does not remove it
     * @throws IllegalArgumentException if the DoubleEndedPriorityQueue is empty
     */
    public T min() {
        if (isEmpty())
            throw new NoSuchElementException("min with empty DoubleEndedPriorityQueue");
        T minElement = (T) pq.min();
        return minElement;
    }
}
```

### Time Complexity

The following table describes the time complexity for performing the operations above on an priority 
max queue, priority min queue, and a double ended priority queue:

```
| Data Structure              | insert  | extractMax  | extractMin  | max     | min     |
|-----------------------------|---------|-------------|-------------|---------|---------|
| priority max queue          | O(logN) | O(logN)     | n/a         | O(1)    | n/a     |
| priority min queue          | O(logN) | n/a         | O(logN)     | n/a     | O(1)    |
| double ended priority queue | O(logN) | O(logN)     | O(logN)     | O(logN) | O(logN) |
```
