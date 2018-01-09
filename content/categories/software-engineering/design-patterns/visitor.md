# Visitor

The visitor pattern is a design pattern used for performing algorithms or operations on polymorphic
data structures without needing to modify the internal structures themselves. A typical problem
could be that we have a polymorphic data structure and would like to define operations on various 
classes in that data structure without changing the classes. Single dispatch would not be suitable
because we would not be able to retrieve the subclass type information.

The main approach with the visitor pattern is by means of double dispatch, and defining a separate 
visitor object hierarchy, where each subclass in that hierarchy performs a particular operation. 
Suppose that we start off with a tree hierarchy with an interface `AbstractNode`, and subclasses 
`UnaryNode` and `BinaryNode`. We would like to then define a visitor object hierarchy that is able 
to traverse through a tree of `AbstractNode` objects, and performing a particular operations on 
them, starting with the interface `Visitor`, and its concrete subclasses (`ConcreteVisitorA`, 
`ConcreteVisitorB`, `ConcreteVisitorC`, etc.) The `Visitor` has a method `visit` overloaded for 
every type of `AbstractNode` there is (i.e. `UnaryNode`, `BinaryNode`). To be able to implement 
double dispatch, the idea is that `AbstractNode` has a method `accept`, that takes in a `Visitor` 
as an argument, and in the method body, the `Visitor` calls the method `visit` on `this`, which 
will dynamically select the correct overloaded method. 

Clearly this mechanism facilitates double dispatch since it enables us to traverse through two
polymorphic hierarchies: `AbstractNode` and `Visitor`, and allows us to perform specific operations 
on a particular hierarchy, and for each class of that hierarchy to accept those operations.

### Implementation

##### Java

The following is the `AbstractNode` class, from which we extend the `UnaryNode` and `BinaryNode` 
classes:

```
package com.algorithmhelper.designpatterns.visitor;

public abstract class AbstractNode {

    private int data;

    /**
     * Initializes an AbstractNode with data.
     *
     * @param data
     */
    public AbstractNode(int data) {
        this.data = data;
    }

    /**
     * Returns the data.
     *
     * @return data
     */
    public int getData() {
        return data;
    }

    /**
     * Accepts a Visitor object to perform an operation on this AbstractNode.
     *
     * @param visitor
     */
    public abstract void accept(Visitor visitor);
}
```

The following is the `UnaryNode` class:

```
package com.algorithmhelper.designpatterns.visitor;

public class UnaryNode extends AbstractNode {

    AbstractNode next;

    /**
     * Initializes a UnaryNode.
     *
     * @param data
     * @param next
     */
    public UnaryNode(int data, AbstractNode next) {
        super(data);
        this.next = next;
    }

    /**
     * Returns the next AbstractNode.
     *
     * @return the next AbstractNode
     */
    public AbstractNode getNext() {
        return next;
    }

    /**
     * Accepts a Visitor to process this UnaryNode.
     *
     * @param visitor
     */
    public void accept(Visitor visitor) {
        visitor.visit(this);
    }
}
```

The following is the `BinaryNode` class:

```
package com.algorithmhelper.designpatterns.visitor;

public class BinaryNode extends AbstractNode {

    AbstractNode left;
    AbstractNode right;

    /**
     * Initializes a BinaryNode.
     *
     * @param data
     * @param left
     * @param right
     */
    public BinaryNode(int data, AbstractNode left, AbstractNode right) {
        super(data);
        this.left = left;
        this.right = right;
    }

    /**
     * Returns the left AbstractNode.
     *
     * @return the left AbstractNode
     */
    public AbstractNode getLeft() {
        return left;
    }

    /**
     * Returns the right AbstractNode.
     *
     * @return the right AbstractNode
     */
    public AbstractNode getRight() {
        return right;
    }

    /**
     * Accepts a Visitor to process this BinaryNode.
     *
     * @param visitor
     */
    public void accept(Visitor visitor) {
        visitor.visit(this);
    }
}
```

Then we have the `Visitor` interface, which has a method `visit` overloaded for each concrete type 
of `AbstractNode`, that is, `UnaryNode` and `BinaryNode`:

