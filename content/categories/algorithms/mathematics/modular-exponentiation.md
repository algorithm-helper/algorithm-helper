# Modular Exponentiation

Modular exponentiation refers to exponentiation over a modulus. The operation is to compute the 
remainder $r$ when a base $b$ is raised to exponent $e$, and $b^e$ is divided by a positive integer
$m$, called the modulus:

$r = b^e \; mod \, m$

Modular exponentiation is commonly used in cryptography. The problem with computing it directly is
that with large $b$ and $e$, computing the $b^e$ part becomes slow. 

The main approach is that we first note the following equations are equivalent for integers 
$a, b, c$:

$c \; mod \; m = (a \times b) \; mod \; m$

$c \; mod \; m = ((a \; mod \; m) \times (b \; mod \; m)) \; mod \; m$

Then starting from $c = 1$, we compute $(base \times c) \; mod \; m$, an $e$ number of times to
ultimately end up with the final result.

### Implementation

##### Java

<script src="https://gist.github.com/eliucs/6a14f43d63b617fd8860840ccfed42e3.js"></script>

### Time Complexity

We perform the computation $(base \times c) \; mod \; m$, an $O(1)$ operation, an $e$ amount of 
times, and thus this algorithm runs in $O(e)$ time. However, note that while this is the same time
complexity as computing $b^e$ directly, the multiplication operations themselves are much
smaller, and we should be expecting a much fast computation. Since we simply need a variable 
`result` to keep track of the result at the current iteration, we only need $O(1)$ space.

```
| Algorithm              | time complexity | space complexity |
|------------------------|-----------------|------------------|
| modular exponentiation | O(e)            | O(1)             |
```
