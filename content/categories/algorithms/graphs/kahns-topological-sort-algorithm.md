# Kahn's Topological Sort Algorithm

Kahn's Topological Sort Algorithm is an algorithm for finding the topological
ordering of a Graph, and the main idea is that we maintain a Stack or a Queue
and start off by adding all Vertices with no incoming Edges, then we run either
Depth First Search (with a Stack) or Breadth First Search (with a Queue) with
the modification that we delete Edges to adjacent Vertices, and only process
them when they have no more incoming Edges to them.

Pseudocode (with Stack):

```
V : Set of all Vertices
adjacent : Adjacency List
S : Stack of Vertices, initialized to be empty

kahnTopologicalSort(V):
  result : Queue of Vertices, initialized to be empty

  for each Vertex x in V:
    if x has no incoming edges:
      S.push(x)

  while (!S.isEmpty()):
    current = S.pop()
    result.enqueue(current)

    for each Vertex x in adjacent[current]:
      deleteEdge(current, x)

      if (x does not have any more incoming edges):
        S.push(x)

  return result
```

Unlike the method with the Queue, we do not need to maintain the Set visited
because we are only concerned with exploring Vertices as deep as possible which
can be added to the result for a valid topological ordering. When we delete
the Edge going from the current Vertex to each adjacent Vertex x, then
intuitively if x still has incoming Edges, say from some other Vertex y, then it
follows that we cannot add x to the result because y must go before x. But if x
does not have anymore incoming Edges, then we can add it to the result.

Pseudocode (with Queue):

```
V : Set of all Vertices
adjacent : Adjacency List
visited : Set containing all of the visited Vertices
Q : Queue of Vertices, initialized to be empty

kahnsTopologicalSort(V):
  result : Queue of Vertices, initialized to be empty

  for each Vertex x in V:
    if x has no incoming edges:
      Q.enqueue(x)

  while (!Q.isEmpty()):
    current = Q.dequeue()
    result.enqueue(current)

    for each Vertex x in adjacent[current]:
      if (!visited.contains(x)):
        visited.add(x)
        Q.enqueue(x)

  return result
```

The Queue method is very similar to regular Breadth First Search, and unlike
the Stack method, we do not need to delete Edges or check if adjacent Vertices
still have incoming Edges, simply because the Breath First Search mechanism
already guarantees that by the time we get to explore a certain Vertex x, all
of the Vertices from its incoming Edges have already been visited. We see this
intuitively because by definition of Breadth First Search, we process Vertices
on the same level before going deeper into adjacent Vertices. When we get to a
particular Vertex x, if there is a Vertex y that is from incoming Edge to x,
y must come before x because otherwise we would have processed a Vertex from
a deeper level before a Vertex from a higher level.

Note that while both methods produce valid topological orderings for the Graph,
they can be vastly different. This is because in the case of a DAG, if we
consider a sequence of Vertices from one branch B, say 1 -> 2 -> 3 -> 4, and
another sequence of Vertices from another branch C but on the same level of the
Graph as Vertex 1, say 1 -> 5 -> 6 -> 7, then it makes no difference if we
process B depth-first before processing C depth-first because they
efficiently do not make a difference, by definition of a topological ordering.
Likewise, if we process the branches B and C breadth-first, then it also does
not matter that we are arbitrarily alternating between adding the Vertex from B
or adding the Vertex from C to the final topological ordering.

Determining the time complexity of this algorithm is straightforward and is the
same with both Stack and Queue. In both, we are ultimately doing Depth-First
Search and Breadth-First Search respectively. Since it is a DAG, even in the
case of a disconnected graphs, all of the separate components are still
processed because we add all of the Vertices with no incoming Edges to the final
result, and since each component is a DAG itself, there must be at least one
Vertex in that component that does not have an incoming Edge.

We process every Vertex at most once, since in the Stack method we delete
incoming Edges and this guarantees that by the time we process that Vertex,
it is the first time, since prior times it still had incoming Edges, and were
not processed. And in the Queue method, since we process all of the Vertices
at the same level first before exploring deeper Vertices, it also guarantees
tht by the time we process that Vertex, we must have processed all of the
Vertices from incoming Edges already. In both cases, we process V Vertices.

Intuitively, since we process all of the adjacent Edges at most once for each
Vertex, in total, we would have processed all E Edges once. Thus, this
algorithm runs in O(V + E) time.

Since for the Stack or Queue we use to control which next Vertex to process
can only be at most V large, thus the space complexity is O(V).

### Implementation 

##### Java

View the source code here.

```
```

### Time Complexity

