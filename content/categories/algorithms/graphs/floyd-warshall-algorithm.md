# Floyd-Warshall Algorithm

The Floyd-Warshall algorithm is an algorithm used to find all pairs shortest paths in a graph, in 
the context of graphs that have possible negative edge weights, using dynamic programming. Recall
that all pairs shortest paths, unlike single source, gives us the shortest paths between any two
vertices. This algorithm is able to construct a $|V|\times|V|$ matrix, where each entry is the shortest
path between two vertices. In addition, although the basic version of the algorithm typically only
supports querying for lengths of shortest paths, a simple modification can be made to allow for
path reconstruction.

Let the vertices be labelled $\\{1, 2, 3, 4\\}$. The main approach and intuition behind this algorithm 
is to consider a function $shortestPath(u, v, w)$ that computes the shortest path from vertex $u$ to 
$v$ solely using the vertices from the set $\\{1, 2, ... , w\\}$ as intermediate vertices along the path.
For every pair of vertices $(u, v)$, we have that for $shortestPath(u, v, w)$, either:

- The path does not use the vertex $w$:
    - Then the path only uses vertices from the set $\\{1, 2, ... , w-1\\}$. Then, the shortest path from 
    $u$ to $v$ only using vertices from $\\{1, 2, ... , w-1\\}$ is recursively $shortestPath(u, v, w-1)$.
- The path does use the vertex $w$:
    - Then the path goes from $u$ to $w$ and from $w$ to $v$, in both cases only using vertices from 
    the set $\\{1, 2, ... w-1\\}$ as intermediate vertices. Then, the shortest path would be the 
    concatenation of the shortest path from $u$ to $w$, and the shortest path from $w$ to $v$, both
    only using vertices from the set $\\{1, 2, ... , w-1\\}$, which is 
    $shortestPath(u, w, w-1) + shortestPath(w, v, w-1)$. 

Thus we have the recursive formula for 
$shortestPath(u, v, w) = min(shortestPath(u, v, w-1), shortestPath(u, w, w-1) +$$
shortestPath(w, v, w-1))$.

We maintain two matrices, `dist` and `next`, where for some pair of vertices `(u, v)`, `dist[u][v]`
returns the length of the shortest path from `u` to `v`, and `next(u, v)` returns the next vertex
along that shortest path. We start off by initializing all distances in `dist` to be infinity, all 
elements in `next` to be undefined.

Detecting the existence of negative cycles is straightforward. For each pair `(u, u)` in the `dist`
matrix, we have `dist[u][u] = 0`. Any path from `u, k1, k2, ... u` can only improve upon `0` if 
there was a negative cycle. Thus we check the diagonal of the `dist` matrix for any negative values,
and if there is one then there exists a negative cycle, and thus it throws an exception. 

### Pseudocode

The following provides the pseudocode for the Floyd-Warshall algorithm:

```
floydWarshallAlgorithm(G, v):
    dist: |V|x|V| matrix of vertices to the shortest known path
    next: |V|x|V| matrix of vertices to the next vertex on the shortest known path

    for every edge (u, v) in E(G):
        dist[u][v] = G.weight(u, v)
        next[u][v] = v
    
    for k from 0..|V(G)|-1:
        for i from 0..|V(G)|-1:
            for j from 0..|V(G)|-1:
                if dist[i][j] > dist[i][k] + dist[k][j]:
                    dist[i][j] = dist[i][k] + dist[k][j]
                    next[i][j] = next[i][k]

    for i from 0..|V(G)|-1:
        for j from 0..|V(G)|-1:
            if dist[i][j] < 0:
                throw exception
```

### Implementation

##### Java

```
package com.algorithmhelper.algorithms.graphs;

import com.algorithmhelper.datastructures.hashing.HashMapLinearProbing;
import com.algorithmhelper.datastructures.interfaces.Map;
import com.algorithmhelper.datastructures.interfaces.Queue;
import com.algorithmhelper.datastructures.interfaces.WeightedGraph;
import com.algorithmhelper.datastructures.lists.QueueDynamicArray;

public class FloydWarshallAlgorithm<T extends Comparable<T>> {

    private Map<T, Integer> numMap;
    private double[][] dist;
    private T[][] next;

    /**
     * Initializes the FloydWarshallAlgorithm object, and runs floydWarshallAlgorithm on the
     * graph G.
     *
     * @param G, the graph
     */
    public FloydWarshallAlgorithm(WeightedGraph<T> G) {
        if (G == null)
            throw new IllegalArgumentException("constructor with null graph G");

        numMap = new HashMapLinearProbing<>();
        dist = new double[G.V()][G.V()];
        next = (T[][]) new Object[G.V()][G.V()];

        int i = 0;
        for (T u : G.getVertices()) {
            numMap.put(u, i);
            i++;
        }

        floydWarshallAlgorithm(G);
    }

    /**
     * Runs the Floyd-Warshall algorithm on the WeightedGraph G, and builds up the dist and
     * next matrix.
     *
     * @param G, the graph
     */
    private void floydWarshallAlgorithm(WeightedGraph<T> G) {
        for (T u : G.getVertices()) {
            for (T v : G.getAdjacent(u)) {
                dist[numMap.get(u)][numMap.get(v)] = G.getWeight(u, v);
                next[numMap.get(u)][numMap.get(v)] = v;
            }
        }

        for (int k = 0; k < G.V() - 1; k++) {
            for (int j = 0; j < G.V() - 1; j++) {
                for (int i = 0; i < G.V() - 1; i++) {
                    if (dist[i][j] > dist[i][k] + dist[k][j]) {
                        dist[i][j] = dist[i][k] + dist[k][j];
                        next[i][j] = next[i][k];
                    }
                }
            }
        }

        for (int i = 0; i < G.V() - 1; i++) {
            for (int j = 0; j < G.V() - 1; j++) {
                if (dist[i][j] < 0)
                    throw new RuntimeException("negative weight cycle detected in graph G");
            }
        }

    }

    /**
     * Returns an Iterable to the shortest path from vertex u to vertex v in the graph.
     *
     * @param u, the first vertex
     * @param v, the second vertex
     * @return an Iterable to the shortest path from vertex u to vertex v in the graph
     */
    public Iterable<T> getShortestPath(T u, T v) {
        if (u == null)
            throw new IllegalArgumentException("getShortestPath with null vertex u");
        if (v == null)
            throw new IllegalArgumentException("getShortestPath with null vertex v");
        if (next[numMap.get(u)][numMap.get(v)] == null)
            throw new IllegalArgumentException("getShortestPath with non-existent path from " +
                    "vertex u to v");

        Queue<T> queue = new QueueDynamicArray<>();
        T current = u;
        queue.enqueue(current);

        while (current != v) {
            current = next[numMap.get(current)][numMap.get(v)];
            queue.enqueue(current);
        }

        return queue;
    }
}
```

### Time Complexity

We need to maintain the two $|V|\times|V|$ matrices for `dist` and `next`, and thus need space 
proportional to $O(|V|^2)$. We iterate through the $|V|$ vertices in a triple nested for loop, and 
in the last for loop, relax the edges, a constant time operation, and thus this algorithm runs in
$O(|V|^3)$ time.

```
| Algorithm                | time complexity | space complexity |
|--------------------------|-----------------|------------------|
| floyd-warshall algorithm | O(|V|^3)        | O(|V|^2)         |
```
