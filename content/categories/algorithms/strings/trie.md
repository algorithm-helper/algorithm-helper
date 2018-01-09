# Trie

A trie is a tree data structure and abstract data type for maps and sets using only string keys. 
The main approach to this data structure is that we build up the tree's nodes from the characters
of the string keys, and each node has $R$ children, where $R$ is the radix. In the case of storing
`(key, val)` pairs in a map, we store the `val` at the last character's node of the key string.
In the case of using the trie to implement a set, we store boolean values in the each node, setting
all the character's boolean values to be `false` except the last character, which is set to `true`.
We will be exploring two efficient implementations of the trie data structure: the R-way trie, and
the ternary search trie. 

Tries make for efficient maps and sets. In the case of the R-way trie for example, the tree's height
is only as long as the longest key inserted in it, and thus searching is done in $O(M)$ time, where
$M$ is the length of the longest key. It is not space efficient however, as every node needs $R$
amount of children. Further is discussed in the article on the 
[R-way trie](/categories/algorithms/strings/r-way-trie). The shortcomings of the R-way trie are 
overcome with the [ternary search trie](/categories/algorithms/strings/ternary-search-trie). 

### Nodes

In the case of using the trie as a map, the nodes store an $R$-sized array of nodes `children`, 
denoting their $R$ children. They also have a field `value`. The following is a snippet of Java code
for the `Node` class:

```
class Node {
    Object value;
    Node[] children = new Node[65535];
    // other fields may go here...
}
```

In the case of using the trie as a set, the nodes store an $R$-sized array of nodes `children`, 
denoting their $R$ children. They also have a boolean field `value`. The following is a snippet of
Java code for the `Node` class:

```
class Node {
    boolean value;
    Node[] children = new Node[65535];
    // other fields may go here...
}
```

### Visualization

We consider the visualization of the R-way trie, since it is the basic version of the trie data 
structure and outlines very clearly the advantages (and disadvantages) of this structure over tree
maps or hash maps with string keys.

Suppose that we have the following `(key, val)` pairs to store into a map:

```
("abra", 0)
("abracad", 1)
("aba", 2)
("braca", 3)
("brada", 4)
("dabra", 5)
("daba", 6)
```

Then the trie becomes built starting from a sentinel node with $R$ children. We have a node with 
the character `a`, which has a branch to child node `b`, which has a branch to child node `r`, 
which has a branch to child node `a`, where we store the value `0`. We do this for all of the 
`(key, val)` pairs, and end up with the following trie:

<img src="https://firebasestorage.googleapis.com/v0/b/algorithm-helper-storage.appspot.com/o/img%2Falgorithms%2Fstrings%2Ftrie.png?alt=media&token=ca38f8ed-bac4-4deb-9d43-fb3dd0e2a983" alt="Trie" class="img-fluid">

Note that while all nodes have $R$ children, null child nodes are not drawn for brevity. Only for 
the strings we inserted do we have a value associated with them, every other node is null. Thus, the
main idea is that if we take a `key`, traverse down the trie by order of its characters, and arrive 
at a final node that has a `val`, we get the `val` associated with that `key`. Otherwise, the `key`
does not exist.
