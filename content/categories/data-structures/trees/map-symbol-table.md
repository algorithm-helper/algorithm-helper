# Map / Symbol Table

A map, also called a symbol table, associative array, or dictionary, is an 
abstract data type of a collection of (key, value) pairs, such that there are no 
repeated keys. The operations we use on a map are `get`, which given a key, 
retrieves its associated value in the map, `put`, which given a (key, value) 
pair, inserts it into the map and if the key already exists, then it updates the 
value with the new value, and `delete`, which given a key, deletes the 
associated (key, value) pair from the map.

### Example

The following demonstrates the state of a map by using its operations:

```
// Suppose we start off with an empty map, and we insert ordered pairs (K, V)
// that represent (key, value) pairs:
{}

// put((A, 1)):
{(A, 1)}

// put((B, 2)):
{(A, 1), (B, 2)}

// put((C, 7)):
{(A, 1), (B, 2), (C, 3)}

// put((D, 10)):
{(A, 1), (B, 2), (C, 7), (D, 10)}

// put((C, 8)):
{(A, 1), (B, 2), (C, 8), (D, 10)}

// put((A, 3)):
{(A, 3), (B, 2), (C, 8), (D, 10)}

// get(A):
3

// get(E):
null

// get(C):
8

// delete(A):
{(B, 2), (C, 8), (D, 10)}

// delete(C):
{(B, 2), (D, 10)}
```

### Implementations

The following provides an interface for maps.

##### Java

View the source code [here](https://github.com/algorithm-helper/implementations/blob/master/java/com/algorithmhelper/datastructures/interfaces/Map.java).

```
package com.algorithmhelper.datastructures.interfaces;

public interface Map<K extends Comparable<K>, V> {

    /**
     * Returns true if the Map is empty, false otherwise.
     *
     * @return true if the Map is empty, false otherwise
     */
    public boolean isEmpty();

    /**
     * Returns the number of elements in the Map.
     *
     * @return the number of elements in the Map
     */
    public int size();

    /**
     * Returns the val associated with the key in the Map.
     *
     * @param key, the key to be searched for
     * @return the val associated with the key in the Map
     */
    public V get(K key);

    /**
     * Returns true if the key is contained in the Map, false
     * otherwise.
     *
     * @param key, the key to be searched for
     * @return true if the key is contained in the Map, false
     *         otherwise
     */
    public boolean contains(K key);

    /**
     * Insert the (key, val) pair into the Map.
     *
     * @param key, the key to be inserted
     * @param val, the val associated with the key
     */
    public void put(K key, V val);

    /**
     * Remove the key from the Map.
     *
     * @param key, the key to be removed
     */
    public void delete(K key);

    /**
     * Returns an Iterable to the elements of the Map.
     *
     * @return an Iterable to the elements of the Map
     */
    public Iterable<K> keys();

}
```
