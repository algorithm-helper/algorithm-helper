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

```
package com.algorithmhelper.algorithms.graphs;

import com.algorithmhelper.datastructures.hashing.HashMapLinearProbing;
import com.algorithmhelper.datastructures.interfaces.Map;
import com.algorithmhelper.datastructures.interfaces.Stack;
import com.algorithmhelper.datastructures.interfaces.WeightedGraph;
import com.algorithmhelper.datastructures.lists.StackDynamicArray;

public class BellmanFordAlgorithm<T extends Comparable<T>> {

    private Map<T, Double> dist;
    private Map<T, T> prev;

    /**
     * Initializes the BellmanFordAlgorithm object, and runs bellmanFordAlgorithm on the graph G
     * with starting vertex u.
     *
     * @param G, the graph
     * @param u, the starting vertex
     */
    public BellmanFordAlgorithm(WeightedGraph<T> G, T u) {
        if (G == null)
            throw new IllegalArgumentException("constructor with null graph G");
        if (u == null)
            throw new IllegalArgumentException("constructor with null vertex u");

        dist = new HashMapLinearProbing<>();
        prev = new HashMapLinearProbing<>();

        bellmanFordAlgorithm(G, u);
    }

    /**
     * Runs the Bellman-Ford algorithm on the WeightedGraph G and vertex u, and builds up the dist
     * and prev map.
     *
     * @param G, the graph
     * @param u, the vertex
     * @throws RuntimeException if a negative weight cycle was detected in graph G
     */
    private void bellmanFordAlgorithm(WeightedGraph<T> G, T u) {
        for (T v : G.getVertices()) {
            dist.put(v, Double.MAX_VALUE);
            prev.put(v, null);
        }

        dist.put(u, 0.0);

        for (int i = 0; i < G.V(); i++) {
            for (T v : G.getVertices()) {
                for (T w : G.getAdjacent(v))
                    relax(v, w, G.getWeight(v, w));
            }
        }

        for (T v : G.getVertices()) {
            for (T w : G.getAdjacent(v)) {
                if (dist.get(w) > dist.get(v) + G.getWeight(v, w))
                    throw new RuntimeException("negative weight cycle detected in graph G");
            }
        }
    }

    /**
     * Helper method for relaxing the edge (u, v).
     *
     * @param u, the first vertex
     * @param v, the second vertex
     */
    private void relax(T u, T v, double weight) {
        if (dist.get(v) > dist.get(u) + weight) {
            dist.put(v, dist.get(u) + weight);
            prev.put(v, u);
        }
    }

    /**
     * Returns an Iterable to the shortest path from the starting vertex to some other vertex v
     * in the graph.
     *
     * @param v, the vertex
     * @return an Iterable to the shortest path from the starting vertex to some other vertex v
     * in the graph
     */
    public Iterable<T> getShortestPath(T v) {
        if (v == null)
            throw new IllegalArgumentException("getShortestPath with null vertex v");
        Stack<T> stack = new StackDynamicArray<>();
        stack.push(v);
        T current = v;
        while (true) {
            current = prev.get(current);

            if (current == null)
                break;

            stack.push(current);
        }
        return stack;
    }
}
```

### Time Complexity

To maintain `dist` and `prev`, we need to map every one of the $|V|$ vertices to some number, and 
thus our space complexity is proportional to $O(|V|)$. Since we will be needing to relax $|E|$ 
edges, repeated $|V|$ times, it follows that this algorithm runs in $O(|V||E|)$ time.

```
| Algorithm              | time complexity | space complexity |
|------------------------|-----------------|------------------|
| bellman-ford algorithm | O(|V||E|)       | O(|V|)           |
```
