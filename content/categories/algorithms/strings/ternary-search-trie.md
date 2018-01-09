# Ternary Search Trie

A ternary search trie is a trie data structure in which all nodes have exactly $3$ children: `left`,
`mid`, and `right`. The main approach to this data structure is that whenever we insert a particular
`(key, val)` pair, we create nodes from the string `key` character by character. If the current
character is lexicographically less than the character of the current node, then we traverse to the 
left node. If the current character is lexicographically greater than the character of the current 
node, then we traverse to the right node. Otherwise, we traverse down the middle node. We want to 
make sure that the last node traversed was down a middle node. If we are performing the operation
`get`, if the middle node is `null`, then we must return `null`. Otherwise, we return the `val`
associated at that node. On the other hand, if we are performing the operation `contains`, if the 
middle node is `null`, then we must return `false`. Otherwise, we return `true`.

Its main differences between the ternary search trie and the R-way trie is that the ternary search 
trie is less time efficient than the R-way trie, and this must be so because with only $3$ children,
it is almost guaranteed that as we traverse down the trie, we will encounter at least one 
"extraneous" characters, whereas with the R-way trie, we are guaranteed that the height of the tree
is at most the length of the longest string key inserted. Its main advantage is that the ternary 
search trie is vastly more space efficient than the R-way trie, as each node has only $3$ children,
compared to the R-way trie where each node has $R$ children, and in certain character encodings
(like Unicode-16), $R$ can be as large as $65535$.

### Visualization

Suppose that we have the following `(key, val)` pairs to store into a map:

```
("daba", 0)
("abra", 1)
("abracad", 2)
("aba", 3)
("braca", 4)
("dabra", 5)
("rabra", 6)
```

Then the ternary search trie becomes built starting from a node with 3 children, containing the 
character `d`. Then we create a new `mid` node, and traverse down the `mid` node and assign the 
character `a` to it. Then we create a new `mid` node, and traverse down the `mid` node and assign
the character `b` to it. Then we create a new `mid` node, and traverse down the `mid` node and
assign the character `a` to it, where we store the associated value, `0`. For the second 
`(key, value)` pair, we first traverse to the left because character `a` is lexicographically less 
than `d`. And then traverse downwards the middle to eventually assign the last node with the value 
`1`. And so on, we do this for all of the `(key, val)` pairs, and end up with the following ternary
search trie:

<img src="https://firebasestorage.googleapis.com/v0/b/algorithm-helper-storage.appspot.com/o/img%2Falgorithms%2Fstrings%2Fternary-search-trie.png?alt=media&token=d571bcd5-205c-4e9a-a658-aad22889c873" alt="Ternary Search Trie" class="img-fluid">

Note that while all nodes have $3$ children, null child nodes are not drawn for brevity. Only for 
the strings we inserted do we have a value associated with them, every other node is `null`. Thus, 
the main idea is that if we take a `key`, traverse down the ternary search trie by order of its
characters, and arrive at a final node that has a `val`, we get the `val` associated with that 
`key`. Otherwise, the `key` does not exist.

### Nodes

In the case of using the ternary search trie as a map, the nodes store $3$ children: `left`, `mid`,
and `right`. They also have a field `value`. The following is a snippet of Java code for the `Node` 
class:

```
class Node {
    Object value;
    Node left;
    Node mid;
    Node right;
    // other fields may go here...
}
```

In the case of using the ternary search trie as a set, the nodes store $3$ children: `left`, `mid`,
and `right`. They also have a boolean field `value`. The following is a snippet of Java code for the 
`Node` class:

```
class Node {
    boolean value;
    Node left;
    Node mid;
    Node right;
    // other fields may go here...
}
```

### Operations

- `get`
    - Given a string `key`, we go through it character by character. Starting from the root node,
    if the first character of the key matches the character of the node, we traverse down its `mid` 
    node, assuming that it is not `null`. If the key character is lexicographically less than the 
    character of the node, we traverse down its `left` node, assuming it is not `null`. If the key 
    character is lexicographically greater than the character of the node, we traverse down its 
    `right` node, assuming it is not `null`. In the cases that we reach a node that is `null`, we 
    return `null`, indicating that the given `key` was not found. When we arrive at the final node, 
    we return the `val` at that node.
