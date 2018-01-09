# Union Find / Disjoint Set

A union find, or disjoint set, is a data structure concerned with the problem of dynamic 
connectivity of connected components Mathematically, given a set of elements that are partitioned 
into disjoint, non-overlapping subsets, union finds have the operation `union` to merge two subsets, 
and the operation `connected` to determine if two elements belong to the same subset.

### Connected Components

Connected components are elements that are commonly connected to each other in sets, where none of 
the elements in one connected component belong to another connected component, otherwise they would 
both be in the same connected component.

Dynamic connectivity refers to a data structure that is able to keep track of these connected 
components, and answer queries for whether or not two elements are part of the same connected 
component, and to connect two elements to the same connected component.

The following is an example of representing connected components in two ways, mathematically as a 
set, and visually as an undirected graph:

```
// Set:
// Suppose we have the following subsets of {1, 2, ... 10}:

{1, 2, 3} {4, 5, 6} {7, 8} {9} {10}

// Then:
// {1, 2, 3} is a connected component,
// {4, 5, 6} is a connected component,
// {7, 8} is a connected component,
// {9} is a connected component,
// {10} is a connected component


// Undirected Graph:
// Suppose we had the following graph:

1 - 2   5 - 6 - 7   10
|
3 - 4   8 - 9

// Then:
// {1, 2, 3, 4} is a connected component,
// {5, 6, 7} is a connected component,
// {8, 9} is a connected component,
// {10} is a connected component
```

### Visualization

The following visualizes the state of the union find/disjoint set, starting from an initial set and 
empty union find:

```
// Suppose the set we have is {1, 2, ... 8}

// Then our union find would look like:
{1} {2} {3} {4} {5} {6} {7} {8}

// union(1, 2):
{1, 2} {3} {4} {5} {6} {7} {8}

// union(5, 8):
{1, 2} {3} {4} {5, 8} {6} {7}

// union(4, 8):
{1, 2} {3} {4, 5, 8} {6} {7}

// union(1, 7):
{1, 2, 7} {3} {4, 5, 8} {6}

// connected(1, 2) -> true

// connected(3, 4) -> false

// union(3, 4):
{1, 2, 7} {3, 4, 5, 8} {6}

// connected(3, 4) -> true
```

### Operations

Note that although this data structure is implemented in an array, when we perform `union` 
operations, we build a tree. Consider a naive implementation of union find, where in an array `a` 
at some index `i` we store value of the connected component of `i`. Then if we call `connected` on 
two elements `i` and `j`, it can be done in $O(1)$ time since all we have to do is compare `a[i]` 
and `a[j]` and whether they are equal. However, when we need to call `union`, then, without loss of 
generality, we would have to update all elements in the array that is of connected component `a[j]` 
with `a[i]`, which is done in $O(N)$ time.

However, the way to make both operations run in $O(logN)$ time, is to represent the connected 
components as a forest. More on tree terminology can be read in the 
[Introduction](/categories/data-structures/trees/introduction) article for trees. At `a[i]` we store 
the value of the root of the tree, and all other elements that have the same root are part of the 
same connected component.

However, one problem with a naive implementation of this is that we may end up with unbalanced 
trees, which does not guarantee us logarithmic time. Instead, we always link the root of the smaller 
tree to the larger tree. The following is a visualization of this:

```
// Suppose we had the following disjoint sets:
{1, 2, 3} {4, 5, 6, 7, 8}

// And for example, that corresponds to the following trees:

  2                 6
 / \               / \
1   3             5   7  
                 /     \
                4       8

// Then when we union(1, 5) for example, we link the root of the smaller 
// tree, namely 2, to the root of the larger tree, namely 6:

                      6
                   /  |  \
                  5   2   7  
                 /   / \   \
                4   1   3   8

```

So we maintain two arrays, `id` and `size`. The `id` array keeps track of the root of the connected 
component of the element at index `i`. The `size` array keeps track of the size of the tree root at 
index `i`. All values in `size` are initialized to 1.

- `union`
    - Merge the connected component of element `i` with element `j`, assuming 
    they are not already in the same connected component, compare 
    `size[i]` and `size[j]`. Without loss of generally, suppose `size[i]` is
    larger, then update the `id` value of the smaller element to the larger 
    element, (`id[j] = id[i]`) and add the size of the smaller element 
    and add the size of the smaller element to the larger element 
    (`size[i] += size[j]`).
- `connected`
    - Traverse up the tree of `i` and `j` by continuously following their parent 
    `id[i]` and `id[j]`. If the roots of the trees are the same, then return 
    `true`, otherwise return `false`.

### Implementation

##### Java

```
package com.algorithmhelper.datastructures.trees;

public class UnionFind {

    private int[] id;
    private int[] size;
    private int n;

    /**
     * Initializes a UnionFind, where all elements belong to their own individual connected
     * component.
     *
     * @param n, the capacity of the UnionFind
     * @throws IllegalArgumentException if n <= 0
     */
    public UnionFind(int n) {
        if (n <= 0)
            throw new IllegalArgumentException("constructor with invalid n");

        this.n = n;
        id = new int[n];
        size = new int[n];
        for (int i = 0; i < n; i++) {
            id[i] = i;
            size[i] = 1;
        }
    }

    /**
     * Returns the number of connected components contained in the UnionFind.
     *
     * @return the number of connected components contained in the UnionFind
     */
    public int size() {
        return n;
    }

    /**
     * Returns true if p and q belong to the same connected component, otherwise false.
     *
     * @param p, the first element to be searched
     * @param q, the second element to be searched
     * @return true if p and q belong to the same connected component, otherwise false
     * @throws ArrayIndexOutOfBoundsException if p < 0 or p >= n
     * @throws ArrayIndexOutOfBoundsException if q < 0 or q >= n
     */
    public boolean connected(int p, int q) {
        if (p < 0 || p >= n)
            throw new ArrayIndexOutOfBoundsException("connected with invalid p");
        if (q < 0 || q >= n)
            throw new ArrayIndexOutOfBoundsException("connected with invalid q");

        return find(p) == find(q);
    }

    /**
     * Returns the connected component of p by traversing up its parent to its connected component
     * tree's root.
     *
     * @param p, the first element to be searched
     * @return the connected component of p by traversing up its parent in its connected component
     *         tree.
     * @throws ArrayIndexOutOfBoundsException if p < 0 or p >= n
     */
    private int find(int p) {
        if (p < 0 || p >= n)
            throw new ArrayIndexOutOfBoundsException("connected with invalid p");

        while (p != id[p])
            p = id[id[p]];
        return p;
    }

    /**
     * Changes p to be in the same connected component as q, by pointing p's root to q's root.
     *
     * @throws ArrayIndexOutOfBoundsException if p < 0 or p >= n
     * @throws ArrayIndexOutOfBoundsException if q < 0 or q >= n
     */
    public void union(int p, int q) {
        if (p < 0 || p >= n)
            throw new ArrayIndexOutOfBoundsException("connected with invalid p");
        if (q < 0 || q >= n)
            throw new ArrayIndexOutOfBoundsException("connected with invalid q");

        int i = find(p);
        int j = find(q);

        if (i == j)
            return;

        if (size[i] < size[j]) {
            id[i] = j;
            size[j] += size[i];
        } else {
            id[j] = i;
            size[i] += size[j];
        }
        n--;
    }
}
```

### Time Complexity

The following table describes the time complexity for performing the operations above on a union 
find/disjoint set:

```
| Data Structure          | union  | connected |
|-------------------------|--------|-----------|
| union find/disjoint set | O(lgN) | O(lgN)    |
```