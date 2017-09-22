# AVL Tree

### Visualization

### Balancing Mechanism

### Operations

### Implementation (Map)

##### Java

```
package com.example;

import com.example.utils.Queue;

import java.util.NoSuchElementException;

public class AVLTree<K extends Comparable<K>, V> {

    private Node root;

    private class Node {
        private K key;
        private V val;
        private int height, size;
        private Node left, right;

        public Node(K key, V val, int height, int size) {
            this.key = key;
            this.val = val;
            this.height = height;
            this.size = size;
        }
    }

    /**
     * Initializes an empty AVLTree.
     */
    public AVLTree() {}

    /**
     * Returns true if the AVLTree is empty, false otherwise.
     *
     * @return true if the AVLTree is empty, false otherwise
     */
    public boolean isEmpty() {
        return root == null;
    }

    /**
     * Returns the number of elements in the AVLTree.
     *
     * @return the number of elements in the AVLTree
     */
    public int size() {
        return size(root);
    }

    /**
     * Helper function that returns the number of elements from x in the
     * AVLTree.
     *
     * @param x, the Node whose size in question
     * @return the number of elements from x in the AVLTree
     */
    private int size(Node x) {
        if (x == null)
            return 0;
        return x.size;
    }

    /**
     * Return the height of the AVLTree.
     *
     * @return the height of the AVLTree
     */
    public int height() {
        return height(root);
    }

    /**
     * Helper function for height.
     *
     * @param x
     * @return the height of the subtree from h
     */
    private int height(Node x) {
        if (x == null)
            return -1;
        return x.height;
    }

    /**
     * Helper function to rotate a Node link to the left, return the
     * new root Node at that original position.
     *
     * @param h
     * @return the new root Node at that original position
     */
    private Node rotateLeft(Node h) {
        Node x = h.right;
        h.right = x.left;
        x.left = h;
        x.size = h.size;
        h.size = 1 + size(h.left) + size(h.right);
        h.height = 1 + Math.max(height(h.left), height(h.right));
        x.height = 1 + Math.max(height(x.left), height(x.right));
        return x;
    }

    /**
     * Helper function to rotate a Node link to the right, return the
     * new root Node at that original position.
     *
     * @param h
     * @return the new root Node at that original position
     */
    private Node rotateRight(Node h) {
        Node x = h.left;
        h.left = x.right;
        x.right = h;
        x.size = h.size;
        h.size = 1 + size(h.left) + size(h.right);
        h.height = 1 + Math.max(height(h.left), height(h.right));
        x.height = 1 + Math.max(height(x.left), height(x.right));
        return x;
    }

    /**
     * Returns the val associated with the key in the AVLTree.
     *
     * @param key, the key to be searched for
     * @return the val associated with the key in the AVLTree
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
     * Returns true if the key is contained in the AVLTree, false
     * otherwise.
     *
     * @param key, the key to be searched for
     * @return true if the key is contained in the AVLTree, false
     *         otherwise
     */
    public boolean contains(K key) {
        if (key == null)
            throw new IllegalArgumentException("contains with null key");
        return get(key) != null;
    }

    /**
     * Insert the (key, val) pair into the AVLTree, but if the val
     * is null, then delete the element with the associated key.
     *
     * @param key, the key to be inserted
     * @param val, the val associated with the key
     * @throws IllegalArgumentException if key is null
     */
    public void put(K key, V val) {
        if (key == null)
            throw new IllegalArgumentException("put with null key");
        if (val == null) {
            delete(key);
            return;
        }
        root = put(root, key, val);
    }

    /**
     * Helper function for put.
     *
     * @param h, the Node relative to which we perform put
     * @param key, the key to be inserted
     * @param val, the val associated with the key
     * @return h, after applying (possible) transformations to keep the
     *         AVL property.
     */
    private Node put(Node h, K key, V val) {
        if (h == null)
            return new Node(key, val, 0, 1);

        int cmp = key.compareTo(h.key);

        if (cmp < 0)
            h.left = put(h.left, key, val);
        else if (cmp > 0)
            h.right = put(h.right, key, val);
        else {
            h.val = val;
            return h;
        }
        h.size = 1 + size(h.left) + size(h.right);
        h.height = 1 + Math.max(height(h.left), height(h.right));
        return restoreInvariant(h);
    }

    /**
     * Helper function to restore the AVL property, return h
     * after the transformation.
     *
     * @param h
     * @return h after the transformation
     */
    private Node restoreInvariant(Node h) {
        if (balanceFactor(h) < -1) {
            if (balanceFactor(h.right) > 0)
                h.right = rotateRight(h.right);
            h = rotateLeft(h);
        } else if (balanceFactor(h) > 1) {
            if (balanceFactor(h.left) < 0)
                h.left = rotateLeft(h.left);
            h = rotateRight(h);
        }
        return h;
    }

    /**
     * Returns the balance factor of the subtree from h, which is
     * given by the difference between the height of the left subtree
     * and the right subtree from h.
     *
     * @param h
     * @return the balance factor of the subtree from h, which is
     *         given by the difference between the height of the left subtree
     *         and the right subtree from h
     */
    private int balanceFactor(Node h) {
        return height(h.left) - height(h.right);
    }

    /**
     * Remove the key from the AVLTree.
     *
     * @param key, the key to be removed
     */
    public void delete(K key) {
        if (key == null)
            throw new IllegalArgumentException("delete with null key");
        if (!contains(key))
            return;
        root = delete(root, key);
    }

    /**
     * Helper function for delete.
     *
     * @param x, to Node relative to which we perform delete
     * @param key, the key to be removed
     * @return h, after applying (possible) transformations to keep the
     *         AVL property.
     */
    private Node delete(Node x, K key) {
        int cmp = key.compareTo(x.key);

        if (cmp < 0)
            x.left = delete(x.left, key);
        else if (cmp > 0)
            x.right = delete(x.right, key);
        else {
            if (x.left == null)
                return x.right;
            else if (x.right == null)
                return x.left;
            else {
                Node y = x;
                x = min(y.right);
                x.right = deleteMin(y.right);
                x.left = y.left;
            }
        }
        x.size = 1 + size(x.left) + size(x.right);
        x.height = 1 + Math.max(height(x.left), height(x.right));
        return restoreInvariant(x);
    }

    /**
     * Delete the element with the smallest key in the AVLTree.
     *
     * @throws NoSuchElementException if the AVLTree is empty
     */
    public void deleteMin() {
        if (isEmpty())
            throw new NoSuchElementException("deleteMin with empty " +
                    "AVLTree");
        root = deleteMin(root);
    }

    /**
     * Helper function for deleteMin.
     *
     * @param x
     * @return x, after applying (possible) transformations to keep the
     *         AVL property.
     */
    private Node deleteMin(Node x) {
        if (x.left == null)
            return x.right;
        x.left = deleteMin(x.left);
        
        x.size = 1 + size(x.left) + size(x.right);
        x.height = 1 + Math.max(height(x.left), height(x.right));
        return restoreInvariant(x);
    }

    /**
     * Removes the element with the largest key in the AVLTree.
     *
     * @throws NoSuchElementException if the AVLTree is empty
     */
    public void deleteMax() {
        if (isEmpty())
            throw new NoSuchElementException("deleteMax with empty " +
                    "AVLTree");
        root = deleteMax(root);
    }

    /**
     * Helper function for deleteMax.
     *
     * @param x
     * @return x, after applying (possible) transformations to keep the
     *         AVL property.
     */
    private Node deleteMax(Node x) {
        if (x.right == null)
            return x.left;
        x.right = deleteMax(x.right);

        x.size = 1 + size(x.left) + size(x.right);
        x.height = 1 + Math.max(height(x.left), height(x.right));
        return restoreInvariant(x);
    }

    /**
     * Return the smallest key in the AVLTree.
     *
     * @return the smallest key in the AVLTree.
     */
    public K min() {
        if (isEmpty())
            throw new NoSuchElementException("min with empty AVLTree");
        return min(root).key;
    }

    /**
     * Helper for min.
     *
     * @param x
     * @return the smallest key in the subtree from x
     */
    private Node min(Node x) {
        if (x.left == null)
            return x;
        return min(x.left);
    }

    /**
     * Return the largest key in the AVLTree.
     *
     * @return the largest key in the AVLTree.
     */
    public K max() {
        if (isEmpty())
            throw new NoSuchElementException("max with empty AVLTree");
        return max(root).key;
    }

    /**
     * Helper for max.
     *
     * @param x
     * @return the largest key in the subtree from x
     */
    private Node max(Node x) {
        if (x.right == null)
            return x;
        return max(x.right);
    }

    /**
     * Returns the largest key less than or equal to key in the
     * AVLTree.
     *
     * @param key, the key to be searched
     * @return the largest key less than or equal to key in the
     *         AVLTree.
     * @throws IllegalArgumentException if the key is null
     * @throws NoSuchElementException if the AVLTree is empty
     */
    public K floor(K key) {
        if (key == null)
            throw new IllegalArgumentException("floor with null key");
        if (isEmpty())
            throw new NoSuchElementException("floor with null AVLTree");
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
        Node t = floor(x.right, key);
        if (t != null)
            return t;
        return x;
    }

    /**
     * Returns the smallest key greater than or equal to key in the
     * AVLTree.
     *
     * @param key, the key to be searched
     * @return the smallest key greater than or equal to key in the
     *         AVLTree.
     * @throws IllegalArgumentException if the key is null
     * @throws NoSuchElementException if the AVLTree is empty
     */
    public K ceil(K key) {
        if (key == null)
            throw new IllegalArgumentException("ceil with null key");
        if (isEmpty())
            throw new NoSuchElementException("ceil with empty " +
                    "AVLTree");
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
        if (cmp > 0)
            return ceil(x.right, key);
        Node t = ceil(x.left, key);
        if (t != null)
            return t;
        return x;
    }

    /**
     * Return the k-th smallest key in the AVLTree.
     *
     * @param k, the kth number
     * @return the k-th smallest key in the AVLTree.
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
        int t = size(x.left);
        if (t > k)
            return select(x.left,  k);
        else if (t < k)
            return select(x.right, k-t-1);
        else
            return x;
    }

    /**
     * Return the number of keys in the AVLTree less than the
     * given key.
     *
     * @param  key, the key to be searched
     * @return the number of keys in the AVLTree less than the
     *         given key.
     * @throws IllegalArgumentException if the key is null
     */
    public int rank(K key) {
        if (key == null)
            throw new IllegalArgumentException("rank with null key");
        return rank(key, root);
    }

    /**
     * Helper for rank.
     *
     * @param x
     * @param key
     * @return the number of keys in the AVLTree less than the
     *         given key from x
     */
    private int rank(K key, Node x) {
        if (x == null)
            return 0;
        int cmp = key.compareTo(x.key);
        if (cmp < 0)
            return rank(key, x.left);
        else if (cmp > 0)
            return 1 + size(x.left) + rank(key, x.right);
        return size(x.left);
    }

    /**
     * Returns all the keys in the AVLTree ordered
     * from the smallest key to the largest key, in an Iterable.
     *
     * @return all the keys in the AVLTree ordered
     * from the smallest key to the largest key, in an Iterable.
     */
    public Iterable<K> keys() {
        return keys(min(), max());
    }

    /**
     * Returns all keys in the AVLTree in the range between
     * lo and hi, in order, in an Iterable.
     *
     * @param  lo, lower bound
     * @param  hi, upper bound
     * @return all keys in the AVLTree in the range between
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

public class AVLTreeSet<K extends Comparable<K>> {

    private Node root;

    private class Node {
        private K key;
        private int height, size;
        private Node left, right;

        public Node(K key, int height, int size) {
            this.key = key;
            this.height = height;
            this.size = size;
        }
    }

    /**
     * Initializes an empty AVLTreeSet.
     */
    public AVLTreeSet() {}

    /**
     * Returns true if the AVLTreeSet is empty, false otherwise.
     *
     * @return true if the AVLTreeSet is empty, false otherwise
     */
    public boolean isEmpty() {
        return root == null;
    }

    /**
     * Returns the number of elements in the AVLTreeSet.
     *
     * @return the number of elements in the AVLTreeSet
     */
    public int size() {
        return size(root);
    }

    /**
     * Helper function that returns the number of elements from x in the
     * AVLTreeSet.
     *
     * @param x, the Node whose size in question
     * @return the number of elements from x in the AVLTreeSet
     */
    private int size(Node x) {
        if (x == null)
            return 0;
        return x.size;
    }

    /**
     * Return the height of the AVLTreeSet.
     *
     * @return the height of the AVLTreeSet
     */
    public int height() {
        return height(root);
    }

    /**
     * Helper function for height.
     *
     * @param x
     * @return the height of the subtree from h
     */
    private int height(Node x) {
        if (x == null)
            return -1;
        return x.height;
    }

    /**
     * Helper function to rotate a Node link to the left, return the
     * new root Node at that original position.
     *
     * @param h
     * @return the new root Node at that original position
     */
    private Node rotateLeft(Node h) {
        Node x = h.right;
        h.right = x.left;
        x.left = h;
        x.size = h.size;
        h.size = 1 + size(h.left) + size(h.right);
        h.height = 1 + Math.max(height(h.left), height(h.right));
        x.height = 1 + Math.max(height(x.left), height(x.right));
        return x;
    }

    /**
     * Helper function to rotate a Node link to the right, return the
     * new root Node at that original position.
     *
     * @param h
     * @return the new root Node at that original position
     */
    private Node rotateRight(Node h) {
        Node x = h.left;
        h.left = x.right;
        x.right = h;
        x.size = h.size;
        h.size = 1 + size(h.left) + size(h.right);
        h.height = 1 + Math.max(height(h.left), height(h.right));
        x.height = 1 + Math.max(height(x.left), height(x.right));
        return x;
    }

    /**
     * Returns true if the key is contained in the AVLTreeSet, false
     * otherwise.
     *
     * @param key, the key to be searched for
     * @return true if the key is contained in the AVLTreeSet, false
     *         otherwise
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
     * Insert the key into the AVLTreeSet, but if the key is already contained
     * in the AVLTreeSet, do nothing.
     *
     * @param key, the key to be inserted
     * @throws IllegalArgumentException if key is null
     */
    public void put(K key) {
        if (key == null)
            throw new IllegalArgumentException("put with null key");
        root = put(root, key);
    }

    /**
     * Helper function for put.
     *
     * @param h, the Node relative to which we perform put
     * @param key, the key to be inserted
     * @return h, after applying (possible) transformations to keep the
     *         AVL property.
     */
    private Node put(Node h, K key) {
        if (h == null)
            return new Node(key, 0, 1);

        int cmp = key.compareTo(h.key);

        if (cmp < 0)
            h.left = put(h.left, key);
        else if (cmp > 0)
            h.right = put(h.right, key);
        else {
            doNothing();
            return h;
        }
        h.size = 1 + size(h.left) + size(h.right);
        h.height = 1 + Math.max(height(h.left), height(h.right));
        return restoreInvariant(h);
    }

    /**
     * Helper function to restore the AVL property, return h
     * after the transformation.
     *
     * @param h
     * @return h after the transformation
     */
    private Node restoreInvariant(Node h) {
        if (balanceFactor(h) < -1) {
            if (balanceFactor(h.right) > 0)
                h.right = rotateRight(h.right);
            h = rotateLeft(h);
        } else if (balanceFactor(h) > 1) {
            if (balanceFactor(h.left) < 0)
                h.left = rotateLeft(h.left);
            h = rotateRight(h);
        }
        return h;
    }

    /**
     * Returns the balance factor of the subtree from h, which is
     * given by the difference between the height of the left subtree
     * and the right subtree from h.
     *
     * @param h
     * @return the balance factor of the subtree from h, which is
     *         given by the difference between the height of the left subtree
     *         and the right subtree from h
     */
    private int balanceFactor(Node h) {
        return height(h.left) - height(h.right);
    }

    /**
     * Remove the key from the AVLTreeSet.
     *
     * @param key, the key to be removed
     */
    public void delete(K key) {
        if (key == null)
            throw new IllegalArgumentException("delete with null key");
        if (!contains(key))
            return;
        root = delete(root, key);
    }

    /**
     * Helper function for delete.
     *
     * @param x, to Node relative to which we perform delete
     * @param key, the key to be removed
     * @return h, after applying (possible) transformations to keep the
     *         AVL property.
     */
    private Node delete(Node x, K key) {
        int cmp = key.compareTo(x.key);

        if (cmp < 0)
            x.left = delete(x.left, key);
        else if (cmp > 0)
            x.right = delete(x.right, key);
        else {
            if (x.left == null)
                return x.right;
            else if (x.right == null)
                return x.left;
            else {
                Node y = x;
                x = min(y.right);
                x.right = deleteMin(y.right);
                x.left = y.left;
            }
        }
        x.size = 1 + size(x.left) + size(x.right);
        x.height = 1 + Math.max(height(x.left), height(x.right));
        return restoreInvariant(x);
    }

    /**
     * Delete the element with the smallest key in the AVLTreeSet.
     *
     * @throws NoSuchElementException if the AVLTreeSet is empty
     */
    public void deleteMin() {
        if (isEmpty())
            throw new NoSuchElementException("deleteMin with empty " +
                    "AVLTreeSet");
        root = deleteMin(root);
    }

    /**
     * Helper function for deleteMin.
     *
     * @param x
     * @return x, after applying (possible) transformations to keep the
     *         AVL property.
     */
    private Node deleteMin(Node x) {
        if (x.left == null)
            return x.right;
        x.left = deleteMin(x.left);

        x.size = 1 + size(x.left) + size(x.right);
        x.height = 1 + Math.max(height(x.left), height(x.right));
        return restoreInvariant(x);
    }

    /**
     * Removes the element with the largest key in the AVLTreeSet.
     *
     * @throws NoSuchElementException if the AVLTreeSet is empty
     */
    public void deleteMax() {
        if (isEmpty())
            throw new NoSuchElementException("deleteMax with empty " +
                    "AVLTreeSet");
        root = deleteMax(root);
    }

    /**
     * Helper function for deleteMax.
     *
     * @param x
     * @return x, after applying (possible) transformations to keep the
     *         AVL property.
     */
    private Node deleteMax(Node x) {
        if (x.right == null)
            return x.left;
        x.right = deleteMax(x.right);

        x.size = 1 + size(x.left) + size(x.right);
        x.height = 1 + Math.max(height(x.left), height(x.right));
        return restoreInvariant(x);
    }

    /**
     * Return the smallest key in the AVLTreeSet.
     *
     * @return the smallest key in the AVLTreeSet.
     */
    public K min() {
        if (isEmpty())
            throw new NoSuchElementException("min with empty AVLTreeSet");
        return min(root).key;
    }

    /**
     * Helper for min.
     *
     * @param x
     * @return the smallest key in the subtree from x
     */
    private Node min(Node x) {
        if (x.left == null)
            return x;
        return min(x.left);
    }

    /**
     * Return the largest key in the AVLTreeSet.
     *
     * @return the largest key in the AVLTreeSet.
     */
    public K max() {
        if (isEmpty())
            throw new NoSuchElementException("max with empty AVLTreeSet");
        return max(root).key;
    }

    /**
     * Helper for max.
     *
     * @param x
     * @return the largest key in the subtree from x
     */
    private Node max(Node x) {
        if (x.right == null)
            return x;
        return max(x.right);
    }

    /**
     * Returns the largest key less than or equal to key in the
     * AVLTreeSet.
     *
     * @param key, the key to be searched
     * @return the largest key less than or equal to key in the
     *         AVLTreeSet.
     * @throws IllegalArgumentException if the key is null
     * @throws NoSuchElementException if the AVLTreeSet is empty
     */
    public K floor(K key) {
        if (key == null)
            throw new IllegalArgumentException("floor with null key");
        if (isEmpty())
            throw new NoSuchElementException("floor with null AVLTreeSet");
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
        Node t = floor(x.right, key);
        if (t != null)
            return t;
        return x;
    }

    /**
     * Returns the smallest key greater than or equal to key in the
     * AVLTreeSet.
     *
     * @param key, the key to be searched
     * @return the smallest key greater than or equal to key in the
     *         AVLTreeSet.
     * @throws IllegalArgumentException if the key is null
     * @throws NoSuchElementException if the AVLTreeSet is empty
     */
    public K ceil(K key) {
        if (key == null)
            throw new IllegalArgumentException("ceil with null key");
        if (isEmpty())
            throw new NoSuchElementException("ceil with empty " +
                    "AVLTreeSet");
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
        if (cmp > 0)
            return ceil(x.right, key);
        Node t = ceil(x.left, key);
        if (t != null)
            return t;
        return x;
    }

    /**
     * Return the k-th smallest key in the AVLTreeSet.
     *
     * @param k, the kth number
     * @return the k-th smallest key in the AVLTreeSet.
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
        int t = size(x.left);
        if (t > k)
            return select(x.left,  k);
        else if (t < k)
            return select(x.right, k-t-1);
        else
            return x;
    }

    /**
     * Return the number of keys in the AVLTreeSet less than the
     * given key.
     *
     * @param  key, the key to be searched
     * @return the number of keys in the AVLTreeSet less than the
     *         given key.
     * @throws IllegalArgumentException if the key is null
     */
    public int rank(K key) {
        if (key == null)
            throw new IllegalArgumentException("rank with null key");
        return rank(key, root);
    }

    /**
     * Helper for rank.
     *
     * @param x
     * @param key
     * @return the number of keys in the AVLTreeSet less than the
     *         given key from x
     */
    private int rank(K key, Node x) {
        if (x == null)
            return 0;
        int cmp = key.compareTo(x.key);
        if (cmp < 0)
            return rank(key, x.left);
        else if (cmp > 0)
            return 1 + size(x.left) + rank(key, x.right);
        return size(x.left);
    }

    /**
     * Does literally nothing, makes difference from the non-set version
     * more explicit.
     */
    public void doNothing() {}

    /**
     * Returns all the keys in the AVLTreeSet ordered
     * from the smallest key to the largest key, in an Iterable.
     *
     * @return all the keys in the AVLTreeSet ordered
     * from the smallest key to the largest key, in an Iterable.
     */
    public Iterable<K> keys() {
        return keys(min(), max());
    }

    /**
     * Returns all keys in the AVLTreeSet in the range between
     * lo and hi, in order, in an Iterable.
     *
     * @param  lo, lower bound
     * @param  hi, upper bound
     * @return all keys in the AVLTreeSet in the range between
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

The following table describes the time complexity for performing the 
operations above on an AVL tree:

```
| Data Structure | contains | get    | put    | min    | max    | delete | deleteMin | deleteMax | floor  | ceil   | select | rank   |
|----------------|----------|--------|--------|--------|--------|--------|-----------|-----------|--------|--------|--------|--------|
| red-black tree | O(lgN)   | O(lgN) | O(lgN) | O(lgN) | O(lgN) | O(lgN) | O(lgN)    | O(lgN)    | O(lgN) | O(lgN) | O(lgN) | O(lgN) |
```