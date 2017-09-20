# Binary Search Tree

### Visualization

### Operations

### Implementation (Map)

##### Java

```
package com.example;

import com.example.utils.Queue;
import java.util.NoSuchElementException;

public class BinarySearchTree<K extends Comparable<K>, V> {

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
     * Initializes an empty BinarySearchTree.
     */
    public BinarySearchTree() {}

    /**
     * Returns true if the BinarySearchTree is empty.
     * @return true if the BinarySearchTree is empty, false otherwise
     */
    public boolean isEmpty() {
        return size() == 0;
    }

    /**
     * Returns the number of elements in the BinarySearchTree.
     * @return the number of elements in the BinarySearchTree
     */
    public int size() {
        if (root == null)
            return 0;
        return root.size;
    }

    /**
     * Returns the number of elements from x in the BinarySearchTree.
     * @return the number of elements from x in the BinarySearchTree
     */
    private int size(Node x) {
        if (x == null)
            return 0;
        return x.size;
    }

    /**
     * Returns true if the key is contained in the BinarySearchTree.
     * @param key, the key to be searched for
     * @return true if the key is contained in the BinarySearchTree,
     *         false otherwise
     * @throws IllegalArgumentException if the key is null
     */
    public boolean contains(K key) {
        if (key == null)
            throw new IllegalArgumentException("contains with null key");
        return get(key) != null;
    }

    /**
     * Return the val associated with the key, if the key is not
     * found in the BinarySearchTree, return null
     *
     * @param key, the key to be searched for
     * @return the val associated with the key, if the key is not
     *         found in the BinarySearchTree, return null
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
     * Insert the (key, val) pair into the BinarySearchTree. If a pair
     * with the key is already contained, update the val to the new val.
     * If the val provided is null, then delete the pair with the key.
     *
     * @param key, the key to be searched for
     * @param val, the val associated with the key
     * @throws IllegalArgumentException if the key is null
     */
    public void put(K key, V val) {
        if (key == null)
            throw new IllegalArgumentException("put with null key");

        if (val == null) {
            // delete(key);
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
     * Return the smallest key in the BinarySearchTree.
     * @return the smallest key in the BinarySearchTree
     */
    public K min() {
        if (isEmpty())
            throw new NoSuchElementException("min with empty BinarySearchTree");
        Node current = root;
        while (current.left != null)
            current = current.left;
        return current.key;
    }

    /**
     * Return the largest key in the BinarySearchTree.
     * @return the largest key in the BinarySearchTree
     */
    public K max() {
        if (isEmpty())
            throw new NoSuchElementException("min with empty BinarySearchTree");
        Node current = root;
        while (current.right != null)
            current = current.right;
        return current.key;
    }

    /**
     * Return the Node with the smallest key in the BinarySearchTree.
     * @return the Node with the smallest key in the BinarySearchTree
     */
    public Node minNode(Node x) {
        if (x.left == null)
            return x;
        return minNode(x.left);
    }

    /**
     * Return the Node with the largest key in the BinarySearchTree.
     * @return the Node with the largest key in the BinarySearchTree
     */
    public Node maxNode(Node x) {
        if (x.right == null)
            return x;
        return maxNode(x.right);
    }

    /**
     * Removes the (key, value) pair with the given key from the
     * BinarySearchTree.
     *
     * @param key, the key whose (key, value) to be deleted
     * @throws NoSuchElementException if the BinarySearchTree is empty
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
     * Removes the (key, value) pair with the smallest key from the
     * BinarySearchTree.
     *
     * @throws NoSuchElementException if the BinarySearchTree is empty
     */
    public void deleteMin() {
        if (isEmpty())
            throw new NoSuchElementException("deleteMin on empty " +
                    "BinarySearchTree");
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
     * BinarySearchTree.
     *
     * @throws NoSuchElementException if the BinarySearchTree is empty
     */
    public void deleteMax() {
        if (isEmpty())
            throw new NoSuchElementException("deleteMax on empty " +
                    "BinarySearchTree");
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
     * Returns the largest key less than or equal to key in the
     * BinarySearchTree.
     *
     * @param key, the key to be searched
     * @return the largest key less than or equal to key in the
     *         BinarySearchTree.
     * @throws IllegalArgumentException if the key is null
     * @throws NoSuchElementException if the BinarySearchTree is empty
     */
    public K floor(K key) {
        if (key == null)
            throw new IllegalArgumentException("floor with null key");
        if (isEmpty())
            throw new NoSuchElementException("floor with empty " +
                    "BinarySearchTree");

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
     * BinarySearchTree.
     *
     * @param key, the key to be searched
     * @return the smallest key greater than or equal to key in the
     *         BinarySearchTree.
     * @throws IllegalArgumentException if the key is null
     * @throws NoSuchElementException if the BinarySearchTree is empty
     */
    public K ceil(K key) {
        if (key == null)
            throw new IllegalArgumentException("ceil with null key");
        if (isEmpty())
            throw new NoSuchElementException("ceil with empty " +
                    "BinarySearchTree");

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
     * Return the k-th smallest key in the BinarySearchTree.
     *
     * @param k, the kth number
     * @return the k-th smallest key in the BinarySearchTree.
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
     * Return the number of keys in the BinarySearchTree less than the
     * given key.
     *
     * @param  key, the key to be searched
     * @return the number of keys in the BinarySearchTree less than the
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
     * @return the number of keys in the BinarySearchTree less than the
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
     * Returns all the keys in the BinarySearchTree ordered
     * from the smallest key to the largest key, in an Iterable.
     *
     * @return all the keys in the BinarySearchTree ordered
     * from the smallest key to the largest key, in an Iterable.
     */
    public Iterable<K> keys() {
        return keys(min(), max());
    }

    /**
     * Returns all keys in the BinarySearchTree in the range between
     * lo and hi, in order, in an Iterable.
     *
     * @param  lo, lower bound
     * @param  hi, upper bound
     * @return all keys in the BinarySearchTree in the range between
     *         lo and hi, in order, in an Iterable.
     * @throws IllegalArgumentException if lo is null
     * @throws IllegalArgumentException if hi is null
     */
    public Iterable<K> keys(K lo, K hi) {
        if (lo == null)
            throw new IllegalArgumentException("keys with null lo");
        if (hi == null)
            throw new IllegalArgumentException("keys with null hi");

        Queue<K> queue = new Queue();
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
package com.example;

import com.example.utils.Queue;
import java.util.NoSuchElementException;

public class BinarySearchTreeSet<K extends Comparable<K>> {

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
     * @return true if the BinarySearchTreeSet is empty, false otherwise
     */
    public boolean isEmpty() {
        return size() == 0;
    }

    /**
     * Returns the number of elements in the BinarySearchTreeSet.
     * @return the number of elements in the BinarySearchTreeSet
     */
    public int size() {
        if (root == null)
            return 0;
        return root.size;
    }

    /**
     * Returns the number of elements from x in the BinarySearchTreeSet.
     * @return the number of elements from x in the BinarySearchTreeSet
     */
    private int size(Node x) {
        if (x == null)
            return 0;
        return x.size;
    }

    /**
     * Returns true if the key is contained in the BinarySearchTreeSet.
     * @param key, the key to be searched for
     * @return true if the key is contained in the BinarySearchTreeSet,
     *         false otherwise
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
     * Insert the key into the BinarySearchTreeSet. If the key is already
     * contained, do nothing.
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
     * Return the smallest key in the BinarySearchTreeSet.
     * @return the smallest key in the BinarySearchTreeSet
     */
    public K min() {
        if (isEmpty())
            throw new NoSuchElementException("min with empty " +
                    "BinarySearchTreeSet");
        Node current = root;
        while (current.left != null)
            current = current.left;
        return current.key;
    }

    /**
     * Return the largest key in the BinarySearchTreeSet.
     * @return the largest key in the BinarySearchTreeSet
     */
    public K max() {
        if (isEmpty())
            throw new NoSuchElementException("min with empty " +
                    "BinarySearchTreeSet");
        Node current = root;
        while (current.right != null)
            current = current.right;
        return current.key;
    }

    /**
     * Return the Node with the smallest key in the BinarySearchTreeSet.
     * @return the Node with the smallest key in the BinarySearchTreeSet
     */
    public Node minNode(Node x) {
        if (x.left == null)
            return x;
        return minNode(x.left);
    }

    /**
     * Return the Node with the largest key in the BinarySearchTreeSet.
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
            throw new NoSuchElementException("deleteMin on empty " +
                    "BinarySearchTreeSet");
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
            throw new NoSuchElementException("deleteMax on empty " +
                    "BinarySearchTreeSet");
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
     * Returns the largest key less than or equal to key in the
     * BinarySearchTreeSet.
     *
     * @param key, the key to be searched
     * @return the largest key less than or equal to key in the
     *         BinarySearchTreeSet.
     * @throws IllegalArgumentException if the key is null
     * @throws NoSuchElementException if the BinarySearchTreeSet is empty
     */
    public K floor(K key) {
        if (key == null)
            throw new IllegalArgumentException("floor with null key");
        if (isEmpty())
            throw new NoSuchElementException("floor with empty " +
                    "BinarySearchTreeSet");

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
     * @return the smallest key greater than or equal to key in the
     *         BinarySearchTreeSet.
     * @throws IllegalArgumentException if the key is null
     * @throws NoSuchElementException if the BinarySearchTreeSet is empty
     */
    public K ceil(K key) {
        if (key == null)
            throw new IllegalArgumentException("ceil with null key");
        if (isEmpty())
            throw new NoSuchElementException("ceil with empty " +
                    "BinarySearchTreeSet");

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
     * Return the k-th smallest key in the BinarySearchTreeSet.
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
     * Return the number of keys in the BinarySearchTreeSet less than the
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
     * Does literally nothing, makes difference from the non-set version
     * more explicit.
     */
    public void doNothing() {}

    /**
     * Returns all the keys in the BinarySearchTreeSet ordered
     * from the smallest key to the largest key, in an Iterable.
     *
     * @return all the keys in the BinarySearchTreeSet ordered
     * from the smallest key to the largest key, in an Iterable.
     */
    public Iterable<K> keys() {
        return keys(min(), max());
    }

    /**
     * Returns all keys in the BinarySearchTreeSet in the range between
     * lo and hi, in order, in an Iterable.
     *
     * @param  lo, lower bound
     * @param  hi, upper bound
     * @return all keys in the BinarySearchTreeSet in the range between
     *         lo and hi, in order, in an Iterable.
     * @throws IllegalArgumentException if lo is null
     * @throws IllegalArgumentException if hi is null
     */
    public Iterable<K> keys(K lo, K hi) {
        if (lo == null)
            throw new IllegalArgumentException("keys with null lo");
        if (hi == null)
            throw new IllegalArgumentException("keys with null hi");

        Queue<K> queue = new Queue();
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

```
```
