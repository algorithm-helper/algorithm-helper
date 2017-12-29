# Singleton

The singleton pattern is a design pattern used when we need to ensure that a class can only be 
instantiated once, and all access to it is global. A typical problem could be that we have a 
database class that serves as the global storage of data throughout the software, and we need to 
ensure that all instances of the database point to, or refer to, the same database object. We may
not want to declare a global variable because it would crowd the global namespace.

The main approach behind the singleton pattern is to have a `Singleton` class that is responsible
for the initialization and access to the object, where the constructor is private, and the only
way to access an instance of the object is through a public static method `getInstance`.

### Implementation

##### Java

Suppose we had a `Singleton` class with the data `[0, 1, 2, 3]` that we would like to only have one
instance of it. Globally, anyone who access the `Singleton` has access to the same data, and thus 
changes to the `Singleton` data will be reflected across all references to it. Since we make the
constructor private, no client can actually "create" a `Singleton` object. But rather, we wrap the
one and only instance of the `Singleton`, and the only way to access it is through the static
method `getInstance`, which return this one instance. For the purposes of this example, we have 
methods `getData` and `changeData` that return the data and change all of the data to 0's, 
respectively:

<script src="https://gist.github.com/eliucs/88fe7b1b4b3a18c9e46d345c798dd09d.js"></script>

From the client's perspective, we can test this by trying to get multiple instances of the 
`Singleton` and show that they indeed reference the same instance. The commented line with 
`Singleton s3`, when uncommented, will give a compiler error, which shows that we cannot just create
another `Singleton`. First we print out the contents of `s1` and `s2`, and then from
`s1` to call the `changeData` method without doing the same from `s2`. Then we will print out the
contents again:

<script src="https://gist.github.com/eliucs/8951d6ac768380062095a0c3385e67ac.js"></script>

Then we get the expected output:

```
0 1 2 3 
0 1 2 3 
0 0 0 0 
0 0 0 0 
```

Clearly, both `s1` and `s2` start out with the same data, an array of integers being `[0, 1, 2, 3]`,
and even though we call the `changeData` method only on `s1`, it changes for `s2` as well. Thus 
anywhere in the program that a `Singleton` instance is needed, we are sure that all instances are 
the same.
