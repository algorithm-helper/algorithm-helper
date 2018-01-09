# Decorator

The decorator pattern is a design pattern used to dynamically attach different properties to an 
object. A typical problem could be that we would like to customize properties, state, behavior, or
functionality of an object at runtime, but inheritance would not work because it is static and thus
the functionality is fixed.

The main approach is that we dynamically add functionality by recursively add decorators onto an 
object. We have an `Interface`, which is the interface of the object that we are trying to 
customize, and all of its functionality is abstract. We have a `Base`, which is the basic most 
version of the object when we try to instantiate the `Interface`. Then to customize the `Interface`
object, also called "decorating" it, we have an `AbstractDecorator` class, which takes in an
`Interface` reference in its constructor. Then we can specify different concrete decorators
(`ConcreteDecoratorA`, `ConcreteDecoratorB`, `ConcreteDecoratorC`, etc.) that extend the 
`AbstractDecorator` to be able to provide their own respective different functionalities.

Then, at run time, we first instantiate an `Interface` as a `Base` object. Say the client is to 
type in as input into the program their specifications or customizations for the object, then we 
simply wrap the `Interface` around the corresponding (concrete) decorator. In a real world 
application, this could be adding accessories to a car, toppings to a pizza, or extra features to a 
cell phone plan, for example.

### Implementation

##### Java

The following is the `Interface`:

```
package com.algorithmhelper.designpatterns.decorator;

public interface Interface {

    /**
     * Some method.
     */
    void method();
}
```

The `Base` class, which implements the `Interface`, is the basic most version of the `Interface`. 
Here, it has a method `method` to print out a message saying that it is from the `Base` class
implementation:

```
package com.algorithmhelper.designpatterns.decorator;

public class Base implements Interface {

    /**
     * Overrides method from Interface, prints out message that this method is called from the
     * Base class.
     */
    public void method() {
        System.out.println("method from Base");
    }
}
```

The `AbstractDecorator` takes in an `Interface` as an argument to its constructor, and this is 
what enables the recursive wrapping of the `Interface` object with the needed concrete decorators:

```
package com.algorithmhelper.designpatterns.decorator;

public abstract class AbstractDecorator implements Interface {

    private Interface component;

    /**
     * Initializes the AbstractDecorator with the Interface component.
     * @param component
     */
    public AbstractDecorator(Interface component) {
        this.component = component;
    }

    /**
     * Overrides the method, calls component's method.
     */
    public void method() {
        component.method();
    }
}
```

The `ConcreteDecoratorA` class is one such decorator that extends `AbstractDecorator`, and for 
clarity overrides `method` to print out a message saying that it is from the `ConcreteDecoratorA`
implementation:

```
package com.algorithmhelper.designpatterns.decorator;

public class ConcreteDecoratorA extends AbstractDecorator {

    /**
     * Initializes the ConcreteDecoratorA with the Interface component.
     *
     * @param component, the Interface
     */
    public ConcreteDecoratorA(Interface component) {
        super(component);
    }

    /**
     * Prints out message that this is being called from ConcreteDecoratorA.
     */
    public void method() {
        super.method();
        System.out.println("method from ConcreteDecoratorA");
    }
}
```

The `ConcreteDecoratorB` class is another decorator that extends `AbstractDecorator`, and 
overrides `method` to print out a message saying that it is from the `ConcreteDecoratorB`
implementation:

```
package com.algorithmhelper.designpatterns.decorator;

public class ConcreteDecoratorB extends AbstractDecorator {

    /**
     * Initializes the ConcreteDecoratorB with the Interface component.
     *
     * @param component, the Interface
     */
    public ConcreteDecoratorB(Interface component) {
        super(component);
    }

    /**
     * Prints out message that this is being called from ConcreteDecoratorB.
     */
    public void method() {
        super.method();
        System.out.println("method from ConcreteDecoratorB");
    }
}
```

The `ConcreteDecoratorC` class is another decorator that extends `AbstractDecorator`, and 
overrides `method` to print out a message saying that it is from the `ConcreteDecoratorC`
implementation:

```
package com.algorithmhelper.designpatterns.decorator;

public class ConcreteDecoratorC extends AbstractDecorator {

    /**
     * Initializes the ConcreteDecoratorC with the Interface component.
     *
     * @param component, the Interface
     */
    public ConcreteDecoratorC(Interface component) {
        super(component);
    }

    /**
     * Prints out message that this is being called from ConcreteDecoratorC.
     */
    public void method() {
        super.method();
        System.out.println("method from ConcreteDecoratorC");
    }
}
```

Then to test, suppose that we take in from the system's input to customize the `Interface`,
which is initially instantiated as a `Base` object. When we type in the letter `A`, we add 
`ConcreteDecoratorA`'s functionality, when we type in the letter `B`, we add 
`ConcreteDecoratorB`'s functionality, and when we type in the letter `C`, we add 
`ConcreteDecoratorC`'s functionality:

```
package com.algorithmhelper.designpatterns.decorator;

import java.util.Scanner;

public class DecoratorTest {

    public static void main(String[] args) {
        Interface base = new Base();

        Scanner in = new Scanner(System.in);
        while (true) {
            String input = in.next();

            if (input.equals("A"))
                base = new ConcreteDecoratorA(base);
            else if (input.equals("B"))
                base = new ConcreteDecoratorB(base);
            else if (input.equals("C"))
                base = new ConcreteDecoratorC(base);
            else if (input.equals("done"))
                break;
        }

        base.method();
    }
}
```

Suppose our input is:

```
A B C done
```

Then we get the expected output:

```
method from Base
method from ConcreteDecoratorA
method from ConcreteDecoratorB
method from ConcreteDecoratorC
```

And thus we were able to successfully add functionality to the `Interface` object dynamically at
runtime.
