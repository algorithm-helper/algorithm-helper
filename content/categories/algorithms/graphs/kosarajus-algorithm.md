# Kosaraju's Algorithm

Kosaraju's algorithm, also called the Kosaraju-Sharir algorithm, is an algorithm for determining all
of the strongly connected components of a graph. 

Recall the grouping of strongly connected components (read more on the article on 
[Strongly Connected Components](/categories/algorithms/graphs/strongly-connected-components)).
The main idea behind this algorithm is that if we were to consider the graph `SCC` of grouped 
strongly connected components, it itself must be a directed acyclic graph (DAG) because if it were
not and we have a cycle, then it would imply that we can get from any vertex in one strongly 
connected component `A` to any other vertex in another strongly connected component `B`, but that
would imply that `A` and `B` are part of the same strongly connected component, and should be 
grouped as such. 

The intuition is that the strongly connected components in the reverse graph (the graph obtained
by reversing the direction of all edges) is the same as the original graph. We can then take 
advantage of topological sort and get a topological ordering of the vertices in the reverse graph.
It will be able to gives us an ordering such that if a strongly connected components `A` is directed
towards another strongly connected component `B`, that the vertices in `A` are processed before
the vertices in `B` once we run depth first search using that topological ordering, but on the 
original graph.

We iterate through this topological ordering on the original graph, keeping track of already visited
vertices in a set `visited`, and mapping all the vertices reachable by the current vertex to some
`id`. 

The formal proof is more involved, and can be read [here](http://www-sop.inria.fr/marelle/Laurent.Thery/Kosaraju/Kosaraju.pdf).

### Observations

Pseudocode:

```
Gr : reversed graph
T : topologically sorted ordering

T = topologicalSort(Gr)

SCC : mapping of vertices to id
id = 0

for each vertex x in T:
  if S does not contain x:
    run depthFirstSearch on x, for every vertex v that was visited,
    SCC[v] = id
    id++
```

Kosaraju's algorithm is a linear time algorithm, that is, it runs in $O(|V|+|E|)$ time. Determining
the run time is straightforward since when we first get the topological order, we can use 
topological sort, which is in $O(|V|+|E|)$ time. Then when we iterate through the topological 
ordering, we only process every vertex $u$ at most once, because the first time we do, we add it to
the map `SCC` to indicate that it has already been processed and to not process it again.

Intuitively, since we are processing the strongly connected components one after the other, say two
distinct strongly connected components `A` and `B`, we are guaranteed that they do not overlap,
overwise, by definition of a strongly connected component `A` and `B` are part of the same 
strongly connected component. By the analysis above for depth first search, we will process every 
vertex in the graph and every edge in the graph at most once, taking $O(|V|+|E|)$ time.

Determining the space complexity is also straightforward. Topological sort takes $O(|V|)$ space. We
require either recursion or a stack for depth first search, but the worst case is that the entire 
itself is a strongly connected component, so at most the depth first search part of the algorithm 
requires $O(|V|)$ space.

### Implementation

##### Java

<script src="https://gist.github.com/eliucs/d44d18c5d2dc96ef093b5a9ee975ad4a.js"></script>

### Time Complexity

```
| Algorithm            | time complexity | space complexity |
|----------------------|-----------------|------------------|
| kosaraju's algorithm | O(|V|+|E|)      | O(|V|)           |
```
