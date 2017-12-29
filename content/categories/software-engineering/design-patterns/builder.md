# Builder

The builder pattern is a design pattern for the construction of complex objects by separating the 
construction process from its representation, and also to parse the representation of complex 
objects. A typical problem would be that we need to construct an object that is an aggregate of 
many complex parts, and there is not enough control if we wanted to vary the construction if we 
had the entire construction process in one class or method. Unlike the factory pattern, which solves
a similar problem, namely the construction of objects, builders are much more flexible for more 
parameters and facilitate the construction of complex composites, whereas factories, for the most
part, produce objects in one step and serve as wrappers around the constructor of an object.

The main idea is that we separate the process of parsing the object (perhaps from some external 
file), and its construction. We have a class called the `Director`, which has a reference to a 
`Builder` interface. While a user calls on the `Director` to build the object, the `Director` does
not directly construct the object, it refers to the `Builder` to construct the various components 
of the object, and assemble the components together, and return the finished result. We have
different `ConcreteBuilder` classes (`ConcreteBuilderA`, `ConcreteBuilderB`, `ConcreteBuilderC`, 
etc.) for building different products.

### Implementation

##### Java

For the following example, we will consider the context of building a `House` object. The class
`HouseDirector` serves as the director class, which contains a reference to a `HouseBuilder`
interface:

<script src="https://gist.github.com/eliucs/1582294b8ee98bea1b73835cb1a865b3.js"></script>

The following is the `HouseBuilder` interface, from which the classes `ModernHouseBuilder` and
`FrenchHouseBuilder` will implement:

<script src="https://gist.github.com/eliucs/0c7dd44dec07be946f0821ae472157b0.js"></script>

The following is the `House` class itself, which specifies all of its various components like the 
`windows`, `doors`, `rooms`, and `kitchen`. We could imagine that in a more complex object, the
construction of these components would be much more involved:

<script src="https://gist.github.com/eliucs/6c7cc8069e83f9590cb89aea28e0242e.js"></script>

Then the `ModernHouseBuilder` class implements `HouseBuilder`, and only constructs the `House` 
object with "modern" components:

<script src="https://gist.github.com/eliucs/c400421f44d87675965f990379df3b7d.js"></script>

Then the `FrenchHouseBuilder` class implements `HouseBuilder`, and only constructs the `House` 
object with "French" components:

<script src="https://gist.github.com/eliucs/0d389ef2245cc04cac7db71191637231.js"></script>

To test our example, we have `BuilderTest`, which instantiates two `HouseDirector` objects, one of 
which builds a modern `House`, and the other builds a French `House`:

<script src="https://gist.github.com/eliucs/d5b8b483d763fb7eddcd5793c5412c7f.js"></script>

When we print out the results of each respective `House` object through the method `printResult`,
we get the expected output:

```
windows: modern windows
doors: modern doors
rooms: modern rooms
kitchen: modern kitchen

windows: french windows
doors: french doors
rooms: french rooms
kitchen: french kitchen
```

And thus we successfully separated the construction of the object from its representation.
