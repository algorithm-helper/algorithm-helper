# Time and Space Complexity

This article will elaborate further on the time and space complexities of the algorithms and 
operations for the various graph data structures that have been discussed in this topic.

### Comparisons

We start off by describing the time and space complexities of the operations for the graph 
representation data structures: edge list, vertex matrix, adjacency list:

```
| Data Structure | space complexity   | containsVertex   | containsEdge   | insertVertex | insertEdge | deleteVertex   | deleteEdge   | getDegree    | getAdjacent    |
|----------------|--------------------|------------------|----------------|--------------|------------|----------------|--------------|--------------|----------------|
| edge list      | O(|E|)             | O(|E|)           | O(|E|)         | n/a          | O(1)       | O(|E|)         | O(|E|)       | O(|E|)       | O(|E|)         |
| vertex matrix  | O(|V|^2)           | O(1)             | O(1)           | n/a          | O(1)       | n/a            | O(1)         | O(|V|)       | O(|V|)         |
| adjacency list | O(|V|+|E|)         | O(1)             | O(degree(u))   | O(1)         | O(1)       | O(degree(u))   | O(1)         | O(1)         | O(degree(u))   |
```

For the edge list, since we simply need to store a list of each edge, it follows that we need
$O(|E|)$ space. To check whether a vertex $u$ exists, we must iterate through at most all of the 
edges, checking whether either ends of the edge is equal to $u$, thus needing $O(|E|)$ time. To
check whether an edge $e$ exists, we must iterate through at most all of the edges, checking 
whether the edge is equal to $e$, thus also needing $O(|E|)$ time. Note that this graph 
representation structure does not support isolated vertices, so the operation `insertVertex` is not 
applicable. We can insert an edge easily and simply appending it to the edge list, thus taking 
$O(1)$ time (assuming the list supports $O(1)$ insert operations). When we delete a vertex $u$, we 
must iterate through the edge list, deleting all edges that have either end vertices equal to $u$, 
taking $O(|E|)$ time. Similarly, when we delete an edge, we need to iterate through at most $O(|E|)$ 
edges to find the correct one to delete. When we get the degree of a vertex $u$, we need to iterate 
through all of the edges and count all those that have either end equal to $u$, taking $O(|E|)$ time. 
Similarly, when we get an iterable to the adjacent vertices to a vertex $u$, we need to iterate 
through all of the edges and include all those that have either end equal to $u$, taking $O(|E|)$ 
time.

For the vertex matrix, since we need a $V \times V$ array `arr`, it follows that we need $O(|V|^2)$ 
space. To check whether a vertex $u$ exists, we can simply lookup the vertex $u$ in either the row 
or column, which takes $O(1)$ time if we are using integer vertices in a 2D integer array or with 
a hash map. To check whether an edge `e = (u, v)` exists, we simply lookup whether `arr[u][v]` is
a `1` or `0`, which also takes $O(1)$ time. We cannot insert or delete a vertex because the size 
of `arr` is fixed. To insert an edge `e = (u, v)`, we simply index into `arr[u][v]`, and set the 
value to `1`, which takes $O(1)$ time. Similarly, to delete an edge `e = (u, v)`, we simply index 
into `arr[u][v]`, and set the value to `0`, which takes $O(1)$ time. To get the degree of a vertex 
`u`, we index into the `u`-th row in `arr`, for for every `i` from `0` to `|V|-1`, we count the 
number of occurences of `1` with `arr[u][i]`, which takes $O(|V|)$ time. Similarly with the operation 
`getAdjacent`, we need to include all of the other vertices in that row where the value of `arr[u][i]` 
is set to `1`, which takes $O(|V|)$ time.

