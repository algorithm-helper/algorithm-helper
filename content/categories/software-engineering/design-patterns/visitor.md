# Visitor

The visitor pattern is a design pattern used for performing algorithms or operations on polymorphic
data structures without needing to modify the internal structures themselves. A typical problem
could be that we have a polymorphic data structure and would like to define operations on various 
classes in that data structure without changing the classes. Single dispatch would not be suitable
because we would not be able to retrieve the subclass type information.

The main approach with the visitor pattern is by means of double dispatch, and defining a separate 
visitor object hierarchy, where each subclass in that hierarchy performs a particular operation. 
Suppose that we start off with a tree hierarchy with an interface `AbstractNode`, and subclasses 
`UnaryNode` and `BinaryNode`. We would like to then define a visitor object hierarchy that is able 
to traverse through a tree of `AbstractNode` objects, and performing a particular operations on 
them, starting with the interface `Visitor`, and its concrete subclasses (`ConcreteVisitorA`, 
`ConcreteVisitorB`, `ConcreteVisitorC`, etc.) The `Visitor` has a method `visit` overloaded for 
every type of `AbstractNode` there is (i.e. `UnaryNode`, `BinaryNode`). To be able to implement 
double dispatch, the idea is that `AbstractNode` has a method `accept`, that takes in a `Visitor` 
as an argument, and in the method body, the `Visitor` calls the method `visit` on `this`, which 
will dynamically select the correct overloaded method. 

Clearly this mechanism facilitates double dispatch since it enables us to traverse through two
polymorphic hierarchies: `AbstractNode` and `Visitor`, and allows us to perform specific operations 
on a particular hierarchy, and for each class of that hierarchy to accept those operations.

### Implementation

##### Java

The following is the `AbstractNode` class, from which we extend the `UnaryNode` and `BinaryNode` 
classes:

<script src="https://gist.github.com/eliucs/cce10f4f92b6333668bbd926644670d5.js"></script>

The following is the `UnaryNode` class:

<script src="https://gist.github.com/eliucs/fa72898460d35dc45a1d8e30b494c069.js"></script>

The following is the `BinaryNode` class:

<script src="https://gist.github.com/eliucs/fb456f122bffd3c44d80a09ff153b7fc.js"></script>

Then we have the `Visitor` interface, which has a method `visit` overloaded for each concrete type 
of `AbstractNode`, that is, `UnaryNode` and `BinaryNode`:

<script src="https://gist.github.com/eliucs/898fdfe7e838e2ba902130862fedbc40.js"></script>

The following is the `ConcreteVisitorA` class, which prints out the contents of the `data` of the
`AbstractNode` that it is visiting and a message that it is from the `ConcreteVisitorA` 
implementation of `visit`:

<script src="https://gist.github.com/eliucs/0e583b36e72c86162107071a62cd506a.js"></script>

The following is the `ConcreteVisitorB` class, which prints out the contents of the `data` of the
`AbstractNode` that it is visiting and a message that it is from the `ConcreteVisitorA` 
implementation of `visit`:

<script src="https://gist.github.com/eliucs/dc0ad4dd3a12ce9793ecfc66523212a5.js"></script>

We can then test that it is working by constructing a tree of `AbstractNode` objects and then 
accepting an instance of `ConcreteVisitorA` and `ConcreteVisitorB` from the root of the tree:

<script src="https://gist.github.com/eliucs/4c44b438965a082ef3f3df8ee9c8c8ea.js"></script>

We get the expected output:

```
ConcreteVisitorA visiting BinaryNode: 1
ConcreteVisitorA visiting BinaryNode: 2
ConcreteVisitorA visiting UnaryNode: 3
ConcreteVisitorA visiting UnaryNode: 4
ConcreteVisitorA visiting BinaryNode: 5
ConcreteVisitorA visiting UnaryNode: 6
ConcreteVisitorA visiting UnaryNode: 7
ConcreteVisitorB visiting BinaryNode: 1
ConcreteVisitorB visiting BinaryNode: 2
ConcreteVisitorB visiting UnaryNode: 3
ConcreteVisitorB visiting UnaryNode: 4
ConcreteVisitorB visiting BinaryNode: 5
ConcreteVisitorB visiting UnaryNode: 6
ConcreteVisitorB visiting UnaryNode: 7
```

Thus, we have been able to implement double dispatch, dispatching on two polymorphic hierarchies, 
`AbstractNode` and `Visitor`.
