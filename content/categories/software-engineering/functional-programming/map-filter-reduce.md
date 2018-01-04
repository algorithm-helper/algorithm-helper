# Map, Filter, Reduce

Map, filter, and reduce, refer to three fundamental functions that operate on lists that many, if 
not all, functional programming languages have. In both Python and JavaScript we have the functions
`map`, `filter`, and `reduce`. 

Map is a function that takes in a list and a unary function as arguments, and applies the unary
function to every element in the list, assuming that the types of the elements of the list are 
compatible with the unary function, and returns the new list with the results. In JavaScript, 
`Array` has a method `map`, which takes in a unary function as an argument, and returns a new array
with the map function applied to every element in the array, and does not mutate the original array.
We will demonstrate the use of this method, as well as writing the `map` function from scratch.

Filter is a function that takes in a list and a unary predicate as arguments, and only the elements 
that return `true` under the unary predicate are kept in the resulting list,  assuming that the 
types of the elements of the list are compatible with the unary predicate, and returns the new 
list with the results. In JavaScript, `Array` has a method `filter`, which takes in a unary 
predicate as an argument, and returns a new array with the filter predicate applied to every 
element in the array, and does not mutate the original array. We will demonstrate the use of 
this method, as well as writing the `filter` function from scratch.

Reduce is a function that takes in a list, a binary function, and an initial value (also called the
accumulated value), and combines the elements of the list by applying the binary function on the 
accumulated value to every subsequent value in the list. In JavaScript, `Array` has a method 
`reduce`, which takes in a binary function as an argument, and returns a value with the reducer 
function predicate applied to every element in the array, and does not mutate the original array. 
We will demonstrate the use of this method, as well as writing the `reduce` function from scratch.

### Example (Map)

Suppose that we have an array of integers, and would like to square every element in the array. 
Then, given the array `arr`, we call the method `map`, passing in an anonymous function that
computes the square of the argument that it is passed, and storing the result of that operation, 
namely a new array, to `newArr`:

<script src="https://gist.github.com/eliucs/3ce5ef3ce8016512dca1224ff4ec423c.js"></script>

We get the expected output:

```
[ 0, 1, 4, 9, 16, 25 ]
```

We can write the `map` function from scratch, which takes in two arguments `list` and `fn`. With a
new array `result`, we iterate over each element `x` of `list`, appending `fn(x)` to `result`:

<script src="https://gist.github.com/eliucs/be9beed31c90b04e35c99047c08c8baf.js"></script>

We get the same output:

```
[ 0, 1, 4, 9, 16, 25 ]
```

### Example (Filter)

Suppose that we have an array of integers, and would like to filter it by only keeping the even 
numbers. Then, given the array `arr`, we call the method `filter`, passing in an anonymous 
function that returns `true` only if the argument that it is passed is even, and storing the result 
of that operation, namely a new array, to `newArr`:

<script src="https://gist.github.com/eliucs/391345ce7bb4a34b39333aed74369d1a.js"></script>

We get the expected output:

```
[ 0, 2, 4 ]
```

We can write the `filter` function from scratch, which takes in two arguments `list` and `fn`. With 
a new array `result`, we iterate over each element `x` of `list`, appending `x` to `result` only 
if `fn(x)` returns `true`:

<script src="https://gist.github.com/eliucs/0ef4ed429511ada137a87a2cb0f27f18.js"></script>

We get the same output:

```
[ 0, 1, 4, 9, 16, 25 ]
```

### Example (Reduce)

Suppose that we have an array of integers, and would like to get the sum of all the elements of the
list. Then, give the array `arr`, we call the method `reduce`, passing in an anonymous binary 
function that takes in two arguments `previousValue`, and `currentValue`, and returns the sum of 
the two arguments. Then, storing the result of that operation, namely a value, to `sum`:

<script src="https://gist.github.com/eliucs/2d32a9710730321efeadda81561c54f1.js"></script>

We get the expected output:

```
15
```

We can write the `reduce` function from scratch, however it is a bit more involved than `map` or
`filter`. It takes in two arguments `list` and `fn`. We define that the result of calling `reduce` 
on an empty list is `undefined`, and to throw an `Error` if the `list` is not actually an `Array`
object. Then we define a recursive helper function called `reduceHelper` inside `reduce` that takes 
in three arguments: `list`, `fn`, and `start`. Then it calls `fn` on `start` and the last element 
of `list`, added to the recursive result of `reduceHelper` except shrinking the array size by 1:

<script src="https://gist.github.com/eliucs/1d5f379e67d4e17b37200b88b8f3d276.js"></script>

We get the same output:

```
15
```