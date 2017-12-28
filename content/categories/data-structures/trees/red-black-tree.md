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

<script src="https://gist.github.com/eliucs/05a202c652ae163e55771232372f82a4.js"></script>

### Implementation (Set)

##### Java

<script src="https://gist.github.com/eliucs/f314ae7865eada0c3c7e52e66741c3d5.js"></script>

### Time Complexity

The following table describes the time complexity for performing the operations above on a 
red-black tree:

```
| Data Structure | contains  | get     | put     | min     | max     | delete  | deleteMin  | deleteMax  | floor   | ceil    | select  | rank    |
|----------------|-----------|---------|---------|---------|---------|---------|------------|------------|---------|---------|---------|---------|
| red-black tree | O(logN)   | O(logN) | O(logN) | O(logN) | O(logN) | O(logN) | O(logN)    | O(logN)    | O(logN) | O(logN) | O(logN) | O(logN) |
```