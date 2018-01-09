# Iterator

The iterator pattern is a design pattern used to provide a way for clients to access sequentially
or traverse through a container of elements, without exposing the internal structure behind the 
container. A typical example could be if we had container class that did not support random access
to elements of the container, such as with a stack. If we want a string representation of the 
stack, such as if we had a `toString` class, we would not want to `pop` out the elements one by one,
and then `push` them back.

Furthermore, it helps with better encapsulation of the data structure. If we had a dynamic array,
the `DynamicArray` class is relying on the invariant that we only double the size when it is full.
But if we had direct access to the array backend of the dynamic array, we could tamper with it, 
delete or add elements at various indices causing it to resize unnecessarily. 

We do not want to break encapsulation of the data structure, and so the main approach behind the 
iterator is to define an object in the class of the data structure called an `Iterator`, that 
traverses through each element, being able to go to the next element and return the current `item`
at a particular point in the traversal. In Java for example, all classes that implement the 
`Iterable` interface must implement the `iterator` method, which returns an `Iterator`. The 
`Iterator` has two methods, `hasNext` and `next`, which return true if we have not reached the end 
of the traversal and false otherwise, and returns the next `item` in the traversal if `hasNext` is
true, respectively.

### Implementation

##### Java

In the following example, suppose that we have a modified first-in-first-out (FIFO) list, except 
that we do not have any method to return or peek at the last element (such as with a `pop` or `peek` 
method). Then, it would effectively be impossible to actually access the data inside the list. Note
that this data structure is also known as a bag, where we can insert elements into the bag, and 
perform no other operation except iterating over its elements. 

Since it implements `Iterable`, we must provide the `iterator` method, and return an `Iterator`.
The `Iterator` then must have methods `hasNext` and `next` implemented:

```
package com.algorithmhelper.designpatterns.iterator;

import java.util.Iterator;
import java.util.NoSuchElementException;

public class FIFOList implements Iterable<Integer> {

    private Node first;

    private class Node {
        int item;
        Node next;

        Node(int item, Node next) {
            this.item = item;
            this.next = next;
        }
    }

    /**
     * Initializes an empty FIFOList.
     */
    public FIFOList() {}

    /**
     * Inserts the item to the front of the FIFOList.
     *
     * @param item, the item to be inserted
     */
    public void insertFront(int item) {
        if (first == null)
            first = new Node(item, null);
        else
            first = new Node(item, first);
    }

    /**
     * Returns an Iterator to the elements of the FIFOList.
     *
     * @return an Iterator to the elements of the FIFOList
     */
    public Iterator<Integer> iterator() {
        return new Iterator<Integer>() {
            private Node current = first;

            @Override
            public boolean hasNext() {
                return current != null;
            }

            @Override
            public Integer next() {
                if (!hasNext()) {
                    throw new NoSuchElementException("iterator does not have next element");
                }

                int item = current.item;
                current = current.next;
                return item;
            }
        };
    }
}
```

We can now test this data structure by inserting items into it, and using the Java enhanced `for`
loop to iterate over the items of the `FIFOList`, printing out each item:

```
package com.algorithmhelper.designpatterns.iterator;

public class IteratorTest {

    public static void main(String[] args) {
        FIFOList list = new FIFOList();
        for (int i = 0; i < 5; i++)
            list.insertFront(i);

        for (Integer i : list)
            System.out.println(i);
    }
}
```

Which gives the expected output:

```
4
3
2
1
0
```

And thus, we have been able to successfully iterate over a collection without exposing the back-end
structure of the collection itself. 
