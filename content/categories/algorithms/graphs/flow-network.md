# Flow Network

A flow network is a directed graph where each edge has a capacity $C$ and a flow $F$. Flow is 
something that can pass through edges at varying amounts, limited by an upper bound of the 
capacity. It follows that for every edge $e$ with flow $f$ and capacity $c$, $f \leq c$. Typically, 
flow can represent fluid passing through pipes, money passing through a foreign exchange market, or 
traffic passing through a road system, for example.

Generally, we start with a vertex $s$, known as the source, and end with a vertex $t$, known as the 
target. The sum of the flows directed towards a vertex is known as its inflow, and the sum of the 
flows directed outwards from that vertex is known as its outflow. Intuitively, the inflow must 
equal the outflow, except at the source and the target. It follows that the total flow reaching 
the target must be equal to the starting flow at the source.

The approach is that we use a separate class called `FlowCapacityFunction`, which provides the 
operations necessary to map edges to their flow and capacity, a `(flow, capacity)` pair, which are 
both `double` values, and with the restriction that their flow cannot exceed their capacity. Now, in 
addition to maintaining the vertices and edges in `GraphRepresentation`, every edge and its 
associated  that is added must also be added to `FlowCapacityFunction`, and similarly with 
deleting edges (and vertices). As a backend however, they use two `WeightFunction` objects.
We define a new interface for these types of graphs, `FlowNetwork`, with all of the necessary
operations as with regular graphs except now we have operations `getFlow`, `getCapacity`, 
`getTotalFlow`, `getTotalCapacity`. We have the concrete class `FlowNetworkGraph` that implements
this interface.

### Visualization

We draw flow networks like directed weighted graphs, except that now all edges have two associated
values, its flow and its capacity. 

<img src="https://firebasestorage.googleapis.com/v0/b/algorithm-helper-storage.appspot.com/o/img%2Falgorithms%2Fgraphs%2Fflow-network.png?alt=media&token=3bdcf3af-042b-468d-8c55-2d477e965f38" alt="Flow Network" class="img-fluid">

### Implementation (Flow Network)

The following provides the implementation for the `FlowNetwork` interface.

##### Java

```
package com.algorithmhelper.datastructures.interfaces;

public interface FlowNetwork<T extends Comparable<T>> {

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
     * Returns true if the FlowNetwork contains vertex u, false otherwise.
     *
     * @param u, the vertex
     * @return true if the FlowNetwork contains vertex u, false otherwise
     */
    boolean containsVertex(T u);

    /**
     * Returns true if the FlowNetwork contains edge (u, v) in its graph representation, false
     * otherwise.
     *
     * @param u, the first vertex
     * @param v, the second vertex
     * @return true if the FlowNetwork contains edge (u, v) in its graph representation, false
     * otherwise
     */
    boolean containsEdge(T u, T v);

    /**
     * Inserts the vertex u into the FlowNetwork, u must be an isolated vertex, and cannot already
     * be contained in the FlowNetwork.
     *
     * @param u, the vertex
     */
    void insertVertex(T u);

    /**
     * Inserts an edge (u, v) with flow and capacity into the FlowNetwork.
     *
     * @param u, the first vertex
     * @param v, the second vertex
     * @param flow, the flow of edge (u, v)
     * @param capacity, the capacity of edge (u, v)
     */
    void insertEdge(T u, T v, double flow, double capacity);

    /**
     * Deletes a vertex u and all of the edges incident to u.
     *
     * @param u, the vertex
     */
    void deleteVertex(T u);

    /**
     * Deletes an edge (u, v) from the FlowNetwork.
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
     * Returns the flow of an edge (u, v).
     *
     * @param u, the first vertex
     * @param v, the second vertex
     * @return the flow of edge (u, v)
     */
    double getFlow(T u, T v);

    /**
     * Returns the capacity of an edge (u, v).
     *
     * @param u, the first vertex
     * @param v, the second vertex
     * @return the capacity of edge (u, v)
     */
    double getCapacity(T u, T v);

    /**
     * Returns the sum of the flows of the FlowNetwork.
     *
     * @return the sum of the flows of the FlowNetwork
     */
    double getTotalFlow();

    /**
     * Returns the sum of the capacities of the FlowNetwork.
     *
     * @return the sum of the capacities of the FlowNetwork
     */
    double getTotalCapacity();

    /**
     * Returns an Iterable adjacency list of the vertex u.
     *
     * @param u, the vertex
     * @return an Iterable adjacency list of the vertex u
     */
    Iterable<T> getAdjacent(T u);

    /**
     * Returns an Iterable to all of the vertices of the FlowNetwork.
     *
     * @return an Iterable to all of the vertices of the FlowNetwork
     */
    Iterable<T> getVertices();

    /**
     * Returns a copy of the FlowNetwork.
     *
     * @return a copy of the FlowNetwork
     */
    FlowNetwork<T> clone();
}
```

