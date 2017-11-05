# Hash Table / Hash Map

A hash table, or hash map, is a lookup table that stores (`key`, `val`) pairs.
We use a hash function (more can be read about this on the article on [Hash 
Functions](/categories/data-structures/hashing/hash-function)) to compute a 
valid index into this table at some slot, which we call a bucket. Since keys 
can hash to the same value, we store the individual keys in this bucket. There
are two primary ways of implementing a hash map: separate chaining and linear
probing. Both ways are methods for resolving collisions.

What hash maps are particularly efficient for are the operations `get`, `put`,
`contains`, and `delete`. The operation `get` is given a `key`, and returns 
the associated `val` or `null` if the `key` does not exist in the hash map. The
operation `put` inserts a given (`key`, `val`) pair into the hash map. The 
operation `contains` checks if a given `key` exists in the hash map. The 
operation `delete` is given a `key`, and removes the associated (`key`, `val`)
pair from the hash map.

Note that operations like `max`/`min`, `deleteMax`/`deleteMin` are not 
necessarily efficient. Consider a naive implementation of a hash map, where we
use separate chaining. An operation like `max` would require us to iterate 
through the keys until we determine the maximum `key`, and `deleteMax` would 
depend on that operation to find the corresponding (`key`, `val`) pair to 
delete, which of course, takes O(N) time. This can be improved by always
saving the `min` or `max` `key` every time we insert a (`key`, `val`) pair into 
the table. Determining if a new `key` is less than the `min` or greater than the 
`max` only takes O(1) time, thus generally we have `min` and `max` done in O(1)
time. However, when we delete a `key`, we no longer have access to the `min` or 
the `max` element, and that would have to be recomputed by iterating through the 
keys and finding the `min` or `max` key, which takes O(N) time.

Note that if the operations `max`/`min`, `deleteMax`/`deleteMin` are important, 
then balanced binary search trees like [Red-Black Trees](/categories/data-structures/trees/red-black-tree) or [AVL Trees](/categories/data-structures/trees/avl-tree) may be a better option.

### Separate Chaining

Separate chaining is a method for resolving collisions, and it is based on the 
idea that at a slot in the table, we have a linked list structure that links all 
of the (`key`, `val`) pairs that hash to that slot. If we have N keys and a 
table size of M, under the [Simple Uniform Hashing Assumption](/categories/data-structures/hashing/simple-uniform-hashing-assumption), the 
average length of these chains is N/M. Thus we have a lookup in O(1 + N/M) time,
or if we define `alpha = N/M` then lookup is in O(1 + alpha) time.

The following is a visualization of separate chaining in a hash map:

```
Table of size M:

     ---
    | 0 | -> ("a", 123) -> ("b", 234) -> ("c", 567) -> null
     ---
    | 1 | -> ("ab", 345) -> null
     ---
    | 2 | -> null
     ---
    | 3 | -> ("ef", 678) -> ("def", 234) -> null
     ---
    | 4 | -> null
     ---
    ... etc.
```

The problem with this is that if N grows much larger than M, searching through 
this table could degenerate to O(N) because the linked lists grow too large in 
length. The table size itself is able to dynamically resize.

However, this raises another issue, which is what ratio to maintain N/M. If M 
is too large, then we have too much empty slots not used, but if M is too small, 
the chains become too long. We choose M to be N/5 and thus we can maintain the 
load factor to be about 5. Thus on average, after we hash to an index, we have 
the search through about 5 linked list nodes before finding the key.

### Linear Probing

Linear probing, also called open addressing, is another method for resolving 
collisions and is based on the idea that we hash to a slot, but if the slot is 
already taken, we go to the next slot, and keep going until we find an available 
slot. To keep track of (`key`, `val`) pairs, we can have two parallel tables, 
one for storing keys, and one for storing values.

The following is a visualization of linear probing in a hash map:

```
Table of size M:

Suppose we already have the keys 2, 8 and 3 already in the table.

1. Suppose that we have a hash function h that hashes keys to an index between
0 and 6, and that h(10) = 6. Since the slot at index 6 is already empty, we
store 6 there.

2. Suppose that we have the key 7, and h(7) = 3. But the slot at index 3 is
already taken by key 3, so we go to the next available slot at index 4, which
is empty, so we store 7 there.

3. Suppose that we have the key 1, and h(1) = 0. But the slot at index 0 is
already taken by key 2, so we go to the next slot at index 1. But this slot is
also already taken, so we go to the next slot at index 2. Since this slot is
empty, we store 1 there.

  index
          ---
    0    | 2 | <- h(1) = 0, but this slot is already taken
          ---
    1    | 8 | <- Go to the next slot but this slot is also taken
          ---
    2    |   | <- 1 goes here, since it is the next available slot
          ---
    3    | 3 | <- h(7) = 3, but this slot is already taken
          ---
    4    |   | <- 7 goes here, since it is the next available slot
          ---
    5    |   |
          ---
    6    |   |  <- 10 hashes to this slot since it is empty
          ---
```

When slots are grouped together because they are already taken and we 
continuously hash to that slot or surrounding slots, we create what is defined 
as a cluster. Notice how after we inserted 1, slots 0 to 4 became occupied. 
The goal is to reduce the size of these clusters to a manageable size, so that 
we reduce the number of probes necessary to find the next empty slot.

