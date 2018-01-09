# Undirected and Directed Graphs

### Undirected Graph

An undirected graph is a graph such that all of the edges connect vertices in both directions. 
Generally, we draw these edges as straight lines. Edges with vertex $u$ and vertex $v$ do not
"go from $u$ to $v$, but rather are "between $u$ and $v$, thus an edge $(u, v)$ is equal to an
edge $(v, u)$.

For example, suppose that we had the following graph:

<img src="https://firebasestorage.googleapis.com/v0/b/algorithm-helper-storage.appspot.com/o/img%2Falgorithms%2Fgraphs%2Fundirected-graph.png?alt=media&token=3ee5d5ef-3a6f-42fb-9f6f-a3fa87f5eccc" alt="Undirected Graph" class="img-fluid">

Then all pairwise connections are in both directions, and we have the edges $(1, 2), (2, 1), (2, 3), 
(3, 2), (1, 4), (4, 1), (2, 5), (5, 2)$.

### Directed Graph

A directed graph is a graph such that all of the edges connect the vertices in only one direction,
and it becomes important to distinguish between the starting and ending vertex of that edge. 
Generally, we draw these edges as an arrow pointing from the starting vertex to the ending vertex.
If we had an edge $(u, v)$, unlike with undirected graphs, `(u, v) != (v, u)`.

For example, suppose that we have the following graph:

<img src="https://firebasestorage.googleapis.com/v0/b/algorithm-helper-storage.appspot.com/o/img%2Falgorithms%2Fgraphs%2Fdirected-graph.png?alt=media&token=9d7555a7-524a-4b67-80b6-c2f11b7000e0" alt="Directed Graph" class="img-fluid">

Then all pairwise connections are in one direction, and we have the edges $(1, 2), (2, 3), (4, 5),  
(5, 2)$ only. Note that an undirected graph could be represented easily as a directed graph if we had 
two directed edges between pairs of vertices $u$ and $v$, with an edge going from $u$ to $v$ and an 
edge going from $v$ to $u$.

For simplicity, we do not consider weights in detail, which are values of the edges that measure 
some property of that connection between two vertices, until the [Weighted Graphs](/categories/algorithms/graphs/weighted-graph) section. But it is clear that in the case of a 
weighted graphs, the description of an directed graph possibly being an undirected graph using two 
directed edges in opposite directions is not necessarily accurate. Consider the case of a graph 
whose vertices represent the altitude of a hill-like landscape. Clearly, although we may have two
directed edges going up the hill and down the hill, the edge up the hill has more weight than the 
edge down the hill, and it becomes important to distinguish between these two edges, albeit they are 
between the same vertices.

### Implementation (Graph Interface)

##### Java

```
package com.algorithmhelper.datastructures.interfaces;

public interface Graph<T extends Comparable<T>> {

    /**
     * Returns the number of vertices.
     *
     * @return the number of vertices
     */
    int V();

    /**
     * Returns the number of edges.
     *
     * @return the number of edges
     */
    int E();

    /**
     * Returns true if the Graph contains vertex u, false otherwise.
     *
     * @param u, the vertex
     * @return true if the Graph contains vertex u, false otherwise
     */
    boolean containsVertex(T u);

    /**
     * Returns true if the Graph contains edge (u, v) in its graph representation, false otherwise.
     *
     * @param u, the first vertex
     * @param v, the second vertex
     * @return true if the Graph contains edge (u, v) in its graph representation, false otherwise
     */
    boolean containsEdge(T u, T v);

    /**
     * Inserts the vertex u into the Graph, u must be an isolated vertex, and cannot already be
     * contained in the Graph.
     *
     * @param u, the vertex
     */
    void insertVertex(T u);

    /**
     * Inserts an edge (u, v) into the Graph.
     *
     * @param u, the first vertex
     * @param v, the second vertex
     */
    void insertEdge(T u, T v);

    /**
     * Deletes a vertex u and all of the edges incident to u.
     *
     * @param u, the vertex
     */
    void deleteVertex(T u);

    /**
     * Deletes an edge (u, v) from the Graph.
     *
     * @param u, the first vertex
     * @param v, the second vertex
     */
    void deleteEdge(T u, T v);

    /**
     * Returns the degree of a vertex u (i.e. the number of adjacent vertices to u).
     *
     * @param u, the vertex
     * @return the degree of u
     */
    int getDegree(T u);

    /**
     * Returns an Iterable adjacency list of the vertex u.
     *
     * @param u, the vertex
     * @return an Iterable adjacency list of the vertex u
     */
    Iterable<T> getAdjacent(T u);

    /**
     * Returns an Iterable to all of the vertices of the Graph.
     *
     * @return an Iterable to all of the vertices of the Graph
     */
    Iterable<T> getVertices();

    /**
     * Returns a copy of the Graph.
     *
     * @return a copy of the Graph
     */
    Graph<T> clone();
}
```

### Implementation (Undirected Graph)

