# Edge Relaxation

Edge relaxation refers to the process of updating the known shortest path from some starting 
vertex $u$ to another vertex $v$. We maintain an map $dist$ that maps all vertices $v$ to the 
shortest known path from $u$ to $v$. Then when we relax an edge $(v, w)$:

- If $dist(w) \gt dist(v) + weight(v, w)$
    Then we have that we have a shorter path to $w$ through $v$. This is because we are 
    guaranteed at that point in the algorithm that $dist(v)$ is the shortest path to $v$, so by
    taking the same path to $v$ then edge $(v, w)$, we get a shorter path to $w$.

### Visualization

The following visualizes edge relaxation:

<img src="https://firebasestorage.googleapis.com/v0/b/algorithm-helper-storage.appspot.com/o/img%2Falgorithms%2Fgraphs%2Fedge-relaxation.png?alt=media&token=4a075957-d6b0-4092-9274-eab4a9f574af" alt="Edge Relaxation" class="img-fluid">

As described above, if $dist(w) \gt dist(v) + weight(v, w)$, we can clearly just take the path to $w$
through the shortest path to $v$.

### Observations

There are some interesting and important properties we would like to prove for edge relaxation.

(1) A subpath of the shortest path is a shortest path.

Let the starting vertex be $u$. Suppose that we had a shortest path $P$ from $u$ to $v$, and a 
subpath from $u$ to a vertex $w$, which lies on $P$. Suppose there were a shorter path from $u$ to 
$w$, say through vertex $x$, then we can always take the path from $u$ to $x$, $x$ to $w$, $w$ to
$v$ to get a shorter path from $u$ to $v$, but this is a contradiction.

(2) Continuously edge relaxation will result in finding the shortest paths to all vertices.

Since there are a finite number of edges to relax, this process will stop when 
$dist(w) \leq dist(v) + weight(v, w)$ for all vertices $w$.