### Implementation (FlowCapacityFunction)

##### Java

```
package com.algorithmhelper.datastructures.graphs;

public class FlowCapacityFunction<T extends Comparable<T>> {

    private WeightFunction<T> flows;
    private WeightFunction<T> capacities;

    /**
     * Initializes an empty FlowCapacityFunction.
     */
    public FlowCapacityFunction() {
        flows = new WeightFunction<>();
        capacities = new WeightFunction<>();
    }

    /**
     * Returns true if the flow/capacity mapping is empty, false otherwise.
     *
     * @return true if the flow/capacity mapping is empty, false otherwise
     */
    public boolean isEmpty() {
        return flows.isEmpty();
    }

    /**
     * Returns the number of elements in the flow/capacity mapping.
     *
     * @return the number of elements in the flow/capacity mapping
     */
    public int size() {
        return flows.size();
    }

    /**
     * Returns true if the edge (u, v) is contained in the FlowCapacityFunction.
     *
     * @param u, the first vertex
     * @param v, the second vertex
     * @return true if the edge (u, v) is contained in the FlowCapacityFunction
     * @throws IllegalArgumentException if the vertex u is null
     * @throws IllegalArgumentException if the vertex v is null
     */
    public boolean containsEdge(T u, T v) {
        return flows.containsEdge(u, v);
    }

    /**
     * Inserts the edge (u, v) into the flow/capacity mapping.
     *
     * @param u, the first vertex
     * @param v, the second vertex
     * @param flow, the flow of edge (u, v)
     * @param capacity, the capacity of edge (u, v)
     * @throws IllegalArgumentException if the vertex u is null
     * @throws IllegalArgumentException if the vertex v is null
     */
    public void insertEdge(T u, T v, double flow, double capacity) {
        flows.insertEdge(u, v, flow);
        capacities.insertEdge(u, v, capacity);
    }

    /**
     * Deletes the edge (u, v) from the flow/capacity mapping.
     *
     * @param u, the vertex u is null
     * @param v, the vertex v is null
     * @throws IllegalArgumentException if the vertex u is null
     * @throws IllegalArgumentException if the vertex v is null
     */
    public void deleteEdge(T u, T v) {
        flows.deleteEdge(u, v);
        capacities.deleteEdge(u, v);
    }

    /**
     * Returns the flow of the edge (u, v) from the flows mapping.
     *
     * @param u, the first vertex
     * @param v, the second vertex
     * @return the flow of the edge (u, v) from the flows mapping
     * @throws IllegalArgumentException if the vertex u is null
     * @throws IllegalArgumentException if the vertex v is null
     */
    public double getFlow(T u, T v) {
        return flows.getWeight(u, v);
    }

    /**
     * Returns the capacity of the edge (u, v) from the capacities mapping.
     *
     * @param u, the first vertex
     * @param v, the second vertex
     * @return the capacity of the edge (u, v) from the capacities mapping
     * @throws IllegalArgumentException if the vertex u is null
     * @throws IllegalArgumentException if the vertex v is null
     */
    public double getCapacity(T u, T v) {
        return capacities.getWeight(u, v);
    }

    /**
     * Returns the reversed FlowCapacityFunction.
     *
     * @return the reversed FlowCapacityFunction
     */
    public FlowCapacityFunction<T> reversedFlowCapacityFunction() {
        FlowCapacityFunction<T> reversedFlowCapacities = new FlowCapacityFunction<>();
        WeightFunction<T> reversedFlows = flows.reversedWeightFunction();
        WeightFunction<T> reversedCapacities = capacities.reversedWeightFunction();
        reversedFlowCapacities.setFlows(reversedFlows);
        reversedFlowCapacities.setCapacities(reversedCapacities);
        return reversedFlowCapacities;
    }

    /**
     * Helper method to set the flows of the FlowCapacityFunction.
     *
     * @param flows
     */
    private void setFlows(WeightFunction<T> flows) {
        this.flows = flows;
    }

    /**
     * Helper method to set the capacities of the FlowCapacityFunction.
     *
     * @param capacities
     */
    private void setCapacities(WeightFunction<T> capacities) {
        this.capacities = capacities;
    }
}
```

