# Red-Black Tree

A red-black tree is a self-balancing binary search tree modeled after the 2-3 tree, where we use 
colors (`RED` or `BLACK`) to coordinate which nodes are grouped together as a 2-node, and which are 
grouped together as a 3-node. We consider the variant of left learning red-black tree (Sedgewick). 
The main idea behind this approach is that all of the nodes contain an extra `boolean` field 
`color` which denotes whether its link with its parent is `RED` (`true`) or `BLACK` (`false`). Two 
nodes with a `red` link between them denotes a 3-node. 

Although we introduce this extra field, it is still practically the same structure as the binary 
search tree, and often we can use the same code. This tree structure still contains a `root` node, 
and all nodes have pointers to their `left` and `right` children, with the property that the `left` 
child's key is always less than the `root` (in whatever way that may be defined), and the `right` 
child's key is always greater than the `root`. For operations like `min`, `max`, `floor`, `ceil`, 
`select`, or `rank`, it has virtually the same code as for the binary search tree.

The main motivation behind using a red-black tree is to take advantage of the fact that it is 
balanced. Since the distance from the `root` node to any leaf is the same or differs by 1, and is 
at most $logN$, operations like `get`, `put`, `contains`, or `delete` run in $O(logN)$ time, 
guaranteed.

### Balancing Mechanism

The main approach behind rebalancing the tree is through the idea of "rotations". Rotations can be 
though of as taking two nodes, say `A` and `B` where `B` is the `root` at that subtree and `A` is to 
the `left` of `B`, and adjusting the pointers so that `A` becomes the `root` at that subtree and `B`
is to the `right` of `A`. That is one such rotation, and another may be vice versa. This is much 
easier to understand conceptually when it is drawn out and visualized.

The red-black tree has the following basic operations that help with later maintaining the balance 
of the tree, and these are `rotateRight`, `rotateLeft`, and `flipColors`.

We require the `rotateLeft` operation when we need to make an incorrectly right leaning node lean 
to the left (hence the name left leaning red-black tree), and we swap the positions of nodes `X` and 
`Y` as follows:

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

We require the `rotateRight` operation when we need to temporarily make an already left leaning node 
lean to the right, and we swap the positions of nodes `X` and `Y` as follows:

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

We require the `flipColors` operation when a node incorrectly has both their `left` and `right` 
colors being `RED`. Note that this structure occurs when we need to make a temporary 4-node (which 
is a node that has 4 children). We swap the colors of nodes `X`, `Y`, and `Z` as follows:

```
From:

     |
     Y
  //   \\   
 X       Z
/ \     / \

To:

    ||
    Y
   / \
  X   Z
 / \ / \  
```

### Visualization

The following visualizes a basic red-black tree, we will use double lines to denote `RED` links:

```
          |
      A = B
     /  |  \  
    C   D   E
```

The link between nodes `A` and `B` is `RED`, but the parent link going up from `B` is `BLACK`, since 
we cannot have two consecutive `RED` links. Just like with a 2-3 tree, 
$C \leq A \leq D \leq B \leq E$. Many operations are identical to 2-3 trees and the regular binary 
search tree: `get`, `put`, `min`/`max`, `delete`/`deleteMin`/`deleteMax`, `floor`/`ceil`, `select`, 
`rank`. These operations are identical because they are completely independent from needing to know 
information on the `color` of the nodes.

The main idea behind using red-black trees is to maintain correspondence with 2-3 trees, and using 
these three basic operations: `rotateLeft`, `rotateRight`, and `flipColors`.

The following visualizes a situation where we need the `rotateLeft` operation:

```
// Suppose we have the following red-black tree:

            10
            / \
           5   15
              // \
             12

// insert(7):
// Then we have:

               10
            /      \
           5       15
          / \\    // \
             7   12
            / \  / \

// The Nodes 5 and 7 are incorrectly right leaning instead of left leaning,
// so we apply the rotateLeft operation, which correctly maintains the
// red-black Tree property:

               10
            /      \
           7       15
         // \    // \
        5       12
       / \     / \
```

The following visualizes a situation where we need the `rotateRight` operation:

