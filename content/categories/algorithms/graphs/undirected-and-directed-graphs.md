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
