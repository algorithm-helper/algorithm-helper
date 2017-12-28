# Introduction

The topic in this section is shuffling, which is the generation of a random permutation of a 
sequence, and its definition is as intuitive as what it is in real life. Shuffling is used to 
randomize the order of elements in an array.

A good shuffling algorithm is key in many applications - the most obvious is in online gambling 
servers like those for poker and black jack. A good shuffling algorithm must be able to prevent 
users from being able to guess outcomes or in most situations, being able to guess the next outcome 
given a previous one.

### Properties

Some of the desirable properties we would want in a good shuffling algorithm are:

- Unbiased permutation, every permutation is equally likely, which simply says that all of the 
random outcomes are uniformly distributed.
- Runs in time proportional to the length of the array, that is, runs in $O(N)$ time.
- In-place, that is, the algorithm does not require auxiliary memory during its operation, but 
rather elements are changed via swap operations.

### Terminology

There are some terminology that apply to shuffling that are relevant to the algorithms in this 
topic.

A permutation is rearranging the elements in an array to some order. For an array of $N$ (distinct) 
elements, there are $N!$ permutations.

From Wikipedia:

> [Permutation](https://en.wikipedia.org/wiki/Permutation) - The notion of permutation relates to 
the act of arranging all the members of a set into some sequence or order, or if the set is already 
ordered, rearranging (reordering) its elements, a process called permuting. These differ from 
combinations, which are selections of some members of a set where order is disregarded. 

The following visualizes permutations of an array of elements:

```
// Suppose we have an array a:
[1, 2, 3]

// Its permutations are:
[1, 2, 3]
[1, 3, 2]
[2, 1, 3]
[2, 3, 1]
[3, 1, 2]
[3, 2, 1]
```

The primary motivation of shuffling is thus, given an array like the one above, to be able to 
randomly order it into one of its possible permutations, such that all of the possibilities are 
equally probably to occur.
