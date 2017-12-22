# Depth First Search

Depth First Search is an algorithm for path traversal such that we always
explore as far as possible into the branches of Vertices (those adjacent to a
certain Vertex), before backtracking. Generally, there are two data structures
that we can use when we implement Depth First Search: the first is using
recursion, and the second is using Stacks.

The main idea behind Depth First Search is that we maintain a Set visited,
which keeps track of which Vertices we have already encountered, and whether we
will use recursion or Stacks, and always continue to explore adjacent Vertices
first, before exploring Vertices on the same level. Recursion or using Stacks
will provide us the mechanism for which we can backtrack, and when we continue
to visit Vertices, we skip the Vertices that are already contained in visited.

In both methods, we maintain an array predecessor, which gives us the previous
Vertex explored at a certain Vertex, and this forms a tree structure. When we
reach the end of the traversal, we index into predecessor at the ending Vertex,
and continuously find its parent Vertex i, until we reach the starting Vertex
again, adding i to a Stack. Thus when we iterate over the Stack, we get the
path from the starting Vertex to the ending Vertex.

In the recursive method, when we call Depth First Search recursively on the
adjacent Vertices first, then intuitively, we get deeper into the levels of the
Graph, hence the term Depth First Search. Furthermore, when reach a Vertex that
has no more already unvisited adjacent Vertices, we return up the recursion
stack, which brings us one level higher. Thus, this allows us to backtrack.

Pseudocode (recursion):

```
adjacent : Adjacency List
visited : Set containing all of the visited Vertices
predecessor : Array containing the index of the parent Vertex in the traversal
u : Starting Vertex
v: Ending Vertex

// Starting Depth First Search:
depthFirstSearch(u, v):
  visited.add(u)

  if (u == v):
    return

  for each Vertex x in adjacent[u]:
    if (!visited.contains(x)):
      predecessor[x] = u;
      depthFirstSearch(x, v)

// Finding the path from u to v:
P : Stack of Vertices, initialized to be empty

for (i = v; i != u; i = predecessor[i]):
  P.push(i)

// Thus iterating over P gives us the path from u to v.
```

In the method using Stacks, we maintain a Stack S that keeps track of the
traversal order, we pop a Vertex from S to get the next Vertex to explore, and
we push adjacent Vertices to S before exploring them. Intuitively, because a
Stack is a LIFO (last-in-first-out) structure, we are always exploring deeper
levels of the Stack before lower levels since they are at the top of the Stack.
Since when we pop elements off the Stack, we go to Vertices up the levels of the
traversal, this allows us to backtrack.

Pseudocode (Stacks):

```
adjacent : Adjacency List
visited : Set containing all of the visited Vertices
predecessor : Array containing the index of the parent Vertex in the traversal
S : Stack of Vertices, initialized to be empty
u : Starting Vertex
v: Ending Vertex

// Starting Depth First Search:
depthFirstSearch(u, v):
  S.push(u)

  while (!S.isEmpty()):
    current = S.pop()

    if (current == v):
      break

    for each Vertex x in adjacent[current]:
      if (!visited.contains(x)):
        predecessor[x] = current
        visited.add(x)
        S.push(x)

// Finding the path from u to v:
P : Stack of Vertices, initialized to be empty

for (i = v; i != u; i = predecessor[i]):
  P.push(i)

// Thus iterating over P gives us the path from u to v.
```

One of the properties of Depth First Search is that the algorithm runs in linear
time, O(V + E) time and uses O(V) space. We can see this because Depth
First Search will reach every Vertex at most once (assuming we have a connected
Graph), since before exploring the Vertex we add it to the Set visited, and will
never visit it again. At each Vertex, we iterate over its adjacency list, that
is, we iterate over all outgoing edges from that Vertex. Intuitively, if we
consider all outgoing edges from all Vertices, we would have considered all
Edges in the Graph.

Since the Set visited and the array predecessor can contain at most V vertices,
it uses O(V) space. But since the recursion stack can get at most V deep, or
equivalently the Stack S can have at most V elements, it uses O(V) space. Thus,
Depth First Search uses O(V) auxiliary space.

### Implementation

##### Java

View the source code here.

```
```

### Time Complexity

