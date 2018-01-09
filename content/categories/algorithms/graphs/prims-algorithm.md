# Prim's Algorithm

Prim's algorithm is an algorithm used to find the minimum spanning tree of a connected, edge
weighted, undirected graph. It is a greedy algorithm, and its main approach to finding the 
minimum spanning tree $T$ is to always look at the minimum weight edge $e$ from the cut induced by
the vertices of $T$ (i.e. $V(T)$), adding that edge to $E(T)$ and that other end of $e$ to $V(T)$,
until it has $|V|-1$ elements.

### Observations

We must be able to efficiently retrieve the next minimum weight edge without having to iterate over
the edges in the cut of $V(T)$. We can do so with the use of a priority queue, where every time the
algorithm adds a vertex to $T$, we add all of its outgoing edges which do not have their other end
already in $T$ to the priority queue, using weight as the priority. 

Pseudocode:

```
primsAlgorithm(G):
  MST : minimum spanning tree, initialized to be empty
  PQ : priority queue

  x : arbitrary vertex in V(G)
  add x to V(MST)
  add all adjacent edges of x to PQ

  while |E(MST)| != |V(G)| - 1:
    e = PQ.extractMin()
    u : the other vertex in e

    for each vertex v in adj(u):
      if v not already in V(MST):
        add edge (u, v) to PQ
        add edge (u, v) to E(MST)
        add v to V(MST)

  return MST
```

We can show the correctness of Prim's algorithm through contradiction and induction. Intuitively, 
since we are working with a greedy algorithm, one natural way of visualizing this problem is
considering two subsets of vertices, say $A$ and $B$, of the total set of vertices $V$:

```
// Suppose we have a two subsets of vertices, A and B:

A (1, 2, 3, 4 ... u)
B (5, 6, 7, 8 ... v, w)
```

Suppose that the vertices in $A$ form a minimum spanning tree, and we pick out some vertex $u$. 
Suppose that the vertices in $B$ do not form a minimum spanning tree, and we pick out some vertex
$v$ such that the edge $(u, v)$ is the next minimum weight edge from $A$ to $B$. Pick out any other
vertex $w$, then $(u, w)$ is not the minimum weight edge.

Assuming that choosing vertex $w$ instead of $v$ will form a minimum spanning tree, and we do this
for the rest of the vertices in $B$, starting from vertex $w$. We can imagine this to be a bipartite 
graph, where removing the edge $(u, w)$ gives us $A$ and $B$, where both $A$ and $B$ individually 
form a minimum spanning tree. However, this is a contradictio because there does exist an edge 
connecting $A$ and $B$ that is of less total weight, namely $(u, v)$. 

Determining the time complexity for Prim's algorithm is dependent on the type of data structure we
use, because the bottleneck is being able to extract the next minimum weight edge from some vertex
already in the minimum spanning tree to another vertex not in the minimum spanning tree. Although
there are a variety of data structures that are possible, we consider the use of a priority queue
that implements a binary min heap.

We can see how it works intuitively. Overall, we need to add all of the vertices to the minimum 
spanning tree, and this takes $O(|V|)$ time. Every time we add a new vertex to the current minimum
spanning tree so far, we call the operation `extractMin` from the priority queue to get the next
minimum weight edge, and this priority queue is at most the size $|V|$ (when all of the vertices in
the graph have yet to be added to the minimum spanning tree), and so the `extractMin` operation 
takes $O(logV)$ time. But for every time after we call `extractMin`, we get a vertex $u$, we must 
iterate over the adjacent vertices to $u$, but the number of edges outgoing from $u$ may be at most
size $|E|$, and thus this latter part of the algorithm takes $O(|E|log|V|)$ time. Thus overall, the 
algorithm takes $O(|V| + |E|log|V|) = O(|E|log|V|)$ time. We need additional $O(|V|)$ space for the 
priority queue.

### Implementation

##### Java

```
package com.algorithmhelper.algorithms.graphs;

import com.algorithmhelper.datastructures.graphs.UndirectedWeightedGraph;
import com.algorithmhelper.datastructures.trees.PriorityMinQueue;

public class PrimsAlgorithm<T extends Comparable<T>> {

    private UndirectedWeightedGraph<T> mst;

    private class Edge<T extends Comparable<T>> implements Comparable<Edge<T>> {
        T u;
        T v;
        double weight;

        Edge(T u, T v, double weight) {
            this.u = u;
            this.v = v;
            this.weight = weight;
        }

        public int compareTo(Edge<T> that) {
            if (this.weight < that.weight)
                return -1;
            else if (this.weight > that.weight)
                return 1;
            return 0;
        }
    }

    /**
     * Initializes a PrimsAlgorithm object, and runs primsAlgorithm on the graph G.
     *
     * @param G, the graph
     * @throws IllegalArgumentException if the graph G is null
     */
    public PrimsAlgorithm(UndirectedWeightedGraph<T> G) {
        if (G == null)
            throw new IllegalArgumentException("constructor with null graph G");

        mst = new UndirectedWeightedGraph<>();

        if (G.V() == 0)
            return;

        primsAlgorithm(G);
    }

    /**
     * Runs Prim's algorithm to build up the minimum spanning tree mst.
     *
     * @param G, the graph
     */
    private void primsAlgorithm(UndirectedWeightedGraph<T> G) {
        PriorityMinQueue<Edge<T>> pq = new PriorityMinQueue<>();
        T start = G.getVertices().iterator().next();
        for (T v : G.getAdjacent(start))
            pq.insert(new Edge<>(start, v, G.getWeight(start, v)));

        while (mst.E() != G.V() - 1) {
            Edge<T> minEdge = pq.removeMin();

            if (G.containsVertex(minEdge.u) && G.containsVertex(minEdge.v))
                continue;

            mst.insertEdge(minEdge.u, minEdge.v, minEdge.weight);

            for (T w : G.getAdjacent(minEdge.v)) {
                if (!mst.containsVertex(w)) {
                    pq.insert(new Edge<>(minEdge.v, w, G.getWeight(minEdge.v, w)));
                }
            }
        }
    }

    /**
     * Returns the minimum spanning tree.
     *
     * @return the minimum spanning tree
     */
    public UndirectedWeightedGraph<T> getMinimumSpanningTree() {
        return mst;
    }
}
```

### Time Complexity

```
| Algorithm        | time complexity | space complexity |
|------------------|-----------------|------------------|
| prim's algorithm | O(|E|log|V|)    | O(|V|)           |
```
