# Knuth-Morris-Pratt Algorithm

The Knuth-Morris-Pratt algorithm is a string matching algorithm based on the idea of preprocessing
the pattern string to achieve more efficient search. It is based on the intuition that instead of 
trying to "match the pattern string in the larger body of text", to "match the larger body of text
within the pattern string". This is done so by means of a deterministic finite automaton (DFA). 

A deterministic finite automaton (DFA) is a finite-state machine that accepts or rejects strings 
by means of a state diagram. We can visualize it as a sort of graph, where the vertices are the 
indices $0...M$ of the individual characters of the string, and we have directed edges and may have 
self loops. The starting vertex is the first character of the string, the ending vertex is the last 
character of the string, and we must have at least one path from the starting vertex to the ending 
vertex. This is made much more clear in the visualization below.

### Visualization (DFA)

To reiterate, we want to build a DFA from the pattern string itself. It is built such that if we 
have a sequence of characters that match exactly with the pattern string and pass it through the 
DFA, we will get from the starting state to the ending state, indicating a match. It will not 
otherwise. Every subsequent state depends on what the next character in the match should be, as if
we had been in a previous state and made the transition to the next state. That is, we do not need
to necessarily always go back to the starting state when there has been a mismatch.

Suppose that we have the pattern string `ADABRA`, and some large body of text. Then we have the 
following DFA:

<img src="https://firebasestorage.googleapis.com/v0/b/algorithm-helper-storage.appspot.com/o/img%2Falgorithms%2Fstrings%2Fdfa.png?alt=media&token=6f555037-10f7-463f-a6f6-a9f499bbd1ce" alt="DFA" class="img-fluid">

Clearly there is a path from the starting state `0` to the ending state `6`, and the only path of
this kind is when we have a sequence of characters that exactly match `ADABRA`. Note the behavior 
of the state transitions at state `3`: if the next character is `A` (that is, our sequence so far is
`ADAA`), then we can just go back to state `1` since the first state `0` needed an `A` to state `1`
anyway. However, if the next character is `A` (that is, our sequence so far is `ADAD`), then we
can just go back to state `2`, since state `0` and `1` need an `AD`, which we have in the last two
characters so far. If the next character is `R` (that is, our sequence so far is `ADAR`), then we
must restart from state `0`, as usual.

### Pseudocode

The approach with the Knuth-Morris-Pratt algorithm is that after we build the DFA from the pattern
string, we can run the large body of text (or stream of characters) through it, and stop when we 
have reached the ending state, at which point we have found a match. If we have exhausted the body 
of text, then we can say that a match was not found, and return `-1`.

To build the DFA itself however, is more involved. First, we define the DFA by a $M \times R$ array,
where $R$ is the radix size of the characters. We have $M$ states, and for each of the $R$ positions
of every state, we store the index of the next state to transition to. 

We have the following pseudocode:

```
dfa[][] : MxR array denoting the deterministic finite automaton
P : pattern
s : current state

for each state i:
    dfa[P[i]][i] = i+1

for state 0 and every char c != P[i]:
    dfa[c][0] = 0

for each state i and char c != P[i]:
    dfa[c][i] = dfa[c][s]
    s = dfa[P[i]][s]    
```

### Implementation 

##### Java

```
package com.algorithmhelper.algorithms.strings;

public class KnuthMorrisPrattAlgorithm {

    private String pattern;
    private int M;
    private int R;
    private int[][] dfa;

    /**
     * Initializes the KnuthMorrisPrattAlgorithm object with the pattern.
     *
     * @param pattern, the String to be search for
     * @throws IllegalArgumentException if the pattern is null
     */
    public KnuthMorrisPrattAlgorithm(String pattern) {
        if (pattern == null)
            throw new IllegalArgumentException("constructor with null pattern");

        this.pattern = pattern;
        M = pattern.length();
        R = Character.MAX_RADIX;
        dfa = new int[R][M];

        for (int s = 0, i = 1; i < M; i++) {
            for (int c = 0; c < R; c++)
                dfa[c][i] = dfa[c][s];
            dfa[pattern.charAt(i)][i] = i+1;
            s = dfa[pattern.charAt(i)][s];
        }
    }

    /**
     * Searches for a match of the pattern in the text, and returns the starting index of the
     * match if found, and -1 otherwise.
     *
     * @param text, the String body of text to be searched in
     * @return the starting index of the match if found, and -1 otherwise
     */
    public int search(String text) {
        int i, j;
        for (i = 0, j = 0; i < text.length() && j < M; i++)
            j = dfa[text.charAt(i)][j];
        if (j == M)
            return i - M;
        return -1;
    }

    /**
     * Returns true if the pattern is contained in the text, false otherwise.
     *
     * @param text, the String body of text to be searched in
     * @return true if the pattern is contained in the text, false otherwise
     */
    public boolean isContainedIn(String text) {
        return search(text) != -1;
    }
}
```

### Time Complexity

When we build the DFA, each character in the pattern is processed once, and for each character, for 
each radix, we must set the value to be the index of the next state, which takes $O(MR)$ time, and 
$O(MR)$ space for the $M \times R$ sized array. Every character of the text is processed once as it
used to transition to the next state in the DFA, which takes $O(N)$ time. Thus this algorithm as a
whole has a time complexity of $O(N + MR)$ and space complexity of $O(MR)$.

```
| Algorithm                    | time complexity | space complexity |
|------------------------------|-----------------|------------------|
| knuth-morris-pratt algorithm | O(N + MR)       | O(MR)            |
```
