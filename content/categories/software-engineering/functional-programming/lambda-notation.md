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

```
const someFunction = (fn, n) => fn(n);
```

Then, instead of defining a named function, that is, assigning a function to a variable, or having
a function with an identifier, we can simply pass in an anonymous function as the first argument to
`someFunction`:

```
const someFunction = (fn, n) => fn(n);

console.log(someFunction((n) => n + 1, 10));
```

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

```
const f = () => {
    console.log("from f");
};
f();

(() => {
    console.log("from IIFE");
})();
```

We get the expected output:

```
from f
from IIFE
```
