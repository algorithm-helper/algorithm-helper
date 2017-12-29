# Decorator

The decorator pattern is a design pattern used to dynamically attach different properties to an 
object. A typical problem could be that we would like to customize properties, state, behavior, or
functionality of an object at runtime, but inheritance would not work because it is static and thus
the functionality is fixed.

The main approach is that we dynamically add functionality by recursively add decorators onto an 
object. We have an `Interface`, which is the interface of the object that we are trying to 
customize, and all of its functionality is abstract. We have a `Base`, which is the basic most 
version of the object when we try to instantiate the `Interface`. Then to customize the `Interface`
object, also called "decorating" it, we have an `AbstractDecorator` class, which takes in an
`Interface` reference in its constructor. Then we can specify different concrete decorators
(`ConcreteDecoratorA`, `ConcreteDecoratorB`, `ConcreteDecoratorC`, etc.) that extend the 
`AbstractDecorator` to be able to provide their own respective different functionalities.

Then, at run time, we first instantiate an `Interface` as a `Base` object. Say the client is to 
type in as input into the program their specifications or customizations for the object, then we 
simply wrap the `Interface` around the corresponding (concrete) decorator. In a real world 
application, this could be adding accessories to a car, toppings to a pizza, or extra features to a 
cell phone plan, for example.

### Implementation

##### Java

The following is the `Interface`:

<script src="https://gist.github.com/eliucs/cae3ede5de894d341fd4236d7430ff1f.js"></script>

The `Base` class, which implements the `Interface`, is the basic most version of the `Interface`. 
Here, it has a method `method` to print out a message saying that it is from the `Base` class
implementation:

<script src="https://gist.github.com/eliucs/c855bae043e01f76c99f20a07f2c1886.js"></script>

The `AbstractDecorator` takes in an `Interface` as an argument to its constructor, and this is 
what enables the recursive wrapping of the `Interface` object with the needed concrete decorators:

<script src="https://gist.github.com/eliucs/695771c4a89842eea52d166dbdddfba8.js"></script>

The `ConcreteDecoratorA` class is one such decorator that extends `AbstractDecorator`, and for 
clarity overrides `method` to print out a message saying that it is from the `ConcreteDecoratorA`
implementation:

<script src="https://gist.github.com/eliucs/625255c90fed542fb8cdb5f7ea62835c.js"></script>

The `ConcreteDecoratorB` class is another decorator that extends `AbstractDecorator`, and 
overrides `method` to print out a message saying that it is from the `ConcreteDecoratorB`
implementation:

<script src="https://gist.github.com/eliucs/0af464259484652c0dd2aca851300cd6.js"></script>

The `ConcreteDecoratorC` class is another decorator that extends `AbstractDecorator`, and 
overrides `method` to print out a message saying that it is from the `ConcreteDecoratorC`
implementation:

<script src="https://gist.github.com/eliucs/49c3d626bdb3440e1c8347adb1a4bdb4.js"></script>

Then to test, suppose that we take in from the system's input to customize the `Interface`,
which is initially instantiated as a `Base` object. When we type in the letter `A`, we add 
`ConcreteDecoratorA`'s functionality, when we type in the letter `B`, we add 
`ConcreteDecoratorB`'s functionality, and when we type in the letter `C`, we add 
`ConcreteDecoratorC`'s functionality:

<script src="https://gist.github.com/eliucs/fd439e641180a3cebae2b9d1e6e25aea.js"></script>

Suppose our input is:

```
A B C done
```

Then we get the expected output:

```
method from Base
method from ConcreteDecoratorA
method from ConcreteDecoratorB
method from ConcreteDecoratorC
```

And thus we were able to successfully add functionality to the `Interface` object dynamically at
runtime.
