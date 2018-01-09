# Composite

The composite pattern is a design pattern used for the recursive composition of an object such that
clients are able to treat individual objects and compositions the same way, and the composition
forms a recursive tree structure. A typical problem is that we need objects that represent both the 
"part" and the "whole". A common example is with arithmetic expresssions, where we have `Expression`
objects, from which we extend `Number` objects and `Operator` objects (such as `+`, `-`, `*`, and 
`/`). However, branching from `Operator` objects are `Expression` objects themselves, and thus
we have this recursive composition structure. Another common example is with files and directories. 
A directory contains files, but can also contain directories.

The main approach to the composite pattern is that we have an abstract base class 
`AbstractComponent` that specifies the behavior for all subclasses. For the purposes of the example,
we have a `BasicComponent` that represents the basic most version of the component. If this were a
folder structure, `BasicComponent` would represent a file, if this were an arithmetic expression, 
`BasicComponent` would represent a number. Then we have the `CompositeComponent` class, which is 
composed of `AbstractComponent` objects, whether as fields or in a list, each of which may be 
`CompositeComponent` objects themselves.

### Implementation

##### Java

We start off wth the `AbstractComponent`, which specifies an `operation`:

```
package com.algorithmhelper.softwareengineering.designpatterns.composite;

public interface AbstractComponent {

    /**
     * Performs some operation on the AbstractComponent.
     */
    void operation();
}
```

Then we have the following `BasicComponent`, which has a unique `id` and whose `operation` prints
out a message saying that the implementation is from `BasicComponent` with the `id`:

```
package com.algorithmhelper.softwareengineering.designpatterns.composite;

public class BasicComponent implements AbstractComponent {

    private static int globalID = 0;
    private int id = globalID++;

    /**
     * Performs some operation on the BasicComponent.
     */
    public void operation() {
        System.out.println("from BasicComponent with id " + id);
    }
}
```

Then we have the following `CompositeComponent`, which has a unique `id`, list of 
`AbstractComponent` objects, and `operation` that prints out a message saying that the 
implementation is from `CompositeComponent` with the `id`, and iterates over its list of 
`AbstractComponent` objects, calling their `operation` method:

```
package com.algorithmhelper.softwareengineering.designpatterns.composite;

import com.algorithmhelper.datastructures.interfaces.List;
import com.algorithmhelper.datastructures.lists.DynamicArray;

public class CompositeComponent implements AbstractComponent {

    private static int globalID = 0;
    private int id = globalID++;
    private List<AbstractComponent> components;

    /**
     * Initializes a CompositeComponent.
     */
    public CompositeComponent() {
        components = new DynamicArray<>();
    }

    /**
     * Inserts an AbstractComponent to the list of components.
     *
     * @param component, the AbstractComponent
     */
    public void addComponent(AbstractComponent component) {
        components.insertBack(component);
    }

    /**
     * Performs some operation on the CompositeComponent.
     */
    public void operation() {
        System.out.println("from CompositeComponent with id " + id);

        for (AbstractComponent component : components)
            component.operation();
    }
}
```

We can then test it by building up the following tree, let `C` denote `CompositeComponent` objects, 
and let `B` denote `BasicComponent` objects:

<img src="https://i.imgur.com/HvcK75F.png" alt="Composite" class="img-fluid">

Then we have:

```
package com.algorithmhelper.softwareengineering.designpatterns.composite;

public class CompositeTest {

    public static void main(String[] args) {
        AbstractComponent component0 = new BasicComponent();
        AbstractComponent component1 = new BasicComponent();
        AbstractComponent component2 = new BasicComponent();
        AbstractComponent component3 = new BasicComponent();
        AbstractComponent component4 = new BasicComponent();
        AbstractComponent component5 = new BasicComponent();

        CompositeComponent composite0 = new CompositeComponent();
        CompositeComponent composite1 = new CompositeComponent();
        CompositeComponent composite2 = new CompositeComponent();

        // Add component 3 and 4 to composite 2:
        composite2.addComponent(component3);
        composite2.addComponent(component4);

        // Add composite 2 and component 5 to composite 1:
        composite1.addComponent(composite2);
        composite1.addComponent(component5);

        // Add component 0, 1, 2 and composite 1 to composite 0:
        composite0.addComponent(component0);
        composite0.addComponent(component1);
        composite0.addComponent(composite1);
        composite0.addComponent(component2);

        composite0.operation();
    }
}
```

Which gives the expected output:

```
from CompositeComponent with id 0
from BasicComponent with id 0
from BasicComponent with id 1
from CompositeComponent with id 1
from CompositeComponent with id 2
from BasicComponent with id 3
from BasicComponent with id 4
from BasicComponent with id 5
from BasicComponent with id 2
```

And thus we have been able to build up a composite structure based on recursive composition of 
basic and composite components.