### Implementation (Flow Network Graph)

##### Java

```
package com.algorithmhelper.datastructures.graphs;

import com.algorithmhelper.datastructures.interfaces.FlowNetwork;
import com.algorithmhelper.datastructures.interfaces.GraphRepresentation;

public class FlowNetworkGraph<T extends Comparable<T>> implements FlowNetwork<T> {

    /**
     * Internal graph representation structure.
     */
    private GraphRepresentation<T> graphRepresentation;
    private FlowCapacityFunction<T> flowCapacityFunction;
    private double totalFlow;
    private double totalCapacity;

    /**
     * Initializes an empty FlowNetworkGraph.
     */
    public FlowNetworkGraph() {
        graphRepresentation = new AdjacencyList<>();
        flowCapacityFunction = new FlowCapacityFunction<>();
        totalFlow = 0;
        totalCapacity = 0;
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
     * Returns true if the FlowNetworkGraph contains vertex u, false otherwise.
     *
     * @param u, the vertex
     * @return true if the FlowNetworkGraph contains vertex u, false otherwise
     */
    public boolean containsVertex(T u) {
        return graphRepresentation.containsVertex(u);
    }

    /**
     * Returns true if the FlowNetworkGraph contains edge (u, v) in its graph
     * representation, false otherwise.
     *
     * @param u, the first vertex
     * @param v, the second vertex
     * @return true if the FlowNetworkGraph contains edge (u, v) in its graph
     * representation, false otherwise
     */
    public boolean containsEdge(T u, T v) {
        return graphRepresentation.containsEdge(u, v);
    }

    /**
     * Inserts the vertex u into the FlowNetworkGraph, u must be an isolated vertex, and
     * cannot already be contained in the FlowNetworkGraph.
     *
     * @param u, the vertex
     */
    public void insertVertex(T u) {
        graphRepresentation.insertVertex(u);
    }

    /**
     * Inserts an edge (u, v) into the FlowNetworkGraph by inserting edge (u, v) and (v, u)
     * into its graph representation, and its weight to its weightFunction.
     *
     * @param u, the first vertex
     * @param v, the second vertex
     */
    public void insertEdge(T u, T v, double flow, double capacity) {
        graphRepresentation.insertEdge(u, v);
        flowCapacityFunction.insertEdge(u, v, flow, capacity);
        totalFlow += flow;
        totalCapacity += capacity;
    }

    /**
     * Deletes a vertex u, all of the edges incident to u, and all edge flow/capacities associated
     * with u.
     *
     * @param u, the vertex
     */
    public void deleteVertex(T u) {
        for (T v : getVertices()) {
            for (T w : getAdjacent(v)) {
                if (v.equals(u) || w.equals(u)) {
                    graphRepresentation.deleteEdge(v, w);
                    totalFlow -= flowCapacityFunction.getFlow(v, w);
                    totalCapacity -= flowCapacityFunction.getCapacity(v, w);
                    flowCapacityFunction.deleteEdge(v, w);
                }
            }
        }
    }

    /**
     * Deletes an edge (u, v) from the FlowNetworkGraph by deleting edge (u, v)
     * from its graph representation, and its flowCapacityFunction.
     *
     * @param u, the first vertex
     * @param v, the second vertex
     */
    public void deleteEdge(T u, T v) {
        graphRepresentation.deleteEdge(u, v);
        totalFlow -= flowCapacityFunction.getFlow(u, v);
        totalCapacity -= flowCapacityFunction.getCapacity(u, v);
        flowCapacityFunction.deleteEdge(u, v);
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
     * Returns the flow of an edge (u, v).
     *
     * @param u, the first vertex
     * @param v, the second vertex
     * @return the flow of edge (u, v)
     */
    public double getFlow(T u, T v) {
        return flowCapacityFunction.getFlow(u, v);
    }

    /**
     * Returns the capacity of an edge (u, v).
     *
     * @param u, the first vertex
     * @param v, the second vertex
     * @return the capacity of edge (u, v)
     */
    public double getCapacity(T u, T v) {
        return flowCapacityFunction.getCapacity(u, v);
    }

    /**
     * Returns the sum of the flows of the FlowNetworkGraph.
     *
     * @return the sum of the flows of the FlowNetworkGraph
     */
    public double getTotalFlow() {
        return totalFlow;
    }

    /**
     * Returns the sum of the capacities of the FlowNetworkGraph.
     *
     * @return the sum of the capacities of the FlowNetworkGraph
     */
    public double getTotalCapacity() {
        return totalCapacity;
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
     * Returns an Iterable to all of the vertices of the FlowNetworkGraph.
     *
     * @return an Iterable to all of the vertices of the FlowNetworkGraph
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
    public FlowNetworkGraph<T> getReverseGraph() {
        FlowNetworkGraph<T> reverseGraph = new FlowNetworkGraph<>();
        for (T u : getVertices()) {
            if (getDegree(u) == 0) {
                reverseGraph.insertVertex(u);
                continue;
            }

            for (T v : getAdjacent(u))
                reverseGraph.insertEdge(v, u, flowCapacityFunction.getFlow(u, v),
                        flowCapacityFunction.getCapacity(u, v));
        }
        return reverseGraph;
    }

    /**
     * Returns a copy of the FlowNetworkGraph.
     *
     * @return a copy of the FlowNetworkGraph
     */
    public FlowNetworkGraph<T> clone() {
        FlowNetworkGraph<T> cloneGraph = new FlowNetworkGraph<>();
        for (T u : getVertices()) {
            if (getDegree(u) == 0) {
                cloneGraph.insertVertex(u);
                continue;
            }

            for (T v : getAdjacent(u))
                cloneGraph.insertEdge(u, v, flowCapacityFunction.getFlow(u, v),
                        flowCapacityFunction.getCapacity(u, v));
        }
        return cloneGraph;
    }
}
```

### Time Complexity

The time and space complexity for the operations on the graph are identical to the ones for the 
`DirectedWeightedGraph` class, even though the `FlowCapacityFunction` requires two `WeightFunction`
objects for its backend. Thus its space complexity is still proportional to `O(|V|+|E|)`. 

```
| Data Structure     | space complexity | containsVertex | containsEdge | insertVertex | insertEdge | deleteVertex | deleteEdge | getFlow | getCapacity | getDegree | getAdjacent  |
|--------------------|------------------|----------------|--------------|--------------|------------|--------------|------------|---------|-------------|-----------|--------------|
| flow network graph | O(|V|+|E|)       | O(1)           | O(degree(u)) | O(1)         | O(1)       | O(degree(u)) | O(1)       | O(1)    | O(1)        | O(1)      | O(degree(u)) |
```
