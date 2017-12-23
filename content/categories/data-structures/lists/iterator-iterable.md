# Iterator / Iterable

An iterator is an abstract data type that is used to iterate through the elements of a list in a 
manner that is hidden to the client, and implements the operations `hasNext` and `next`. The 
operation `hasNext` checks that the iterator has not already reached the end of the data structure, 
and the operation `next` returns the next element, if `hasNext` is `true`.

An iterable refers to classes that implement the `iterator` method, which is a method that returns 
an iterator to the class, for whatever kind of data structure it happens to be, and whatever 
behavior the iterator has. This will be different for different programming languages. For example,
in Java, classes that implement the `Iterable` class, must implement the method `iterator`, which 
returns an `Iterator` object.

### Visualization

For example, we could have an iterator for a linked list:

```
// Suppose we had the following linked list:

head
[1] -> [2] -> [5] -> [7] -> [3] -> [9] -|| null

// The iterator starts at the head:
// hasNext():
true

// next():
1

// next():
2

// next():
5

// hasNext():
true

// next():
7

// next():
3

// next():
9

// hasNext():
false
```

### Implementation

##### Java

```
import java.util.Iterator;

public class ExampleClass<T> implements Iterable<T> {

    // ...

    public Iterator<T> iterator() {
        
        // ...

        @Override
        public boolean hasNext() {
            // ...
        }

        @Override
        public T next() {
            // ...
        }
    }
}
```