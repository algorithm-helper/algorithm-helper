# Hash Set

### Visualization

### Operations

### Implementation (Separate Chaining)

##### Java

```
package com.example;

import com.example.utils.LinkedListSet;
import com.example.utils.Queue;

import java.util.NoSuchElementException;

public class HashSetSeparateChaining<K extends Comparable<K>> {

    private static final int INIT_CAPACITY = 4;
    private int n;
    private int m;
    private LinkedListSet<K>[] L;

    /**
     * Initializes an empty HashSetSeparateChaining with initial
     * capacity.
     */
    public HashSetSeparateChaining() {
        this(INIT_CAPACITY);
    }

    /**
     * Initializes an empty HashSetSeparateChaining with initial
     * capacity of m.
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
     * Helper method to resize the array of LinkedListSet chains in the
     * HashSetSeparateChaining.
     *
     * @param newSize
     * @throws IllegalArgumentException if newSize is less than or equal to
     *         zero
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
     * Returns true if the key is already contained in the
     * HashSetSeparateChaining, otherwise false.
     *
     * @param key, the key to be searched
     * @return true if the key is already contained in the
     *         HashSetSeparateChaining, otherwise false.
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
     * Delete the key from the HashSetSeparateChaining.
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
     * Returns an Iterable that iterates over the keys of the
     * HashSetSeparateChaining.
     *
     * @return an Iterable that iterates over the keys of the
     *         HashSetSeparateChaining
     * @throws NoSuchElementException if the HashSetSeparateChaining
     *         is null
     */
    public Iterable<K> keys() {
        if (isEmpty())
            throw new NoSuchElementException("keys with empty " +
                    "HashSetSeparateChaining");

        Queue<K> queue = new Queue();
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
package com.example;

import com.example.utils.Queue;

import java.util.NoSuchElementException;

public class HashSetLinearProbing<K extends Comparable<K>> {

    private static final int INIT_CAPACITY = 4;
    private int n;
    private int m;
    private K[] keys;

    /**
     * Initializes an empty HashSetLinearProbing with initial
     * capacity.
     */
    public HashSetLinearProbing() {
        this(INIT_CAPACITY);
    }

    /**
     * Initializes an empty HashSetLinearProbing with initial
     * capacity of m.
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
     * @throws IllegalArgumentException if newSize is less than or equal to
     *         zero
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
     * Returns true if the key is already contained in the
     * HashSetLinearProbing, otherwise false.
     *
     * @param key, the key to be searched
     * @return true if the key is already contained in the
     *         HashSetLinearProbing, otherwise false.
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
     * Returns an Iterable that iterates over the keys of the
     * HashSetLinearProbing.
     *
     * @return an Iterable that iterates over the keys of the
     *         HashSetLinearProbing
     * @throws NoSuchElementException if the HashSetLinearProbing
     *         is null
     */
    public Iterable<K> keys() {
        if (isEmpty())
            throw new NoSuchElementException("keys with empty " +
                    "HashSetLinearProbing");

        Queue<K> queue = new Queue();
        for (int i = 0; i < m; i++) {
            if (keys[i] != null)
                queue.enqueue(keys[i]);
        }
        return queue;
    }
}
```

### Time Complexity

```
```