For the adjacency list, since we need to store the a table of size $|V|$, and a list at each index in
the table. But since the list includes the opposite end of a particular edge, it follows that in an
undirected graph, we store every edge `e = (u, v)` exactly twice, and in a directed graph, every
edge `e = (u, v)` exactly once, so the number of edges we store is proportional to $O(|E|)$, and thus
the overall space complexity of this data structure is $O(|V|+|E|)$. To check whether a vertex `u`
exists, we simply index into the table and check if `u` exists. To check whether an edge `e = (u, v)`
exists, we simply index into the table and iterate through the adjacent vertices to `u` to find `v`,
which takes $O(degree(u))$ time. To insert an isolated vertex `u`, we simply need to add it to the 
table, which takes $O(1)$ time. To delete a vertex `u`, we need to index into the adjacency list at 
`u` and delete all of its adjacent vertices, which takes $O(degree(u))$ time. To delete an edge
`e = (u, v)`, we index into the adjacency list at `u`, and delete `v`, which takes $O(1)$ time. To 
get the degree of a vertex `u`, we can index into the adjacency list at `u`, and get the size of the 
list, which takes $O(1)$ time. Similarly, to get an iterable to the adjacent vertices of a vertex 
`u`, we can index into the adjacency list at `u`, and include all of its neighbors.

---

Next, we look at the time and space complexities of the operations for non-weighted and weighted
graph structures: undirected graph, directed graph, undirected weighted graph, directed weighted 
graph:

```
| Data Structure            | space complexity     | containsVertex | containsEdge | insertVertex | insertEdge | deleteVertex | deleteEdge | getDegree  | getAdjacent  |
|---------------------------|----------------------|----------------|--------------|--------------|------------|--------------|------------|------------|--------------|
| undirected graph          | O(|V|+|E|)           | O(1)           | O(degree(u)) | O(1)         | O(1)       | O(degree(u)) | O(1)       | O(1)       | O(degree(u)) |
| directed graph            | O(|V|+|E|)           | O(1)           | O(degree(u)) | O(1)         | O(1)       | O(degree(u)) | O(1)       | O(1)       | O(degree(u)) |
| undirected weighted graph | O(|V|+|E|)           | O(1)           | O(degree(u)) | O(1)         | O(1)       | O(degree(u)) | O(1)       | O(1)       | O(degree(u)) |
| directed weighted graph   | O(|V|+|E|)           | O(1)           | O(degree(u)) | O(1)         | O(1)       | O(degree(u)) | O(1)       | O(1)       | O(degree(u)) |
```

Note that undirected graph and undirected weighted graph, and directed graph and directed weighted
graph, are used interchangeably.

The undirected graph and directed graph are similar data structures, the only difference is in the 
way we insert and delete edges, and delete vertices. They both use an adjacency list as the graph
representation back-end structure, so they both require $O(|V|+|E|)$ space. The operation 
`containsVertex` is the same for both because we simply perform a lookup on the vertex in the 
adjacency list, which takes $O(1)$ time. The operation `containsEdge` is the same for both as well.
For an edge `e = (u, v)`, we simply perform a lookup on the vertex `u`, and assuming that `u` exists,
iterate over the adjacent vertices to `u` to find `v`, thus it takes $O(degree(u))$ time. The 
operations `insertVertex` and `insertEdge` are simply just wrappers around the exact operation
on the adjacency list, and thus take $O(1)$ for both. However, note the difference between the
undirected graph and directed graph. In a directed graph, if we wanted to insert the edge `e = (u, v)`,
we simply insert it into the adjacency list. But in an undirected graph, we insert both edges
`e = (u, v)` and `e = (v, u)`. The same is true with the operations `deleteVertex` and `deleteEdge`. 
When we want to delete a vertex `u` from an undirected graph, we must delete all of the edges
incident to `u`, which means that we iterate over the adjacent vertices `v`, then go into their 
adjacent vertices to find and delete `u`. Thus, we delete $2 \times degree(u)$ edges, thus in both the
undirected and directed graph, the time is proportional to $O(degree(u))$. 

--- 

Next, we look at the following algorithms for path finding, connected components, topological sort, 
and strongly connected components: depth first search, breath first search, connected components 
using depth first search, topological sort using depth first search, Kahn's Topological Sort 
algorithm using a stack, Kahn's Topological Sort algorithm using a queue, and Kosaraju's algorithm:

```
| Algorithm                                       | time complexity | space complexity |
|-------------------------------------------------|-----------------|------------------|
| depth first search                              | O(|V|+|E|)      | O(|V|)           |
| breadth first search                            | O(|V|+|E|)      | O(|V|)           |
| connected components                            | O(|V|+|E|)      | O(|V|)           |
| topological sort                                | O(|V|+|E|)      | O(|V|)           |
| kahn's topological sort algorithm (using stack) | O(|V|+|E|)      | O(|V|)           |
| kahn's topological sort algorithm (using queue) | O(|V|+|E|)      | O(|V|)           |
| kosaraju's algorithm                            | O(|V|+|E|)      | O(|V|)           |
```

