# Strongly Connected Components

Strongly Connected Components are subgraphs within a Graph such that every
Vertex is reachable by every other Vertex. If a Graph has a strongly connected
component, this does not at all imply that the Graph itself is strongly
connected.

For example;

```
// Supposed we have the following Graph:

1 -> 2 -> 5 -> 6 -> 7 -> 10
^    |      <           /   
|    v       \ 8 <- 9 <
4 <- 3
```

Here, we have two strongly connected components, first, in Set A with the
Vertices 1, 2, 3, 4, since we have a cycle amongst them and thus can get to any
one of those Vertices from any other one. Second, in Set B, with the Vertices 5,
6, 7, 10, 9, 8, since we have a cycle amongst them as well. However, they are
two separate strongly connected components because we cannot get from any
Vertices in B to A.

We want to be able to group the Vertices into their respective strongly
connected components. If we were to visualize this problem, intuitively, we can
think of this Graph as a Graph between individual strongly connected components,
grouped as their own subgraph. Their distinction within their group is not
important.

Thus, for the example above, we should think of that Graph as:

```
// We have the following Graph, which is equivalent to the previous example
// in the context of strongly connected components:

(1, 2, 3, 4) -> (5, 6, 7, 10, 9, 8)
```
