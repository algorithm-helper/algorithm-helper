# Weighted Graph

A weighted graph, in the context of edge weighted graphs, is a graph such that edges are assigned 
some numerical value called a weight, which represents some metric of the edges, and this may be 
distance, cost, altitude, or length, for example. Unlike with what we have seen before with the 
`Graph` interface, `UndirectedGraph` and `DirectedGraph` classes, the edges implicitly has a 
weight of 1 (or all equal weight). However, we will see in further sections how weighted graphs 
reflect much better the real life applications of graphs.

A number of problems arise when dealing with weighted graphs that we do not have to consider with
non-weighted graphs. In some algorithms, we need all edge weights to be non-negative, because when
we deal with negative weights, we may encounter negative weight cycles. A negative weight cycle
arises when we are processing the shortest path. Assuming the other weights along the path are 
positive, we can go through the negative weight cycle an arbitrary number of times, and essentially 
bring our shortest path length to be negative infinity.

The approach is that we use a separate class called `WeightFunction`, which provides the operations
necessary to map edges to weights, which are `double` values. Now, in addition to maintaining the 
vertices and edges in the `GraphRepresentation`, every edge and its associated weight that is added 
must also be added to `WeightFunction`, and similarly with deleting edges (and vertices).

### Implementation (WeightedGraph)

The following provides the interface for the `WeightedGraph` class.

##### Java

<script src="https://gist.github.com/eliucs/1a699868c907146e7dc385aa7889e5dd.js"></script>

### Implementation (Weight Function)

##### Java

<script src="https://gist.github.com/eliucs/bbb95b9a1e5e9aa480a0f301080774ff.js"></script>

### Implementation (Undirected)

##### Java

<script src="https://gist.github.com/eliucs/27a866d3ae33b95f114223ab2920ca2e.js"></script>

### Implementation (Directed)

##### Java

<script src="https://gist.github.com/eliucs/35bd7ca3a231673d342e5e201a9f34d9.js"></script>

### Time Complexity

The time and space complexity for the operations on the graph are identical to the ones for the `UndirectedGraph` and `DirectedGraph` classes. Since `WeightFunction` needs to map exactly $|E|$
edges to weights, it uses an additional $O(|E|)$ space, however, since the space complexity of 
the original `UndirectedGraph` and `DirectedGraph` is already $O(|V|+|E|)$, it does not make a 
difference, complexity wise.

```
| Data Structure            | space complexity   | containsVertex | containsEdge | insertVertex | insertEdge | deleteVertex | deleteEdge | getDegree    | getAdjacent  |
|---------------------------|--------------------|----------------|--------------|--------------|------------|--------------|------------|--------------|--------------|
| undirected weighted graph | O(|V|+|E|)         | O(1)           | O(degree(u)) | O(1)         | O(1)       | O(degree(u)) | O(1)       | O(degree(u)) | O(degree(u)) |
| directed weighted graph   | O(|V|+|E|)         | O(1)           | O(degree(u)) | O(1)         | O(1)       | O(degree(u)) | O(1)       | O(degree(u)) | O(degree(u)) |
```
