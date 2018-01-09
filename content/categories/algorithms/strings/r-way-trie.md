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

<img src="https://firebasestorage.googleapis.com/v0/b/algorithm-helper-storage.appspot.com/o/img%2Falgorithms%2Fstrings%2Ftrie.png?alt=media&token=ca38f8ed-bac4-4deb-9d43-fb3dd0e2a983" alt="Trie" class="img-fluid">

Note that while all nodes have $R$ children, null child nodes are not drawn for brevity. Only for 
the strings we inserted do we have a value associated with them, every other node is `null`. Thus, 
the main idea is that if we take a `key`, traverse down the R-way trie by order of its characters, 
and arrive at a final node that has a `val`, we get the `val` associated with that `key`. Otherwise, 
the `key` does not exist.

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

```
package com.algorithmhelper.datastructures.strings;

import com.algorithmhelper.datastructures.interfaces.Map;
import com.algorithmhelper.datastructures.interfaces.Queue;
import com.algorithmhelper.datastructures.lists.QueueDynamicArray;

public class RWayTrieMap<V> implements Map<String, V> {

    private int n;
    private Node root;

    private class Node {
        V val;
        Node[] children;

        public Node() {
            val = null;
            children = (Node[]) new Object[Character.MAX_RADIX];
        }
    }

    /**
     * Initializes an empty RWayTrieMap.
     */
    public RWayTrieMap() {
        n = 0;
        root = new Node();
    }

    /**
     * Returns true if the RWayTrieMap is empty, false otherwise.
     *
     * @return true if the RWayTrieMap is empty, false otherwise
     */
    public boolean isEmpty() {
        return n == 0;
    }

    /**
     * Returns the number of elements in the RWayTrieMap.
     *
     * @return the number of elements in the RWayTrieMap
     */
    public int size() {
        return n;
    }

    /**
     * Returns the value associated with the key in the RWayTrieMap.
     *
     * @param key, the key to be searched for
     * @return the value associated with the key in the RWayTrieMap
     * @throws IllegalArgumentException if the key is null
     */
    public V get(String key) {
        if (key == null)
            throw new IllegalArgumentException("get with null key");
        return get(root, key, 0);
    }

    /**
     * Helper function to return the value associated with the key in the RWayTrieMap.
     *
     * @param node, the current Node being traversed
     * @param key, the key to be searched for
     * @param index, the current char index into the key
     * @return the value associated with the key in the RWayTrieMap
     */
    private V get(Node node, String key, int index) {
        if (node == null)
            return null;

        if (index == key.length()) {
            return node.val;
        }

        char nextIndex = key.charAt(index);
        return get(node.children[nextIndex], key,index+1);
    }

    /**
     * Returns true if the key is contained in the RWayTrieMap, false otherwise.
     *
     * @param key, the key to be searched for
     * @return true if the key is contained in the RWayTrieMap, false otherwise
     * @throws IllegalArgumentException if the key is null
     */
    public boolean contains(String key) {
        if (key == null)
            throw new IllegalArgumentException("contains with null key");
        return get(root, key, 0) != null;
    }

    /**
     * Inserts the (key, val) pair into the RWayTrieMap, but if the value is null, then delete the
     * element with the associated key.
     *
     * @param key, the key to be inserted
     * @param val, the val associated with the key
     * @throws IllegalArgumentException if the key is null
     */
    public void put(String key, V val) {
        if (key == null)
            throw new IllegalArgumentException("put with null key");
        if (val == null) {
            delete(root, key, 0);
            return;
        }

        root = put(root, key, val, 0);
        n++;
    }

    /**
     * Helper function to insert the (key, val) pair into the RWayTrieMap.
     *
     * @param node, the current Node being traversed
     * @param key, the key to be searched for
     * @param val, the val associated with the key
     * @param index, the current char index into the key
     * @return the node after being updated
     */
    private Node put(Node node, String key, V val, int index) {
        if (node == null)
            node = new Node();

        if (index == key.length()) {
            node.val = val;
            return node;
        }

        char nextIndex = key.charAt(index);
        node.children[nextIndex] = put(node.children[nextIndex], key, val, index+1);
        return node;
    }

    /**
     * Removes the key from the RWayTrieMap.
     *
     * @param key, the key to be removed
     * @throws IllegalArgumentException if the key is null
     */
    public void delete(String key) {
        if (key == null)
            throw new IllegalArgumentException("put with null key");
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
        if (node == null)
            node = new Node();

        if (index == key.length()) {
            node.val = null;
            return node;
        }

        char nextIndex = key.charAt(index);
        node.children[nextIndex] = delete(node.children[nextIndex], key, index+1);
        return node;
    }

    /**
     * Returns an Iterable to the keys of the RWayTrieMap.
     *
     * @return an Iterable to the keys of the RWayTrieMap
     */
    public Iterable<String> keys() {
        Queue<String> queue = new QueueDynamicArray<>();

        for (int i = 0; i < Character.MAX_RADIX; i++) {
            Node current = root.children[i];

            if (current == null)
                continue;

            keys(current, queue, Character.toString((char) i));
        }

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

        for (int i = 0; i < Character.MAX_RADIX; i++) {
            Node current = node.children[i];

            if (current == null)
                continue;

            keys(current, queue, key + Character.toString((char) i));
        }
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

public class RWayTrieSet implements Set<String> {

    private int n;
    private Node root;

    private class Node {
        boolean val;
        Node[] children;

        public Node() {
            val = false;
            children = (Node[]) new Object[Character.MAX_RADIX];
        }
    }

    /**
     * Initializes an empty RWayTrieSet.
     */
    public RWayTrieSet() {
        n = 0;
        root = new Node();
    }

    /**
     * Returns true if the RWayTrieSet is empty, false otherwise.
     *
     * @return true if the RWayTrieSet is empty, false otherwise
     */
    public boolean isEmpty() {
        return n == 0;
    }

    /**
     * Returns the number of elements in the RWayTrieSet.
     *
     * @return the number of elements in the RWayTrieSet
     */
    public int size() {
        return n;
    }

    /**
     * Returns true if the key is contained in the RWayTrieSet, false otherwise.
     *
     * @param key, the key to be searched for
     * @return true if the key is contained in the RWayTrieSet, false otherwise
     * @throws IllegalArgumentException if the key is null
     */
    public boolean contains(String key) {
        if (key == null)
            throw new IllegalArgumentException("contains with null key");
        return contains(root, key, 0);
    }

    /**
     * Helper function to return true if the key is contained in the RWayTrieSet, false otherwise.
     *
     * @param node, the current Node being traversed
     * @param key, the key to be searched for
     * @param index, the current char index into the key
     * @return true if the key is contained in the RWayTrieSet, false otherwise
     */
    private boolean contains(Node node, String key, int index) {
        if (node == null)
            return false;

        if (index == key.length()) {
            return node.val;
        }

        char nextIndex = key.charAt(index);
        return contains(node.children[nextIndex], key,index+1);
    }

    /**
     * Inserts the key into the RWayTrieSet.
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
     * Helper function to insert the key pair into the RWayTrieSet.
     *
     * @param node, the current Node being traversed
     * @param key, the key to be searched for
     * @param index, the current char index into the key
     * @return the node after being updated
     */
    private Node put(Node node, String key, int index) {
        if (node == null)
            node = new Node();

        if (index == key.length()) {
            node.val = true;
            return node;
        }

        char nextIndex = key.charAt(index);
        node.children[nextIndex] = put(node.children[nextIndex], key, index+1);
        return node;
    }

    /**
     * Removes the key from the RWayTrieSet.
     *
     * @param key, the key to be removed
     * @throws IllegalArgumentException if the key is null
     */
    public void delete(String key) {
        if (key == null)
            throw new IllegalArgumentException("put with null key");
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
        if (node == null)
            node = new Node();

        if (index == key.length()) {
            node.val = false;
            return node;
        }

        char nextIndex = key.charAt(index);
        node.children[nextIndex] = delete(node.children[nextIndex], key, index+1);
        return node;
    }

    /**
     * Returns an Iterable to the keys of the RWayTrieSet.
     *
     * @return an Iterable to the keys of the RWayTrieSet
     */
    public Iterable<String> keys() {
        Queue<String> queue = new QueueDynamicArray<>();

        for (int i = 0; i < Character.MAX_RADIX; i++) {
            Node current = root.children[i];

            if (current == null)
                continue;

            keys(current, queue, Character.toString((char) i));
        }

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

        for (int i = 0; i < Character.MAX_RADIX; i++) {
            Node current = node.children[i];

            if (current == null)
                continue;

            keys(current, queue, key + Character.toString((char) i));
        }
    }
}
```

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
