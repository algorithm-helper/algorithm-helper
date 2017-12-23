# Comparator / Comparable

A comparator is an abstract data type for comparing two Comparables. In Java for example, classes 
that implement the Comparator interface must implement the method `compare`, which takes two Objects 
as parameters and returns -1 if the first is less than the second, 0 if they are equal, and 1 if the 
first item is greater than the second, in whatever way that may be defined.

A comparable is an abstract data type for comparing an Object itself with another Object. In Java 
for example, classes that implement the Comparable interface must implement the method `compareTo`, 
which takes an Object as a parameter and returns -1 if this Object is less than that Object, 0 if 
they are equal, and 1 if that object is greater than this Object, in whatever way that may be 
defined.

In the context of comparison-based sorting algorithms, we can use comparators, or an array of 
comparables to be able to sort based on any particular order of our choosing.

### Example

The following is pseudocode for a class that implements the Comparator interface:

```
public SomeClass<T> implements Comparator<T> {

  // ...

  @Override
  public int compare(Object a, Object b) {
    // ...

    if (a is less than b)
      return -1;
    else if (a is greater than b)
      return 1;
    return 0;
  }
}
```

The following is pseudocode for a class that implements the Comparable 
interface:

```
public SomeClass<T> implements Comparable<T> {

  // ...

  @Override
  public int compareTo(Object that) {
    // ...

    if (this is less than that)
      return -1;
    else if (this is greater than that)
      return 1;
    return 0;
  }
}
```
