# Max Flow Min Cut

Max flow/min cut, in the context of flow networks, refer to two different but related problems. We
first recall some useful terminology. Given a flow network graph $G = (V, E)$ with flow function 
$f_F$ and capacity function $f_C$, recall that we choose two different vertices to be the source 
vertex $s$ and the target vertex $t$. The inflow at any vertex is equal to the outflow at that
vertex, except for vertices $s$ and $t$. The outflow at $s$ is equal to the inflow at $t$. 

### Min Cut

A cut is a partition $(A, B)$ of the vertices $V$ with edges of $E$ such that all edges included go 
from a vertex in $A$ to a vertex in $B$, such that $s$ is included in $A$ and $t$ is included in 
$B$. The capacity of a cut is the sum of the capacity of the edges included in that cut. It follows
that the min cut problem is finding a cut in the flow network with the minimum capacity.

### Max Flow

Given the constraint that for any vertex $u$ in the flow network, $f_F(u) \leq f_C(u)$, and that
we have that the inflow at any vertex is equal to the outflow at that vertex, except for vertices 
$s$ and $t$, it follows that the max flow problem is finding the maximum flow that can be 
supported by the flow network.
