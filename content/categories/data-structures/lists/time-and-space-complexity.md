# Time and Space Complexity

This article will elaborate further on the time and space complexities of the operations on the list 
data structures discussed in this topic. Data structures with similar operations will be grouped 
together.

### Comparisons

We start off with linked lists, double ended linked lists, and dynamic arrays because they have all 
of the same operations, and have operations to retrieve, insert or remove elements at arbitrary 
index locations within the data structure with `get`, `insert` and `remove`, unlike stacks and 
queues for example. We describe the time complexities for the operations `get`, `insert`, 
`insertFront`, `insertBack`, `remove`, `removeFront`, `removeBack`, `peekFront`, and `peekBack` 
below:

```
| Data Structure            | get  | insert | insertFront | insertBack | remove | removeFront | removeBack | peekFront | peekBack |
|---------------------------|------|--------|-------------|------------|--------|-------------|------------|-----------|----------|
| linked list               | O(N) | O(N)   | O(1)        | O(N)       | O(N)   | O(1)        | O(N)       | O(1)      | O(N)     |
| double ended linked list  | O(N) | O(N)   | O(1)        | O(1)       | O(N)   | O(1)        | O(1)       | O(1)      | O(1)     |
| dynamic array             | O(1) | O(N)   | O(N)        | O(1)*      | O(N)   | O(1)        | O(1)*      | O(1)      | O(1)     |
```

\* Amortized

For linked lists and double ended linked lists, retrieving the element at an arbitrary (valid) index 
with `get` requires traversing node by node, starting from the `first` node, and is hence done in 
`O(N)` time, compared to in a dynamic array, since we can simply index into the underlying array 
structure, done in `O(1)` time. 

Inserting an element at an arbitrary (valid) index with `insert` also requires traversing node by 
node until reaching the desired location for linked lists and double ended linked lists, and is thus
done in `O(N)` time. With dynamic arrays, we would need to shift all of the elements at that index 
`i` to the right in the underlying array to be able to insert the new element at `i`, and is thus 
done in `O(N)` time. 

Similarly, removing an element at an arbitrary (valid) index `i` with `remove` requires traversing 
node by node until reaching the desired location for linked lists and double ended linked lists, and 
linking the before node (node at index `i-1`) to the after node (node at index `i+1`), thereby 
effectively removing the node at `i`, and is thus done in `O(N)` time. With dynamic arrays, we would 
need to shift all of the elements at index `i+1` to the left, thereby effectively removing the 
element at `i`, and is thus done in `O(N)` time.
  
To insert an element at the front with `insertFront` in a linked list or double ended linked list, 
we simply need to point `first` to the new node to be inserted, and point the new node's `next` to 
the original `first` node, done in `O(1)` time. With a dynamic array, we would have to shift all of 
the elements starting at index 0 to the right in the underlying array structure, and must shift all 
of the elements, thus done in `O(N)` time. To remove an element at the front with `removeFront` in a 
linked list or double ended linked list, we simply need to point `first` to its `next` element, done 
in `O(1)` time. With a dynamic array, we would have to shift all of the elements starting at index 1 
to the left of the underlying array structure, and must shift all of the elements, thus done in 
`O(N)` time.

To insert an element at the end with `insertBack` in a linked list, we have to traverse node by node 
until we reach the end, and must traverse all of the nodes until reaching the end, and is hence done 
in `O(N)` time. But compared to a double ended linked list, we can take advantage of the `last` 
pointer, so we simply need to point `last` to the new node to be inserted, and point the new node's 
`prev` to the original `last` node, done in `O(1)` time. For a dynamic array, we can simply insert 
the element at the next valid index location `n` in the underlying array structure, done in `O(1)` 
time. Similarly, to remove an element at the end with `removeBack` in a linked list, we have to 
traverse node by node until we reach the end, and must traverse all of the nodes until reaching the 
end, and is hence done in `O(N)` time. With a double ended linked list, we can immediately access 
the last and second last element with `last` and its `prev` node, and thus done in `O(1)` time. With 
a dynamic array, we can simply decrement `n`, done in `O(1)` time as well.

To peek elements at the front with `peekFront` in a linked list or double ended linked list, we 
return the element at `first`, thus done in `O(1)` time. With a dynamic array, we simply return the 
element at index 0 of the underlying array, also done in `O(1)` time. To peek elements at the end 
with `peekBack` in a linked list, we would need to traverse through the entire linked list, thus 
done in O(N) time. But with a double ended linked list, we can return the element at `last`, thus 
done in `O(1)` time. With a dynamic array, we simply return the element at index `n`, thus done in 
`O(1)` time.

---

We will look at stacks (implemented with linked lists and dynamic arrays), queues (implemented with 
double ended linked lists and dynamic arrays) and double ended queues. 

For stacks, we can implement it using a linked list and a dynamic array, the time complexities for 
the operations `push`, `pop` and `peek` are described below:

```
| Data Structure        | push  | pop   | peek |
|-----------------------|-------|-------|------|
| stack (linked list)   | O(1)  | O(1)  | O(1) |
| stack (dynamic array) | O(1)* | O(1)* | O(1) |
```

\* Amortized

With the linked list implementation, since `push` is simply a matter of pointing `first` to be the
new node, this is done in `O(1)` time. With the dynamic array implementation, it is simply a matter 
of indexing into the underlying array at `n`, and assigning the new element there, done in `O(1)` 
time. With the linked list, `pop` is a matter of pointing `first` to its `next` node, done in `O(1)` 
time. With a dynamic array, we can decrement `n`, done in `O(1)` time. With the linked list, `peek` 
is a matter of returning the element at `first`, done in `O(1)` time. With a dynamic array, it is 
a matter of returning the element at index `n` in the underlying array.

For queues, we can implement it using a double ended linked list and a dynamic array, the time 
complexities for the operations `enqueue`, `dequeue` and `peek` are described below:

```
| Data Structure        | enqueue | dequeue | peek |
|-----------------------|---------|---------|------|
| queue (linked list)   | O(1)    | O(1)    | O(1) |
| queue (dynamic array) | O(1)*   | O(1)*   | O(1) |
```

\* Amortized

With the linked list implementation, since `enqueue` is simply a matter of pointing `last` to be the 
new node, this is done in `O(1)` time. With the dynamic array implementation, it is simply a matter 
of indexing into the underlying array at index `last`, and assigning the new element there, done in 
`O(1)` time. With the linked list, `dequeue` is a matter of pointing `first` to its `next` node, 
done in `O(1)` time. With a dynamically resizing array, we can increment `first`, done in `O(1)` 
time. With the linked list, `peek` is a matter of returning the element at `first`, done in `O(1)` 
time. With a dynamic array, it is a matter of returning the element at index `first` in the 
underlying array.

For double ended queues, we implement it using a double ended linked list, and the time complexities 
for `insertFront`, `insertBack`, `removeFront`, `removeBack`, `peekFront`, and `peekBack` are 
described below:

```
| Data Structure     | insertFront | insertBack | removeFront | removeBack | peekFront | peekBack |
|--------------------|-------------|------------|-------------|------------|-----------|----------|
| double ended queue | O(1)        | O(1)       | O(1)        | O(1)       | O(1)      | O(1)     |
```

For the operations `insertFront` and `insertBack`, we can point `first` or `last` to the new node, 
respectively, done in `O(1)` time. For the operations `removeFront` or `removeBack`, we can point 
`first` to its `next` node or point `last` to its `prev` node, respectively, done in `O(1)` time. 
For the operations `peekFront` or `peekBack`, we return the element at `first` or `last`, 
respectively, done in `O(1)` time.
