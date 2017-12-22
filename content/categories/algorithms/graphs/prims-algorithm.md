# Prim's Algorithm


Prim's Algorithm is an algorithm used to find the minimum spanning tree of a
connected, edge-weighted, undirected graph. It is a greedy algorithm, and its
main approach to finding the minimum spanning tree is to always look at the next
minimum weight Edge from any of the Vertices already contained in the minimum
spanning tree to any other Vertex not already in the minimum spanning tree and
add that Edge to the current minimum spanning tree, until it has V-1 elements,
where V is the total number of Vertices in the Graph.

Pseudocode:

```
V : List of all Vertices
adjacency : Adjacency List of the Vertices

primsAlgorithm(V):
  MST : List of Vertices representing the Minimum Spanning Tree, initialized to
        be empty
  x : least weight Edge

  MST.push(x)

  while (MST.length != V.length):

    for each Vertex i in MST:
      minEdge : next Edge of minimum weight

      for each Vertex j in adjacency[i]:
        if the Edge formed from (i, j) has less weight than minEdge
        and j is not already contained in MST:
          minEdge = Edge(i, j)

    MST.push(minEdge)

  return MST
```

We can show the correctness of Prim's Algorithm through contradiction and
mathematical induction. Intuitively, since we are working with a greedy
algorithm, one natural way of visualizing this problem is considering two
subsets of Vertices, say A and B, of the total set of Vertices V:

```
// Suppose we have a two subsets of Vertices, A and B:

A (1, 2, 3, 4 ... u)
B (5, 6, 7, 8 ... v, w)
```

Suppose that the Vertices in A form a minimum spanning tree, and we pick out
some Vertex u. Suppose that the Vertices in B do not form a minimum spanning
tree, and we pick out some Vertex v such that the Edge (u, v) if the next
minimum weight Edge from any Vertex in A to any Vertex in B, and we pick out
any other Vertex where this is not true, say some Vertex w.

Assume that choosing Vertex w instead of Vertex v will form a minimum spanning
tree, and we do this do the rest of the Vertices in B, and we end up with a
minimum spanning tree of the Vertices in B, starting from Vertex w. We can
imagine this situation to a bipartite graph, where removing the Edge (u, w)
gives us A and B, where both A and B individually form a minimum spanning tree.
However, this is a contradiction that A and B connected via Edge (u, w) is
overall a minimum spanning tree because there does exist an Edge connecting A
and B that is less weight, namely Edge (u, v). Thus by picking Edge v, that is,
the next minimum weight Edge from a Vertex in the current minimum spanning tree
so far to any other Vertex v not in the minimum spanning tree results in a
minimum spanning tree including v.

The base case is that a Graph of one Vertex itself is a minimum spanning tree.
Assume that we have a set A of k Vertices that are already in the minimum
spanning tree, and using the argument above, adding the next minimum weight
Edge from any Vertex in A to any Vertex not in A, say some Vertex v, results in
a minimum spanning tree of A + v and a size of k+1. Then suppose we had a set
B of k+1 Vertices that are already in the minimum spanning tree, and we add the
next minimum weight Edge from any Vertex in B to any Vertex not in B, say some
Vertex w. Then by the inductive hypothesis, this results in a minimum spanning
tree of B + w and a size of k+2. Then by the principles of mathematical
induction, we have that the final minimum spanning tree contains V Vertices and
V-1 Edges. Thus Prim's Algorithm is correct.

Determining the time complexity is Prim's Algorithm is dependent on the type of
data structure we use, because of the part of the algorithm that requires us
to find the "next minimum weight Edge from some Vertex already in the minimum
spanning tree to another Vertex not in the minimum spanning tree". Although
there are a variety of data structures that are possible, we consider the use
of a Priority Queue that implements a Binary Min Heap.

We can see how it works intuitively. Overall, we need to add all of the Vertices
V to the minimum spanning tree, and this takes O(V) time. Every time we add a
new Vertex to the current minimum spanning tree so far, we call the operation
extractMin from the Priority Queue to get the next minimum weight Edge, and this
Priority Queue is at most the size V (when all of the Vertices in the Graph have
yet to be added to minimum spanning tree), and so the extractMin operation takes
O(lgV) time. But for every time after we call extractMin, and retrieve say
Vertex i, we must go through all of the Edges in the Priority Queue and delete
all the ones that end in i, because those Edges are no longer necessary/valid,
so the latter part of the algorithm overall takes O(ElgV) time. Thus overall the
algorithm takes O(V + ElgV) time.

### Implementation

##### Java

View the source code here.

### Time Complexity

