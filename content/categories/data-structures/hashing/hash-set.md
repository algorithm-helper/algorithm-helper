# Hash Set

A hash set is a data structure that uses hashing to store keys, where there are no duplicate keys. 
Therefore, we would often use hash sets to keep track of a unique set of items if we do not desire 
duplicates. We use a hash function (more can be read about this on the article on 
[Hash Functions](/categories/data-structures/hashing/hash-function)) to compute a valid index into 
this table at some slot, which we call a bucket. Since keys can hash to the same value, we store the 
individual keys in this bucket. There are two primary ways of implementing a hash set: separate 
chaining and linear probing. These methods are identical to the ones uses in a hash table/hash map. 
For more information on the methods of separate chaining or linear probing, see the article on the 
[Hash Table / Hash Map](/categories/data-structures/hashing/hash-table-hash-map).

Hash sets are particularly efficient for operations `put`, `contains`, and `delete`. The operation 
`put` inserts a `key` into the hash set. The operation `contains` checks if a given `key` exists in 
the hash set. The operation `delete` is given a `key`, and removes it (assuming it exists) from 
the hash set.

### Operations

For separate chaining:

- `contains`
    - Returns `true`/`false` depending on whether or not a given `key` exists
    in the hash set. This is done by hashing the `key` into the correct slot,
    and then traversing through the corresponding linked list at that slot, and
    if the corresponding node with the `key` exists, then it returns 
    `true`, otherwise it returns `false`.
- `put`
    - Inserts a key into the hash set. This is done by hashing the `key` into 
    the correct slot, and then inserting it into the corresponding linked list 
    at that slot. This is done by creating a new node with the `key`, linking
    its `next` to the `first` in the linked list, and then pointing `first` to 
    the new node.
- `delete`
    - Removes a the corresponding `key` from the hash set given some `key`. 
    This is done by hashing the `key` into the correct slot, and then traversing 
    through the corresponding linked list at that slot to remove the 
    corresponding `key`.

For linear probing:

- `contains`
    - Returns `true`/`false` depending on whether or not a given `key` exists
    in the hash set. This is done by hashing the `key` into the correct slot, 
    and if the corresponding `key` already exists there, then it returns true. 
    Otherwise, it continuously checks the next adjcent slot, and if the 
    corresponding `key` is found, then it returns true, indicating that the 
    given `key` exists. If the probe reaches a `null` slot, then it returns 
    false, indicating that the given `key` does not exist in the hash set.
- `put`
    - Inserts a `key` into the hash set. This is done by hashing
    the `key` into the correct slot, and then if this slot is already `null`, it
    inserts the `key` at this slot. Otherwise, it continuously checks the next
    adjacent slot to find the next `null` slot, and inserts the `key` there.
- `delete`
    - Removes the corresponding `key` from the hash set given some `key`. This 
    is done by hashing the `key` into the correct slot, and if the corresponding 
    `key` is at that slot, it is set to `null`. Otherwise, it continuously 
    checks the next adjacent slot, until the correponding `key` is found, and 
    then is set to `null`. Then all of the keys are rehashed again.

### Implementation (Separate Chaining)

##### Java

