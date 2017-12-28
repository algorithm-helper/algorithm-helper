# Simple Uniform Hashing Asssumption

The Simple Uniform Hashing Assumption, also abbreviated as SUHA, states that for a given hash 
function $h$, we are able to map the universe $U$ of possible keys to ${0, 1, ... , m-1}$, where 
each key is equally likely to be hashed to any slot in the table, independent of where other keys 
have hashed.

### Properties

The main idea behind using a hash function is that we can take advantage of this assumption and 
expect that because the $N$ keys are distributed across $M$ slots, that the expected length of slots 
(how many keys hash to that slot) is $N/M$. Thus, we define the load factor $alpha = N/M$.

Intuitively, with separate chaining, as long as we can make sure that the number of these slots $M$ 
increases with $N$ to maintain a good load factor, then the average length of these linked list 
chains can be kept small. We do not want chains to get excessively long, because then the structure
effectively degenerates to $O(N)$ time for operations like `contains` or `get`.

With linear probing, as long as we can increase the size of the table, we can keep the expected 
number of needed probes until finding an available slot to be small. We do not want clusters to get 
larger, because then the structure also effectively degenerates to $O(N)$ time for operations like 
`contains` or `get`.

So it follows that the hash table/hash map or hash set implementations also have mechanisms to keep 
track of the values $M$ and $N$, and when $N$ grows large, then the size of the array is enlarged 
and all of the keys must be rehashed and reinserted back into the structure.
