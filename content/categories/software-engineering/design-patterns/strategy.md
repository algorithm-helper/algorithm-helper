# Strategy

The strategy pattern is a design pattern used to encapsulate a family of interchangeable algorithms,
and letting the client choose the implementation. A typical problem could be we want to bury the 
implementation details for algorithms because they are complex, require helper functions or 
additional local data structures to facilitate them. 

A simple example could be trying to encapsulate a family of sorting algorithms: say for insertion 
sort, merge sort, and heap sort. While insertion sort and merge sort's implementations are 
straightforward, we will need to maintain a heap, as well as implement operations like `heapifyDown`
for heap sort. It would be better to encapsulate them all in a strategy hierarchy, with a 
`SortingStrategy` interface, and classes `InsertionSort`, `MergeSort`, and `HeapSort` that 
implement it.

The main idea approach is that we have an interface `Strategy`, that defines the 
algorithms or operations. Then we have multiple classes of concrete strategies 
(`ConcreteStrategyA`, `ConcreteStrategyB`, `ConcreteStrategyC`, etc.) that implement `Strategy`, 
and have their own implementation of the needed algorithms or operations. Then we have a class 
called the `Context`, which has an instance of a `Strategy`, and keeps track of which concrete
strategy is being used and should be applied.

### Implementation

##### Java

For the following example, suppose that we have a strategy that involves performing operations on
an array or integers, and we would like the following operations: add one to every element in the 
array, subtract one to every element in the array, and square every element in the array. To 
conform to the strategy pattern, we start off with the `Strategy` interface:

<script src="https://gist.github.com/eliucs/dcf3fe06fc27841ea5fd126d8d7aa2e0.js"></script>

Then we have `ConcreteStrategyA`, which implements `operation`, adding one to every element in the
array:

<script src="https://gist.github.com/eliucs/cbb2a751ecad10ff03373fd88b111fd9.js"></script>

Then we have `ConcreteStrategyB`, which implements `operation`, subtracting one from every element 
in the array:

<script src="https://gist.github.com/eliucs/6d7c4cd9780db584e68c4e473d372b58.js"></script>

Then we have `ConcreteStrategyC`, which implements `operation`, squaring every element in the array:

<script src="https://gist.github.com/eliucs/91f8baa3b1d4f68bc2bcbb8086e32c9b.js"></script>

The `Context` then has an instance of `Strategy` called `strategy`, and method `operation` that
performs the corresponding operation on the array, and prints out the contents of the array:

<script src="https://gist.github.com/eliucs/a28d894d9d32f30f632ee840c311d3cd.js"></script>

We test that we are able to dynamically select the concrete strategy implementation at runtime by
taking in user input on an array `[0, 1, 2, 3]`. If the user types in `A`, then we use 
`ConcreteStrategyA`, if `B` then `ConcreteStrategyB`, and if `C` then `ConcreteStrategyC`:

<script src="https://gist.github.com/eliucs/936d563a8adbe8eede7eeb3a5c2aaaa2.js"></script>

Suppose the input is:

```
A B C done
```

Then the expected output is:

```
1 2 3 4 
-1 0 1 2 
0 1 4 9 
```

Clearly we have successfully encapsulated a family of algorithms (`Strategy`) and be able to select 
a particular implementation at runtime. 
