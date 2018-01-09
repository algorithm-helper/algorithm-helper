# Kruskal's Algorithm

Kruskal's algorithm is an algorithm used to find the minimum spanning tree of a connected, edge
weighted, undirected graph. It is a greedy algorithm, and its main approach to finding the 
minimum spanning tree is to use the union find data structure. It uses the same idea as the 
algorithm described on the article on 
[Minimum Spanning Trees](/categories/algorithms/graphs/minimum-spanning-tree), where we 
continuously add the next minimum weight crossing edge, such that adding it does not create a cycle.

### Observations

We will start off with a sorted list `L` of all of the edges by weight, and maintain a union find.
For every edge `(u, v)` in `L`, we check if `u` and `v` belong to the same connected component
by calling `connected(u, v)`. If they do, we skip it, and move on to the next edge. Otherwise, we 
add the edge (and its associated other vertex) to the minimum spanning tree, and `union(u, v)` in 
the union find. We repeat this until our minimum spanning tree's edge set is of size $|V|-1$.

Pseudocode:

```
kruskalsAlgorithm(G):
  MST: minimum spanning tree, initialized to be empty
  U : union find data structure
  L : list of all the edges of G
  
  initialize U
  sort L in ascending order by weight

  while |E(MST)| != |V(G)| - 1:
    minEdge : next edge from L
    u : first vertex in minEdge
    v : second vertex in minEdge

    if U.connected(u, v):
      continue

    add u and v to V(MST)
    add (u, v) to E(MST)

    union(u, v)

  return MST
```

Determining time complexity of the algorithm is fairly straightforward. Sorting the edges by edge
weight takes $O(|E|log|E|)$ time using a comparison sort like quicksort. Checking an edge `(u, v)`
in `L` belong to the same connected component takes $O(loglog|V|)$ time, and `union(u, v)` takes 
$O(1)$ time using a union find that is weighted and uses path compression. 

Since in sparse graphs, we have that $|E|$ is proportional to $O(|V|)$ and in dense graphs, $|E|$
is proportional to $O(|V|^2)$, the operations done with the union find can be ignored. Since we
need to add edges that connect all of the vertices, we must add every vertex to the minimum 
spanning tree, and takes $O(|V|)$ time, but this is overpowered by $O(|E|log|E|)$. Thus this
algorithm runs in $O(|E|log|E|)$ time.

In terms of space complexity, we require a list of size $|E|$ for a list of the edges sorted in 
ascending order by edge weight, and thus that requires additional $O(|E|)$ space. We require a 
union find that contains all $|V|$ vertices, that requires $O(|V|)$ space. Thus the total space
complexity is $O(|V|+|E|)$.

### Implementation

##### Java

```
package com.algorithmhelper.algorithms.graphs;

import com.algorithmhelper.algorithms.sorting.QuickSort;
import com.algorithmhelper.datastructures.graphs.UndirectedWeightedGraph;
import com.algorithmhelper.datastructures.hashing.HashMapLinearProbing;
import com.algorithmhelper.datastructures.interfaces.Map;
import com.algorithmhelper.datastructures.trees.UnionFind;

public class KruskalsAlgorithm<T extends Comparable<T>> {

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
     * Initializes a KruskalsAlgorithm object, and runs kruskalsAlgorithm on the graph G.
     *
     * @param G, the graph
     * @throws IllegalArgumentException if the graph G is null
     */
    public KruskalsAlgorithm(UndirectedWeightedGraph<T> G) {
        if (G == null)
            throw new IllegalArgumentException("constructor with null graph G");

        mst = new UndirectedWeightedGraph<>();

        if (G.V() == 0)
            return;

        kruskalsAlgorithm(G);
    }

    /**
     * Runs Kruskal's algorithm to build up the minimum spanning tree mst.
     *
     * @param G, the graph
     */
    private void kruskalsAlgorithm(UndirectedWeightedGraph<T> G) {
        Map<T, Integer> numMap = new HashMapLinearProbing<>();
        UnionFind unionFind = new UnionFind(G.V());
        Edge<T>[] edges = new Edge[G.E()];

        int i = 0, j = 0;
        for (T u : G.getVertices()) {
            numMap.put(u, i);
            i++;

            for (T v : G.getAdjacent(u)) {
                edges[j] = new Edge<>(u, v, G.getWeight(u, v));
                j++;
            }
        }

        QuickSort.sort(edges);

        for (Edge<T> edge : edges) {
            if (unionFind.connected(numMap.get(edge.u), numMap.get(edge.v)))
                continue;

            mst.insertEdge(edge.u, edge.v, edge.weight);
            unionFind.union(numMap.get(edge.u), numMap.get(edge.v));
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
| Algorithm           | time complexity | space complexity |
|---------------------|-----------------|------------------|
| kruskal's algorithm | O(|E|log|E|)    | O(|V|+|E|)       |
```
