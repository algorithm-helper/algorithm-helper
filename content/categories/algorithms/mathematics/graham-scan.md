# Graham Scan

The Graham scan method is an algorithm for finding the convex hull of a set of points on a 
Euclidean plane. The approach to this algorithm is that we start from the lowest point, and we
want to look at points in order of their polar angle to the lowest point, and using a stack, only
include points into the convex hull that make a left turn.

### Pseudocode

The following is the pseudocode for Graham scan:

```
S : stack of points initialized to be empty (convex hull)
p[0] : point with lowest y-coordinate
L : list of points sorted in ascending order by polar angle to P

S.push(p[0])

for each point p[i] in L:
    if adding p[i] is a counter clockwise turn:
        S.push(p[i])
    if adding p[i] is a clockwise turn:
        S.pop() until adding p[i] is a counter clockwise turn
        S.push(p[i])
```

### Point

We will use the following class for the 2D points:

<script src="https://gist.github.com/eliucs/5258158da6b4dd27a0274f50fbe7c0e2.js"></script>

### Implementation

##### Java

<script src="https://gist.github.com/eliucs/12e5ff8c4f81a7667e24aa42b00a2f61.js"></script>

### Time Complexity

Finding the point with the lowest y-coordinate involves iterating through $N$ points and choosing 
the one with the minimum `y`, which takes $O(N)$ time. Sorting the points by polar angle to the 
point with the lowest y-coordinate takes $O(NlogN)$ since we use any regular comparison sort 
algorithm. When we add points to the stack, we never add or remove a point more than once, and thus
at most we need to `push` or `pop` (both $O(1)$ operations) at most $N$ times, taking $O(N)$. Thus
the bottleneck is the sorting, and thus this algorithm runs in $O(NlogN)$ time. 

The stack can be at most $N$ elements in size (if all of the points were on a circle, and thus all
part of the convex hull). Thus we require $O(N)$ space.

```
| Algorithm   | time complexity | space complexity |
|-------------|-----------------|------------------|
| graham scan | O(NlogN)        | O(N)             |
```
