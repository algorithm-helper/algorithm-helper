# Introduction

The topic in this section is sorting, and these algorithms are primarily concerned with putting the 
elements of an unordered array into sorted order, in ascending order, in whatever way that may be 
defined. The order may be defined by a comparator.

### Terminology

Sorted order means that the elements in the array are arranged in a sequence based on some defined 
comparison or comparator, and we only consider "ascending order" of elements. For example, applying 
the `compare` function of some comparator on elements `x` and `y`, where `x` comes before `y` in the 
array, `compare(x, y) = -1`, denoting that element `x` is "less" than `y`, in whatever way that may 
be defined. 

For example:

```
// An array of integers sorted in ascending order:
[1, 2, 4, 6, 7, 9, 11]

// An array of strings sorted in ascending (lexicographic) order:
["ant", "brother", "elephant", "juice", "rainbow"]
```

---

Stability in the context of sorting algorithms refers to whether or not identical elements maintain 
their relative order after the sorting algorithm has finished. More can be read in the article on 
[Stability](/categories/algorithms/sorting/stability).

---

In-place in the context of sorting algorithms refers to whether or not the sorting algorithm 
requires auxiliary space, or if elements within the array itself can be manipulated to bring it into 
sorted order. More can be read in the article on [In-Place](/categories/algorithms/sorting/in-place).