# Ford-Fulkerson Algorithm

The Ford-Fulkerson algorithm is an algorithm used to compute the maximum flow (and therefore
minimum cut) of a flow network. The main approach is find what are called augmenting paths. An
augmenting path is one that starts from the source vertex $s$ and ends at the target vertex $t$ such
that we can do at least one of two operations:

- Increase flow on a forward edge:
    - For edges that direct forward (i.e. outgoing edge to the given vertex), we are able to 
    increase the flow. This operation is fairly straightforward, if for example we have a path 
    that can support $5$ units of flow, but only $4$ are going through, we can increase it by $1$.
- Decrease flow on a backward edge:
    - For edges that direct backwards (i.e. incoming edge to the given vertex), we can consider 
    the back vertex to subtract flow from that edge and increase the flow along one of its other
    outgoing edges (assuming that it is possible) by the same amount.

The main approach to the Ford-Fulkerson algorithm is that starting with $0$ flow for all edges, we
continuously increase flow using augmenting paths, until we are not able to do so anymore, and thus
we have maximum flow.

### Visualization

The following are visualizations of these two operations that may be taken. Suppose that we start 
off with the following flow network, we initialize the flow of all edges to be $0$:

<img src="https://firebasestorage.googleapis.com/v0/b/algorithm-helper-storage.appspot.com/o/img%2Falgorithms%2Fgraphs%2Fford-fulkerson-algorithm-1.png?alt=media&token=49ad6893-4f08-4f59-8ef0-6f7be7024a95" alt="Ford-Fulkerson Algorithm 1" class="img-fluid">

Clearly, we can forward augment the flow along the following edges to be equal to $3$, and now the
target recieves a total flow of $3$:

<img src="https://firebasestorage.googleapis.com/v0/b/algorithm-helper-storage.appspot.com/o/img%2Falgorithms%2Fgraphs%2Fford-fulkerson-algorithm-2.png?alt=media&token=c952e74e-cc1a-4474-b9c6-18d5f956962e" alt="Ford-Fulkerson Algorithm 2" class="img-fluid">

We can forward augment the flow along the middle two edges to be $5$, but that involves decreasing
flow along the backward edge which has $3$ flow to be $0$, but then this allows that flow to go 
through the bottom set of edges. Now the target receives a total flow of $8$:

<img src="https://firebasestorage.googleapis.com/v0/b/algorithm-helper-storage.appspot.com/o/img%2Falgorithms%2Fgraphs%2Fford-fulkerson-algorithm-3.png?alt=media&token=16e60bba-961c-4041-9160-187b087dd651" alt="Ford-Fulkerson Algorithm 3" class="img-fluid">

We can forward augment the flow along the top set of edges to be $5$, and now the target recieves
a total flow of $13$:

<img src="https://firebasestorage.googleapis.com/v0/b/algorithm-helper-storage.appspot.com/o/img%2Falgorithms%2Fgraphs%2Fford-fulkerson-algorithm-4.png?alt=media&token=271f23d2-bfe5-40c5-b7cc-29eba91dd59c" alt="Ford-Fulkerson Algorithm 4" class="img-fluid">

Along the bottom set of edges, we can still forward augment the flow from $3$ to $5$, without 
affecting any other flow, and now the target recieves a total flow of $15$. Clearly, this flow 
network has recieved the maximum amount of flow, and we know this because the target can only take
in a maximum flow of $15$ from its incoming edges:

<img src="https://firebasestorage.googleapis.com/v0/b/algorithm-helper-storage.appspot.com/o/img%2Falgorithms%2Fgraphs%2Fford-fulkerson-algorithm-5.png?alt=media&token=b1316bd6-deb8-4cbf-9bc7-18249bd993a6" alt="Ford-Fulkerson Algorithm 5" class="img-fluid">

Although the example was simple, it demonstrates a powerful idea from which we can compute the 
maximum flow, and hence the minimum cut.

### Pseudocode

The following is pseudocode for the Ford-Fulkerson algorithm:

```
G = (V, E) : the graph
flow : mapping of edges to flow

for every edge e in E:
    flow[e] = 0

while G has an augmenting path P:
    increase flow on P
```
