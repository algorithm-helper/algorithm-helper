# Dynamic Array

A dynamic array, also called a vector or dynamically resizing array, is a linear data structure 
using an array. They overcome the problem of having arrays being of fixed size by copying the 
contents of the array into a larger array once the original has become full, or into a smaller array 
once elements get removed at a certain point, to avoid using up large amounts of memory. A dynamic 
array has an array back-end and an index, which represents the number of elements in the array, and 
is incremented every time an element is inserted and decremented every time an element is removed. 
This index also represents the next index location in the array to insert.

### Resizing

One of the concerns with the array is resizing is a question of when it becomes full, how much do 
we resize it by? Consider the naive implementation, where every time a new element is inserted, the 
elements of the original array are copied over to an array of size 1 larger. The problem with this 
is that this would mean that because the entire array needs to be copied each time, this operation 
is done in $O(N)$ time. Moreover, when elements get removed from the array, there is no mechanism to 
make the array shrink to save space.

We can amortize the cost of inserting (read more about this in the article on 
[Amortization](/categories/data-structures/lists/amortization)). The resizing strategy is to double 
the size of the array when it becomes full. Consider $N$ number of insertions. For insertion, this 
works because the cost of the doubling has been amortized overall the $N$ insertions. We only have
to double $logN$ times. So the total cost of the insertion becomes:

$= O(2^0 + 2^1 + ... + 2^{logN})$

$= O(N)$

But this is the total cost over $N$ elements. So per element it becomes:

$= O(N)/N$

$= O(1)$

Now we consider when elements get removed. The naive implementation of deletion is to never shrink 
the array when elements are removed, or to halve the size of the array once the array becomes half 
full. First, this wastes an unnecessary amount of space, and second, consider what happens when we 
do a number of insertions and deletions of one element at example when the array is half full.
Then each operation causes the data structure to be repeatedly doubled and halved, which take 
uncessary $O(N)$ time, each time. To avoid situations like this, the array size will be halved once 
the array is a quarter full.

### Visualization

The following visualizes the state of the array, starting from an empty array 
of size 1:

```
// Starting array:
[  ]

// Insert a1:
[a1]

// Insert a2, by first doubling the size of the array:
[a1][a2]

// Insert a3, by first doubling the size of the array:
[a1][a2][a3][  ]

// Insert a4:
[a1][a2][a3][a4]

// Insert a5, by first doubling the size of the array:
[a1][a2][a3][a4][a5][  ][  ][  ]

// Insert a6:
[a1][a2][a3][a4][a5][a6][  ][  ]

// Insert a7:
[a1][a2][a3][a4][a5][a6][a7][  ]

// Remove last element:
[a1][a2][a3][a4][a5][a6][  ][  ]

// Remove last element:
[a1][a2][a3][a4][a5][  ][  ][  ]

// Remove last element:
[a1][a2][a3][a4][  ][  ][  ][  ]

// Remove last element:
[a1][a2][a3][  ][  ][  ][  ][  ]

// Remove last element, then halve the size of the array since it is 
// only a quarter full:
[a1][a2][  ][  ]
```

### Operations

Vectors use the following operations:

- `get`
    - Given a particular valid index `i` (within 0 and the size of the dynamic 
    array), retrieve the `item` at that index into the array.
- `insert`
    - Given a particular valid index `i`, insert the new element at that 
    position by shifting all elements in the array at `i` to the right, resize 
    the array if necessary. While inserting at the front or back (when `i=0` or 
    `i=n-1`, respectively), `insertFront` or `insertBack` could just be called 
    instead.
- `insertFront`
    - Insert the element at index 0 by shifting all elements from index 0 over 
    to the right, and then assigning index 0 to be the new element, resize the 
    array if necessary.
- `insertBack`
    - Insert the element at index `n`, then incrementing `n`, resize the 
    array if necessary.
- `remove`
    - Given a particular index `i`, remove the element at that position by 
    shifting all elements from index `i+1` to the left, and then decrement `n`,
    resize the array if necessary.
- `removeFront`
    - Remove the element at the front of the dynamic array by shifting all 
    elements in the array from index 1 over to the left, and then decrement `n`, 
    resize the array if necessary.
