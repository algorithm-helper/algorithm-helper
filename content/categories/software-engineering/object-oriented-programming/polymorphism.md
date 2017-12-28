# Polymorphism

Polymorphism refers to the ability for an object to take on multiple forms. When we have an "is-a"
relationship, i.e. when a subclass extends a superclass, anywhere the superclass is referenced, we
can replace it with a the subclass. 

### Dynamic Dispatch

When a polymorphic method is called at runtime, the compiler must be able to call the correct 
implementation, and this is called dynamic dispatch.

Suppose that we have `ClassA` which have methods `method1` and `other`: 

<script src="https://gist.github.com/eliucs/62008e4f88e0e0a594059a4b210e0ba5.js"></script>

Then we have `ClassB` that inherits from `ClassA` and has the method `method2`:

<script src="https://gist.github.com/eliucs/4ff76130e4797e07c29267de7c142764.js"></script>

Then we have `ClassC` that inherits from `ClassB` and has the method `method3` and `other`:

<script src="https://gist.github.com/eliucs/6ac51976520f189da1ae03b84d9924d9.js"></script>

We then create an instance of `ClassA` called `objA`, an instance of `ClassB` called `objB`, and 
an instance of `ClassC` called `objC`. And call all of the methods available on each object:

<script src="https://gist.github.com/eliucs/165e01273d124de5ad6f16bf7f14991a.js"></script>

We get the expected output:

```
from ClassA
other from ClassA
from ClassA
from ClassB
other from ClassA
from ClassA
from ClassB
from ClassC
other from ClassC
```

The output from `objA` is simply calling its methods `method1` and `other`. For `objB`, since it 
inherits from `objA` and does not override `method1`, `objB.method1()` calls the `method1` 
implementation from `ClassA`, and the same is true for `other`. Calling `method2` is simply 
calling its own method `method2`. For `objC`, since it inherits from `ClassB`, which inherits from
`ClassA`, and does not override `method1` (neither does `ClassB`), it uses the `method1` 
implementation from `ClassA`. Since it does not override `method2`, it uses the `method2`
implementation from `ClassB`. The method `method3` is its own, so it uses its own implementation.
Since `ClassB` does not override `other`, but `ClassC` overrides `other` from `ClassA`, it uses
its own implementation for the method `other`.

### Example

As a further example on the polymorphic properties of `ClassA`, `ClassB`, and `ClassC`, we have the
following example:

<script src="https://gist.github.com/eliucs/0789bc20739a2a34ad9b4a2e754bd93c.js"></script>

Since `ClassC` "is-a" `ClassB` and `ClassA`, where we reference a `ClassA`, we can refer to an 
instance of a `ClassC` object. Since `ClassB` "is-a" `ClassA`, where we reference a `ClassA`, we can 
refer to an instance of a `ClassB` object. However, the opposite is not true, as uncommenting the
commented lines will result in a compiler error.
