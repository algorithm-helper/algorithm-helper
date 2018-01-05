# Rabin-Karp Algorithm

The Rabin-Karp algorithm is a string matching algorithm based around the idea of using hashing, more
specifically, modular hashing. Modular hashing is simply computing a number modulo a large prime 
number. The main approach is that we first compute the hash of the pattern string, and for each $i$,
we compute the hashes of the substring in the larger body of text of the characters from indices 
$i...(M+i-1)$, that is, in windows of size $M$. If the hash equals the hash of the pattern, then we 
check whether the substring the pattern match. 

### Visualization

Suppose that our pattern string is `5678`, and the text is `1234567890`. Then we take a large prime,
say `947`. First, we compute the hash of `5678`, which is `5678 % 947 = 943`. Then for the text, we
examine consecutive windows of size `4`:

```
1 2 3 4 5 6 7 8 9 0
1 2 3 4             <-- 1234 % 947 = 287 (No match at index 0)
  2 3 4 5           <-- 2345 % 947 = 451 (No match at index 1)
    3 4 5 6         <-- 3456 % 947 = 615 (No match at index 2)
      4 5 6 7       <-- 4567 % 947 = 779 (No match at index 3)
        5 6 7 8     <-- 5678 % 947 = 943 (Hash match at index 4)

// And, 5678 == 5678

// Thus we have found a match at index 4.
```

### Modular Hashing

For the actual computation of the hash of a particular string, we will want to first find a 
numerical representation of the string. First, consider an integer number, say $12345$. We can 
represent this integer as $1 \times 10^4 + 2 \times 10^3 + 3 \times 10^2 + 4 \times 10^1 + 5 \times 10^0$. 
This is done so because the number is in base 10, and intuitively, the string is in base $R$, where
$R$ is the radix. 

Thus, suppose that we have a string of length $M$, and let $c_i$ be the $i^{th}$ character of the 
string. Then we want to compute: $c_iR^{M-1} + c_{i+1}R^{M-2} + ... + c_{i+M-1}R^{0}\;mod\;Q$, where
$Q$ is a large prime. We can use Horner's method to evaluate this expression. 

To compute it efficiently, consider:

$x_i = c_iR^{M-1} + c_{i+1}R^{M-2} + ... + c_{i+M-1}R^{0}\;mod\;Q$

$x_{i+1} = c_{i+1}R^{M-1} + c_{i+2}R^{M-2} + ... + c_{i+M}R^{0}\;mod\;Q$

Where $x_i$ is the $i^{th}$ hash, and $x_{i+1}$ is the $(i+1)^{th}$ hash. Then with some arithmetic,
we can get the next hash from the previous hash by the following formula:

$x_{i+1} = R(x_i - c_iR^{M-1}) + c_{i+M} \;mod\;Q$

And thus we can compute the hash in $O(1)$ time.

### Implementation

##### Java

<script src="https://gist.github.com/eliucs/fa5151d951415cef327f73d750e4a5f5.js"></script>

### Time Complexity

For each consecutive window of $M$ characters in the text, we can compute the hash and compare it 
with the hash of the pattern string in $O(1)$ time, and thus for $N$ characters in the text, this 
algorithm has an overall time complexity of $O(N)$. Since we just need to store the hash for every
computation, we need $O(1)$ space.

```
| Algorithm            | time complexity | space complexity |
|----------------------|-----------------|------------------|
| rabin-karp algorithm | O(N)            | O(1)             |
```
