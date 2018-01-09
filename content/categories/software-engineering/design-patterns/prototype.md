# Prototype

The prototype pattern is a design pattern used to create objects using a prototype instance. A 
typical problem would be that we want to avoid subclasses of an object creator, or want to avoid 
creating a new object with the `new` keyword. 

The main idea behind the prototype pattern is that we have an interface `Prototype` that specifies
a `clone` method. We have concrete prototype methods that implement the `Prototype` interface, and
these classes may be `ConcretePrototypeA`, `ConcretePrototypeB`, `ConcretePrototypeC`, etc. Then
in a factory class for example, we can map names of concrete prototypes to an instance, and every 
time we need to get a copy of a particular concrete prototype, we look it up in the map, then call
the `clone` on the prototype instance. 

Clearly, for a client, they are able to get instances of a particular concrete prototype without
needing to explicitly call the `new` keyword to instantiate that object.

### Implementation

##### Java

The following is the `Prototype` interface, which has a `clone` method:

```
package com.algorithmhelper.softwareengineering.designpatterns.prototype;

public interface Prototype {

    /**
     * Returns a copy of this Prototype object.
     *
     * @return a copy of this Prototype object
     */
    Prototype clone();
}
```

The following class `ConcretePrototypeA` is one such concrete prototype that implements `Prototype`.
Note that it has an `id` field, which we will use later to verify that we are instantiating the 
correct class:

```
package com.algorithmhelper.softwareengineering.designpatterns.prototype;

public class ConcretePrototypeA implements Prototype {

    private final String id = "ConcretePrototypeA";

    /**
     * Returns a copy of this ConcretePrototypeA object.
     *
     * @return a copy of this ConcretePrototypeA object
     */
    public Prototype clone() {
        return new ConcretePrototypeA();
    }

    /**
     * Returns the String representation of this ConcretePrototypeA object.
     *
     * @return the String representation of this ConcretePrototypeA object
     */
    public String toString() {
        return id;
    }
}
```

The following class `ConcretePrototypeB` is another such concrete prototype that implements 
`Prototype`:

```
package com.algorithmhelper.softwareengineering.designpatterns.prototype;

public class ConcretePrototypeB implements Prototype {

    private final String id = "ConcretePrototypeB";

    /**
     * Returns a copy of this ConcretePrototypeB object.
     *
     * @return a copy of this ConcretePrototypeB object
     */
    public Prototype clone() {
        return new ConcretePrototypeB();
    }

    /**
     * Returns the String representation of this ConcretePrototypeB object.
     *
     * @return the String representation of this ConcretePrototypeB object
     */
    public String toString() {
        return id;
    }
}
```

The following class `ConcretePrototypeC` is another such concrete prototype that implements 
`Prototype`:

```
package com.algorithmhelper.softwareengineering.designpatterns.prototype;

public class ConcretePrototypeC implements Prototype {

    private final String id = "ConcretePrototypeC";

    /**
     * Returns a copy of this ConcretePrototypeC object.
     *
     * @return a copy of this ConcretePrototypeC object
     */
    public Prototype clone() {
        return new ConcretePrototypeC();
    }

    /**
     * Returns the String representation of this ConcretePrototypeC object.
     *
     * @return the String representation of this ConcretePrototypeC object
     */
    public String toString() {
        return id;
    }
}
```

Then suppose that for the purposes of this example, we want to use a `Factory` to instantiate
`Prototype` object, but we do not want to use the `new` keyword when doing so. Instead, we have a 
map that maps the names of these concrete `Prototype` objects to an instance, a prototypical
instance, from which we `clone` whenever neeeded, instead of using the `new` keyword for
instantiation:

```
package com.algorithmhelper.softwareengineering.designpatterns.prototype;

import java.util.HashMap;
import java.util.Map;

public class Factory {

    private static final Map<String, Prototype> prototypes = new HashMap<>();
    static {
        prototypes.put("A", new ConcretePrototypeA());
        prototypes.put("B", new ConcretePrototypeB());
        prototypes.put("C", new ConcretePrototypeC());
    }

    /**
     * Returns the correct Prototype corresponding to the name.
     *
     * @param name, the class name of the Prototype
     * @return the correct Prototype corresponding to the name
     */
    public static Prototype getPrototype(String name) {
        if (!prototypes.containsKey(name))
            return null;
        return prototypes.get(name).clone();
    }
}
```

Then we can test this by taking in system input, instantiating the corresponding concrete 
`Prototype` object from the `Factory`, and printing out the `id` of the `Prototype`:

```
package com.algorithmhelper.softwareengineering.designpatterns.prototype;

import java.util.Scanner;

public class PrototypeTest {

    public static void main(String[] args) {
        Scanner in = new Scanner(System.in);

        while (in.hasNext()) {
            String name = in.next();

            if (name.equals("done"))
                break;

            Prototype prototype = Factory.getPrototype(name);

            if (prototype != null)
                System.out.println(prototype);
        }
    }
}
```

Then suppose we have the following input:

```
A B C D done
```

We get the expected output:

```
ConcretePrototypeA
ConcretePrototypeB
ConcretePrototypeC
```

And thus we have been able to successfully instantiate concrete `Prototype` objects by cloning
with the `clone` method instead of explicitly using the `new` keyword. 
