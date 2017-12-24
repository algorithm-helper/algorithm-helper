# Strongly Connected Components

Strongly connected components, in the context of directed graphs, refer to subgraphs within a 
graph such that every vertex is reachable (i.e. has a directed path) to every other vertex in that
subgraph. If a graph has a strongly connected component, this does not imply that the graph itself 
is strongly connected.

### Visualization

The following is an example of a directed graph with strongly connected components:

<img src="https://i.imgur.com/Pff20f9.png" alt="Strongly Connected Components" width="400" height="300">

Here, we have two strongly connected components: first with the set `A = (1, 2, 3, 4)` since we have 
a directed cycle amongst them, and thus can get to any of those vertices from any other vertex in 
that set, second with the set `B = (5, 6, 7, 8, 9)`, since we have a directed cycle amongst them as 
well. However, these are two separate strongly connected components because we cannot get from any 
vertex in `B` to any vertex in `A`.

We want to be able to group the vertices into their respective strongly connected components. 
Intuitively, we can think of any one of those strongly connected components grouped into one 
"vertex", and we have edges coming in and out of that vertex. The distinction of the vertices
within the group itself is not important. 

The following is a visualization of that grouping:

<img src="https://i.imgur.com/vVcZgOM.png" alt="Strongly Connected Components Grouped" width="400" height="300">

Thus, for the example above, we should think of that graph as two vertices `A` and `B`, where 
`A = (1, 2, 3, 4)` and `B = (5, 6, 7, 8, 9)`.