Since the algorithm for connected components and topological sort given in the articles use depth
first search, we will examine all of these together. One of the properties of depth first search 
is that the algorithm runs in linear time, $O(|V|+|E|)$ time and uses $O(|V|)$ space. We can see 
this because depth first search will reach every vertex at most one (assuming we have a connected 
graph), since before exploring the vertex we add it to the set `visited`, and will never visit it 
again. At each vertex, we iterate over its adjacency list,  that is, we iterate over all outgoing
edges from that vertex. Intuitively, we must have double counted every edge, and thus considered 
$2|E|$ edges. Since the set `visited` and the array `predecessor` can contain at most $|V|$ 
vertices, it uses $O(|V|)$ space. But since the recursion stack can get at most $|V|$ deep, or 
equivalently the stack `S` can have at most $|V|$ elements, it uses $O(|V|)$ space. Thus, depth 
first search uses $O(|V|)$ auxiliary space.

For breadth first search,  it runs in $O(|V|+|E|)$ time and uses $O(|V|)$ space. We can see this 
because breadth first search will reach every vertex at most once (assuming we have a connected 
graph), since before exploring the vertex we add it to the set `visited`, and will never visit it 
again. At each vertex, we iterate over its adjacency list before adding non-visited ones to the 
queue, that is, we iterate over all outgoing edges from that vertex. Intuitively, if we consider 
all outgoing edges from all vertices, we would have considered all edges in the graph. Since the 
set `visited` and the array `predecessor` can contain at most $|V|$ vertices, it uses $O(|V|)$ 
space. But since the queue `Q` can have at most $|V|$ elements, it uses $O(|V|)$ space. Thus, 
breadth first search uses $O(|V|)$ auxiliary space.

Determining the time complexity of Kahn's Topological Sort algorithm is straightforward and is 
the same with both using a stack and a queue. We are ultimately doing depth first search and breadth 
first search, respectively. Since it is a DAG, even in the case of a disconnected graph, all of 
the separate components are still processed because we add all of the vertices with no incoming 
edges to the final result, and since each component is a DAG itself, there must be at least one 
vertex in that component that does not have an incoming edge. We process every vertex at most once, 
since in the stack method we delete incoming edges and thus guarantees that by the time we process 
that vertex, it is the first time, since prior times it still had incoming edges, and were not 
processed. And in the queue method, since we process all of the vertices at the same level first 
before exploring deeper vertices, it also guarantees that by the time we process that vertex, we 
must have processed all of the vertices from incoming edges already. In both cases, we process 
$|V|$ vertices. Intuitively, since we process all of the adjacent edges at most once for each 
vertex, in total we would have processed all $|E|$ edges once. Thus this algorithm runs in 
$O(|V|+|E|)$ time. Since for the stack or queue we use to control which next vertex to process 
can only be at most $|V|$ large, the space complexity is thus $O(|V|)$.

Kosaraju's algorithm is a linear time algorithm, that is, it runs in $O(|V|+|E|)$ time. Determining
the run time is straightforward since when we first get the topological order, we can use 
topological sort, which is in $O(|V|+|E|)$ time. Then when we iterate through the topological 
ordering, we only process every vertex $u$ at most once, because the first time we do, we add it to
the map `SCC` to indicate that it has already been processed and to not process it again. Intuitively, 
since we are processing the strongly connected components one after the other, say two distinct
strongly connected components `A` and `B`, we are guaranteed that they do not overlap, overwise, 
by definition of a strongly connected component `A` and `B` are part of the same  strongly connected 
component. By the analysis above for depth first search, we will process every vertex in the graph
and every edge in the graph at most once, taking $O(|V|+|E|)$ time. Determining the space complexity 
is also straightforward. Topological sort takes $O(|V|)$ space. We require either recursion or a 
stack for depth first search, but the worst case is that the entire itself is a strongly connected 
component, so at most the depth first search part of the algorithm requires $O(|V|)$ space.

---