- `contains`
    - This is the same idea as `get`. Given a string `key`, we go through it character by character. 
    Starting from the root node, if the first character of the key matches the character of the 
    node, we traverse down its `mid` node, assuming it is not `null`. If the key character is 
    lexicographically less than the character of the node, we traverse down its `left` node, 
    assuming it is not `null`. If the key character is lexicographically greater than the character 
    of the node, we traverse down its `right` node, assuming it is not `null`. In the cases that we 
    reach a node that is `null`, we return `false`, indicating that the given `key` was not found. 
    When we arrive at the final node, if the `val` at that node is `null`, we return `false`, and 
    `true` otherwise.
- `put`
    - Given a string `key`, we go through it character by character. Starting from the root node, if 
    the first character of the key matches the character of the node, we traverse down its `mid` 
    node, assuming it is not `null`. If the key character is lexicographically less than the 
    character of the node, we traverse down its `left` node, assuming it is not `null`. If the key 
    character is lexicographically greater than the character of the node, we traverse down its 
    `right` node, assuming it is not `null`. In the cases that we reach a node that is `null`, we 
    return create a new node at that position. When we reach the final node, we assign its `val`.
- `delete`
    - This is the same idea as `put`. Given a string `key`, we go through it character by character. 
    Starting from the root node, if the first character of the key matches the character of the 
    node, we traverse down its `mid` node, assuming it is not `null`. If the key character is 
    lexicographically less than the character of the node, we traverse down its `left` node, 
    assuming it is not `null`. If the key character is lexicographically greater than the character 
    of the node, we traverse down its `right` node, assuming it is not `null`. In the cases that we 
    reach a node that is `null`, we return and do nothing. When we reach the final node, we assign 
    its `val` to be `null`.
    
### Implementation (Map)

##### Java

