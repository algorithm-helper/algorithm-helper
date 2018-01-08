# Prototype

The prototype pattern is a design pattern used to create objects using a prototype instance. A 
typical problem would be that we want to avoid subclasses of an object creator, or want to avoid 
creating a new object with the `new` keyword. 

The main idea behind the prototype pattern is that we have an interface `Prototype` that specifies
a `clone` method. We have concrete prototype methods that implement the `Prototype` interface, and
these classes may be `ConcretePrototypeA`, `ConcretePrototypeB`, `ConcretePrototypeC`, etc. Then
in a factory class for example, we can map names of concrete prototypes to an instance, and every 
time we need to get a copy of a particular concrete prototype, we look it up in the map, then call
the `clone` on the prototype instance. 

Clearly, for a client, they are able to get instances of a particular concrete prototype without
needing to explicitly call the `new` keyword to instantiate that object.

### Implementation

##### Java

The following is the `Prototype` interface, which has a `clone` method:

<script src="https://gist.github.com/eliucs/5cf0a5006b7f2f2c6c3bd2ba2d3886a7.js"></script>

The following class `ConcretePrototypeA` is one such concrete prototype that implements `Prototype`.
Note that it has an `id` field, which we will use later to verify that we are instantiating the 
correct class:

<script src="https://gist.github.com/eliucs/4b5d9a98bb9a03a66249f8ebf601304c.js"></script>

The following class `ConcretePrototypeB` is another such concrete prototype that implements 
`Prototype`:

<script src="https://gist.github.com/eliucs/efd65ec3bdd556c21628624a0b3e1e16.js"></script>

The following class `ConcretePrototypeC` is another such concrete prototype that implements 
`Prototype`:

<script src="https://gist.github.com/eliucs/c84271ecaf4b144f0fe4020637906929.js"></script>

Then suppose that for the purposes of this example, we want to use a `Factory` to instantiate
`Prototype` object, but we do not want to use the `new` keyword when doing so. Instead, we have a 
map that maps the names of these concrete `Prototype` objects to an instance, a prototypical
instance, from which we `clone` whenever neeeded, instead of using the `new` keyword for
instantiation:

<script src="https://gist.github.com/eliucs/4b4286810708292cc8bc2ae3765e9e95.js"></script>

Then we can test this by taking in system input, instantiating the corresponding concrete 
`Prototype` object from the `Factory`, and printing out the `id` of the `Prototype`:

<script src="https://gist.github.com/eliucs/87e51ad1781788d84dd35906c8cb44fe.js"></script>

Then suppose we have the following input:

```
A B C D done
```

We get the expected output:

```
ConcretePrototypeA
ConcretePrototypeB
ConcretePrototypeC
```

And thus we have been able to successfully instantiate concrete `Prototype` objects by cloning
with the `clone` method instead of explicitly using the `new` keyword. 
