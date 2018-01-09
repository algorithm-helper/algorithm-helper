# AVL Tree

An AVL (Adelson-Velsky & Landis) tree is a self-balancing binary search tree structure, and the main 
balancing approach behind it is by augmenting nodes, giving them `height` fields, and maintaining 
the property that the heights of the `left` and `right` subtrees differ by at most 1. We define the 
balance factor to be the `height` of the `left` subtree minus the `height` of the `right` subtree, 
and by the AVL property, the balance factor can be only -1, 0, or 1.

To recap, the `height` of a node in a tree is the maximum length path of nodes from the subtree at 
the node to a leaf in the tree. We can easily get the height at any node by first checking if it is 
`null` (and returning 0), or otherwise by returning its `height` field.

### Balancing Mechanism

The main approach behind rebalancing the tree is through the idea of "rotations". Rotations can be 
thought of as taking two nodes, say `A` and `B` where `B` is the `root` at that subtree and `A` is 
to the `left` of `B`, and adjusting the pointers so that `A` becomes the `root` at that subtree and 
`B` is to the `right` of `A`. That is one such rotation, and another may be vice versa. This is much 
easier to understand conceptually when it is drawn out and visualized.

The AVL tree is similar to the red-black tree (more can be read on the article on the 
[Red-Black Tree](/categories/data-structures/trees/red-black-tree)) in the sense that the basic 
operations like `rotateLeft` and `rotateRight` work in exactly the same way except for switching 
colors. One addition is that when we perform these oeprations, we also update the node's `height`,
which is given by recursively summing up the `height` of the `left` and the `right` subtrees.

The AVL tree has the following basic operations that help with restoring the AVL invariant and 
maintain the balance of the tre, and these are `rotateLeft`, and `rotateRight`.

We require the `rotateLeft` operation when we need to make an incorrectly "left balanced" node go to 
the `right`, and we swap the positions of nodes `X` and `Y` as follows:

```
From:

   |
   Y = X
  /   / \

To:

     |
 Y = X
/ \   \
```

We require the `rotateRight` operation when we need to make an incorrectly "right balanced" node go 
to the `left`, and we swap the positions of nodes `X` and `Y` as follows:

```
From:

       |
   X = Y
  / \   \

To:

 |
 X = Y
/   / \
```

### Visualization

The following visualizes an AVL tree that satisfies the AVL property:

```
                     10
                 /        \
                5          15
               / \         / \
              3   6       12  17
             /   / \     / \  / \
                    7
                   / \
```

Every node satisfies the AVL property because:
- Node 3, 7, 12, 17 have `left` and `right` links being `null`, so their balance factors are 0
- Node 6 has `left` `height` of 0, `right` `height` of 1, so its balance factor is -1
- Node 5 has `left` `height` of 1, `right` `height` of 2, so its balance factor is -1
- Node 15 has `left` and `right` `height` of 1, so its balance factor is 0
- Node 10 has `left` `height` of 3, `right` `height` of 2, so its balance factor is 1

We consider the following example to demonstrate the use of the basic operations and how they 
rebalance the tree:

```
// Suppose we start off with the following AVL tree:

                     10
                 /        \
                5          15
               / \         / \
              3   6       12  17
             /   / \     / \  / \
                    7
                   / \

// insert(8):
// Now we have:

                     10
                 /        \
                5          15
               / \         / \
              3   6       12  17
             /   / \     / \  / \
                    7
                   / \
                      8
                     / \

// But the AVL property is not satisfied at Node 6 because its left height
// is 0, its right height is 2, so its balance factor is -2, so between
// Nodes 6 and 7, we use the operation rotateLeft:

                     10
                 /        \
                5          15
               / \         / \
              3   7       12  17
             /   / \     / \  / \
                6   8
               / \ / \

// All Nodes satisfy the AVL property.
```

Intuitively, because we are always able to keep the both `left` and `right` subtrees to be balanced 
(and only differ by at most 1), it follows that the maximum `height` of the tree only gets to be 
about $logN$, and thus for operations on AVL Trees like `get`, `put`, or `delete`, we achieve 
$O(logN)$ time, guaranteed. In addition, basic binary search tree operations like `min`/`max`, 
`floor`/`ceil`, `select`, or `rank` work in exactly the same way since they work independently of 
the `height` field, and also run in $O(logN)$ time.

One thing to note about AVL Trees is that they are not weight-balanced, meaning that both `left` and 
`right` subtrees contain the same amount of nodes. The same is true with red-black trees, but with 
left-leaning red-black trees, we know that the `left` side generally has more weight.

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

public class AVLTreeMap<K extends Comparable<K>, V> implements Map<K, V> {

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
     * Initializes an empty AVLTreeMap.
     */
    public AVLTreeMap() {}

    /**
     * Returns true if the AVLTreeMap is empty, false otherwise.
     *
     * @return true if the AVLTreeMap is empty, false otherwise
     */
    public boolean isEmpty() {
        return root == null;
    }

