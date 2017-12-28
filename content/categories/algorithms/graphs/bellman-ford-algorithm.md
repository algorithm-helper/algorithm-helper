# Bellman-Ford Algorithm

The Bellman-Ford algorithm is an algorithm used to find the shortest paths in a graph, in the 
context of graphs that have possible negative edge weights. We will be considering the single source 
shortest paths, recall that we will be building up the shortest paths tree from a starting vertex 
$u$ to all other vertices in the graph.

The main approach is similar to that of Dijkstra's algorithm, where we will be maintaining two maps,
`dist` and `prev`, where for some vertex `v`, `dist[v]` returns the length of the currently known 
shortest path to `v`, and `prev[v]` returns the previous vertex on the shortest path to `v`, 
respectively. We start off by initializing all distances in `dist` to be infinity, all elements in 
`prev` to be undefined. The algorithm then relaxes all $|E|$ edges, repeated $|V|$ times. Then to 
answer shortest path queries for some vertex `v`, we can use a stack, and continuously push on the 
`prev[v]` vertices along the shortest path found to `v`. 

To then check if there are any negative weight cycles, we need to check for every edge $(v, w)$ in
the graph, whether the inequality $dist(w) \leq dist(v) + weight(v, w)$ does not hold. If it does not
hold, we can throw an exception, informing the user that a negative weight cycle has been detected. 

### Pseudocode

The following provides the pseudocode for the Bellman-Ford algorithm:

```
bellmanFordAlgorithm(G, v):
    dist : map of vertices to shortest known path
    prev : map of vertices to previous vertex on the shortest known path

    for every vertex v in V(G):
        dist[v] = infinity
        prev[v] = undefined

    dist[v] = 0

    for i from 0..|V(G)|-1:
        for every edge (u, v) in E(G):
            if dist[v] > dist[u] + length(u, v):
                dist[v] = dist[u] + length(u, v)
                prev[v] = u

    for every edge (u, v) in E(G):
        if dist[v] > dist[u] + length(u, v):
            throw exception
```

### Implementation

##### Java

<script src="https://gist.github.com/eliucs/a71a69b646f2c4c283455f86a6abbb0e.js"></script>

### Time Complexity

To maintain `dist` and `prev`, we need to map every one of the $|V|$ vertices to some number, and 
thus our space complexity is proportional to $O(|V|)$. Since we will be needing to relax $|E|$ 
edges, repeated $|V|$ times, it follows that this algorithm runs in $O(|V||E|)$ time.

```
| Algorithm              | time complexity | space complexity |
|------------------------|-----------------|------------------|
| bellman-ford algorithm | O(|V||E|)       | O(|V|)           |
```
