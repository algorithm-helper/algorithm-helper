# Introduction

The topic in this section is mathematics, and these algorithms are concerned with computing the 
greatest common divisor (GCD) of two numbers, multiplying two numbers, approximating roots of 
functions, exponentiation, computing the convex hull, and multiplying two matrices. We will see how 
we can do all of these computations efficiently.

### Terminology

We begin with a list of terminology and definitions that will be useful in this section.

- divides
    - $d$ divides $n$, written as $d | n$ if $\exists q \in \mathbb{Z}$ such that $n = qd$.
- greatest common divisor
    - Also known as the GCD, $gcd(a, b)$ is the largest positive integer that divides both $a$ and
    $b$.
- standard (long) multiplication
    - The basic way of multiplication taught in schools.
- multiplication algorithm
    - An algorithm for multiplication that runs in faster than $O(N^2)$ time, where $N$ is the 
    number of digits of the longest number being multiplied.
- roots of function
    - Also known as the zeroes, for a function $f$, they are the values $x$ in the domain of $f$ 
    such that $f(x) = 0$.
- exponentiation
    - Given base $b$ and exponent $a$, $b^a$ represents $b$ multiplied by itself $a$ times.
- Euclidean plane
    - Two-dimensional space, where every point in the plane is determine by a coordinate $(x, y)$.
- Euclidean space
    - Three-dimensional space, where every point in the space is determine by a coordinate 
    $(x, y, z)$.
- convex hull
    - Given a set of points $X$, the convex hull is the subset of those points that forms the 
    smallest convex set, or boundary, that emcompasses all the points of $X$.
