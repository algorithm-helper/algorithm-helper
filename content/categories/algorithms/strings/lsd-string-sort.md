# LSD String Sort

LSD string sort, which is least significant digit string sort, is a string sorting algorithm with 
the restriction that all elements to be sorted are of the same length. The main approach is that 
we look at characters from right (least significant) to left (most significant). Suppose that the 
length of any string to be sorted is $M$. Then for each $i$ from $(M-1)...0$, we sort based on the 
$i^{th}$ character. We use key-indexed counting to sort the $i^{th}$ character, that is, we use an 
$R$ sized array, where $R$ is the radix, and we count the frequencies of each character, indexing
to the corresponding value in the array and incrementing it by $1$. Then we use that array to 
compute the frequency cumulates. A further explanation is below.

Note that although this algorithm is limited to strings of fixed length, there are many situations
where this may be useful, such as with sorting social security numbers, zip codes, bank numbers, and 
license plate numbers.

### Key Indexed Counting

Consider sorting the $i^{th}$ character of a set of strings, and suppose our radix is $128$ (for 
ASCII characters), for every letter in the alphabet. To sort a set of characters (integers) without 
using comparisons, we use key indexed counting, which is as follows:

- Initialize an array of size $R+1$, where $R$ is the radix, and initialize every value in the array 
to be 0.
- For each character in our set of strings, index into the corresponding integer representation of 
that character in the array offset by 1, and increment the value by 1.
- For each value in the $R+1$ sized array, compute the frequency cumulates, this is done by going 
through the array, summing up the current value and the value at the previous index. 
- Initialize a separate array, that is of the same size as the set of strings. 
- We use the cumulates to denote the correct key every time we encounter that particular character,
and increment it by 1, and copy the corresponding string from to that index in the new array.
- Return the new array, which now has the strings sorted by the $i^{th}$ character.

The following is a visualization of how we are going to sort the $i^{th}$ character:

```
// Suppose that we have the following set of strings:
[YFSC, FHLZ, AOQM, UCHY, UUUB, WGNI]

// Suppose that i = 3 (we are sorting based on the 4th character), which are:
[C, Z, M, Y, B, I]

// Initialize an array of size R (in this example, let R = 26, for every uppercase letter)
// Then A = 0, B = 1, ... Z = 25
R:
0  []
1  []
2  []
...
25 []
26 []

// Initialize them all values to be 0:
R:
0  [0]
1  [0]
2  [0]
...
25 [0]
26 [0]

// Start with character C. The integer representation of C is 2, so R[3]++:
R:
0  [0]
1  [0]
2  [0]
3  [1]
...
25 [0]
26 [0]

// The integer representation of Z is 25, so R[26]++:
R:
0  [0]
1  [0]
2  [0]
3  [1]
...
25 [0]
26 [1]

// The integer representation of M is 17, so R[18]++:
R:
0  [0]
1  [0]
2  [0]
3  [1]
...
18 [1]
...
25 [0]
26 [1]

// The integer representation of Y is 24, so R[25]++:
R:
0  [0]
1  [0]
2  [0]
3  [1]
...
18 [1]
...
25 [1]
26 [1]

// The integer representation of B is 1, so R[2]++:
R:
0  [0]
1  [0]
2  [1]
3  [1]
...
18 [1]
...
25 [1]
26 [1]

// The integer representation of I is 8, so R[9]++:
R:
0  [0]
1  [0]
2  [0]
3  [1]
...
9  [1]
...
18 [1]
...
25 [1]
26 [1]

// Then we compute the frequency cumulates, where for each i from 1..26, R[i] += R[i-1]:
R:
0  [0]
1  [0]
2  [0]
3  [1]
...
9  [2]
...
18 [3]
...
25 [4]
26 [5]

// Then we initialize a separate array of the same size as the set of strings, which is 6:
A:
0 []
1 []
2 []
3 []
4 []
5 []

// Then going through the characters again, we index into their corresponding integer representation
// offset by 1 and use the value stored there as the index into A;

// The integer representation of C is 2, and R[3] = 1, so A[1] = "YFSC", and R[3]++
A:
0 []
1 [YFSC]
2 []
3 []
4 []
5 []

// The integer representation of Z is 25, and R[26] = 5, so A[5] = "FHLZ", and R[26]++
A:
0 []
1 [YFSC]
2 []
3 []
4 []
5 [FHLZ]

// The integer representation of M is 17, and R[18] = 3, so A[3] = "AOQM", and R[18]++
A:
0 []
1 [YFSC]
2 []
3 [AOQM]
4 []
5 [FHLZ]

// The integer representation of Y is 24, and R[25] = 4, so A[4] = "UCHY", and R[25]++
A:
0 []
1 [YFSC]
2 []
3 [AOQM]
4 [UCHY]
5 [FHLZ]

// The integer representation of B is 1, and R[1] = 0, so A[0] = "UUUB", and R[1]++
A:
0 [UUUB]
1 [YFSC]
2 []
3 [AOQM]
4 [UCHY]
5 [FHLZ]

// The integer representation of I is 8, and R[9] = 2, so A[2] = "WGNI", and R[9]++
A:
0 [UUUB]
1 [YFSC]
2 [WGNI]
3 [AOQM]
4 [UCHY]
5 [FHLZ]

// And now we have the array of strings, sorted by the 3rd character.
```