##### Java

Note that this uses an [Adjacency List](/categories/algorithms/graphs/graph-representation) for 
graph representation, and that it virtually the same as `DirectedGraph` except that every time we 
insert, delete, or check if the graph contains edge $(u, v)$, we do so for edge $(u, v)$ and 
$(v, u)$.

```
package com.algorithmhelper.datastructures.graphs;

import com.algorithmhelper.datastructures.interfaces.Graph;
import com.algorithmhelper.datastructures.interfaces.GraphRepresentation;

public class UndirectedGraph<T extends Comparable<T>> implements Graph<T> {

    /**
     * Internal graph representation structure.
     */
    private GraphRepresentation<T> graphRepresentation;

    /**
     * Initializes an empty UndirectedGraph.
     */
    public UndirectedGraph() {
        graphRepresentation = new AdjacencyList<>();
    }

    /**
     * Returns the number of vertices.
     *
     * @return the number of vertices
     */
    public int V() {
        return graphRepresentation.V();
    }

    /**
     * Returns the number of edges.
     *
     * @return the number of edges
     */
    public int E() {
        return graphRepresentation.E();
    }

    /**
     * Returns true if the UndirectedGraph contains vertex u, false otherwise.
     *
     * @param u, the vertex
     * @return true if the UndirectedGraph contains vertex u, false otherwise
     */
    public boolean containsVertex(T u) {
        return graphRepresentation.containsVertex(u);
    }

    /**
     * Returns true if the UndirectedGraph contains edge (u, v) or (v, u) in its graph
     * representation, false otherwise.
     *
     * @param u, the first vertex
     * @param v, the second vertex
     * @return true if the UndirectedGraph contains edge (u, v) or (v, u) in its graph
     * representation, false otherwise
     */
    public boolean containsEdge(T u, T v) {
        return graphRepresentation.containsEdge(u, v) || graphRepresentation.containsEdge(v, u);
    }

    /**
     * Inserts the vertex u into the UndirectedGraph, u must be an isolated vertex, and cannot
     * already be contained in the UndirectedGraph.
     *
     * @param u, the vertex
     */
    public void insertVertex(T u) {
        graphRepresentation.insertVertex(u);
    }

    /**
     * Inserts an edge (u, v) into the UndirectedGraph by inserting edge (u, v) and (v, u) into
     * its graph representation.
     *
     * @param u, the first vertex
     * @param v, the second vertex
     */
    public void insertEdge(T u, T v) {
        graphRepresentation.insertEdge(u, v);
        graphRepresentation.insertEdge(v, u);
    }

    /**
     * Deletes a vertex u and all of the edges incident to u.
     *
     * @param u, the vertex
     */
    public void deleteVertex(T u) {
        graphRepresentation.deleteVertex(u);
    }

    /**
     * Deletes an edge (u, v) from the UndirectedGraph by deleting edge (u, v) and (v, u) from its
     * graph representation.
     *
     * @param u, the first vertex
     * @param v, the second vertex
     */
    public void deleteEdge(T u, T v) {
        graphRepresentation.deleteEdge(u, v);
        graphRepresentation.deleteEdge(v, u);
    }

    /**
     * Returns the degree of a vertex u (i.e. the number of adjacent vertices to u).
     *
     * @return the degree of u
     */
    public int getDegree(T u) {
        return graphRepresentation.getDegree(u);
    }

    /**
     * Returns the Iterable adjacency list of the vertex u.
     *
     * @param u, the vertex
     * @return the Iterable adjacency list of the vertex u
     */
    public Iterable<T> getAdjacent(T u) {
        return graphRepresentation.getAdjacent(u);
    }

    /**
     * Returns an Iterable to all of the vertices of the UndirectedGraph.
     *
     * @return an Iterable to all of the vertices of the UndirectedGraph
     */
    public Iterable<T> getVertices() {
        return graphRepresentation.getVertices();
    }

    /**
     * Returns a copy of the UndirectedGraph.
     *
     * @return
     */
    public UndirectedGraph<T> clone() {
        UndirectedGraph<T> cloneGraph = new UndirectedGraph<>();
        for (T u : getVertices()) {
            if (getDegree(u) == 0) {
                cloneGraph.insertVertex(u);
                continue;
            }

            for (T v : getAdjacent(u))
                cloneGraph.insertEdge(u, v);
        }
        return cloneGraph;
    }
}
```

### Implementation (Directed Graph)

##### Java

Note that this uses an [Adjacency List](/categories/algorithms/graphs/graph-representation) for graph representation.

