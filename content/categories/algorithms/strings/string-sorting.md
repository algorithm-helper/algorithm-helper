# String Sorting

String sorting algorithms are algorithms primarily intended for use in arrays where all elements are
strings, and this is because with regular comparison based sorting algorithms, like most of the ones 
described in the section on [sorting](/categories/algorithms/sorting), they are not optimal for 
sorting strings because of the character compares between strings to determine their lexicographic
order. 

We want to use the fact that since strings are composed of characters, and each character can be 
represented by $R$ different unsigned integers, where $R$ is the radix, we can express a string as a 
sequence of integers. As we have seen an introduction on non-comparison based sorts using integers 
with [bucket sort](/categories/algorithms/sorting/bucket-sort) and 
[radix sort](/categories/algorithms/sorting/radix-sort) in the section on sorting. By doing so, we
will be able to achieve sort algorithms that run in almost linear time.

### Lexicographic Order

Lexicographic order refers to the alphabetical order of strings. Since an alphabet is an ordered 
set, when we compare two strings, say $S$ and $T$, we go through them character by character and
define $s_i$ and $t_i$ to be the $i^{th}$ character of $S$ and $T$, respectively. For each $i$, we
compare which of $s_i$ and $t_i$ comes before in the order defined by the alphabet. If $s_i$ comes
before $t_i$ in the alphabet, then $S$ is lexicographically less than $T$, and if $s_i$ comes after
$t_i$ in the alphabet, then $S$ is lexicographically greater than $T$. If they are equal, then we
look at the next character, that is, the $(i+1)^{th}$ character in each respective string.

For example, suppose that we have the following list of strings:
```
abracad
abra
adara
abracadabra
aba
bracad
acadab
```

Then, that list sorted in lexicographic order is:

```
aba
abra
abracad
abracadabra
acadab
adara
bracad
```
