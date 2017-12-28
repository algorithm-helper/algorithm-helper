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

<script src="https://gist.github.com/eliucs/5580c40c5e2910052d8887b0fce6b5e9.js"></script>

### Implementation (Set)

##### Java

<script src="https://gist.github.com/eliucs/92a51e5b0390ee02ad68f7870e16b596.js"></script>

### Time Complexity

The following table describes the time complexity for performing the operations above on an AVL tree:

```
| Data Structure | contains  | get     | put     | min     | max     | delete  | deleteMin  | deleteMax  | floor   | ceil    | select  | rank    |
|----------------|-----------|---------|---------|---------|---------|---------|------------|------------|---------|---------|---------|---------|
| red-black tree | O(logN)   | O(logN) | O(logN) | O(logN) | O(logN) | O(logN) | O(logN)    | O(logN)    | O(logN) | O(logN) | O(logN) | O(logN) |
```