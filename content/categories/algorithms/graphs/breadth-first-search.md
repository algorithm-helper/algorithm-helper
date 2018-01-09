# Breadth First Search

Breadth first search is an algorithm for path traversal such that we always explore adjacent 
vertices at the same level before exploring deeper levels. Generally, the main data structure we 
use to keep track of vertices to explore is a queue. The algorithm is virtually identical to the one 
for depth first search with a stack, except with a queue. 

The main idea behind breadth first search is that we maintain a set `visited`, which keeps track of 
which vertices we have already encountered, and a queue which we enqueue adjacent vertices first.

Like with depth first search, we maintain an array `predecessor`, which gives us the previous vertex 
explored at a certain vertex, and this forms a tree structure. When we reach the end of the 
traversal, we index into `predecessor` at the ending vertex, and continuously find its parent 
vertex $p$, until we reach the starting vertex again, adding $p$ to a stack. Thus when we iterate
over the stack, we get the path from the starting vertex to the ending vertex.

### Using Queue

In the method using queues, we maintain a queue `Q` that keeps track of the traversal order, we 
dequeue a vertex from `Q` to get the next vertex to explore and we enqueue adjacent vertices to 
`Q` before exploring them. Intuitively, because a queue is a FIFO (first-in-first-out) data 
structure, we are always exploring adjacent vertices (on the same level) before exploring deeper
levels, since we dequeue from the front of the queue. 

Pseudocode:

```
adjacent : adjacency list
visited : set containing all of the visited vertices
predecessor : array containing the index of the parent vertex in the traversal
Q : queue of vertices, initialized to be empty
u : starting vertex
v: ending vertex

// Starting breadth first search:
breadthFirstSearch(u, v):
  Q.enqueue(u)

  while (!Q.isEmpty()):
    current = Q.dequeue()

    if (current == v):
      break

    for each vertex v in adjacent[current]:
      if (!visited.contains(x)):
        predecessor[x] = current
        visited.add(x)
        Q.enqueue(x)

// Finding the path from u to v:
P : stack of vertices, initialized to be empty

for (i = v; i != u; i = predecessor[i]):
  P.push(i)

// Thus iterating over P gives us the path from u to v.
```

The pseudocode for breadth first search is almost identical depth first search, except instead of 
using a stack, we use a queue. One of the properties of breadth first search is that the algorithm 
runs in $O(|V|+|E|)$ time and uses $O(|V|)$ space. We can see this because breadth first search will
reach every vertex at most once (assuming we have a connected graph), since before exploring the 
vertex we add it to the set `visited`, and will never visit it again. At each vertex, we iterate
over its adjacency list before adding non-visited ones to the queue, that is, we iterate over all
outgoing edges from that vertex. Intuitively, if we consider all outgoing edges from all vertices,
we would have considered all edges in the graph. Since the set `visited` and the array `predecessor`
can contain at most $|V|$ vertices, it uses $O(|V|)$ space. But since the queue `Q` can have at most
$|V|$ elements, it uses $O(|V|)$ space. Thus, breadth first search uses $O(|V|)$ auxiliary space.

### Implementation

##### Java

```
package com.algorithmhelper.algorithms.graphs;

import com.algorithmhelper.datastructures.hashing.HashMapLinearProbing;
import com.algorithmhelper.datastructures.hashing.HashSetLinearProbing;
import com.algorithmhelper.datastructures.interfaces.*;
import com.algorithmhelper.datastructures.lists.QueueDynamicArray;
import com.algorithmhelper.datastructures.lists.StackDynamicArray;

public class BreadthFirstSearch<T extends Comparable<T>> {

    private Set<T> visited;
    private Map<T, T> predecessor;
    private int vertexCount;

    /**
     * Initializes the BreadthFirstSearch and runs the breadth first search
     * algorithm starting from vertex u.
     *
     * @param G, the graph
     * @param u, the starting vertex
     * @throws IllegalArgumentException if the graph G is null
     * @throws IllegalArgumentException if the vertex u is null
     */
    public BreadthFirstSearch(Graph<T> G, T u) {
        if (G == null)
            throw new IllegalArgumentException("constructor with null graph G");
        if (u == null)
            throw new IllegalArgumentException("constructor with null vertex u");

        visited = new HashSetLinearProbing<>();
        predecessor = new HashMapLinearProbing<>();
        vertexCount = 0;
        breadthFirstSearch(G, u);
    }

    /**
     * Runs the breadth first search algorithm, building up the set of vertices visited.
     *
     * @param G, the graph
     * @param u, the starting vertex
     */
    private void breadthFirstSearch(Graph<T> G, T u) {
        Queue<T> queue = new QueueDynamicArray<>();
        queue.enqueue(u);
        predecessor.put(u, null);

        while (!queue.isEmpty()) {
            T current = queue.dequeue();
            visited.put(current);
            vertexCount++;

            for (T v : G.getAdjacent(current)) {
                if (!visited.contains(v)) {
                    queue.enqueue(v);
                    predecessor.put(v, current);
                }
            }
        }
    }

    /**
     * Returns the vertex count (i.e. the number of vertices visited by the breadth first search
     * algorithm.
     *
     * @return vertexCount
     */
    public int getVertexCount() {
        return vertexCount;
    }

    /**
     * Returns an Iterable to the vertices visited.
     *
     * @return an Iterable to the vertices visited
     */
    public Iterable<T> getVisited() {
        return visited.keys();
    }

    /**
     * Returns true if the vertex u has been visited by the breadth first search algorithm,
     * false otherwise.
     *
     * @param u, the vertex
     * @return true if the vertex u has been visited by the breadth first search algorithm,
     *         false otherwise
     * @throws IllegalArgumentException if the vertex u is null
     */
    public boolean isVisited(T u) {
        if (u == null)
            throw new IllegalArgumentException("isVisited with null vertex u");
        return visited.contains(u);
    }

    /**
     * Returns an Iterable to the path from the starting vertex for the breadth first search
     * algorithm to the vertex u.
     *
     * @param u, the vertex
     * @return an Iterable to the path from the starting vertex for the breadth first search
     *         algorithm to the vertex u
     * @throws IllegalArgumentException if the vertex u is null
     * @throws IllegalArgumentException if the vertex u is not contained in Set visited
     */
    public Iterable<T> getPath(T u) {
        if (u == null)
            throw new IllegalArgumentException("getPath with null vertex u");
        if (!isVisited(u))
            throw new IllegalArgumentException("getPath with non-existent vertex u");

        Stack<T> stack = new StackDynamicArray<>();
        T current = u;
        stack.push(current);
        while (predecessor.get(current) != null) {
            stack.push(predecessor.get(current));
            current = predecessor.get(current);
        }
        return stack;
    }
}
```

### Time Complexity

```
| Algorithm            | time complexity | space complexity |
|----------------------|-----------------|------------------|
| breadth first search | O(|V|+|E|)      | O(|V|)           |
```
