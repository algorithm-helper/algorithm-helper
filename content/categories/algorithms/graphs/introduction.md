# Introduction

A Graph is an abstract data type that is meant to model connections between
Vertices using Edges. A Graph is generally visualized as a network of Vertices,
where the Vertices are visualized as circles with some ID number on the, joined
pairwise by connections called Edges, which may be straight lines (in the case
of Undirected Graphs), arrow lines (in the case of Directed Graphs), or with
numbers beside them (representing weights in the case of Weighted Graphs). All
of these terms are further explained in the notes.

Definitions from Wikipedia:

[Graph (abstract data type)](https://en.wikipedia.org/wiki/Graph_(abstract_data_type)) -
an abstract data type that is meant to implement the undirected graph and
directed graph concepts from mathematics, specifically the field of graph
theory. A graph data structure consists of a finite (and possibly mutable) set
of vertices or nodes or points, together with a set of unordered pairs of these
vertices for an undirected graph or a set of ordered pairs for a directed graph.
These pairs are known as edges, arcs, or lines for an undirected graph and as
arrows, directed edges, directed arcs, or directed lines for a directed graph.
The vertices may be part of the graph structure, or may be external entities
represented by integer indices or references.

[Graph Theory](https://en.wikipedia.org/wiki/Graph_theory) - the study of
graphs, which are mathematical structures used to model pairwise relations
between objects. A graph in this context is made up of vertices, nodes, or
points which are connected by edges, arcs, or lines. A graph may be undirected,
meaning that there is no distinction between the two vertices associated with
each edge, or its edges may be directed from one vertex to another. Graphs are
one of the prime objects of study in discrete mathematics.

Visualization from Wikipedia
[here](https://en.wikipedia.org/wiki/Graph_(discrete_mathematics)#/media/File:6n-graf.svg).

Graphs have many applications to the real world: Vertices may represent nodes in
a computer infrastructure, people in a social media network, intersections in
a road network; Edges may represent the ethernet cables connecting nodes,
friendships connecting people, or streets connecting intersections,
respectively.

### Terminology

The following are basic terms about Graphs as well as basic operations on the
Graph, Vertex and Edge abstract data structures:

Graph - an ordered pair G = (V, E), where V is a set of Vertices, E is a set of
Edges.

Vertex - a node representing some form of data point.

Edge - a connection between a pair of Vertices, and may or may not be an arrow
(directed) or have a length or weight (weighted).

Adjacent - a basic operation on a Graph that tests if there exists an Edge e
from a Vertex x to another Vertex y.

Neighbors/Adjacency - a list of all Vertices y where there exists an Edge e
from a Vertex x to y.

Predecessor - a list of all Vertices y where there exists an Edge e from y to
a Vertex x.

Add Vertex - a basic operation on a Graph that adds a Vertex x to the set of
Vertices V.

Delete Vertex - a basic operation on a Graph that deletes a Vertex x from the
set of Vertices V.

Add Edge - a basic operation on a Graph that adds a Edge e to the set of
Edges E.

Delete Edge - a basic operation on a Graph that deletes a Edge e from the
set of Edges E.

Degree - in the case of Undirected Graphs, degree(x) represents the number of
Edges stemming from a Vertex x, with Self-Loops double counted.

Maximum Degree - the largest degree amongst the set of Vertices V in a Graph.

Minimum Degree - the smallest degree amongst the set of Vertices V in a Graph.

In-degree - in the case of Directed Graphs, this is the number of Edges
directed towards a Vertex x.

Out-degree - in the case of Directed Graphs, this is the number of Edges
directed outwards from a Vertex x.

Path - the sequence of Vertices (or Edges) that connected a Vertex x to a
Vertex y in the Graph.

Shortest Path - starting from a Vertex x and ending at a Vertex y, this is the
minimum weighted path connecting x to y.

Self Loop - when a Vertex x has an Edge to itself.

Parallel Edges - when a Vertex x and a Vertex y have more than one Edges
connecting each other.

Edge Weight - the value of an Edge, and generally, this value can represent a
distance, or length, or importance, for example.

Connected - if there exists a path from one Vertex x to all other Vertices y.

Not Connected - if there does not exist a path from one Vertex x to all other
Vertices y, and the then we can say that the Vertices form a set of connected
components.

Length of a Path - the number of Edges in a Path.

Cycle - a path whose first Vertex is equal to its last Vertex.

Acyclic - there exists no cycles in the Graph.

Density - the number of Edges divided by the maximum number of Edges.

Maximum Number of Edges - equal to V(V-1)/2, where V is the number of Vertices.