```
package com.algorithmhelper.datastructures.graphs;

import com.algorithmhelper.datastructures.interfaces.Graph;
import com.algorithmhelper.datastructures.interfaces.GraphRepresentation;

public class DirectedGraph<T extends Comparable<T>> implements Graph<T> {

    /**
     * Internal graph representation structure.
     */
    private GraphRepresentation<T> graphRepresentation;

    /**
     * Initializes an empty DirectedGraph.
     */
    public DirectedGraph() {
        graphRepresentation = new AdjacencyList<>();
    }

    /**
     * Returns the number of vertices.
     *
     * @return the number of vertices
     */
    public int V() {
        return graphRepresentation.V();
    }

    /**
     * Returns the number of edges.
     *
     * @return the number of edges
     */
    public int E() {
        return graphRepresentation.E();
    }

    /**
     * Returns true if the DirectedGraph contains vertex u, false otherwise.
     *
     * @param u, the vertex
     * @return true if the DirectedGraph contains vertex u, false otherwise
     */
    public boolean containsVertex(T u) {
        return graphRepresentation.containsVertex(u);
    }

    /**
     * Returns true if the DirectedGraph contains edge (u, v) in its graph representation, false
     * otherwise.
     *
     * @param u, the first vertex
     * @param v, the second vertex
     * @return true if the DirectedGraph contains edge (u, v) in its graph representation, false
     * otherwise
     */
    public boolean containsEdge(T u, T v) {
        return graphRepresentation.containsEdge(u, v);
    }

    /**
     * Inserts the vertex u into the DirectedGraph, u must be an isolated vertex, and cannot
     * already be contained in the DirectedGraph.
     *
     * @param u, the vertex
     */
    public void insertVertex(T u) {
        graphRepresentation.insertVertex(u);
    }

    /**
     * Inserts an edge (u, v) into the DirectedGraph by inserting edge (u, v) into its graph
     * representation.
     *
     * @param u, the first vertex
     * @param v, the second vertex
     */
    public void insertEdge(T u, T v) {
        graphRepresentation.insertEdge(u, v);
    }

    /**
     * Deletes a vertex u and all of the edges incident to u.
     *
     * @param u, the vertex
     */
    public void deleteVertex(T u) {
        graphRepresentation.deleteVertex(u);
    }

    /**
     * Deletes an edge (u, v) from the DirectedGraph by deleting edge (u, v) from its graph
     * representation.
     *
     * @param u, the first vertex
     * @param v, the second vertex
     */
    public void deleteEdge(T u, T v) {
        graphRepresentation.deleteEdge(u, v);
    }

    /**
     * Returns the degree of a vertex u (i.e. the number of adjacent vertices to u).
     *
     * @return the degree of u
     */
    public int getDegree(T u) {
        return graphRepresentation.getDegree(u);
    }

    /**
     * Returns the Iterable adjacency list of the vertex u.
     *
     * @param u, the vertex
     * @return the Iterable adjacency list of the vertex u
     */
    public Iterable<T> getAdjacent(T u) {
        return graphRepresentation.getAdjacent(u);
    }

    /**
     * Returns an Iterable to all of the vertices of the DirectedGraph.
     *
     * @return an Iterable to all of the vertices of the DirectedGraph
     */
    public Iterable<T> getVertices() {
        return graphRepresentation.getVertices();
    }

    /**
     * Returns the reversed graph, that is, for each edge (u, v) in this DirectedGraph, we
     * add edge (v, u) in the reverse graph.
     *
     * @return the reversed graph
     */
    public DirectedGraph<T> getReverseGraph() {
        DirectedGraph<T> reverseGraph = new DirectedGraph<>();
        for (T u : getVertices()) {
            if (getDegree(u) == 0) {
                reverseGraph.insertVertex(u);
                continue;
            }

            for (T v : getAdjacent(u))
                reverseGraph.insertEdge(v, u);
        }
        return reverseGraph;
    }

    /**
     * Returns a copy of the DirectedGraph.
     *
     * @return a copy of the DirectedGraph
     */
    public DirectedGraph<T> clone() {
        DirectedGraph<T> cloneGraph = new DirectedGraph<>();
        for (T u : getVertices()) {
            if (getDegree(u) == 0) {
                cloneGraph.insertVertex(u);
                continue;
            }

            for (T v : getAdjacent(u))
                cloneGraph.insertEdge(u, v);
        }
        return cloneGraph;
    }
}
```

### Time Complexity

The following table describes the time and space complexity for performing the operations above on 
an undirected graph and directed graph. It is identical to the one for adjacency list since they
both use an adjacency list structure for graph representation as the back-end.

```
| Data Structure   | space complexity     | containsVertex | containsEdge | insertVertex | insertEdge | deleteVertex | deleteEdge | getDegree  | getAdjacent  |
|------------------|----------------------|----------------|--------------|--------------|------------|--------------|------------|------------|--------------|
| undirected graph | O(|V|+|E|)           | O(1)           | O(degree(u)) | O(1)         | O(1)       | O(degree(u)) | O(1)       | O(1)       | O(degree(u)) |
| directed graph   | O(|V|+|E|)           | O(1)           | O(degree(u)) | O(1)         | O(1)       | O(degree(u)) | O(1)       | O(1)       | O(degree(u)) |
```