```
package com.algorithmhelper.designpatterns.visitor;

public interface Visitor {

    /**
     * Visits a UnaryNode and performs some operation.
     *
     * @param binaryNode, the UnaryNode object
     */
    void visit(UnaryNode binaryNode);

    /**
     * Visits a BinaryNode and performs some operation.
     *
     * @param binaryNode, the BinaryNode object
     */
    void visit(BinaryNode binaryNode);
}
```

The following is the `ConcreteVisitorA` class, which prints out the contents of the `data` of the
`AbstractNode` that it is visiting and a message that it is from the `ConcreteVisitorA` 
implementation of `visit`:

```
package com.algorithmhelper.designpatterns.visitor;

public class ConcreteVisitorA implements Visitor {

    /**
     * Visits a UnaryNode.
     *
     * @param unaryNode
     */
    public void visit(UnaryNode unaryNode) {
        System.out.println("ConcreteVisitorA visiting UnaryNode: " + unaryNode.getData());

        if (unaryNode.getNext() != null)
            unaryNode.getNext().accept(this);
    }

    /**
     * Visits a BinaryNode.
     *
     * @param binaryNode
     */
    public void visit(BinaryNode binaryNode) {
        System.out.println("ConcreteVisitorA visiting BinaryNode: " + binaryNode.getData());

        if (binaryNode.getLeft() != null)
            binaryNode.getLeft().accept(this);

        if (binaryNode.getRight() != null)
            binaryNode.getRight().accept(this);
    }
}
```

The following is the `ConcreteVisitorB` class, which prints out the contents of the `data` of the
`AbstractNode` that it is visiting and a message that it is from the `ConcreteVisitorA` 
implementation of `visit`:

```
package com.algorithmhelper.designpatterns.visitor;

public class ConcreteVisitorB implements Visitor {

    /**
     * Visits a UnaryNode.
     *
     * @param unaryNode
     */
    public void visit(UnaryNode unaryNode) {
        System.out.println("ConcreteVisitorB visiting UnaryNode: " + unaryNode.getData());

        if (unaryNode.getNext() != null)
            unaryNode.getNext().accept(this);
    }

    /**
     * Visits a BinaryNode.
     *
     * @param binaryNode
     */
    public void visit(BinaryNode binaryNode) {
        System.out.println("ConcreteVisitorB visiting BinaryNode: " + binaryNode.getData());

        if (binaryNode.getLeft() != null)
            binaryNode.getLeft().accept(this);

        if (binaryNode.getRight() != null)
            binaryNode.getRight().accept(this);
    }
}
```

We can then test that it is working by constructing a tree of `AbstractNode` objects and then 
accepting an instance of `ConcreteVisitorA` and `ConcreteVisitorB` from the root of the tree:

```
package com.algorithmhelper.designpatterns.visitor;

public class VisitorTest {

    public static void main(String[] args) {
        AbstractNode tree =
            new BinaryNode(1,
                new BinaryNode(2,
                        new UnaryNode(3, null),
                        new UnaryNode(4, null)),
                new BinaryNode(5,
                        new UnaryNode(6, null),
                        new UnaryNode(7, null))
            );

        Visitor visitorA = new ConcreteVisitorA();
        Visitor visitorB = new ConcreteVisitorB();

        tree.accept(visitorA);
        tree.accept(visitorB);
    }
}
```

We get the expected output:

```
ConcreteVisitorA visiting BinaryNode: 1
ConcreteVisitorA visiting BinaryNode: 2
ConcreteVisitorA visiting UnaryNode: 3
ConcreteVisitorA visiting UnaryNode: 4
ConcreteVisitorA visiting BinaryNode: 5
ConcreteVisitorA visiting UnaryNode: 6
ConcreteVisitorA visiting UnaryNode: 7
ConcreteVisitorB visiting BinaryNode: 1
ConcreteVisitorB visiting BinaryNode: 2
ConcreteVisitorB visiting UnaryNode: 3
ConcreteVisitorB visiting UnaryNode: 4
ConcreteVisitorB visiting BinaryNode: 5
ConcreteVisitorB visiting UnaryNode: 6
ConcreteVisitorB visiting UnaryNode: 7
```

Thus, we have been able to implement double dispatch, dispatching on two polymorphic hierarchies, 
`AbstractNode` and `Visitor`.
