# Introduction

The topic in this section is sorting, and these algorithms are primarily 
concerned with putting the elements of an unordered array into sorted order, in
ascending order, in whatever way that may be defined. The order may be defined
by a comparator.

### Terminology

Sorted order means that the elements in the array are arranged in a sequence 
based on some defined comparison or comparator, and we only consider
"ascending order" of elements. For example, applying the `compare` function of 
some comparator on elements `x` and `y`, where `x` comes before `y` in the 
array, `compare(x, y) = -1`, denoting that element `x` is "less" than `y`, in
whatever way that may be defined. 

For example:

```
// An array of integers sorted in ascending order:
[1, 2, 4, 6, 7, 9, 11]

// An array of strings sorted in ascending (lexicographic) order:
["ant", "brother", "elephant", "juice", "rainbow"]
```