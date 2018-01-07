# Newton-Raphson Method

The Newton-Raphson method, also known as Newton's method, is a method for finding successively 
better approximations to the roots (or zeroes) of a real-valued function.

We start with a a function $f$, and an initial guess $x_0$ for the root of $f$. Then the successive
approximation is

$x_1 = x_0 - f(x_0)/f'(x_0)$

Every successive approximation is then

$x_n = x_{n-1} - f(x_{n-1})/f'(x_{n-1})$

### Implementation

For the purposes of demonstrating the Newton-Raphson method, we will be approximating the square
root of a number.

##### Java

<script src="https://gist.github.com/eliucs/dc5734c244a2420ff55d7eaf7496c914.js"></script>

### Time Complexity

The analysis of time complexity is more involved, and can be found 
[here](http://en.citizendium.org/wiki/Newton%27s_method).

```
| Algorithm             | time complexity | space complexity |
|-----------------------|-----------------|------------------|
| newton-raphson method | O(F(N)logN)     | O(1)             |
```
