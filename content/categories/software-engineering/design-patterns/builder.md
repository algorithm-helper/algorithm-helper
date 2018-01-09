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

```
package com.algorithmhelper.designpatterns.builder;

public class HouseDirector {

    private HouseBuilder houseBuilder;

    /**
     * Initializes a HouseDirector object with a HouseBuilder houseBuilder, then calls on the
     * houseBuilder to build the components of the House.
     *
     * @param houseBuilder, the HouseBuilder object
     */
    public HouseDirector(HouseBuilder houseBuilder) {
        this.houseBuilder = houseBuilder;
        buildHouse();
    }

    /**
     * Returns the House that has been build by the houseBuilder.
     *
     * @return the House that has been build by the houseBuilder
     */
    public House getHouse() {
        return houseBuilder.getHouse();
    }

    /**
     * Builds the windows, doors, rooms, and kitchen of the House.
     */
    private void buildHouse() {
        houseBuilder.buildWindows();
        houseBuilder.buildDoors();
        houseBuilder.buildRooms();
        houseBuilder.buildKitchen();
    }
}
```

The following is the `HouseBuilder` interface, from which the classes `ModernHouseBuilder` and
`FrenchHouseBuilder` will implement:

```
package com.algorithmhelper.designpatterns.builder;

public interface HouseBuilder {

    /**
     * Returns the finished House.
     *
     * @return the finished House
     */
    House getHouse();

    /**
     * Builds the windows of the House.
     */
    void buildWindows();

    /**
     * Builds the doors of the House.
     */
    void buildDoors();

    /**
     * Builds the rooms of the House.
     */
    void buildRooms();

    /**
     * Builds the kitchen of the House.
     */
    void buildKitchen();
}
```

The following is the `House` class itself, which specifies all of its various components like the 
`windows`, `doors`, `rooms`, and `kitchen`. We could imagine that in a more complex object, the
construction of these components would be much more involved:

```
package com.algorithmhelper.designpatterns.builder;

public class House {

    private String windows;
    private String doors;
    private String rooms;
    private String kitchen;

    /**
     * Sets the windows.
     *
     * @param windows
     */
    public void addWindows(String windows) {
        this.windows = windows;
    }

    /**
     * Sets the doors.
     *
     * @param doors
     */
    public void addDoors(String doors) {
        this.doors = doors;
    }

    /**
     * Sets the rooms.
     *
     * @param rooms
     */
    public void addRooms(String rooms) {
        this.rooms = rooms;
    }

    /**
     * Sets the kitchen.
     *
     * @param kitchen
     */
    public void addKitchen(String kitchen) {
        this.kitchen = kitchen;
    }

    /**
     * Prints out the result of the House.
     */
    public void printResult() {
        System.out.println("windows: " + windows);
        System.out.println("doors: " + doors);
        System.out.println("rooms: " + rooms);
        System.out.println("kitchen: " + kitchen);
        System.out.println();
    }
}
```

Then the `ModernHouseBuilder` class implements `HouseBuilder`, and only constructs the `House` 
object with "modern" components:

```
package com.algorithmhelper.designpatterns.builder;

public class ModernHouseBuilder implements HouseBuilder {

    private House house;

    /**
     * Initializes a ModernHouseBuilder object.
     */
    public ModernHouseBuilder() {
        house = new House();
    }

    /**
     * Returns the finished House.
     *
     * @return the finished House
     */
    public House getHouse() {
        return house;
    }

    /**
     * Builds the windows of the House.
     */
    public void buildWindows() {
        house.addWindows("modern windows");
    }

    /**
     * Builds the doors of the House.
     */
    public void buildDoors() {
        house.addDoors("modern doors");
    }

    /**
     * Builds the rooms of the House.
     */
    public void buildRooms() {
        house.addRooms("modern rooms");
    }

    /**
     * Builds the kitchen of the House.
     */
    public void buildKitchen() {
        house.addKitchen("modern kitchen");
    }
}
```

Then the `FrenchHouseBuilder` class implements `HouseBuilder`, and only constructs the `House` 
object with "French" components:

```
package com.algorithmhelper.designpatterns.builder;

public class FrenchHouseBuilder implements HouseBuilder {

    private House house;

    /**
     * Initializes a FrenchHouseBuilder object.
     */
    public FrenchHouseBuilder() {
        house = new House();
    }

    /**
     * Returns the finished House.
     *
     * @return the finished House
     */
    public House getHouse() {
        return house;
    }

    /**
     * Builds the windows of the House.
     */
    public void buildWindows() {
        house.addWindows("french windows");
    }

    /**
     * Builds the doors of the House.
     */
    public void buildDoors() {
        house.addDoors("french doors");
    }

    /**
     * Builds the rooms of the House.
     */
    public void buildRooms() {
        house.addRooms("french rooms");
    }

    /**
     * Builds the kitchen of the House.
     */
    public void buildKitchen() {
        house.addKitchen("french kitchen");
    }
}
```

To test our example, we have `BuilderTest`, which instantiates two `HouseDirector` objects, one of 
which builds a modern `House`, and the other builds a French `House`:

```
package com.algorithmhelper.designpatterns.builder;

public class BuilderTest {

    public static void main(String[] args) {
        HouseDirector directorModern = new HouseDirector(new ModernHouseBuilder());
        HouseDirector directorFrench = new HouseDirector(new FrenchHouseBuilder());

        House houseModern = directorModern.getHouse();
        House houseFrench = directorFrench.getHouse();

        houseModern.printResult();
        houseFrench.printResult();
    }
}
```

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