    /**
     * Returns the number of elements in the AVLTreeMap.
     *
     * @return the number of elements in the AVLTreeMap
     */
    public int size() {
        return size(root);
    }

    /**
     * Helper function that returns the number of elements from x in the AVLTreeMap.
     *
     * @param x, the Node whose size in question
     * @return the number of elements from x in the AVLTreeMap
     */
    private int size(Node x) {
        if (x == null)
            return 0;
        return x.size;
    }

    /**
     * Returns the height of the AVLTreeMap.
     *
     * @return the height of the AVLTreeMap
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
     * Helper function to rotate a Node link to the left, return the new root Node at that original
     * position.
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
     * Helper function to rotate a Node link to the right, return the new root Node at that original
     * position.
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
     * Returns the value associated with the key in the AVLTreeMap.
     *
     * @param key, the key to be searched for
     * @return the value associated with the key in the AVLTreeMap
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
     * Returns true if the key is contained in the AVLTreeMap, false otherwise.
     *
     * @param key, the key to be searched for
     * @return true if the key is contained in the AVLTreeMap, false otherwise
     */
    public boolean contains(K key) {
        if (key == null)
            throw new IllegalArgumentException("contains with null key");
        return get(key) != null;
    }

    /**
     * Inserts the (key, val) pair into the AVLTreeMap, but if the value is null, then delete the
     * element with the associated key.
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
     * @return h, after applying (possible) transformations to keep the AVL property.
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
     * Helper function to restore the AVL property, return h after the transformation.
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
     * Returns the balance factor of the subtree from h, which is given by the difference between
     * the height of the left subtree and the right subtree from h.
     *
     * @param h
     * @return the balance factor of the subtree from h, which is given by the difference between
     *         the height of the left subtree and the right subtree from h
     */
    private int balanceFactor(Node h) {
        return height(h.left) - height(h.right);
    }

    /**
     * Removes the key from the AVLTreeMap.
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
     * @return h, after applying (possible) transformations to keep the AVL property.
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
     * Deletes the element with the smallest key in the AVLTreeMap.
     *
     * @throws NoSuchElementException if the AVLTreeMap is empty
     */
    public void deleteMin() {
        if (isEmpty())
            throw new NoSuchElementException("deleteMin with empty AVLTreeMap");
        root = deleteMin(root);
    }

    /**
     * Helper function for deleteMin.
     *
     * @param x
     * @return x, after applying (possible) transformations to keep the AVL property.
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
     * Removes the element with the largest key in the AVLTreeMap.
     *
     * @throws NoSuchElementException if the AVLTreeMap is empty
     */
    public void deleteMax() {
        if (isEmpty())
            throw new NoSuchElementException("deleteMax with empty AVLTreeMap");
        root = deleteMax(root);
    }

