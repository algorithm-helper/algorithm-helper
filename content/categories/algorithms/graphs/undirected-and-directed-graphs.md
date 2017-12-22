# Undirected and Directed Graphs


An Undirected Graph is a Graph such that all of the edges connect the vertices
the both directions amongst each other. Generally, we draw these edges as
straight lines.

For example:

```
// Supposed we had the graph G:

1 - 2 - 3
|   |
4   5
```

Then all pairwise connections are in both directions, and we have the edges
(1, 2), (2, 1), (2, 3), (3, 2), (1, 4), (4, 1), (2, 5), (5, 2).

A Directed Graph is a Graph such that all of the edges connect the vertices
in only one direction, and it becomes important to distinguish between the
starting vertex and the ending vertex of the edge. Generally, we draw these
edges as an arrow pointing from the starting vertex to the ending vertex.

For example:

```
// Supposed we had the graph G:

1 -> 2 -> 3
^    ^
|    |
4    5
```

Then all pairwise connections are in one direction, and we have the edges
(1, 2), (2, 3), (4, 5) and (5, 2) only. Note that an Undirected Graph could
be represented easily as a Directed Graph if we had two directed edges between
pairs of vertices x and y, with an edge going from x to y and an edge going
from y to x.

For simplicity for now, we do not consider weights in detail, which are values
of the edges that may measure some property of that connection between two
vertices, until the Weighted Graphs section. But it is clear that in the case of
a Weighted Graph, the description of an Directed Graph possibly being an
Undirected Graph using two directed edges in opposite directions is not
necessarily accurate. Consider the case of a Graph whose vertices represent
the altitude of a hill-like landscape. Clearly, although we may have two
directed edges going up the hill and down the hill, the edge up the hill has
more weight than the edge down the hill, and it becomes important to distinguish
between these two edges, albeit they are between the same vertices.
