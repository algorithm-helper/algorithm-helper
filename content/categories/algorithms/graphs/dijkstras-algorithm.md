# Dijkstra's Algorithm

Dijkstra's algorithm is an algorithm used to find the shortest paths in a graph, in the context of 
graphs with non-negative edge weights. We will be considering the single source shortest paths, 
recall that we will be building up the shortest paths tree from a starting vertex $u$ to all other 
vertices in the graph.

The main approach is that we will be maintaining two maps, `dist` and `prev`, where for some vertex 
`v`, `dist[v]` returns the length of the currently known shortest path to `v`, and `prev[v]`
returns the previous vertex on the shortest path to `v`, respectively. We start off by initializing
all distances in `dist` to be infinity, all elements in `prev` to be undefined. 

We maintain a priority queue `PQ` of vertices, whose priority is based on shortest path distance to 
that vertex. While `PQ` is not empty, we continuously call the operation `extractMin` to get the 
vertex $u$, and for each of its neighbors, relax its edges. Then to answer shortest path queries for 
some vertex $v$, we can use a stack, and continuously push on the `prev[v]` vertices along the 
shortest path found to $v$. 

The algorithm's correctness is based on the fact that each edge $(v, w)$ is relaxed exactly once, 
giving $dist(w) \leq dist(v) + weight(v, w)$. Since $dist(w)$ is monotonically decreasing, and 
$dist(v)$ will not change, the edge relaxation process will only be done a finite number of times,
and terminate, and the inequality holds.

### Pseudocode

The following provides the pseudocode for Dijkstra's algorithm:

```
dijkstrasAlgorithm(G, v):
    PQ : priority queue, initialized to be empty
    dist : map of vertices to shortest known path
    prev : map of vertices to previous vertex on the shortest known path

    for every vertex v in V(G):
        dist[v] = infinity
        prev[v] = undefined

    dist[v] = 0

    while !PQ.isEmpty():
        u = PQ.extractMin()

        for every vertex v in adjacency list of u:
            if dist[v] > dist[u] + length(u, v):
                dist[v] = dist[u] + length(u, v)
                prev[v] = u
```

### Negative Weights

Dijkstra's algorithm does not work with negative weights. Below is an example:

<img src="https://firebasestorage.googleapis.com/v0/b/algorithm-helper-storage.appspot.com/o/img%2Falgorithms%2Fgraphs%2Fdijkstras-algorithm-negative-weights.png?alt=media&token=1f87c1f3-4ae6-4801-ba30-dada6db03c23" alt="Dijkstra's Algorithm Negative Weights" width="400" height="300">

Suppose that we are looking for the shortest path from vertex $1$ to $4$. Dijkstra's algorithm will 
choose the path $(1, 3), (3, 5)$ instead of the shortest one which is $(1, 2), (2, 4), (4, 5)$.

### Implementation

##### Java

View the source code [here](https://github.com/algorithm-helper/implementations/blob/master/java/com/algorithmhelper/algorithms/graphs/DijkstrasAlgorithm.java).

<script src="https://gist.github.com/eliucs/cc38ee2aad31eb7b4f034c63a7102b2f.js"></script>

### Time Complexity

To maintain `dist` and `prev`, we need to map every one of the $|V|$ vertices to some number, and 
with `PQ`, we need to store at most $|V|$ elements, and thus our space complexity is proportional 
to $O(|V|)$. Since we will be needing to relax $|E|$ edges, and by doing so need to run the 
`extractMin` operation to get the vertex of the next minimum shortest distance, taking $O(log|V|)$
time because of the priority queue, this algorithm thus runs in $O(|E|log|V|)$ time.

```
| Algorithm            | time complexity | space complexity |
|----------------------|-----------------|------------------|
| dijkstra's algorithm | O(|E|log|V|)    | O(|V|)           |
```
