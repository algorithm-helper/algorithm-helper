# Kruskal's Algorithm

Kruskal's algorithm is an algorithm used to find the minimum spanning tree of a connected, edge
weighted, undirected graph. It is a greedy algorithm, and its main approach to finding the 
minimum spanning tree is to use the union find data structure. It uses the same idea as the 
algorithm described on the article on 
[Minimum Spanning Trees](/categories/algorithms/graphs/minimum-spanning-tree), where we 
continuously add the next minimum weight crossing edge, such that adding it does not create a cycle.

### Observations

We will start off with a sorted list `L` of all of the edges by weight, and maintain a union find.
For every edge `(u, v)` in `L`, we check if `u` and `v` belong to the same connected component
by calling `connected(u, v)`. If they do, we skip it, and move on to the next edge. Otherwise, we 
add the edge (and its associated other vertex) to the minimum spanning tree, and `union(u, v)` in 
the union find. We repeat this until our minimum spanning tree's edge set is of size `|V|-1`.

Pseudocode:

```
kruskalsAlgorithm(G):
  MST: minimum spanning tree, initialized to be empty
  U : union find data structure
  L : list of all the edges of G
  
  initialize U
  sort L in ascending order by weight

  while |E(MST)| != |V(G)| - 1:
    minEdge : next edge from L
    u : first vertex in minEdge
    v : second vertex in minEdge

    if U.connected(u, v):
      continue

    add u and v to V(MST)
    add (u, v) to E(MST)

    union(u, v)

  return MST
```

Determining time complexity of the algorithm is fairly straightforward. Sorting the edges by edge
weight takes `O(|E|log|E|)` time using a comparison sort like quicksort. Checking an edge `(u, v)`
in `L` belong to the same connected component takes `O(loglog|V|)` time, and `union(u, v)` takes 
`O(1)` time using a union find that is weighted and uses path compression. 

Since in sparse graphs, we have that `|E|` is proportional to `O(|V|)` and in dense graphs, `|E|`
is proportional to `O(|V|^2)`, the operations done with the union find can be ignored. Since we
need to add edges that connect all of the vertices, we must add every vertex to the minimum 
spanning tree, and takes `O(|V|)` time, but this is overpowered by `O(|E|log|E|)`. Thus this
algorithm runs in `O(|E|log|E|)` time.

In terms of space complexity, we require a list of size `|E|` for a list of the edges sorted in 
ascending order by edge weight, and thus that requires additional `O(|E|)` space. We require a 
union find that contains all `|V|` vertices, that requires `O(|V|)` space. Thus the total space
complexity is `O(|V|+|E|)`.

### Implementation

##### Java

View the source code [here](https://github.com/algorithm-helper/implementations/blob/master/java/com/algorithmhelper/algorithms/graphs/KruskalsAlgorithm.java).

<script src="https://gist.github.com/eliucs/2e20343754b78e51768654c3569976a8.js"></script>

### Time Complexity

```
| Algorithm           | time complexity | space complexity |
|---------------------|-----------------|------------------|
| kruskal's algorithm | O(|E|log|E|)    | O(|V|+|E|)       |
```
