# Karatsuba Algorithm

The Karatsuba algorithm, also known as Karatsuba multiplication, is a multiplication algorithm that
uses the principle of divide and conquer to multiply two numbers in faster than quadratic time. 

Given $x$ and $y$, which are $n$ digit numbers in base $B$, we can express each as:

$x = x_1B^m + x_0$

$y = y_1B^m + y_0$

Where $x_0, y_0 < B^m$. Then the product is:

$xy = (x_1B^m + x_0)(y_1B^m + y_0)$

$xy = z_2B^{2m}+z_1B^m+z_0$

Where

$z_2 = x_1y_1$

$z_1 = x_1y_0 + x_0y_1$

$z_0 = x_0y_0$

Since $z_1 = x_1y_0 + x_0y_1$,

$z_1 = (x_1 + x_0)(y_1 + y_0) - x_1y_1 - x_0y_0$

$z_1 = (x_1 + x_0)(y_1 + y_0) - z_2 - z_0$

Thus, we can calculate $xy$ in three multiplications instead of four.

### Example

Suppose that we wanted to multiply numbers $1234$ and $5678$. Then we have $B = 10$ and $m = 2$:

$x = 1234 = 12 \times 10^2 + 34$

$y = 567 = 5 \times 10^2 + 67$

$z_2 = 12 \times 5 = 60$

$z_0 = 34 \times 67 = 2278$ 

$z_1 = (12 + 34)(5 + 67) - 60 - 2278$

$= 46 \times 72 - 60 - 2278$

$= 3312 - 60 - 2278$

$= 976$

Thus, we have

$xy = 60 \times 10^{4} + 976 \times 10^2 + 2278$

$= 699678$

### Implementation

##### Java

```
package com.algorithmhelper.algorithms.mathematics;

import java.math.BigInteger;

public class KaratsubaAlgorithm {

    private final static BigInteger ZERO = new BigInteger("0");

    /**
     * Multiplies the two BigInteger numbers x and y, and returns the result.
     *
     * @param x, the first BigInteger
     * @param y, the second BigInteger
     * @return the result of the multiplication between x and y
     * @throws IllegalArgumentException if x is null
     * @throws IllegalArgumentException if y is null
     */
    public static BigInteger multiply(BigInteger x, BigInteger y) {
        if (x == null)
            throw new IllegalArgumentException("multiply with null x");
        if (y == null)
            throw new IllegalArgumentException("multiply with null y");

        int N = Math.max(x.bitLength(), y.bitLength());

        if (N <= 1000)
            return x.multiply(y);

        N = (N/2) + (N%2);

        BigInteger x1 = x.shiftRight(N);
        BigInteger x0 = x.subtract(x1.shiftLeft(N));
        BigInteger y1 = y.shiftRight(N);
        BigInteger y0 = y.subtract(y1.shiftLeft(N));

        BigInteger z2 = multiply(x1, y1);
        BigInteger z0 = multiply(x0, y0);
        BigInteger z1 = multiply(x1.add(x0), y1.add(y0)).subtract(z2).subtract(z0);

        return z0.add(z1.shiftLeft(N)).add(z2.shiftLeft(2*N));
    }
}
```

### Time Complexity

The time complexity of the Karatsuba algorithm is $O(N^{log_2(3)})$, or about $O(N^{1.585})$. The 
proof of its time complexity is more involved, and can be found 
[here](http://www.ccas.ru/personal/karatsuba/divcen.pdf).

```
| Algorithm           | time complexity | space complexity |
|---------------------|-----------------|------------------|
| karatsuba algorithm | O(N^lg3)        | O(1)             |
```
