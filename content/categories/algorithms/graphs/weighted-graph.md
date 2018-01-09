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

### Implementation (Weighted Graph)

The following provides the implementation for the `WeightedGraph` interface.

##### Java

```
package com.algorithmhelper.datastructures.interfaces;

public interface WeightedGraph<T extends Comparable<T>> {

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
     * Returns true if the WeightedGraph contains vertex u, false otherwise.
     *
     * @param u, the vertex
     * @return true if the WeightedGraph contains vertex u, false otherwise
     */
    boolean containsVertex(T u);

    /**
     * Returns true if the WeightedGraph contains edge (u, v) in its graph representation, false otherwise.
     *
     * @param u, the first vertex
     * @param v, the second vertex
     * @return true if the WeightedGraph contains edge (u, v) in its graph representation, false otherwise
     */
    boolean containsEdge(T u, T v);

    /**
     * Inserts the vertex u into the WeightedGraph, u must be an isolated vertex, and cannot already be
     * contained in the WeightedGraph.
     *
     * @param u, the vertex
     */
    void insertVertex(T u);

    /**
     * Inserts an edge (u, v) with weight into the WeightedGraph.
     *
     * @param u, the first vertex
     * @param v, the second vertex
     * @param weight, the weight of edge (u, v)
     */
    void insertEdge(T u, T v, double weight);

    /**
     * Deletes a vertex u and all of the edges incident to u.
     *
     * @param u, the vertex
     */
    void deleteVertex(T u);

    /**
     * Deletes an edge (u, v) from the WeightedGraph.
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
     * Returns the weight of an edge (u, v).
     *
     * @param u, the first vertex
     * @param v, the second vertex
     * @return the edge weight of edge (u, v)
     */
    double getWeight(T u, T v);

    /**
     * Returns the sum of the edge weights of the WeightedGraph.
     *
     * @return the sum of the edge weights of the WeightedGraph
     */
    double getTotalWeight();

    /**
     * Returns an Iterable adjacency list of the vertex u.
     *
     * @param u, the vertex
     * @return an Iterable adjacency list of the vertex u
     */
    Iterable<T> getAdjacent(T u);

    /**
     * Returns an Iterable to all of the vertices of the WeightedGraph.
     *
     * @return an Iterable to all of the vertices of the WeightedGraph
     */
    Iterable<T> getVertices();

    /**
     * Returns a copy of the WeightedGraph.
     *
     * @return a copy of the WeightedGraph
     */
    WeightedGraph<T> clone();
}
```

### Implementation (Weight Function)

##### Java

