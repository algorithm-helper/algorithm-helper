# Breadth First Search

Breadth first search is an algorithm for path traversal such that we always explore adjacent 
vertices at the same level before exploring deeper levels. Generally, the main data structure we 
use to keep track of vertices to explore is a queue. The algorithm is virtually identical to the one 
for depth first search with a stack, except with a queue. 

The main idea behind breadth first search is that we maintain a set `visited`, which keeps track of 
which vertices we have already encountered, and a queue which we enqueue adjacent vertices first.

Like with depth first search, we maintain an array `predecessor`, which gives us the previous vertex 
explored at a certain vertex, and this forms a tree structure. When we reach the end of the 
traversal, we index into `predecessor` at the ending vertex, and continuously find its parent 
vertex $p$, until we reach the starting vertex again, adding $p$ to a stack. Thus when we iterate
over the stack, we get the path from the starting vertex to the ending vertex.

### Using Queue

In the method using queues, we maintain a queue `Q` that keeps track of the traversal order, we 
dequeue a vertex from `Q` to get the next vertex to explore and we enqueue adjacent vertices to 
`Q` before exploring them. Intuitively, because a queue is a FIFO (first-in-first-out) data 
structure, we are always exploring adjacent vertices (on the same level) before exploring deeper
levels, since we dequeue from the front of the queue. 

Pseudocode:

```
adjacent : adjacency list
visited : set containing all of the visited vertices
predecessor : array containing the index of the parent vertex in the traversal
Q : queue of vertices, initialized to be empty
u : starting vertex
v: ending vertex

// Starting breadth first search:
breadthFirstSearch(u, v):
  Q.enqueue(u)

  while (!Q.isEmpty()):
    current = Q.dequeue()

    if (current == v):
      break

    for each vertex v in adjacent[current]:
      if (!visited.contains(x)):
        predecessor[x] = current
        visited.add(x)
        Q.enqueue(x)

// Finding the path from u to v:
P : stack of vertices, initialized to be empty

for (i = v; i != u; i = predecessor[i]):
  P.push(i)

// Thus iterating over P gives us the path from u to v.
```

The pseudocode for breadth first search is almost identical depth first search, except instead of 
using a stack, we use a queue. One of the properties of breadth first search is that the algorithm 
runs in $O(|V|+|E|)$ time and uses $O(|V|)$ space. We can see this because breadth first search will
reach every vertex at most once (assuming we have a connected graph), since before exploring the 
vertex we add it to the set `visited`, and will never visit it again. At each vertex, we iterate
over its adjacency list before adding non-visited ones to the queue, that is, we iterate over all
outgoing edges from that vertex. Intuitively, if we consider all outgoing edges from all vertices,
we would have considered all edges in the graph. Since the set `visited` and the array `predecessor`
can contain at most $|V|$ vertices, it uses $O(|V|)$ space. But since the queue `Q` can have at most
$|V|$ elements, it uses $O(|V|)$ space. Thus, breadth first search uses $O(|V|)$ auxiliary space.

### Implementation

##### Java

<script src="https://gist.github.com/eliucs/3edf468efd8bdfc677b4418ba5e3c8d3.js"></script>

### Time Complexity

```
| Algorithm            | time complexity | space complexity |
|----------------------|-----------------|------------------|
| breadth first search | O(|V|+|E|)      | O(|V|)           |
```
