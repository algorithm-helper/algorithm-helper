# Kruskal's Algorithm


Kruskal's Algorithm is an algorithm used to find the minimum spanning tree of a
connected, edge-weighted, undirected graph. It is a greedy algorithm, and its
main approach to finding the minimum spanning tree is to use the Union Find, or
Disjoint Sets data structure.

We maintain a sorted list L of the Edges by weight, and maintain a Union Find
data structure (see notes on the Union Find data structure). For every Edge
(i, j) in L, we check if i and j belong to the same connected component in the
Union Find, if not, then we add this Edge to the current minimum spanning tree,
and union(i, j) in the Union Find.

Pseudocode:

```
V : list of all Vertices

kruskalsAlgorithm(V):
  E: List of all Edges
  MST : List of Edges representing the minimum spanning tree, initialized to be
        empty
  U : UnionFind data structure

  initialize U
  sort E in ascending order by weight
  i = 0

  while (MST.length != V.length):
    nextEdge : next Edge of least weight
    nextEdge = E[i]

    a : first Vertex in nextEdge
    b : second Vertex in nextEdge

    if a and b are not both contained in MST and U.find(a) != U.find(b):
      c = between a and b, the one that is not already in MST
      MST.push(c)
      U.union(a, b)

    i++
```

Determining the time complexity of the algorithm is fairly straightforward.
Sorting the Edges by Edge weight takes O(ElgE) time using a comparison sort, for
example with Quick Sort. Checking if for every Edge (i, j) in L belong to the
same connected component takes O(lglgV) time and union(i, j) takes O(1) time
using a Union Find that is weighted and uses path compression. Since in sparse
graphs we can consider E = O(V) and in dense graphs we can consider E = O(V^2),
the operations on the Union Find can be ignored. Since we need to add Edges that
connect all of the Vertices, we must add every Vertex to the minimum spanning
tree, and takes O(V) time, but this is overpowered by O(ElgE). Thus this
algorithm runs in O(ElgE) time.

In terms of space complexity, we require a list of size E for sorting the
Edges by Edge weight, that requires O(E) space. We require a Union Find that
contains all V Vertices, that requires O(V) space. Thus the total space
complexity is O(V + E).

### Implementation

##### Java

View the source code here.

```
```

### Time Complexity