    /**
     * Helper function for deleteMax.
     *
     * @param x
     * @return x, after applying (possible) transformations to keep the AVL property.
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
     * Returns the smallest key in the AVLTreeMap.
     *
     * @return the smallest key in the AVLTreeMap.
     */
    public K min() {
        if (isEmpty())
            throw new NoSuchElementException("min with empty AVLTreeMap");
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
     * Return the largest key in the AVLTreeMap.
     *
     * @return the largest key in the AVLTreeMap.
     */
    public K max() {
        if (isEmpty())
            throw new NoSuchElementException("max with empty AVLTreeMap");
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
     * Returns the largest key less than or equal to key in the AVLTreeMap.
     *
     * @param key, the key to be searched
     * @return the largest key less than or equal to key in the AVLTreeMap.
     * @throws IllegalArgumentException if the key is null
     * @throws NoSuchElementException if the AVLTreeMap is empty
     */
    public K floor(K key) {
        if (key == null)
            throw new IllegalArgumentException("floor with null key");
        if (isEmpty())
            throw new NoSuchElementException("floor with null AVLTreeMap");
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
     * Returns the smallest key greater than or equal to key in the AVLTreeMap.
     *
     * @param key, the key to be searched
     * @return the smallest key greater than or equal to key in the AVLTreeMap.
     * @throws IllegalArgumentException if the key is null
     * @throws NoSuchElementException if the AVLTreeMap is empty
     */
    public K ceil(K key) {
        if (key == null)
            throw new IllegalArgumentException("ceil with null key");
        if (isEmpty())
            throw new NoSuchElementException("ceil with empty AVLTreeMap");
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
     * Return the k-th smallest key in the AVLTreeMap.
     *
     * @param k, the kth number
     * @return the k-th smallest key in the AVLTreeMap.
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
     * Return the number of keys in the AVLTreeMap less than the given key.
     *
     * @param  key, the key to be searched
     * @return the number of keys in the AVLTreeMap less than the given key.
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
     * @return the number of keys in the AVLTreeMap less than the given key from x
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
     * Returns all the keys in the AVLTreeMap ordered from the smallest key to the largest key, in
     * an Iterable.
     *
     * @return all the keys in the AVLTreeMap ordered from the smallest key to the largest key, in
     *         an Iterable.
     */
    public Iterable<K> keys() {
        return keys(min(), max());
    }

    /**
     * Returns all keys in the AVLTreeMap in the range between lo and hi, in order, in an Iterable.
     *
     * @param  lo, lower bound
     * @param  hi, upper bound
     * @return all keys in the AVLTreeMap in the range between lo and hi, in order, in an Iterable.
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

public class AVLTreeSet<K extends Comparable<K>> implements Set<K> {

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
     * Helper function that returns the number of elements from x in the AVLTreeSet.
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
     * Returns the height of the AVLTreeSet.
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
     * Helper function to rotate a Node link to the left, return the new root Node at that original
     * position.
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
     * Helper function to rotate a Node link to the right, return the new root Node at that original
     * position.
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
     * Returns true if the key is contained in the AVLTreeSet, false otherwise.
     *
     * @param key, the key to be searched for
     * @return true if the key is contained in the AVLTreeSet, false otherwise
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
     * Inserts the key into the AVLTreeSet, but if the key is already contained in the AVLTreeSet,
     * do nothing.
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
     * Helper function to restore the AVL property, return h after the transformation.
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
     * Returns the balance factor of the subtree from h, which is given by the difference between
     * the height of the left subtree and the right subtree from h.
     *
     * @param h
     * @return the balance factor of the subtree from h, which is given by the difference between
     *         the height of the left subtree and the right subtree from h
     */
    private int balanceFactor(Node h) {
        return height(h.left) - height(h.right);
    }

    /**
     * Removes the key from the AVLTreeSet.
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
     * @return h, after applying (possible) transformations to keep the AVL property.
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
     * Deletes the element with the smallest key in the AVLTreeSet.
     *
     * @throws NoSuchElementException if the AVLTreeSet is empty
     */
    public void deleteMin() {
        if (isEmpty())
            throw new NoSuchElementException("deleteMin with empty AVLTreeSet");
        root = deleteMin(root);
    }

    /**
     * Helper function for deleteMin.
     *
     * @param x
     * @return x, after applying (possible) transformations to keep the AVL property.
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
            throw new NoSuchElementException("deleteMax with empty AVLTreeSet");
        root = deleteMax(root);
    }

    /**
     * Helper function for deleteMax.
     *
     * @param x
     * @return x, after applying (possible) transformations to keep the AVL property.
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
     * Returns the smallest key in the AVLTreeSet.
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
     * Returns the largest key in the AVLTreeSet.
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
     * Returns the largest key less than or equal to key in the AVLTreeSet.
     *
     * @param key, the key to be searched
     * @return the largest key less than or equal to key in the AVLTreeSet.
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
     * Returns the smallest key greater than or equal to key in the AVLTreeSet.
     *
     * @param key, the key to be searched
     * @return the smallest key greater than or equal to key in the AVLTreeSet.
     * @throws IllegalArgumentException if the key is null
     * @throws NoSuchElementException if the AVLTreeSet is empty
     */
    public K ceil(K key) {
        if (key == null)
            throw new IllegalArgumentException("ceil with null key");
        if (isEmpty())
            throw new NoSuchElementException("ceil with empty AVLTreeSet");
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
     * Returns the k-th smallest key in the AVLTreeSet.
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
     * Returns the number of keys in the AVLTreeSet less than the given key.
     *
     * @param  key, the key to be searched
     * @return the number of keys in the AVLTreeSet less than the given key.
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
     * @return the number of keys in the AVLTreeSet less than the given key from x
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
     * Does literally nothing, makes difference from the non-set version more explicit.
     */
    public void doNothing() {}

    /**
     * Returns all the keys in the AVLTreeSet ordered from the smallest key to the largest key, in
     * an Iterable.
     *
     * @return all the keys in the AVLTreeSet ordered from the smallest key to the largest key, in
     *         an Iterable.
     */
    public Iterable<K> keys() {
        return keys(min(), max());
    }

    /**
     * Returns all keys in the AVLTreeSet in the range between lo and hi, in order, in an Iterable.
     *
     * @param  lo, lower bound
     * @param  hi, upper bound
     * @return all keys in the AVLTreeSet in the range between lo and hi, in order, in an Iterable.
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

The following table describes the time complexity for performing the operations above on an AVL tree:

```
| Data Structure | contains  | get     | put     | min     | max     | delete  | deleteMin  | deleteMax  | floor   | ceil    | select  | rank    |
|----------------|-----------|---------|---------|---------|---------|---------|------------|------------|---------|---------|---------|---------|
| red-black tree | O(logN)   | O(logN) | O(logN) | O(logN) | O(logN) | O(logN) | O(logN)    | O(logN)    | O(logN) | O(logN) | O(logN) | O(logN) |
```