# Binary Search Tree

A binary search tree (BST) is a tree structure that is a binary tree with a root node, and all nodes 
have pointers to their `left` and `right` children, with the property that the `left` child's key is 
always less than the root (in whatever way that may be defined), and the `right` child's key is 
always greater than the root. The main motivation behind its use stems from binary search (more can 
be read in the article on [Binary Search](/categories/algorithms/searching/binary-search)).
Suppose we were to search for a key in the tree, because when the key is less than or greater than 
the root, we can traverse on the left thereby eliminating the entire problem space on the right, or 
vice versa.

### Visualization

The following visualizes a (balanced) binary search tree. Since we are able to divide the problem 
space by 2 each time, this results in a tree height of $logN$ where $N$ is the number of elements in 
the tree. Clearly, we can then access elements within $O(logN)$ time:

```
         5
       /   \
      3     7
     / \   / \
    1   4 6   9    
```

However, with a simple implementation of the binary search tree, such as the one below, it is not 
the case that we have $O(logN)$ guaranteed in any manner, because we have no guarantee that the tree 
is balanced, which means that at any node in the tree, we have the left subtree and the right 
subtree to be the same size or differ by one (more can be read in the article on 
[Balanced Binary Search Trees](/categories/data-structures/trees/balanced-binary-search-tree)).
Consider the same tree as above, but the nodes were inserted in ascending order.

```
    1
     \
      3
       \
        4
         \
          5
           \
            6
             \
              7
               \
                9
```

This tree structure effectively degenerates into a linked list-like structure. Thus, as for the 
peformance of using this naive binary search tree implementation, we can only say that its time 
complexity for its operations is $O(H)$, where $H$ is the height of the tree.

Regardless, one advantage of this tree is that finding the maximum and minimum elements is very 
intuitive, since we can simply traverse the `right` node each time until the `right` becomes `null`, 
or traverse the `left` node each time until the `left` becomes `null`, respectively.

### Operations

- `size`
    - Return the size of the tree of subtree starting from some given node `x`,
    this is done by taking advantage of the `size` field within each node. We
    do this recursively by summing up the `size` of the `left` and `right` nodes
    of `x`. If `x` was the `root` of the tree, we would get the total number of 
    nodes in the entire tree.
- `contains`
    - Returns `true`/`false` for whether or not some given `key` belongs in the
    tree. This is done by trying to return the `val` associated with the `key`
    by using `get`, and checking whether or not the `val` is `null`.
- `get`
    - Returns the `val` associated with some given `key`. To find this `key`, we
    traverse down the tree such that if the given `key` is less than the `key`
    at that node, we go `left`, and if the given `key` is greater than the `key`
    at that node, we go `right`, until we either find the corresponding node 
    with the correct key, or we hit `null` meaning that the `key` does not 
    exist in the tree, and return `null`.
- `put`
    - Inserts the (`key`, `val`) pair into the tree by starting at the root and
    traversing down the tree such that if the given `key` is less than the `key`
    at that node, we go `left`, and if the given `key` is greater than the `key`
    at that node, we go `right`. If we reach a node whose `left` is `null` and 
    the given `key` is also less than the `key` of the node, then we insert a
    new node to the `left` of that node. If we reach a node whose `right` is 
    `null` and the given `key` is also greater than the `key` of the node, then
    we insert a new node to the `right` of that node.
- `min`
    - Returns the minimum `key` in the tree. Since all nodes to the `left` have
    a `key` less than that of its `root`, we can continuously traverse to the
    `left`, until its `left` becomes null.
- `max`
    - Returns the maximum `key` in the tree. Since all nodes to the `right` have
    a `key` greater than that of its `root`, we can continuously traverse to the
    `right`, until its `right` becomes null.
- `delete`
    - Deletes the associated (`key`, `val`) pair of a given `key`. This is done
    by recursively traversing down to the correct position of the node. If the
    node happens to be a leaf node, then it is set to be `null`. If the node 
    is in a position where it has a `left` and a `right` node, then we swap
    the node with the next minimum node recursively from the `right` node.
- `deleteMin`
    - Deletes the associated (`key`, `val`) pair with the maximum `key` in the 
    tree. This is done by recursively traversing down to the left-most node
    in the tree and setting it to `null`.
