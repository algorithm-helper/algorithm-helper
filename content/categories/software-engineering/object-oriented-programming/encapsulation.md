# Encapsulation

Encapsulation refers to the restriction of accessing data such as fields and methods of an object.
To begin, we need to know about the various access levels into an object. In Java for example, we 
have:

- `public`
    - Visible within the class, package, subclasses, and all other classes.
- `protected`
    - Visible within the class, package, and subclasses.
- default
    - Visible within the class, and package.
- `private`
    - Visible within the class only.

The main idea behind encapsulation is that we want to only the data that should be accesible to 
subclasses and other classes outside the package be accessible, and anything else to be private. In
some contexts, we want to maintain some invariant inside the class: for example with a dynamic 
array, we do not want to make the array back-end to be publically visible because then another
class could tamper with the internal data of the dynamic array.

Furthermore, in the context of inheritance, we may only want certain fields and methods to be 
inherited. To be able to control access, we can simply use the `private` keyword.

### Getter and Setter

We may still want outside classes to have access to internal fields of the class, but in a 
controlled manner. To do so, we want to use getters and setters. Getters are methods whose only
purpose is to return a field (or a particular aspect) of the field to a client, and setters are
methods whose only purpose is to change those fields. The naming convention is to append `get` and
`set` to those field names, respectively.

The following is a simple example of where this may be necessary. Suppose we had an `Account` class
that represents someone's bank account. We would only want outside clients to be able to get the 
`balance`, but not be able to directly access the `balance` field in the `Account` object itself,
because then clients can simply set it to any amount they want. We want to control changing of the
`balance`, so the only way for a client to change it is through the `deposit` method:

<script src="https://gist.github.com/eliucs/02b20e760d914b51f1cd8b4b4568d265.js"></script>

Clearly, we are only able to access the `balance` data directed through the getter method 
`getBalance` and modify it with the setter method `deposit`:

<script src="https://gist.github.com/eliucs/eea91f352f9b4c2337f169bccca7186e.js"></script>

### Example

The following is an example of a class `Class` with a `private` field `secretID` and `private` method
`modifySecretID` that no other class has access to:

<script src="https://gist.github.com/eliucs/164e465115a13e7ce3c73f3da2f2790b.js"></script>

Note that trying to call the method `modifySecretID` outside `Class` does not work, and so it is
commented out:

<script src="https://gist.github.com/eliucs/8ef90c9b809fc79008d5c643f4479704.js"></script>


