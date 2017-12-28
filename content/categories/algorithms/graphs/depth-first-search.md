# Depth First Search

Depth first search is an algorithm for path traveral such that we always explore as far as 
possible into adjacent vertices before backtracking. Generally, there are two methods we can 
perform depth first search: the first is using recursion, and the second is using a stack. 

The main approach behind depth first search is that we maintain a set `visited`, which keeps track 
of which vertices we have already encountered. Whether we use recursion or a stack, we always
continue to explore adjacent vertices first, before exploring vertices on the same level. Recursion 
or using stacks will provide us the mechanism for which we can backtrack, and when we continue to 
visit vertices, we skip the vertices that are already contained in `visited`. 

In both methods, we maintain an array or map `predecessor`, which gives us the previous vertex 
explored at a certain vertex, and this forms a tree structure. When we reach the end of the 
traversal, we index into `predecessor` at the ending vertex, and continuously find its parent
vertex $p$ until we reach the starting vertex again, adding $p$ onto the stack. Thus when we 
iterate over the stack, we get the path from the starting vertex to the ending vertex.

### Using Recursion

In the recursive method, when we call depth first search recursively on the adjacent vertices 
first, then intuitively, we get deeper into the levels of the graph, hence the term "depth first
search". Furthermore, when we reach a vertex that has no more already unvisited adjacent vertices,
we return up the recursion stack, which brings us one level higher. Thus, this allows us to 
backtrack.

Pseudocode:

```
adjacent : adjacency list
visited : set containing all of the visited vertices
predecessor : array containing the index of the parent Vertex in the traversal
u : starting vertex
v: ending vertex

// Starting depth first search:
depthFirstSearch(u, v):
  visited.add(u)

  if (u == v):
    return

  for each vertex x in adjacent[u]:
    if (!visited.contains(x)):
      predecessor[x] = u;
      depthFirstSearch(x, v)

// Finding the path from u to v:
P : stack of vertices, initialized to be empty

for (i = v; i != u; i = predecessor[i]):
  P.push(i)

// Thus iterating over P gives us the path from u to v.
```

### Using a Stack

In the method using stacks, we maintain a stack `S` that keeps track of the traversal order, we
pop a vertex from `S` to get the next vertex to explore, and we push adjacent vertices to `S` before
exploring them. Intuitively, because a stack is a LIFO (last-in-first-out) structure, we are always
exploring deeper levels of the stack before lower levels since they are nearer the top of the stack.
Since when we pop elements off the stack, we go to vertices up the levels of the traversal, and
this allows us to backtrack. 

Pseudocode:

```
adjacent : adjacency list
visited : set containing all of the visited vertices
predecessor : array containing the index of the parent vertex in the traversal
S : stack of vertices, initialized to be empty
u : starting vertex
v: ending vertex

// Starting depth first search:
depthFirstSearch(u, v):
  S.push(u)

  while (!S.isEmpty()):
    current = S.pop()

    if (current == v):
      break

    for each vertex x in adjacent[current]:
      if (!visited.contains(x)):
        predecessor[x] = current
        visited.add(x)
        S.push(x)

// Finding the path from u to v:
P : stack of vertices, initialized to be empty

for (i = v; i != u; i = predecessor[i]):
  P.push(i)

// Thus iterating over P gives us the path from u to v.
```

### Properties

One of the properties of depth first search is that the algorithm runs in linear time, $O(|V|+|E|)$
time and uses $O(|V|)$ space. We can see this because depth first search will reach every vertex at
most one (assuming we have a connected graph), since before exploring the vertex we add it to the
set `visited`, and will never visit it again. At each vertex, we iterate over its adjacency list, 
that is, we iterate over all outgoing edges from that vertex. Intuitively, we must have double 
counted every edge, and thus considered $2|E|$ edges. 

Since the set `visited` and the array `predecessor` can contain at most $|V|$ vertices, it uses 
$O(|V|)$ space. But since the recursion stack can get at most $|V|$ deep, or equivalently the stack
`S` can have at most $|V|$ elements, it uses $O(|V|)$ space. Thus, depth first search uses $O(|V|)$
auxiliary space.

### Implementation (using Recursion)

##### Java

<script src="https://gist.github.com/eliucs/362dc1f9a986ee83094823f1e9a041ac.js"></script>

### Implementation (using Stack)

##### Java

<script src="https://gist.github.com/eliucs/9988a7547c8f2191c29fa8d205ef1fd9.js"></script>

### Time Complexity

```
| Algorithm          | time complexity | space complexity |
|--------------------|-----------------|------------------|
| depth first search | O(|V|+|E|)      | O(|V|)           |
```
