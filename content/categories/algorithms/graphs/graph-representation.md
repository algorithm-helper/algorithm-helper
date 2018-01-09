# Graph Representation

Graph representation refers to what kind of data structure will be used to represent the
relationships between the vertex set $V$ and the edge set $E$. For an effective data structure for
graphs, we need to be able to support basic operations of graphs efficiently, and generally, these
operations are `V`, `E`, `containsVertex/containsEdge`, `insertVertex/insertEdge`, 
`deleteVertex/deleteEdge`, `getDegree`, `getAdjacent`, and `getVertices`, which give us the total
number of vertices and edges, check whether a vertex of edge exists in the graph, add and remove
vertices and edges, get the degree of a particular vertex, iterate over the adjacent vertices of 
a particular vertex (its neighbors), and iterate over all of the vertices altogether, respectively.

There are three main methods to represent a graph: using an edge list, vertex matrix, or an 
adjacency matrix. While they do have their own respective advantages and disadvantages in certain
use cases, the structure that will primarily be used is the adjacency list, because of how 
overall, operations are efficient.

### Edge List

An edge list is a data structure for graph representation, and the main approach is to maintain a 
list of containing all of the edges, with each edge represented as a pair of vertices.

For example:

```
// The following is an edge list:
(1, 2)
(2, 1)
(2, 3)
(5, 6)
(2, 5)
(5, 6)
(7, 8)
```

Here, the edges are represented with vertices delimited by a comma on each line, and we have the 
edges $(1, 2), (2, 1), (2, 3), (5, 6), (2, 5), (5, 6), (7, 8)$. This is a very simple way of 
graph representation.

One of the properties of this type of structure is that we can add edges in $O(1)$ time, simply by 
appending it to the existing list, and it is simple to implement. But deleting edges takes $O(|E|)$
time, which may be advantageous with sparse graphs, but inefficient in dense graphs, as it becomes 
$O(|V|^2)$ time. This is because we must iterate over every edge one at a time to find the one that we
are looking for.

However, for operations like checking if a certain edge exists, this also takes $O(|E|)$ time since we 
would have to iterate through the list and find the corresponding pair. All to find the neighbors 
of a vertex $u$, we would also have to iterate through the list and collect all the pairs that 
start from $u$.

### Vertex Matrix

A vertex matrix is a data structure for graph representation, and the main approach is to store the relationships between vertices in a 2-dimensional $|V|\times|V|$ array `A` of booleans. All of the elements 
in this 2D array are initialized to false, and we set an element at `A[i][j]` to be true only if 
there is an edge from vertex `i` to vertex `j`.

For example:

```
// The following is a vertex matrix (0 - false, 1 - true):

        j
    0 1 2 3 4
  0 0 0 0 0 0
  1 1 1 0 1 0
  2 0 1 0 1 0
i 3 1 1 0 0 0
  4 0 0 0 1 0
```

Here, when an element at `A[i][j]` is true, then there is an edge from vertex `i` to vertex `j`, 
and thus we have the following edges: $(1, 0), (1, 1), (1, 3), (2, 1), (2, 3), (3, 0), (3, 1),  
(4, 3)$.

One of the properties of this type of structure is that we are able to add or delete an edge in 
$O(1)$ time, since all we have to do is index into the array and set the boolean to be true or 
false. Likewise, we can check if two vertices are adjacent in $O(1)$ time by checking if the element 
at the corresponding index is true.

However, if we were to find the neighbors of a vertex $u$, we would have to iterate through that 
element's entire row, collecting all of the column indices which at that row are set to true. Thus, 
this takes $O(N)$ time. Furthermore, this structure is not space efficient, as we require 
$O(|V|^2)$ space to build this matrix. Although it is independent on the number of edges, this space 
usage would never be advantageous even in the case of a dense graph, since in a dense
graph, the number of edges is proportional to $O(|V|^2)$.

### Adjacency List

