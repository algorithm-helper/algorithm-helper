# Observer

The observer pattern is a design pattern used to model the dependencies between one object that 
contains some data or state and its many dependents that get updated when that data or state 
changes. A typical problem could be that we need to be able to monitor changes or updates to the 
state of some object, also known as the subject, in real-time without breaking encapsulation. That 
is, we do not want the dependent class to need to manually call a getter on the subject, directly 
access the internal data of the subject, or need to have a loop that continuously runs throughout
the executation of a program to query the subject's data for changes. 

The main approach behind the observer pattern is that we define objects that are holders of data or 
state from which other objects need to query for changes, in a class `Subject`. All classes that 
monitor for changes extend an abstract class `AbstractObserver`. The `Subject` has a list or 
possibly a map of `AbstractObserver` objects, and the `AbstractObserver` has an abstract method 
called `update`, which updates the concrete observer with the given data. Whenever the `Subject` 
changes, it updates some or all of its `AbstractObserver` objects by iterating through its list of 
`AbstractObserver` objects, calling their `update` method.

Under this model, we are clearly able to abstract away the behavior of other classes needing to be 
subjects (`SubjectA`, `SubjectB`, `SubjectC`, etc.) by extending the `Subject` class and overriding
any of the methods from `Subject` if necessary. Similarly, we are able to abstract away the
behavior of classes needing to be observers (`ConcreteObserverA`, `ConcreteObserverB`, 
`ConcreteObserverC`, etc.) by extending the `AbstractObserver` class and implementing the necessary 
methods. 
 
### Implementation

##### Java

The following is the `Subject` class, which is able to attach and detach `AbstractObserver` objects
to its list `observers`, as well as :

```
package com.algorithmhelper.designpatterns.observer;

import com.algorithmhelper.datastructures.interfaces.List;
import com.algorithmhelper.datastructures.lists.DynamicArray;

public class Subject<State> {

    private List<AbstractObserver> observers = new DynamicArray<>();
    protected State state;

    /**
     * Attaches the AbstractObserver observer to the list of observers.
     *
     * @param observer, the AbstractObserver object
     */
    public void attach(AbstractObserver observer) {
        observers.insertBack(observer);
    }

    /**
     * Detaches the AbstractObserver observer from the list of observers.
     *
     * @param observer, the AbstractObserver object
     */
    public void detach(AbstractObserver observer) {
        int i = 0;
        for (AbstractObserver ob : observers) {
            if (ob == observer)
                break;
            i++;
        }
        observers.remove(i);
    }

    /**
     * Updates all of the AbstractObserver objects in the list of observers.
     */
    public void updateObservers() {
        for (AbstractObserver ob : observers)
            ob.update(this);
    }

    /**
     * Returns the state of the Subject.
     *
     * @return the state of the Subject
     */
    public State getState() {
        return state;
    }

    /**
     * Sets the state of the Subject.
     *
     * @param state, the State
     */
    public void setState(State state) {
        this.state = state;
    }
}
```

The following is the `AbstractObserver` class:

```
package com.algorithmhelper.designpatterns.observer;

public interface AbstractObserver<State> {

    /**
     * Updates the AbstractObserver.
     */
    void update(Subject<State> subject);
}
```

The following is the `ConcreteObserver` class:

```
package com.algorithmhelper.designpatterns.observer;

public class ConcreteObserver<State> implements AbstractObserver<State> {

    private String name;

    /**
     * Initializes the ConcreteObserver.
     */
    public ConcreteObserver(String name) {
        this.name = name;
    }

    /**
     * Updates the ConcreteObserver.
     */
    public void update(Subject<State> subject) {
        System.out.println("update from ConcreteObserver: " + name);
    }
}
```

Then to test that this model works, we have one `Subject` object called `subject` and multiple 
`ConcreteObserver` objects get attached onto `subject`. Then we call `updateObservers` from on
`subject`:

```
package com.algorithmhelper.designpatterns.observer;

public class ObserverTest {

    private class State {
        // Anything can go in here to control State...
    }

    public static void main(String[] args) {
        Subject<State> subject = new Subject<>();

        AbstractObserver<State> ob1 = new ConcreteObserver<>("1");
        AbstractObserver<State> ob2 = new ConcreteObserver<>("2");
        AbstractObserver<State> ob3 = new ConcreteObserver<>("3");

        subject.attach(ob1);
        subject.attach(ob2);
        subject.attach(ob3);

        subject.updateObservers();
    }
}
```

We get the expected output:

```
update from ConcreteObserver: 1
update from ConcreteObserver: 2
update from ConcreteObserver: 3
```

The observers were able to automatically recieve the update from the `Subject`. It is clear how 
we could use this mechanism if we wanted to introduce `State`: inside the `update` method of the 
`ConcreteObserver` (or any other class that extends `AbstractObserver`), we can "pull" the `state`
from the `Subject` by calling the method `getState` and using it. 