```
// Suppose we have the following red-black tree:

               10
             //  \
            5    
           / \

// insert(15):
// Then we have:

               10
             //  \\
            5     15
           / \    / \

// The Nodes 5 and 15 are incorrect because both their colors are red, but
// no Node can have both left and right being red, so we apply the flipColors
// operation:

              10
             /  \
            5    15
           / \   / \  
```

The following visualizes a situation where we need the `flipColors` operation:

```
// Suppose we have a red-black tree where there are two left links being red 
// in a row:

              10
            //  \
           7
         // \
        5
      / \

// Then between 7 and 10, we rotateRight, creating a temporary 4-Node:

               7
             // \\
            5    10
           / \   / \

// Now from 7, both its left and right colors are red, so we flipColors:

               7
              / \
             5   10
            / \  / \  
```

Inserting a node into a red-black tree requires us to insert into some 3-node at the leaf level, 
coloring its link red, and continuously using these basic operations until we restore the red-black 
tree property. When we insert the node, we check to see if the subtree at that node is incorrectly 
right-leaning, and then apply `rotateLeft`. Then we check to see if that results in two `left` links 
being `RED` in a row, then apply `rotateRight`. Then we check if the `color` of both the `left` and 
the `right` are `RED`, then apply `flipColors`.

Since we are always able to balance the red-black tree, the height of the tree gets to be at most 
precisely $\leq 2logN$, and thus for operations like `get`, `put`, or `delete`, they run in 
$O(logN)$ time.

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

public class RedBlackTreeMap<K extends Comparable<K>, V> implements Map<K, V> {

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
     * Initializes an empty RedBlackTreeMap.
     */
    public RedBlackTreeMap() {
        root = null;
    }

    /**
     * Returns true if the RedBlackTreeMap is empty, false otherwise.
     *
     * @return true if the RedBlackTreeMap is empty, false otherwise
     */
    public boolean isEmpty() {
        return root == null;
    }

    /**
     * Returns the number of elements in the RedBlackTreeMap.
     *
     * @return the number of elements in the RedBlackTreeMap
     */
    public int size() {
        return size(root);
    }

    /**
     * Helper function that returns the number of elements from x in the RedBlackTreeMap.
     *
     * @param x, the Node whose size in question
     * @return the number of elements from x in the RedBlackTreeMap
     */
    private int size(Node x) {
        if (x == null)
            return 0;
        return x.size;
    }

    /**
     * Helper function that returns true if the x is red, false otherwise or if x is null.
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
        x.color = x.right.color;
        x.right.color = RED;
        x.size = h.size;
        h.size = 1 + size(h.left) + size(h.right);
        return x;
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
        x.color = x.left.color;
        x.left.color = RED;
        x.size = h.size;
        h.size = 1 + size(h.left) + size(h.right);
        return x;
    }

    /**
     * Helper function to flip a Node h's colors from red to black, and black to red.
     *
     * @param h
     */
    private void flipColors(Node h) {
        h.color = !h.color;
        h.left.color = !h.left.color;
        h.right.color = !h.right.color;
    }

    /**
     * Helper function to move red to the right of Node h, return h after the transformation.
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
     * Helper function to move red to the left of Node h, return h after the transformation.
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
     * Helper function to restore the red-black invariant, return h after the transformation.
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
     * Returns the height of the RedBlackTreeMap.
     *
     * @return the height of the RedBlackTreeMap
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
     * Returns the value associated with the key in the RedBlackTreeMap.
     *
     * @param key, the key to be searched for
     * @return the value associated with the key in the RedBlackTreeMap
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
     * Returns true if the key is contained in the RedBlackTreeMap, false otherwise.
     *
     * @param key, the key to be searched for
     * @return true if the key is contained in the RedBlackTreeMap, false otherwise
     */
    public boolean contains(K key) {
        if (key == null)
            throw new IllegalArgumentException("contains with null key");
        return get(key) != null;
    }

