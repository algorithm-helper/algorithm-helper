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

<img src="https://firebasestorage.googleapis.com/v0/b/algorithm-helper-storage.appspot.com/o/img%2Falgorithms%2Fgraphs%2Fdijkstras-algorithm-negative-weights.png?alt=media&token=1f87c1f3-4ae6-4801-ba30-dada6db03c23" alt="Dijkstra's Algorithm Negative Weights" class="img-fluid">

Suppose that we are looking for the shortest path from vertex $1$ to $4$. Dijkstra's algorithm will 
choose the path $(1, 3), (3, 5)$ instead of the shortest one which is $(1, 2), (2, 4), (4, 5)$.

### Implementation

##### Java

```
package com.algorithmhelper.algorithms.graphs;

import com.algorithmhelper.datastructures.hashing.HashMapLinearProbing;
import com.algorithmhelper.datastructures.interfaces.Map;
import com.algorithmhelper.datastructures.interfaces.Stack;
import com.algorithmhelper.datastructures.interfaces.WeightedGraph;
import com.algorithmhelper.datastructures.lists.StackDynamicArray;
import com.algorithmhelper.datastructures.trees.PriorityMinQueue;

public class DijkstrasAlgorithm<T extends Comparable<T>> {

    private Map<T, Double> dist;
    private Map<T, T> prev;
    PriorityMinQueue<Node<T>> pq;

    private class Node<T extends Comparable<T>> implements Comparable<Node<T>> {
        T u;
        double dist;

        Node(T u, double dist) {
            this.u = u;
            this.dist = dist;
        }

        public int compareTo(Node<T> that) {
            if (this.dist < that.dist)
                return -1;
            else if (this.dist > that.dist)
                return 1;
            return 0;
        }
    }

    /**
     * Initializes the DijkstrasAlgorithm object, and runs dijkstrasAlgorithm on the graph G with
     * starting vertex u.
     *
     * @param G, the graph
     * @param u, the starting vertex
     */
    public DijkstrasAlgorithm(WeightedGraph<T> G, T u) {
        if (G == null)
            throw new IllegalArgumentException("constructor with null graph G");
        if (u == null)
            throw new IllegalArgumentException("constructor with null vertex u");

        dist = new HashMapLinearProbing<>();
        prev = new HashMapLinearProbing<>();
        pq = new PriorityMinQueue<>();

        dijkstrasAlgorithm(G, u);
    }

    /**
     * Runs Dijkstra's algorithm on the WeightedGraph G and vertex u, and builds up the dist and
     * prev map.
     *
     * @param G, the graph
     * @param u, the vertex
     */
    private void dijkstrasAlgorithm(WeightedGraph<T> G, T u) {
        for (T v : G.getVertices()) {
            dist.put(v, Double.MAX_VALUE);
            prev.put(v, null);
            pq.insert(new Node<>(u, dist.get(u)));
        }

        dist.put(u, 0.0);
        pq.insert(new Node<>(u, dist.get(u)));

        while (!pq.isEmpty()) {
            Node<T> min = pq.removeMin();
            if (min.dist != dist.get(min.u))
                continue;

            T current = min.u;

            for (T v : G.getAdjacent(current)) {
                relax(current, v, G.getWeight(current, v));
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
            pq.insert(new Node<>(v, dist.get(v)));
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
with `PQ`, we need to store at most $|V|$ elements, and thus our space complexity is proportional 
to $O(|V|)$. Since we will be needing to relax $|E|$ edges, and by doing so need to run the 
`extractMin` operation to get the vertex of the next minimum shortest distance, taking $O(log|V|)$
time because of the priority queue, this algorithm thus runs in $O(|E|log|V|)$ time.

```
| Algorithm            | time complexity | space complexity |
|----------------------|-----------------|------------------|
| dijkstra's algorithm | O(|E|log|V|)    | O(|V|)           |
```