```
package com.algorithmhelper.datastructures.strings;

import com.algorithmhelper.datastructures.interfaces.Map;
import com.algorithmhelper.datastructures.interfaces.Queue;
import com.algorithmhelper.datastructures.lists.QueueDynamicArray;

public class TernarySearchTrieMap<V> implements Map<String, V> {

    private int n;
    private Node root;

    private class Node {
        V val;
        char c;
        Node left;
        Node mid;
        Node right;
    }

    /**
     * Initializes an empty TernarySearchTrieMap.
     */
    public TernarySearchTrieMap() {
        n = 0;
        root = new Node();
    }

    /**
     * Returns true if the TernarySearchTrieMap is empty, false otherwise.
     *
     * @return true if the TernarySearchTrieMap is empty, false otherwise
     */
    public boolean isEmpty() {
        return n == 0;
    }

    /**
     * Returns the number of elements in the TernarySearchTrieMap.
     *
     * @return the number of elements in the TernarySearchTrieMap
     */
    public int size() {
        return n;
    }

    /**
     * Returns the value associated with the key in the TernarySearchTrieMap.
     *
     * @param key, the key to be searched for
     * @return the value associated with the key in the TernarySearchTrieMap
     * @throws IllegalArgumentException if the key is null
     */
    public V get(String key) {
        if (key == null)
            throw new IllegalArgumentException("get with null key");

        Node result = get(root, key, 0);

        if (result == null)
            return null;
        return result.val;
    }

    /**
     * Helper function to return the value associated with the key in the TernarySearchTrieMap.
     *
     * @param node, the current Node being traversed
     * @param key, the key to be searched for
     * @param index, the current char index into the key
     * @return the value associated with the key in the TernarySearchTrieMap
     */
    private Node get(Node node, String key, int index) {
        if (node == null)
            return null;

        char c = key.charAt(index);

        if (c < node.c)
            return get(node.left, key, index);
        else if (c > node.c)
            return get(node.right, key, index);
        else if (index < key.length()-1)
            return get(node.mid, key, index+1);
        return node;
    }

    /**
     * Returns true if the key is contained in the TernarySearchTrieMap, false otherwise.
     *
     * @param key, the key to be searched for
     * @return true if the key is contained in the TernarySearchTrieMap, false otherwise
     * @throws IllegalArgumentException if the key is null
     */
    public boolean contains(String key) {
        if (key == null)
            throw new IllegalArgumentException("contains with null key");
        return get(root, key, 0) != null;
    }

    /**
     * Inserts the (key, val) pair into the TernarySearchTrieMap, but if the value is null, then
     * delete the element with the associated key.
     *
     * @param key, the key to be inserted
     * @param val, the val associated with the key
     * @throws IllegalArgumentException if the key is null
     */
    public void put(String key, V val) {
        if (key == null)
            throw new IllegalArgumentException("put with null key");
        root = put(root, key, val, 0);
        n++;
    }

    /**
     * Helper function to insert the (key, val) pair into the TernarySearchTrieMap.
     *
     * @param node, the current Node being traversed
     * @param key, the key to be searched for
     * @param val, the val associated with the key
     * @param index, the current char index into the key
     * @return the node after being updated
     */
    private Node put(Node node, String key, V val, int index) {
        char c = key.charAt(index);
        if (node == null) {
            node = new Node();
            node.c = c;
        }

        if (c < node.c)
            node.left = put(node.left, key, val, index);
        else if (c > node.c)
            node.right = put(node.right, key, val, index);
        else if (index < key.length()-1)
            node.mid = put(node.mid, key, val, index+1);
        else
            node.val = val;
        return node;
    }

    /**
     * Removes the key from the TernarySearchTrieMap.
     *
     * @param key, the key to be removed
     * @throws IllegalArgumentException if the key is null
     */
    public void delete(String key) {
        if (key == null)
            throw new IllegalArgumentException("delete with null key");

        root = delete(root, key, 0);
        n--;
    }

    /**
     * Helper function for delete.
     *
     * @param node, the current Node being traversed
     * @param key, the key to be searched for
     * @param index, the current char index into the key
     * @return the node after being updated
     */
    private Node delete(Node node, String key, int index) {
        char c = key.charAt(index);
        if (node == null) {
            node = new Node();
            node.c = c;
        }

        if (c < node.c)
            node.left = delete(node.left, key, index);
        else if (c > node.c)
            node.right = delete(node.right, key, index);
        else if (index < key.length()-1)
            node.mid = delete(node.mid, key, index+1);
        else
            node.val = null;
        return node;
    }

    /**
     * Returns an Iterable to the keys of the TernarySearchTrieMap.
     *
     * @return an Iterable to the keys of the TernarySearchTrieMap
     */
    public Iterable<String> keys() {
        Queue<String> queue = new QueueDynamicArray<>();
        keys(root.left, queue, Character.toString(root.left.c));
        keys(root.mid, queue, Character.toString(root.left.c));
        keys(root.right, queue, Character.toString(root.left.c));
        return queue;
    }

    /**
     * Helper function for keys.
     *
     * @param node, the current Node being traversed
     * @param key, the key to be searched for
     * @return an Iterable to the keys found at this current node
     */
    private void keys(Node node, Queue<String> queue, String key) {
        if (node == null)
            return;

        if (node.val != null)
            queue.enqueue(key);

        keys(node.left, queue, key + Character.toString(node.left.c));
        keys(node.mid, queue, key + Character.toString(node.left.c));
        keys(node.right, queue, key + Character.toString(node.left.c));
    }
}
```

### Implementation (Set)

##### Java

