# Introduction

The topic in this section is lists, and these data structures are primarily concerned with linear 
data structures, that is, a linear sequence of items, from which we can perform operations like 
adding, removing, or peeking at the first or last element. The following data structures are going 
to be covered in this topic: linked lists, double ended linked lists, dynamic arrays, stacks, 
queues, double ended queues, and the iterator/iterable.

### Terminology

We first look at some terminology and definitions with lists.

Lists are computer representations of the mathematical object of a sequence, which is a collection 
of objects where there may be repeated values, and the ordering in which they are arranged is 
relevant.

From Wikipedia:

> [Sequence](https://en.wikipedia.org/wiki/Sequence) - a sequence is an enumerated collection of 
objects in which repetitions are allowed. Like a set, it contains members (also called elements, or 
terms). The number of elements (possibly infinite) is called the length of the sequence. Unlike a 
set, order matters, and exactly the same elements can appear multiple times at different positions 
in the sequence.

A list is an abstract data type that represents a countable number of values, where repeated values 
are allowed, and the ordering in which the values are arranged. Some properties we may want to 
define on a list is `size`/`length`, which represents the number of elements contained in the list. 
We may want to define `head`/`first`, which is a reference to the first element in the list, or
similarly `tail`/`last`, which is a reference to the last element in the list.

From Wikipedia:

> [List](https://en.wikipedia.org/wiki/List_%28abstract_data_type%29) - a list or sequence is an 
abstract data type that represents a countable number of ordered values, where the same value may 
occur more than once. An instance of a list is a computer representation of the mathematical concept 
of a finite sequence; the (potentially) infinite analog of a list is a stream. Lists are a basic 
example of containers, as they contain other values. If the same value occurs multiple times, each 
occurence is considered a distinct item.

In general, lists are a type of linear collection. A collection, or container, is simply a grouping 
of a number of data items. It is linear because list data structure implementations either have 
elements referencing the next element in a "chain-like" structure, or use an array.

From Wikipedia:

> [Collection](https://en.wikipedia.org/wiki/Collection_%28abstract_data_type%29) - a collection or 
container is a grouping of some variable number of data items (possibly zero) that have some shared 
significance to the problem being solved and need to be operated upon together in some controleld 
fashion. Generally, the data items will be of the same type or, in languages supporting inheritance,
derived from some common ancestor type.

We consider iterator/iterable, which is an abstract data structure used within these list structures 
concerned with iterating through the elements of a list/collection in a manner hidden to the client.

### Properties

We give a high-level overview of the properties to expect with list structures. List structures are 
implemented either with nodes or an array. 

##### With Nodes

When lists are implemented with nodes, the list points to a starting node called the `first` (and we 
may also have another pointer to the ending node called the `last`), and each node in the list 
points to the subsequent node in the list. Nodes usually have some field `item` which contains some 
data associated with that node, and a pointer `next` to the next node in the list (and we may also 
have a pointer `prev` which points to the previous node in the list), and they may have more fields. 
Thus with nodes, lists are recursively defined. 

Example of a Node (Java):

```
class Node {
    Object item;
    Node next;
    // other fields may go here ...
}
```

It is clear what differentiates this "chain-like" structure of nodes with say, an array. While 
accessing an element in an array, we would index into it in $O(1)$ time, conceptually with a list 
like this, we must iterate through the nodes one by one, until we find the node with the desired 
value, which is done in $O(N)$ time.

However, since we may have the `first` and `last` pointer, we would be able to directly access the 
value associated with the first and last elements of the list in $O(1)$ time, which proves itself to 
be useful in stacks and queues, for example.

##### With Arrays

When lists are implemented with arrays, we allocate an array of some size to hold the elements, and 
have a pointer `index` to the current index of the array in which we are inserting the next element. 
Starting from `index` being 0, we would want to increment `index` by 1 every time we add an element 
into the array. We would want a property `capacity` that represents the total size of the array, in 
other words, the total number of elements we can add into the array.

This raises some obvious problems. When we initialize an array, it is of fixed size, so how would we 
be able to add a number of elements beyond its `capacity`? Intuitively, when the array gets full, we 
would want to create a larger array and copy elements over.

For example:

```
// Original array
 ---- ---- ---- ----
| a1 | a2 | a3 | a4 |
 ---- ---- ---- ----

// Copy the elements over to larger array
 ---- ---- ---- ---- ---- ---- ---- ----
| a1 | a2 | a3 | a4 |    |    |    |    |
 ---- ---- ---- ---- ---- ---- ---- ----

// Delete the original array
```

This has implications on time complexity, and also begs the question of the best array resizing 
strategy, because not only should we increase the size of the array when it gets full, but also 
decrease the size of the array when the number of elements in it is small, to avoid using up large 
amounts of memory. This is all discussed in the article on 
[Amortization](/categories/data-structures/lists/amortization).

### Operations

There are several operations in general that we would use with list structures, although within 
specific ones like stacks or queues, they may not be conventionally named the same.

The operation `insert` adds a new element to the list, and we will consider this to mean adds to an 
arbitrary position within the list. The operation `insertFront` adds a new element to the start of 
the list, and the operation `insertBack` adds a new element to the end fo the list. Similarly, we 
have operations `remove`, `removeFront`, and `removeBack`, which removes an element from an 
arbitrary position, from the start of the list and from the back of the list, respectively.

We would want the operation `get` to retrieve the value of an element in the list at some arbitrary 
position, as well as `peekFront` and `peekBack` to retrieve the value of the element at the start 
and end of the list respectively, without deleting the element.

It may be useful to have operations like `max` and `min` which get the maximum and minimum values 
(in whatever way they are defined) respectively.

### Implementation

The following provides the interface for the `List` class, from which the `LinkedList`, 
`DynamicArray`, and `DoubleEndedLinkedList` classes will implement.

##### Java

```
package com.algorithmhelper.datastructures.interfaces;

public interface List<T> extends Iterable<T> {

    /**
     * Returns true if the List contains no elements, otherwise false.
     *
     * @return true if the List contains no elements, otherwise false
     */
    boolean isEmpty();

    /**
     * Returns the number of elements contained in the List.
     *
     * @return the number of elements contained in the List
     */
    int size();

    /**
     * Returns the element at the specified index in the List.
     *
     * @param i, the index into the List
     * @return the element at index i in the List
     */
    T get(int i);

    /**
     * Inserts the item at the specified index in the List.
     *
     * @param item, the item to be inserted
     * @param i, the index into the List
     */
    void insert(int i, T item);

    /**
     * Inserts the item to the front of the List.
     *
     * @param item, the item to be inserted
     */
    void insertFront(T item);

    /**
     * Inserts the item to the back of the List.
     *
     * @param item, the item to be inserted
     */
    void insertBack(T item);

    /**
     * Removes the item at the specified index in the List.
     *
     * @param i, the index into the List
     */
    T remove(int i);

    /**
     * Removes the item at the front of the List, and returns it.
     *
     * @return the item at the front of the List
     */
    T removeFront();

    /**
     * Removes the item at the back of the List, and returns it.
     *
     * @return the item at the back of the List
     */
    T removeBack();

    /**
     * Returns the item at the front of the List.
     *
     * @return the item at the front of the List
     */
    T peekFront();

    /**
     * Returns the item at the back of the List.
     *
     * @return the item at the back of the List
     */
    T peekBack();
}
```
