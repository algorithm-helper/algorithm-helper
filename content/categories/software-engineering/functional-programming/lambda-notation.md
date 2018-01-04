# Lambda Notation

Lambda notation, in the context of functions in functional programming languages, refers to the 
idea that functions do not need identifiers, and are thus anonymous functions. In some languages 
like Python, we may have the `lambda` keyword, however `lambda` itself is not an identifier for that
function, but rather the notation of an anonymous function itself. In JavaScript, we can use the
`function` keyword (with no identifier) or ES6 arrow notation (with no identifier). 

### Example (Anonymous Function)

Suppose that we have a function `someFunction` that takes in two arguments, a unary function `fn` 
and a value `n`, that returns the result of calling `fn` passing in `n` as an argument. Note that
this uses ES6 arrow notation:

<script src="https://gist.github.com/eliucs/6e7bef0c24c2cb4421071f4403dbc1f3.js"></script>

Then, instead of defining a named function, that is, assigning a function to a variable, or having
a function with an identifier, we can simply pass in an anonymous function as the first argument to
`someFunction`:

<script src="https://gist.github.com/eliucs/f560535d5e08a8624f614546a7f0afbf.js"></script>

We get the expected output:

```
11
```

### Example (IIFE)

In JavaScript, we have the concept of immediately invoked function expressions (IIFE), which is 
where an anonymous function is defined, and immediately called. Typically, we can use these function
constructs to perform an operation given some fixed scope. We use IIFE to be able to "call" 
anonymous functions, since we have no identifier to invoke them. In the following example, we have
a named function `f` and an IIFE. Clearly, we must take the extra step to invoke `f` as opposed to
the IIFE:

<script src="https://gist.github.com/eliucs/30b9ea89281d19e258cb81805034006b.js"></script>

We get the expected output:

```
from f
from IIFE
```
