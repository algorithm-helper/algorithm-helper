# Brent's Algorithm


Brent's Algorithm is an algorithm for finding a cycle in a Linked List or
iterated function, and in the notes, we will consider the Linked List case for
better visualization. It speeds up Floyd's Algorithm by taking advantage of
the exponential search.

The main idea behind Brent's Algorithm is to find the smallest power of 2 such
that it is larger than both lambda and mu, say 2^i, and the hare travels one
Node at a time, and the tortoise simply "catches up" to the hare by having its
pointer "jump" to the position of the hare at every subsequent power of 2. Then
we start counting the number of Nodes starting from lambda = 0 until the next
power of 2, 2^(i+1). But since the difference 2^(i+1) - 2^i is larger than
lambda, when the hare is at the same position as the tortoise again, it would
have travelled a distance of lambda, and so the value of lambda is correct.
Clearly, we are able to obtain lambda directly.

Then we bring both the tortoise and the hare pointers back to the beginning of
the Linked List, and move the hare lambda Nodes in front of the tortoise. Then
we set mu = 0, and start moving the tortoise and the hare pointers one Node at
a time, incrementing mu by 1 each time, until the tortoise and the hare meet
again.

Pseudocode:

```
L : Linked List of Nodes containing a cycle
s : starting Node in L

brentsAlgorithm(s):
  t : pointer "tortoise"
  h : pointer "hare"

  power = 1
  lambda = 1
  t = s
  h = s.next

  while (t != h):
    if h.next == null:
      return (null, null) // The hare reached the end of the Linked List already
                          // so there does not exist a cycle

    if (power == lambda):
      t = h
      power *= 2
      lambda = 0

    h = h.next
    lambda++  

  // Find mu:
  mu : Node at start of the cycle
  mu = 0
  t = s
  h = s

  for (i in 0 to lambda):
      h = h.next


  while (t != h):
    t = t.next
    h = h.next
    mu++

  return (lambda, mu)
```

The intuition behind this algorithm is to bring the tortoise and the hare
pointer inside the cycle as quickly as possible. The problem with Floyd's
Algorithm is that we are "waiting" unnecessarily on the tortoise pointer to
reach the cycle as it moves one Node at a time. By finding the smallest power
of 2, 2^i, that is larger than both lambda and mu. 2^i > mu guarantees us that
by the time we start counting for lambda, both the tortoise and the hare pointer
have passed the starting position mu and are inside the cycle. 2^i > lambda
guarantees us that counting starting from 0 gives us the correct value of
lambda because by the time we reach the next power of 2 at 2^(i+1), somewhere
between 2^i and 2^(i+1) we would have counted to lambda inside the cycle, since
that difference, 2^(i+1) - 2^i > lambda.

Then, finding mu is straightforward, and similar analysis to Floyd's Algorithm
above can we done to show that the second part of Brent's Algorithm gives us the
correct starting position of the cycle, and thus the correct value of mu.

We can determine the time complexity of Brent's Algorithm by analyzing both
parts of the algorithm separately, finding lambda and finding mu. The hare
pointer must at least traverse mu until it enters the cycle. But then inside the
cycle, it travels lambda until it reaches the hare pointer again. Thus this
takes O(mu + lambda) time.

In the second part, the hare pointer first travels distance lambda. Then the
tortoise travels distance mu, since mathematically that is the point where both
the tortoise and the hare are at the starting position of the cycle. In that
time, the hare must have also travelled distance mu. Thus the hare travels
a distance total of mu + lambda exactly. Thus overall, this algorithm runs in
O(mu + lambda) time.

Likewise with Floyd's Algorithm, we use a constant number of pointers (two) for
tortoise and hare, and a single variable for storing the power of 2. Thus this
algorithm uses O(1) space.

### Implementation

##### Java

View the source code here.

### Time Complexity

