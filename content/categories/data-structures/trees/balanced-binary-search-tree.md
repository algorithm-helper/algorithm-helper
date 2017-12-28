# Balanced Binary Search Tree

A balanced binary search tree is a tree such that at any given node, the `size` of the `left` 
subtree compared to the `size` of the `right` subtree differs by at most 1. In addition, we would 
want a self-balancing binary search tree, which is a balanced binary seach tree with the built in 
capability to correct imbalances in tree.

The primary motivation for a balanced binary search tree stems from the key problem with a regular 
binary search tree (more can be read on the article on the 
[Binary Search Tree](/categories/data-structures/trees/binary-search-tree)), which is that although 
we would like to use the tree structure to take advantage of the idea of binary search, and be able 
to perform operations like `get`, `put`, or `delete` in logarithmic time, we have no guarantee for 
balance. We can only say that these operations are done in $O(H)$ time, where $H$ is the height of the 
tree. And in some situations, the tree may degenerate into a linked list (such as if the elements 
were inserted into the tree in sorted order, then all of the nodes would link to the `right` node), 
and then all of those operations would run in $O(N)$ time.

Being able to keep balance is a highly desirable property because it would mean that all of those 
operations could be done in $O(logN)$ time guaranteed. There are several tree structures that provide 
the mechanisms to do so: the [2-3 Tree](/categories/data-structures/trees/2-3-tree) gives an 
abstract overview of a self-balacing tree structure, the 
[Red-Black Tree](/categories/data-structures/trees/red-black-tree), and the 
[AVL Tree](/categories/data-structures/trees/avl-tree).

### Visualization

The following visualizes the difference between a balanced binary search tree and one that is not. 
Suppose we had the following keys to be inserted into a binary search tree:

```
{1, 2, 3, 4, 5, 6, 7, 8}
```

Clearly, they are in sorted order. With a non-balanced binary search tree, we  would end up with 
all of the nodes going to the `right`, and then the tree degenerates into a linked list:

```
    1
     \
      2
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
                  8
```

Even if the keys were in a different order, like the following:

```
{1, 3, 2, 6, 7, 4, 5, 8}
```

We have no expectations for balance. Thus for operations like `get`, `put`, or `delete`, we can only 
say that they run in $O(H)$ time, where $H$ is the height of the tree, which is less than or equal to
$N$.

```
    1
   / \
  2   3
       \
        6
       / \ 
      4   7
       \   \
        5   8
```

In a balanced tree however, regardless of the order we insert the elements, we expect to get a tree 
that self-balances, an example may be the following:

```
              5
           /     \
          3       7
         / \     / \   
        2   4   6   8
       /
      1
```

The distance from the root to any of the leaf nodes is at most $logN$, so we are able to perform 
operations like `get`, `put`, or `delete` in $O(logN)$ time guaranteed.
