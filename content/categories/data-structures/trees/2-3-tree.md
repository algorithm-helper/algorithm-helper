# 2-3 Tree

A 2-3 tree is a balanced tree structure where nodes can contain either 2 children (called a 2-node) 
or 3 children (called a 3-node). In a 3-node, we would have pointers to the `left`, `middle`, and 
`right` children, where the `key` of the `left` is less than the `key` of the `middle`, and the 
`key` of the `middle` is less than the `key` of the `right`. Overall, `key` values in the `left` 
subtree is less than the `key` of the node, and the `key` of the node is less than the `key` of the 
`right` subtree, just like in a regular binary search tree.

Since we are always able to maintain balance, the distance from the root to any leaf in the tree is 
always less than or equal to $logN$, where $N$ is the number of elements in the tree, and thus the 
time complexity for operations like `get`, `put`, or `delete` is always $O(logN)$.

However, implementing this exact description of a 2-3 tree is difficult in practice, but this can be 
done using the [Red-Black Tree](/categories/data-structures/trees/red-black-tree), which is modelled 
after the 2-3 tree.

### Algorithm

For inserting elements into the 2-3 tree, we use the following the algorithm:

```
1. If the tree is empty, create a root 2-Node, and put the key into the tree.

2. Else traverse down the tree and find the leaf Node where the key belongs.

3. If this leaf Node is a 2-Node, insert the key into it to make it a 3-Node.

4. Else make a temporary 4-Node, then split this such that the middle key gets
   promoted up a level, and the left and right now become its children.

5. If this causes the original parent Node to split as well (because it was
   also a 3-Node already), then split this and promote the middle key, keep
   doing this until no more splits are necessary.
```

### Visualization

The following visualizes the state of a 2-3 tree, starting from an empty tree:

```
// Suppose we initialize an empty 2-3 Tree:

// insert(10):

                        10
                       /  \

// insert(15): 
// Now 10 and 15 become a 3-Node:

                      10 - 15
                     /   |   \

// insert(7):
// Now we get a temporary 4-Node:

                    7 - 10 - 15
                  /   |    |   \

// But the middle key gets promoted up:

                        10
                       /  \
                      7    15
                     / \   / \      

// insert(5):
// Now 5 and 7 become a 3-Node:

                        10
                      /    \
                   5 - 7    15
                  / \ / \   / \

// insert(6):
// Now we get a temporary 4-Node:

                        10
                      /    \
                 5 - 6 - 7  15
                /  |   |  \ / \

// But the middle key gets promoted up:

                      6 - 10
                     /  |   \
                    5   7    15

// insert(3):
// Now 3 and 5 become a 3-Node:

                      6 - 10
                  /     |     \
               4 - 5    7      15
              /  |  \  / \     / \

// insert(2):
// Now we get a temporary 4-Node:

                      6 - 10
                 /      |     \
            2 - 4 - 5   7      15
           /  |   |  \ / \     / \

// But the middle key gets promoted up, but this creates
// another temporary 4-Node:

                    4 - 6 - 10
                  /   |   |   \
                 2    5   7    15
                / \  / \ / \   / \

// Then the middle key gets promoted up again, and both
// sides are still balanced:

                        6
                      /   \
                     4     10
                    / \    / \
                   2   5  7   15 
```
