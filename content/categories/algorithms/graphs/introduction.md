# Introduction

The topic in this section is graphs and algorithms on graphs. A graph is an abstract data type that 
is used to model connections and relationships, and consists of a set of vertices $V$ and a set of 
edges $E$. A graph is generally visualized as a network of vertices joined pairwise with edges, 
which may be straight lines (in the case of undirected graphs), arrow lines (in the case of directed 
graphs), or with numbers beside them representing weights (in the case of weighted graphs). We will 
see further on the differences between processing undirected, directed, weighted (with non-negative 
weights) and weighted (with possible negative and zero weights) graphs,  and how some strategies 
and algorithms work for certain situations but not others.

### Terminology

We first look at some terminology and definitions with graphs.

From Wikipedia:

> [Graph (abstract data type)](https://en.wikipedia.org/wiki/Graph_%28abstract_data_type%29) - an 
abstract data type that is meant to implement the undirected graph and directed graph concepts from 
mathematics, specifically the field of graph theory. A graph data structure consists of a finite 
(and possibly mutable) set of vertices or nodes or points, together with a set of unordered pairs 
of these vertices for an undirected graph or a set of ordered pairs for a directed graph. These 
pairs are known as edges, arcs, or lines for an undirected graph and as arrows, directed edges, 
directed arcs, or directed lines for a directed graph. The vertices may be part of the graph 
structure, or may be external entities represented by integer indices or references.

> [Graph Theory](https://en.wikipedia.org/wiki/Graph_theory) - the study of graphs, which are 
mathematical structures used to model pairwise relations between objects. A graph in this context is 
made up of vertices, nodes, or points which are connected by edges, arcs, or lines. A graph may be 
undirected, meaning that there is no distinction between the two vertices associated with each edge, 
or its edges may be directed from one vertex to another. Graphs are one of the prime objects of 
study in discrete mathematics.

Graphs have many applications to the real world: vertices may represent nodes in a computer 
infrastructure, people in a social media network, intersections in a road network; edges may 
represent the ethernet cables connecting nodes, friendships connecting people, or streets connecting intersections, respectively.

The following are terminology relating to properties and operations on graphs, vertices, and edges:

- graph 
    - An ordered pair $G = (V, E)$, where $V$ is a set of vertices, $E$ is a set of edges, and we
    write $V(G)$ to denote the vertex set of $G$, $E(G)$ to denote the edge set of $G$.
- vertex
    - A node representing some form of data point.
- edge 
    - A connection between a pair of vertices, and may be straight (undirected graph), an arrow
    (directed graph), have a length/weight (weighted graph).
- adjacent
    - Two vertices are adjacent if they are connected by an edge.
- incident
    - Two edges are incident if they share a vertex.
- neighbors
    - A list of all vertices $v$ where there exists an edge $e$ from a vertex $u$ to $v$.
- degree
    - The number of edges incident to a vertex $u$.
- maximum degree
    - The vertex in the graph with the largest degree.
- minimum degree
    - The vertex in the graph with the smallest degree.
- in-degree
    - In the context of directed graphs, the number of edges directed towards a vertex $u$.
- out-degree
    - In the context of directed graphs, the number of edges directed outwards from a vertex $u$.
- subgraph
    - Another graph $H$ formed by taking a subset $V(H)$ of vertices of $V(G)$ and a subset $E(H)$ 
    of edges of $E(G)$ such that edges must have both ends in $V(H)$.
- spanning subgraph
    - A subgraph that uses contains all of the vertices of $V(G)$.
- walk
    - A sequence $v_0, e_0, v_1, e_1, ... , e_n, v_n$ of vertices $v_i$ and edges $e_i$ where 
    $0 \leq i \leq n$.
- path
    - A walk where all of the vertices are distinct.
- shortest path
    - Starting from a vertex $u$ and ending with a vertex $v$, the path of minimum weight from $u$
    to $v$.
- length
    - The number of edges in a path.
- isolated vertex
    - A vertex with a degree of 0.
- add vertex
    - An operation on $G$ that adds an isolated vertex to $V(G)$.
- add edge
    - An operation on $G$ that adds an edge to $E(G)$, where both end vertices must be valid (i.e.
    must be contained in $V(G)$).
- delete vertex
    - An operation on $G$ that deletes a vertex $u$ from $V(G)$ and all edges incident to $u$ from
    $E(G)$. Vertex $u$ must exist in $V(G)$.
- delete edge
    - An operation on $G$ that deletes an edge $e$ from $E(G)$. Edge $e$ must exist in $V(G)$, and 
    if the two end vertices of $e$ are the only instances, then they must be deleted from $V(G)$ as
    well.
- isomorphic graph / isomorphism
    - Two graphs $G$ and $H$ such that there exists a bijection $f: G \rightarrow H$ such that $f(u)$ is 
    adjacent to $f(v)$ if an only if vertices $u$ and $v$ are adjacent.
- cycle
    - A path whose first vertex is equal to its last vertex. By definition, cycles must have length
    at least 3.
- acyclic
    - When there exists no cycles.
- spanning cycle
    - A spanning subgraph that is a cycle
- Hamiltonian cycle
    - A spanning cycle that uses every vertex exactly once.
- Eulerian path
    - A cycle that uses every edge in the graph exactly once. Euler showed that this is possible
    if an only if all vertices of the graph have an even degree.
- self-loop
    - When a vertex $u$ has an edge to itself.
- parallel edges
    - When vertices $u$ and $v$ have more than one edge connecting each other.
- connected / connectedness
    - When for any vertex $u$ in $G$, there exists a path to all other vertices $v$ in $G$. 
- component
    - A connected subgraph $C$, and any other subgraph that properly contains $C$ is not 
    connected.
- bridge
    - An edge $e$ in $E(G)$ such that the resulting graph obtained by deleting $e$ ($G - e$) has
    more components than that of $G$.
- predecessor
    - A list of all vertices $v$ where there exists an edge $e$ from $v$ to a vertex $u$.
- edge weight
    - The value of an edge, and generally, this value can represent a distance, or length, or 
    importance, for example.
- density
    - The number of edges divided by the maximum number of edges.
- maximum number of edges
    - Equal to $V(V-1)/2$.
- Handshaking Lemma
    - The sum of the degrees of all vertices $v$ in $V(G)$ is equal to $2|E(G)|$.
- girth
    - The minimum length cycle in the graph. If there exists no cycles, then the girth is defined
    to be infinite.
- tree
    - A connected graph such that every edge is a bridge.
- bipartiteness / bipartite graph
    - A graph has a bipartition $(A, B)$ such that all edges connect a vertex from $A$ to a vertex
    from $B$.
- k-regular graph
    - A graph where all vertices have degree $k$.
- complete graph
    - A graph where every pair of distinct vertices is connected by a unique edge, denoted as 
    $K(n)$ where $n$ is the degree of each vertex.
- complete bipartite graph
    - A graph that is complete and bipartite, denoted as $K(m,n)$ where $m,n$ are the degree of 
    each vertex in each respective bipartition.
- planarity / planar graph
    - A graph that can be drawn on a plane such that no edges cross each other.
- face
    - A region of a planar graph bounded by edges. In a graph $G$, the set of faces is denoted as
    $F(G)$.
- degree of face
    - The number of edges bounding that face.
- planar embedding
    - The actual drawing itself of a planar graph on a plane such that no edges cross each other.
- Faceshaking Lemma (Handshaking Lemma for faces)
    - The sum of the degrees of all faces $f$ in $F(G)$ is equal to $2|E(G)|$.
- Euler's formula
    - The formula $p - q + f = 2$ where $p = |V(G|$, $q = |E(G)|$, $f = |F(G)|$.
- Kuratowski's Theorem
    - A graph is not planar if and only if it contains a subgraph that is an edge subdivision of 
    $K(5)$ or $K(3,3)$. 
- matching
    - A set of edges $M$ of a graph such that they do not share any common vertex.
- cover
    - A set of vertices $C$ of a graph such that all edges of the graph must be incident to some
    element in $C$.
- maximum matching
    - A matching $M$ of the largest size.
- minimum cover
    - A cover $C$ of the minimum size. 
- Konig's Theorem
    - In any bipartite graph, the size of the maximum matching equals the size of the minimum 
    cover, $|M| = |C|$.
