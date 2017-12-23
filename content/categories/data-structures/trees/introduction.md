# Introduction

The topic in this section is trees, and these data structures are primarily concerned with tree data 
structures, that is, a set of linked nodes such that it has a root and it has subtrees of children 
nodes, forming a tree-like structure. The following data structures are going to be covered in this 
topic: binary search trees, balanced binary search tree, 2-3 tree, red-black tree, AVL tree, heap, 
priority queue and union find/disjoint set.

### Terminology

We first look at some terminology and definitions with trees.

Trees are an abstract data type that represents a tree-structure, starting with a root note, that 
points to subtrees of children node, and can be defined recursively with nodes (like with a binary 
search tree or red-black tree), or with an array (like with a heap).

From Wikipedia:

> [Tree](https://en.wikipedia.org/wiki/Tree_%28data_structure%29) - a tree is a widely used abstract 
data type (ADT) or data structure implementing this ADT that simulates a hierarchical tree 
structure, with a root value and subtrees of children with a parent node, represented as a set of 
linked nodes. A tree data structure can be defined recursively (locally) as a collection of nodes, 
(starting at a root node), where each node is a data structure consisting of a value, together with 
references to notes (the children) with constraints that no reference is duplicated, and none points 
to the root.

There are a lot of terminology used in trees:

- root 
    - The top-most node in the tree.
- child 
    - A node directly connected to another node when moving away from the root.
- parent 
    - The converse notion of a child.
- siblings 
    - A group of nodes with the same parent.
- descendant 
    - A node reachable by repeated proceeding from parent to child.
- ancestor 
    - A node reachable by repeated proceeding from child to parent.
- leaf 
    - A node with no children.
- branch / internal node 
    - A node with at least one child.
- degree 
    - The number of sub trees of a node.
- edge 
    - The connection between one node and another.
- path 
    - A sequence of nodes and edges connecting a node with a descendant.
- level 
    - The level of a node is defined by 1 + (the number of connections between 
    the node and the root).
- height of node 
    - The height of a node is the number of edges on the longest path between 
    that node and a leaf.
- height of tree 
    - The height of a tree is the height of its root node.
- depth 
    - The depth of a node is the number of edges from the tree's root node to 
    the node.
- forest 
    - A forest is a set of n ≥ 0 disjoint trees.

As well, we consider union finds/disjoint sets, which is a data structure concerned with dynamic 
connectivity and connected components, which although is implemented with an array, can be both 
represented as a linear structure as well as a (more efficient) tree structure. 

### Visualization

The following visualizes an tree, where the nodes are labelled and just placed in some arbitrary 
order:

```
                 A
               / | \ 
              B  C  D
             / \     \ 
            E   F     G

// Node A is the root
// Nodes B, C, D are the children of A
// Node B is the parent of nodes E and F
// Nodes E and F are siblings since they have the same parent, node B
// Node G is a descendant of node A
// Nodes E, F and G are leaf nodes since they do not have any children
// Node A is an ancestor of node G
// The height of the tree is 3
// The height of node B is 1
// The heigth of node C is 0
```

### Properties

As mentioned above, trees contain a set of linked nodes, starting from a root node with subtrees of 
children nodes. Although a tree may have nodes such that they can have an arbitrary amount of 
children, we will consider binary trees for the purposes of explaining binary search trees, 
red-black trees, AVL trees, and (binary) heaps. 

A binary tree is a tree data structure where each node may each either 0, 1, or 2 children. The 
children of a node, say some `root`, are commonly called the `left` and the `right` child. In the 
case of trying to implement a map (more is discussed about this abstract data type in the article 
on [Maps / Symbol Table](/categories/data-structures/trees/map-symbol-table)), the key of the `left`
child is less (in whatever way that may be defined) than the key of the `root`, and the key of the 
`right` child is greater than the key of the `root`. With maps, we store (key, value) pairs. If we 
implement a map using a tree, the nodes may look like the following.

Example of a Node (Java):

```
class Node {
    private K key;
    private V val;
    private Node left, right;
    private int size;
    // other fields may go here ...
}
```

But in the case of sets (more is discussed about this abstract data type in the article on 
[Sets](/categories/data-structures/trees/set)), each node is only associated with a key. If we 
implement a set using a tree, the nodes may look like the following.

Example of a Node (Java):

```
class Node {
    private K key;
    private Node left, right;
    private int size;
    // other fields may go here ...
}
```

### Operations

There are several operations in general that we would use with tree structures.

The operation `contains` takes in a key and returns whether or not the key belongs in the tree. In 
the case of maps, the operation `get` takes in a key and returns the value associated with the key 
in the tree. Also in the case of maps, the operation `put` takes in a (key, value) pair and inserts 
it into the tree in the appropriate place, but if the key already exists in the tree, then it just 
updates the value to the new value. With sets, we insert the key into the tree, and if the tree 
already contains the key, then it does nothing.

We may want operations `max` and `min` to get the maximum and minimum keys in the tree, 
respectively. The operations `delete`, `deleteMin` and `deleteMax` removes (key, value) pair with 
some key, removes the (key, value) pair with the maximum key, and removes the (key, value) pair with 
the minimum key, respectively.

We may also want oeprations `floor`, which returns the largest key less than or equal to the given 
key, `ceil`, which returns the smallest key greater than or equal to the given key, `select`, which 
returns the k-th smallest key in the tree, and `rank`, which returns the number of keys less than 
the given key.
