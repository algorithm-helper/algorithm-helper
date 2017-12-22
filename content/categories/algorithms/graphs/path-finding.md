# Path Finding

Path Finding, in general, is producing a sequence of Edges to get from a
starting Vertex x to an ending Vertex y, such that for each Edge in this
sequence, the ending Vertex must be the starting Vertex of the next Edge.

Generally, in path finding, we maintain a set of explored Vertices and an array
of predecessor, which points each Vertex to its parent Vertex, and starting some
beginning Vertex x and continuously explore its adjacent Vertices (adding them
to the set of explored Vertices each time, and updating their predecessor to be
x), until we find the ending Vertex, or exhaust the search possibilities and can
conclude that a path does not exist.

If we do find a path, we maintain a Stack, and traverse up the predecessor tree,
adding each Vertex to the Stack, until we get to the starting Vertex again.
Iterating over this Stack then represents the path.

One of the common applications of path finding is finding the shortest path,
which is in the context of Weighted Graphs, we want to minimize the total
weight of the path.

We will look at algorithms for undirected and directed graphs, weighted graphs
where all Edge weights are positive, and weighted graphs but we have the
possibility of negative Edge weights and thus the possibility of negative
weight cycles.