# Set

A set is an abstract data type of a collection of key values in which there are 
no repeated values. It is the computer representation of the mathematical 
object of a set. The operations we use on a set are `contains`, which given a 
key, returns `true`/`false` depending on whether or not the key is in the set,
`put`, which given a key, inserts it into the set, and if the key already 
exists, then it does nothing, and `delete`, which given a key, deletes the 
key from the set.

### Example

The following demonstrates the state of a set by using its operations:

```
// Suppose we start off with an empty set, and we insert keys into it:
{}

// put(A):
{A}

// put(B):
{A, B}

// put(C):
{A, B, C}

// put(D):
{A, B, C, D}

// put(E):
{A, B, C, D, E}

// contains(A):
true

// contains(F):
false

// delete(A):
{B, C, D, E}

// delete(D):
{B, C, E}

// contains(B):
true

// contains(D):
false
```