```
package com.algorithmhelper.datastructures.hashing;

import java.util.NoSuchElementException;

import com.algorithmhelper.datastructures.interfaces.Queue;
import com.algorithmhelper.datastructures.interfaces.Set;
import com.algorithmhelper.datastructures.lists.QueueLinkedList;
import com.algorithmhelper.datastructures.lists.LinkedListSet;

public class HashSetSeparateChaining<K extends Comparable<K>> implements Set<K> {

    private static final int INIT_CAPACITY = 4;
    private int n;
    private int m;
    private LinkedListSet<K>[] L;

    /**
     * Initializes an empty HashSetSeparateChaining with initial capacity.
     */
    public HashSetSeparateChaining() {
        this(INIT_CAPACITY);
    }

    /**
     * Initializes an empty HashSetSeparateChaining with initial capacity of m.
     *
     * @param m, the initial capacity
     * @throws IllegalArgumentException if m <= 0
     */
    public HashSetSeparateChaining(int m) {
        if (m <= 0)
            throw new IllegalArgumentException("constructor with invalid m");
        this.m = m;
        L = (LinkedListSet<K>[]) new Object[m];
        for (int i = 0; i < m; i++)
            L[i] = new LinkedListSet();
    }

    /**
     * Returns true if the HashSetSeparateChaining is empty, otherwise false.
     *
     * @return true if the HashSetSeparateChaining is empty, otherwise false
     */
    public boolean isEmpty() {
        return n == 0;
    }

    /**
     * Returns the number of elements in the HashSetSeparateChaining.
     *
     * @return the number of elements in the HashSetSeparateChaining
     */
    public int size() {
        return n;
    }

    /**
     * Helper method to resize the array of LinkedListSet chains in the HashSetSeparateChaining.
     *
     * @param newSize
     * @throws IllegalArgumentException if newSize is less than or equal to zero
     */
    private void resize(int newSize) {
        if (newSize <= 0)
            throw new IllegalArgumentException("resize with invalid newSize");

        HashSetSeparateChaining<K> temp = new HashSetSeparateChaining(newSize);
        for (int i = 0; i < m; i++) {
            for (K key : L[i].keys()) {
                temp.put(key);
            }
        }
        this.m = temp.m;
        this.n = temp.n;
        this.L = temp.L;
    }

    /**
     * Returns a hash value between 0 and m-1.
     *
     * @param key, the key to return hash
     * @return a hash value between 0 and m-1
     */
    private int hash(K key) {
        return (key.hashCode() & 0x7fffffff) % m;
    }

    /**
     * Returns true if the key is already contained in the HashSetSeparateChaining, otherwise false.
     *
     * @param key, the key to be searched
     * @return true if the key is already contained in the HashSetSeparateChaining, otherwise false.
     * @throws IllegalArgumentException if the key is null
     */
    public boolean contains(K key) {
        if (key == null)
            throw new IllegalArgumentException("contains with null key");
        return L[hash(key)].contains(key);
    }

    /**
     * Inserts the key into the HashSetSeparateChaining.
     *
     * @param key, the key to be inserted
     * @throws IllegalArgumentException if the key is null
     */
    public void put(K key) {
        if (key == null)
            throw new IllegalArgumentException("put with null key");
        if (n >= 10*m)
            resize(2*m);

        int h = hash(key);
        if (!L[h].contains(key))
            n++;
        L[h].insert(key);
    }

    /**
     * Deletes the key from the HashSetSeparateChaining.
     *
     * @param key, the key to be deleted
     * @throws IllegalArgumentException if the key is null
     */
    public void delete(K key) {
        if (key == null)
            throw new IllegalArgumentException("delete with null key");

        int h = hash(key);
        if (!L[h].contains(key))
            n--;
        L[h].remove(key);

        if (m > INIT_CAPACITY && n <= 2*m)
            resize(m/2);
    }

    /**
     * Returns an Iterable that iterates over the keys of the HashSetSeparateChaining.
     *
     * @return an Iterable that iterates over the keys of the HashSetSeparateChaining
     * @throws NoSuchElementException if the HashSetSeparateChaining is null
     */
    public Iterable<K> keys() {
        if (isEmpty())
            throw new NoSuchElementException("keys with empty HashSetSeparateChaining");

        Queue<K> queue = new QueueLinkedList<>();
        for (int i = 0; i < m; i++) {
            for (K key : L[i].keys()) {
                queue.enqueue(key);
            }
        }
        return queue;
    }
}
```

### Implementation (Linear Probing)

##### Java

