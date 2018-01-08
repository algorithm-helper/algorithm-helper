# Template Method

The template method pattern is a design pattern used to define a skeleton of a particular object. A
typical problem could be that we have some base class that has a method which uses several 
operations. Some of these operations are defined within that class itself, but we want to allow
for flexibility to change up parts of the implementation. 

The main approach to the template method is that we start off with the base class. For the purposes
of the example, suppose that we are trying to draw a person. We need to draw the person's head, 
body, and legs, but the base class only specifies how to draw the head. We defer the operations to
draw the body and the legs to other classes that extend the base class. We can then have a class
that draws the body but not the legs, or the body and legs, except it defers a part of drawing the 
legs to draw feet, for example. We will see this example down below. Any operation we want to 
implement in the base class itself if `private`, everything else is `public`.

The purposes of this design pattern is to allow for much more flexibility and customizability in 
instantiating a class, and separate our implementations for each part. It has very clear 
applications, such as if we were customizing a character in a video game, or having an algorithm
implementation in which parts of the algorithm could be swapped out for others.

### Implementation

##### Java

For this example, we start off with the base class, which is the abstract class `DrawBase`. Clearly,
since it implements the `drawHead` method, it is private, and the operations that need to be 
deferred to other classes that extend `DrawBase`, which are `drawBody` and `drawLegs`, are `public`:

<script src="https://gist.github.com/eliucs/1e2ae12b79e1f10cefd59ef0c7965c8e.js"></script>

The following is the abstract class `DrawBodyLegs`, which implements the `drawBody` and `drawlegs` 
methods, however, in addition to drawing the legs, we need to draw the feet with the `drawFeet`
method, however, this is deferred to a subclass:

<script src="https://gist.github.com/eliucs/1d8a3e6c33cb8b2a2ab24cb5a30f6cfc.js"></script>

The following is the `DrawFeet` class, which implements the `drawFeet` method:

<script src="https://gist.github.com/eliucs/b614078641e3d3e59a5a9216b1112a87.js"></script>

Then we can test it by drawing out the whole body:

<script src="https://gist.github.com/eliucs/5d40c0ba8983d14ebc247ce6e904d2b3.js"></script>

We get the expected output:

```
head from DrawBase
body from DrawBodyLegs
legs from DrawBodyLegs
feet from DrawFeet
```

And thus, we have been able to successfully have a base class method, with parts that are deferred
to subclasses, and parts that it implements itself.
