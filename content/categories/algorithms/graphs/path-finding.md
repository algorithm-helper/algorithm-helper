# Path Finding

Path finding, in general, is producing a sequence of edges to get from a starting vertex $u$ to an
ending vertex $v$ such that it is a path (all of the vertices are distinct). 

Generally in path finding, we maintain a set of `explored` vertices and an array of `predecessor`,
which points each vertex to its parent vertex, and start from some starting vertex $u$ and 
continuously exploring its neighbors, adding them to `explored` each time, updating their 
updating their predecessor to be $u$, until we find the ending vertex $v$, or exhaust the search 
possibilities and can conclude that a path does not exist. 

If we do find a path, we maintain a stack, and traverse up the predecessor tree, adding each 
subsequent vertex to the stack until we reach the starting vertex again. Iterating over this stack
gives us the path.

One of the common applications of path finding is finding the shortest path, which in the context
of weighted graphs, is to produce a path of the minimum weight.

We will look at algorithms for undirected and directed graphs, weights graphs where all edge weights
are positive, and weighted graphs but we have the possiblity of negative and zero edge weights 
(and thus an issue arises with negative weight cycles, which hinders the path finding process). 

### Observations

There are some interesting and useful properties of graphs that can be proved using paths. The 
following are a few of those properties (for undirected graphs):

(1) If there exists a walk from vertex $u$ to $v$, then there exists a path from $u$ to $v$.

Let $W = u_0, u_1, ... u_n$ be a walk from vertex $u_0$ to $u_n$. If $W$ has no repeated 
vertices then by definition $W$ is a path. If $W$ has repeated vertices, it follows that somewhere
along the walk, there exists two distinct paths from some $u_i$ to some $u_j$. Delete the edges
off of one of those paths, and repeat this process until $W$ has no repeated vertices. Then $W$ is
a path.

(2) If there exists a path from vertex $u$ to $v$ and $v$ to $w$, then there exists a path from
$u$ to $w$.

<p>
Let $P_1$ be the path from $u$ to $v$, and let $P_2$ be the path from $v$ to $w$, Then there exists 
a walk $W = P_1, P_2$ from $u$ to $w$. Thus by (1), there exists a path from $u$ to $w$.
</p>

(3) Let $G$ be a graph. If there exists a vertex $u$ in $V(G)$ such that for all other vertices $v$
in $V(G)$ there exists a path from $u$ to $v$, then $G$ is connected.

Between any two vertices $x$ and $y$ in $V(G)$, there is a path from $x$ to $u$ and $u$ to $y$, thus
by (2), there is a path from $x$ to $y$. Thus by definition, $G$ is connected.
