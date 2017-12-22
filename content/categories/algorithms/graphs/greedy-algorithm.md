# Greedy Algorithm

A Greedy Algorithm is an algorithm that always makes locally optimal choices at
each stage of the algorithm, with the hope that this overall results in a
globally optimal solution.

Definition from Wikipedia:

[Greedy Algorithm](https://en.wikipedia.org/wiki/Greedy_algorithm) - an
algorithmic paradigm that follows the problem solving heuristic of making the
locally optimal choice at each stage with the hope of finding a global optimum.
In many problems, a greedy strategy does not in general produce an optimal
solution, but nonetheless a greedy heuristic may yield locally optimal solutions
that approximate a global optimal solution in a reasonable time.

In many problems, greedy algorithms can fail to find globally optimal solutions
because the algorithm is "short-sighted". An obvious example of this maybe
finding the shortest path from one Vertex x to another Vertex y, such that we
only take the next minimum weight adjacent Edge. It is trivial to come up with
an example such that this strategy would produce the incorrect path, no path
at all, or get stuck in an infinite loop.

For example:

```
// Suppose we had the following Graph:

            (1)-> 3 -(100)-> 4
          /                  |
1 -(1)-> 2                 (100)
          \                  v
            (2)-> 5 -(1)->   6
```

If we are trying to get the shortest path from Vertex 1 to Vertex 6, if we use
a greedy approach, then we would take the path 1 -> 2 -> 3 -> 4 -> 6 but this
would have a total weight of 1 + 1 + 100 + 100 = 202 to get to Vertex 6, while
the actual shortest path is 1 -> 2 -> 5 -> 6, with a total weight of 1 + 2 + 1
= 3.

Greedy algorithms are often a good way to approximate optimal solutions
or derive intuition for finding another algorithm that may be more involved, but
optimal. However, in many problems it can be proven that a greedy approach can
result in a globally optimal solution.