- `deleteMax`
    - Deletes the associated (`key`, `val`) pair with the minimum `key` in the 
    tree. This is done by recursively traversing down to the right-most node
    in the tree and setting it to `null`.
- `floor`
    - Retrieves the largest `key` less than or equal to the given `key` by 
    recursively traversing down the tree until finding a node where the `right`
    node has a `key` greater than the given `key`, and then trying to find the 
    next minimum node from that `right` node, if it exists.
- `ceil`
    - Retrieves the smallest `key` greater than or equal to the given `key` by 
    recursively traversing down the tree until finding a node where the `left`
    node has a `key` less than the given `key`, and then trying to find the 
    next maximum node from that `left` node, if it exists.
- `select`
    - Returns the k-th smallest `key` in the tree given some valid integer `k`, 
    and this is done by keeping track of the number the amount of `keys` that
    are smaller by recursively traversing down the `right` node, subtracting 
    the `size` of the `left` node - 1. 
- `rank`
    - Returns the number of `keys` in the tre that are less than some given 
    `key`, and this is done by traversing down the tree, and if the `left`
    node's key is smaller than the given `key` to add that and recursively 
    traverse down the `right` node.

### Implementation (Map)

##### Java

```
package com.algorithmhelper.datastructures.trees;

import java.util.NoSuchElementException;
import com.algorithmhelper.datastructures.interfaces.Map;
import com.algorithmhelper.datastructures.interfaces.Queue;
import com.algorithmhelper.datastructures.lists.QueueLinkedList;

public class BinarySearchTreeMap<K extends Comparable<K>, V> implements Map<K, V> {

    private Node root;

    private class Node {
        private K key;
        private V val;
        private Node left, right;
        private int size;

        public Node(K key, V val, int size) {
            this.key = key;
            this.val = val;
            this.size = size;
        }
    }

    /**
     * Initializes an empty BinarySearchTreeMap.
     */
    public BinarySearchTreeMap() {}

    /**
     * Returns true if the BinarySearchTreeMap is empty.
     *
     * @return true if the BinarySearchTreeMap is empty, false otherwise
     */
    public boolean isEmpty() {
        return size() == 0;
    }

    /**
     * Returns the number of elements in the BinarySearchTreeMap.
     *
     * @return the number of elements in the BinarySearchTreeMap
     */
    public int size() {
        if (root == null)
            return 0;
        return root.size;
    }

    /**
     * Returns the number of elements from x in the BinarySearchTreeMap.
     *
     * @return the number of elements from x in the BinarySearchTreeMap
     */
    private int size(Node x) {
        if (x == null)
            return 0;
        return x.size;
    }

    /**
     * Returns true if the key is contained in the BinarySearchTreeMap.
     *
     * @param key, the key to be searched for
     * @return true if the key is contained in the BinarySearchTreeMap,
     *         false otherwise
     * @throws IllegalArgumentException if the key is null
     */
    public boolean contains(K key) {
        if (key == null)
            throw new IllegalArgumentException("contains with null key");
        return get(key) != null;
    }

    /**
     * Returns the value associated with the key, if the key is not found in the
     * BinarySearchTreeMap, return null
     *
     * @param key, the key to be searched for
     * @return the value associated with the key, if the key is not found in the BinarySearchTreeMap,
     *         return null
     * @throws IllegalArgumentException if the key is null
     */
    public V get(K key) {
        if (key == null)
            throw new IllegalArgumentException("get with null key");

        Node current = root;

        while (current != null) {
            int cmp = key.compareTo(current.key);

            if (cmp < 0)
                current = current.left;
            else if (cmp > 0)
                current = current.right;
            else
                return current.val;
        }

        return null;
    }

    /**
     * Insert the (key, value) pair into the BinarySearchTreeMap. If a pair with the key is already
     * contained, update the value to the new value. If the value provided is null, then delete the
     * pair with the key.
     *
     * @param key, the key to be searched for
     * @param val, the value associated with the key
     * @throws IllegalArgumentException if the key is null
     */
    public void put(K key, V val) {
        if (key == null)
            throw new IllegalArgumentException("put with null key");

        if (val == null) {
            delete(key);
            return;
        }

        Node current = root;

        while (current != null) {
            int cmp = key.compareTo(current.key);

            if (cmp == 0) {
                current.val = val;
                return;
            }

            current.size++;

            if (cmp < 0 && current.left == null) {
                current.left = new Node(key, val, 1);
                return;
            } else if (cmp < 0) {
                current = current.left;
            } else if (cmp > 0 && current.right == null) {
                current.right = new Node(key, val, 1);
                return;
            } else if (cmp > 0) {
                current = current.right;
            }
        }
    }

    /**
     * Returns the smallest key in the BinarySearchTreeMap.
     *
     * @return the smallest key in the BinarySearchTreeMap
     */
    public K min() {
        if (isEmpty())
            throw new NoSuchElementException("min with empty BinarySearchTreeMap");
        Node current = root;
        while (current.left != null)
            current = current.left;
        return current.key;
    }

    /**
     * Returns the largest key in the BinarySearchTreeMap.
     *
     * @return the largest key in the BinarySearchTreeMap
     */
    public K max() {
        if (isEmpty())
            throw new NoSuchElementException("min with empty BinarySearchTreeMap");
        Node current = root;
        while (current.right != null)
            current = current.right;
        return current.key;
    }

    /**
     * Returns the Node with the smallest key in the BinarySearchTreeMap.
     *
     * @return the Node with the smallest key in the BinarySearchTreeMap
     */
    public Node minNode(Node x) {
        if (x.left == null)
            return x;
        return minNode(x.left);
    }

    /**
     * Returns the Node with the largest key in the BinarySearchTreeMap.
     *
     * @return the Node with the largest key in the BinarySearchTreeMap
     */
    public Node maxNode(Node x) {
        if (x.right == null)
            return x;
        return maxNode(x.right);
    }

    /**
     * Removes the (key, value) pair with the given key from the BinarySearchTreeMap.
     *
     * @param key, the key whose (key, value) to be deleted
     * @throws NoSuchElementException if the BinarySearchTreeMap is empty
     */
    public void delete(K key) {
        if (key == null)
            throw new IllegalArgumentException("delete with null key");
        root = delete(root, key);
    }

    /**
     * Helper for delete.
     *
     * @param x
     * @param key
     * @return x
     */
    private Node delete(Node x, K key) {
        if (x == null)
            return null;

        int cmp = key.compareTo(x.key);
        if (cmp < 0)
            x.left = delete(x.left, key);
        else if (cmp > 0)
            x.right = delete(x.right, key);
        else {
            if (x.right == null)
                return x.left;
            if (x.left == null)
                return x.right;

            Node temp = x;
            x = minNode(temp.right);
            x.right = deleteMin(temp.right);
            x.left = temp.left;
        }
        x.size = 1 + size(x.left) + size(x.right);
        return x;
    }

    /**
     * Removes the (key, value) pair with the smallest key from the BinarySearchTreeMap.
     *
     * @throws NoSuchElementException if the BinarySearchTreeMap is empty
     */
    public void deleteMin() {
        if (isEmpty())
            throw new NoSuchElementException("deleteMin on empty BinarySearchTreeMap");
        root = deleteMin(root);
    }

    /**
     * Helper for deleteMin.
     *
     * @param x
     * @return x
     */
    private Node deleteMin(Node x) {
        if (x.left == null)
            return x.right;
        x.left = deleteMin(x.left);
        x.size = 1 + size(x.left) + size(x.right);
        return x;
    }

    /**
     * Removes the (key, value) pair with the largest key from the
     * BinarySearchTreeMap.
     *
     * @throws NoSuchElementException if the BinarySearchTreeMap is empty
     */
    public void deleteMax() {
        if (isEmpty())
            throw new NoSuchElementException("deleteMax on empty BinarySearchTreeMap");
        root = deleteMax(root);
    }

    /**
     * Helper for deleteMax.
     *
     * @param x
     * @return x
     */
    private Node deleteMax(Node x) {
        if (x.right == null)
            return x.left;
        x.right = deleteMax(x.right);
        x.size = 1 + size(x.left) + size(x.right);
        return x;
    }

    /**
     * Returns the largest key less than or equal to key in the BinarySearchTreeMap.
     *
     * @param key, the key to be searched
     * @return the largest key less than or equal to key in the BinarySearchTreeMap.
     * @throws IllegalArgumentException if the key is null
     * @throws NoSuchElementException if the BinarySearchTreeMap is empty
     */
    public K floor(K key) {
        if (key == null)
            throw new IllegalArgumentException("floor with null key");
        if (isEmpty())
            throw new NoSuchElementException("floor with empty BinarySearchTreeMap");

        Node x = floor(root, key);
        if (x == null)
            return null;
        return x.key;
    }

    /**
     * Helper for floor.
     *
     * @param x
     * @param key
     * @return x
     */
    private Node floor(Node x, K key) {
        if (x == null)
            return null;

        int cmp = key.compareTo(x.key);

        if (cmp == 0)
            return x;
        if (cmp < 0)
            return floor(x.left, key);

        Node temp = floor(x.right, key);

        if (temp != null)
            return temp;
        return x;
    }

    /**
     * Returns the smallest key greater than or equal to key in the BinarySearchTreeMap.
     *
     * @param key, the key to be searched
     * @return the smallest key greater than or equal to key in the BinarySearchTreeMap.
     * @throws IllegalArgumentException if the key is null
     * @throws NoSuchElementException if the BinarySearchTreeMap is empty
     */
    public K ceil(K key) {
        if (key == null)
            throw new IllegalArgumentException("ceil with null key");
        if (isEmpty())
            throw new NoSuchElementException("ceil with empty BinarySearchTreeMap");

        Node x = ceil(root, key);
        if (x == null)
            return null;
        return x.key;
    }

    /**
     * Helper for ceil.
     *
     * @param x
     * @param key
     * @return x
     */
    private Node ceil(Node x, K key) {
        if (x == null)
            return null;

        int cmp = key.compareTo(x.key);

        if (cmp == 0)
            return x;
        if (cmp < 0) {
            Node temp = ceil(x.left, key);
            if (temp != null)
                return temp;
            return x;
        }
        return ceil(x.right, key);
    }

    /**
     * Returns the k-th smallest key in the BinarySearchTreeMap.
     *
     * @param k, the kth number
     * @return the k-th smallest key in the BinarySearchTreeMap.
     * @throws IllegalArgumentException if k is invalid
     */
    public K select(int k) {
        if (k < 0 || k >= size())
            throw new IllegalArgumentException("select with invalid k");
        Node x = select(root, k);
        return x.key;
    }

    /**
     * Helper for select.
     *
     * @param x
     * @param k
     * @return x
     */
    private Node select(Node x, int k) {
        if (x == null)
            return null;

        int t = size(x.left);

        if (t > k)
            return select(x.left,  k);
        else if (t < k)
            return select(x.right, k-t-1);
        return x;
    }

    /**
     * Returns the number of keys in the BinarySearchTreeMap less than the given key.
     *
     * @param  key, the key to be searched
     * @return the number of keys in the BinarySearchTreeMap less than the given key.
     * @throws IllegalArgumentException if the key is null
     */
    public int rank(K key) {
        if (key == null)
            throw new IllegalArgumentException("rank with null key");
        return rank(root, key);
    }

    /**
     * Helper for rank.
     *
     * @param x
     * @param key
     * @return the number of keys in the BinarySearchTreeMap less than the given key from x
     */
    private int rank(Node x, K key) {
        if (x == null)
            return 0;

        int cmp = key.compareTo(x.key);

        if (cmp < 0)
            return rank(x.left, key);
        else if (cmp > 0)
            return 1 + size(x.left) + rank(x.right, key);
        return size(x.left);
    }

    /**
     * Returns all the keys in the BinarySearchTreeMap ordered from the smallest key to the largest
     * key, in an Iterable.
     *
     * @return all the keys in the BinarySearchTreeMap ordered from the smallest key to the largest
     *         key, in an Iterable.
     */
    public Iterable<K> keys() {
        return keys(min(), max());
    }

    /**
     * Returns all keys in the BinarySearchTreeMap in the range between lo and hi, in order, in an
     * Iterable.
     *
     * @param  lo, lower bound
     * @param  hi, upper bound
     * @return all keys in the BinarySearchTreeMap in the range between lo and hi, in order, in an
     *         Iterable.
     * @throws IllegalArgumentException if lo is null
     * @throws IllegalArgumentException if hi is null
     */
    public Iterable<K> keys(K lo, K hi) {
        if (lo == null)
            throw new IllegalArgumentException("keys with null lo");
        if (hi == null)
            throw new IllegalArgumentException("keys with null hi");

        Queue<K> queue = new QueueLinkedList<>();
        keys(root, queue, lo, hi);
        return queue;
    }

    /**
     * Helper for keys.
     *
     * @param x
     * @param queue
     * @param lo
     * @param hi
     */
    private void keys(Node x, Queue<K> queue, K lo, K hi) {
        if (x == null)
            return;

        int cmplo = lo.compareTo(x.key);
        int cmphi = hi.compareTo(x.key);

        if (cmplo < 0)
            keys(x.left, queue, lo, hi);
        if (cmplo <= 0 && cmphi >= 0)
            queue.enqueue(x.key);
        if (cmphi > 0)
            keys(x.right, queue, lo, hi);
    }
}
```

