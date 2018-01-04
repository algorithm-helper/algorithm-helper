# Introduction

Functional programming is a programming paradigm based around the idea of expressing all 
computations with mathematical functions. We will look at various aspects of functional programming 
in this section: first class functions, recursion, lambda notation, function composition, map, 
filter, reduce, and currying.

From Wikipedia:

> [Functional programming](https://en.wikipedia.org/wiki/Functional_programming) -  a programming 
paradigm, a style of building the structure and elements of computer programs that treats 
computation as the evaluation of mathematical functions and avoids changing state and mutable data. I
t is a declarative programming paradigm, which means programming is done with expressions or 
declarations instead of statements.

### Terminology

The general idea behind the use of functions is that it avoids the changing of state or mutating 
data. By calling a function `f` given some parameters, we can be sure that calling `f` again on the
same parameters returns us the same value each time. Thus, it is much easier to trace and predict
the outcomes of a program. Generally, functional programming is used in academic contexts, however 
two of the most widely recognized languages, JavaScript and Python, have properties of functional 
programming which we will use for the purposes of examples and sample code in this section.

The following are terminology used in this section:

- function
    - A relation to assign a set of inputs to a set of outputs. In the context of functional 
    programming, functions take in zero or more parameters and return a value.
- first-class function / higher-order function
    - A function where you can pass in a function as an argument.
- state
    - Representing some data at some point in time during the execution of a program.
- side effect
    - Some event that changes state.
- pure function
    - A function that does not have any side effects.
- anonymous function
    - A function with no identifier.
- immediately invoked function expression (IIFE)
    - A JavaScript concept, it is an anonymous function that immediately calls itself.
- lambda / lambda calculus
    - A formal system for computation. More can be read about this topic on this 
    Wikipedia [article](https://en.wikipedia.org/wiki/Lambda_calculus).
- recursive function
    - A function that calls itself within its body.
- callback function 
    - A function that is called at a later point in time in the execution of a program.
- arity
    - The number of arguments that a function takes.
- unary function    
    - A function of arity 1.
- binary function
    - A function of arity 2.
- k-ary function 
    - A function of arity `k`.
