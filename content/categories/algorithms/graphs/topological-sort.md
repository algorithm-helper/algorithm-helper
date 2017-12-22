# Topological Sort

Topological Sort, in the context of directed Graphs, is a linear ordering of
Vertices such that for every directed Edge consisting of Vertices u and v, u
comes before v. Often there is not necessarily a unique ordering to the
Vertices. A topological ordering can only exist if there are no cycles in the
Graph, meaning that the Graph must be a Directed Acyclic Graph (DAG), and a DAG
has at least one topological ordering.

For example:

```
// Suppose we had the following Graph:

3    4 -> 9
^    ^
|    |
1 -> 2 -> 5 -> 6 -> 7
```

Here we have no cycles, so this is a DAG, and a topological ordering exists.
One possible ordering could be if we start from 1 and order by depth: [1, 3, 2,
4, 5, 9, 6, 7]. One application of Topological Sort is the scheduling of tasks
that have dependencies on previous tasks completed.


