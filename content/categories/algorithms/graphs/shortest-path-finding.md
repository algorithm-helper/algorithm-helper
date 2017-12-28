# Shortest Path Finding

Shortest path finding, in the context of directed, weighted graphs, is the problem of finding a 
path between vertices $u$ and $v$ in the graph with minimum weight. 

### Properties

There are different variants of the problem such as source-sink, single source, all pairs, where:
    
- Source-sink
    - Finding the shortest path between vertices $u$ and $v$.
- Single source
    - Finding the shortest paths between some vertex $u$ and all other vertices in the graph.
- All pairs
    - Finding the shortest paths between all pairs of vertices in the graph.

The properties of the edge weights makes a difference depending on which algorithm we use. One 
example could be with strictly non-negative weights, then 
[Dijkstra's algorithm](/categories/algorithms/graphs/dijkstras-algorithm) would be suitable
for finding shortest paths.

We will see that graphs with negative weights may have negative weight cycles arise. They pose a 
problem for shortest path finding because we can always go through the negative weight cycle an
infinite amount of times to ultimately get a shortest path of total weight of negative infinity. 
There are algorithms like the 
[Bellman-Ford algorithm](/categories/algorithms/graphs/bellman-ford-algorithm) 
or the [Floyd-Warshall algorithm](/categories/algorithms/graphs/floyd-warshall-algorithm) that are
able to detect negative weight cycles, and terminate when found. 

For these algorithms, we will be considering the single source shortest paths, and build up what is 
called the shortest paths tree, which is a spanning tree of the graph such that any path from the
starting vertex to all other vertices on the tree are the shortest paths to those vertices.
