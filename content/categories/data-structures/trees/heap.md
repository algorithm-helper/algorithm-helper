# Heap

### Binary Max/Min Heap

### Visualization

### Operations

### Implementation (Binary Max Heap)

##### Java

```
package com.example;

public class BinaryMaxHeap<T extends Comparable<T>> {

    private T[] arr;
    private int n;

    /**
     * Initializes an empty BinaryMaxHeap. Note that arr begins at
     * 1-indexed not 0, as it is made more explicit following
     * the arr declaration.
     */
    public BinaryMaxHeap() {
        arr = (T[]) new Comparable[2];
        arr[0] = null;
        n = 0;
    }

    /**
     * Returns true if the BinaryMaxHeap is empty.
     *
     * @return true if the BinaryMaxHeap is empty
     */
    public boolean isEmpty() {
        return n == 0;
    }

    /**
     * Returns the number of elements in the BinaryMaxHeap.
     *
     * @return the number of elements in the BinaryMaxHeap
     */
    public int size() {
        return n;
    }

    /**
     * Resizes the BinaryMaxHeap arr field to newSize.
     *
     * @param newSize, the new size of the arr
     */
    private void resize(int newSize) {
        T[] temp = (T[]) new Object[newSize];
        for (int i = 0; i < n; i++)
            temp[i] = arr[i];
        arr = temp;
    }

    public void insert(T item) {
        if (item == null)
            throw new IllegalArgumentException("insert null item");

        if (n == arr.length - 1)
            resize(2 * arr.length);

        n++;
        arr[n] = item;
        heapifyUp();
    }

    /**
     * Returns the maximum element of the BinaryMaxHeap, but does not remove
     * it from the arr.
     *
     * @return the maximum element of the BinaryMaxHeap, but does not remove
     *         it from the arr.
     */
    public T max() {
        if (isEmpty())
            throw new IllegalArgumentException("min with null BinaryMaxHeap");
        return arr[1];
    }

    /**
     * Removes the maximum element of the BinaryMaxHeap, and returns it.
     *
     * @return the maximum element of the BinaryMaxHeap, but does not remove
     *         it from the arr.
     */
    public T extractMax() {
        T item = max();
        arr[1] = arr[n];
        arr[n] = null;
        n--;
        heapifyDown();
        return item;
    }

    /**
     * Moves the element at the root (at index 1) into its correct position
     * in the BinaryMaxHeap by continuously swapping the element with the
     * larger of its left and right children (if they exist).
     */
    private void heapifyDown() {
        int i = 1;

        while (hasLeft(i)) {
            int maxChild = leftIndex(i);

            if (hasRight(i) &&
                    arr[leftIndex(i)].compareTo(arr[rightIndex(i)]) < 0)
                maxChild = rightIndex(i);

            if (arr[i].compareTo(arr[maxChild]) < 0)
                swap(i, maxChild);
            else
                break;
        }
    }

    /**
     * Moves the last element (at index n) into its correct position
     * in the BinaryMaxHeap by continuously swapping the element with
     * the parent if the element is larger than the parent.
     */
    private void heapifyUp() {
        int i = n;

        while (hasParent(i) &&
                (parent(i).compareTo(arr[i])) < 0) {
            swap(i, parentIndex(i));
            i = parentIndex(i);
        }
    }

    /**
     * Helper function that returns true if there is a parent index
     * from index i, false otherwise.
     *
     * @param i
     * @return true if there is a parent index from index i,
     *         false otherwise.
     */
    private boolean hasParent(int i) {
        return i > 1;
    }

    /**
     * Helper function that returns true if there is a left child index
     * from index i, false otherwise.
     *
     * @param i
     * @return true if there is a left child index from index i,
     *         false otherwise.
     */
    private boolean hasLeft(int i) {
        return leftIndex(i) <= n;
    }

    /**
     * Helper function that returns true if there is a right child index
     * from index i, false otherwise.
     *
     * @param i
     * @return true if there is a right child index from index i,
     *         false otherwise.
     */
    private boolean hasRight(int i) {
        return rightIndex(i) <= n;
    }

    /**
     * Helper function to get the left child index from index i.
     *
     * @param i
     * @return the left child index from index i.
     */
    private int leftIndex(int i) {
        return 2*i;
    }

    /**
     * Helper function to get the right child index from index i.
     *
     * @param i
     * @return the right child index from index i.
     */
    private int rightIndex(int i) {
        return 2*i+1;
    }

    /**
     * Helper function to get the parent index from index i.
     *
     * @param i
     * @return the parent index from index i.
     */
    private int parentIndex(int i) {
        return i/2;
    }

    /**
     * Helper function to get the parent element from index i.
     *
     * @param i
     * @return the parent element at index i.
     */
    private T parent(int i) {
        return arr[parentIndex(i)];
    }

    /**
     * Helper method to swap elements at index i and j.
     *
     * @param i
     * @param j
     */
    private void swap(int i, int j) {
        T temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }
}
```

