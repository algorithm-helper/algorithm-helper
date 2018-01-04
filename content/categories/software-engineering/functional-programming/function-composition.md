# Function Composition

Function composition is combining two or more functions to produce a new function. 

### Example

Suppose that we want to compute the result of a quadratic function $ax^2 + bx + c$ given the 
coefficients `a`, `b`, `c`. Then instead of implementing a single function to do so, we can break up 
the function into 3 parts: `square`, `multiplyByConstant`, and `identity`, and compose a new 
function to return. The returned function takes in a single argument `x`, and returns the result of 
`ax*x + bx + c`:

<script src="https://gist.github.com/eliucs/ae617d361d3eba90e12ca4023ae321a9.js"></script>

Then, to return the function $x^2 + 2x+ 1$ itself, we have:

<script src="https://gist.github.com/eliucs/0b9ae62b4e2a027f36ef5aa5711eb9ae.js"></script>

Which gives the expected output:

```
[Function]
```

To evaluate it at `x=1` for example, we have:

<script src="https://gist.github.com/eliucs/481dd15d1a8b0a4cdab333a2bf5afcd7.js"></script>

Which gives the expected output:

```
4
```
