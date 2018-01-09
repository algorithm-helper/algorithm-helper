# Introduction

Object oriented programming is a programming paradigm based around the concept of "objects", which 
are entities that may contain data, in the form of fields, and code, in the form of methods. We
will look at various aspects of object oriented programming in this section: classes and instances,
inheritance, encapsulation, and polymorphism. 

From Wikipedia:

> [Object-oriented programming (OOP)](https://en.wikipedia.org/wiki/Object-oriented_programming) - 
a programming paradigm based on the concept of "objects", which may contain data, in the form of 
fields, often known as attributes; and code, in the form of procedures, often known as methods. A 
feature of objects is that an object's procedures can access and often modify the data fields of the 
object with which they are associated (objects have a notion of "this" or "self"). In OOP, computer
programs are designed by making them out of objects that interact with one another. There is 
significant diversity of OOP languages, but the most popular ones are class-based, meaning that 
objects are instances of classes, which typically also determine their type.

### Terminology

The general idea behind the use of objects is to model the relationships between different entities
of different types. They hold data that is relevant to their type, and that data is called a field,
property or record. One such example could be if we have the following situation:

<img src="https://i.imgur.com/JcAVs8a.png" alt="OOP Basic Example" class="img-fluid">

`Car` and `Motorcycle` are types of `Vehicle`, but there is no such thing as a "vehicle" itself. 
"Vehicle" represents the abstract concept of an object for transportation, but it is "cars", 
"motorcycles", "trucks", "buses" etc. that actually exist concretely, have data associated
with them, and can be used. Fields associated with a particular vehicle may be `model`, `make`,
`registrationNumber`, for example. We may want to store a field `numberOfWheels`, however this is 
not unique to "car" or "motocycle", and instead this field can be stored in `Vehicle`. Suppose we 
want an operation to fix the particular vehicle. We would want this to be different for cars and
for motorcycles, and would want to make sure that our code for cars is shielded from being used on 
a motorcycle, or otherwise we would have unintended and undefined behavior. 

Although this example is simple, all of these aspects are related to the concept of classes and
instances, inheritance, encapsulation, and polymorphism. Typically, we use a unified modelleling
language (UML) diagram to visualize the relationships. 

Furthermore, in the section on design patterns, we will show generally accepted solutions in 
commonly occuring problems, in the context of object oriented programs.

The following are terminology used in this section:

- class
    - Definitions of the fields and methods for a given type of object.
- object
    - Instances of classes.
- instance
    - Concrete occurence of an object.
- instantiation
    - Creation of an instance of a class.
- field
    - Also known as property or record, this is the data associated with a particular object.
- method
    - Code or a procedure within a class.
- coupling
    - Degree to which different modules or classes depend on each other.
- cohesion
    - Degree to which elements of a class are related to each other.
- superclass / base class
    - A master class from which other classes may be derived from (i.e. acquire or override 
    certain fields or methods).
- subclass / derived class
    - A class below the superclass that acquires or overrides certain fields or methods.
- inheritance
    - A subclass is derived from a superclass, and acquires certain fields or methods of the 
    superclass.
- encapsulation
    - The restriction of access to an object's data.
- overloading
    - Multiple methods with the same name but possibly different parameters, return values, and 
    implementations. Typically in most languages that allow for overloading, the parameters must
    be unique.
- overrriding
    - A subclass provides an implementation to a method that a superclass already has.
- abstract method
    - A method that is declared, but has no implementation.
- abstract class
    - A class that has at least one abstract method. It follows that we cannot instantiate an
    abstract class, and must instead have a subclass of the abstract class that at least 
    implements all of the abstract methods.
- interface
    - An abstract type that has only declarations of methods, no implementations.
- polymorphism
    - Refers to the fact that an object can take on many types. Typically, we have a superclass
    reference that could refer to any subclass object.
    