# Introduction

The topic in this section is searching, and these algorithms are primarily concerned with searching 
for elements in arrays in better than $O(N)$ time. Linear search of course, is what we are trying to 
beat, which is simply iterating through every element one at a time until finding a particular 
element or reaching the end of the array, and determining that the element indeed does not exist in 
the array. It runs in $O(N)$ time for both unsorted and sorted arrays. 

However, when the arrays has properties like being sorted, being a discrete unimodal functions, 
being evenly distributed, there are algorithms that can take advantage of these properties and run 
better than $O(N)$ time. The following algorithms are going to be covered: binary search, ternary 
search, jump search, and interpolation search.

### Terminology

There are some terminology that apply to certain properties of elements in arrays that are relevant 
to the algorithms in this topic.

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

A unimodal function is a function (that may be continuous or discrete) which has a single mode, 
which may be the maximum element, or the minimum element.

From Wikipedia:

> [Unimodality](https://en.wikipedia.org/wiki/Unimodality) - In mathematics, unimodality means 
possessing a unique mode. More generally, unimodality means there is only a single highest value, 
somehow defined, of some mathematical object. A function $f(x)$ is unimodal if for some value $M$, 
it is monotonically increasing for $x \leq M$ and monotonically decreasing for $x \geq M$. There is 
a unique maximum value of $f(x)$, which is $f(M)$. 

However, we will extend this definition to also cover both maximum and minimum modes. We will only 
consider discrete unimodal functions, which is where the function only applies at integer values, so 
that we can store the values into an array.

For example:

```
// Maximum mode:
// Suppose we have a unimodal function f with a maximum mode on [0, 4]:
f(0) = 2
f(1) = 3
f(2) = 7
f(3) = 4
f(4) = 2 

// This corresponds to the array:
[2, 3, 7, 4, 2]

// It has one mode, 7.


// Minimum mode:
// Suppose we have a unimodal function f with a minimum mode on [0, 4]:
f(0) = 7
f(1) = 5
f(2) = 2
f(3) = 6
f(4) = 7 

// This corresponds to the array:
[7, 5, 2, 6, 7]

// It has one mode, 2.
```

---

Evenly distributed, or uniformly distributed values, in the context of sorted arrays means that the 
values ascend in order nearly linearly. Another way to think about it is that the difference between
any two adjacent elements is roughly equal.

For example:

```
// A sorted array of integers where the values are evenly distributed:
[1, 3, 5, 7, 10, 12, 13, 14, 17]

// A sorted array of integers where the values are not evenly distributed 
// (exponentially increasing):
[1, 10, 995, 87987, 7897890]
```

From the example above, it is clear that the differences between each adjacent value was similar 
(between 1 and 3). If we know before hand that the elements in a sorted array happen to be evenly 
distributed, interpolation search is an algorithm that can take advantage of this property and run 
in better than logarithmic time, $O(loglogN)$, on average.
