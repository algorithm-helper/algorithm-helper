# Time and Space Complexity

This article will elaborate further on the time and space complexities of the operations on the data 
structures using hashing discussed in this topic. Data structures with similar operations will be 
grouped together.

### Comparisons

We will look at hash table/hash maps using separate chaining and linear probing, with respect to 
their operations: `contains`, `get`, `put`, and `delete`. Their time complexities are described 
below.

```
| Data Structure                            | contains | get   | put   | delete |
|-------------------------------------------|----------|-------|-------|--------|
| hash table / hash map (separate chaining) | O(1)     | O(1)  | O(1)  | O(1)   |
| hash table / hash map (linear probing)    | O(1)*    | O(1)* | O(1)* | O(1)*  |
```

For the hash map with separate chaining, with the `contains` operation, since we are guaranteed that 
the number of slots $M$ in the hash map is about 1/5 of the size of $N$, the average length of the 
linked list at any slot is about 5. Since hashing the given `key` to any index takes $O(1)$ time, we 
can check whether or not the `key` is contained in the linked list after traversing at most 5
nodes, on average. Thus, `contains` runs in $O(1)$ time. The same is true for the `get` and `delete` 
operations, and thus they run in $O(1)$ time. For the `put` operation, after we hash the `key` to 
the index into the hash map, we need to deal with at most 1 node because we insert the new node 
with the (`key`, `val`) pair always at the `first` of the linked list, thus `put` runs in $O(1)$ 
time.

For the hash map with linear probing, with the `contains` operation, since we are guranteed that the 
cluster sizes are small, and we require approximately 1.5 to 2.5 probes until determining whether or 
not a given `key` exists in the hash map, thus `contains` is done in $O(1)$ time. The same is true 
for the operations `get`, `put`, and `delete`, and thus they are all done in $O(1)$ time.

In terms of space complexity, one of the problems with using a hash map with separate chaining is 
that because every (`key`, `val`) pair is stored in a node in the linked lists, it is costly to 
store the pointers to the `next` nodes in the linked lists. One of the problems with using a hash 
map with linear probing is that we need 2 arrays, one to store the `key` objects, and one to store 
the `val` objects. These arrays are also much larger to prevent undesirable clustering.

---

We will look at hash sets using separate chaining and linear probing, with respect to their 
operations: `contains`, `put`, and `delete`. Their time complexities are described below.

```
| Data Structure               | contains | put   | delete |
|------------------------------|----------|-------|--------|
| hash set (separate chaining) | O(1)     | O(1)  | O(1)   |
| hash set (linear probing)    | O(1)*    | O(1)* | O(1)*  |
```

The explanations for hash sets are virually the same as for hash table/hash sets except the data 
structure stores just `key` objects, and not (`key`, `val`) pairs.
