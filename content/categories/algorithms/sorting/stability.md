# Stability

Stability in the context of sorting algorithms refers to whether or not elements in the array that 
are equal stay in the same original order after the array has been sorted. 

From Wikipedia:

> [Stability](https://en.wikipedia.org/wiki/Sorting_algorithm#Stability) - Stable sorting algorithms 
maintain the relative order of records with equal keys.

### Example

An example of where stability might be important is if we consider (`key`, `val`) pairs.

The following visualizes stability:

```
// Suppose we have an array of (key, value) pairs for (names, ages):

A = [("John", 20), ("Jack", 30), ("Mary", 28), ("John", 21)]

// We have two pairs where the keys are identical, namely "John". A stable
// sort would sort this array by name but preserve the order of the two pairs:

sortedStable = [("Jack", 30), ("John", 20), ("John", 21), ("Mary", 28)]

// But an unstable sort would not:

sortedUnstable = [("Jack", 30), ("John", 21), ("John", 20), ("Mary", 28)]
```