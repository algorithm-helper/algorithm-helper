# Recursion

Recursive functions are functions that call themselves in their function bodies. In the context of
functional programming, recursion is the primary mechanism to be able to do the same computations 
as their imperative counterparts. Typically, we want to have a base case which returns a value, that 
is guaranteed to occur, and reduce the problem space each level of the recursion. Infinite recursion
happens when the function never meets the base case, and thus never terminates. (Technically, it 
will terminate because it causes stack overflow, which is when we exhaust the call stack.)

However, there are cases where we do not know if the function will terminate (or predict in how
many steps it will terminate). We will look at two examples, the Fibonacci sequence, and the Collatz
conjecture.

### Example (Fibonacci)

The Fibonacci sequence is the classic example for recursion, which is the integer sequence:

$1, 1, 2, 3, 5, 8, 13, 21 ... $

Such that it begins initially with $1$ and $1$, and every term is the sum of the previous two terms.
Computing this sequence imperatively involves using two variables that track the last two terms, and
possibly using a while loop for each iteration of computing the next term in the sequence.

Recursively, we can do the computation a lot more naturally (albeit taking exponential time). We 
have a function `fibonacci` that takes in one argument `n`, denoting the `n`-th Fibonacci number
to compute. The base case for `n=0` and `n=1` is `1`, that is, the 0th and 1st numbers in the 
sequence are defined to be 1. Then we can recursively apply `fibonacci` by the sum 
`fibonacci(n-1) + fibonacci(n-2)`, that is, the sum of the results of calling `fibonacci` on the 
previous two terms:

```
const fibonacci = (n) => {
    if (n == 0 || n == 1)
        return 1;
    return fibonacci(n-1) + fibonacci(n-2);
};
```

Then for finding the 5th Fibonacci number, for example:

```
const fibonacci = (n) => {
    if (n == 0 || n == 1)
        return 1;
    return fibonacci(n-1) + fibonacci(n-2);
};

console.log(fibonacci(5));
```

We get the expected output:

```
8
```

### Example (Collatz)

The Collatz conjecture is a conjecture that for the following sequence: given a number $n$, the 
next term is computed such that if $n$ is even then the next term is $n/2$, and if $n$ is odd then 
the next term is $3n+1$, that for any starting value of $n$, the sequence will always end with $1$.
This is an unsolved problem in mathematics, are more can be read about this topic 
[here](https://en.wikipedia.org/wiki/Collatz_conjecture).

It is easy to reformulate this problem as a recursive function `collatz`, which takes in an argument
`n`, and has the base case to return `0` when `n=1`. We get the recursive result of 
`1 + collatz(n/2)` when the `n` is even, and `1 + collatz(3*n+1)` when `n` is odd. We are not 
necessarily reducing the problem space each time. Then the result of `collatz(n)` will count the 
number of times steps to get to `1`:

```
const collatz = (n) => {
    if (n == 1)
        return 0;
    else if (n % 2 == 0)
        return 1 + collatz(n/2);
    return 1 + collatz(3*n+1);
};
```

Then for finding `collatz(27)`, for example:

```
const collatz = (n) => {
    if (n == 1)
        return 0;
    else if (n % 2 == 0)
        return 1 + collatz(n/2);
    return 1 + collatz(3*n+1);
};

console.log(collatz(27));
```

We get the surprisingly high result:

```
111
```

Where during the sequence, the `n` becomes as high as `9232`.
