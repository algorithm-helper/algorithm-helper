# Currying

Currying, is the process of translating a function that takes in multiple arguments to a series of
functions that take one argument each. Uncurrying, is the inverse operation.

### Example (Curry)

The approach is that we return a function that takes in one argument, a function that we would like
to curry, `f`. But this function returns another function taking in one argument `a`, which is the 
first argument to `f`. It returns another function taking in one argument `b`, which is the second 
argument to `f`. Then we return `f(a, b)`. Suppose that we want to curry a function that adds two
numbers:

```
const curry = (f) => (a) => (b) => f(a, b);

const add = (a, b) => a + b;

console.log(curry(add)(1)(2));
```

Which gives the expected output:

```
3
```

### Example (Uncurry)

Intuitively, `uncurry` must be called passing in a curried function `f`, which is a function that 
should return the function applied to two arguments. Thus, to undo the effects of curry, we want to
return a function that takes in two arguments, `a` and `b`, and applies the curried function to 
them, that is, `f(a)(b)`, and the result would be as if we had never curried in the first place:

```
const curry = (f) => (a) => (b) => f(a, b);

const uncurry = (f) => (a, b) => f(a)(b);

const add = (a, b) => a + b;

console.log(uncurry(curry(add))(1, 2));
```

Which also gives the expected output:

```
3
```