```
package com.algorithmhelper.datastructures.graphs;

import com.algorithmhelper.datastructures.hashing.HashMapLinearProbing;
import com.algorithmhelper.datastructures.interfaces.Map;

public class WeightFunction<T extends Comparable<T>> {

    private Map<Edge<T>, Double> weights;

    private class Edge<T extends Comparable<T>> implements Comparable<Edge<T>> {
        T u;
        T v;

        Edge(T u, T v) {
            this.u = u;
            this.v = v;
        }

        public int compareTo(Edge<T> that) {
            if (this.equals(that))
                return 0;
            return this.u.compareTo(that.u) > 0 ? 1 :
                    (this.u.compareTo(that.u) < 0 ? -1 :
                    (this.v.compareTo(that.v) > 0) ? 1 : -1);
        }

        public boolean equals(Edge<T> that) {
            return this.u.equals(that.u) && this.v.equals(that.v);
        }
    }

    /**
     * Initializes an empty WeightFunction.
     */
    public WeightFunction() {
        weights = new HashMapLinearProbing<>();
    }

    /**
     * Returns true if the weights mapping is empty, false otherwise.
     *
     * @return true if the weights mapping is empty, false otherwise
     */
    public boolean isEmpty() {
        return weights.isEmpty();
    }

    /**
     * Returns the number of elements in the weights mapping.
     *
     * @return the number of elements in the weights mapping
     */
    public int size() {
        return weights.size();
    }

    /**
     * Returns true if the edge (u, v) is contained in the WeightFunction.
     *
     * @param u, the first vertex
     * @param v, the second vertex
     * @return true if the edge (u, v) is contained in the WeightFunction
     * @throws IllegalArgumentException if the vertex u is null
     * @throws IllegalArgumentException if the vertex v is null
     */
    public boolean containsEdge(T u, T v) {
        if (u == null)
            throw new IllegalArgumentException("containsEdge with null vertex u");
        if (v == null)
            throw new IllegalArgumentException("containsEdge with null vertex v");
        return weights.contains(new Edge<>(u, v));
    }

    /**
     * Inserts the edge (u, v) into the weights mapping.
     *
     * @param u, the first vertex
     * @param v, the second vertex
     * @param weight, the weight of edge (u, v)
     * @throws IllegalArgumentException if the vertex u is null
     * @throws IllegalArgumentException if the vertex v is null
     */
    public void insertEdge(T u, T v, double weight) {
        if (u == null)
            throw new IllegalArgumentException("insertEdge with null vertex u");
        if (v == null)
            throw new IllegalArgumentException("insertEdge with null vertex v");
        weights.put(new Edge<>(u, v), weight);
    }

    /**
     * Deletes the edge (u, v) from the weights mapping.
     *
     * @param u, the vertex u is null
     * @param v, the vertex v is null
     * @throws IllegalArgumentException if the vertex u is null
     * @throws IllegalArgumentException if the vertex v is null
     */
    public void deleteEdge(T u, T v) {
        if (u == null)
            throw new IllegalArgumentException("deleteEdge with null vertex u");
        if (v == null)
            throw new IllegalArgumentException("deleteEdge with null vertex v");
        weights.delete(new Edge<>(u, v));
    }

    /**
     * Returns the weight of the edge (u, v) from the weights mapping.
     *
     * @param u, the first vertex
     * @param v, the second vertex
     * @return the weight of the edge (u, v) from the weights mapping
     * @throws IllegalArgumentException if the vertex u is null
     * @throws IllegalArgumentException if the vertex v is null
     */
    public double getWeight(T u, T v) {
        if (u == null)
            throw new IllegalArgumentException("getWeight with null vertex u");
        if (v == null)
            throw new IllegalArgumentException("getWeight with null vertex v");
        Edge<T> e = new Edge<>(u, v);
        if (!weights.contains(e))
            throw new IllegalArgumentException("getWeight with non-existent edge (u, v)");
        return weights.get(e);
    }

    /**
     * Returns the weight of the edge e.
     *
     * @param e, the edge
     * @return the weight of the edge
     */
    private double getWeight(Edge<T> e) {
        return weights.get(e);
    }

    /**
     * Returns the reversed WeightFunction.
     *
     * @return the reversed WeightFunction
     */
    public WeightFunction<T> reversedWeightFunction() {
        WeightFunction<T> reversedWeights = new WeightFunction<>();
        for (Edge<T> e : weights.keys())
            reversedWeights.insertEdge(e.v, e.u, getWeight(e));
        return reversedWeights;
    }
}
```

### Implementation (Undirected)

##### Java

