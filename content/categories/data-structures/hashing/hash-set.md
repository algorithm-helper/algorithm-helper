# Hash Set

A hash set is a data structure that uses hashing to store keys, where there are no duplicate keys. 
Therefore, we would often use hash sets to keep track of a unique set of items if we do not desire 
duplicates. We use a hash function (more can be read about this on the article on 
[Hash Functions](/categories/data-structures/hashing/hash-function)) to compute a valid index into 
this table at some slot, which we call a bucket. Since keys can hash to the same value, we store the 
individual keys in this bucket. There are two primary ways of implementing a hash set: separate 
chaining and linear probing. These methods are identical to the ones uses in a hash table/hash map. 
For more information on the methods of separate chaining or linear probing, see the article on the 
[Hash Table / Hash Map](/categories/data-structures/hashing/hash-table-hash-map).

Hash sets are particularly efficient for operations `put`, `contains`, and `delete`. The operation 
`put` inserts a `key` into the hash set. The operation `contains` checks if a given `key` exists in 
the hash set. The operation `delete` is given a `key`, and removes it (assuming it exists) from 
the hash set.

### Operations

For separate chaining:

- `contains`
    - Returns `true`/`false` depending on whether or not a given `key` exists
    in the hash set. This is done by hashing the `key` into the correct slot,
    and then traversing through the corresponding linked list at that slot, and
    if the corresponding node with the `key` exists, then it returns 
    `true`, otherwise it returns `false`.
- `put`
    - Inserts a key into the hash set. This is done by hashing the `key` into 
    the correct slot, and then inserting it into the corresponding linked list 
    at that slot. This is done by creating a new node with the `key`, linking
    its `next` to the `first` in the linked list, and then pointing `first` to 
    the new node.
- `delete`
    - Removes a the corresponding `key` from the hash set given some `key`. 
    This is done by hashing the `key` into the correct slot, and then traversing 
    through the corresponding linked list at that slot to remove the 
    corresponding `key`.

For linear probing:

- `contains`
    - Returns `true`/`false` depending on whether or not a given `key` exists
    in the hash set. This is done by hashing the `key` into the correct slot, 
    and if the corresponding `key` already exists there, then it returns true. 
    Otherwise, it continuously checks the next adjcent slot, and if the 
    corresponding `key` is found, then it returns true, indicating that the 
    given `key` exists. If the probe reaches a `null` slot, then it returns 
    false, indicating that the given `key` does not exist in the hash set.
- `put`
    - Inserts a `key` into the hash set. This is done by hashing
    the `key` into the correct slot, and then if this slot is already `null`, it
    inserts the `key` at this slot. Otherwise, it continuously checks the next
    adjacent slot to find the next `null` slot, and inserts the `key` there.
- `delete`
    - Removes the corresponding `key` from the hash set given some `key`. This 
    is done by hashing the `key` into the correct slot, and if the corresponding 
    `key` is at that slot, it is set to `null`. Otherwise, it continuously 
    checks the next adjacent slot, until the correponding `key` is found, and 
    then is set to `null`. Then all of the keys are rehashed again.

### Implementation (Separate Chaining)

##### Java

<script src="https://gist.github.com/eliucs/4105ad88fd40890bd9b79e026b7cb6cd.js"></script>

### Implementation (Linear Probing)

##### Java

<script src="https://gist.github.com/eliucs/71fd07009dee01daafdf6e86d5001ae6.js"></script>

### Implementation (LinkedListSet)

A set version of linked list is needed for separate chaining.

##### Java

<script src="https://gist.github.com/eliucs/7fd3895d459d054d7f133ac104970f9c.js"></script>

### Time Complexity

The following table describes the time complexity for performing the operations above on an hash set 
with the separate chaining method and the linear probing method:

```
| Data Structure               | contains | put   | delete |
|------------------------------|----------|-------|--------|
| hash set (separate chaining) | O(1)     | O(1)  | O(1)   |
| hash set (linear probing)    | O(1)*    | O(1)* | O(1)*  |
```

\* Amortized
