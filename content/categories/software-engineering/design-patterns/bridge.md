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

```
package com.algorithmhelper.designpatterns.bridge;

public abstract class Abstraction {

    protected Implementor impl;

    /**
     * Initializes an Abstraction, with an Implementor impl.
     *
     * @param impl, the Implementor object
     */
    public Abstraction(Implementor impl) {
        this.impl = impl;
    }

    /**
     * Performs the operation.
     */
    public abstract void operation();
}
```

The method `operation` is not defined in `Abstraction` itself, but rather in `RefinedAbstraction`. 
It follows that if we wanted to support other interfaces, we could always add more "refined 
abstraction" classes (`RefinedAbstractionA`, `RefinedAbstractionB`, `RefinedAbstractionC`, etc.) 
that extend `Abstraction`:

```
package com.algorithmhelper.designpatterns.bridge;

public class RefinedAbstraction extends Abstraction {

    /**
     * Initializes the RefinedAbstraction with an Implementor impl.
     *
     * @param impl, the Implementor object
     */
    public RefinedAbstraction(Implementor impl) {
        super(impl);
    }

    /**
     * Performs the operation.
     */
    public void operation() {
        impl.operation();
    }
}
```

The following is the `Implementor` interface, which is top-most in the inheritance hierarchy for
all of the different implementations:

```
package com.algorithmhelper.designpatterns.bridge;

public interface Implementor {

    /**
     * Performs the operation, this is to be overriden by a concrete implementor.
     */
    void operation();
}
```

`ConcreteImplementorA` is one such implementation:

```
package com.algorithmhelper.designpatterns.bridge;

public class ConcreteImplementorA implements Implementor {

    /**
     * Prints out a message that the implementation is from ConcreteImplementorA.
     */
    public void operation() {
        System.out.println("implementation from ConcreteImplementorA");
    }
}
```

`ConcreteImplementorB` is another such implementation:

```
package com.algorithmhelper.designpatterns.bridge;

public class ConcreteImplementorB implements Implementor {

    /**
     * Prints out a message that the implementation is from ConcreteImplementorB.
     */
    public void operation() {
        System.out.println("implementation from ConcreteImplementorB");
    }
}
```

Then to test using interfaces with different implementations:

```
package com.algorithmhelper.designpatterns.bridge;

public class BridgeTest {

    public static void main(String[] args) {
        Abstraction objA = new RefinedAbstraction(new ConcreteImplementorA());
        Abstraction objB = new RefinedAbstraction(new ConcreteImplementorB());

        objA.operation();
        objB.operation();
    }
}
```

Which gives the expected output:

```
implementation from ConcreteImplementorA
implementation from ConcreteImplementorB
```

And thus we have successfully decoupled all of the possible interfaces from all of the possible
implementations for `Abstraction`.