```
package com.algorithmhelper.datastructures.hashing;

import java.util.NoSuchElementException;

import com.algorithmhelper.datastructures.interfaces.Queue;
import com.algorithmhelper.datastructures.interfaces.Set;
import com.algorithmhelper.datastructures.lists.QueueLinkedList;

public class HashSetLinearProbing<K extends Comparable<K>> implements Set<K> {

    private static final int INIT_CAPACITY = 4;
    private int n;
    private int m;
    private K[] keys;

    /**
     * Initializes an empty HashSetLinearProbing with initial capacity.
     */
    public HashSetLinearProbing() {
        this(INIT_CAPACITY);
    }

    /**
     * Initializes an empty HashSetLinearProbing with initial capacity of m.
     *
     * @param m, the initial capacity
     * @throws IllegalArgumentException if m <= 0
     */
    public HashSetLinearProbing(int m) {
        if (m <= 0)
            throw new IllegalArgumentException("constructor with invalid m");
        this.m = m;
        n = 0;
        keys = (K[]) new Object[m];
    }

    /**
     * Returns true if the HashSetLinearProbing is empty, otherwise false.
     *
     * @return true if the HashSetLinearProbing is empty, otherwise false
     */
    public boolean isEmpty() {
        return n == 0;
    }

    /**
     * Returns the number of elements in the HashSetLinearProbing.
     *
     * @return the number of elements in the HashSetLinearProbing
     */
    public int size() {
        return n;
    }

    /**
     * Helper method to resize the keys and vals arrays in the
     * HashSetLinearProbing.
     *
     * @param newSize
     * @throws IllegalArgumentException if newSize is less than or equal to zero
     */
    private void resize(int newSize) {
        if (newSize <= 0)
            throw new IllegalArgumentException("resize with invalid newSize");

        HashSetLinearProbing<K> temp = new HashSetLinearProbing(newSize);
        for (int i = 0; i < m; i++) {
            if (keys[i] != null)
                temp.put(keys[i]);
        }
        this.m = temp.m;
        this.n = temp.n;
        this.keys = temp.keys;
    }

    /**
     * Returns a hash value between 0 and m-1.
     *
     * @param key, the key to return hash
     * @return a hash value between 0 and m-1
     */
    private int hash(K key) {
        return (key.hashCode() & 0x7fffffff) % m;
    }

    /**
     * Returns true if the key is already contained in the HashSetLinearProbing, otherwise false.
     *
     * @param key, the key to be searched
     * @return true if the key is already contained in the HashSetLinearProbing, otherwise false.
     * @throws IllegalArgumentException if the key is null
     */
    public boolean contains(K key) {
        if (key == null)
            throw new IllegalArgumentException("contains with null key");

        for (int i = hash(key); keys[i] != null; i = (i + 1) % m)
            if (keys[i].equals(key))
                return true;
        return false;
    }

    /**
     * Inserts the key into the HashSetLinearProbing.
     *
     * @param key, the key to be inserted
     * @throws IllegalArgumentException if the key is null
     */
    public void put(K key) {
        if (key == null)
            throw new IllegalArgumentException("put with null key");

        if (n >= m/2)
            resize(2*m);

        int i;
        for (i = hash(key); keys[i] != null; i = (i + 1) % m) {
            if (keys[i].equals(key)) {
                return;
            }
        }
        keys[i] = key;
        n++;
    }

    /**
     * Deletes the key from the HashSetLinearProbing.
     *
     * @param key, the key to be deleted
     * @throws IllegalArgumentException if the key is null
     */
    public void delete(K key) {
        if (key == null)
            throw new IllegalArgumentException("delete with null key");
        if (!contains(key)) return;

        int i = hash(key);
        while (!key.equals(keys[i])) {
            i = (i + 1) % m;
        }

        keys[i] = null;

        i = (i + 1) % m;
        while (keys[i] != null) {
            K keyRehash = keys[i];
            keys[i] = null;
            n--;
            put(keyRehash);
            i = (i + 1) % m;
        }

        n--;

        if (n > 0 && n <= m/8)
            resize(m/2);
    }

    /**
     * Returns an Iterable that iterates over the keys of the HashSetLinearProbing.
     *
     * @return an Iterable that iterates over the keys of the HashSetLinearProbing
     * @throws NoSuchElementException if the HashSetLinearProbing is null
     */
    public Iterable<K> keys() {
        if (isEmpty())
            throw new NoSuchElementException("keys with empty HashSetLinearProbing");

        Queue<K> queue = new QueueLinkedList<>();
        for (int i = 0; i < m; i++) {
            if (keys[i] != null)
                queue.enqueue(keys[i]);
        }
        return queue;
    }
}
```

### Implementation (LinkedListSet)

A set version of linked list is needed for separate chaining.

##### Java

