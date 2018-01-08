# Factory

The factory pattern, also called the factory method pattern, is a design pattern used to for a 
client to instantiate objects without needing to use the `new` keyword. A typical problem is that 
we want to construct and instantiate objects particularly in cases when their construction is 
complex, or needs particular parameters at run time. Generally, using factories are more expressive. 

The main approach is that we have a `Factory` class that returns the particular object. For the 
purposes of our example, we call these `Product` objects. Then `Factory` has a method called 
`getProduct` which creates the `Product` based off of particular parameters given. Note that the
actual part of constructing the `Product` to return to the client can be done in many ways, with 
different behavior: for example, we could make use of the decorator pattern to be able to customize
the `Product` at run time, or use the prototype pattern to be able to returns copies, or clones, 
of prototypical instances. The `getProduct` method is static.

### Implementation

##### Java

The following is the `Product` interface:

<script src="https://gist.github.com/eliucs/2e67b1c383810b3b17712615accbf320.js"></script>

The following is the `ConcreteProductA` class:

<script src="https://gist.github.com/eliucs/5d072fb3b6277765184b5d4e4ecdecca.js"></script>

The following is the `ConcreteProductB` class:

<script src="https://gist.github.com/eliucs/66af25d56a97df76b455e41413cd40ad.js"></script>

The following is the `ConcreteProductC` class:

<script src="https://gist.github.com/eliucs/4567ef0551c0e196b039ebde7d58c585.js"></script>

The following is the `Factory` class, which has the static `getProduct` method. It takes in a `name`
as an argument and returns the corresponding `Product`:

<script src="https://gist.github.com/eliucs/74a478b9aff60451e26a4ad1d53347be.js"></script>

Then we can test it by taking in system input, and passing in the input to the `Factory` to 
create them, and return them back to the client:

<script src="https://gist.github.com/eliucs/a1b77253b293195461a6ca73892c49dd.js"></script>

Suppose that our input was:

```
A B C done
```

We get the expected output:

```
ConcreteProductA
ConcreteProductB
ConcreteProductC
```

And thus we have been able to successfully instantiate `Product` objects without the client needing
to explicitly create them using the `new` keyword, but instead have that delegated to the 
factory.
