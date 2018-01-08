# Composite

The composite pattern is a design pattern used for the recursive composition of an object such that
clients are able to treat individual objects and compositions the same way, and the composition
forms a recursive tree structure. A typical problem is that we need objects that represent both the 
"part" and the "whole". A common example is with arithmetic expresssions, where we have `Expression`
objects, from which we extend `Number` objects and `Operator` objects (such as `+`, `-`, `*`, and 
`/`). However, branching from `Operator` objects are `Expression` objects themselves, and thus
we have this recursive composition structure. Another common example is with files and directories. 
A directory contains files, but can also contain directories.

The main approach to the composite pattern is that we have an abstract base class 
`AbstractComponent` that specifies the behavior for all subclasses. For the purposes of the example,
we have a `BasicComponent` that represents the basic most version of the component. If this were a
folder structure, `BasicComponent` would represent a file, if this were an arithmetic expression, 
`BasicComponent` would represent a number. Then we have the `CompositeComponent` class, which is 
composed of `AbstractComponent` objects, whether as fields or in a list, each of which may be 
`CompositeComponent` objects themselves.

### Implementation

##### Java

We start off wth the `AbstractComponent`, which specifies an `operation`:

<script src="https://gist.github.com/eliucs/f4776af41c77293b28711629ada27548.js"></script>

Then we have the following `BasicComponent`, which has a unique `id` and whose `operation` prints
out a message saying that the implementation is from `BasicComponent` with the `id`:

<script src="https://gist.github.com/eliucs/a2b38ef9c7dca76a2ee89226993eddc2.js"></script>

Then we have the following `CompositeComponent`, which has a unique `id`, list of 
`AbstractComponent` objects, and `operation` that prints out a message saying that the 
implementation is from `CompositeComponent` with the `id`, and iterates over its list of 
`AbstractComponent` objects, calling their `operation` method:

<script src="https://gist.github.com/eliucs/19c81cc785d8dfed84bc852a0488c810.js"></script>

We can then test it by building up the following tree, let `C` denote `CompositeComponent` objects, 
and let `B` denote `BasicComponent` objects:

<img src="https://i.imgur.com/HvcK75F.png" alt="Composite" width="400" height="300">

Then we have:

<script src="https://gist.github.com/eliucs/169d33fd41df67fd2f40f117c3ee5768.js"></script>

Which gives the expected output:

```
from CompositeComponent with id 0
from BasicComponent with id 0
from BasicComponent with id 1
from CompositeComponent with id 1
from CompositeComponent with id 2
from BasicComponent with id 3
from BasicComponent with id 4
from BasicComponent with id 5
from BasicComponent with id 2
```

And thus we have been able to build up a composite structure based on recursive composition of 
basic and composite components.
