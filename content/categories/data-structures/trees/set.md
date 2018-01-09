# Set

A set is an abstract data type of a collection of key values in which there are no repeated values. 
It is the computer representation of the mathematical object of a set. The operations we use on a 
set are `contains`, which given a key, returns `true`/`false` depending on whether or not the key is 
in the set, `put`, which given a key, inserts it into the set, and if the key already exists, then 
it does nothing, and `delete`, which given a key, deletes the key from the set.

### Example

The following demonstrates the state of a set by using its operations:

```
// Suppose we start off with an empty set, and we insert keys into it:
{}

// put(A):
{A}

// put(B):
{A, B}

// put(C):
{A, B, C}

// put(D):
{A, B, C, D}

// put(E):
{A, B, C, D, E}

// contains(A):
true

// contains(F):
false

// delete(A):
{B, C, D, E}

// delete(D):
{B, C, E}

// contains(B):
true

// contains(D):
false
```

### Implementations

The following provides an interface for sets.

##### Java

```
package com.algorithmhelper.datastructures.interfaces;

public interface Set<K extends Comparable<K>> {

    /**
     * Returns true if the Set is empty, false otherwise.
     *
     * @return true if the Set is empty, false otherwise
     */
    boolean isEmpty();

    /**
     * Returns the number of elements in the Set.
     *
     * @return the number of elements in the Set
     */
    int size();

    /**
     * Returns true if the key is contained in the Set, false
     * otherwise.
     *
     * @param key, the key to be searched for
     * @return true if the key is contained in the Set, false
     *         otherwise
     */
    boolean contains(K key);

    /**
     * Insert the key into the Set.
     *
     * @param key, the key to be inserted
     */
    void put(K key);

    /**
     * Remove the key from the Set.
     *
     * @param key, the key to be removed
     */
    void delete(K key);

    /**
     * Returns an Iterable to the elements of the Set.
     *
     * @return an Iterable to the elements of the Set
     */
    Iterable<K> keys();
}
```
