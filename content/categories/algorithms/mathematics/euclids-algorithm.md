# Euclid's Algorithm

Euclid's algorithm, also known as the Euclidean algorithm, is an algorithm used to compute the 
greatest common divisor (GCD) of two numbers $a$ and $b$, which is the largest positive integer that 
divides both $a$ and $b$. 

We first start off with the following lemmas:
- $gcd(a, b) = gcd(b, a)$
    - This is true since a common divisor of $a$ and $b$ is a common divisor of $b$ and $a$.
- if $a > 0$ and $a|b$ then $gcd(a, b) = a$
    - This is true since if $a$ divides $b$, then $a$ is a common divisor of $a$ and $b$. $a$ is the
    largest divisor of itself, and thus it is is the greatest common divisor of $a$ and $b$.
- if $a \equiv c\;mod\,b$ then $gcd(a, b) = gcd(c, b)$. 
    - The common divisors of $a$ and $b$ are the common divisors of $c$ and $b$, and thus they have
    the same greatest common divisor.

Then to compute $gcd(a, b)$, say that $a$ is the larger of the two, and divide $a$ by $b$. Then we 
have:

$a = bq_1 + r_1$, where $q_1, r_1 \in \mathbb{Z}$

Thus we have $gcd(a, b) = gcd(b, r_1)$. We divide $b$ by $r_1$, then we have:

$b = r_1q_2 + r_2$, where $q_2, r_2 \in \mathbb{Z}$

Thus we have $gcd(b, r_1) = gcd(r_1, r_2)$. We divide $r_1$ by $r_2$, then we have:

$r_1 = r_2q_3 + r_3$, where $q_3, r_3 \in \mathbb{Z}$

And so on. Since $r_1 > r_2 > r_3 > ... $ we will eventually get to some $r_n = 0$, where 
$gcd(a, b) = gcd(r_{n-1}, r_n) = gcd(r_{n-1}, 0) = r_{n-1}$. 

### Implementation

##### Java

```
package com.algorithmhelper.algorithms.mathematics;

public class EuclidsAlgorithm {

    /**
     * Computes the greatest common divisor between integers a and b.
     *
     * @param a, the first integer
     * @param b, the second integer
     * @return the greatest common divisor between integers a and b
     */
    public static int gcd(int a, int b) {
        if (a % b == 0)
            return b;
        return gcd(b, a % b);
    }
}
```

### Time Complexity

Analyzing the time complexity of Euclid's algorithm is more involved since it depends on the method
we use (subtraction vs. division, as we have here), a proof can be found 
[here](http://www.sci.brooklyn.cuny.edu/~amotz/BC-ALGORITHMS/PRESENTATIONS/gcd.pdf).

```
| Algorithm          | time complexity | space complexity |
|--------------------|-----------------|------------------|
| euclid's algorithm | O(log(a+b))     | O(log(a+b))      |
```
