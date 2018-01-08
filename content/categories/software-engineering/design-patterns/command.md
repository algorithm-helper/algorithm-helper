# Command

The command pattern is a design pattern used to encapsulate a request as an object. A typical 
problem could be that we want to decouple the the object that creates the request from the object
that recieves and processed the request.

The main approach to the command pattern is that we create an interface `Command` that contains
the needed methods that operation on this particular command or request. We have concrete commands,
say `ConcreteCommandA`, `ConcreteCommandB`, `ConcreteCommandC`, etc. that actually implement these
methods in whatever way they need. Then when we produce the requests, perhaps with a
`CommandProducer`, we have encapsulated them in a `Command` object, to which we send to a 
`CommandConsumer` that recieves and processes it.

### Implementation

##### Java

The following is the `Command` interface:

<script src="https://gist.github.com/eliucs/f6fcbb1ec7374dbab3dc800b345d40da.js"></script>

The following is one such concrete command class, `ConcreteCommandA`:

<script src="https://gist.github.com/eliucs/2c5cd001cfade514f875e38053d60d3e.js"></script>

The following is another such concrete command class, `ConcreteCommandB`:

<script src="https://gist.github.com/eliucs/ff0284053521f69dc9530607138f3dba.js"></script>

The following is another such concrete command class, `ConcreteCommandC`:

<script src="https://gist.github.com/eliucs/f55854be1e2d0f482f8b581314c2cfeb.js"></script>

Then we have the `CommandProducer`, which generates `Command` objects based on their corresponding
names:

<script src="https://gist.github.com/eliucs/e7d0df80bbf3e3460ed8f458d9064b9b.js"></script>

Then we have the `CommandConsumer`, which recieves and processes the `Command` objects based on 
they corresponding `id` fields:

<script src="https://gist.github.com/eliucs/38c009062e76d4ef2db4c5211986b84f.js"></script>

We can then test the example, assuming that the `Command` objects represent requests:

<script src="https://gist.github.com/eliucs/de3ff0fd164b5bdc88f7c444ece4bc92.js"></script>

Then suppose that our input is:

```
A B C D done
```

We get the expected output:

```
processed ConcreteCommandA
processed ConcreteCommandB
processed ConcreteCommandC
was not processed
```

Clearly, we have been able to encapsulate requests and decouple them with the producer and consumer
of the request.
