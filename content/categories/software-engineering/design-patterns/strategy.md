# Strategy

The strategy pattern is a design pattern used to encapsulate a family of interchangeable algorithms,
and letting the client choose the implementation. A typical problem could be we want to bury the 
implementation details for algorithms because they are complex, require helper functions or 
additional local data structures to facilitate them. 

A simple example could be trying to encapsulate a family of sorting algorithms: say for insertion 
sort, merge sort, and heap sort. While insertion sort and merge sort's implementations are 
straightforward, we will need to maintain a heap, as well as implement operations like `heapifyDown`
for heap sort. It would be better to encapsulate them all in a strategy hierarchy, with a 
`SortingStrategy` interface, and classes `InsertionSort`, `MergeSort`, and `HeapSort` that 
implement it.

The main idea approach is that we have an interface `Strategy`, that defines the 
algorithms or operations. Then we have multiple classes of concrete strategies 
(`ConcreteStrategyA`, `ConcreteStrategyB`, `ConcreteStrategyC`, etc.) that implement `Strategy`, 
and have their own implementation of the needed algorithms or operations. Then we have a class 
called the `Context`, which has an instance of a `Strategy`, and keeps track of which concrete
strategy is being used and should be applied.

### Implementation

##### Java

For the following example, suppose that we have a strategy that involves performing operations on
an array or integers, and we would like the following operations: add one to every element in the 
array, subtract one to every element in the array, and square every element in the array. To 
conform to the strategy pattern, we start off with the `Strategy` interface:

```
package com.algorithmhelper.designpatterns.strategy;

public interface Strategy {

    /**
     * Performs the operation on the array.
     *
     * @param a
     */
    void operation(int[] a);
}
```

Then we have `ConcreteStrategyA`, which implements `operation`, adding one to every element in the
array:

```
package com.algorithmhelper.designpatterns.strategy;

public class ConcreteStrategyA implements Strategy {

    /**
     * Performs the operation on the array, by adding 1 to every element in the array.
     *
     * @param a
     */
    public void operation(int[] a) {
        for (int i = 0; i < a.length; i++)
            a[i]++;
    }
}
```

Then we have `ConcreteStrategyB`, which implements `operation`, subtracting one from every element 
in the array:

```
package com.algorithmhelper.designpatterns.strategy;

public class ConcreteStrategyB implements Strategy {

    /**
     * Performs the operation on the array, by subtracting 1 from every element in the array.
     *
     * @param a
     */
    public void operation(int[] a) {
        for (int i = 0; i < a.length; i++)
            a[i]--;
    }
}
```

Then we have `ConcreteStrategyC`, which implements `operation`, squaring every element in the array:

```
package com.algorithmhelper.designpatterns.strategy;

public class ConcreteStrategyC implements Strategy {

    /**
     * Performs the operation on the array, by squaring every element in the array.
     *
     * @param a
     */
    public void operation(int[] a) {
        for (int i = 0; i < a.length; i++)
            a[i] *= a[i];
    }
}
```

The `Context` then has an instance of `Strategy` called `strategy`, and method `operation` that
performs the corresponding operation on the array, and prints out the contents of the array:

```
package com.algorithmhelper.designpatterns.strategy;

public class Context {

    private Strategy strategy;

    /**
     * Initializes a Context with a strategy.
     *
     * @param strategy, the Strategy object
     */
    public Context(Strategy strategy) {
        this.strategy = strategy;
    }

    /**
     * Performs the operation on the array a by calling the operation from the strategy, and
     * prints out the contents of a.
     *
     * @param a
     */
    public void operation(int[] a) {
        strategy.operation(a);
        for (int i : a)
            System.out.print(i + " ");
        System.out.println();
    }
}
```

We test that we are able to dynamically select the concrete strategy implementation at runtime by
taking in user input on an array `[0, 1, 2, 3]`. If the user types in `A`, then we use 
`ConcreteStrategyA`, if `B` then `ConcreteStrategyB`, and if `C` then `ConcreteStrategyC`:

```
package com.algorithmhelper.designpatterns.strategy;

import java.util.Scanner;

public class StrategyTest {

    public static void main(String[] args) {
        Context context;

        Scanner in = new Scanner(System.in);
        while (true) {
            int[] a = {0, 1, 2, 3};

            String input = in.next();

            if (input.equals("A"))
                context = new Context(new ConcreteStrategyA());
            else if (input.equals("B"))
                context = new Context(new ConcreteStrategyB());
            else if (input.equals("C"))
                context = new Context(new ConcreteStrategyC());
            else if (input.equals("done"))
                break;
            else
                continue;

            context.operation(a);
        }
    }
}
```

Suppose the input is:

```
A B C done
```

Then the expected output is:

```
1 2 3 4 
-1 0 1 2 
0 1 4 9 
```

Clearly we have successfully encapsulated a family of algorithms (`Strategy`) and be able to select 
a particular implementation at runtime. 
