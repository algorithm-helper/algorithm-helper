# Introduction

The topic in this section is strings, and data structures and algorithms that operate on strings. We
will be examining three topics related to strings: string sorting, tries, and string matching. For
string sorting, we will examine the following algorithms: LSD string sort, and MSD string sort. For 
tries, we will examine the following data structures: radix search trie, and ternary search trie. 
For string matching, we will examine the following algorithms: the Knuth-Morris-Pratt algorithm, 
the Boyer-Moore algorithm, and the Rabin-Karp algorithm. 

### Terminology

We first look at some terminology and definitions with strings.

From Wikipedia:

> [String](https://en.wikipedia.org/wiki/String_%28computer_science%29) - a sequence of characters, 
either as a literal constant or as some kind of variable. The latter may allow its elements to be 
mutated and the length changed, or it may be fixed (after creation). A string is generally 
understood as a data type and is often implemented as an array data structure of bytes (or words) 
that stores a sequence of elements, typically characters, using some character encoding. A string 
may also denote more general arrays or other sequence (or list) data types and structures.

Since in all programming languages, strings are an array of characters, the size of strings depends
on the size of the characters, that is, the character encodings. There are many types of character 
encodings, like ASCII and Unicode. While ASCIIencodes 128 characters, it needs 16 bits (or 2 bytes),
Unicode-32 needs 32 bits. The radix is the number of different symbols a character can take, and 
often we say that the radix is defined as $R$.

From Wikipedia:

> [Radix](https://en.wikipedia.org/wiki/Radix) - the number of unique digits, including zero, used 
to represent numbers in a positional numeral system. For example, for the decimal system (the most 
common system in use today) the radix is ten, because it uses the ten digits from 0 through 9.

We will be needing the radix for the radix-based sorts, radix search trie, and string matching 
algorithms explored in this topic.

While between programming languages, strings are implemented differently, they have certain 
operations for which we can expect certain time and space complexities:

- `length`
    - Returns the length of the string. We can expect this to be retrieved in $O(1)$ time because
    it is usually kept track when we first initialize the string.
- `charAt`
    - Returns the character at the $i^{th}$ position of the string. If we are working with strings 
    whose backend structure is an array of characters, we can expect this operation to run in 
    $O(1)$ time. 
- `concat`
    - Appends a string to the end of another string. If we are working with strings 
    whose backend structure is an array of characters, we can expect this operation to run in 
    $O(N)$ time, where $N$ is the length of the string.
- `substring`
    - Returns a subset of characters of a string from a starting index to an ending index. In Java
    for example, strings are immutable, so when we extract a substring from another string, what
    we are doing is returning a string object with the same character array, but with an offset,
    and that allows this operation to run in $O(1)$ time. 
- `indexOf`
    - Given a certain pattern string, it returns the starting index of the first occurence of the 
    match of the pattern string in another string. Typically, it returns `-1` if the pattern string
    is not found in the other string. This operation is related to the topic on string matching.

There are times when we need to compute the "value" of a string, and we consider two situations: 
when we need "alphabetical order", and when we need a numerical representation of a string.

Before we order strings in "alphabetical order", we need to define an alphabet, which is a set $A$
of characters, which are ordered. There are different types of alphabets in the context of strings, 
such as a binary alphabet, where for any character $a$ in the alphabet, $a \in \\{0, 1\\}$. In a
typical alphanumeric alphabet, for any character $a$ in the alphabet, 
$a \in \\{A, B, ... , Z, a, b, ... , z, 0, 1, ... , 9\\}$. 

From Wikipedia:

> [Alphabet](https://en.wikipedia.org/wiki/Alphabet) - a standard set of letters (basic written 
symbols or graphemes) that is used to write one or more languages based upon the general principle 
that the letters represent phonemes (basic significant sounds) of the spoken language.

Lexicographic order, also known as alphabetical order, is when we order a set of strings based off 
of the alphabet. That is, we compare character by character starting from the left of the string to 
the right. Consider two strings $S$ and $T$, where $s_i$ and $t_i$ are the $i^{th}$ characters of 
$S$ and $T$, respectively. Then for each $i$ from $0...min(length(S), length(T))$, if $s_i$ comes 
before $t_i$ in the alphabet then $S$ comes before $T$. If $s_i$ comes after $t_i$ in the alphabet 
then $S$ comes after $T$. If $s_i = t_i$, then we compare the next two characters, $s_{i+1}$ and 
$t_{i+1}$.
