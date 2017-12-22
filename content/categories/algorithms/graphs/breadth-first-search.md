# Breadth First Search

Breadth First Search is an algorithm for path traversal such that we always
explore adjacent Vertices at the same level before exploring deeper levels.
Generally, the main data structure we use to keep track of Vertices to explore
is a Queue. The algorithm is very similar to the one for Depth First Search
using Stacks, except with a Queue.

The main idea behind Breadth First Search is that we maintain a Set visited,
which keeps track of which Vertices we have already encountered, and a Queue
which we enqueue adjacent Vertices first.

Like with Depth First Search, we maintain an array predecessor, which gives us
the previous Vertex explored at a certain Vertex, and this forms a tree
structure. When we reach the end of the traversal, we index into predecessor at
the ending Vertex, and continuously find its parent Vertex i, until we reach the
starting Vertex again, adding i to a Stack. Thus when we iterate over the Stack,
we get the path from the starting Vertex to the ending Vertex.

In the method using Queues, we maintain a Queue Q that keeps track of the
traversal order, we dequeue a Vertex from Q to get the next Vertex to explore
and we enqueue adjacent Vertices to Q before exploring them. Intuitively,  
because a Queue is a FIFO (first-in-first-out) structure, we are always
exploring adjacent Vertices (on the same level) before exploring deeper levels,
since we dequeue from the front of the Queue.

Pseudocode (Queue):

```
adjacent : Adjacency List
visited : Set containing all of the visited Vertices
predecessor : Array containing the index of the parent Vertex in the traversal
Q : Queue of Vertices, initialized to be empty
u : Starting Vertex
v: Ending Vertex

// Starting Breadth First Search:
breadthFirstSearch(u, v):
  Q.enqueue(u)

  while (!Q.isEmpty()):
    current = Q.dequeue()

    if (current == v):
      break

    for each Vertex x in adjacent[current]:
      if (!visited.contains(x)):
        predecessor[x] = current
        visited.add(x)
        Q.enqueue(x)

// Finding the path from u to v:
P : Stack of Vertices, initialized to be empty

for (i = v; i != u; i = predecessor[i]):
  P.push(i)

// Thus iterating over P gives us the path from u to v.
```

As one can see, the pseudocode for Breadth First Search is almost identical to
Depth First Search, except instead of using a Stack, we use a Queue. One of the
properties of Breadth First Search is that the algorithm runs in linear time,
O(V + E) time and uses O(V) space. We can see this because Breadth First Search
will reach every Vertex at most once (assuming we have a connected Graph), since
before exploring the Vertex we add it to the Set visited, and will never visit
it again. At each Vertex, we iterate over its adjacency list before adding
non-visited ones to the Queue, that is, we iterate over all outgoing edges from
that Vertex. Intuitively, if we consider all outgoing edges from all Vertices,
we would have considered all Edges in the Graph.

Since the Set visited and the array predecessor can contain at most V vertices,
it uses O(V) space. But since the Queue Q can have at most V elements, it uses
O(V) space. Thus, Breadth First Search uses O(V) auxiliary space.

### Implementation

##### Java

View the source code here.

```
```

### Time Complexity

