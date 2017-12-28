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

<script src="https://gist.github.com/eliucs/9d2388dd11ce04ff845cea6d68c927a9.js"></script>

### Implementation (Set)

##### Java

<script src="https://gist.github.com/eliucs/3112d1a94fb8ed9603fc87857663432e.js"></script>

### Time Complexity

The following table describes the time complexity for performing the operations above on a binary 
search tree:

```
| Data Structure     | contains | get  | put  | min  | max  | delete | deleteMin | deleteMax | floor | ceil | select | rank |
|--------------------|----------|------|------|------|------|--------|-----------|-----------|-------|------|--------|------|
| binary search tree | O(H)     | O(H) | O(H) | O(H) | O(H) | O(H)   | O(H)      | O(H)      | O(H)  | O(H) | O(H)   | O(H) |
```