```
package com.algorithmhelper.datastructures.graphs;

import com.algorithmhelper.datastructures.interfaces.GraphRepresentation;
import com.algorithmhelper.datastructures.interfaces.WeightedGraph;

public class UndirectedWeightedGraph<T extends Comparable<T>> implements WeightedGraph<T> {

    /**
     * Internal graph representation structure.
     */
    private GraphRepresentation<T> graphRepresentation;
    private WeightFunction<T> weightFunction;
    private double totalWeight;

    /**
     * Initializes an empty UndirectedWeightedGraph.
     */
    public UndirectedWeightedGraph() {
        graphRepresentation = new AdjacencyList<>();
        weightFunction = new WeightFunction<>();
        totalWeight = 0;
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
     * Returns true if the UndirectedWeightedGraph contains vertex u, false otherwise.
     *
     * @param u, the vertex
     * @return true if the UndirectedWeightedGraph contains vertex u, false otherwise
     */
    public boolean containsVertex(T u) {
        return graphRepresentation.containsVertex(u);
    }

    /**
     * Returns true if the UndirectedWeightedGraph contains edge (u, v) or (v, u) in its graph
     * representation, false otherwise.
     *
     * @param u, the first vertex
     * @param v, the second vertex
     * @return true if the UndirectedWeightedGraph contains edge (u, v) or (v, u) in its graph
     * representation, false otherwise
     */
    public boolean containsEdge(T u, T v) {
        return graphRepresentation.containsEdge(u, v) || graphRepresentation.containsEdge(v, u);
    }

    /**
     * Inserts the vertex u into the UndirectedWeightedGraph, u must be an isolated vertex, and
     * cannot already be contained in the UndirectedWeightedGraph.
     *
     * @param u, the vertex
     */
    public void insertVertex(T u) {
        graphRepresentation.insertVertex(u);
    }

    /**
     * Inserts an edge (u, v) into the UndirectedWeightedGraph by inserting edge (u, v) and (v, u)
     * into its graph representation, and its weight to its weightFunction.
     *
     * @param u, the first vertex
     * @param v, the second vertex
     */
    public void insertEdge(T u, T v, double weight) {
        graphRepresentation.insertEdge(u, v);
        graphRepresentation.insertEdge(v, u);
        weightFunction.insertEdge(u, v, weight);
        weightFunction.insertEdge(v, u, weight);
        totalWeight += weight;
    }

    /**
     * Deletes a vertex u, all of the edges incident to u, and all edge weights associated with u.
     *
     * @param u, the vertex
     */
    public void deleteVertex(T u) {
        for (T v : getAdjacent(u)) {
            graphRepresentation.deleteEdge(u, v);
            graphRepresentation.deleteEdge(v, u);
            totalWeight -= weightFunction.getWeight(u, v);
            weightFunction.deleteEdge(u, v);
            weightFunction.deleteEdge(v, u);
        }
    }

    /**
     * Deletes an edge (u, v) from the UndirectedWeightedGraph by deleting edge (u, v) and (v, u)
     * from its graph representation, and its weightFunction.
     *
     * @param u, the first vertex
     * @param v, the second vertex
     */
    public void deleteEdge(T u, T v) {
        graphRepresentation.deleteEdge(u, v);
        graphRepresentation.deleteEdge(v, u);
        totalWeight -= weightFunction.getWeight(u, v);
        weightFunction.deleteEdge(u, v);
        weightFunction.deleteEdge(v, u);
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
     * Returns the weight of an edge (u, v).
     *
     * @param u, the first vertex
     * @param v, the second vertex
     * @return the edge weight of edge (u, v)
     */
    public double getWeight(T u, T v) {
        return weightFunction.getWeight(u, v);
    }

    /**
     * Returns the sum of the edge weights of the UndirectedWeightedGraph.
     *
     * @return the sum of the edge weights of the UndirectedWeightedGraph
     */
    public double getTotalWeight() {
        return totalWeight;
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
     * Returns an Iterable to all of the vertices of the UndirectedWeightedGraph.
     *
     * @return an Iterable to all of the vertices of the UndirectedWeightedGraph
     */
    public Iterable<T> getVertices() {
        return graphRepresentation.getVertices();
    }

    /**
     * Returns a copy of the UndirectedWeightedGraph.
     *
     * @return a copy of the UndirectedWeightedGraph
     */
    public UndirectedWeightedGraph<T> clone() {
        UndirectedWeightedGraph<T> cloneGraph = new UndirectedWeightedGraph<>();
        for (T u : getVertices()) {
            if (getDegree(u) == 0) {
                cloneGraph.insertVertex(u);
                continue;
            }

            for (T v : getAdjacent(u))
                cloneGraph.insertEdge(u, v, weightFunction.getWeight(u, v));
        }
        return cloneGraph;
    }
}
```

### Implementation (Directed)

##### Java