```
package com.algorithmhelper.datastructures.lists;

import java.util.Iterator;
import java.util.NoSuchElementException;

public class LinkedListSet<K extends Comparable<K>> implements Iterable<K> {

    private Node<K> first;
    private int n;

    private class Node<K> {
        private K key;
        private Node<K> next;

        public Node() {}

        public Node(K key, Node<K> next) {
            this.key = key;
            this.next = next;
        }
    }

    /**
     * Initializes an empty LinkedListSet.
     */
    public LinkedListSet() {
        first = null;
        n = 0;
    }

    /**
     * Returns true if the LinkedListSet contains no elements, otherwise false.
     *
     * @return true if the LinkedListSet contains no elements, otherwise false
     */
    public boolean isEmpty() {
        return n == 0;
    }

    /**
     * Returns the number of elements contained in the LinkedListSet.
     *
     * @return the number of elements contained in the LinkedListSet
     */
    public int size() {
        return n;
    }

    /**
     * Returns true if the key is contained in the LinkedListSet, otherwise false.
     *
     * @param key, the key to be search for
     * @return true if the key is contained in the LinkedListSet, otherwise false
     * @throws IllegalArgumentException if the key is null
     */
    public boolean contains(K key) {
        if (key == null)
            throw new IllegalArgumentException("contains with null key");
        if (isEmpty())
            return false;

        Node<K> current = first;

        while (current != null) {
            if (current.key.compareTo(key) == 0)
                return true;
        }
        return false;
    }

    /**
     * Inserts the key to the front of the LinkedListSet.
     *
     * @param key, the key to be inserted
     * @throws IllegalArgumentException if the key is null
     */
    public void insert(K key) {
        if (key == null)
            throw new IllegalArgumentException("insertFront with null key");

        Node<K> oldFirst = first;
        first = new Node(key, oldFirst);
        n++;
    }

    /**
     * Removes the key from the LinkedListSet.
     *
     * @param key, the key to be searched
     * @throws IllegalArgumentException if the key is null
     * @throws NoSuchElementException if the LinkedListSet is empty
     */
    public void remove(K key) {
        if (key == null)
            throw new IllegalArgumentException("remove with null key");
        if (isEmpty())
            throw new NoSuchElementException("remove with empty list");
        if (!contains(key))
            return;

        Node<K> current = first;

        while (current != null) {
            if (current.next.key.compareTo(key) == 0)
                break;
        }

        current.next = current.next.next;
    }

    /**
     * Removes the key at the front of the LinkedListSet, and returns it.
     *
     * @return the key of the key at the front of the LinkedListSet, and returns it.
     * @throws NoSuchElementException if this LinkedListSet is empty
     */
    public K removeFront() {
        if (isEmpty())
            throw new NoSuchElementException("removeFront from empty LinkedListSet");

        K key = first.key;
        first = first.next;
        n--;
        return key;
    }

    /**
     * Removes the key at the back of the LinkedListSet, and returns it.
     *
     * @return the key of the key at the back of the
     *         LinkedListSet, and returns it.
     * @throws NoSuchElementException if this LinkedListSet is empty
     */
    public K removeBack() {
        if (isEmpty())
            throw new NoSuchElementException("removeBack from empty LinkedListSet");

        if (n == 1)
            return removeFront();

        Node<K> current = first;
        for (int j = 0; j < n-2; j++)
            current = current.next;

        K key = current.next.key;
        current.next = null;
        n--;
        if (isEmpty())
            first = null;
        return key;
    }

    /**
     * Returns the key at the front of the LinkedListSet.
     *
     * @return the key at the front of the LinkedListSet
     * @throws NoSuchElementException if this LinkedListSet is empty
     */
    public K peekFront() {
        if (isEmpty())
            throw new NoSuchElementException("peekFront from empty LinkedListSet");

        return first.key;
    }

    /**
     * Returns the key at the back of the LinkedListSet.
     *
     * @return the key at the back of the LinkedListSet
     * @throws NoSuchElementException if this LinkedListSet is empty
     */
    public K peekBack() {
        if (isEmpty())
            throw new NoSuchElementException("peekBack from empty LinkedListSet");

        if (n == 1)
            return peekFront();

        Node<K> current = first;
        for (int j = 0; j < n-1; j++)
            current = current.next;
        return current.key;
    }

    /**
     * Returns a String representation of the LinkedListSet, in the form [x0, x1, ... xn] where
     * x0...xn are elements of the LinkedListSet.
     *
     * @return a String representation of the LinkedListSet, with elements separated by a comma and
     *         space
     */
    public String toString() {
        if (isEmpty())
            return "[]";

        StringBuilder sb = new StringBuilder();
        sb.append('[');
        for (K key : this) {
            sb.append(key);
            sb.append(',');
            sb.append(' ');
        }
        sb.append(']');
        return sb.toString();
    }

    /**
     * Returns an Iterable that iterates over the keys of the LinkedListSet.
     *
     * @return an Iterable that iterates over the keys of the LinkedListSet
     * @throws NoSuchElementException if the LinkedListSet is null
     */
    public Iterable<K> keys() {
        if (isEmpty())
            throw new NoSuchElementException("keys with null LinkedListSet");

        QueueLinkedList<K> queue = new QueueLinkedList<>();
        Node<K> current = first;
        while (current != null) {
            queue.enqueue(current.key);
            current = current.next;
        }
        return queue;
    }

    /**
     * Returns an Iterator to the LinkedListSet that iterates through the elements of the
     * LinkedListSet in the order they were inserted.
     *
     * @return an Iterator to the LinkedListSet that iterates through the elements of the in the
     *         order they were inserted.
     */
    public Iterator<K> iterator() {
        return new Iterator<K>() {
            private Node<K> current = first;

            @Override
            public boolean hasNext() {
                return current != null;
            }

            @Override
            public K next() {
                if (!hasNext())
                    throw new NoSuchElementException("iterator does not have next element");
                K key = current.key;
                current = current.next;
                return key;
            }
        };
    }
}
```

### Time Complexity

The following table describes the time complexity for performing the operations above on an hash set 
with the separate chaining method and the linear probing method:

```
| Data Structure               | contains | put   | delete |
|------------------------------|----------|-------|--------|
| hash set (separate chaining) | O(1)     | O(1)  | O(1)   |
| hash set (linear probing)    | O(1)*    | O(1)* | O(1)*  |
```

\* Amortized
