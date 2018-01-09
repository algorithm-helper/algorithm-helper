# Convex Hull

A convex hull of a set of points $X$, is a subset of $X$ that forms the smallest convex set that
emcompasses all of the points of $X$. We can think of it as the tightest outer boundary such that
all points of $X$ are contained within the boundary. This set of points can be on a Euclidean plane
(i.e. 2D space) or Euclidean space (i.e. 3D space). 

We want an algorithm such that given a set of pairs $(x, y)$ representing coordinates, we compute
the convex hull, that is, return the subset of these pairs, efficiently. The Graham scan algorithm 
will be able to do so.

### Visualization

Suppose that we have the following set of points on a plane, labelled $0...9$:

<img src="https://firebasestorage.googleapis.com/v0/b/algorithm-helper-storage.appspot.com/o/img%2Falgorithms%2Fmathematics%2Fconvex-hull-1.png?alt=media&token=9b9b1ff6-aefb-4f7d-b422-f0e1530596b2" alt="Convex Hull 1" class="img-fluid">

Then the convex hull is:

<img src="https://firebasestorage.googleapis.com/v0/b/algorithm-helper-storage.appspot.com/o/img%2Falgorithms%2Fmathematics%2Fconvex-hull-2.png?alt=media&token=5b5915e0-e25d-4a9e-9666-0c2cd3dd35a5" alt="Convex Hull 1" class="img-fluid">