```
package com.algorithmhelper.datastructures.graphs;

import com.algorithmhelper.datastructures.interfaces.GraphRepresentation;
import com.algorithmhelper.datastructures.interfaces.WeightedGraph;

public class DirectedWeightedGraph<T extends Comparable<T>> implements WeightedGraph<T> {

    /**
     * Internal graph representation structure.
     */
    private GraphRepresentation<T> graphRepresentation;
    private WeightFunction<T> weightFunction;
    private double totalWeight;

    /**
     * Initializes an empty DirectedWeightedGraph.
     */
    public DirectedWeightedGraph() {
        graphRepresentation = new AdjacencyList<>();
        weightFunction = new WeightFunction<>();
        totalWeight = 0;
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
     * Returns true if the DirectedWeightedGraph contains vertex u, false otherwise.
     *
     * @param u, the vertex
     * @return true if the DirectedWeightedGraph contains vertex u, false otherwise
     */
    public boolean containsVertex(T u) {
        return graphRepresentation.containsVertex(u);
    }

    /**
     * Returns true if the DirectedWeightedGraph contains edge (u, v) in its graph
     * representation, false otherwise.
     *
     * @param u, the first vertex
     * @param v, the second vertex
     * @return true if the DirectedWeightedGraph contains edge (u, v) in its graph
     * representation, false otherwise
     */
    public boolean containsEdge(T u, T v) {
        return graphRepresentation.containsEdge(u, v);
    }

    /**
     * Inserts the vertex u into the DirectedWeightedGraph, u must be an isolated vertex, and
     * cannot already be contained in the DirectedWeightedGraph.
     *
     * @param u, the vertex
     */
    public void insertVertex(T u) {
        graphRepresentation.insertVertex(u);
    }

    /**
     * Inserts an edge (u, v) into the DirectedWeightedGraph by inserting edge (u, v)
     * into its graph representation, and its weight to its weightFunction.
     *
     * @param u, the first vertex
     * @param v, the second vertex
     */
    public void insertEdge(T u, T v, double weight) {
        graphRepresentation.insertEdge(u, v);
        weightFunction.insertEdge(u, v, weight);
        totalWeight += weight;
    }

    /**
     * Deletes a vertex u, all of the edges incident to u, and all edge weights associated with u.
     *
     * @param u, the vertex
     */
    public void deleteVertex(T u) {
        for (T v : getVertices()) {
            for (T w : getAdjacent(v)) {
                if (v.equals(u) || w.equals(u)) {
                    graphRepresentation.deleteEdge(v, w);
                    totalWeight -= weightFunction.getWeight(v, w);
                    weightFunction.deleteEdge(v, w);
                }
            }
        }
    }

    /**
     * Deletes an edge (u, v) from the DirectedWeightedGraph by deleting edge (u, v)
     * from its graph representation, and its weightFunction.
     *
     * @param u, the first vertex
     * @param v, the second vertex
     */
    public void deleteEdge(T u, T v) {
        graphRepresentation.deleteEdge(u, v);
        totalWeight -= weightFunction.getWeight(u, v);
        weightFunction.deleteEdge(u, v);
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
     * Returns the weight of an edge (u, v).
     *
     * @param u, the first vertex
     * @param v, the second vertex
     * @return the edge weight of edge (u, v)
     */
    public double getWeight(T u, T v) {
        return weightFunction.getWeight(u, v);
    }

    /**
     * Returns the sum of the edge weights of the DirectedWeightedGraph.
     *
     * @return the sum of the edge weights of the DirectedWeightedGraph
     */
    public double getTotalWeight() {
        return totalWeight;
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
     * Returns an Iterable to all of the vertices of the DirectedWeightedGraph.
     *
     * @return an Iterable to all of the vertices of the DirectedWeightedGraph
     */
    public Iterable<T> getVertices() {
        return graphRepresentation.getVertices();
    }

    /**
     * Returns the reversed graph, that is, for each edge (u, v) in this DirectedWeightedGraph, we
     * add edge (v, u) in the reverse graph.
     *
     * @return the reversed graph
     */
    public DirectedWeightedGraph<T> getReverseGraph() {
        DirectedWeightedGraph<T> reverseGraph = new DirectedWeightedGraph<>();
        for (T u : getVertices()) {
            if (getDegree(u) == 0) {
                reverseGraph.insertVertex(u);
                continue;
            }

            for (T v : getAdjacent(u))
                reverseGraph.insertEdge(v, u, weightFunction.getWeight(u, v));
        }
        return reverseGraph;
    }

    /**
     * Returns a copy of the DirectedWeightedGraph.
     *
     * @return a copy of the DirectedWeightedGraph
     */
    public DirectedWeightedGraph<T> clone() {
        DirectedWeightedGraph<T> cloneGraph = new DirectedWeightedGraph<>();
        for (T u : getVertices()) {
            if (getDegree(u) == 0) {
                cloneGraph.insertVertex(u);
                continue;
            }

            for (T v : getAdjacent(u))
                cloneGraph.insertEdge(u, v, weightFunction.getWeight(u, v));
        }
        return cloneGraph;
    }
}
```

### Time Complexity

The time and space complexity for the operations on the graph are identical to the ones for the `UndirectedGraph` and `DirectedGraph` classes. Since `WeightFunction` needs to map exactly $|E|$
edges to weights, it uses an additional $O(|E|)$ space, however, since the space complexity of 
the original `UndirectedGraph` and `DirectedGraph` is already $O(|V|+|E|)$, it does not make a 
difference, complexity wise.

```
| Data Structure            | space complexity | containsVertex | containsEdge | insertVertex | insertEdge | deleteVertex | deleteEdge | getWeight | getDegree  | getAdjacent  |
|---------------------------|------------------|----------------|--------------|--------------|------------|--------------|------------|-----------|------------|--------------|
| undirected weighted graph | O(|V|+|E|)       | O(1)           | O(degree(u)) | O(1)         | O(1)       | O(degree(u)) | O(1)       | O(1)      | O(1)       | O(degree(u)) |
| directed weighted graph   | O(|V|+|E|)       | O(1)           | O(degree(u)) | O(1)         | O(1)       | O(degree(u)) | O(1)       | O(1)      | O(1)       | O(degree(u)) |
```
