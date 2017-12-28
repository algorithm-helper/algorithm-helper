# Amortization

Amortization is a method of analyzing a algorithm's time and space complexity, with the primary 
motivation that looking at the worst-case runtime per operation may be too pessimistic, because some 
operations can "amortize" the cost over multiple uses of that same operation. "Amortizing the cost" 
can be though of as distributing the cost of that operation over the multiple uses of that same 
operation. 

### Example

The example used here will be in the context of dynamic arrays, and the amortized cost of inserting 
elements when we have to double the size of the underlying array when it becomes full:

```
// Starting array:
[  ]

// Insert a1:
[a1]

// Insert a2, by first doubling the size of the array:
[a1][a2]

// Insert a3, by first doubling the size of the array:
[a1][a2][a3][  ]

// Insert a4:
[a1][a2][a3][a4]

// Insert a5, by first doubling the size of the array:
[a1][a2][a3][a4][a5][  ][  ][  ]

// Insert a6:
[a1][a2][a3][a4][a5][a6][  ][  ]

// Insert a7:
[a1][a2][a3][a4][a5][a6][a7][  ]

// Insert a8:
[a1][a2][a3][a4][a5][a6][a7][a8]
```

At first glance, we may naively say that the operation to insert elements to the back of the array 
is done in $O(N)$ time, since we would need to initialize an array of twice the size and copy all of 
the original elements over to the new array, whenever array doubling is needed. However, intuitively, 
we only need to double at most $logN$ times, since after we double, we still have to completely fill 
up the array again. We can amortize the cost of the array doubling over the calls to the operation 
`insertBack` until we fill up the array again.

Consider $N$ number of insertions. We only have to double $logN$ times. So the total cost of the 
insertion becomes:

$= O(2^0 + 2^1 + ... + 2^{logN})$

$= O(N)$

But this is the total cost over $N$ elements. So per element it becomes:

$= O(N)/N$

$= O(1)$

Thus we say that we `insertBack` runs in $O(1)$ amortized time.
