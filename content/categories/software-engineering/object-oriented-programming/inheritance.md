# Inheritance

Inheritance refers to when a subclass is based on a superclass, and is able to acquire certain
fields and methods from it. We use the term "extends" to say that a subclass that inherits from a 
superclass. When a subclass extends a superclass, it acquire fields and methods from the superclass,
as well as has fields and methods of its own. Methods in the subclass can override methods from the
superclass if they have the same name and take in the same types or parameters. Inheritance forms
what is called an "is-a" relationship, that is, a subclass "is an" instance of a superclass. Note
that the inverse is not true, i.e. a superclass is not an instance of the subclass. For example,
if we were to have the superclass `Vehicle` and the subclasses `Car` and `Motorcycle`, then we can
say that a `Car` is a `Vehicle`, but a `Vehicle` is not necessarily a `Car`.

One of the useful things about inheritance is that we typically have access to the superclass. In
Java for example, this is via the `super` keyword. 

### Example

The following is an example of inheritance. We start off with the class `SuperClass` from which 
the classes `SubClassA` and `SubClassB` will inherit from:

```
package com.algorithmhelper.objectorientedprogramming.inheritance;

public class SuperClass {

    private String name;
    private int value;

    /**
     * Constructor for the SuperClass object.
     */
    public SuperClass() {
        name = "default";
        value = 0;
    }

    /**
     * Overloaded constructor for the SuperClass object.
     *
     * @param name, the name
     * @param value, the value
     */
    public SuperClass(String name, int value) {
        this.name = name;
        this.value = value;
    }

    /**
     * Method that prints out the name and value.
     */
    public void method() {
        System.out.println("name: " + name + " value: " + value);
    }
}
```

The class `SubClassA` inherits from `SuperClass`, meaning that we have access to the superclass
object through the keyword `super`. Thus to be able to set the `name` and `value` fields in the
superclass, we can call the superclass constructor. As usual, the constructor can be overloaded
with different parameters, and also call the other superclass constructor:

```
package com.algorithmhelper.objectorientedprogramming.inheritance;

public class SubClassA extends SuperClass {

    private int valueA;

    /**
     * Constructor for the SubClassA object.
     */
    public SubClassA() {
        super();
        valueA = 0;
    }

    /**
     * Overloaded constructor for the SubClassA object.
     *
     * @param name, the name
     * @param value, the value
     */
    public SubClassA(String name, int value, int valueA) {
        super(name, value);
        this.valueA = valueA;
    }
}
```

Note that `SubClassA` does not have `method`. However, because it inherits from method, we have
access to the `method` in `SuperClass`:

```
package com.algorithmhelper.objectorientedprogramming.inheritance;

public class InheritanceTest1 {

    public static void main(String[] args) {
        SubClassA obj3 = new SubClassA();
        SubClassA obj4 = new SubClassA("Mary Doe", 200, 100);

        obj3.method();
        obj4.method();
    }
}
```

And when run, this gives the output:

```
name: default value: 0
name: Mary Doe value: 200
```

With `SubClassB`, it is very similar to `SubClassA` except that we override `method` from the
`SuperClass`. This allows us to give `SubClassB` its own implementation of `method`, which in this
example, just prints out its `valueB` field: 

```
package com.algorithmhelper.objectorientedprogramming.inheritance;

public class SubClassB extends SuperClass {

    private int valueB;

    /**
     * Constructor for the SubClassB object.
     */
    public SubClassB() {
        super();
        valueB = 0;
    }

    /**
     * Overloaded constructor for the SubClassB object.
     *
     * @param name, the name
     * @param value, the value
     */
    public SubClassB(String name, int value, int valueB) {
        super(name, value);
        this.valueB = valueB;
    }

    /**
     * Overrided method that prints out the valueB.
     */
    public void method() {
        System.out.println("valueB: " + valueB);
    }
}
```

Then to see that the `method` implementation has been overriden:

```
package com.algorithmhelper.objectorientedprogramming.inheritance;

public class InheritanceTest2 {

    public static void main(String[] args) {
        SubClassB obj1 = new SubClassB();
        SubClassB obj2 = new SubClassB("Mary Doe", 200, 100);

        obj1.method();
        obj2.method();
    }
}
```

Which gives the output:

```
valueB: 0
valueB: 100
```