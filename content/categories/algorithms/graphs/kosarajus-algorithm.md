# Kosaraju's Algorithm


Kosaraju's Algorithm, also called the Kosaraju–Sharir algorithm, is an
algorithm for determining all of the strongly connected components of a graph.
The main idea behind this algorithm is that if we were to consider the graph
SCC of strongly connected components, it itself is a DAG, because if it were not
and we had a cycle, then that would imply we can get from any Vertex in one
strongly connected component A to any other Vertex in another strongly connected
component B, but that would imply that A and B are part of the same strongly
connected component.

We take advantage of Topological Sort because it will be able to give us an
ordering such that if a strongly connected component A is directed towards
(comes before) another strongly connected component B, that the Vertices in A
are processed before the Vertices in B.

Then, we would have a List L of all of the vertices in topological order with
respect to their strongly connected component. With an array A of size V and a
counter C, we initialize all the elements in A to be null. This represents that
none of the Vertices are associated with a unique number identifying their
respective strongly connected component yet.

We go through L in order (that is, highest in the topological order first) and
keep note of the first unvisited Vertex x and mark it as C, then run Depth-First
Search until we reach another Vertex marked C. At this point, it would mean that
we would have processed all of the Vertices strongly connected from x, which
means that they belong to the strongly connected component labelled C.

We increment C by 1, and continue through L until we find a Vertex that does
not already have a visited label, and repeat the above steps.

Pseudocode:

```
V : Set of all Vertices

kosarajusAlgorithm(V):
  SCC : Array, where the element at any index i represents the strongly
        connected component the Vertex at i belongs to, all elements
        initialized to be null
  L : List of Vertices, initialized to be empty
  p : pointer

  L = kahnTopologicalSort(V) // We can run Kahn's Topological Sort algorithm
                             // to get L to be the topological order of V
  p = 0

  while (p < L.length):
    if SCC[p] == null:
      depthFirstSearch(L[p]), and for every Vertex i found in this traversal,
      mark SCC[i] = p but if SCC[i] != null then return
    p++

  return SCC
```

Kosaraju's Algorithm is a linear time algorithm, that is, it runs in O(V + E)
time. Determining the run time is straightforward since when we first get the
topological order, we can use Kahn's Topological Sort algorithm, which is in
O(V + E) time. Then when we iterate through L, we only process every Vertex i at
most once, because the first time we do, we mark SCC[i] as some value to
indicate that it has already been processed and never process it again.

Intuitively, since we are processing the strongly connected components one after
the other, say two distinct strongly connected components A and B, we are
guaranteed that they do not overlap, otherwise, by definition of a strongly
connected component, A and B are part of the same strongly connected component.
By the analysis above for Depth First Search, we will process every Vertex in
the graph and every Edge in the graph at most once, taking O(V + E) time.

But in this case, since Depth First Search will only run in the strongly
connected component (a subgraph), it will process every Vertex and every Edge in
that subgraph at most once. Overall for all of the strongly connected
components, it follows that we will process all of the Vertices V and all of the
Edges E in the full graph once, thus this algorithm overall takes O(V + E) time.

Determining the space complexity is also straightforward. Kahn's Topological
Sort algorithm takes O(V) space. We require either recursion or a Stack for
Depth First Search, but the worst case is that the entire graph itself is a
strongly connected component, so at most the Depth First Search part of the
algorithm requires O(V) space. Thus overall, this algorithm requires O(V) space.

### Implementation

##### Java

View the source code here.

```
```

### Time Complexity

