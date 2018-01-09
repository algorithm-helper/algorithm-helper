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

```
package com.algorithmhelper.designpatterns.nullobject;

public abstract class AbstractRequest {

    protected String data;

    /**
     * Initializes an AbstractRequest.
     *
     * @param data
     */
    public AbstractRequest(String data) {
        this.data = data;
    }

    /**
     * Performs operation on the data of this AbstractRequest.
     */
    public abstract void operation();
}
```

The following is the `RealRequest` class:

```
package com.algorithmhelper.designpatterns.nullobject;

public class RealRequest extends AbstractRequest {

    /**
     * Initializes an RealRequest.
     *
     * @param data
     */
    public RealRequest(String data) {
        super(data);
    }

    /**
     * Performs operation on the data of this RealRequest.
     */
    public void operation() {
        System.out.println("data from RealRequest: " + data);
    }
}
```

The following is the `NullRequest` class:

```
package com.algorithmhelper.designpatterns.nullobject;

public class NullRequest extends AbstractRequest {

    /**
     * Initializes an NullRequest.
     */
    public NullRequest() {
        super(null);
    }

    /**
     * Performs operation on the data of this NullRequest.
     */
    public void operation() {}
}
```

Then we can test this by creating two instances of `AbstractRequest`, one being a `RealRequest` and
one being a `NullRequest`, and seeing their behavior when we call the method `operation`:

```
package com.algorithmhelper.designpatterns.nullobject;

public class NullObjectTest {

    public static void main(String[] args) {
        AbstractRequest requestReal = new RealRequest("test");
        AbstractRequest requestNull = new NullRequest();

        requestReal.operation();
        requestNull.operation();
    }
}
```

We get the expected output:

```
data from RealRequest: test
```

Clearly, we have no behavior from the `NullRequest`.