An adjacency list is a data structure for graph representation, and the main idea is to keep an 
array of linked lists of vertices, where the index of the array represents a particular vertex $u$, 
and its corresponding linked list represents the neighbors from $u$.

For example:

```
// The following is an adjacency list:

array indices:
[0] -> [1] -> [3]
[1] -> [2]
[2] -> [1] -> [4]
[3]
[4] -> [1]
```

Here, we can find the edges by iterating through the array `A` for every index `i`, and iterating 
through the corresponding linked list corresponding for every index `j`, we collect all edges
$(i, j)$, thus in the example we have the following edges: $(0, 1), (0, 3), (1, 2), (2, 1), (2, 4), 
(4, 1)$. This is a much more intuitive and natural way of representing graphs as opposed to the 
previous two data structures.

One of the advantages to this data structure is that adding or deleting an edge can be done in 
$O(1)$ time, since indexing into the array takes $O(1)$ time, and we
can simply append the new vertex forming the new edge to the front of the linked list (or back, if 
we have a `back` pointer).

To check if vertex $v$ is adjacent to vertex $u$, we index into array at $u$, and then traverse the corresponding linked list to find $v$. Since indexing into the array is done in $O(1)$ time, and 
traversing the corresponding linked list is done in $O(degree(u))$ time, thus this operation runs 
in $O(degree(u))$ time, where $u$ is the starting vertex in question.

Similarly, if we wanted to find all the neighbors of vertex $u$, we index into the array at $u$, 
and then traverse through the corresponding linked list. This is also done in $O(degree(u))$ time, 
where $u$ is the vertex in question.

The space complexity of this data structure is $O(|V|+|E|)$, and intuitively, this is because first we 
must represent all of the vertices by index in the array, and then for each corresponding linked 
list, that represents all of the edges outgoing from that Vertex, but if we sum all of the edges 
from all of the vertices, we get all of the edges in the Graph.

### Implementation (Graph Representation)

The following provides the interface for the `GraphRepresentation` class.

##### Java

```
package com.algorithmhelper.datastructures.interfaces;

public interface GraphRepresentation<T extends Comparable<T>> {

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
     * Returns true if the GraphRepresentation contains vertex u, false otherwise.
     *
     * @param u, the vertex
     * @return true if the GraphRepresentation contains vertex u, false otherwise
     */
    boolean containsVertex(T u);

    /**
     * Returns true if the GraphRepresentation contains edge (u, v), false otherwise.
     *
     * @param u, the first vertex
     * @param v, the second vertex
     * @return true if the GraphRepresentation contains edge (u, v), false otherwise
     */
    boolean containsEdge(T u, T v);

    /**
     * Inserts the vertex u into the GraphRepresentation, u must be an isolated vertex, and cannot
     * already be contained in the GraphRepresentation.
     *
     * @param u, the vertex
     */
    void insertVertex(T u);

    /**
     * Inserts an edge (u, v) into the GraphRepresentation.
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
     * Deletes an edge (u, v) from the GraphRepresentation.
     *
     * @param u, the first vertex
     * @param v, the second vertex
     */
    void deleteEdge(T u, T v);

    /**
     * Returns the degree of a vertex u (i.e. the number of adjacent vertices to u).
     *
     * @return the degree of u
     */
    int getDegree(T u);

    /**
     * Returns an Iterable adjacency list of the vertex u.
     *
     * @param u, the vertex
     * @return the Iterable adjacency list of the vertex u
     */
    Iterable<T> getAdjacent(T u);

    /**
     * Returns an Iterable to all of the vertices of the GraphRepresentation.
     *
     * @return an Iterable to all of the vertices of the GraphRepresentation
     */
    Iterable<T> getVertices();
}
```

### Implementation (Edge List)

##### Java

