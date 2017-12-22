# Cycle Detection

Cycle Finding, also called Cycle Detection, is the process of finding a cycle
in a given Linked List or an iterated function, which is a function obtained by
composing another function to itself.

Definition from Wikipedia:

[Cycle Finding (Cycle Detection)](https://en.wikipedia.org/wiki/Cycle_detection) -
the algorithmic problem of finding a cycle in a sequence of iterated function
values. For any function f that maps a finite set S to itself, and any initial
value x0 in S, the sequence of iterated function values x0, x1 = f(x0),
x2 = f(x1), ... , xi = f(x(i-1)), ... must eventually use the same value twice:
there must be some pair of distinct indices i and j such that xi = xj. Once this
happens, the sequence must continue periodically, by repeating the same sequence
of values from xi to x(j-1). Cycle detection is the problem of finding i and j,
given f and x0.

The applications of cycle detection are clear, for example, being able to detect
a cycle in a Linked List can prevent some algorithms from going into an infinite
loop. Another example is with pseudorandom number generators. Since pseudorandom
number generators will produce a finite sequence of numbers before repeating
itself, we can apply cycle detection algorithm to the pseudorandom number
generating function to determine at what point does the function complete the
cycle.

For example (Linked List):

```
// Suppose we had the following Linked List:

1 -> 2 -> 3 -> 4 -> 8
^         |
|         v
5 <- 6 <- 7
```

We would want to determine that from Vertex 1, we have the cycle: (1, 2, 3,
7, 5, 6).

For example (iterated function):

```
// Supposed we had a function f that produced the following sequence of values:

1, 2, 3, 4, 5, 6, 4, 5, 6, 4, 5, 6 ...
```

We would want to determine that we have the cycle: (4, 5, 6), since f(4) = 5,
f(5) = 6, f(6) = 4.