Next, we look at the following algorithms for shortest path finding: Dijkstra's algorithm, 
the Bellman-Ford algorithm, and the Floyd-Warshall algorithm:

```
| Algorithm                | time complexity | space complexity |
|--------------------------|-----------------|------------------|
| dijkstra's algorithm     | O(|E|log|V|)    | O(|V|)           |
| bellman-ford algorithm   | O(|V||E|)       | O(|V|)           |
| floyd-warshall algorithm | O(|V|^3)        | O(|V|^2)         |
```

For Dijsktra's algorithm, to maintain `dist` and `prev`, we need to map every one of the 
$|V|$ vertices to some number, and with `PQ`, we need to store at most $|V|$ elements, and thus 
our space complexity is proportional to $O(|V|)$. Since we will be needing to relax $|E|$ edges, and 
by doing so need to run the `extractMin` operation to get the vertex of the next minimum shortest
distance, taking $O(log|V|)$ time because of the priority queue, this algorithm thus runs in 
$O(|E|log|V|)$ time.

For the Bellman-Ford algorithms, to maintain `dist` and `prev`, we need to map every one of the $|V|$ 
vertices to some number, and thus our space complexity is proportional to $O(|V|)$. Since we will be 
needing to relax $|E|$ edges, repeated $|V|$ times, it follows that this algorithm runs in $O(|V||E|)$ 
time.

For the Floyd-Warshall algorithm, we need to maintain the two $|V|\times|V|$ matrices for `dist` and 
`next`, and thus need space proportional to $O(|V|^2)$. We iterate through the $|V|$ vertices in a 
triple nested for loop, and in the last for loop, relax the edges, a constant time operation, and 
thus this algorithm runs in $O(|V|^3)$ time.

---

Next, we look at the following algorithms for computing the minimum spanning tree of a 
connected graph: Prim's algorithm and Kruskal's algorithm:

```
| Algorithm           | time complexity | space complexity |
|---------------------|-----------------|------------------|
| prim's algorithm    | O(|E|log|V|)    | O(|V|)           |
| kruskal's algorithm | O(|E|log|E|)    | O(|V|+|E|)       |
```

For Prims' algorithm, we can analyze its time complexity intuitively. Overall, we need to add all of 
the vertices to the minimum spanning tree, and this takes $O(|V|)$ time. Every time we add a new vertex 
to the current minimum spanning tree so far, we call the operation `extractMin` from the priority queue 
to get the next minimum weight edge, and this priority queue is at most the size $|V|$ (when all of the 
vertices in the graph have yet to be added to the minimum spanning tree), and so the `extractMin` 
operation takes $O(logV)$ time. But for every time after we call `extractMin`, we get a vertex $u$, we 
must iterate over the adjacent vertices to $u$, but the number of edges outgoing from $u$ may be at most
size $|E|$, and thus this latter part of the algorithm takes $O(|E|log|V|)$ time. Thus overall, the 
algorithm takes $O(|V|+|E|log|V|) = O(|E|log|V|)$ time. We need additional $O(|V|)$ space for the 
priority queue.

For Kruskal's algorithm, determining time complexity of the algorithm is fairly straightforward. Sorting 
the edges by edge weight takes $O(|E|log|E|)$ time using a comparison sort like quicksort. Checking an 
edge `(u, v)` in `L` belong to the same connected component takes $O(loglog|V|)$ time, and `union(u, v)` 
takes $O(1)$ time using a union find that is weighted and uses path compression. Since in sparse graphs, 
we have that $|E|$ is proportional to $O(|V|)$ and in dense graphs, $|E|$ is proportional to $O(|V|^2)$, 
the operations done with the union find can be ignored. Since we need to add edges that connect all of 
the vertices, we must add every vertex to the minimum spanning tree, and takes $O(|V|)$ time, but this 
is overpowered by $O(|E|log|E|)$. Thus this algorithm runs in $O(|E|log|E|)$ time. In terms of space 
complexity, we require a list of size $|E|$ for a list of the edges sorted in ascending order by edge 
weight, and thus that requires additional $O(|E|)$ space. We require a union find that contains all $|V|$ 
vertices, that requires $O(|V|)$ space. Thus the total space complexity is $O(|V|+|E|)$.
