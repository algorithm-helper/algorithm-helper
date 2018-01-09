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

```
package com.algorithmhelper.designpatterns.chainofresponsibility;

public class Handler {

    private static int globalID = 0;
    private int id;
    private Handler next;

    /**
     * Initializes a Handler object.
     *
     */
    public Handler() {
        id = globalID++;
    }

    /**
     * Inserts the next Handler to the chain.
     *
     * @param next, the next Handler
     */
    public void insertHandler(Handler next) {
        if (this.next == null)
            this.next = next;
        else
            this.next.insertHandler(next);
    }

    /**
     * Handles the request with a 0.1 probability.
     *
     * @param request, the Request object
     */
    public void handleRequest(Request request) {
        if (Math.random() < 0.1)
            System.out.println("handler: " + id + ", request: " + request.getID());
        else
            next.handleRequest(request);
    }
}
```

Then the `Pipeline` class wraps around the `root` of the chain of `Handler` objects, and gives the 
client an abstraction away from the actual chaining of the `Handler` objects. To handle a 
`Request` object, it passes it into the `root` of the chain:

```
package com.algorithmhelper.designpatterns.chainofresponsibility;

public class Pipeline {

    private Handler root;

    /**
     * Initializes a Pipeline, and inserts n Handlers to the root Handler, then wraps the
     * root Handler to itself.
     *
     * @param n, the number of Handler objects to include in the Pipeline
     */
    public Pipeline(int n) {
        root = new Handler();
        for (int i = 0; i < n-1; i++)
            root.insertHandler(new Handler());
        root.insertHandler(root);
    }

    /**
     * Handles the request by passing it in to the root Handler.
     *
     * @param request, the Request object
     */
    public void handleRequest(Request request) {
        root.handleRequest(request);
    }
}
```

For the purposes of this example, the `Request` object contains nothing more than a unique `id`:

```
package com.algorithmhelper.designpatterns.chainofresponsibility;

public class Request {

    private static int globalID = 0;
    private int id;

    /**
     * Initializes a Request.
     */
    public Request() {
        id = globalID++;
    }

    /**
     * Returns the id of the Request.
     * @return the id
     */
    public int getID() {
        return id;
    }
}
```

To test it, we initialize a `Pipeline` with 10 `Handler` objects, then make handle 5 `Request` 
objects:

```
package com.algorithmhelper.designpatterns.chainofresponsibility;

public class ChainOfResponsibilityTest {

    public static void main(String[] args) {
        Pipeline pipeline = new Pipeline(10);

        for (int i = 0; i < 5; i++) {
            Request request = new Request();
            pipeline.handleRequest(request);
        }
    }
}
```

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
