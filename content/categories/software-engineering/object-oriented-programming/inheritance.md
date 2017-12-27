# Inheritance

Inheritance refers to when a subclass is based on a superclass, and is able to acquire certain
fields and methods from it. We use the term "extends" to say that a subclass that inherits from a 
superclass. When a subclass extends a superclass, it acquire fields and methods from the superclass,
as well as has fields and methods of its own. Methods in the subclass can override methods from the
superclass if they have the same name and take in the same types or parameters. Inheritance forms
what is called an "is-a" relationship, that is, a subclass "is an" instance of a superclass. Note
that the inverse is not true, i.e. a superclass is not an instance of the subclass. For example,
if we were to have the superclass `Vehicle` and the subclasses `Car` and `Motorcycle`, then we can
say that a `Car` is a `Vehicle`, but a `Vehicle` is not necessarily a `Car`.

One of the useful things about inheritance is that we typically have access to the superclass. In
Java for example, this is via the `super` keyword. 

### Example

The following is an example of inheritance. We start off with the class `SuperClass` from which 
the classes `SubClassA` and `SubClassB` will inherit from:

<script src="https://gist.github.com/eliucs/d1a52e5b81e194b1392b2881d5e3dd26.js"></script>

The class `SubClassA` inherits from `SuperClass`, meaning that we have access to the superclass
object through the keyword `super`. Thus to be able to set the `name` and `value` fields in the
superclass, we can call the superclass constructor. As usual, the constructor can be overloaded
with different parameters, and also call the other superclass constructor:

<script src="https://gist.github.com/eliucs/2d79551c5b5ffcfa8b613025461c41bd.js"></script>

Note that `SubClassA` does not have `method`. However, because it inherits from method, we have
access to the `method` in `SuperClass`:

<script src="https://gist.github.com/eliucs/cb658d0fa9c2a8b6e20832f977e80b47.js"></script>

And when run, this gives the output:

```
name: default value: 0
name: Mary Doe value: 200
```

Since the `SubClassA` has an "is-a" relationship with `SuperClass`, we can always define a 
`SuperClass` to be an instance of a `SubClassA`, and it will have the same functionality:

<script src="https://gist.github.com/eliucs/47d412734ffd3836d6f708b11c87ad44.js"></script>

And when run, this gives the output:

```
name: default value: 0
name: Mary Doe value: 200
```

With `SubClassB`, it is very similar to `SubClassA` except that we override `method` from the
`SuperClass`. This allows us to give `SubClassB` its own implementation of `method`, which in this
example, just prints out its `valueB` field: 

<script src="https://gist.github.com/eliucs/e91064c7817e6a5c9d6dc1b1a873e37a.js"></script>

Then to see that the `method` implementation has been overriden:

<script src="https://gist.github.com/eliucs/9e7f3711c5d1484038a913a383ed9c9e.js"></script>

Which gives the output:

```
valueB: 0
valueB: 100
```