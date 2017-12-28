# Introduction

The topic in this section is design patterns, which are generally accepted solutions to commonly
recurring problems. They are able to provide a widely recognizable template for software design,
which better communicates the interactions between modules or classes within a software project.
We will look at the following design patterns, which are some of the most common patterns 
found in modern day software design: adapter, bridge, builder, chain of responsibility, command, 
composite, decorator, facade, flyweight, interpreter, iterator, mediator, memento, null object, 
observer, prototype, proxy, singleton, state, strategy, template method, and visitor. For each of 
these design patterns, we will explain the context behind using them by showing the problem that we 
are trying to solve, and how the design pattern aims to solve it. 

Typically, we think of design patterns in the context of object-oriented design: in large scale
software design, design patterns give the software a sense of uniformity and extensibility. 
Especially if developers are going to come and go working on a certain project, design patterns can
facilitate new developers to quickly understand the structure of the software.

### Terminology

We begin with terminology that would be useful in this section.

From Wikipedia:

> [Software design pattern](https://en.wikipedia.org/wiki/Software_design_pattern) -  a general 
reusable solution to a commonly occurring problem within a given context in software design. It is 
not a finished design that can be transformed directly into source or machine code. It is a 
description or template for how to solve a problem that can be used in many different situations. 
Design patterns are formalized best practices that the programmer can use to solve common problems 
when designing an application or system.

Design patterns speed up development time because they provide proven development paradigms. The key
is to understand which is the most appropriate to apply in a particular situation. What we want to
avoid are software anti-patterns, which are typically naive solutions that end up with negative
consequences, that are "bad practices", and do not scale well.

From Wikipedia:

> [Anti-pattern](https://en.wikipedia.org/wiki/Anti-pattern) - a common response to a recurring 
problem that is usually ineffective and risks being highly counterproductive.

Many aspects of design patterns involve the theme of software reusability, which refers to being 
able to repeatedly use a particular piece of code or module similarly in different places of the 
software without needing to recode or reinvent the wheel each time it is needed. In addition, they 
help with improving modularity, which refers to separating the different functionality into their 
own reusable, respective components. 

From Wikipedia:

> [Reusability](https://en.wikipedia.org/wiki/Reusability) - the use of existing assets in some form 
within the software product development process. Assets are products and by-products of the software development life cycle and include code, software components, test suites, designs and 
documentation. 

> [Modular programming](https://en.wikipedia.org/wiki/Modular_programming) - a software design 
technique that emphasizes separating the functionality of a program into independent, 
interchangeable modules, such that each contains everything necessary to execute only one aspect of 
the desired functionality.

Another aspect is that design patterns are intuitive by name and thus self-documenting. Having 
knowledge of design patterns makes it easy to communicate concepts concisely without the use of 
over-documentation to describe parts of the software.
