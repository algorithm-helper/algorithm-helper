# Chain of Responsibility

The chain of responsibility pattern is a design pattern used to allow more than one handler to 
handle a request object. A typical problem could be that we have a multiple nodes or handler 
objects that are able to process a request object, but we do not want to couple the sender of the
request to a single handler. We want to be able to have a dynamic number of handler objects, and 
add and remove them at will.

The main approach with the chain of responsibility pattern is to have a pipeline abstraction that
contains a chain of handlers objects. There is a class `Handler` that contains a field `next` 
referencing the next `Handler` in the chain, similar to a linked list. They will wrap around the 
root `Handler`, that is, if the request has been passed through every `Handler` in the chain 
without being processed, it gets passed in the root handler again. Then we have a class `Pipeline` 
that wraps around the root of the chain. Whenever we need to process a request object, we pass it
into the `Pipeline`, which then passes it into the root of the `Handler` chain.

### Implementation

##### Java

For the purposes of this example, we will give each `Handler` an `id` to distinguish it from the 
other `Handlers` as well as determine whether the `Handler` handles the request or passes it to the
next in the chain by a random number, and give each `Handler` a 10% probability of handling the 
request:

<script src="https://gist.github.com/eliucs/5fb1558b2e7996c0ad20ea691631ec3b.js"></script>

Then the `Pipeline` class wraps around the `root` of the chain of `Handler` objects, and gives the 
client an abstraction away from the actual chaining of the `Handler` objects. To handle a 
`Request` object, it passes it into the `root` of the chain:

<script src="https://gist.github.com/eliucs/1a96ec4ab4a5e1435fdb8a257d914520.js"></script>

For the purposes of this example, the `Request` object contains nothing more than a unique `id`:

<script src="https://gist.github.com/eliucs/7bd9da7ade521a931191c2d2c355b1d0.js"></script>

To test it, we initialize a `Pipeline` with 10 `Handler` objects, then make handle 5 `Request` 
objects:

<script src="https://gist.github.com/eliucs/af34fbc99db37252ff4ae85e3bd41c05.js"></script>

We get the output:

```
handler: 0, request: 0
handler: 9, request: 1
handler: 0, request: 2
handler: 7, request: 3
handler: 6, request: 4
```

The output will of course be different every time the program is run. Clearly, we have been able
to successfully handle requests through the pipeline abstraction and avoid coupling the request to
a specific handler. 
