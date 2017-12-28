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

<script src="https://gist.github.com/eliucs/dcad13017477cf116c4e8528b91e599d.js"></script>

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
