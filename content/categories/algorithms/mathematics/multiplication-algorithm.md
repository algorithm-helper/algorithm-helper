# Multiplication Algorithm

Multiplication algorithms are algorithms for multiplying two numbers. Considering how multiplication
is such a fundamental operation in almost all algorithms, it is essential that this operation itself
is done efficiently. We want an algorithm that performs better than long multiplication, a method
that is typically learned in elemenentary school, that is, better than $O(N^2)$, where $N$ is the 
number of digits of the largest of the two numbers.

### Long Multiplication

Long multiplication, also called standard multiplication, is the method where we multiply the 
multiplicand by each digit of the multiplier, shifting the result to the left each time, and then
adding up all of the results. For example, suppose we were to multiply the numbers $1234$ (the 
multiplicand) and $5678$ (the multiplier):

```
     1234
   x 5678
   ------
     9872
    8638
   7404
+ 6170
---------
  7006652
```

In terms of time complexity, in the worst case, we have that the multiplicand and the multiplier are 
both of the same size. Clearly for each digit in the multiplier, it must be multiplied with each 
digit of the multiplicand, and thus this algorithm runs in $O(N^2)$ time.