- `removeBack`
    - Remove the element at the end of the dynamic array by decrementing `n`, 
    resize the array if necessary.
- `peekFront`
    - Return the `item` at index 0.
- `peekBack`
    - Return the `item` at index `n-1`.

It is clear that while we can retrieve elements at particular indices, and perform operations on the 
end of the array efficiently in $O(1)$ time since we can conveniently just increment and decrement 
`n`, other operations like inserting or removing an element at an arbitrary position in the array 
are done in $O(N)$ time since they require shifting over elements in the array. Insertion or 
removing the first item is even worse, as we need to shift the entire array's contents, also in 
$O(N)$ time.

### Implementations

##### Java

```
package com.algorithmhelper.datastructures.lists;

import java.util.Iterator;
import java.util.NoSuchElementException;
import com.algorithmhelper.datastructures.interfaces.List;

public class DynamicArray<T> implements List<T> {

    private T[] arr;
    private int n;

    /**
     * Initializes an empty DynamicArray.
     */
    public DynamicArray() {
        arr = (T[]) new Object[1];
        n = 0;
    }

    /**
     * Returns true if this DynamicArray contains no elements, otherwise false.
     *
     * @return true if this DynamicArray contains no elements, otherwise false
     */
    public boolean isEmpty() {
        return n == 0;
    }

    /**
     * Returns the number of elements contained in the DynamicArray.
     *
     * @return the number of elements contained in the DynamicArray
     */
    public int size() {
        return n;
    }

    /**
     * Resizes the DynamicArray arr field to newSize.
     *
     * @param newSize, the new size of the arr
     * @throws IllegalArgumentException if newSize <= 0
     */
    private void resize(int newSize) {
        if (newSize <= 0)
            throw new IllegalArgumentException("resize with invalid newSize");

        T[] temp = (T[]) new Object[newSize];
        for (int i = 0; i < n; i++)
            temp[i] = arr[i];
        arr = temp;
    }

    /**
     * Returns the element at the specified index in the DynamicArray.
     *
     * @param i, the index into the DynamicArray
     * @return the element at index i in the DynamicArray
     * @throws IndexOutOfBoundsException if i is greater or equal to the length of the DynamicArray
     *         or a negative number
     */
    public T get(int i) {
        if (i >= n || i < 0)
            throw new IndexOutOfBoundsException("get index out of bounds");
        return arr[i];
    }

    /**
     * Inserts the item at the specified index in the DynamicArray.
     *
     * @param i, the index into the DynamicArray
     * @param item, the item to be inserted
     * @throws IllegalArgumentException if the item is null
     * @throws IndexOutOfBoundsException if i is greater or equal to the length of the DynamicArray
     *         or a negative number
     */
    public void insert(int i, T item) {
        if (item == null)
            throw new IllegalArgumentException("insert with null item");
        if (i >= n || i < 0)
            throw new IndexOutOfBoundsException("insert index out of bounds");

        if (n == arr.length)
            resize(2 * arr.length);

        for (int j = n; j > i; j--) {
            arr[j] = arr[j-1];
        }
        arr[i] = item;
    }

    /**
     * Inserts the item to the front of the DynamicArray, but if the arr exceeds its capacity, then
     * double the size of the arr.
     *
     * @param item, the item to be inserted
     * @throws IllegalArgumentException if the item is null
     */
    public void insertFront(T item) {
        if (item == null)
            throw new IllegalArgumentException("insertFront with null item");

        if (n == arr.length)
            resize(2 * arr.length);
        for (int i = n; i > 0; i--) {
            arr[i] = arr[i-1];
        }
        arr[0] = item;
        n++;
    }

    /**
     * Inserts the item to the back of the DynamicArray, but if the arr exceeds its capacity, then
     * double the size of the arr.
     *
     * @param item, the item to be inserted
     * @throws IllegalArgumentException if the item is null
     */
    public void insertBack(T item) {
        if (item == null)
            throw new IllegalArgumentException("insertFront with null item");

        if (n == arr.length)
            resize(2 * arr.length);
        arr[n++] = item;
    }

    /**
     * Removes the item at the specified index in the DynamicArray, and returns it, but if the arr
     * is below a quarter of the arr capacity, halve the arr size
     *
     * @param i, the index into the DynamicArray
     * @throws IndexOutOfBoundsException if i is greater or equal to the length of the DynamicArray
     *         or a negative number
     */
    public T remove(int i) {
        if (i >= n || i < 0)
            throw new IndexOutOfBoundsException("remove index out of bounds");

        T item = arr[i];

        for (int j = i; j < n-1; j++)
            arr[i] = arr[i+1];
        n--;
        if (n > 0 && n == arr.length/4)
            resize(arr.length/2);
        return item;
    }

    /**
     * Removes the item at the front of the DynamicArray, and returns it, but if the arr is below a
     * quarter of the arr capacity, halve the arr size
     *
     * @return the item at the top of the DynamicArray
     * @throws NoSuchElementException if this DynamicArray is empty
     */
    public T removeFront() {
        if (isEmpty())
            throw new NoSuchElementException("removeBack from empty DynamicArray");

        T item = arr[0];
        for (int i = 0; i < n-1; i++)
            arr[i] = arr[i+1];
        arr[n-1] = null;
        n--;
        if (n > 0 && n == arr.length/4)
            resize(arr.length/2);
        return item;
    }

    /**
     * Removes the item at the back of the DynamicArray, and returns it, but if the arr is below a
     * quarter of the arr capacity, halves the arr size.
     *
     * @return the item at the top of the DynamicArray
     * @throws NoSuchElementException if this DynamicArray is empty
     */
    public T removeBack() {
        if (isEmpty())
            throw new NoSuchElementException("removeBack from empty DynamicArray");
        T item = arr[--n];
        arr[n] = null;
        if (n > 0 && n == arr.length/4)
            resize(arr.length/2);
        return item;
    }

    /**
     * Returns the item at the front of the DynamicArray.
     *
     * @return the item at the front of the DynamicArray
     * @throws NoSuchElementException if this DynamicArray is empty
     */
    public T peekFront() {
        if (isEmpty())
            throw new NoSuchElementException("peek from empty DynamicArray");
        return arr[0];
    }

    /**
     * Returns the item at the back of the DynamicArray.
     *
     * @return the item at the front of the DynamicArray
     * @throws NoSuchElementException if this DynamicArray is empty
     */
    public T peekBack() {
        if (isEmpty())
            throw new NoSuchElementException("peek from empty DynamicArray");
        return arr[n-1];
    }

    /**
     * Returns a String representation of the DynamicArray, in the form [x0, x1, ... xn] where
     * x0...xn are elements of the DynamicArray in forward order.
     *
     * @return a String representation of the DynamicArray, with elements separated by a comma and
     *         space
     */
    public String toString() {
        if (isEmpty())
            return "[]";

        StringBuilder sb = new StringBuilder();
        sb.append('[');
        for (T item : this) {
            sb.append(item);
            sb.append(',');
            sb.append(' ');
        }
        sb.append(']');
        return sb.toString();
    }

    /**
     * Returns an Iterator to the DynamicArray that iterates through the elements of the
     * DynamicArray in forward order.
     *
     * @return an Iterator to the DynamicArray that iterates through the elements of the
     *         DynamicArray in forward order.
     */
    public Iterator<T> iterator() {
        return new Iterator<T>() {

            private int i = 0;

            @Override
            public boolean hasNext() {
                return i < n;
            }

            @Override
            public T next() {
                if (!hasNext())
                    throw new NoSuchElementException("iterator does not have next element");
                return arr[i++];
            }
        };
    }
}
```

### Time Complexity

The following table describes the time complexity for performing the operations above on a dynamic 
array:

```
| Data Structure   | get  | insert | insertFront | insertBack | remove | removeFront | removeBack | peekFront | peekBack |
|------------------|------|--------|-------------|------------|--------|-------------|------------|-----------|----------|
| dynamic array    | O(1) | O(N)   | O(N)        | O(1)*      | O(N)   | O(N)        | O(1)*      | O(1)      | O(1)     |
```

\* Amortized