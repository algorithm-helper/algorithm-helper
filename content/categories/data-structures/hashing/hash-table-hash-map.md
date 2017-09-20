# Hash Table / Hash Map

### Separate Chaining

### Linear Probing

### Visualization

### Operations

### Implementation (Separate Chaining)

##### Java

```
package com.example;

import com.example.utils.LinkedListMap;
import com.example.utils.Queue;

import java.util.NoSuchElementException;

public class HashMapSeparateChaining<K extends Comparable<K>, V> {

    private static final int INIT_CAPACITY = 4;
    private int n;
    private int m;
    private LinkedListMap<K, V>[] L;

    /**
     * Initializes an empty HashMapSeparateChaining with initial
     * capacity.
     */
    public HashMapSeparateChaining() {
        this(INIT_CAPACITY);
    }

    /**
     * Initializes an empty HashMapSeparateChaining with initial
     * capacity of m.
     *
     * @param m, the initial capacity
     * @throws IllegalArgumentException if m <= 0
     */
    public HashMapSeparateChaining(int m) {
        if (m <= 0)
            throw new IllegalArgumentException("constructor with invalid m");
        this.m = m;
        L = (LinkedListMap<K, V>[]) new Object[m];
        for (int i = 0; i < m; i++)
            L[i] = new LinkedListMap();
    }

    /**
     * Returns true if the HashMapSeparateChaining is empty, otherwise false.
     *
     * @return true if the HashMapSeparateChaining is empty, otherwise false
     */
    public boolean isEmpty() {
        return n == 0;
    }

    /**
     * Returns the number of elements in the HashMapSeparateChaining.
     *
     * @return the number of elements in the HashMapSeparateChaining
     */
    public int size() {
        return n;
    }

    /**
     * Helper method to resize the array of LinkedListMap chains in the
     * HashMapSeparateChaining.
     *
     * @param newSize
     * @throws IllegalArgumentException if newSize is less than or equal to
     *         zero
     */
    private void resize(int newSize) {
        if (newSize <= 0)
            throw new IllegalArgumentException("resize with invalid newSize");

        HashMapSeparateChaining<K, V> temp = new HashMapSeparateChaining(newSize);
        for (int i = 0; i < m; i++) {
            for (K key : L[i].keys()) {
                temp.put(key, L[i].get(key));
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
     * HashMapSeparateChaining, otherwise false.
     *
     * @param key, the key to be searched
     * @return true if the key is already contained in the
     *         HashMapSeparateChaining, otherwise false.
     * @throws IllegalArgumentException if the key is null
     */
    public boolean contains(K key) {
        if (key == null)
            throw new IllegalArgumentException("contains with null key");
        return get(key) != null;
    }

    /**
     * Returns the val associated with this key in the corresponding hashed
     * LinkedListMap.
     *
     * @param key, the key to be searched
     * @return the val associated with this key in the corresponding hashed
     *         LinkedListMap
     * @throws IllegalArgumentException if the key is null
     */
    public V get(K key) {
        if (key == null)
            throw new IllegalArgumentException("get with null key");
        return L[hash(key)].get(key);
    }

    /**
     * Inserts the (key, val) pair into the HashMapSeparateChaining.
     *
     * @param key, the key to be inserted
     * @param val, the val associated with the key
     * @throws IllegalArgumentException if the key is null
     */
    public void put(K key, V val) {
        if (key == null)
            throw new IllegalArgumentException("put with null key");
        if (val == null) {
            delete(key);
            return;
        }

        if (n >= 10*m)
            resize(2*m);

        int h = hash(key);
        if (!L[h].contains(key))
            n++;
        L[h].insert(key, val);
    }

    /**
     * Deletes the (key, val) pair by key from the HashMapSeparateChaining.
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
     * HashMapSeparateChaining.
     *
     * @return an Iterable that iterates over the keys of the
     *         HashMapSeparateChaining
     * @throws NoSuchElementException if the HashMapSeparateChaining
     *         is null
     */
    public Iterable<K> keys() {
        if (isEmpty())
            throw new NoSuchElementException("keys with empty " +
                    "HashMapSeparateChaining");

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

public class HashMapLinearProbing<K extends Comparable<K>, V> {

    private static final int INIT_CAPACITY = 4;
    private int n;
    private int m;
    private K[] keys;
    private V[] vals;

    /**
     * Initializes an empty HashMapLinearProbing with initial
     * capacity.
     */
    public HashMapLinearProbing() {
        this(INIT_CAPACITY);
    }

    /**
     * Initializes an empty HashMapLinearProbing with initial
     * capacity of m.
     *
     * @param m, the initial capacity
     * @throws IllegalArgumentException if m <= 0
     */
    public HashMapLinearProbing(int m) {
        if (m <= 0)
            throw new IllegalArgumentException("constructor with invalid m");
        this.m = m;
        n = 0;
        keys = (K[]) new Object[m];
        vals = (V[]) new Object[m];
    }

    /**
     * Returns true if the HashMapLinearProbing is empty, otherwise false.
     *
     * @return true if the HashMapLinearProbing is empty, otherwise false
     */
    public boolean isEmpty() {
        return n == 0;
    }

    /**
     * Returns the number of elements in the HashMapLinearProbing.
     *
     * @return the number of elements in the HashMapLinearProbing
     */
    public int size() {
        return n;
    }

    /**
     * Helper method to resize the keys and vals arrays in the
     * HashMapLinearProbing.
     *
     * @param newSize
     * @throws IllegalArgumentException if newSize is less than or equal to
     *         zero
     */
    private void resize(int newSize) {
        if (newSize <= 0)
            throw new IllegalArgumentException("resize with invalid newSize");

        HashMapLinearProbing<K, V> temp = new HashMapLinearProbing(newSize);
        for (int i = 0; i < m; i++) {
            if (keys[i] != null)
                temp.put(keys[i], vals[i]);
        }
        this.m = temp.m;
        this.n = temp.n;
        this.keys = temp.keys;
        this.vals = temp.vals;
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
     * HashMapLinearProbing, otherwise false.
     *
     * @param key, the key to be searched
     * @return true if the key is already contained in the
     *         HashMapLinearProbing, otherwise false.
     * @throws IllegalArgumentException if the key is null
     */
    public boolean contains(K key) {
        if (key == null)
            throw new IllegalArgumentException("contains with null key");
        return get(key) != null;
    }

    /**
     * Returns the val in the vals array associated with this key in the
     * keys array.
     *
     * @param key, the key to be searched
     * @return the val associated with this key in the corresponding hashed
     *         position in the vals array
     * @throws IllegalArgumentException if the key is null
     */
    public V get(K key) {
        if (key == null)
            throw new IllegalArgumentException("get with null key");

        for (int i = hash(key); keys[i] != null; i = (i + 1) % m)
            if (keys[i].equals(key))
                return vals[i];
        return null;
    }

    /**
     * Inserts the (key, val) pair into the HashMapLinearProbing.
     *
     * @param key, the key to be inserted
     * @param val, the val associated with the key
     * @throws IllegalArgumentException if the key is null
     */
    public void put(K key, V val) {
        if (key == null)
            throw new IllegalArgumentException("put with null key");

        if (val == null) {
            delete(key);
            return;
        }

        if (n >= m/2)
            resize(2*m);

        int i;
        for (i = hash(key); keys[i] != null; i = (i + 1) % m) {
            if (keys[i].equals(key)) {
                vals[i] = val;
                return;
            }
        }
        keys[i] = key;
        vals[i] = val;
        n++;
    }

    /**
     * Deletes the (key, val) pair by key from the HashMapLinearProbing.
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
        vals[i] = null;

        i = (i + 1) % m;
        while (keys[i] != null) {
            K keyRehash = keys[i];
            V valRehash = vals[i];
            keys[i] = null;
            vals[i] = null;
            n--;
            put(keyRehash, valRehash);
            i = (i + 1) % m;
        }

        n--;

        if (n > 0 && n <= m/8)
            resize(m/2);
    }

    /**
     * Returns an Iterable that iterates over the keys of the
     * HashMapLinearProbing.
     *
     * @return an Iterable that iterates over the keys of the
     *         HashMapLinearProbing
     * @throws NoSuchElementException if the HashMapLinearProbing
     *         is null
     */
    public Iterable<K> keys() {
        if (isEmpty())
            throw new NoSuchElementException("keys with empty " +
                    "HashMapLinearProbing");

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
