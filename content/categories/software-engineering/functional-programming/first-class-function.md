# First-Class Function

A first-class function, in the context of a functional programming language, refers to the fact that
functions can be passed around as if it were a value, that is, a function can be assigned to a
variable. 

A higher-order function, although similar and easily confused with the idea of a first-class 
function, is a function that can take in a function as an argument, and return a function as a 
value.

Generally, languages with first-class functions are dynamically typed, that is, type checking is 
done at runtime, not at compile time. First-class functions enable useful techniques like partial
application, currying, map, filter, reduce that regular functions in statically typed languages do
not have access to. 

In the context of JavaScript for example, we have the feature of callback functions, which are 
functions that are passed in as an argument to a function, and that function is called only at some 
point in time in the execution of the program. This enables a programming paradigm called 
asynchronous programming, which is the means of parallel programming where a function is run on a
thread separate from the main thread, and it returns a value to the main thread by means of a 
callback function. Examples will be given below.

### Example One

For the first example, consider a function that can be assigned to a variable. This function takes 
in two arguments, and returns their sum. Note that this uses ES6 arrow syntax:

```
const x = (a, b) => a + b;
```

Then, we can have another function that takes in three arguments, two values and a binary function,
which is called with the other two values as arguments:

```
const someFunction = (a, b, c) => c(a, b);
```

Then, we can always pass function `x` in as the third argument to `someFunction`:

```
const x = (a, b) => a + b;

const someFunction = (a, b, c) => c(a, b);

console.log(someFunction(1, 2, x));
```

Which gives the expected output:

```
3
```

### Example Two

In the second example, we will demonstrate returning a function from a function. Suppose that we 
want to have a function that takes in one argument, and returns a unary function such that this 
function returns the result of its argument added to the original argument. Then we have:

```
const someFunction = (x) => (y) => x + y;
```

When we try to call `someFunction` with a single argument, we do not get a value, but a function
itself:

```
const someFunction = (x) => (y) => x + y;

console.log(someFunction(1));
```

We get the expected output:

```
[Function]
```

This function itself adds `x` to whatever argument it is supplied with. Thus, we can call it like
this:

```
const someFunction = (x) => (y) => x + y;

console.log(someFunction(1)(2));
```

We get the expected output:

```
3
```

### Example (Callback)

For the third example, we demonstrate the asynchronous property of callback functions. Suppose that
we have to print three different messages with functions `printFirst`, `printSecond`, and 
`printThird`, which prints `"first"`, `"second"`, and `"third"`, respectively. Note that these are 
by definition not pure functions because they cause side effects, namely printing to the console.

Then, we set a timeout and only print `"first"` only after 2 seconds (2000 ms), `"second"` only
after 1 second (1000 ms), and `"third"` immediately:

```
const printFirst = () => {
    console.log("first");
};

const printSecond = () => {
    console.log("second");
};

const printThird = () => {
    console.log("third");
};

setTimeout(printFirst, 2000);

setTimeout(printSecond, 1000);

printThird();
```

The output is not what we would initially expect:

```
third
second
first
```

This is because `printFirst` and `printSecond` are callback functions, which are only called after
a certain event that happens within the body of `setTimeout`, which in this case, is when 2 seconds
and 1 second has passed, respectively. But this begs the question, why do we not get the following
behavior:

- We wait 2 seconds, then `"first"` appears.
- We wait 1 second, then `"second"` appears.
- Immediately after, `"third"` appears.

This is because of the event-loop model of JavaScript, where the JavaScript runtime has a queue of
messages to be processed with their corresponding callback functions. More can be read about this
[here](https://developer.mozilla.org/en-US/docs/Web/JavaScript/EventLoop). 

Regardless, it is not hard to see the implications of this callback mechanism in the context of 
developing software. In languages that do not support callbacks (which are only enabled through 
first-class functions), we would have what is called "blocking" behavior. That is, when the user 
triggers `printFirst`, it would appear as it the program has become frozen, since the entire program 
halts for 2 seconds before continuing. This is not an ideal experience for the end-user. Instead in
asynchronous programming model, the user can continue using the program, and we get the result of
`printFirst` only after it has been done processing. Although in this example, `printFirst`, 
`printSecond`, and `printThird` do nothing except print out a message, we can imagine them to be
doing functions that do a heavy computation, medium computation and easy computation in a real-life
situation, hence the need for callback functions.
