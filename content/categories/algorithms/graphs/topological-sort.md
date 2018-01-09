# Topological Sort

Topological sort, in the context of directed graphs, is a linear ordering of vertices such that for
every directed edge $e = (u, v)$, vertex $u$ comes before $v$. Often there is not necessarily a 
unique ordering of vertices. Note that a topological ordering can only exist if there are no cycles
in the graph, meaning that the graph must be a directed acyclic graph (DAG), and a DAG has at least
one topological ordering. Topological sort has various applications, and those may be the scheduling
of tasks that have dependencies on previous tasks completed.

### Visualization

The following is an example of a DAG:

<img src="https://firebasestorage.googleapis.com/v0/b/algorithm-helper-storage.appspot.com/o/img%2Falgorithms%2Fgraphs%2Fdirected-acyclic-graph.png?alt=media&token=e15f1f88-ad53-4a39-8bfc-e2e6db556798" alt="Directed Acyclic Graph" class="img-fluid">

Here, this graph has directed edges and has no cycles, and so is a DAG. Thus a topological ordering
exists. One possible ordering could be that if we start from $1$ and order by depth: 
$[1, 3, 2, 4, 5, 9, 6, 7]$.

We see the topologically sorted graph by redrawing the DAG such that all of the edges point 
upwards:

<img src="https://firebasestorage.googleapis.com/v0/b/algorithm-helper-storage.appspot.com/o/img%2Falgorithms%2Fgraphs%2Ftopologically-sorted.png?alt=media&token=c0722294-68fe-4baf-b604-fee7701a338a" alt="Topologically Sorted" class="img-fluid">

### Using Depth First Search

One method of obtaining a topological sorting is simply by using depth first search, and returning
the vertices visited in reverse postorder. We can achieve this by maintaining a stack of vertices
visited. Intuitively, we can see that depth first search produces a topologically sorted ordering 
because when a vertex $u$ is added to the stack, we are guaranteed that all vertices $v$ that are 
directed to by $u$ have already been added to the stack.

We give a proof of correctness that depth first search with reverse postordering gives a 
topologically sorted ordering:

Consider some directed edge $e = (u, v)$ (that is, from vertex $u$ to $v$). When we call 
`depthFirstSearch(u)`, we have 3 cases:

(1) `depthFirstSearch(v)` was already called and returned. Then $v$ was processed before $u$, as
required.

(2) `depthFirstSearch(v)` was not already called. Since `depthFirstSearch` is recursively called on 
all of $u$'s neighbors, then either `depthFirstSearch(v)` is called directly, or indirectly, after
being recursively called later on when another one of $u$'s neighbors is processed. In either case,
$v$ is processed before $u$, as required.

(3) `depthFirstSearch(v)` was already called and not yet returned. Then it follows that there was 
some directed path from $v$ to $u$, but then with edge $e$ we form a cycle from $u$ to $v$. This is
a contradiction since this graph is a DAG. Thus this case is impossible.

### Implementation

##### Java

```
package com.algorithmhelper.algorithms.graphs;

import com.algorithmhelper.datastructures.graphs.DirectedGraph;
import com.algorithmhelper.datastructures.hashing.HashSetLinearProbing;
import com.algorithmhelper.datastructures.interfaces.Set;
import com.algorithmhelper.datastructures.interfaces.Stack;
import com.algorithmhelper.datastructures.lists.StackDynamicArray;

public class TopologicalSort<T extends Comparable<T>> {

    private Stack<T> topologicalOrdering;
    private Set<T> visited;

    /**
     * Initializes a TopologicalSort object and runs depth first search starting from some
     * arbitrary vertex u.
     *
     * @param G, the graph
     */
    public TopologicalSort(DirectedGraph<T> G) {
        if (G == null)
            throw new IllegalArgumentException("constructor with null graph G");

        topologicalOrdering = new StackDynamicArray<>();

        if (G.V() == 0)
            return;

        visited = new HashSetLinearProbing<>();
        for (T u : G.getVertices()) {
            if (visited.contains(u))
                continue;
            depthFirstSearch(G, u);
        }
    }

    /**
     * Run the depth first search algorithm, building up the set of vertices visited and the
     * topological ordering after the recursive calls to depthFirstSearch on vertex u's
     * neighbors.
     *
     * @param G, the graph
     * @param u, the starting vertex
     */
    private void depthFirstSearch(DirectedGraph<T> G, T u) {
        visited.put(u);
        for (T v : G.getAdjacent(u)) {
            if (!visited.contains(v)) {
                depthFirstSearch(G, v);
            }
        }
        topologicalOrdering.push(u);
    }

    /**
     * Returns an Iterable to the topological ordering found by the depth first search algorithm.
     *
     * @return an Iterable to the topological ordering found by the depth first search algorithm
     */
    public Iterable<T> getTopologicalOrdering() {
        return topologicalOrdering;
    }
}
```

### Time Complexity

Since this algorithm is virtually the same as depth first search except that we must store at most 
$|V|$ vertices in the stack to maintain a reverse postordering of the vertices, the time complexity
is still $O(|V|+|E|)$ and the space complexity is still $O(|V|)$.

```
| Algorithm        | time complexity | space complexity |
|------------------|-----------------|------------------|
| topological sort | O(|V|+|E|)      | O(|V|)           |
```