```
package com.algorithmhelper.datastructures.graphs;

import com.algorithmhelper.datastructures.hashing.HashSetLinearProbing;
import com.algorithmhelper.datastructures.interfaces.GraphRepresentation;
import com.algorithmhelper.datastructures.interfaces.Set;
import com.algorithmhelper.datastructures.lists.DynamicArray;

public class EdgeList<T extends Comparable<T>> implements GraphRepresentation<T> {

    /**
     * Edge class.
     */
    private class Edge {
        T u;
        T v;

        /**
         * Initializes an Edge with vertices u and v.
         *
         * @param u, the first vertex
         * @param v, the second vertex
         */
        Edge(T u, T v) {
            this.u = u;
            this.v = v;
        }

        boolean equals(Edge that) {
            return this.u.equals(that.u) && this.v.equals(that.v);
        }
    }

    private DynamicArray<Edge> edgeList;
    private int E;
    private int V;

    /**
     * Initializes an empty EdgeList.
     */
    public EdgeList() {
        edgeList = new DynamicArray<>();
        E = 0;
        V = 0;
    }

    /**
     * Returns the number of vertices.
     *
     * @return the number of vertices
     */
    public int V() {
        return V;
    }

    /**
     * Returns the number of edges.
     *
     * @return the number of edges
     */
    public int E() {
        return E;
    }

    /**
     * Returns true if the EdgeList contains vertex u, false otherwise.
     *
     * @param u, the vertex
     * @return true if the EdgeList contains vertex u, false otherwise
     * @throws IllegalArgumentException if the vertex u is null
     */
    public boolean containsVertex(T u) {
        if (u == null)
            throw new IllegalArgumentException("containsVertex with null vertex u");

        for (Edge edge : edgeList) {
            if (edge.u.equals(u) || edge.v.equals(u))
                return true;
        }
        return false;
    }

    /**
     * Returns true if the EdgeList contains edge (u, v), false otherwise.
     *
     * @param u, the first vertex
     * @param v, the second vertex
     * @return true if the EdgeList contains edge (u, v), false otherwise
     * @throws IllegalArgumentException if the vertex u is null
     * @throws IllegalArgumentException if the vertex v is null
     */
    public boolean containsEdge(T u, T v) {
        if (u == null)
            throw new IllegalArgumentException("containsEdge with null vertex u");
        if (v == null)
            throw new IllegalArgumentException("containsEdge with null vertex v");

        for (Edge edge : edgeList) {
            if (edge.u.equals(u) && edge.v.equals(v))
                return true;
        }
        return false;
    }

    /**
     * This is not supported.
     *
     * @throws IllegalArgumentException
     */
    public void insertVertex(T u) {
        throw new IllegalArgumentException("insertVertex not supported");
    }

    /**
     * Inserts an edge (u, v) into the EdgeList.
     *
     * @param u, the first vertex
     * @param v, the second vertex
     * @throws IllegalArgumentException if the vertex u is null
     * @throws IllegalArgumentException if the vertex v is null
     */
    public void insertEdge(T u, T v) {
        if (u == null)
            throw new IllegalArgumentException("insertEdge with null vertex u");
        if (v == null)
            throw new IllegalArgumentException("insertEdge with null vertex v");

        if (containsEdge(u, v))
            return;
        if (!containsVertex(u))
            V++;
        if (!containsVertex(v))
            V++;
        edgeList.insertBack(new Edge(u, v));
        E++;
    }

    /**
     * Deletes a vertex u and all of the edges incident to u.
     *
     * @param u, the vertex
     * @throws IllegalArgumentException if the vertex u is null
     */
    public void deleteVertex(T u) {
        if (u == null)
            throw new IllegalArgumentException("deleteVertex with null vertex u");
        if (!containsVertex(u))
            return;

        DynamicArray<Edge> newEdgeList = new DynamicArray<>();
        E = 0;
        for (Edge edge : edgeList) {
            if (!edge.u.equals(u) && !edge.v.equals(u)) {
                newEdgeList.insertBack(edge);
                E++;
            }
        }
        edgeList = newEdgeList;
        V--;
    }

    /**
     * Deletes an edge (u, v) from the EdgeList.
     *
     * @param u, the first vertex
     * @param v, the second vertex
     * @throws IllegalArgumentException if the vertex u is null
     * @throws IllegalArgumentException if the vertex v is null
     */
    public void deleteEdge(T u, T v) {
        if (u == null)
            throw new IllegalArgumentException("deleteEdge with null vertex u");
        if (v == null)
            throw new IllegalArgumentException("deleteEdge with null vertex v");
        if (!containsEdge(u, v))
            return;

        int i = 0;
        Edge temp = new Edge(u, v);
        for (Edge edge : edgeList) {
            if (temp.equals(edge))
                return;
            i++;
        }
        edgeList.remove(i);

        if (!containsVertex(u))
            V--;
        if (!containsVertex(v))
            V--;
        E--;
    }

    /**
     * Returns the degree of a vertex u (i.e. the number of adjacent vertices to u).
     *
     * @return the degree of u
     * @throws IllegalArgumentException if the vertex u is null
     * @throws IllegalArgumentException if the vertex u is not contained in the EdgeList
     */
    public int getDegree(T u) {
        if (u == null)
            throw new IllegalArgumentException("getDegree with null vertex u");
        if (!containsVertex(u))
            throw new IllegalArgumentException("getDegree with non-existent vertex u");

        int degree = 0;
        Set<T> set = new HashSetLinearProbing<>();
        for (Edge edge : edgeList) {
            if (edge.u.equals(u) && !edge.v.equals(u)) {
                if (!set.contains(edge.v)) {
                    degree++;
                    set.put(edge.v);
                }
            } else if (!edge.u.equals(u) && edge.v.equals(u)) {
                if (!set.contains(edge.u)) {
                    degree++;
                    set.put(edge.u);
                }
            }
        }
        return degree;
    }

    /**
     * Returns an Iterable to all of the vertices adjacent to vertex u.
     *
     * @param u, the vertex
     * @return the Iterable adjacency list of the vertex u
     * @throws IllegalArgumentException if the vertex u is null
     * @throws IllegalArgumentException if the vertex u is not contained in the EdgeList
     */
    public Iterable<T> getAdjacent(T u) {
        if (u == null)
            throw new IllegalArgumentException("getAdjacent with null vertex u");
        if (!containsVertex(u))
            throw new IllegalArgumentException("getAdjacent with non-existent vertex u");

        Set<T> set = new HashSetLinearProbing<>();
        for (Edge edge : edgeList) {
            if (edge.u.equals(u) && !edge.v.equals(u))
                set.put(edge.v);
        }
        return set.keys();
    }

    /**
     * Returns an Iterable to all of the vertices of the EdgeList.
     *
     * @return an Iterable to all of the vertices of the EdgeList
     */
    public Iterable<T> getVertices() {
        Set<T> set = new HashSetLinearProbing<>();
        for (Edge edge : edgeList) {
            set.put(edge.u);
            set.put(edge.v);
        }
        return set.keys();
    }
}
```

