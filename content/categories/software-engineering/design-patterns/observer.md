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

<script src="https://gist.github.com/eliucs/54fd7a12fbec42d1aa9f621caa1d88ff.js"></script>

The following is the `AbstractObserver` class:

<script src="https://gist.github.com/eliucs/e9ae8fec3182ccce2e440597671400b4.js"></script>

The following is the `ConcreteObserver` class:

<script src="https://gist.github.com/eliucs/bb296b6132b70971a0eb4bc0c51fa3e7.js"></script>

Then to test that this model works, we have one `Subject` object called `subject` and multiple 
`ConcreteObserver` objects get attached onto `subject`. Then we call `updateObservers` from on
`subject`:

<script src="https://gist.github.com/eliucs/b73d54bdfd34d92f9d1e9c686e852743.js"></script>

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