    /**
     * Inserts the (key, value) pair into the RedBlackTreeMap, but if the value is null, then
     * delete the element with the associated key.
     *
     * @param key, the key to be inserted
     * @param val, the value associated with the key
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
     * @param val, the value associated with the key
     * @return h, after applying (possible) transformations to keep the red-black invariance.
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
     * Removes the key from the RedBlackTreeMap.
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
     * @return h, after applying (possible) transformations to keep the red-black invariance.
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
     * Deletes the element with the smallest key in the RedBlackTreeMap.
     *
     * @throws NoSuchElementException if the RedBlackTreeMap is empty
     */
    public void deleteMin() {
        if (isEmpty())
            throw new NoSuchElementException("deleteMin with empty RedBlackTreeMap");
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
     * @return h, after applying (possible) transformations to keep the red-black invariance.
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
     * Removes the element with the largest key in the RedBlackTreeMap.
     *
     * @throws NoSuchElementException if the RedBlackTreeMap is empty
     */
    public void deleteMax() {
        if (isEmpty())
            throw new NoSuchElementException("deleteMax with empty RedBlackTreeMap");

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
     * @return h, after applying (possible) transformations to keep the red-black invariance.
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
     * Returns the smallest key in the RedBlackTreeMap.
     *
     * @return the smallest key in the RedBlackTreeMap.
     */
    public K min() {
        if (isEmpty())
            throw new NoSuchElementException("min with empty RedBlackTreeMap");
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
     * Returns the largest key in the RedBlackTreeMap.
     *
     * @return the largest key in the RedBlackTreeMap.
     */
    public K max() {
        if (isEmpty())
            throw new NoSuchElementException("max with empty RedBlackTreeMap");
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
     * Returns the largest key less than or equal to key in the RedBlackTreeMap.
     *
     * @param key, the key to be searched
     * @return the largest key less than or equal to key in the RedBlackTreeMap.
     * @throws IllegalArgumentException if the key is null
     * @throws NoSuchElementException if the RedBlackTreeMap is empty
     */
    public K floor(K key) {
        if (key == null)
            throw new IllegalArgumentException("floor with null key");
        if (isEmpty())
            throw new NoSuchElementException("floor with empty RedBlackTreeMap");
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
     * Returns the smallest key greater than or equal to key in the RedBlackTreeMap.
     *
     * @param key, the key to be searched
     * @return the smallest key greater than or equal to key in the RedBlackTreeMap.
     * @throws IllegalArgumentException if the key is null
     * @throws NoSuchElementException if the RedBlackTreeMap is empty
     */
    public K ceil(K key) {
        if (key == null)
            throw new IllegalArgumentException("ceil with null key");
        if (isEmpty())
            throw new NoSuchElementException("ceil with empty RedBlackTreeMap");
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
     * Returns the k-th smallest key in the RedBlackTreeMap.
     *
     * @param k, the kth number
     * @return the k-th smallest key in the RedBlackTreeMap.
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
     * Returns the number of keys in the RedBlackTreeMap less than the
     * given key.
     *
     * @param  key, the key to be searched
     * @return the number of keys in the RedBlackTreeMap less than the given key.
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
     * @return the number of keys in the RedBlackTreeMap less than the given key from x
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
     * Returns all the keys in the RedBlackTreeMap ordered from the smallest key to the largest key,
     * in an Iterable.
     *
     * @return all the keys in the RedBlackTreeMap ordered from the smallest key to the largest key,
     * in an Iterable.
     */
    public Iterable<K> keys() {
        return keys(min(), max());
    }

    /**
     * Returns all keys in the RedBlackTreeMap in the range between lo and hi, in order, in an
     * Iterable.
     *
     * @param  lo, lower bound
     * @param  hi, upper bound
     * @return all keys in the RedBlackTreeMap in the range between lo and hi, in order, in an
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

public class RedBlackTreeSet<K extends Comparable<K>> implements Set<K> {

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
     * Helper function that returns the number of elements from x in the RedBlackTreeSet.
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
     * Helper function that returns true if the x is red, false otherwise or if x is null.
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
        x.color = x.left.color;
        x.left.color = RED;
        x.size = h.size;
        h.size = 1 + size(h.left) + size(h.right);
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
        x.color = x.right.color;
        x.right.color = RED;
        x.size = h.size;
        h.size = 1 + size(h.left) + size(h.right);
        return x;
    }

    /**
     * Helper function to flip a Node h's colors from red to black, and black to red.
     *
     * @param h
     */
    private void flipColors(Node h) {
        h.color = !h.color;
        h.left.color = !h.left.color;
        h.right.color = !h.right.color;
    }

    /**
     * Helper function to move red to the right of Node h, return h after the transformation.
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
     * Helper function to move red to the left of Node h, return h after the transformation.
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
     * Helper function to restore the red-black invariant, return h after the transformation.
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
     * Returns the height of the RedBlackTreeSet.
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
     * Returns true if the key is contained in the RedBlackTreeSet, false otherwise.
     *
     * @param key, the key to be searched for
     * @return true if the key is contained in the RedBlackTreeSet, false otherwise
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
     * Inserts the key into the RedBlackTreeSet, but if the key is already contained, then do nothing.
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
     * @return h, after applying (possible) transformations to keep the red-black invariance.
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
     * Removes the key from the RedBlackTreeSet.
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
     * @return h, after applying (possible) transformations to keep the red-black invariance.
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
     * Deletes the element with the smallest key in the RedBlackTreeSet.
     *
     * @throws NoSuchElementException if the RedBlackTreeSet is empty
     */
    public void deleteMin() {
        if (isEmpty())
            throw new NoSuchElementException("deleteMin with empty RedBlackTreeSet");
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
     * @return h, after applying (possible) transformations to keep the red-black invariance.
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
            throw new NoSuchElementException("deleteMax with empty RedBlackTreeSet");

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
     * @return h, after applying (possible) transformations to keep the red-black invariance.
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
     * Returns the smallest key in the RedBlackTreeSet.
     *
     * @return the smallest key in the RedBlackTreeSet.
     */
    public K min() {
        if (isEmpty())
            throw new NoSuchElementException("min with empty RedBlackTreeSet");
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
     * Returns the largest key in the RedBlackTreeSet.
     *
     * @return the largest key in the RedBlackTreeSet.
     */
    public K max() {
        if (isEmpty())
            throw new NoSuchElementException("max with empty RedBlackTreeSet");
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
     * @return the largest key less than or equal to key in the RedBlackTreeSet.
     * @throws IllegalArgumentException if the key is null
     * @throws NoSuchElementException if the RedBlackTreeSet is empty
     */
    public K floor(K key) {
        if (key == null)
            throw new IllegalArgumentException("floor with null key");
        if (isEmpty())
            throw new NoSuchElementException("floor with empty RedBlackTreeSet");
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
     * Returns the smallest key greater than or equal to key in the RedBlackTreeSet.
     *
     * @param key, the key to be searched
     * @return the smallest key greater than or equal to key in the RedBlackTreeSet.
     * @throws IllegalArgumentException if the key is null
     * @throws NoSuchElementException if the RedBlackTreeSet is empty
     */
    public K ceil(K key) {
        if (key == null)
            throw new IllegalArgumentException("ceil with null key");
        if (isEmpty())
            throw new NoSuchElementException("ceil with empty RedBlackTreeSet");
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
     * Returns the k-th smallest key in the RedBlackTreeSet.
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
     * Returns the number of keys in the RedBlackTreeSet less than the given key.
     *
     * @param  key, the key to be searched
     * @return the number of keys in the RedBlackTreeSet less than the given key.
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
     * @return the number of keys in the RedBlackTreeSet less than the given key from x
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
     * Returns all the keys in the RedBlackTreeSet ordered from the smallest key to the largest key,
     * in an Iterable.
     *
     * @return all the keys in the RedBlackTreeSet ordered
     * from the smallest key to the largest key, in an Iterable.
     */
    public Iterable<K> keys() {
        return keys(min(), max());
    }

    /**
     * Returns all keys in the RedBlackTreeSet in the range between lo and hi, in order, in an
     * Iterable.
     *
     * @param  lo, lower bound
     * @param  hi, upper bound
     * @return all keys in the RedBlackTreeSet in the range between lo and hi, in order, in an
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

The following table describes the time complexity for performing the operations above on a 
red-black tree:

```
| Data Structure | contains  | get     | put     | min     | max     | delete  | deleteMin  | deleteMax  | floor   | ceil    | select  | rank    |
|----------------|-----------|---------|---------|---------|---------|---------|------------|------------|---------|---------|---------|---------|
| red-black tree | O(logN)   | O(logN) | O(logN) | O(logN) | O(logN) | O(logN) | O(logN)    | O(logN)    | O(logN) | O(logN) | O(logN) | O(logN) |
```