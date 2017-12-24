# Kahn's Topological Sort Algorithm

Kahn's topological sort algorithm is an algorithm for finding the topological ordering of a graph, 
and the main idea is that we maintain a stack or a queue and start off by adding all vertices with 
no incoming edges (i.e. with an indegree of 0) and then run either depth first search (in the case 
of using a stack) or breadth first search (in the case of using a queue) with the modification that
we delete edges to adjacent vertices, and only process them when they have no more incoming edges
to them.

### Using Stack

Pseudocode:

```
V : set of all vertices
adjacent : adjacency list
S : stack of vertices, initialized to be empty

kahnTopologicalSort(V):
  result : queue of vertices, initialized to be empty

  for each vertex x in V:
    if x has no incoming edges:
      S.push(x)

  while (!S.isEmpty()):
    current = S.pop()
    result.enqueue(current)

    for each vertex x in adjacent[current]:
      deleteEdge(current, x)

      if (x does not have any more incoming edges):
        S.push(x)

  return result
```

Unlike the method with the queue, we do not need to maintain the set `visited` because we are only
concered with exploring vertices as deep as possible which can be added to the result for a valid
topological ordering. When we delete the edge going from the current vertex to each adjacent vertex 
`x`, then intuitively, if `x` still has incoming edges, say from some other vertex `y`, then it 
follows that we cannot add `x` to the result because `y` must go before `x`. But if `x` does not
have anymore incoming edges, then we can add it to the result.

### Using Queue

Pseudocode:

```
V : set of all vertices
adjacent : adjacency list
visited : set containing all of the visited vertices
Q : queue of vertices, initialized to be empty

kahnsTopologicalSort(V):
  result : queue of vertices, initialized to be empty

  for each vertex x in V:
    if x has no incoming edges:
      Q.enqueue(x)

  while (!Q.isEmpty()):
    current = Q.dequeue()
    result.enqueue(current)

    for each vertex x in adjacent[current]:
      if (!visited.contains(x)):
        visited.add(x)
        Q.enqueue(x)

  return result
```

The queue method is very similar to regular breadth first search, and unlike the stack method, we
do not need to delete edges or check if adjacent vertices still have incoming edges, simply because
the breadth first search mechanism already guarantees that by the time we get to explore a certain
vertex x, all of the vertices from its incoming edges have already been visited. We see this 
intuitively because by definition of breadth first search, we process vertices on the same level
before going deeper into adjacent vertices. When we get to a particular vertex `x`, if there is a
vertex `y` that is from incoming edge to `x`, `y` must come before `x` because otherwise we would
have processed a vertex from a deeper level before a vertex from a higher level.

### Observations

Note that while both methods produce valid topological orderings for the graph, they can be vastly 
different. This is because in the case of a DAG, if we consider a sequence of vertices from one 
branch `B`, say `1 -> 2 -> 3 -> 4`, and another sequence of vertices from another branch `C` but on 
the same level of the graph as vertex `1`, say `1 -> 5 -> 6 -> 7`, then it makes no difference if we
process `B` depth-first before processing `C` depth-first because they effectively do not make a 
difference, by definition of a topological ordering.

Likewise, if we process the branches `B` and `C` breadth-first, then it also does not matter that we
are arbitrarily alternating between adding the Vertex from `B` or adding the Vertex from `C` to the 
final topological ordering.

Determining the time complexity of this algorithm is straightforward and is the same with both using 
a stack and a queue. We are ultimately doing depth first search and breadth first search, 
respectively. Since it is a DAG, even in the case of a disconnected graph, all of the separate 
components are still processed because we add all of the vertices with no incoming edges to the 
final result, and since each component is a DAG itself, there must be at least one vertex in that
component that does not have an incoming edge.

We process every vertex at most once, since in the stack method we delete incoming edges and thus
guarantees that by the time we process that vertex, it is the first time, since prior times it 
still had incoming edges, and were not processed. And in the queue method, since we process all of 
the vertices at the same level first before exploring deeper vertices, it also guarantees that by
the time we process that vertex, we must have processed all of the vertices from incoming edges
already. In both cases, we process `|V|` vertices.

Intuitively, since we process all of the adjacent edges at most once for each vertex, in total we
would have processed all `|E|` edges once. Thus this algorithm runs in `O(|V|+|E|)` time. Since for
the stack or queue we use to control which next vertex to process can only be at most `|V|` large,
the space complexity is thus `O(|V|)`.

### Implementation (using Stack)

##### Java

View the source code [here](https://github.com/algorithm-helper/implementations/blob/master/java/com/algorithmhelper/algorithms/graphs/KahnsTopologicalSortAlgorithmStack.java).

<script src="https://gist.github.com/eliucs/8e1124d862dd5474b8779bacf9ae9bc7.js"></script>

### Implementation (using Queue)

##### Java

View the source code [here](https://github.com/algorithm-helper/implementations/blob/master/java/com/algorithmhelper/algorithms/graphs/KahnsTopologicalSortAlgorithmQueue.java).

<script src="https://gist.github.com/eliucs/55c75c80db2c213b066b4d9bb75192dc.js"></script>

### Time Complexity

```
| Algorithm                                       | time complexity | space complexity |
|-------------------------------------------------|-----------------|------------------|
| kahn's topological sort algorithm (using stack) | O(|V|+|E|)      | O(|V|)           |
| kahn's topological sort algorithm (using queue) | O(|V|+|E|)      | O(|V|)           |
```
