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

```
package com.algorithmhelper.softwareengineering.designpatterns.command;

public interface Command {

    /**
     * Performs some operation on the Command object.
     */
    void method();

    /**
     * Returns the id of this Command object.
     *
     * @return the id of this Command object
     */
    String getId();
}
```

The following is one such concrete command class, `ConcreteCommandA`:

```
package com.algorithmhelper.softwareengineering.designpatterns.command;

public class ConcreteCommandA implements Command {

    private String id = "ConcreteCommandA";

    /**
     * Prints out a message saying it is from the implementation from ConcreteCommandA.
     */
    public void method() {
        System.out.println("method from ConcreteCommandA");
    }

    /**
     * Returns the id of this ConcreteCommandA object.
     *
     * @return the id of this ConcreteCommandA object
     */
    public String getId() {
        return id;
    }
}
```

The following is another such concrete command class, `ConcreteCommandB`:

```
package com.algorithmhelper.softwareengineering.designpatterns.command;

public class ConcreteCommandB implements Command {

    private String id = "ConcreteCommandB";

    /**
     * Prints out a message saying it is from the implementation from ConcreteCommandB.
     */
    public void method() {
        System.out.println("method from ConcreteCommandB");
    }

    /**
     * Returns the id of this ConcreteCommandB object.
     *
     * @return the id of this ConcreteCommandB object
     */
    public String getId() {
        return id;
    }
}
```

The following is another such concrete command class, `ConcreteCommandC`:

```
package com.algorithmhelper.softwareengineering.designpatterns.command;

public class ConcreteCommandC implements Command {

    private String id = "ConcreteCommandC";

    /**
     * Prints out a message saying it is from the implementation from ConcreteCommandC.
     */
    public void method() {
        System.out.println("method from ConcreteCommandC");
    }

    /**
     * Returns the id of this ConcreteCommandC object.
     *
     * @return the id of this ConcreteCommandC object
     */
    public String getId() {
        return id;
    }
}
```

Then we have the `CommandProducer`, which generates `Command` objects based on their corresponding
names:

```
package com.algorithmhelper.softwareengineering.designpatterns.command;

public class CommandProducer {

    /**
     * Returns a Command by the specified name.
     *
     * @param name, the name of the Command
     * @return a Command by the specified name
     */
    public Command getCommand(String name) {
        if (name.equals("A"))
            return new ConcreteCommandA();
        else if (name.equals("B"))
            return new ConcreteCommandB();
        else if (name.equals("C"))
            return new ConcreteCommandC();
        return null;
    }
}
```

Then we have the `CommandConsumer`, which recieves and processes the `Command` objects based on 
they corresponding `id` fields:

```
package com.algorithmhelper.softwareengineering.designpatterns.command;

public class CommandConsumer {

    /**
     * Processed the given Command object.
     *
     * @param command, the Command object
     */
    public void process(Command command) {
        if (command.getId().equals("ConcreteCommandA"))
            System.out.println("processed ConcreteCommandA");
        else if (command.getId().equals("ConcreteCommandB"))
            System.out.println("processed ConcreteCommandB");
        else if (command.getId().equals("ConcreteCommandC"))
            System.out.println("processed ConcreteCommandC");
        else
            System.out.println("was not processed");
    }
}
```

We can then test the example, assuming that the `Command` objects represent requests:

```
package com.algorithmhelper.softwareengineering.designpatterns.command;

import java.util.Scanner;

public class CommandTest {

    public static void main(String[] args) {
        Scanner in = new Scanner(System.in);
        CommandProducer commandProducer = new CommandProducer();
        CommandConsumer commandConsumer = new CommandConsumer();

        while (in.hasNext()) {
            String next = in.next();

            if (next.equals("done"))
                break;

            Command command = commandProducer.getCommand(next);
            commandConsumer.process(command);
        }
    }
}
```

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
