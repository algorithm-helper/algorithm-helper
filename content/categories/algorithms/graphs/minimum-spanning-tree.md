# Minimum Spanning Tree

A Minimum Spanning Tree is a subset of Edges of a connected, weighted,
undirected Graph that connects all Vertices, without cycles and the minimum
possible combined weight. Any connected, weighted, undirected Graph has a
minimum spanning tree. One of the properties of a minimum spanning tree is that
if all of the Edge weights are distinct values, then the graph has exactly one
minimum spanning tree. However, if they are not distinct, we may have more than
one possible minimum spanning tree. Since the latter is more general (and
thereby potentially more useful), we do not assume uniqueness in the Edge
weights.

Definition from Wikipedia:

[Minimum Spanning Tree](https://en.wikipedia.org/wiki/Minimum_spanning_tree) -
a subset of the edges of a connected, edge-weighted, undirected graph that
connects all the vertices together, without any cycles and with the minimum
possible total edge weight. That is, it is a spanning tree whose sum of edge
weights is as small as possible. More generally, any undirected graph (not
necessarily connected) has a minimum spanning forest, which is a union of the
minimum spanning trees for its connected components.

The applications of being able to determine a minimum spanning tree from a
graph are obvious. One example could be building roads that connect towns. A
minimum spanning tree would be able to minimize the total cost of the road
material needed. Another example could be laying out networking cables within an
office building. A minimum spanning tree would be able to determine the optimal
way of laying out ethernet cables to connect all of the devices in the office,
minimizing the total length (and thereby total cost) of the cables.

I build a web application to visualize this: [Minimum Spanning Tree Demonstration](https://minspantree.herokuapp.com/).
