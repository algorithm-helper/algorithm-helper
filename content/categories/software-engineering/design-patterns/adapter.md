# Adapter

The adapter pattern is a design pattern used when a class has an incompatible interface. 
A typical problem could be the reuse of legacy components in a modern system. The components may 
take in incompatible parameters, or parameters in a different order, for example. 

The main approach is to wrap the incompatible class with an abstraction, which is the adapter class, 
that maps the use of the old component to what the new system expects. The client then calls the 
adapter's compatible methods which then uses the old component's methods. 

### Implementation

##### Java

For the following example, suppose that we have the legacy component `OldComponent`, which sums the 
values of an array of integers. However, suppose that in the new system, we are expecting to be
able to do these operations on a `List`.

Suppose that `NewComponentInterface` is the interface that we are expecting, to be able to perform
the operation on a `List`, not an array.

```
package com.algorithmhelper.designpatterns.adapter;

import com.algorithmhelper.datastructures.interfaces.List;

public interface NewComponentInterface {

    /**
     * Performs the operation on a List, and returns the result of the operation.
     *
     * @param list, the List object
     * @return the result of the operation on the list
     */
    int operation(List<Integer> list);
}
```

The `OldComponent` has the method `operation`, but it expects an array of integers:

```
package com.algorithmhelper.designpatterns.adapter;

public class OldComponent {

    /**
     * Sums the values of the array.
     *
     * @param array
     */
    public int operation(int[] array) {
        int sum = 0;
        for (int i : array)
            sum += i;
        return sum;
    }
}
```

Then to reuse the `OldComponent`, we create a class `OldComponentAdapter`, which takes in an 
`OldComponent` object as a parameter, and wraps the old `operation` method with the new one, which
expects a `List`, as required by the interface.

```
package com.algorithmhelper.designpatterns.adapter;

import com.algorithmhelper.datastructures.interfaces.List;

public class OldComponentAdapter implements NewComponentInterface {

    private OldComponent adaptee;

    /**
     * Initializes the OldComponentAdapter with the OldComponent.
     *
     * @param adaptee, the OldComponent being adapted
     */
    public OldComponentAdapter(OldComponent adaptee) {
        this.adaptee = adaptee;
    }

    /**
     * Performs the adapted operation (i.e. summing the values of the list).
     *
     * @param list, the List object
     * @return the sum of the values of the list
     */
    public int operation(List<Integer> list) {
        int[] array = new int[list.size()];
        for (int i = 0; i < list.size(); i++)
            array[i] = list.get(i);
        return adaptee.operation(array);
    }
}
```

Then when we actually have to use `operation` on a `List` of integers, we instantiate the 
`NewComponentInterface` with an `OldComponentAdapter` that wraps around a `OldComponent`:

```
package com.algorithmhelper.designpatterns.adapter;

import com.algorithmhelper.datastructures.interfaces.List;
import com.algorithmhelper.datastructures.lists.DynamicArray;

public class AdapterTest {

    public static void main(String[] args) {
        List<Integer> list = new DynamicArray<>();
        list.insertBack(1);
        list.insertBack(2);
        list.insertBack(3);

        NewComponentInterface newComponentInterface = new OldComponentAdapter(new OldComponent());
        System.out.println(newComponentInterface.operation(list));
    }
}
```
