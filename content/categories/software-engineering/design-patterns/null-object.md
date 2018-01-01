# Null Object

The null object pattern is a design pattern used to default the behavior of the absence or "null 
version" of a particular object. A typical problem could be that we explicitly need an object to
have no behavior, but would not want to use a `null` value (this will be different depending on the
language). We would like to avoid null pointer exceptions especially if we want to reference certain 
fields of the class, in the cases we have a `null` value.

The main approach is to create a separate class designating a null version of the object, with all
of the default fields and behavior that we would like when the object is null.

### Implementation

##### Java

For the purposes of this example, suppose that we have a request object `AbstractRequest`, and we
would like to define default behavior (or lack thereof) for when the request is empty. The following 
is the `AbstractRequest` class:

<script src="https://gist.github.com/eliucs/e1995fd3aa6e821a557edc537f2576f0.js"></script>

The following is the `RealRequest` class:

<script src="https://gist.github.com/eliucs/62d97c7c8e3a2ad8f1f38447a289b6dc.js"></script>

The following is the `NullRequest` class:

<script src="https://gist.github.com/eliucs/a405c808a075c80e0b80ec1700c66b07.js"></script>

Then we can test this by creating two instances of `AbstractRequest`, one being a `RealRequest` and
one being a `NullRequest`, and seeing their behavior when we call the method `operation`:

<script src="https://gist.github.com/eliucs/f3d14dd3e6a9ce1cccd9776ad6b0b065.js"></script>

We get the expected output:

```
data from RealRequest: test
```

Clearly, we have no behavior from the `NullRequest`.
