# Adapter

The adapter pattern is a design pattern used when a class has an incompatible interface. 
A typical problem could be the reuse of legacy components in a modern system. The components may 
take in incompatible parameters, or parameters in a different order, for example. 

The main approach is to wrap the incompatible class with an abstraction, which is the adapter class, 
that maps the use of the old component to what the new system expects. The client then calls the 
adapter's compatible methods which then uses the old component's methods. 

### Implementation

##### Java

For the following example, suppose that we have the legacy component `OldComponent`, which sums the 
values of an array of integers. However, suppose that in the new system, we are expecting to be
able to do these operations on a `List`.

Suppose that `NewComponentInterface` is the interface that we are expecting, to be able to perform
the operation on a `List`, not an array.

<script src="https://gist.github.com/eliucs/811533c32023363fcdcea139624fa354.js"></script>

The `OldComponent` has the method `operation`, but it expects an array of integers:

<script src="https://gist.github.com/eliucs/fe3ddb6ec096f5e7b70b647219c54b67.js"></script>

Then to reuse the `OldComponent`, we create a class `OldComponentAdapter`, which takes in an 
`OldComponent` object as a parameter, and wraps the old `operation` method with the new one, which
expects a `List`, as required by the interface.

<script src="https://gist.github.com/eliucs/74ce656f42be0b97062f00e1dbef5cec.js"></script>

Then when we actually have to use `operation` on a `List` of integers, we instantiate the 
`NewComponentInterface` with an `OldComponentAdapter` that wraps around a `OldComponent`:

<script src="https://gist.github.com/eliucs/8ef3c0d339f242b6e89e7d32b8a086b5.js"></script>
