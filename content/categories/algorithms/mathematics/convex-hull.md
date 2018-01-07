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

<img src="https://i.imgur.com/urHBBp5.png" alt="Convex Hull 1" width="400" height="300">

Then the convex hull is:

<img src="https://i.imgur.com/iLNoZiq.png" alt="Convex Hull 1" width="400" height="300">
