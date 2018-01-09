# Class and Instance

Classes are a template for creating objects, and generally provide definitions for the fields and
methods of that object. They may contain, either explicitly or implicitly, certain default methods
that are implemented, either by the programmer or the compiler automatically, and these are: the 
constructor, which always runs when a new instance of this class is created and may take 
parameters, and the destructor, which always runs when this class is destroyed such as going out of
scope. In different languages, there are different class-specific methods that we can implement,
such as for C++, we have the constructor, copy constructor, copy assignment operator, move 
constructor, move assignment operator, and destructor. In Java for example, we have the 
constructor.

Instances, also used interchangably with objects, are concrete occurences of a class. The creation
of an instance is called instantiation, which may take parameters, and runs the constructor with 
those parameters defined in the class of the object. When that instance is destroyed, such as going
out of scope or explicitly being destroyed, then the destructor is called. 

### Example

The following is an example of a class definition:

```
package com.algorithmhelper.objectorientedprogramming.classinstance;

public class Class {

    private String name;
    private int value;

    /**
     * Constructor for the Class object.
     */
    public Class() {
        name = "default";
        value = 0;
    }

    /**
     * Overloaded constructor for the Class object.
     *
     * @param name, the name
     * @param value, the value
     */
    public Class(String name, int value) {
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

It has two fields `name` and `value`. It has two constructors: the first one is the default 
constructor when no arguments are passed to the constructor, then the field `name` is set to 
`default`, and the value is set to `0`. The second one is the overloaded constructor, so if the
constructor were to be called with a String `name` and integer `value` already, then the fields of
the class are set accordingly. We have a method that prints out the `name` and `value`. `Class` 
itself does not represent an object we can use, just a template for its instantiation, or creation. 

The following is a test program that actually creates an instance of `Class`:

```
package com.algorithmhelper.objectorientedprogramming.classinstance;

public class ClassTest {

    public static void main(String[] args) {
        Class obj1 = new Class();
        Class obj2 = new Class("John Smith", 100);

        obj1.method();
        obj2.method();
    }
}
```

The objects `obj1` and `obj2` are actual instances of the class `Class`, and thus they have data 
specific to them. As a visualization, `obj1.method()` prints out `name: default value: 0` and 
`obj2.method()` prints out `name: John Smith value: 100`, as expected.
