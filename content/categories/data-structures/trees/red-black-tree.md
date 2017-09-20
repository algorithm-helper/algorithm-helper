# Red-Black Tree

### Visualization

### Operations

### Implementation (Map)

##### Java

```
package com.example;

import com.example.utils.Queue;
import java.util.NoSuchElementException;

public class RedBlackTree<K extends Comparable<K>, V> {

    private static final boolean RED = true;
    private static final boolean BLACK = false;

    private Node root;

    private class Node {
        private K key;
        private V val;
        private Node left, right;
        private boolean color;
        private int size;

        public Node(K key, V val, boolean color, int size) {
            this.key = key;
            this.val = val;
            this.color = color;
            this.size = size;
        }
    }

    /**
     * Initializes an empty RedBlackTree.
     */
    public RedBlackTree() {
        root = null;
    }

    /**
     * Returns true if the RedBlackTree is empty, false otherwise.
     *
     * @return true if the RedBlackTree is empty, false otherwise
     */
    public boolean isEmpty() {
        return root == null;
    }

    /**
     * Returns the number of elements in the RedBlackTree.
     *
     * @return the number of elements in the RedBlackTree
     */
    public int size() {
        return size(root);
    }

    /**
     * Helper function that returns the number of elements from x in the
     * RedBlackTree.
     *
     * @param x, the Node whose size in question
     * @return the number of elements from x in the RedBlackTree
     */
    private int size(Node x) {
        if (x == null)
            return 0;
        return x.size;
    }

    /**
     * Helper function that returns true if the x is red,
     * false otherwise or if x is null.
     *
     * @param x, the Node in question
     * @return true if the x is red false otherwise or if x is null
     */
    private boolean isRed(Node x) {
        if (x == null)
            return false;
        return x.color == RED;
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
        x.color = x.right.color;
        x.right.color = RED;
        x.size = h.size;
        h.size = 1 + size(h.left) + size(h.right);
        return x;
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
        x.color = x.left.color;
        x.left.color = RED;
        x.size = h.size;
        h.size = 1 + size(h.left) + size(h.right);
        return x;
    }

    /**
     * Helper function to flip a Node h's colors from red to black,
     * and black to red.
     *
     * @param h
     */
    private void flipColors(Node h) {
        h.color = !h.color;
        h.left.color = !h.left.color;
        h.right.color = !h.right.color;
    }

    /**
     * Helper function to move red to the right of Node h, return h
     * after the transformation.
     *
     * @param h
     * @return return h after the transformation
     */
    private Node moveRedRight(Node h) {
        flipColors(h);
        if (isRed(h.left.left)) {
            h = rotateRight(h);
            flipColors(h);
        }
        return h;
    }

    /**
     * Helper function to move red to the left of Node h, return h
     * after the transformation.
     *
     * @param h
     * @return h after the transformation
     */
    private Node moveRedLeft(Node h) {
        flipColors(h);
        if (isRed(h.right.left)) {
            h.right = rotateRight(h.right);
            h = rotateLeft(h);
            flipColors(h);
        }
        return h;
    }

    /**
     * Helper function to restore the red-black invariant, return h
     * after the transformation.
     *
     * @param h
     * @return h after the transformation
     */
    private Node restoreInvariant(Node h) {
        if (isRed(h.right))
            h = rotateLeft(h);
        if (isRed(h.left) && isRed(h.left.left))
            h = rotateRight(h);
        if (isRed(h.left) && isRed(h.right))
            flipColors(h);
        h.size = 1 + size(h.left) + size(h.right);
        return h;
    }

    /**
     * Return the height of the RedBlackTree.
     *
     * @return the height of the RedBlackTree
     */
    public int height() {
        return height(root);
    }

    /**
     * Helper for height.
     *
     * @param h, the Node relative to which we compute the height
     * @return the height of the subtree from h
     */
    private int height(Node h) {
        if (h == null)
            return -1;
        return 1 + Math.max(height(h.left), height(h.right));
    }

    /**
     * Returns the val associated with the key in the RedBlackTree.
     *
     * @param key, the key to be searched for
     * @return the val associated with the key in the RedBlackTree
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
     * Returns true if the key is contained in the RedBlackTree, false
     * otherwise.
     *
     * @param key, the key to be searched for
     * @return true if the key is contained in the RedBlackTree, false
     *         otherwise
     */
    public boolean contains(K key) {
        if (key == null)
            throw new IllegalArgumentException("contains with null key");
        return get(key) != null;
    }

    /**
     * Insert the (key, val) pair into the RedBlackTree, but if the val
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
        root.color = BLACK;
    }

    /**
     * Helper function for put.
     *
     * @param h, the Node relative to which we perform put
     * @param key, the key to be inserted
     * @param val, the val associated with the key
     * @return h, after applying (possible) transformations to keep the
     *         red-black invariance.
     */
    private Node put(Node h, K key, V val) {
        if (h == null)
            return new Node(key, val, RED, 1);

        int cmp = key.compareTo(h.key);

        if (cmp < 0)
            h.left = put(h.left, key, val);
        else if (cmp > 0)
            h.right = put(h.right, key, val);
        else
            h.val = val;

        if (isRed(h.right) && !isRed(h.left))
            h = rotateLeft(h);
        if (isRed(h.left) && isRed(h.left.left))
            h = rotateRight(h);
        if (isRed(h.left) && isRed(h.right))
            flipColors(h);

        h.size = 1 + size(h.left) + size(h.right);

        return h;
    }

    /**
     * Remove the key from the RedBlackTree.
     *
     * @param key, the key to be removed
     */
    public void delete(K key) {
        if (key == null)
            throw new IllegalArgumentException("delete with null key");
        if (!contains(key))
            return;
        if (!isRed(root.left) && !isRed(root.right))
            root.color = RED;

        root = delete(root, key);
        if (!isEmpty())
            root.color = BLACK;
    }

    /**
     * Helper function for delete.
     *
     * @param h, to Node relative to which we perform delete
     * @param key, the key to be removed
     * @return h, after applying (possible) transformations to keep the
     *         red-black invariance.
     */
    private Node delete(Node h, K key) {
        if (key.compareTo(h.key) < 0)  {
            if (!isRed(h.left) && !isRed(h.left.left))
                h = moveRedLeft(h);
            h.left = delete(h.left, key);
        }
        else {
            if (isRed(h.left))
                h = rotateRight(h);
            if (key.compareTo(h.key) == 0 && (h.right == null))
                return null;
            if (!isRed(h.right) && !isRed(h.right.left))
                h = moveRedRight(h);
            if (key.compareTo(h.key) == 0) {
                Node x = min(h.right);
                h.key = x.key;
                h.val = x.val;
                h.right = deleteMin(h.right);
            }
            else h.right = delete(h.right, key);
        }
        return restoreInvariant(h);
    }

    /**
     * Delete the element with the smallest key in the RedBlackTree.
     *
     * @throws NoSuchElementException if the RedBlackTree is empty
     */
    public void deleteMin() {
        if (isEmpty())
            throw new NoSuchElementException("deleteMin with empty " +
                    "RedBlackTree");
        if (!isRed(root.left) && !isRed(root.right))
            root.color = RED;

        root = deleteMin(root);

        if (isEmpty())
            root.color = BLACK;
    }

    /**
     * Helper function for deleteMin.
     *
     * @param h
     * @return h, after applying (possible) transformations to keep the
     *         red-black invariance.
     */
    private Node deleteMin(Node h) {
        if (h.left == null)
            return null;

        if (!isRed(h.left) && !isRed(h.left.left))
            h = moveRedLeft(h);

        h.left = deleteMin(h.left);
        return restoreInvariant(h);
    }

    /**
     * Removes the element with the largest key in the RedBlackTree.
     *
     * @throws NoSuchElementException if the RedBlackTree is empty
     */
    public void deleteMax() {
        if (isEmpty())
            throw new NoSuchElementException("deleteMax with empty " +
                    "RedBlackTree");

        if (!isRed(root.left) && !isRed(root.right))
            root.color = RED;

        root = deleteMin(root);

        if (isEmpty())
            root.color = BLACK;
    }

    /**
     * Helper function for deleteMax.
     *
     * @param h
     * @return h, after applying (possible) transformations to keep the
     *         red-black invariance.
     */
    private Node deleteMax(Node h) {
        if (isRed(h.left))
            h = rotateRight(h);

        if (h.right == null)
            return null;

        if (!isRed(h.right) && !isRed(h.right.left))
            h = moveRedRight(h);

        h.right = deleteMax(h.right);
        return restoreInvariant(h);
    }

    /**
     * Return the smallest key in the RedBlackTree.
     *
     * @return the smallest key in the RedBlackTree.
     */
    public K min() {
        if (isEmpty())
            throw new NoSuchElementException("min with empty " +
                    "RedBlackTree");
        return min(root).key;
    }

    /**
     * Helper for min.
     *
     * @param h
     * @return the smallest key in the subtree from h
     */
    private Node min(Node h) {
        if (h.left == null)
            return h;
        return min(h.left);
    }

    /**
     * Return the largest key in the RedBlackTree.
     *
     * @return the largest key in the RedBlackTree.
     */
    public K max() {
        if (isEmpty())
            throw new NoSuchElementException("max with empty " +
                    "RedBlackTree");
        return max(root).key;
    }

    /**
     * Helper for max.
     *
     * @param h
     * @return the largest key in the subtree from h
     */
    private Node max(Node h) {
        if (h.right == null)
            return h;
        return max(h.right);
    }

    /**
     * Returns the largest key less than or equal to key in the
     * RedBlackTree.
     *
     * @param key, the key to be searched
     * @return the largest key less than or equal to key in the
     *         RedBlackTree.
     * @throws IllegalArgumentException if the key is null
     * @throws NoSuchElementException if the RedBlackTree is empty
     */
    public K floor(K key) {
        if (key == null)
            throw new IllegalArgumentException("floor with null key");
        if (isEmpty())
            throw new NoSuchElementException("floor with empty " +
                    "RedBlackTree");
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
     * RedBlackTree.
     *
     * @param key, the key to be searched
     * @return the smallest key greater than or equal to key in the
     *         RedBlackTree.
     * @throws IllegalArgumentException if the key is null
     * @throws NoSuchElementException if the RedBlackTree is empty
     */
    public K ceil(K key) {
        if (key == null)
            throw new IllegalArgumentException("ceil with null key");
        if (isEmpty())
            throw new NoSuchElementException("ceil with empty " +
                    "RedBlackTree");
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
     * Return the k-th smallest key in the RedBlackTree.
     *
     * @param k, the kth number
     * @return the k-th smallest key in the RedBlackTree.
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
     * Return the number of keys in the RedBlackTree less than the
     * given key.
     *
     * @param  key, the key to be searched
     * @return the number of keys in the RedBlackTree less than the
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
     * @return the number of keys in the RedBlackTree less than the
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
     * Returns all the keys in the RedBlackTree ordered
     * from the smallest key to the largest key, in an Iterable.
     *
     * @return all the keys in the RedBlackTree ordered
     * from the smallest key to the largest key, in an Iterable.
     */
    public Iterable<K> keys() {
        return keys(min(), max());
    }

    /**
     * Returns all keys in the RedBlackTree in the range between
     * lo and hi, in order, in an Iterable.
     *
     * @param  lo, lower bound
     * @param  hi, upper bound
     * @return all keys in the RedBlackTree in the range between
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

public class RedBlackTreeSet<K extends Comparable<K>> {

    private static final boolean RED = true;
    private static final boolean BLACK = false;

    private Node root;

    private class Node {
        private K key;
        private Node left, right;
        private boolean color;
        private int size;

        public Node(K key, boolean color, int size) {
            this.key = key;
            this.color = color;
            this.size = size;
        }
    }

    /**
     * Initializes an empty RedBlackTreeSet.
     */
    public RedBlackTreeSet() {
        root = null;
    }

    /**
     * Returns true if the RedBlackTreeSet is empty, false otherwise.
     *
     * @return true if the RedBlackTreeSet is empty, false otherwise
     */
    public boolean isEmpty() {
        return root == null;
    }

    /**
     * Returns the number of elements in the RedBlackTreeSet.
     *
     * @return the number of elements in the RedBlackTreeSet
     */
    public int size() {
        return size(root);
    }

    /**
     * Helper function that returns the number of elements from x in the
     * RedBlackTreeSet.
     *
     * @param x, the Node whose size in question
     * @return the number of elements from x in the RedBlackTreeSet
     */
    private int size(Node x) {
        if (x == null)
            return 0;
        return x.size;
    }

    /**
     * Helper function that returns true if the x is red,
     * false otherwise or if x is null.
     *
     * @param x, the Node in question
     * @return true if the x is red false otherwise or if x is null
     */
    private boolean isRed(Node x) {
        if (x == null)
            return false;
        return x.color == RED;
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
        x.color = x.left.color;
        x.left.color = RED;
        x.size = h.size;
        h.size = 1 + size(h.left) + size(h.right);
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
        x.color = x.right.color;
        x.right.color = RED;
        x.size = h.size;
        h.size = 1 + size(h.left) + size(h.right);
        return x;
    }

    /**
     * Helper function to flip a Node h's colors from red to black,
     * and black to red.
     *
     * @param h
     */
    private void flipColors(Node h) {
        h.color = !h.color;
        h.left.color = !h.left.color;
        h.right.color = !h.right.color;
    }

    /**
     * Helper function to move red to the right of Node h, return h
     * after the transformation.
     *
     * @param h
     * @return return h after the transformation
     */
    private Node moveRedRight(Node h) {
        flipColors(h);
        if (isRed(h.left.left)) {
            h = rotateRight(h);
            flipColors(h);
        }
        return h;
    }

    /**
     * Helper function to move red to the left of Node h, return h
     * after the transformation.
     *
     * @param h
     * @return h after the transformation
     */
    private Node moveRedLeft(Node h) {
        flipColors(h);
        if (isRed(h.right.left)) {
            h.right = rotateRight(h.right);
            h = rotateLeft(h);
            flipColors(h);
        }
        return h;
    }

    /**
     * Helper function to restore the red-black invariant, return h
     * after the transformation.
     *
     * @param h
     * @return h after the transformation
     */
    private Node restoreInvariant(Node h) {
        if (isRed(h.right))
            h = rotateLeft(h);
        if (isRed(h.left) && isRed(h.left.left))
            h = rotateRight(h);
        if (isRed(h.left) && isRed(h.right))
            flipColors(h);
        h.size = 1 + size(h.left) + size(h.right);
        return h;
    }

    /**
     * Return the height of the RedBlackTreeSet.
     *
     * @return the height of the RedBlackTreeSet
     */
    public int height() {
        return height(root);
    }

    /**
     * Helper for height.
     *
     * @param h, the Node relative to which we compute the height
     * @return the height of the subtree from h
     */
    private int height(Node h) {
        if (h == null)
            return -1;
        return 1 + Math.max(height(h.left), height(h.right));
    }

    /**
     * Returns true if the key is contained in the RedBlackTreeSet, false
     * otherwise.
     *
     * @param key, the key to be searched for
     * @return true if the key is contained in the RedBlackTreeSet, false
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
     * Insert the key into the RedBlackTreeSet, but if the key is already
     * contained, then do nothing.
     *
     * @param key, the key to be inserted
     * @throws IllegalArgumentException if key is null
     */
    public void put(K key) {
        if (key == null)
            throw new IllegalArgumentException("put with null key");
        root = put(root, key);
        root.color = BLACK;
    }

    /**
     * Helper function for put.
     *
     * @param h, the Node relative to which we perform put
     * @param key, the key to be inserted
     * @return h, after applying (possible) transformations to keep the
     *         red-black invariance.
     */
    private Node put(Node h, K key) {
        if (h == null)
            return new Node(key, RED, 1);

        int cmp = key.compareTo(h.key);

        if (cmp < 0)
            h.left = put(h.left, key);
        else if (cmp > 0)
            h.right = put(h.right, key);
        else
            doNothing();

        if (isRed(h.right) && !isRed(h.left))
            h = rotateLeft(h);
        if (isRed(h.left) && isRed(h.left.left))
            h = rotateRight(h);
        if (isRed(h.left) && isRed(h.right))
            flipColors(h);

        h.size = 1 + size(h.left) + size(h.right);

        return h;
    }

    /**
     * Remove the key from the RedBlackTreeSet.
     *
     * @param key, the key to be removed
     */
    public void delete(K key) {
        if (key == null)
            throw new IllegalArgumentException("delete with null key");
        if (!contains(key))
            return;
        if (!isRed(root.left) && !isRed(root.right))
            root.color = RED;

        root = delete(root, key);
        if (!isEmpty())
            root.color = BLACK;
    }

    /**
     * Helper function for delete.
     *
     * @param h, to Node relative to which we perform delete
     * @param key, the key to be removed
     * @return h, after applying (possible) transformations to keep the
     *         red-black invariance.
     */
    private Node delete(Node h, K key) {
        if (key.compareTo(h.key) < 0)  {
            if (!isRed(h.left) && !isRed(h.left.left))
                h = moveRedLeft(h);
            h.left = delete(h.left, key);
        }
        else {
            if (isRed(h.left))
                h = rotateRight(h);
            if (key.compareTo(h.key) == 0 && (h.right == null))
                return null;
            if (!isRed(h.right) && !isRed(h.right.left))
                h = moveRedRight(h);
            if (key.compareTo(h.key) == 0) {
                Node x = min(h.right);
                h.key = x.key;
                h.right = deleteMin(h.right);
            }
            else h.right = delete(h.right, key);
        }
        return restoreInvariant(h);
    }

    /**
     * Delete the element with the smallest key in the RedBlackTreeSet.
     *
     * @throws NoSuchElementException if the RedBlackTreeSet is empty
     */
    public void deleteMin() {
        if (isEmpty())
            throw new NoSuchElementException("deleteMin with empty " +
                    "RedBlackTreeSet");
        if (!isRed(root.left) && !isRed(root.right))
            root.color = RED;

        root = deleteMin(root);

        if (isEmpty())
            root.color = BLACK;
    }

    /**
     * Helper function for deleteMin.
     *
     * @param h
     * @return h, after applying (possible) transformations to keep the
     *         red-black invariance.
     */
    private Node deleteMin(Node h) {
        if (h.left == null)
            return null;

        if (!isRed(h.left) && !isRed(h.left.left))
            h = moveRedLeft(h);

        h.left = deleteMin(h.left);
        return restoreInvariant(h);
    }

    /**
     * Removes the element with the largest key in the RedBlackTreeSet.
     *
     * @throws NoSuchElementException if the RedBlackTreeSet is empty
     */
    public void deleteMax() {
        if (isEmpty())
            throw new NoSuchElementException("deleteMax with empty " +
                    "RedBlackTreeSet");

        if (!isRed(root.left) && !isRed(root.right))
            root.color = RED;

        root = deleteMin(root);

        if (isEmpty())
            root.color = BLACK;
    }

    /**
     * Helper function for deleteMax.
     *
     * @param h
     * @return h, after applying (possible) transformations to keep the
     *         red-black invariance.
     */
    private Node deleteMax(Node h) {
        if (isRed(h.left))
            h = rotateRight(h);

        if (h.right == null)
            return null;

        if (!isRed(h.right) && !isRed(h.right.left))
            h = moveRedRight(h);

        h.right = deleteMax(h.right);
        return restoreInvariant(h);
    }

    /**
     * Return the smallest key in the RedBlackTreeSet.
     *
     * @return the smallest key in the RedBlackTreeSet.
     */
    public K min() {
        if (isEmpty())
            throw new NoSuchElementException("min with empty " +
                    "RedBlackTreeSet");
        return min(root).key;
    }

    /**
     * Helper for min.
     *
     * @param h
     * @return the smallest key in the subtree from h
     */
    private Node min(Node h) {
        if (h.left == null)
            return h;
        return min(h.left);
    }

    /**
     * Return the largest key in the RedBlackTreeSet.
     *
     * @return the largest key in the RedBlackTreeSet.
     */
    public K max() {
        if (isEmpty())
            throw new NoSuchElementException("max with empty " +
                    "RedBlackTreeSet");
        return max(root).key;
    }

    /**
     * Helper for max.
     *
     * @param h
     * @return the largest key in the subtree from h
     */
    private Node max(Node h) {
        if (h.right == null)
            return h;
        return max(h.right);
    }

    /**
     * Returns the largest key less than or equal to key in the
     * RedBlackTreeSet.
     *
     * @param key, the key to be searched
     * @return the largest key less than or equal to key in the
     *         RedBlackTreeSet.
     * @throws IllegalArgumentException if the key is null
     * @throws NoSuchElementException if the RedBlackTreeSet is empty
     */
    public K floor(K key) {
        if (key == null)
            throw new IllegalArgumentException("floor with null key");
        if (isEmpty())
            throw new NoSuchElementException("floor with empty " +
                    "RedBlackTreeSet");
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
     * RedBlackTreeSet.
     *
     * @param key, the key to be searched
     * @return the smallest key greater than or equal to key in the
     *         RedBlackTreeSet.
     * @throws IllegalArgumentException if the key is null
     * @throws NoSuchElementException if the RedBlackTreeSet is empty
     */
    public K ceil(K key) {
        if (key == null)
            throw new IllegalArgumentException("ceil with null key");
        if (isEmpty())
            throw new NoSuchElementException("ceil with empty " +
                    "RedBlackTreeSet");
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
     * Return the k-th smallest key in the RedBlackTreeSet.
     *
     * @param k, the kth number
     * @return the k-th smallest key in the RedBlackTreeSet.
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
     * Return the number of keys in the RedBlackTreeSet less than the
     * given key.
     *
     * @param  key, the key to be searched
     * @return the number of keys in the RedBlackTreeSet less than the
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
     * @return the number of keys in the RedBlackTreeSet less than the
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
     * Returns all the keys in the RedBlackTreeSet ordered
     * from the smallest key to the largest key, in an Iterable.
     *
     * @return all the keys in the RedBlackTreeSet ordered
     * from the smallest key to the largest key, in an Iterable.
     */
    public Iterable<K> keys() {
        return keys(min(), max());
    }

    /**
     * Returns all keys in the RedBlackTreeSet in the range between
     * lo and hi, in order, in an Iterable.
     *
     * @param  lo, lower bound
     * @param  hi, upper bound
     * @return all keys in the RedBlackTreeSet in the range between
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