Likewise with separate chaining, we can take advantage of the fact that we have
the Simple Uniform Hashing Assumption to analyze probabilistically, what the 
average number of probes will be. Knuth's analysis of the average number of 
probes for a table of size M, with `N = alpha * M` keys is:

```
For search success:
~ 1/2 (1 + 1 / (1 - alpha))

For search fail or insert:
~ 1/2 (1 + 1 / (1 - alpha) ^ 2)
```

Thus we see that if M is small, say close to N, then alpha becomes close to 1, 
and (1 - alpha) becomes small, but since it is on the denominator, the whole 
number grows large. We want to have M to be a number close to 2N, and thus 
alpha, or our load factor is about 0.5. Then by Knuth's formula above, the 
number of probes for a search success is about 1.5 and for a search fail or 
insert is about 2.5.

Compare this to separate chaining, which requires on average 5 iterations 
through the corresponding linked list. Linear probing is more time efficient, 
but less space efficient because it is necessary to store parallel arrays for 
keys and values. As well, because we need to keep the number of needed probes
to be small, when the hash map grows large with (`key`, `val`) pairs, it 
becomes necessary to create a larger hash table, and rehash all of the keys 
again, however, this is amortized. 

### Operations

For separate chaining:

- `contains`
    - Returns `true`/`false` depending on whether or not a given `key` exists
    in the hash map. This is done by hashing the `key` into the correct slot,
    and then traversing through the corresponding linked list at that slot, and
    if the corresponding node with the (`key`, `val`) exists, then it returns 
    `true`, otherwise it returns `false`.
- `get`
    - Returns the corresponding (`key`, `val`) pair for a given `key`. This is 
    done by hashing the `key` into the correct slot, and then traversing 
    through the corresponding linked list at that slot, and if the corresponding
    node with the (`key`, `val`) pair exists, then it returns the pair. If it
    does not exist, then it returns `null`.
- `put`
    - Inserts a (`key`, `val`) pair into the hash map. This is done by hashing
    the `key` into the correct slot, and then inserting the pair into the 
    corresponding linked list at that slot. This is done by creating a new node
    with the (`key`, `val`) pair, linking its `next` to the `first` in the 
    linked list, and then pointing `first` to the new node.
- `delete`
    - Removes a the corresponding (`key`, `val`) pair from the hash map given
    some `key`. This is done by hashing the `key` into the correct slot, and 
    then traversing through the corresponding linked list at that slot to 
    remove the corresponding (`key`, `val`) pair.

For linear probing:

- `contains`
    - Returns `true`/`false` depending on whether or not a given `key` exists
    in the hash map. This is done by hashing the `key` into the correct slot, 
    and if the corresponding (`key`, `val`) pair already exists there, then it
    returns true. Otherwise, it continuously checks the next adjcent slot, and 
    if the corresponding (`key`, `val`) pair is found, then it returns true,
    indicating that the given `key` exists. If the probe reaches a `null` slot, 
    then it returns false, indicating that the given `key` does not exist in 
    the hash map.
- `get`
    - Returns the corresponding (`key`, `val`) pair for a given `key`. This is 
    done by hashing the `key` into the correct slot, and checking if the 
    corresponding (`key`, `val`) pair exists there, then it returns the pair. 
    Otherwise, it continuously checks the next adjacent slot, and if the 
    corresponding (`key`, `val`) pair is found, then it returns the pair. If the
    probe reaches a `null` slot, then it returns `null`.
- `put`
    - Inserts a (`key`, `val`) pair into the hash map. This is done by hashing
    the `key` into the correct slot, and then if this slot is already `null`, it
    inserts the pair at this slot. Otherwise, it continuously checks the next
    adjacent slot to find the next `null` slot, and inserts the pair there.
- `delete`
    - Removes a the corresponding (`key`, `val`) pair from the hash map given
    some `key`. This is done by hashing the `key` into the correct slot, and if 
    the corresponding (`key`, `val`) pair is at that slot, it is set to `null`.
    Otherwise, it continuously checks the next adjacent slot, until the 
    correponding (`key`, `val`) pair is found, and then is set to `null`. Then
    all of the keys are rehashed again.

### Implementation (Separate Chaining)

##### Java

```
package datastructures.hashing;

import datastructures.lists.LinkedListMap;
import datastructures.lists.QueueLinkedList;
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

        QueueLinkedList<K> queue = new QueueLinkedList();
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
package datastructures.hashing;

import datastructures.lists.QueueLinkedList;
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

        QueueLinkedList<K> queue = new QueueLinkedList<K>();
        for (int i = 0; i < m; i++) {
            if (keys[i] != null)
                queue.enqueue(keys[i]);
        }
        return queue;
    }
}
```

### Time Complexity

The following table describes the time complexity for performing the 
operations above on an hash table/hash map with the separate chaining method and
the linear probing method:

```
| Data Structure                            | contains | get   | put   | delete |
|-------------------------------------------|----------|-------|-------|--------|
| hash table / hash map (separate chaining) | O(1)     | O(1)  | O(1)  | O(1)   |
| hash table / hash map (linear probing)    | O(1)*    | O(1)* | O(1)* | O(1)*  |
```

\* Amortized