### Visualization

The following is a visualization of the LSD string sort algorithm:

```
// Suppose that we have the following array of strings to be sorted:
[YFSC, FHLZ, AOQM, UCHY, UUUB, WGNI]

// We start off with the least significant digit (i = 3), and sort the strings by the ith character:
   i
YFSC
FHLZ
AOQM
UCHY
UUUB
WGNI

// Sorted:
   i
UUUB
YFSC
WGNI
AOQM
UCHY
FHLZ

// Then we have i = 2:
  i
UUUB
YFSC
WGNI
AOQM
UCHY
FHLZ

// Sorted:
  i
UCHY
FHLZ
WGNI
AOQM
YFSC
UUUB

// Then we have i = 1:
 i
UCHY
YFSC
WGNI
FHLZ
AOQM
UUUB

// Then we have i = 0:
i
AOQM
FHLZ
UCHY
UUUB
WGNI
YFSC

// The array is now sorted.
```

### Implementation

##### Java

```
package com.algorithmhelper.algorithms.strings;

public class LSDStringSort {

    /**
     * Sorts the array arr.
     *
     * @param arr, the array to be sorted.
     * @throws IllegalArgumentException if arr is null
     */
    public static void sort(String[] arr) {
        if (arr == null || arr.length == 0)
            throw new IllegalArgumentException("sort with null arr");

        int R = 65536;
        String[] aux = new String[arr.length];

        for (int i = arr.length - 1; i >= 0; i--) {
            int[] count = new int[R+1];

            for (int j = 0; j < count.length; j++)
                count[j] = 0;

            for (int j = 0; j < arr.length; j++)
                count[arr[j].charAt(i)+1]++;

            for (int j = 0; j < R; j++)
                count[j+1] += count[j];

            for (int j = 0; j < arr.length; j++) {
                aux[count[arr[j].charAt(i)]] = arr[j];
                count[arr[j].charAt(i)]++;
            }

            for (int j = 0; j < arr.length; j++)
                arr[j] = aux[j];
        }
    }
}
```

### Time Complexity

Since we must sort characters at $M$ positions, where $M$ is the length of the string, and to sort
the strings by character we need to go through the $N$ strings and compute $N$ frequencies, and 
$R$ frequency cumulates, this algorithm runs in $O(M(N+R))$ time. However, when $N$ is large, then
the size of $R$ becomes negligible compared to $N$, so we can consider this algorithm to run in 
$O(MN)$ time. Since we always need a `count` array of size $R$ and the auxiliary array `aux` of size 
$N$, this algorithm requires $O(N+R)$ space.

```
| Algorithm       | time complexity | space complexity |
|-----------------|-----------------|------------------|
| lsd string sort | O(MN)           | O(N+R)           |
```