### Implementation (Vertex Matrix)

##### Java

```
package com.algorithmhelper.datastructures.graphs;

import com.algorithmhelper.datastructures.hashing.HashMapLinearProbing;
import com.algorithmhelper.datastructures.hashing.HashSetLinearProbing;
import com.algorithmhelper.datastructures.interfaces.GraphRepresentation;

/**
 * Note: Using a VertexMatrix for non-integer types makes using a 2D array unusable.
 * We implement the matrix as a sparse matrix using HashMaps/HashSets, but this ends up
 * being nearly the same as the AdjacencyList. Use that instead.
 */
public class VertexMatrix<T extends Comparable<T>> implements GraphRepresentation<T> {

    private HashMapLinearProbing<T, HashSetLinearProbing<T>> vertexMatrix;
    private int V;
    private int E;

    /**
     * Initializes an empty VertexMatrix.
     */
    public VertexMatrix() {
        E = 0;
        V = 0;
    }

    /**
     * Returns the number of vertices.
     *
     * @return the number of vertices
     */
    public int V() {
        return V;
    }

    /**
     * Returns the number of edges.
     *
     * @return the number of edges
     */
    public int E() {
        return E;
    }

    /**
     * Returns true if the VertexMatrix contains vertex u, false otherwise.
     *
     * @param u, the vertex
     * @return true if the VertexMatrix contains vertex u, false otherwise
     * @throws IllegalArgumentException if the vertex u is null
     */
    public boolean containsVertex(T u) {
        if (u == null)
            throw new IllegalArgumentException("containsVertex with null vertex u");

        return vertexMatrix.contains(u);
    }

    /**
     * Returns true if the VertexMatrix contains edge (u, v), false otherwise.
     *
     * @param u, the first vertex
     * @param v, the second vertex
     * @return true if the VertexMatrix contains edge (u, v), false otherwise
     * @throws IllegalArgumentException if the vertex u is null
     * @throws IllegalArgumentException if the vertex v is null
     */
    public boolean containsEdge(T u, T v) {
        if (u == null)
            throw new IllegalArgumentException("containsEdge with null vertex u");
        if (v == null)
            throw new IllegalArgumentException("containsEdge with null vertex v");

        if (!containsVertex(u))
            return false;
        return vertexMatrix.get(u).contains(v);
    }

    /**
     * Inserts the vertex u into the VertexMatrix, u must be an isolated vertex, and cannot
     * already be contained in the VertexMatrix.
     *
     * @param u, the vertex
     * @throws IllegalArgumentException if the vertex u is null
     */
    public void insertVertex(T u) {
        if (u == null)
            throw new IllegalArgumentException("insertVertex with null vertex u");

        if (containsVertex(u))
            return;
        vertexMatrix.put(u, new HashSetLinearProbing<>());
        V++;
    }

    /**
     * Inserts an edge (u, v) into the VertexMatrix.
     *
     * @param u, the first vertex
     * @param v, the second vertex
     */
    public void insertEdge(T u, T v) {
        if (u == null)
            throw new IllegalArgumentException("insertEdge with null vertex u");
        if (v == null)
            throw new IllegalArgumentException("insertEdge with null vertex v");

        if (containsEdge(u, v))
            return;
        if (!containsVertex(u))
            insertVertex(u);
        if (!containsVertex(v))
            insertVertex(v);
        vertexMatrix.get(u).put(v);
        E++;
    }

    /**
     * Deletes a vertex u and all of the edges incident to u.
     *
     * @param u, the vertex
     * @throws IllegalArgumentException if the vertex u is null
     */
    public void deleteVertex(T u) {
        if (u == null)
            throw new IllegalArgumentException("deleteVertex with null vertex u");
        if (!containsVertex(u))
            return;

        vertexMatrix.delete(u);
        for (T v : vertexMatrix.keys()) {
            if (vertexMatrix.get(v).contains(u)) {
                vertexMatrix.get(v).delete(u);
                E--;
            }
        }
        V--;
    }

    /**
     * Deletes an edge (u, v) from the VertexMatrix.
     *
     * @param u, the first vertex
     * @param v, the second vertex
     * @throws IllegalArgumentException if the vertex u is null
     * @throws IllegalArgumentException if the vertex v is null
     */
    public void deleteEdge(T u, T v) {
        if (u == null)
            throw new IllegalArgumentException("deleteEdge with null vertex u");
        if (v == null)
            throw new IllegalArgumentException("deleteEdge with null vertex v");
        if (!containsEdge(u, v))
            return;

        vertexMatrix.get(u).delete(v);
        E--;
    }

    /**
     * Returns the degree of a vertex u (i.e. the number of adjacent vertices to u).
     *
     * @return the degree of u
     */
    public int getDegree(T u) {
        if (u == null)
            throw new IllegalArgumentException("getDegree with null vertex u");
        if (!containsVertex(u))
            throw new IllegalArgumentException("getDegree with non-existent vertex u");

        return vertexMatrix.get(u).size();
    }

    /**
     * Returns the Iterable adjacency list of the vertex u.
     *
     * @param u, the vertex
     * @return the Iterable adjacency list of the vertex u
     */
    public Iterable<T> getAdjacent(T u) {
        if (u == null)
            throw new IllegalArgumentException("getAdjacent with null vertex u");
        if (!containsVertex(u))
            throw new IllegalArgumentException("getAdjacent with non-existent vertex u");

        return vertexMatrix.get(u).keys();
    }

    /**
     * Returns an Iterable to all of the vertices of the VertexMatrix.
     *
     * @return an Iterable to all of the vertices of the VertexMatrix
     */
    public Iterable<T> getVertices() {
        return vertexMatrix.keys();
    }
}
```

