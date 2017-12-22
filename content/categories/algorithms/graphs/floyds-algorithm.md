# Floyd's Algorithm

Floyd's Algorithm is an algorithm for finding a cycle in a Linked List or
iterated function, and in the notes, we will consider the Linked List case for
better visualization.

The main idea behind Floyd's Algorithm is to only use two pointers,
conventionally named the "tortoise" and the "hare", that traverse through the
Linked List at different speeds. The tortoise moves one Node at a time, and the
hare moves two Nodes at a time. Once the pointers meet at the same Node, then
we bring the tortoise pointer back to the start of the Linked List, and only
move each pointer once Node at a time, keeping track of how many Nodes have
been traverse from the hare in a counter conventionally denoted as lambda.
Then once the pointers meet once more, we keep track of this Node, which is
the start of the cycle, in a variable conventionally denoted as mu.

Then we can return lambda and mu, the length of the cycle and the starting
Node of the cycle, respectively.

Pseudocode:

```
L : Linked List of Nodes containing a cycle
s : starting Node in L

floydsAlgorithm(s):
  t : pointer "tortoise"
  h : pointer "hare"

  t = s.next
  h = s.next.next

  while (t != h):
    t = t.next

    if h.next == null:
      return (null, null) // The hare reached the end of the Linked List already
                          // so there does not exist a cycle
    h = h.next.next

  // Find mu:
  mu : Node at start of the cycle
  t = s
  mu = 0
  while (t != h):
    t = t.next
    h = h.next
    mu++

  // Find lambda:
  lambda : length of the cycle
  lambda = 1
  h = t.next
  while (t != h):
    h = h.next
    lambda++

  return (lambda, mu)
```

The intuition behind why this algorithm works is that if we were to consider
a Linked List where there does not exist a cycle, then because the hare
traverses twice as many Nodes as the tortoise, then it will reach the end of
the Linked List before the tortoise. When the next Node to the Node at hare is
null in the first part of the algorithm, that signals to us that there does not
exist a cycle.

If there does exist a cycle, we are guaranteed that at some point, the tortoise
and the hare will meet inside the cycle.

We can see why lambda and mu are determined correctly from mathematically
analyzing the positions and distances travelled by the tortoise and the hare:

```
d1 : Distance tortoise travelled
d2 : Distance hare travelled
a : Number of Nodes before the start of the cycle
b : Position relative to mu, where the tortoise and the hare meet in the
    cycle
lambda : Length of the cycle

d1 = a + m * lambda + b
d2 = a + n * lambda + b

Where m, n are integers and n >= m. This shows that by the time the tortoise and
the hare meet inside the cycle, since the hare is faster, it must have travelled
more or an equal number of times around the cycle compared to the tortoise.

Then since the hare travels twice the distance as the tortoise:

2 * d1 = d2
2 (a + m * lambda + b) = a + n * lambda + b
a + 2m * lambda + b = n * lambda
a + b = (n - 2m) * lambda

Thus, the length of the path from the beginning of the Linked List to the point
they meet inside the cycle is an integer multiple of the length of the cycle.

Then the tortoise is moved back to the start of the Linked List. By the time it
traverses to the start of the cycle, it has travelled a Nodes, by definition.

Since the hare now also moves one Node at a time, it must have also moved
by a Nodes, but since it started at the b-th position relative to mu, the
number of Nodes the hare has travelled is offset by b, and thus the number of
Nodes the hare has travelled relative to mu is (a + b).

By the equation above, since (a + b) is an integer multiple of the cycle, it
follows that the hare would also be at the starting position of the cycle
after (a + b) Node traversals.
```

At the third part of the algorithm, it is straightforward to find the length of
the cycle, lambda. Since both the tortoise and the hare are positioned at the
start of the cycle, but only the hare is moving one Node at a time, incrementing
the counter lambda by 1 each time, by the time the hare is at the same position
as the tortoise again, it would have travelled the length of the cycle exactly
once, and thus we have the correct value for lambda.

Determining the time complexity of this algorithm is also straightforward.
From the analysis above, it is clear that the tortoise travels to the starting
position of the cycle, mu, a constant number of times (twice). Then at the
cycle itself, both the tortoise and the hare travel around the cycle n *
lambda number of times at most (since n > m, we take n as an upper bound). Thus
this algorithm runs in O(mu + lambda) time.

Since we simply need a constant number of pointers (two), tortoise and hare,
this algorithm uses O(1) space.  

### Implementation

##### Java

View the source code here.

```
```

### Time Complexity

