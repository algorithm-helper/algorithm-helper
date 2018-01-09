# Greedy Algorithm

A greedy algorithm is an algorthm that always makes locally optimal choices at each stage of the 
algorithm, with the hope that this overall results in a globallly optimal solution. 

From Wikipedia:

> [Greedy Algorithm](https://en.wikipedia.org/wiki/Greedy_algorithm) - an algorithmic paradigm that 
follows the problem solving heuristic of making the locally optimal choice at each stage with the 
hope of finding a global optimum. In many problems, a greedy strategy does not in general produce an 
optimal solution, but nonetheless a greedy heuristic may yield locally optimal solutions that 
approximate a global optimal solution in a reasonable time.

### Visualization

In many problems, greedy algorithms can fail to find globally optimal solutions because the 
algorithm is "short-sighted". An example of this may be finding the shortest path from one vertex 
$u$ to another vertex $v$, such that we only take the next minimum weight adjacent edge.

For example:

<img src="https://firebasestorage.googleapis.com/v0/b/algorithm-helper-storage.appspot.com/o/img%2Falgorithms%2Fgraphs%2Fgreedy-shortest-path.png?alt=media&token=5f61667d-04d6-4c1a-9ad9-901e8818a8dc" alt="Greedy Shortest Path" class="img-fluid">

If we are trying to get the shortest path from vertex $1$ to vertex $6$, if we use a greedy approach, 
then we would take the path $1 \rightarrow 2 \rightarrow 3 \rightarrow 4 \rightarrow 6$, but this would have a total weight of 
$1 + 1 + 100 + 100 = 202$ to get to vertex $6$, while the actual shortest path is 
$1 \rightarrow 2 \rightarrow 5 \rightarrow 6$, with a total weight of $1 + 2 + 1 = 3$. 

Greedy algorithms are often a good way to approximate optimal solutions or derive intuition for
finding another algorithm that may be more involved, but optimal. However, in many problems, such 
as with minimum spanning trees, a greedy approach proves to result in a globally optimal solution.
