# Minimum Spanning Tree

A minimum spanning tree is a subset of edges of a connected, weighted, undirected graph that 
connects all vertices, without cycles and the minimum possible combined weight. Any connected
weighted undirected graph has a minimum spanning tree. 

One of the properties of a minimum spanning tree is that if all of the edge weights are distinct 
values, then the graph has exactly one minimum spanning tree. However, if they are not distinct, we 
may have more than one possible minimum spanning tree. Since the latter is more general (and
thereby potentially more useful), we do not assume uniqueness in the edge weights.

From Wikipedia:

> [Minimum Spanning Tree](https://en.wikipedia.org/wiki/Minimum_spanning_tree) - a subset of the 
edges of a connected, edge-weighted, undirected graph that connects all the vertices together, 
without any cycles and with the minimum possible total edge weight. That is, it is a spanning tree 
whose sum of edge weights is as small as possible. More generally, any undirected graph (not
necessarily connected) has a minimum spanning forest, which is a union of the minimum spanning trees 
for its connected components.

The applications of being able to determine a minimum spanning tree from a graph are obvious. One
example could be building roads that connect towns. A minimum spanning tree would be able to 
minimize the total cost of the road material needed. Another example could be laying out networking
cables within an office building. A minimum spanning tree would be able to determine the optimal
way of laying out ethernet cables to connect all of the devices in the office, minimizing the total 
length (and thereby total cost) of the cables.

### Visualization

Suppose we have the following connected, weighted, undirected graph $G$:

<img src="https://firebasestorage.googleapis.com/v0/b/algorithm-helper-storage.appspot.com/o/img%2Falgorithms%2Fgraphs%2Fminimum-spanning-tree-before.png?alt=media&token=975e90b5-a4b2-4938-be27-e85944e44164" alt="Minimum Spanning Tree Before" class="img-fluid">

The minimum spanning tree $T$ is the following:

<img src="https://firebasestorage.googleapis.com/v0/b/algorithm-helper-storage.appspot.com/o/img%2Falgorithms%2Fgraphs%2Fminimum-spanning-tree-after.png?alt=media&token=a986078c-227c-4a24-962e-b9a39236690b" alt="Minimum Spanning Tree After" class="img-fluid">

It connects all of the vertices with the minimum possible combined weight of the edges. $T$ has 
$V(T) = \\{1, 2, 3, 4, 5, 6\\} = V(G)$, $E(T) = \\{(1, 4), (2, 4), (3, 6), (4, 6), (4, 7), (5, 7)\\}$, and
combined edge weight of $20$.

### Observations

We want to be able to use an algorithm to find the minimum spaning tree of a graph. To begin, there
are some properties that we would like to define and prove. 

(1) Every connected graph has a spanning tree.

Consider a connected graph $G$. Either $G$ has no cycles or it has at least one cycle. If $G$ has
no cycles, then by definition it is a tree, and is thus a spanning tree of itself. If $G$ has at 
least one cycle, removing any edge of that cycle still results in a connected graph with one less
cycle. Since $G$ has a finite number of cycles, we can repeat this until we have no cycles, and
thus results in a spanning tree.

A cut is a partition $(A, B)$ of the vertices into two disjoint subsets. Edges that have one end in 
$A$ and the other end in $B$ are called crossing edges. 

(2) Given a cut, the crossing edge of minimum weight must be in the minimum spanning tree.

We prove by contradiction. Suppose that the crossing edge of minimum weight $e$ is not in the 
minimum spanning tree. Then adding $e$ to the minimum spanning tree creates a cycle. Then there must
be some other edge $f$ that is on the cycle, which is a crossing edge. Deleting $f$ and adding $e$
still results in a spanning tree, but since the weight of $e$ is less than that of $f$, this 
spanning tree has less weight than the minimum spanning tree, which is a contradiction.

Our greedy algorithm is then to find a cut, and continuously add in the crossing edge of minimum
weight, and we repeat this until all vertices are part of the minimum spanning tree (i.e. until we
have $|V|-1$ edges).

(3) This approach gives a minimum spanning tree.

When we have fewer than $|V|-1$ edges in the minimum spanning tree, then there must exist a cut with
no edges that are already in the minimum spanning tree. 
