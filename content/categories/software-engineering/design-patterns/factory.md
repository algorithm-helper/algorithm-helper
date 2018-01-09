# Factory

The factory pattern, also called the factory method pattern, is a design pattern used to for a 
client to instantiate objects without needing to use the `new` keyword. A typical problem is that 
we want to construct and instantiate objects particularly in cases when their construction is 
complex, or needs particular parameters at run time. Generally, using factories are more expressive. 

The main approach is that we have a `Factory` class that returns the particular object. For the 
purposes of our example, we call these `Product` objects. Then `Factory` has a method called 
`getProduct` which creates the `Product` based off of particular parameters given. Note that the
actual part of constructing the `Product` to return to the client can be done in many ways, with 
different behavior: for example, we could make use of the decorator pattern to be able to customize
the `Product` at run time, or use the prototype pattern to be able to returns copies, or clones, 
of prototypical instances. The `getProduct` method is static.

### Implementation

##### Java

The following is the `Product` interface:

```
package com.algorithmhelper.softwareengineering.designpatterns.factory;

public interface Product {

    /**
     * Returns the name of the Product.
     *
     * @return the name of the Product
     */
    String getName();
}
```

The following is the `ConcreteProductA` class:

```
package com.algorithmhelper.softwareengineering.designpatterns.factory;

public class ConcreteProductA implements Product {

    private String name = "ConcreteProductA";

    /**
     * Returns the name of the ConcreteProductA.
     *
     * @return the name of the ConcreteProductA
     */
    public String getName() {
        return name;
    }
}
```

The following is the `ConcreteProductB` class:

```
package com.algorithmhelper.softwareengineering.designpatterns.factory;

public class ConcreteProductB implements Product {

    private String name = "ConcreteProductB";

    /**
     * Returns the name of the ConcreteProductB.
     *
     * @return the name of the ConcreteProductB
     */
    public String getName() {
        return name;
    }
}
```

The following is the `ConcreteProductC` class:

```
package com.algorithmhelper.softwareengineering.designpatterns.factory;

public class ConcreteProductC implements Product {

    private String name = "ConcreteProductC";

    /**
     * Returns the name of the ConcreteProductC.
     *
     * @return the name of the ConcreteProductC
     */
    public String getName() {
        return name;
    }
}
```

The following is the `Factory` class, which has the static `getProduct` method. It takes in a `name`
as an argument and returns the corresponding `Product`:

```
package com.algorithmhelper.softwareengineering.designpatterns.factory;

public class Factory {

    /**
     * Returns the Product with the give name.
     *
     * @param name, the name of the Product
     */
    public static Product getProduct(String name) {
        if (name == null)
            return null;

        if (name.equals("A"))
            return new ConcreteProductA();
        else if (name.equals("B"))
            return new ConcreteProductB();
        else if (name.equals("C"))
            return new ConcreteProductC();
        else
            return null;
    }
}
```

Then we can test it by taking in system input, and passing in the input to the `Factory` to 
create them, and return them back to the client:

```
package com.algorithmhelper.softwareengineering.designpatterns.factory;

import java.util.Scanner;

public class FactoryTest {

    public static void main(String[] args){
        Scanner in = new Scanner(System.in);

        while (in.hasNext()) {
            String next = in.next();

            if (next.equals("done"))
                break;

            Product product = Factory.getProduct(next);
            System.out.println(product.getName());
        }
    }
}
```

Suppose that our input was:

```
A B C done
```

We get the expected output:

```
ConcreteProductA
ConcreteProductB
ConcreteProductC
```

And thus we have been able to successfully instantiate `Product` objects without the client needing
to explicitly create them using the `new` keyword, but instead have that delegated to the 
factory.