### Implementation (Binary Min Heap)

##### Java

```
package com.example;

public class BinaryMinHeap<T extends Comparable<T>> {

    private T[] arr;
    private int n;

    /**
     * Initializes an empty BinaryMinHeap. Note that arr begins at
     * 1-indexed not 0, as it is made more explicit following
     * the arr declaration.
     */
    public BinaryMinHeap() {
        arr = (T[]) new Comparable[2];
        arr[0] = null;
        n = 0;
    }

    /**
     * Returns true if the BinaryMinHeap is empty.
     *
     * @return true if the BinaryMinHeap is empty
     */
    public boolean isEmpty() {
        return n == 0;
    }

    /**
     * Returns the number of elements in the BinaryMinHeap.
     *
     * @return the number of elements in the BinaryMinHeap
     */
    public int size() {
        return n;
    }

    /**
     * Resizes the BinaryMinHeap arr field to newSize.
     *
     * @param newSize, the new size of the arr
     */
    private void resize(int newSize) {
        T[] temp = (T[]) new Object[newSize];
        for (int i = 0; i < n; i++)
            temp[i] = arr[i];
        arr = temp;
    }

    public void insert(T item) {
        if (item == null)
            throw new IllegalArgumentException("insert null item");

        if (n == arr.length - 1)
            resize(2 * arr.length);

        n++;
        arr[n] = item;
        heapifyUp();
    }

    /**
     * Returns the minimum element of the BinaryMinHeap, but does not remove
     * it from the arr.
     *
     * @return the minimum element of the BinaryMinHeap, but does not remove
     *         it from the arr.
     */
    public T min() {
        if (isEmpty())
            throw new IllegalArgumentException("min with null BinaryMinHeap");
        return arr[1];
    }

    /**
     * Removes the minimum element of the BinaryMinHeap, and returns it.
     *
     * @return the minimum element of the BinaryMinHeap, but does not remove
     *         it from the arr.
     */
    public T extractMin() {
        T item = min();
        arr[1] = arr[n];
        arr[n] = null;
        n--;
        heapifyDown();
        return item;
    }

    /**
     * Moves the element at the root (at index 1) into its correct position
     * in the BinaryMinHeap by continuously swapping the element with the
     * smaller of its left and right children (if they exist).
     */
    private void heapifyDown() {
        int i = 1;

        while (hasLeft(i)) {
            int minChild = leftIndex(i);

            if (hasRight(i) &&
                arr[leftIndex(i)].compareTo(arr[rightIndex(i)]) > 0)
                minChild = rightIndex(i);

            if (arr[i].compareTo(arr[minChild]) > 0)
                swap(i, minChild);
            else
                break;
        }
    }

    /**
     * Moves the last element (at index n) into its correct position
     * in the BinaryMinHeap by continuously swapping the element with
     * the parent if the element is smaller than the parent.
     */
    private void heapifyUp() {
        int i = n;

        while (hasParent(i) &&
               (parent(i).compareTo(arr[i])) > 0) {
            swap(i, parentIndex(i));
            i = parentIndex(i);
        }
    }

    /**
     * Helper function that returns true if there is a parent index
     * from index i, false otherwise.
     *
     * @param i
     * @return true if there is a parent index from index i,
     *         false otherwise.
     */
    private boolean hasParent(int i) {
        return i > 1;
    }

    /**
     * Helper function that returns true if there is a left child index
     * from index i, false otherwise.
     *
     * @param i
     * @return true if there is a left child index from index i,
     *         false otherwise.
     */
    private boolean hasLeft(int i) {
        return leftIndex(i) <= n;
    }

    /**
     * Helper function that returns true if there is a right child index
     * from index i, false otherwise.
     *
     * @param i
     * @return true if there is a right child index from index i,
     *         false otherwise.
     */
    private boolean hasRight(int i) {
        return rightIndex(i) <= n;
    }

    /**
     * Helper function to get the left child index from index i.
     *
     * @param i
     * @return the left child index from index i.
     */
    private int leftIndex(int i) {
        return 2*i;
    }

    /**
     * Helper function to get the right child index from index i.
     *
     * @param i
     * @return the right child index from index i.
     */
    private int rightIndex(int i) {
        return 2*i+1;
    }

    /**
     * Helper function to get the parent index from index i.
     *
     * @param i
     * @return the parent index from index i.
     */
    private int parentIndex(int i) {
        return i/2;
    }

    /**
     * Helper function to get the parent element from index i.
     *
     * @param i
     * @return the parent element at index i.
     */
    private T parent(int i) {
        return arr[parentIndex(i)];
    }

    /**
     * Helper method to swap elements at index i and j.
     *
     * @param i
     * @param j
     */
    private void swap(int i, int j) {
        T temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }
}

```

### Time Complexity

```
```