### Implementation (Adjacency List)

##### Java

```
package com.algorithmhelper.datastructures.graphs;

import com.algorithmhelper.datastructures.hashing.HashMapLinearProbing;
import com.algorithmhelper.datastructures.lists.LinkedList;
import com.algorithmhelper.datastructures.interfaces.GraphRepresentation;

public class AdjacencyList<T extends Comparable<T>> implements GraphRepresentation<T> {

    private HashMapLinearProbing<T, LinkedList<T>> adjacencyList;
    private int E;
    private int V;

    /**
     * Initializes an empty AdjacencyList.
     */
    public AdjacencyList() {
        adjacencyList = new HashMapLinearProbing<>();
        E = 0;
        V = 0;
    }

    /**
     * Returns the number of vertices.
     *
     * @return the number of vertices
     */
    public int V() {
        return V;
    }

    /**
     * Returns the number of edges.
     *
     * @return the number of edges
     */
    public int E() {
        return E;
    }

    /**
     * Returns true if the AdjacencyList contains vertex u, false otherwise.
     *
     * @param u, the vertex
     * @return true if the AdjacencyList contains vertex u, false otherwise
     * @throws IllegalArgumentException if the vertex u is null
     */
    public boolean containsVertex(T u) {
        if (u == null)
            throw new IllegalArgumentException("containsVertex with null vertex u");

        return adjacencyList.contains(u);
    }

    /**
     * Returns true if the AdjacencyList contains edge (u, v), false otherwise.
     *
     * @param u, the first vertex
     * @param v, the second vertex
     * @return true if the AdjacencyList contains edge (u, v), false otherwise
     * @throws IllegalArgumentException if the vertex u is null
     * @throws IllegalArgumentException if the vertex v is null
     */
    public boolean containsEdge(T u, T v) {
        if (u == null)
            throw new IllegalArgumentException("containsEdge with null vertex u");
        if (v == null)
            throw new IllegalArgumentException("containsEdge with null vertex v");

        if (!containsVertex(u))
            return false;
        return adjacencyList.get(u).contains(v);
    }

    /**
     * Inserts the vertex u into the AdjacencyList, u must be an isolated vertex, and cannot
     * already be contained in the AdjacencyList.
     *
     * @param u, the vertex
     * @throws IllegalArgumentException if the vertex u is null
     */
    public void insertVertex(T u) {
        if (u == null)
            throw new IllegalArgumentException("insertVertex with null vertex u");

        if (containsVertex(u))
            return;
        adjacencyList.put(u, new LinkedList<>());
        V++;
    }

    /**
     * Inserts an edge (u, v) into the AdjacencyList.
     *
     * @param u, the first vertex
     * @param v, the second vertex
     * @throws IllegalArgumentException if the vertex u is null
     * @throws IllegalArgumentException if the vertex v is null
     */
    public void insertEdge(T u, T v) {
        if (u == null)
            throw new IllegalArgumentException("insertEdge with null vertex u");
        if (v == null)
            throw new IllegalArgumentException("insertEdge with null vertex v");

        if (containsEdge(u, v))
            return;
        if (!adjacencyList.contains(u))
            insertVertex(u);
        if (!adjacencyList.contains(v))
            insertVertex(v);
        adjacencyList.get(u).insertFront(v);
        E++;
    }

    /**
     * Deletes a vertex u and all of the edges incident to u.
     *
     * @param u, the vertex
     * @throws IllegalArgumentException if the vertex u is null
     */
    public void deleteVertex(T u) {
        if (u == null)
            throw new IllegalArgumentException("deleteVertex with null vertex u");
        if (!containsVertex(u))
            return;

        LinkedList<T> adjacent = adjacencyList.get(u);
        for (T v : adjacent) {
            if (adjacencyList.get(v).contains(u)) {
                adjacencyList.get(v).remove(u);
                E--;
            }
        }
        adjacencyList.delete(u);
        V--;
    }

    /**
     * Deletes an edge (u, v) from the AdjacencyList.
     *
     * @param u, the first vertex
     * @param v, the second vertex
     * @throws IllegalArgumentException if the vertex u is null
     * @throws IllegalArgumentException if the vertex v is null
     */
    public void deleteEdge(T u, T v) {
        if (u == null)
            throw new IllegalArgumentException("deleteEdge with null vertex u");
        if (v == null)
            throw new IllegalArgumentException("deleteEdge with null vertex v");
        if (!containsEdge(u, v))
            return;

        adjacencyList.get(u).remove(v);
        E--;
    }

    /**
     * Returns the degree of a vertex u (i.e. the number of adjacent vertices to u).
     *
     * @return the degree of u
     * @throws IllegalArgumentException if the vertex u is null
     * @throws IllegalArgumentException if the vertex u is not contained in the AdjacencyList
     */
    public int getDegree(T u) {
        if (u == null)
            throw new IllegalArgumentException("getDegree with null vertex u");
        if (!containsVertex(u))
            throw new IllegalArgumentException("getDegree with non-existent vertex u");

        return adjacencyList.get(u).size();
    }

    /**
     * Returns an Iterable to all of the vertices adjacent to vertex u.
     *
     * @param u, the vertex
     * @return the Iterable adjacency list of the vertex u
     * @throws IllegalArgumentException if the vertex u is null
     * @throws IllegalArgumentException if the vertex u is not contained in the AdjacencyList
     */
    public Iterable<T> getAdjacent(T u) {
        if (u == null)
            throw new IllegalArgumentException("getAdjacent with null vertex u");
        if (!containsVertex(u))
            throw new IllegalArgumentException("getAdjacent with non-existent vertex u");

        return adjacencyList.get(u);
    }

    /**
     * Returns an Iterable to all of the vertices of the AdjacencyList.
     *
     * @return an Iterable to all of the vertices of the AdjacencyList
     */
    public Iterable<T> getVertices() {
        return adjacencyList.keys();
    }
}
```

### Time Complexity

The following table describes the time and space complexity for performing the 
operations above on an edge list, vertex matrix, adjacency list:

```
| Data Structure | space complexity   | containsVertex   | containsEdge   | insertVertex | insertEdge | deleteVertex   | deleteEdge   | getDegree    | getAdjacent    |
|----------------|--------------------|------------------|----------------|--------------|------------|----------------|--------------|--------------|----------------|
| edge list      | O(|E|)             | O(|E|)           | O(|E|)         | n/a          | O(1)       | O(|E|)         | O(|E|)       | O(|E|)       | O(|E|)         |
| vertex matrix  | O(|V|^2)           | O(1)             | O(1)           | n/a          | O(1)       | n/a            | O(1)         | O(V)         | O(V)           |
| adjacency list | O(|V|+|E|)         | O(1)             | O(degree(u))   | O(1)         | O(1)       | O(degree(u))   | O(1)         | O(1)         | O(degree(u))   |
```
