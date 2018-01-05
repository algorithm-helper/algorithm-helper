# Boyer-Moore Algorithm

The Boyer-Moore algorithm is a string matching algorithm based on the idea that instead of trying
to match the pattern string from left to right, we try to match it from right to left. The key 
intuition is that if the last character of the pattern string does not match with the current 
position in the body of text, we can skip $M$ characters. 

### Visualization

By trying to matching characters in the pattern string to the text from right to left, we can skip
as many as $M$ characters the moment we find a mismatch in character. There are four cases. For the 
first case, suppose that the pattern string is `ABBB` and the text is `AAAAAAAAAA`. The situation 
is that the last character is a mismatch, but the mismatched character from the text is also the 
beginning character of the pattern string:

```
A A A A A A A A A A
A B B B
      A B B B
        //... and so on
```

The last character in the pattern string, `B`, mismatches with the character in the text `A`, so
we can shift the entire pattern string such that its position is the original position of the last
character. 

For the second case, we have a mismatch with a character not in the pattern. Suppose that the 
pattern string is `ABBB` and the text is `ABCBBBBBBB`. The situation is that the as we match from 
right to left, we get a mismatch, but the mismatched character from the text does not exist in the 
pattern string at all. Intuitively, any position with that character "in the range" of the pattern
string would never match, so we are able to shift the pattern string to the index after the 
mismatched character.

```
A B C B B B B B B B
A B B B
      A B B B
        //... and so on
```

For the third case, we have a mismatch with a character that is in the pattern, and this character 
is also equal to the first letter of the pattern string. Suppose that the pattern string is `ABBB`
and the text is `ABABABABAB`. The situation is that as we match from right to left, we get a 
mismatch, but the mismatched character from the text does exist, and is the first letter of the 
pattern string. Intuitively, we should shift the pattern to the index of the mismatch:

```
A B A B A B A B A B
A B B B
    A B B B
      //... and so on
```

For the fourth case, we have a mismatch with a character that is in the pattern, and this character 
is not equal to the first letter of the pattern string. Suppose that the pattern string is `ABCABC`
and the text is `BCBCBCBCBC`. The situation is that as we match from right to left, we get a 
mismatch, but the mismatched character from the text does exist, and is not equal to the first 
letter of the pattern string. Then we shift the pattern over by 1:

```
B C B C B C B C B C
A B C A B C
  A B C A B C
    //... and so on      
```

We can then precompute the skip table, which is an array of size $R$, where $R$ is the size of the 
radix. For each character, we set its value in the array to be -1 if it does not exist in the 
pattern string, and for each character `c`, its value to be the index of the rightmost occurence of
`c` in the pattern string.

### Implementation

##### Java

<script src="https://gist.github.com/eliucs/21f4c517a85a61e21a57467a7fef2247.js"></script>

### Time and Space Complexity

Since in typical situations we are able to skip characters by $M$, it follows that we only need to
examine $N/M$ characters. In the worst case however, such as if we need to shift by 1 each time, 
then the algorithm would take $NM$ time. However, this situation is unlikely, so we take the time 
complexity to be $O(N/M)$. Since we need to build the skip table of size $R$, we need extra space
of $O(R)$.

```
| Algorithm             | time complexity | space complexity |
|-----------------------|-----------------|------------------|
| boyer-moore algorithm | O(N/M)          | O(R)             |
```