```
package com.algorithmhelper.datastructures.strings;

import com.algorithmhelper.datastructures.interfaces.Queue;
import com.algorithmhelper.datastructures.interfaces.Set;
import com.algorithmhelper.datastructures.lists.QueueDynamicArray;

public class TernarySearchTrieSet implements Set<String> {

    private int n;
    private Node root;

    private class Node {
        boolean val = false;
        char c;
        Node left;
        Node mid;
        Node right;
    }

    /**
     * Initializes an empty TernarySearchTrieSet.
     */
    public TernarySearchTrieSet() {
        n = 0;
        root = new Node();
    }

    /**
     * Returns true if the TernarySearchTrieSet is empty, false otherwise.
     *
     * @return true if the TernarySearchTrieSet is empty, false otherwise
     */
    public boolean isEmpty() {
        return n == 0;
    }

    /**
     * Returns the number of elements in the TernarySearchTrieSet.
     *
     * @return the number of elements in the TernarySearchTrieSet
     */
    public int size() {
        return n;
    }

    /**
     * Returns true if the key is contained in the TernarySearchTrieSet, false otherwise.
     *
     * @param key, the key to be searched for
     * @return true if the key is contained in the TernarySearchTrieSet, false otherwise
     * @throws IllegalArgumentException if the key is null
     */
    public boolean contains(String key) {
        if (key == null)
            throw new IllegalArgumentException("contains with null key");
        return contains(root, key, 0);
    }

    /**
     * Helper function to return true if the key is contained in the TernarySearchTrieSet, false
     * otherwise.
     *
     * @param node, the current Node being traversed
     * @param key, the key to be searched for
     * @param index, the current char index into the key
     * @return true if the key is contained in the TernarySearchTrieSet, false otherwise
     */
    private boolean contains(Node node, String key, int index) {
        if (node == null)
            return false;

        char c = key.charAt(index);

        if (c < node.c)
            return contains(node.left, key, index);
        else if (c > node.c)
            return contains(node.right, key, index);
        else if (index < key.length()-1)
            return contains(node.mid, key, index+1);
        return true;
    }

    /**
     * Inserts the key into the TernarySearchTrieSet.
     *
     * @param key, the key to be inserted
     * @throws IllegalArgumentException if the key is null
     */
    public void put(String key) {
        if (key == null)
            throw new IllegalArgumentException("put with null key");
        root = put(root, key, 0);
        n++;
    }

    /**
     * Helper function to insert the key into the TernarySearchTrieSet.
     *
     * @param node, the current Node being traversed
     * @param key, the key to be searched for
     * @param index, the current char index into the key
     * @return the node after being updated
     */
    private Node put(Node node, String key, int index) {
        char c = key.charAt(index);
        if (node == null) {
            node = new Node();
            node.c = c;
        }

        if (c < node.c)
            node.left = put(node.left, key, index);
        else if (c > node.c)
            node.right = put(node.right, key, index);
        else if (index < key.length()-1)
            node.mid = put(node.mid, key, index+1);
        else
            node.val = true;
        return node;
    }

    /**
     * Removes the key from the TernarySearchTrieSet.
     *
     * @param key, the key to be removed
     * @throws IllegalArgumentException if the key is null
     */
    public void delete(String key) {
        if (key == null)
            throw new IllegalArgumentException("delete with null key");

        root = delete(root, key, 0);
        n--;
    }

    /**
     * Helper function for delete.
     *
     * @param node, the current Node being traversed
     * @param key, the key to be searched for
     * @param index, the current char index into the key
     * @return the node after being updated
     */
    private Node delete(Node node, String key, int index) {
        char c = key.charAt(index);
        if (node == null) {
            node = new Node();
            node.c = c;
        }

        if (c < node.c)
            node.left = delete(node.left, key, index);
        else if (c > node.c)
            node.right = delete(node.right, key, index);
        else if (index < key.length()-1)
            node.mid = delete(node.mid, key, index+1);
        else
            node.val = false;
        return node;
    }

    /**
     * Returns an Iterable to the keys of the TernarySearchTrieSet.
     *
     * @return an Iterable to the keys of the TernarySearchTrieSet
     */
    public Iterable<String> keys() {
        Queue<String> queue = new QueueDynamicArray<>();
        keys(root.left, queue, Character.toString(root.left.c));
        keys(root.mid, queue, Character.toString(root.left.c));
        keys(root.right, queue, Character.toString(root.left.c));
        return queue;
    }

    /**
     * Helper function for keys.
     *
     * @param node, the current Node being traversed
     * @param key, the key to be searched for
     * @return an Iterable to the keys found at this current node
     */
    private void keys(Node node, Queue<String> queue, String key) {
        if (node == null)
            return;

        if (node.val)
            queue.enqueue(key);

        keys(node.left, queue, key + Character.toString(node.left.c));
        keys(node.mid, queue, key + Character.toString(node.left.c));
        keys(node.right, queue, key + Character.toString(node.left.c));
    }
}
```

### Time Complexity

If we had all random string keys, then it would follow that as we build up the ternary search trie,
all operations (i.e. `get`, `contains`, `put`, `delete`) involve reducing the search space by $3$
each time, and we should be expecting the height of the trie to be $log_3N$, and thus for all
operations, it runs in time proportional to $O(logN)$. Since each node requires exactly $3$ 
children, it follows that we need about $3N$ space, and thus need space proportional to $O(N)$.

```
| Data Structure      | space complexity | get     | contains | put     | delete  |
|---------------------|------------------|---------|----------|---------|---------|
| ternary search trie | O(N)             | O(logN) | O(logN)  | O(logN) | O(logN) |
```
