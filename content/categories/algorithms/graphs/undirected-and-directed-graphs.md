# Undirected and Directed Graphs

### Undirected Graph

An undirected graph is a graph such that all of the edges connect vertices in both directions. 
Generally, we draw these edges as straight lines. Edges with vertex `u` and vertex `v` do not
"go from `u` to `v`", but rather are "between `u` and `v`", thus an edge `(u, v)` is equal to an
edge `(v, u)`.

For example:

```
// Supposed we had the graph G:

1 - 2 - 3
|   |
4   5
```

Then all pairwise connections are in both directions, and we have the edges (1, 2), (2, 1), (2, 3), 
(3, 2), (1, 4), (4, 1), (2, 5), (5, 2).

### Directed Graph

A directed graph is a graph such that all of the edges connect the vertices in only one direction,
and it becomes important to distinguish between the starting and ending vertex of that edge. 
Generally, we draw these edges as an arrow pointing from the starting vertex to the ending vertex.
If we had an edge `(u, v)`, unlike with undirected graphs, `(u, v) != (v, u)`.

For example:

```
// Supposed we had the graph G:

1 -> 2 -> 3
^    ^
|    |
4    5
```

Then all pairwise connections are in one direction, and we have the edges (1, 2), (2, 3), (4, 5) and 
(5, 2) only. Note that an undirected graph could be represented easily as a directed graph if we had 
two directed edges between pairs of vertices `u` and `v`, with an edge going from `u` to `v` and an 
edge going from `v` to `u`.

For simplicity, we do not consider weights in detail, which are values of the edges that measure 
some property of that connection between two vertices, until the [Weighted Graphs](/categories/algorithms/graphs/weighted-graph) section. But it is clear that in the case of a 
weighted graphs, the description of an directed graph possibly being an undirected graph using two 
directed edges in opposite directions is not necessarily accurate. Consider the case of a graph 
whose vertices represent the altitude of a hill-like landscape. Clearly, although we may have two
directed edges going up the hill and down the hill, the edge up the hill has more weight than the 
edge down the hill, and it becomes important to distinguish between these two edges, albeit they are 
between the same vertices.

### Implementation (Graph Interface)

##### Java

View the source code [here](https://github.com/algorithm-helper/implementations/blob/master/java/com/algorithmhelper/datastructures/interfaces/Graph.java).

<script src="https://gist.github.com/eliucs/2a09e6458c415220afeb9ac94721f359.js"></script>

### Implementation (Undirected Graph)

##### Java

View the source code [here](https://github.com/algorithm-helper/implementations/blob/master/java/com/algorithmhelper/datastructures/graphs/UndirectedGraph.java). Note that this uses an [Adjacency List](/categories/algorithms/graphs/graph-representation) for graph representation, and that it virtually
the same as `DirectedGraph` except that every time we insert, delete, or check if the graph contains
edge `(u, v)`, we do so for edge `(u, v)` and `(v, u)`.

<script src="https://gist.github.com/eliucs/f68464e467a5fa2630a270bee70a1c81.js"></script>

### Implementation (Directed Graph)

##### Java

View the source code [here](https://github.com/algorithm-helper/implementations/blob/master/java/com/algorithmhelper/datastructures/graphs/DirectedGraph.java). Note that this uses an [Adjacency List](/categories/algorithms/graphs/graph-representation) for graph representation.

<script src="https://gist.github.com/eliucs/03cfa5edcc22d10cb1f07cdeed03628d.js"></script>

### Time Complexity

The following table describes the time and space complexity for performing the operations above on 
an undirected graph and directed graph. It is identical to the one for adjacency list since they
both use an adjacency list structure for graph representation as the back-end.

```
| Data Structure   | space complexity | containsVertex | containsEdge | insertVertex | insertEdge | deleteVertex | deleteEdge | getDegree    | getAdjacent  |
|------------------|------------------|----------------|--------------|--------------|------------|--------------|------------|--------------|--------------|
| undirected graph | O(V + E)         | O(1)           | O(degree(u)) | O(1)         | O(1)       | O(degree(u)) | O(1)       | O(degree(u)) | O(degree(u)) |
| directed graph   | O(V + E)         | O(1)           | O(degree(u)) | O(1)         | O(1)       | O(degree(u)) | O(1)       | O(degree(u)) | O(degree(u)) |
```
