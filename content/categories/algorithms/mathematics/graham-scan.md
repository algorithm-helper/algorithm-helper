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

```
package com.algorithmhelper.algorithms.mathematics;

import java.util.Comparator;

public class Point implements Comparable<Point> {

    private double x;
    private double y;

    /**
     * Initializes a Point, with coordinates (x, y).
     *
     * @param x
     * @param y
     */
    public Point(double x, double y) {
        this.x = x;
        this.y = y;
    }

    /**
     * Returns the x coordinate of this Point.
     *
     * @return x
     */
    public double getX() {
        return x;
    }

    /**
     * Returns the y coordinate of this Point.
     *
     * @return y
     */
    public double getY() {
        return y;
    }

    /**
     * Returns the polar radius of this Point.
     *
     * @return the polar radius of this Point
     */
    public double getR() {
        return Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
    }

    /**
     * Returns true if a to b to c is a counterclockwise turn, false otherwise.
     *
     * @param a, the first Point
     * @param b, the second point
     * @param c, the third Point
     * @return true if a to b to c is a counterclockwise turn, false otherwise
     */
    public static int ccw(Point a, Point b, Point c) {
        double area = (b.x - a.x) * (c.y - a.y) - (b.y - a.y) * (c.x-a.x);

        if (area < 0)
            return -1;
        else if (area > 0)
            return 1;
        return  0;
    }

    /**
     * Returns a Comparator for the polar order between Point objects with respect to this
     * Point.
     *
     * @return Comparator for the polar order between Point objects with respect to this
     *         Point
     */
    public Comparator<Point> getPolarOrder() {
        return new Comparator<Point>() {
            @Override
            public int compare(Point q1, Point q2) {
                double dx1 = q1.x - x;
                double dy1 = q1.y - y;
                double dx2 = q2.x - x;
                double dy2 = q2.y - y;

                if (dy1 >= 0 && dy2 < 0)
                    return -1;
                else if (dy2 >= 0 && dy1 < 0)
                    return 1;
                else if (dy1 == 0 && dy2 == 0) {
                    if (dx1 >= 0 && dx2 < 0)
                        return -1;
                    else if (dx2 >= 0 && dx1 < 0)
                        return 1;
                    else
                        return  0;
                }
                else return -ccw(Point.this, q1, q2);
            }
        };
    }

    /**
     * Compares this Point to that Point.
     *
     * @param that, the other Point
     * @return the result of the comparison
     */
    public int compareTo(Point that) {
        if (this.y < that.y)
            return -1;
        if (this.y > that.y)
            return 1;
        if (this.x < that.x)
            return -1;
        if (this.x > that.x)
            return 1;
        return 0;
    }
}
```

### Implementation

##### Java

```
package com.algorithmhelper.algorithms.mathematics;

import com.algorithmhelper.datastructures.interfaces.Stack;
import com.algorithmhelper.datastructures.lists.StackDynamicArray;
import java.util.Arrays;

public class GrahamScan {

    /**
     * Computes and returns an Iterable to the convex hull.
     *
     * @param points, the array of Point objects
     * @return an Iterable to the convex hull
     */
    public Iterable<Point> convexHull(Point[] points) {
        if (points == null || points.length == 0)
            throw new IllegalArgumentException("convexHull is null array points");

        Arrays.sort(points);
        Arrays.sort(points, 1, points.length, points[0].getPolarOrder());

        Stack<Point> stack = new StackDynamicArray<>();
        stack.push(points[0]);

        int p;
        for (p = 1; p < points.length; p++) {
            if (!points[0].equals(points[p]))
                break;
        }

        if (p == points.length)
            throw new RuntimeException("cannot compute convex hull, all points are equal");

        int pNotCollinear;
        for (pNotCollinear = p+1; pNotCollinear < points.length; pNotCollinear++) {
            if (Point.ccw(points[0], points[p], points[pNotCollinear]) != 0)
                break;
        }
        stack.push(points[pNotCollinear-1]);

        for (int i = pNotCollinear; i < points.length; i++) {
            Point current = stack.pop();

            while (Point.ccw(stack.peek(), current, points[i]) <= 0)
                current = stack.pop();

            stack.push(current);
            stack.push(points[i]);
        }

        return stack;
    }
}
```

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
