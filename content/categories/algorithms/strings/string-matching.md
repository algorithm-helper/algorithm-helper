# String Matching

String matching algorithms, also called string searching or substring searching algorithms, are 
algorithms for finding whether or not a particular string $P$, called a pattern, is found within a
larger body of text $T$. We say that string $P$ is of length $M$ and $T$, our search space, is of
length $N$, and typically $N$ is much larger than $M$. Hence this is why $P$ is sometimes referred
to as the "needle" and $T$ is referred to as the "haystack".

There are many obvious contexts for this type of problem, such as searching for a particular keyword 
in a large collection of articles, however, in some cases $N$ is arbitrarily large, such as if the 
text was coming from a stream. Typically, we want to return the index $i$ at which the starting 
position of the match of $P$ in $T$ is found, and return $-1$ otherwise. If we simply want a boolean 
value of whether the match was found or not, we can just run the algorithm, and check whether it 
returns $-1$ or not.

We need to be mindful of the efficiency of the algorithms we use for this problem. The first is that
because the body of text is large, intuitively because a brute force algorithm could always check
every consecutive substring of $T$ of size $M$ to be $P$ or not, we want to beat a time complexity
of $O(NM)$. The second is that in the cases where we must deal with an infinite stream of 
characters, we want to not use space for backup. Backup is when we need to save a particular 
substring of the text $T$ each iteration of the algorithm. 

### Visualization

Suppose that we have the pattern `ADAB` and the text `ABRACADABRA`. The following demonstrates when
a match is found:

```
A B R A C A D A B R A
A D A B                 <-- Not a match at position 0
  A D A B               <-- Not a match at position 1
    A D A B             <-- Not a match at position 2
      A D A B           <-- Not a match at position 3
        A D A B         <-- Not a match at position 4
          A D A B       <-- Match at position 5

// Return 5, indicating the position of the match.
```

Suppose that the text is `BBBBBBBBBBB`. The following demonstrates when a match is not found:

```
B B B B B B B B B B B
A D A B                 <-- Not a match at position 0
  A D A B               <-- Not a match at position 1
    A D A B             <-- Not a match at position 2
      A D A B           <-- Not a match at position 3
        A D A B         <-- Not a match at position 4
          A D A B       <-- Not a match at position 5
            A D A B     <-- Not a match at position 6
              A D A B   <-- Not a match at position 7

// The position + M = N, so we can stop the search.
```

There is no need to continue matching the pattern further, because any position greater will result
in an index out of bounds exception.
