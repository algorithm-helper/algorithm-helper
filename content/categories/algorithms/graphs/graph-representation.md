# Graph Representation

Graph representation refers to what kind of data structure will be used to represent the
relationships between the vertex set $V$ and the edge set $E$. For an effective data structure for
graphs, we need to be able to support basic operations of graphs efficiently, and generally, these
operations are `V`, `E`, `containsVertex/containsEdge`, `insertVertex/insertEdge`, 
`deleteVertex/deleteEdge`, `getDegree`, `getAdjacent`, and `getVertices`, which give us the total
number of vertices and edges, check whether a vertex of edge exists in the graph, add and remove
vertices and edges, get the degree of a particular vertex, iterate over the adjacent vertices of 
a particular vertex (its neighbors), and iterate over all of the vertices altogether, respectively.

There are three main methods to represent a graph: using an edge list, vertex matrix, or an 
adjacency matrix. While they do have their own respective advantages and disadvantages in certain
use cases, the structure that will primarily be used is the adjacency list, because of how 
overall, operations are efficient.

### Edge List

An edge list is a data structure for graph representation, and the main approach is to maintain a 
list of containing all of the edges, with each edge represented as a pair of vertices.

For example:

```
// The following is an edge list:
(1, 2)
(2, 1)
(2, 3)
(5, 6)
(2, 5)
(5, 6)
(7, 8)
```

Here, the edges are represented with vertices delimited by a comma on each line, and we have the 
edges $(1, 2), (2, 1), (2, 3), (5, 6), (2, 5), (5, 6), (7, 8)$. This is a very simple way of 
graph representation.

One of the properties of this type of structure is that we can add edges in $O(1)$ time, simply by 
appending it to the existing list, and it is simple to implement. But deleting edges takes $O(|E|)$
time, which may be advantageous with sparse graphs, but inefficient in dense graphs, as it becomes 
$O(|V|^2)$ time. This is because we must iterate over every edge one at a time to find the one that we
are looking for.

However, for operations like checking if a certain edge exists, this also takes $O(|E|)$ time since we 
would have to iterate through the list and find the corresponding pair. All to find the neighbors 
of a vertex $u$, we would also have to iterate through the list and collect all the pairs that 
start from $u$.

### Vertex Matrix

A vertex matrix is a data structure for graph representation, and the main approach is to store the relationships between vertices in a 2-dimensional $|V|\times|V|$ array `A` of booleans. All of the elements 
in this 2D array are initialized to false, and we set an element at `A[i][j]` to be true only if 
there is an edge from vertex `i` to vertex `j`.

For example:

```
// The following is a vertex matrix (0 - false, 1 - true):

        j
    0 1 2 3 4
  0 0 0 0 0 0
  1 1 1 0 1 0
  2 0 1 0 1 0
i 3 1 1 0 0 0
  4 0 0 0 1 0
```

Here, when an element at `A[i][j]` is true, then there is an edge from vertex `i` to vertex `j`, 
and thus we have the following edges: $(1, 0), (1, 1), (1, 3), (2, 1), (2, 3), (3, 0), (3, 1),  
(4, 3)$.

One of the properties of this type of structure is that we are able to add or delete an edge in 
$O(1)$ time, since all we have to do is index into the array and set the boolean to be true or 
false. Likewise, we can check if two vertices are adjacent in $O(1)$ time by checking if the element 
at the corresponding index is true.

However, if we were to find the neighbors of a vertex $u$, we would have to iterate through that 
element's entire row, collecting all of the column indices which at that row are set to true. Thus, 
this takes $O(N)$ time. Furthermore, this structure is not space efficient, as we require 
$O(|V|^2)$ space to build this matrix. Although it is independent on the number of edges, this space 
usage would never be advantageous even in the case of a dense graph, since in a dense
graph, the number of edges is proportional to $O(|V|^2)$.

### Adjacency List

An adjacency list is a data structure for graph representation, and the main idea is to keep an 
array of linked lists of vertices, where the index of the array represents a particular vertex $u$, 
and its corresponding linked list represents the neighbors from $u$.

For example:

```
// The following is an adjacency list:

array indices:
[0] -> [1] -> [3]
[1] -> [2]
[2] -> [1] -> [4]
[3]
[4] -> [1]
```

Here, we can find the edges by iterating through the array `A` for every index `i`, and iterating 
through the corresponding linked list corresponding for every index `j`, we collect all edges
$(i, j)$, thus in the example we have the following edges: $(0, 1), (0, 3), (1, 2), (2, 1), (2, 4), 
(4, 1)$. This is a much more intuitive and natural way of representing graphs as opposed to the 
previous two data structures.

One of the advantages to this data structure is that adding or deleting an edge can be done in 
$O(1)$ time, since indexing into the array takes $O(1)$ time, and we
can simply append the new vertex forming the new edge to the front of the linked list (or back, if 
we have a `back` pointer).

To check if vertex $v$ is adjacent to vertex $u$, we index into array at $u$, and then traverse the corresponding linked list to find $v$. Since indexing into the array is done in $O(1)$ time, and 
traversing the corresponding linked list is done in $O(degree(u))$ time, thus this operation runs 
in $O(degree(u))$ time, where $u$ is the starting vertex in question.

Similarly, if we wanted to find all the neighbors of vertex $u$, we index into the array at $u$, 
and then traverse through the corresponding linked list. This is also done in $O(degree(u))$ time, 
where $u$ is the vertex in question.

The space complexity of this data structure is $O(|V|+|E|)$, and intuitively, this is because first we 
must represent all of the vertices by index in the array, and then for each corresponding linked 
list, that represents all of the edges outgoing from that Vertex, but if we sum all of the edges 
from all of the vertices, we get all of the edges in the Graph.

### Implementation (Graph Representation)

The following provides the interface for the `GraphRepresentation` class.

##### Java

<script src="https://gist.github.com/eliucs/7b0157d77b04c5e0ba817701dc04481e.js"></script>

### Implementation (Edge List)

##### Java

<script src="https://gist.github.com/eliucs/95a47555aa53ef781feae6234fec8555.js"></script>

### Implementation (Vertex Matrix)

##### Java

<script src="https://gist.github.com/eliucs/e86f5592d82300f82334870acaaf5caa.js"></script>

### Implementation (Adjacency List)

##### Java

<script src="https://gist.github.com/eliucs/88a4b84231e1a8ee61579c5101e2aee5.js"></script>

### Time Complexity

The following table describes the time and space complexity for performing the 
operations above on an edge list, vertex matrix, adjacency list:

```
| Data Structure | space complexity   | containsVertex   | containsEdge   | insertVertex | insertEdge | deleteVertex   | deleteEdge   | getDegree      | getAdjacent    |
|----------------|--------------------|------------------|----------------|--------------|------------|----------------|--------------|----------------|----------------|
| edge list      | O(|E|)             | O(|E|)           | O(|E|)         | n/a          | O(1)       | O(|E|)         | O(|E|)       | O(|E|)         | O(|E|)         |
| vertex matrix  | O(|V|^2)           | O(1)             | O(1)           | n/a          | O(1)       | n/a            | O(1)         | O(V)           | O(V)           |
| adjacency list | O(|V|+|E|)         | O(1)             | O(degree(u))   | O(1)         | O(1)       | O(degree(u))   | O(1)         | O(degree(u))   | O(degree(u))   |
```
