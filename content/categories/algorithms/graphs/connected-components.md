# Connected Components

Connected components refers to determining if two vertices $u$ and $v$ belong to the same component
in a (possibly) disconnected graph $G$. Recall that by definition, components are connected subgraphs
such that any other subgraph that properly contains them are not connected. This problem to similar
to dynamic connectivity, a topic explored in the section on the 
[Union Find](/categories/data-structures/trees/union-find-disjoint-set) data structure. However, the
context of the problem is slightly different. Recall the definition of connectedness, where there
exists a vertex $x$ such that for all vertices $y$ in the graph, there is a path from $x$ to $y$. 
To be able to build up the connected components themselves, we must find these paths.

The approach is that we keep track of the vertices we have already explored in a set `visited`. We
maintain a map `components` that maps vertices to an integer `id` such that two vertices with the 
same `id` belong in the same component. We then iterate over all vertices in $V(G)$, skipping ones
that we have already visited, and run depth first search. Recall that depth first search will visit
all of the vertices in a connected graph, so it will be able to return all of the vertices in one
particular component, and we can give all of those vertices the same `id`. We then move on to the 
next available, unvisited vertex and repeat the process, this time with a different `id`.

### Implementation

##### Java

```
package com.algorithmhelper.algorithms.graphs;

import com.algorithmhelper.datastructures.hashing.HashSetLinearProbing;
import com.algorithmhelper.datastructures.interfaces.Graph;
import com.algorithmhelper.datastructures.interfaces.Map;
import com.algorithmhelper.datastructures.interfaces.Set;

public class ConnectedComponents<T extends Comparable<T>> {

    private Map<T, Integer> component;
    private int id;

    /**
     * Initializes a ConnectedComponents object, and runs connectedComponents on the
     * graph G.
     *
     * @param G, the graph
     * @throws IllegalArgumentException if the graph G is null
     */
    public ConnectedComponents(Graph<T> G) {
        if (G == null)
            throw new IllegalArgumentException("constructor with null graph G");

        id = 0;
        connectedComponents(G);
    }

    /**
     * Iterates over every vertex u in G, running depth first search to find every vertex v
     * contained in the component with u, and mapping v to the current id.
     *
     * @param G, the graph
     */
    private void connectedComponents(Graph<T> G) {
        Set<T> visited = new HashSetLinearProbing<>();

        for (T u : G.getVertices()) {
            if (visited.contains(u))
                continue;

            DepthFirstSearchRecursion<T> dfs = new DepthFirstSearchRecursion<>(G, u);
            for (T v : dfs.getVisited()) {
                visited.put(v);
                component.put(v, id);
            }
            id++;
        }
    }

    /**
     * Returns true if both vertices u and v belong to the same component (i.e. are mapped to the
     * same id in the Map component, otherwise false.
     *
     * @param u, the first vertex
     * @param v, the second vertex
     * @return true if both vertices u and v belong to the same component (i.e. are mapped to the
     *         same id in the Map component, otherwise false
     * @throws IllegalArgumentException if the vertex u is null
     * @throws IllegalArgumentException if the vertex v is null
     */
    public boolean isConnected(T u, T v) {
        if (u == null)
            throw new IllegalArgumentException("isConnected with null vertex u");
        if (v == null)
            throw new IllegalArgumentException("isConnected with null vertex v");
        if (!component.contains(u) || !component.contains(v))
            return false;
        return component.get(u).equals(component.get(v));
    }
}
```

### Time Complexity

Although we run depth first search multiple times, we would initially naively assume that the time
complexity must be something like $O(|V|(|V|+|E|)))$, however, this is not the case. In fact, this
algorithm has identical time and space complexity to just depth first search. The fact that the 
graph possibly has at least one component makes no difference because we keep track of all vertices
that we have visited, since once we have mapped a vertex to an `id`, we never explore it again. 
Thus, like depth first search, the time complexity is $O(|V|+|E|)$. 

In terms of space complexity, at most we need to map every vertex once, so we only need $O(|V|)$ 
space.

```
| Algorithm            | time complexity | space complexity |
|----------------------|-----------------|------------------|
| connected components | O(|V|+|E|)      | O(|V|)           |
```
