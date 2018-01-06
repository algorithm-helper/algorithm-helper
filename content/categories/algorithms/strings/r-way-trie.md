# R-Way Trie

An R-way trie is a trie data structure in which all nodes have $R$ children, where $R$ is the radix.
The main approach to this data structure is that we build up the trie's nodes from the characters 
of the string keys, and associate values at the last character (last node). In the case of storing 
`(key, val)` pairs in a map, we store the `val` at the last character's node of the key string. In 
the case of using the trie to implement a set, we store boolean values in the each node, setting all 
the character's boolean values to be `false` except the last character, which is set to `true`.

### Visualization

We use the same example as from the article on [tries](/categories/algorithms/strings/trie). Suppose 
that we have the following `(key, val)` pairs to store into a map:

```
("abra", 0)
("abracad", 1)
("aba", 2)
("braca", 3)
("brada", 4)
("dabra", 5)
("daba", 6)
```

Then the R-way trie becomes built starting from a sentinel node with $R$ children. We have a node 
with the character `a`, which has a branch to child node `b`, which has a branch to child node `r`, 
which has a branch to child node `a`, where we store the value `0`. We do this for all of the 
`(key, val)` pairs, and end up with the following R-way trie:

<img src="https://i.imgur.com/dZU8LuB.png" alt="Trie" width="400" height="400">

Note that while all nodes have $R$ children, null child nodes are not drawn for brevity. Only for 
the strings we inserted do we have a value associated with them, every other node is null. Thus, the
main idea is that if we take a `key`, traverse down the R-way trie by order of its characters, and 
arrive at a final node that has a `val`, we get the `val` associated with that `key`. Otherwise, the 
`key` does not exist.

### Nodes

In the case of using the trie as a map, the nodes store an $R$-sized array of nodes `children`, 
denoting their $R$ children. They also have a field `value`. The following is a snippet of Java code
for the `Node` class:

<script src="https://gist.github.com/eliucs/b685b0ff0ff6cc706cdef8d178f64892.js"></script>

In the case of using the trie as a set, the nodes store an $R$-sized array of nodes `children`, 
denoting their $R$ children. They also have a boolean field `value`. The following is a snippet of
Java code for the `Node` class:

<script src="https://gist.github.com/eliucs/6d0e1dc54fda8d6778eb3f22a4842bea.js"></script>

### Operations

- `get`
    - Given a string `key`, we go through it character by character. Starting from the sentinel 
    node, we index into the node's `children` array at the integer representation of the first 
    character of `key`. If the value at that index is `null`, then we stop, and return `null`. If 
    the value at that index is not `null`, then we return the `val` associated with that node.
    Otherwise, continue to the next node. 
- `contains`
    - This is the same idea as `get`. Given a string `key`, we go through it character by character. 
    Starting from the sentinel node, we index into the node's `children` array at the integer 
    representation of the first character of `key`. If the value at that index is `null`, then we 
    stop, and return `false`. If the value at that index is not `null`, then we return the `true`.
    Otherwise, continue to the next node. 
- `put`
    - Given a string `key`, we go through it character by character. Starting from the sentinel 
    node, we index into the node's `children` array at the integer representation of the first 
    character of `key`. If the value at that index is `null`, we create a new `Node` at that index. 
    If it is not null, we traverse to that `Node`. We continue until we reach the end (last
    character) of the `key`, and at that last `Node`, we set its `val`.
- `delete`
    - This is the same idea as `put`. Given a string `key`, we go through it character by character. 
    Starting from the sentinel node, we index into the node's `children` array at the integer 
    representation of the first character of `key`. If the value at that index is `null`, we stop 
    because we tried to delete a `key` that does not exist in the R-way trie. If it is not null, we 
    traverse to that `Node`. We continue until we reach the end (last character) of the `key`, and 
    at that last `Node`, we set its `val` to be `null`. This is the lazy approach to deleting keys.

### Implementation (Map)

##### Java

<script src="https://gist.github.com/eliucs/72cf0ac5f8761c7aa537b98bb5b17e4c.js"></script>

### Implementation (Set)

##### Java

<script src="https://gist.github.com/eliucs/2106080bba3f655d5d546dbd7246ee11.js"></script>

### Time Complexity

With all of the described operations above (`get`, `contains`, `put`, `delete`), we need to traverse
at most $M$ nodes, since the height of the R-way trie only gets as long as the longest string `key`
inserted into it, thus all operations run in time proportional to $O(M)$. However, every node needs
an array of size $R$ of nodes, and with $N$ nodes the R-way trie needs space proportional to 
$O(NR)$. While this data structure is efficient time-wise, it is not space-wise. Although with a 
smaller radix (such as $128$ or $256$ for ASCII or ASCII Extended, respectively), space would be more
managable, with a larger radix such as that for Unicode-16, we need a radix of $65535$. 

```
| Data Structure | space complexity | get  | contains | put  | delete |
|----------------|------------------|------|----------|------|--------|
| r-way trie     | O(NR)            | O(M) | O(M)     | O(M) | O(M)   |
```
