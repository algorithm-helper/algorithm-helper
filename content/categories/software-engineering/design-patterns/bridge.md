# Bridge

The bridge pattern is a design pattern used to decouple the abstraction and its implementation, so 
that the two can vary independently. A typical problem could be that we have a top level 
abstract class, and have multiple subclasses that extend the abstract class. It follows that when we
need to add more subclasses (perhaps for more functionality), then they are implemented in their own
file and extend the abstract class. This may not be easily extensible, and we have a compile time 
binding between the abstraction and the implementation, so any time the implementation changes for 
one of the subclasses, which may be completely different and unrelated to another subclass, the 
abstract class and all of its subclasses need to be compiled again.

The main idea is to separate the interface and the implementation in their own respective 
hierarchies. In the top-most interface of the inheritance hierarchy, we want it to encapsulate an
implementation object, which itself is part of an inheritance hierachy, but includes the actual
implementations. 

### Implementation

##### Java

For the following example, suppose that we have the `Abstraction` interface, which is top-most in 
the interface hierarchy, and contains a reference to an `Implementor`, which is top-most in the 
implementation hierarchy:

<script src="https://gist.github.com/eliucs/ca3d2095af41ccf519b1615641a7a9b3.js"></script>

The method `operation` is not defined in `Abstraction` itself, but rather in `RefinedAbstraction`. 
It follows that if we wanted to support other interfaces, we could always add more "refined 
abstraction" classes (`RefinedAbstractionA`, `RefinedAbstractionB`, `RefinedAbstractionC`, etc.) 
that extend `Abstraction`:

<script src="https://gist.github.com/eliucs/fd843e811f727e7d444654eb4a8f887a.js"></script>

The following is the `Implementor` interface, which is top-most in the inheritance hierarchy for
all of the different implementations:

<script src="https://gist.github.com/eliucs/738722961b37041d38d2f6f6e7b54b45.js"></script>

`ConcreteImplementorA` is one such implementation:

<script src="https://gist.github.com/eliucs/bb01e1b0df1f71735e4f10becd97f709.js"></script>

`ConcreteImplementorB` is another such implementation:

<script src="https://gist.github.com/eliucs/c285915070494a16ae99e58c5d8af1a5.js"></script>

Then to test using interfaces with different implementations:

<script src="https://gist.github.com/eliucs/1c49815164e16f03fe1a1b588b05e941.js"></script>

Which gives the expected output:

```
implementation from ConcreteImplementorA
implementation from ConcreteImplementorB
```

And thus we have successfully decoupled all of the possible interfaces from all of the possible
implementations for `Abstraction`.