### Implementation (Set)

##### Java

```
package com.algorithmhelper.datastructures.trees;

import java.util.NoSuchElementException;

import com.algorithmhelper.datastructures.interfaces.Queue;
import com.algorithmhelper.datastructures.interfaces.Set;
import com.algorithmhelper.datastructures.lists.QueueLinkedList;

public class BinarySearchTreeSet<K extends Comparable<K>> implements Set<K> {

    private Node root;

    private class Node {
        private K key;
        private Node left, right;
        private int size;

        public Node(K key, int size) {
            this.key = key;
            this.size = size;
        }
    }

    /**
     * Initializes an empty BinarySearchTreeSet.
     */
    public BinarySearchTreeSet() {}

    /**
     * Returns true if the BinarySearchTreeSet is empty.
     *
     * @return true if the BinarySearchTreeSet is empty, false otherwise
     */
    public boolean isEmpty() {
        return size() == 0;
    }

    /**
     * Returns the number of elements in the BinarySearchTreeSet.
     *
     * @return the number of elements in the BinarySearchTreeSet
     */
    public int size() {
        if (root == null)
            return 0;
        return root.size;
    }

    /**
     * Returns the number of elements from x in the BinarySearchTreeSet.
     *
     * @return the number of elements from x in the BinarySearchTreeSet
     */
    private int size(Node x) {
        if (x == null)
            return 0;
        return x.size;
    }

    /**
     * Returns true if the key is contained in the BinarySearchTreeSet.
     *
     * @param key, the key to be searched for
     * @return true if the key is contained in the BinarySearchTreeSet, false otherwise
     * @throws IllegalArgumentException if the key is null
     */
    public boolean contains(K key) {
        if (key == null)
            throw new IllegalArgumentException("contains with null key");

        Node current = root;

        while (current != null) {
            int cmp = key.compareTo(current.key);

            if (cmp < 0)
                current = current.left;
            else if (cmp > 0)
                current = current.right;
            else
                return true;
        }
        return false;
    }

    /**
     * Inserts the key into the BinarySearchTreeSet. If the key is already contained, do nothing.
     *
     * @param key, the key to be searched for
     * @throws IllegalArgumentException if the key is null
     */
    public void put(K key) {
        if (key == null)
            throw new IllegalArgumentException("put with null key");

        Node current = root;

        while (current != null) {
            int cmp = key.compareTo(current.key);

            if (cmp == 0) {
                doNothing();
                return;
            }

            current.size++;

            if (cmp < 0 && current.left == null) {
                current.left = new Node(key, 1);
                return;
            } else if (cmp < 0) {
                current = current.left;
            } else if (cmp > 0 && current.right == null) {
                current.right = new Node(key, 1);
                return;
            } else if (cmp > 0) {
                current = current.right;
            }
        }
    }

    /**
     * Returns the smallest key in the BinarySearchTreeSet.
     *
     * @return the smallest key in the BinarySearchTreeSet
     */
    public K min() {
        if (isEmpty())
            throw new NoSuchElementException("min with empty BinarySearchTreeSet");
        Node current = root;
        while (current.left != null)
            current = current.left;
        return current.key;
    }

    /**
     * Returns the largest key in the BinarySearchTreeSet.
     *
     * @return the largest key in the BinarySearchTreeSet
     */
    public K max() {
        if (isEmpty())
            throw new NoSuchElementException("min with empty BinarySearchTreeSet");
        Node current = root;
        while (current.right != null)
            current = current.right;
        return current.key;
    }

    /**
     * Returns the Node with the smallest key in the BinarySearchTreeSet.
     *
     * @return the Node with the smallest key in the BinarySearchTreeSet
     */
    public Node minNode(Node x) {
        if (x.left == null)
            return x;
        return minNode(x.left);
    }

    /**
     * Returns the Node with the largest key in the BinarySearchTreeSet.
     *
     * @return the Node with the largest key in the BinarySearchTreeSet
     */
    public Node maxNode(Node x) {
        if (x.right == null)
            return x;
        return maxNode(x.right);
    }

    /**
     * Removes the key form the BinarySearchTreeSet.
     *
     * @param key, the key to be deleted
     * @throws NoSuchElementException if the BinarySearchTreeSet is empty
     */
    public void delete(K key) {
        if (key == null)
            throw new IllegalArgumentException("delete with null key");
        root = delete(root, key);
    }

    /**
     * Helper for delete.
     *
     * @param x
     * @param key
     * @return x
     */
    private Node delete(Node x, K key) {
        if (x == null)
            return null;

        int cmp = key.compareTo(x.key);
        if (cmp < 0)
            x.left = delete(x.left, key);
        else if (cmp > 0)
            x.right = delete(x.right, key);
        else {
            if (x.right == null)
                return x.left;
            if (x.left == null)
                return x.right;

            Node temp = x;
            x = minNode(temp.right);
            x.right = deleteMin(temp.right);
            x.left = temp.left;
        }
        x.size = 1 + size(x.left) + size(x.right);
        return x;
    }

    /**
     * Removes the smallest key from the BinarySearchTreeSet.
     *
     * @throws NoSuchElementException if the BinarySearchTreeSet is empty
     */
    public void deleteMin() {
        if (isEmpty())
            throw new NoSuchElementException("deleteMin on empty BinarySearchTreeSet");
        root = deleteMin(root);
    }

    /**
     * Helper for deleteMin.
     *
     * @param x
     * @return x
     */
    private Node deleteMin(Node x) {
        if (x.left == null)
            return x.right;
        x.left = deleteMin(x.left);
        x.size = 1 + size(x.left) + size(x.right);
        return x;
    }

    /**
     * Removes the largest key from the BinarySearchTreeSet.
     *
     * @throws NoSuchElementException if the BinarySearchTreeSet is empty
     */
    public void deleteMax() {
        if (isEmpty())
            throw new NoSuchElementException("deleteMax on empty BinarySearchTreeSet");
        root = deleteMax(root);
    }

    /**
     * Helper for deleteMax.
     *
     * @param x
     * @return x
     */
    private Node deleteMax(Node x) {
        if (x.right == null)
            return x.left;
        x.right = deleteMax(x.right);
        x.size = 1 + size(x.left) + size(x.right);
        return x;
    }

    /**
     * Returns the largest key less than or equal to key in the BinarySearchTreeSet.
     *
     * @param key, the key to be searched
     * @return the largest key less than or equal to key in the BinarySearchTreeSet.
     * @throws IllegalArgumentException if the key is null
     * @throws NoSuchElementException if the BinarySearchTreeSet is empty
     */
    public K floor(K key) {
        if (key == null)
            throw new IllegalArgumentException("floor with null key");
        if (isEmpty())
            throw new NoSuchElementException("floor with empty BinarySearchTreeSet");

        Node x = floor(root, key);
        if (x == null)
            return null;
        return x.key;
    }

    /**
     * Helper for floor.
     *
     * @param x
     * @param key
     * @return x
     */
    private Node floor(Node x, K key) {
        if (x == null)
            return null;

        int cmp = key.compareTo(x.key);

        if (cmp == 0)
            return x;
        if (cmp < 0)
            return floor(x.left, key);

        Node temp = floor(x.right, key);

        if (temp != null)
            return temp;
        return x;
    }

    /**
     * Returns the smallest key greater than or equal to key in the
     * BinarySearchTreeSet.
     *
     * @param key, the key to be searched
     * @return the smallest key greater than or equal to key in the BinarySearchTreeSet.
     * @throws IllegalArgumentException if the key is null
     * @throws NoSuchElementException if the BinarySearchTreeSet is empty
     */
    public K ceil(K key) {
        if (key == null)
            throw new IllegalArgumentException("ceil with null key");
        if (isEmpty())
            throw new NoSuchElementException("ceil with empty BinarySearchTreeSet");

        Node x = ceil(root, key);
        if (x == null)
            return null;
        return x.key;
    }

    /**
     * Helper for ceil.
     *
     * @param x
     * @param key
     * @return x
     */
    private Node ceil(Node x, K key) {
        if (x == null)
            return null;

        int cmp = key.compareTo(x.key);

        if (cmp == 0)
            return x;
        if (cmp < 0) {
            Node temp = ceil(x.left, key);
            if (temp != null)
                return temp;
            return x;
        }
        return ceil(x.right, key);
    }

    /**
     * Returns the k-th smallest key in the BinarySearchTreeSet.
     *
     * @param k, the kth number
     * @return the k-th smallest key in the BinarySearchTreeSet.
     * @throws IllegalArgumentException if k is invalid
     */
    public K select(int k) {
        if (k < 0 || k >= size())
            throw new IllegalArgumentException("select with invalid k");
        Node x = select(root, k);
        return x.key;
    }

    /**
     * Helper for select.
     *
     * @param x
     * @param k
     * @return x
     */
    private Node select(Node x, int k) {
        if (x == null)
            return null;

        int t = size(x.left);

        if (t > k)
            return select(x.left,  k);
        else if (t < k)
            return select(x.right, k-t-1);
        return x;
    }

    /**
     * Returns the number of keys in the BinarySearchTreeSet less than the
     * given key.
     *
     * @param  key, the key to be searched
     * @return the number of keys in the BinarySearchTreeSet less than the
     *         given key.
     * @throws IllegalArgumentException if the key is null
     */
    public int rank(K key) {
        if (key == null)
            throw new IllegalArgumentException("rank with null key");
        return rank(root, key);
    }

    /**
     * Helper for rank.
     *
     * @param x
     * @param key
     * @return the number of keys in the BinarySearchTreeSet less than the
     *         given key from x
     */
    private int rank(Node x, K key) {
        if (x == null)
            return 0;

        int cmp = key.compareTo(x.key);

        if (cmp < 0)
            return rank(x.left, key);
        else if (cmp > 0)
            return 1 + size(x.left) + rank(x.right, key);
        return size(x.left);
    }

    /**
     * Does literally nothing, makes difference from the non-set version more explicit.
     */
    public void doNothing() {}

    /**
     * Returns all the keys in the BinarySearchTreeSet ordered from the smallest key to the largest
     * key, in an Iterable.
     *
     * @return all the keys in the BinarySearchTreeSet ordered from the smallest key to the largest
     *         key, in an Iterable.
     */
    public Iterable<K> keys() {
        return keys(min(), max());
    }

    /**
     * Returns all keys in the BinarySearchTreeSet in the range between lo and hi, in order, in an
     * Iterable.
     *
     * @param  lo, lower bound
     * @param  hi, upper bound
     * @return all keys in the BinarySearchTreeSet in the range between lo and hi, in order, in an
     *         Iterable.
     * @throws IllegalArgumentException if lo is null
     * @throws IllegalArgumentException if hi is null
     */
    public Iterable<K> keys(K lo, K hi) {
        if (lo == null)
            throw new IllegalArgumentException("keys with null lo");
        if (hi == null)
            throw new IllegalArgumentException("keys with null hi");

        Queue<K> queue = new QueueLinkedList<>();
        keys(root, queue, lo, hi);
        return queue;
    }

    /**
     * Helper for keys.
     *
     * @param x
     * @param queue
     * @param lo
     * @param hi
     */
    private void keys(Node x, Queue<K> queue, K lo, K hi) {
        if (x == null)
            return;

        int cmplo = lo.compareTo(x.key);
        int cmphi = hi.compareTo(x.key);

        if (cmplo < 0)
            keys(x.left, queue, lo, hi);
        if (cmplo <= 0 && cmphi >= 0)
            queue.enqueue(x.key);
        if (cmphi > 0)
            keys(x.right, queue, lo, hi);
    }
}
```

### Time Complexity

The following table describes the time complexity for performing the operations above on a binary 
search tree:

```
| Data Structure     | contains | get  | put  | min  | max  | delete | deleteMin | deleteMax | floor | ceil | select | rank |
|--------------------|----------|------|------|------|------|--------|-----------|-----------|-------|------|--------|------|
| binary search tree | O(H)     | O(H) | O(H) | O(H) | O(H) | O(H)   | O(H)      | O(H)      | O(H)  | O(H) | O(H)   | O(H) |
```
