# Function Composition

Function composition is combining two or more functions to produce a new function. 

### Example

Suppose that we want to compute the result of a quadratic function $ax^2 + bx + c$ given the 
coefficients `a`, `b`, `c`. Then instead of implementing a single function to do so, we can break up 
the function into 3 parts: `square`, `multiplyByConstant`, and `identity`, and compose a new 
function to return. The returned function takes in a single argument `x`, and returns the result of 
`ax*x + bx + c`:

```
const identity = (x) => x;

const multiplyByConstant = (c, x) => c*x;

const square = (x) => x*x;

const quadratic = (a, b, c) => {
    return (x) => {
        return multiplyByConstant(a, square(x)) + 
               multiplyByConstant(b, x) + 
               identity(c);
    };
};
```

Then, to return the function $x^2 + 2x+ 1$ itself, we have:

```
const identity = (x) => x;

const multiplyByConstant = (c, x) => c*x;

const square = (x) => x*x;

const quadratic = (a, b, c) => {
    return (x) => {
        return multiplyByConstant(a, square(x)) + 
               multiplyByConstant(b, x) + 
               identity(c);
    };
};

console.log(quadratic(1, 2, 1));
```

Which gives the expected output:

```
[Function]
```

To evaluate it at `x=1` for example, we have:

```
const identity = (x) => x;

const multiplyByConstant = (c, x) => c*x;

const square = (x) => x*x;

const quadratic = (a, b, c) => {
    return (x) => {
        return multiplyByConstant(a, square(x)) + 
               multiplyByConstant(b, x) + 
               identity(c);
    };
};

console.log(quadratic(1, 2, 1)(1));
```

Which gives the expected output:

```
4
```
