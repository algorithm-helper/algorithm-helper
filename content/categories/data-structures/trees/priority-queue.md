# Priority Queue

A priority queue is an abstract data type that is used to insert and extract elements based off of 
some priority value. There are three variants: the priority max queue, the priority min queue, and 
the double ended priority queue, which allows us to retrieve the element of the maximum priority 
efficiently with the operation `extractMax`, retrieve the element of the minimum priority 
efficiently with the operation `extractMin`, or retrieve both the element with the maximum and 
minimum priority efficiently. 

### Priority Max Queue

A priority max queue is a priority queue that supports the operations `insert`, `extractMax`, and 
`max`, which allow us to insert an element of some priority into the data structure, remove and 
return the element of maximum priority, and return the element of maximum priority without removing 
it from the priority max queue, respectively.

This data structure is best suitable to be implemented with a binary max heap, and thus we are able 
to run the operations `insert` and `extractMax` in $O(logN)$ time, and return the `max` in $O(1)$ 
time.

### Priority Min Queue

A priority min queue is a priority queue that supports the operations `insert`, `extractMin`, and 
`min`, which allow us to insert an element of some priority into the data structure, remove and 
return the element of minimum priority, and return the element of minimum priority without removing 
it from the priority min queue, respectively.

This data structure is best suitable to be implemented with a binary min heap, and thus we are able 
to run the operations `insert` and `extractMin` in $O(logN)$ time, and return the `min` in $O(1)$
time.

### Double Ended Priority Queue

A double ended priority queue is a priority queue that supports the operations `insert`, 
`extractMax`, `extractMin`, `max`, and `min`, which allow us to insert an element of some priority 
into the data structure, remove and return the element of maximum priority, remove and return the 
element of minimum priority, return the element of maximum priority without removing it from the 
double ended priority queue, and return the element of minimum priority without removing it from the 
double ended priority queue.

This data structure is best suitable to be implemented with some balanced tree structure, like a 
red-black tree, and thus we are able to run all of the operations in $O(logN)$ time.

### Visualization

The following demonstrates the state of a priority max queue, starting with an empty priority max 
queue, and a lower number represents a higher priority. It is essentially the same with a priority 
min queue:

```
// Suppose that we start off with the following empty priority max queue:
{}

// insert(1):
{1}

// insert(10):
{1, 10}

// insert(5):
{1, 10, 5}

// insert(3):
{1, 10, 5, 3}

// extractMax():
1

// max():
3

// insert(2):
{10, 5, 3, 2}

// extractMax():
2

// extractMax():
3

// max():
5
```

The following demonstrates the state of a double ended priority queue, starting with an empty double 
ended priority queue, and a lower number represents a higher priority:

```
// Suppose that we start off with the following empty double ended priority 
// queue:
{}

// insert(1):
{1}

// insert(10):
{1, 10}

// insert(5):
{1, 10, 5}

// insert(3):
{1, 10, 5, 3}

// extractMax():
1

// max():
3

// min():
10

// insert(2):
{10, 5, 3, 2}

// extractMin():
10

// extractMin():
5

// max():
2
```

### Operations

For priority max queue:

- `insert`
    - Inserts the element into the priority queue, this is done by inserting it
    into the underlying binary max heap.
- `extractMax`
    - Removes the element with the maximum priority and returns it, this is done
    by calling `extractMax` from the underlying binary max heap.
- `max`
    - Returns the element with the maximum priority without removing it, this is
    done by calling `max` from the underlying binary max heap.

For priority min queue:

- `insert`
    - Inserts the element into the priority queue, this is done by inserting it
    into the underlying binary min heap.
- `extractMin`
    - Removes the element with the minimum priority and returns it, this is done
    by calling `extractMin` from the underlying binary min heap.
- `min`
    - Returns the element with the minimum priority without removing it, this is
    done by calling `min` from the underlying binary min heap.

For double ended priority queue:

- `insert`
    - Inserts the element into the priority queue, this is done by inserting it
    into the underlying red-black tree.
- `extractMax`
    - Removes the element with the maximum priority and returns it, this is done
    by calling `extractMax` from the underlying binary max heap.
- `extractMin`
    - Removes the element with the minimum priority and returns it, this is done
    by calling `extractMin` from the underlying binary min heap.
- `max`
    - Returns the element with the maximum priority without removing it, this is
    done by calling `max` from the underlying binary max heap.
- `min`
    - Returns the element with the minimum priority without removing it, this is
    done by calling `min` from the underlying binary min heap.

### Implementation (Priority Max Queue)

##### Java

<script src="https://gist.github.com/eliucs/5aaa405a78c10d7d28a8b4f8ce57e03f.js"></script>

### Implementation (Priority Min Queue)

##### Java

<script src="https://gist.github.com/eliucs/2e38db7af9f6f50520a67f2f888a442f.js"></script>

### Implementation (Double Ended)

##### Java

<script src="https://gist.github.com/eliucs/30f63846b5a15df27f9fff188479a9e0.js"></script>

### Time Complexity

The following table describes the time complexity for performing the operations above on an priority 
max queue, priority min queue, and a double ended priority queue:

```
| Data Structure              | insert  | extractMax  | extractMin  | max     | min     |
|-----------------------------|---------|-------------|-------------|---------|---------|
| priority max queue          | O(logN) | O(logN)     | n/a         | O(1)    | n/a     |
| priority min queue          | O(logN) | n/a         | O(logN)     | n/a     | O(1)    |
| double ended priority queue | O(logN) | O(logN)     | O(logN)     | O(logN) | O(logN) |
```
