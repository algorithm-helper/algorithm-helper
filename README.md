# Algorithm Helper

<img src="https://circleci.com/gh/algorithm-helper/algorithm-helper/tree/master.svg?style=shield&circle-token=:circle-token">

Algorithm Helper is an educational resource for students and software developers to learn about
a multitude of algorithms, data structures, and other software engineering topics. It is meant to
be a comprehensive reference tool. Each topic will have articles explaining their approach, main
ideas, and analysis of time and space complexities, where applicable. Implementations are currently
available in Java, Python, C++, and JavaScript.

This project is a work in progress, and contributions are welcome. It is developed with
JavaScript/Node, Express, React/Redux, and MongoDB. Infrastructure-wise, it uses AWS, Docker,
Kubernetes/Minikube.

## Contents

- [Getting Started](#getting-started)
- [Content & Implementations](#content--implementations)
- [Mobile Version (iOS & Android)](#mobile-version-ios--android)

### Getting Started

Starting the development environment as a new `tmux` session, which starts the server and
client for development, and a MongoDB shell. Make sure that you already have `tmux` installed on
your machine, and that you have `mongod` running.

```
./scripts/dev.sh
```

Get a copy of the project so that you can use Algorithm Helper offline as reference, or for testing
purposes. Algorithm Helper uses `webpack 4`, `babel 7`, `eslint` amongst its build tools to
transpile and use ES6/ES7 features, and JSX for React components. It has SCSS support, CSS modules
support that work with global and locally scoped (via `:local()`) styles. For developing with
hot-reloads, it uses `webpack-dev-server` and `nodemon`, amongst other tools. It builds from
`src/client`, `src/server` and outputs bundled code into `dist`.

```
// For starting the server with MongoDB initialization:
yarn run server:init

// For server development with hot-reloads with nodemon:
yarn run server:dev

// For starting the server:
yarn run server

// For client build for production with webpack:
yarn run client:build

// For client build for development with webpack:
yarn run client:dev

// For client build for development with webpack --watch:
yarn run client:devw

// For client development with webpack-dev-server:
yarn run client:wds

// For running eslint:
yarn run lint
```

### Content & Implementations

For a full listing of all the article content (in Markdown format) and implentations of the
algorithms, data structures, and other software engineering related material, see the following
repositories:
- [algorithm-helper/content](https://github.com/algorithm-helper/content)
- [algorithm-helper/implementations](https://github.com/algorithm-helper/implementations)

The following table describes the current state of the project, a listing of all of the finished
and in progress topics, including the programming languages available for the implementations:

<details>
  <summary>Content Overview</summary>
  <table>
    <tr>
      <th>Category</th>
      <th>Subcategory</th>
      <th>Topic</th>
      <th>Current State</th>
      <th>Languages Available</th>
    </tr>
    <tr>
      <td>Data Structures</td>
      <td>Lists</td>
      <td>Introduction</td>
      <td>Complete</td>
      <td>n/a</td>
    </tr>
    <tr>
      <td>Data Structures</td>
      <td>Lists</td>
      <td>Linked List</td>
      <td>Complete</td>
      <td>Java</td>
    </tr>
    <tr>
      <td>Data Structures</td>
      <td>Lists</td>
      <td>Double Ended Linked List</td>
      <td>Complete</td>
      <td>Java</td>
    </tr>
    <tr>
      <td>Data Structures</td>
      <td>Lists</td>
      <td>Dynamic Array</td>
      <td>Complete</td>
      <td>Java</td>
    </tr>
    <tr>
      <td>Data Structures</td>
      <td>Lists</td>
      <td>Stack</td>
      <td>Complete</td>
      <td>Java</td>
    </tr>
    <tr>
      <td>Data Structures</td>
      <td>Lists</td>
      <td>Queue</td>
      <td>Complete</td>
      <td>Java</td>
    </tr>
    <tr>
      <td>Data Structures</td>
      <td>Lists</td>
      <td>Double Ended Queue</td>
      <td>Complete</td>
      <td>Java</td>
    </tr>
    <tr>
      <td>Data Structures</td>
      <td>Lists</td>
      <td>Time and Space Complexity Comparison</td>
      <td>Complete</td>
      <td>n/a</td>
    </tr>
    <tr>
      <td>Data Structures</td>
      <td>Trees</td>
      <td>Introduction</td>
      <td>Complete</td>
      <td>n/a</td>
    </tr>
    <tr>
      <td>Data Structures</td>
      <td>Trees</td>
      <td>Map / Symbol Table</td>
      <td>Complete</td>
      <td>Java</td>
    </tr>
    <tr>
      <td>Data Structures</td>
      <td>Trees</td>
      <td>Set</td>
      <td>Complete</td>
      <td>Java</td>
    </tr>
    <tr>
      <td>Data Structures</td>
      <td>Trees</td>
      <td>Binary Search Tree</td>
      <td>Complete</td>
      <td>Java</td>
    </tr>
    <tr>
      <td>Data Structures</td>
      <td>Trees</td>
      <td>Balanced Binary Search Tree</td>
      <td>Complete</td>
      <td>n/a</td>
    </tr>
    <tr>
      <td>Data Structures</td>
      <td>Trees</td>
      <td>2-3 Tree</td>
      <td>Complete</td>
      <td>n/a</td>
    </tr>
    <tr>
      <td>Data Structures</td>
      <td>Trees</td>
      <td>Red-Black Tree</td>
      <td>Complete</td>
      <td>Java</td>
    </tr>
    <tr>
      <td>Data Structures</td>
      <td>Trees</td>
      <td>AVL Tree</td>
      <td>Complete</td>
      <td>Java</td>
    </tr>
    <tr>
      <td>Data Structures</td>
      <td>Trees</td>
      <td>Heap</td>
      <td>Complete</td>
      <td>Java</td>
    </tr>
    <tr>
      <td>Data Structures</td>
      <td>Trees</td>
      <td>Priority Queue</td>
      <td>Complete</td>
      <td>Java</td>
    </tr>
    <tr>
      <td>Data Structures</td>
      <td>Trees</td>
      <td>Union Find / Disjoint Set</td>
      <td>Complete</td>
      <td>Java</td>
    </tr>
    <tr>
      <td>Data Structures</td>
      <td>Trees</td>
      <td>B-Tree</td>
      <td>In Progress</td>
      <td>n/a</td>
    </tr>
    <tr>
      <td>Data Structures</td>
      <td>Trees</td>
      <td>Fibonacci Heap</td>
      <td>In Progress</td>
      <td>n/a</td>
    </tr>
    <tr>
      <td>Data Structures</td>
      <td>Trees</td>
      <td>Van Emde Boas Tree</td>
      <td>In Progress</td>
      <td>n/a</td>
    </tr>
    <tr>
      <td>Data Structures</td>
      <td>Trees</td>
      <td>Time and Space Complexity Comparison</td>
      <td>Complete</td>
      <td>n/a</td>
    </tr>
    <tr>
      <td>Data Structures</td>
      <td>Hashing</td>
      <td>Introduction</td>
      <td>Complete</td>
      <td>n/a</td>
    </tr>
    <tr>
      <td>Data Structures</td>
      <td>Hashing</td>
      <td>Hash Function</td>
      <td>Complete</td>
      <td>n/a</td>
    </tr>
    <tr>
      <td>Data Structures</td>
      <td>Hashing</td>
      <td>Collision Resolution</td>
      <td>Complete</td>
      <td>n/a</td>
    </tr>
    <tr>
      <td>Data Structures</td>
      <td>Hashing</td>
      <td>Simple Uniform Hashing Assumpption</td>
      <td>Complete</td>
      <td>n/a</td>
    </tr>
    <tr>
      <td>Data Structures</td>
      <td>Hashing</td>
      <td>Hash Map</td>
      <td>Complete</td>
      <td>Java</td>
    </tr>
    <tr>
      <td>Data Structures</td>
      <td>Hashing</td>
      <td>Hash Set</td>
      <td>Complete</td>
      <td>Java</td>
    </tr>
    <tr>
      <td>Data Structures</td>
      <td>Hashing</td>
      <td>Time and Space Complexity Comparison</td>
      <td>Complete</td>
      <td>n/a</td>
    </tr>
    <tr>
      <td>Data Structures</td>
      <td>Probabilistic</td>
      <td>Introduction</td>
      <td>In Progress</td>
      <td>n/a</td>
    </tr>
    <tr>
      <td>Data Structures</td>
      <td>Probabilistic</td>
      <td>Skip List</td>
      <td>In Progress</td>
      <td>n/a</td>
    </tr>
    <tr>
      <td>Data Structures</td>
      <td>Probabilistic</td>
      <td>Bloom Filter</td>
      <td>In Progress</td>
      <td>n/a</td>
    </tr>
    <tr>
      <td>Data Structures</td>
      <td>Probabilistic</td>
      <td>Count Min Sketch</td>
      <td>In Progress</td>
      <td>n/a</td>
    </tr>
    <tr>
      <td>Data Structures</td>
      <td>Probabilistic</td>
      <td>Random Binary Tree</td>
      <td>In Progress</td>
      <td>n/a</td>
    </tr>
    <tr>
      <td>Data Structures</td>
      <td>Probabilistic</td>
      <td>Treap</td>
      <td>In Progress</td>
      <td>n/a</td>
    </tr>
    <tr>
      <td>Data Structures</td>
      <td>Probabilistic</td>
      <td>Time and Space Complexity Comparison</td>
      <td>In Progress</td>
      <td>n/a</td>
    </tr>
    <tr>
      <td>Data Structures</td>
      <td>Multidimensional</td>
      <td>Introduction</td>
      <td>In Progress</td>
      <td>n/a</td>
    </tr>
    <tr>
      <td>Data Structures</td>
      <td>Multidimensional</td>
      <td>Range Searching</td>
      <td>In Progress</td>
      <td>n/a</td>
    </tr>
    <tr>
      <td>Data Structures</td>
      <td>Multidimensional</td>
      <td>Quad Tree</td>
      <td>In Progress</td>
      <td>n/a</td>
    </tr>
    <tr>
      <td>Data Structures</td>
      <td>Multidimensional</td>
      <td>k-d Tree</td>
      <td>In Progress</td>
      <td>n/a</td>
    </tr>
    <tr>
      <td>Data Structures</td>
      <td>Multidimensional</td>
      <td>Range Tree</td>
      <td>In Progress</td>
      <td>n/a</td>
    </tr>
    <tr>
      <td>Data Structures</td>
      <td>Multidimensional</td>
      <td>Time and Space Complexity Comparison</td>
      <td>In Progress</td>
      <td>n/a</td>
    </tr>
    <tr>
      <td>Data Structures</td>
      <td>Abstract Data Types</td>
      <td>Introduction</td>
      <td>In Progress</td>
      <td>n/a</td>
    </tr>
    <tr>
      <td>Data Structures</td>
      <td>Abstract Data Types</td>
      <td>Iterator / Iterable</td>
      <td>In Progress</td>
      <td>n/a</td>
    </tr>
    <tr>
      <td>Data Structures</td>
      <td>Abstract Data Types</td>
      <td>Comparator / Comparable</td>
      <td>In Progress</td>
      <td>n/a</td>
    </tr>
    <tr>
      <td>General Algorithms</td>
      <td>Searching</td>
      <td>Introduction</td>
      <td>Complete</td>
      <td>n/a</td>
    </tr>
    <tr>
      <td>General Algorithms</td>
      <td>Searching</td>
      <td>Binary Search</td>
      <td>Complete</td>
      <td>Java</td>
    </tr>
    <tr>
      <td>General Algorithms</td>
      <td>Searching</td>
      <td>Ternary Search</td>
      <td>Complete</td>
      <td>Java</td>
    </tr>
    <tr>
      <td>General Algorithms</td>
      <td>Searching</td>
      <td>Jump Search</td>
      <td>Complete</td>
      <td>Java</td>
    </tr>
    <tr>
      <td>General Algorithms</td>
      <td>Searching</td>
      <td>Interpolation Search</td>
      <td>Complete</td>
      <td>Java</td>
    </tr>
    <tr>
      <td>General Algorithms</td>
      <td>Searching</td>
      <td>Time and Space Complexity Comparison</td>
      <td>Complete</td>
      <td>n/a</td>
    </tr>
    <tr>
      <td>General Algorithms</td>
      <td>Sorting</td>
      <td>Introduction</td>
      <td>Complete</td>
      <td>n/a</td>
    </tr>
    <tr>
      <td>General Algorithms</td>
      <td>Sorting</td>
      <td>Stability</td>
      <td>Complete</td>
      <td>n/a</td>
    </tr>
    <tr>
      <td>General Algorithms</td>
      <td>Sorting</td>
      <td>In-Place</td>
      <td>Complete</td>
      <td>n/a</td>
    </tr>
    <tr>
      <td>General Algorithms</td>
      <td>Sorting</td>
      <td>Selection Sort</td>
      <td>Complete</td>
      <td>Java</td>
    </tr>
    <tr>
      <td>General Algorithms</td>
      <td>Sorting</td>
      <td>Insertion Sort</td>
      <td>Complete</td>
      <td>Java</td>
    </tr>
    <tr>
      <td>General Algorithms</td>
      <td>Sorting</td>
      <td>Shell Sort</td>
      <td>Complete</td>
      <td>Java</td>
    </tr>
    <tr>
      <td>General Algorithms</td>
      <td>Sorting</td>
      <td>Divide and Conquer</td>
      <td>Complete</td>
      <td>n/a</td>
    </tr>
    <tr>
      <td>General Algorithms</td>
      <td>Sorting</td>
      <td>Merge Sort</td>
      <td>Complete</td>
      <td>Java</td>
    </tr>
    <tr>
      <td>General Algorithms</td>
      <td>Sorting</td>
      <td>Quick Sort</td>
      <td>Complete</td>
      <td>Java</td>
    </tr>
    <tr>
      <td>General Algorithms</td>
      <td>Sorting</td>
      <td>Heap Sort</td>
      <td>Complete</td>
      <td>Java</td>
    </tr>
    <tr>
      <td>General Algorithms</td>
      <td>Sorting</td>
      <td>Bucket Sort</td>
      <td>Complete</td>
      <td>Java</td>
    </tr>
    <tr>
      <td>General Algorithms</td>
      <td>Sorting</td>
      <td>Count Sort</td>
      <td>In Progress</td>
      <td>n/a</td>
    </tr>
    <tr>
      <td>General Algorithms</td>
      <td>Sorting</td>
      <td>Radix Sort</td>
      <td>Complete</td>
      <td>Java</td>
    </tr>
    <tr>
      <td>General Algorithms</td>
      <td>Sorting</td>
      <td>Time and Space Complexity Comparison</td>
      <td>Complete</td>
      <td>n/a</td>
    </tr>
    <tr>
      <td>General Algorithms</td>
      <td>Shuffling</td>
      <td>Introduction</td>
      <td>Complete</td>
      <td>n/a</td>
    </tr>
    <tr>
      <td>General Algorithms</td>
      <td>Shuffling</td>
      <td>Fisher-Yates Shuffle</td>
      <td>Complete</td>
      <td>Java</td>
    </tr>
    <tr>
      <td>General Algorithms</td>
      <td>Shuffling</td>
      <td>Sattolo's Algorithm</td>
      <td>Complete</td>
      <td>Java</td>
    </tr>
    <tr>
      <td>General Algorithms</td>
      <td>Shuffling</td>
      <td>Time and Space Complexity Comparison</td>
      <td>Complete</td>
      <td>n/a</td>
    </tr>
    <tr>
      <td>General Algorithms</td>
      <td>Selecting</td>
      <td>Introduction</td>
      <td>In Progress</td>
      <td>n/a</td>
    </tr>
    <tr>
      <td>General Algorithms</td>
      <td>Selecting</td>
      <td>Quick Select</td>
      <td>In Progress</td>
      <td>n/a</td>
    </tr>
    <tr>
      <td>General Algorithms</td>
      <td>Selecting</td>
      <td>Median Finding</td>
      <td>In Progress</td>
      <td>n/a</td>
    </tr>
    <tr>
      <td>General Algorithms</td>
      <td>Selecting</td>
      <td>Median of Medians Algorithm</td>
      <td>In Progress</td>
      <td>n/a</td>
    </tr>
    <tr>
      <td>General Algorithms</td>
      <td>Selecting</td>
      <td>Peak Finding</td>
      <td>In Progress</td>
      <td>n/a</td>
    </tr>
    <tr>
      <td>General Algorithms</td>
      <td>Selecting</td>
      <td>Time and Space Complexity Comparison</td>
      <td>In Progress</td>
      <td>n/a</td>
    </tr>
    <tr>
      <td>Strings</td>
      <td>String Data Structures</td>
      <td>Introduction</td>
      <td>Complete</td>
      <td>n/a</td>
    </tr>
    <tr>
      <td>Strings</td>
      <td>String Data Structures</td>
      <td>Trie</td>
      <td>Complete</td>
      <td>n/a</td>
    </tr>
    <tr>
      <td>Strings</td>
      <td>String Data Structures</td>
      <td>R-Way Trie</td>
      <td>Complete</td>
      <td>Java</td>
    </tr>
    <tr>
      <td>Strings</td>
      <td>String Data Structures</td>
      <td>Ternary Search Trie</td>
      <td>Complete</td>
      <td>Java</td>
    </tr>
    <tr>
      <td>Strings</td>
      <td>String Data Structures</td>
      <td>Suffix Tree</td>
      <td>In Progress</td>
      <td>n/a</td>
    </tr>
    <tr>
      <td>Strings</td>
      <td>String Data Structures</td>
      <td>Time and Space Complexity Comparison</td>
      <td>Complete</td>
      <td>n/a</td>
    </tr>
    <tr>
      <td>Strings</td>
      <td>String Sorting</td>
      <td>Introduction</td>
      <td>Complete</td>
      <td>n/a</td>
    </tr>
    <tr>
      <td>Strings</td>
      <td>String Sorting</td>
      <td>LSD Radix Sort</td>
      <td>Complete</td>
      <td>Java</td>
    </tr>
    <tr>
      <td>Strings</td>
      <td>String Sorting</td>
      <td>MSD Radix Sort</td>
      <td>Complete</td>
      <td>Java</td>
    </tr>
    <tr>
      <td>Strings</td>
      <td>String Sorting</td>
      <td>Time and Space Complexity Comparison</td>
      <td>Complete</td>
      <td>n/a</td>
    </tr>
    <tr>
      <td>Strings</td>
      <td>String Matching</td>
      <td>Introduction</td>
      <td>Complete</td>
      <td>n/a</td>
    </tr>
    <tr>
      <td>Strings</td>
      <td>String Matching</td>
      <td>Knuth-Morris-Pratt Algorithm</td>
      <td>Complete</td>
      <td>Java</td>
    </tr>
    <tr>
      <td>Strings</td>
      <td>String Matching</td>
      <td>Boyer-Moore Algorithm</td>
      <td>Complete</td>
      <td>Java</td>
    </tr>
    <tr>
      <td>Strings</td>
      <td>String Matching</td>
      <td>Rabin-Karp Algorithm</td>
      <td>Complete</td>
      <td>Java</td>
    </tr>
    <tr>
      <td>Strings</td>
      <td>String Matching</td>
      <td>Approximate String Matching</td>
      <td>In Progress</td>
      <td>n/a</td>
    </tr>
    <tr>
      <td>Strings</td>
      <td>String Matching</td>
      <td>Bitap Algorithm</td>
      <td>In Progress</td>
      <td>n/a</td>
    </tr>
    <tr>
      <td>Strings</td>
      <td>String Matching</td>
      <td>Time and Space Complexity Comparison</td>
      <td>Complete</td>
      <td>n/a</td>
    </tr>
    <tr>
      <td>Strings</td>
      <td>String Metrics</td>
      <td>Introduction</td>
      <td>In Progress</td>
      <td>n/a</td>
    </tr>
    <tr>
      <td>Strings</td>
      <td>String Metrics</td>
      <td>Edit Distance</td>
      <td>In Progress</td>
      <td>n/a</td>
    </tr>
    <tr>
      <td>Strings</td>
      <td>String Metrics</td>
      <td>Damerau-Levenshtein Distance</td>
      <td>In Progress</td>
      <td>n/a</td>
    </tr>
    <tr>
      <td>Strings</td>
      <td>String Metrics</td>
      <td>Hamming Distance</td>
      <td>In Progress</td>
      <td>n/a</td>
    </tr>
    <tr>
      <td>Strings</td>
      <td>String Metrics</td>
      <td>Wagner-Fischer Algorithm</td>
      <td>In Progress</td>
      <td>n/a</td>
    </tr>
    <tr>
      <td>Strings</td>
      <td>String Metrics</td>
      <td>Time and Space Complexity Comparison</td>
      <td>In Progress</td>
      <td>n/a</td>
    </tr>
    <tr>
      <td>Strings</td>
      <td>Compression</td>
      <td>Introduction</td>
      <td>In Progress</td>
      <td>n/a</td>
    </tr>
    <tr>
      <td>Strings</td>
      <td>Compression</td>
      <td>Run-Length Encoding</td>
      <td>In Progress</td>
      <td>n/a</td>
    </tr>
    <tr>
      <td>Strings</td>
      <td>Compression</td>
      <td>Huffman Coding</td>
      <td>In Progress</td>
      <td>n/a</td>
    </tr>
    <tr>
      <td>Strings</td>
      <td>Compression</td>
      <td>Lempel-Ziv-Welch Algorithm</td>
      <td>In Progress</td>
      <td>n/a</td>
    </tr>
    <tr>
      <td>Strings</td>
      <td>Compression</td>
      <td>Text Transforms</td>
      <td>In Progress</td>
      <td>n/a</td>
    </tr>
    <tr>
      <td>Strings</td>
      <td>Compression</td>
      <td>Burrows-Wheeler Transform</td>
      <td>In Progress</td>
      <td>n/a</td>
    </tr>
    <tr>
      <td>Strings</td>
      <td>Compression</td>
      <td>Time and Space Complexity Comparison</td>
      <td>In Progress</td>
      <td>n/a</td>
    </tr>
    <tr>
      <td>Graphs</td>
      <td>Graphs</td>
      <td>Introduction</td>
      <td>Complete</td>
      <td>n/a</td>
    </tr>
    <tr>
      <td>Graphs</td>
      <td>Graphs</td>
      <td>Graph Representation</td>
      <td>Complete</td>
      <td>n/a</td>
    </tr>
    <tr>
      <td>Graphs</td>
      <td>Graphs</td>
      <td>Undirected and Directed Graphs</td>
      <td>Complete</td>
      <td>Java</td>
    </tr>
    <tr>
      <td>Graphs</td>
      <td>Graphs</td>
      <td>Sparse and Dense Graphs</td>
      <td>Complete</td>
      <td>n/a</td>
    </tr>
    <tr>
      <td>Graphs</td>
      <td>Graphs</td>
      <td>Time and Space Complexity Comparison</td>
      <td>Complete</td>
      <td>n/a</td>
    </tr>
    <tr>
      <td>Graphs</td>
      <td>Path Finding</td>
      <td>Introduction</td>
      <td>Complete</td>
      <td>n/a</td>
    </tr>
    <tr>
      <td>Graphs</td>
      <td>Path Finding</td>
      <td>Depth First Search</td>
      <td>Complete</td>
      <td>Java</td>
    </tr>
    <tr>
      <td>Graphs</td>
      <td>Path Finding</td>
      <td>Breadth First Search</td>
      <td>Complete</td>
      <td>Java</td>
    </tr>
    <tr>
      <td>Graphs</td>
      <td>Path Finding</td>
      <td>Connected Components</td>
      <td>Complete</td>
      <td>Java</td>
    </tr>
    <tr>
      <td>Graphs</td>
      <td>Path Finding</td>
      <td>Topological Sort</td>
      <td>Complete</td>
      <td>Java</td>
    </tr>
    <tr>
      <td>Graphs</td>
      <td>Path Finding</td>
      <td>Kahn's Topological Sort Algorithm</td>
      <td>Complete</td>
      <td>Java</td>
    </tr>
    <tr>
      <td>Graphs</td>
      <td>Path Finding</td>
      <td>Strongly Connected Components</td>
      <td>Complete</td>
      <td>Java</td>
    </tr>
    <tr>
      <td>Graphs</td>
      <td>Path Finding</td>
      <td>Kosaraju's Algorithm</td>
      <td>Complete</td>
      <td>Java</td>
    </tr>
    <tr>
      <td>Graphs</td>
      <td>Path Finding</td>
      <td>Time and Space Complexity Comparison</td>
      <td>Complete</td>
      <td>n/a</td>
    </tr>
    <tr>
      <td>Graphs</td>
      <td>Shortest Path Finding</td>
      <td>Introduction</td>
      <td>Complete</td>
      <td>n/a</td>
    </tr>
    <tr>
      <td>Graphs</td>
      <td>Shortest Path Finding</td>
      <td>Weighted Graph</td>
      <td>Complete</td>
      <td>Java</td>
    </tr>
    <tr>
      <td>Graphs</td>
      <td>Shortest Path Finding</td>
      <td>Edge Relaxation</td>
      <td>Complete</td>
      <td>n/a</td>
    </tr>
    <tr>
      <td>Graphs</td>
      <td>Shortest Path Finding</td>
      <td>Dijkstra's Algorithm</td>
      <td>Complete</td>
      <td>Java</td>
    </tr>
    <tr>
      <td>Graphs</td>
      <td>Shortest Path Finding</td>
      <td>Bellman-Ford Algorithm</td>
      <td>Complete</td>
      <td>Java</td>
    </tr>
    <tr>
      <td>Graphs</td>
      <td>Shortest Path Finding</td>
      <td>Floyd-Warshall Algorithm</td>
      <td>Complete</td>
      <td>Java</td>
    </tr>
    <tr>
      <td>Graphs</td>
      <td>Shortest Path Finding</td>
      <td>Time and Space Complexity Comparison</td>
      <td>Complete</td>
      <td>n/a</td>
    </tr>
    <tr>
      <td>Graphs</td>
      <td>Minimum Spanning Trees</td>
      <td>Introduction</td>
      <td>Complete</td>
      <td>n/a</td>
    </tr>
    <tr>
      <td>Graphs</td>
      <td>Minimum Spanning Trees</td>
      <td>Greedy Algorithm</td>
      <td>Complete</td>
      <td>n/a</td>
    </tr>
    <tr>
      <td>Graphs</td>
      <td>Minimum Spanning Trees</td>
      <td>Prim's Algorithm</td>
      <td>Complete</td>
      <td>Java</td>
    </tr>
    <tr>
      <td>Graphs</td>
      <td>Minimum Spanning Trees</td>
      <td>Kruskal's Algorithm</td>
      <td>Complete</td>
      <td>Java</td>
    </tr>
    <tr>
      <td>Graphs</td>
      <td>Minimum Spanning Trees</td>
      <td>Clustering</td>
      <td>In Progress</td>
      <td>n/a</td>
    </tr>
    <tr>
      <td>Graphs</td>
      <td>Minimum Spanning Trees</td>
      <td>Time and Space Complexity Comparison</td>
      <td>Complete</td>
      <td>n/a</td>
    </tr>
    <tr>
      <td>Graphs</td>
      <td>Flow Networks</td>
      <td>Introduction</td>
      <td>Complete</td>
      <td>n/a</td>
    </tr>
    <tr>
      <td>Graphs</td>
      <td>Flow Networks</td>
      <td>Max Flow Min Cut</td>
      <td>Complete</td>
      <td>n/a</td>
    </tr>
    <tr>
      <td>Graphs</td>
      <td>Flow Networks</td>
      <td>Ford-Fulkerson Algorithm</td>
      <td>Complete</td>
      <td>n/a</td>
    </tr>
    <tr>
      <td>Graphs</td>
      <td>Flow Networks</td>
      <td>Time and Space Complexity Comparison</td>
      <td>Complete</td>
      <td>n/a</td>
    </tr>
    <tr>
      <td>Randomization</td>
      <td>Randomized Algorithms</td>
      <td>Introduction</td>
      <td>In Progress</td>
      <td>n/a</td>
    </tr>
    <tr>
      <td>Randomization</td>
      <td>Randomized Algorithms</td>
      <td>Expected Time</td>
      <td>In Progress</td>
      <td>n/a</td>
    </tr>
    <tr>
      <td>Randomization</td>
      <td>Randomized Algorithms</td>
      <td>Quick Select (Revisited)</td>
      <td>In Progress</td>
      <td>n/a</td>
    </tr>
    <tr>
      <td>Randomization</td>
      <td>Randomized Algorithms</td>
      <td>Quick Sort (Revisited)</td>
      <td>In Progress</td>
      <td>n/a</td>
    </tr>
    <tr>
      <td>Randomization</td>
      <td>Randomized Algorithms</td>
      <td>Monte Carlo Algorithm</td>
      <td>In Progress</td>
      <td>n/a</td>
    </tr>
    <tr>
      <td>Randomization</td>
      <td>Randomized Algorithms</td>
      <td>Las Vegas Algorithm</td>
      <td>In Progress</td>
      <td>n/a</td>
    </tr>
    <tr>
      <td>Randomization</td>
      <td>Randomized Algorithms</td>
      <td>Time and Space Complexity Comparison</td>
      <td>In Progress</td>
      <td>n/a</td>
    </tr>
    <tr>
      <td>Randomization</td>
      <td>Random Number Generators</td>
      <td>Introduction</td>
      <td>In Progress</td>
      <td>n/a</td>
    </tr>
    <tr>
      <td>Randomization</td>
      <td>Random Number Generators</td>
      <td>Pseudo Random Number Generators</td>
      <td>In Progress</td>
      <td>n/a</td>
    </tr>
    <tr>
      <td>Randomization</td>
      <td>Random Number Generators</td>
      <td>Blum Blum Shub</td>
      <td>In Progress</td>
      <td>n/a</td>
    </tr>
    <tr>
      <td>Randomization</td>
      <td>Random Number Generators</td>
      <td>Lagged Fibonacci Generator</td>
      <td>In Progress</td>
      <td>n/a</td>
    </tr>
    <tr>
      <td>Randomization</td>
      <td>Random Number Generators</td>
      <td>Linear Congruential Generator</td>
      <td>In Progress</td>
      <td>n/a</td>
    </tr>
    <tr>
      <td>Randomization</td>
      <td>Random Number Generators</td>
      <td>Mersenne Twister</td>
      <td>In Progress</td>
      <td>n/a</td>
    </tr>
    <tr>
      <td>Randomization</td>
      <td>Random Number Generators</td>
      <td>Time and Space Complexity Comparison</td>
      <td>In Progress</td>
      <td>n/a</td>
    </tr>
    <tr>
      <td>Mathematics</td>
      <td>Numerical Computation</td>
      <td>Introduction</td>
      <td>Complete</td>
      <td>n/a</td>
    </tr>
    <tr>
      <td>Mathematics</td>
      <td>Numerical Computation</td>
      <td>Euclid's Algorithm</td>
      <td>Complete</td>
      <td>Java</td>
    </tr>
    <tr>
      <td>Mathematics</td>
      <td>Numerical Computation</td>
      <td>Multiplication Algorithm</td>
      <td>Complete</td>
      <td>Java</td>
    </tr>
    <tr>
      <td>Mathematics</td>
      <td>Numerical Computation</td>
      <td>Karatsuba Algorithm</td>
      <td>Complete</td>
      <td>Java</td>
    </tr>
    <tr>
      <td>Mathematics</td>
      <td>Numerical Computation</td>
      <td>Newton-Raphson Method</td>
      <td>Complete</td>
      <td>Java</td>
    </tr>
    <tr>
      <td>Mathematics</td>
      <td>Numerical Computation</td>
      <td>Modular Exponentiation</td>
      <td>Complete</td>
      <td>Java</td>
    </tr>
    <tr>
      <td>Mathematics</td>
      <td>Numerical Computation</td>
      <td>Linear Programming</td>
      <td>In Progress</td>
      <td>n/a</td>
    </tr>
    <tr>
      <td>Mathematics</td>
      <td>Numerical Computation</td>
      <td>Simplex Algorithm</td>
      <td>In Progress</td>
      <td>n/a</td>
    </tr>
    <tr>
      <td>Mathematics</td>
      <td>Numerical Computation</td>
      <td>Polynomial Multiplication</td>
      <td>In Progress</td>
      <td>n/a</td>
    </tr>
    <tr>
      <td>Mathematics</td>
      <td>Numerical Computation</td>
      <td>Fast Fourier Transform</td>
      <td>In Progress</td>
      <td>n/a</td>
    </tr>
    <tr>
      <td>Mathematics</td>
      <td>Numerical Computation</td>
      <td>Time and Space Complexity Comparison</td>
      <td>Complete</td>
      <td>n/a</td>
    </tr>
    <tr>
      <td>Mathematics</td>
      <td>Computational Geometry</td>
      <td>Introduction</td>
      <td>Complete</td>
      <td>n/a</td>
    </tr>
    <tr>
      <td>Mathematics</td>
      <td>Computational Geometry</td>
      <td>Convex Hull</td>
      <td>Complete</td>
      <td>n/a</td>
    </tr>
    <tr>
      <td>Mathematics</td>
      <td>Computational Geometry</td>
      <td>Graham Scan</td>
      <td>Complete</td>
      <td>Java</td>
    </tr>
    <tr>
      <td>Mathematics</td>
      <td>Computational Geometry</td>
      <td>Jarvis Algorithm</td>
      <td>In Progress</td>
      <td>n/a</td>
    </tr>
    <tr>
      <td>Mathematics</td>
      <td>Computational Geometry</td>
      <td>Time and Space Complexity Comparison</td>
      <td>In Progress</td>
      <td>n/a</td>
    </tr>
    <tr>
      <td>Dynamic Programming</td>
      <td>Dynamic Programming</td>
      <td>Introduction</td>
      <td>In Progress</td>
      <td>n/a</td>
    </tr>
    <tr>
      <td>Dynamic Programming</td>
      <td>Dynamic Programming</td>
      <td>Overlapping Subproblems and Optimal Substructures</td>
      <td>In Progress</td>
      <td>n/a</td>
    </tr>
    <tr>
      <td>Dynamic Programming</td>
      <td>Dynamic Programming</td>
      <td>Memoization</td>
      <td>In Progress</td>
      <td>n/a</td>
    </tr>
    <tr>
      <td>Dynamic Programming</td>
      <td>Dynamic Programming Problems</td>
      <td>Introduction</td>
      <td>In Progress</td>
      <td>n/a</td>
    </tr>
    <tr>
      <td>Dynamic Programming</td>
      <td>Dynamic Programming Problems</td>
      <td>Fibonacci Number</td>
      <td>In Progress</td>
      <td>n/a</td>
    </tr>
    <tr>
      <td>Dynamic Programming</td>
      <td>Dynamic Programming Problems</td>
      <td>Maximum Sum Contiguous Subarray</td>
      <td>In Progress</td>
      <td>n/a</td>
    </tr>
    <tr>
      <td>Dynamic Programming</td>
      <td>Dynamic Programming Problems</td>
      <td>Kadane's Algorithm</td>
      <td>In Progress</td>
      <td>n/a</td>
    </tr>
    <tr>
      <td>Dynamic Programming</td>
      <td>Dynamic Programming Problems</td>
      <td>Longest Common Subsequence</td>
      <td>In Progress</td>
      <td>n/a</td>
    </tr>
    <tr>
      <td>Dynamic Programming</td>
      <td>Dynamic Programming Problems</td>
      <td>Longest Increasing Subsequence</td>
      <td>In Progress</td>
      <td>n/a</td>
    </tr>
    <tr>
      <td>Dynamic Programming</td>
      <td>Dynamic Programming Problems</td>
      <td>Longest Common Substring</td>
      <td>In Progress</td>
      <td>n/a</td>
    </tr>
    <tr>
      <td>Dynamic Programming</td>
      <td>Dynamic Programming Problems</td>
      <td>Longest Palindromic Substring</td>
      <td>In Progress</td>
      <td>n/a</td>
    </tr>
    <tr>
      <td>Dynamic Programming</td>
      <td>Dynamic Programming Problems</td>
      <td>Binomial Coefficient</td>
      <td>In Progress</td>
      <td>n/a</td>
    </tr>
    <tr>
      <td>Dynamic Programming</td>
      <td>Dynamic Programming Problems</td>
      <td>Coin Change Problem</td>
      <td>In Progress</td>
      <td>n/a</td>
    </tr>
    <tr>
      <td>Dynamic Programming</td>
      <td>Dynamic Programming Problems</td>
      <td>Maximum Size Square Submatrix</td>
      <td>In Progress</td>
      <td>n/a</td>
    </tr>
    <tr>
      <td>Dynamic Programming</td>
      <td>Dynamic Programming Problems</td>
      <td>Assembly Line Scheduling</td>
      <td>In Progress</td>
      <td>n/a</td>
    </tr>
    <tr>
      <td>Dynamic Programming</td>
      <td>Dynamic Programming Problems</td>
      <td>Rod Cutting</td>
      <td>In Progress</td>
      <td>n/a</td>
    </tr>
    <tr>
      <td>Dynamic Programming</td>
      <td>Dynamic Programming Problems</td>
      <td>Levenschtein Edit Distance</td>
      <td>In Progress</td>
      <td>n/a</td>
    </tr>
    <tr>
      <td>Dynamic Programming</td>
      <td>Dynamic Programming Problems</td>
      <td>0-1 Knapsack Problem</td>
      <td>In Progress</td>
      <td>n/a</td>
    </tr>
    <tr>
      <td>Dynamic Programming</td>
      <td>Dynamic Programming Problems</td>
      <td>Time and Space Complexity Comparison</td>
      <td>In Progress</td>
      <td>n/a</td>
    </tr>
    <tr>
      <td>Algorithmic Analysis</td>
      <td>Computational Complexity</td>
      <td>Introduction</td>
      <td>In Progress</td>
      <td>n/a</td>
    </tr>
    <tr>
      <td>Algorithmic Analysis</td>
      <td>Computational Complexity</td>
      <td>Big-O Notarion</td>
      <td>In Progress</td>
      <td>n/a</td>
    </tr>
    <tr>
      <td>Algorithmic Analysis</td>
      <td>Computational Complexity</td>
      <td>Small-O Notation</td>
      <td>In Progress</td>
      <td>n/a</td>
    </tr>
    <tr>
      <td>Algorithmic Analysis</td>
      <td>Computational Complexity</td>
      <td>Amortization</td>
      <td>In Progress</td>
      <td>n/a</td>
    </tr>
    <tr>
      <td>Algorithmic Analysis</td>
      <td>Complexity Classes</td>
      <td>Introduction</td>
      <td>In Progress</td>
      <td>n/a</td>
    </tr>
    <tr>
      <td>Algorithmic Analysis</td>
      <td>Complexity Classes</td>
      <td>P Complexity</td>
      <td>In Progress</td>
      <td>n/a</td>
    </tr>
    <tr>
      <td>Algorithmic Analysis</td>
      <td>Complexity Classes</td>
      <td>NP Complexity</td>
      <td>In Progress</td>
      <td>n/a</td>
    </tr>
    <tr>
      <td>Software Engineering</td>
      <td>Object Oriented Programming</td>
      <td>Introduction</td>
      <td>Complete</td>
      <td>n/a</td>
    </tr>
    <tr>
      <td>Software Engineering</td>
      <td>Object Oriented Programming</td>
      <td>Class and Instance</td>
      <td>Complete</td>
      <td>Java</td>
    </tr>
    <tr>
      <td>Software Engineering</td>
      <td>Object Oriented Programming</td>
      <td>Inheritance</td>
      <td>Complete</td>
      <td>Java</td>
    </tr>
    <tr>
      <td>Software Engineering</td>
      <td>Object Oriented Programming</td>
      <td>Encapsulation</td>
      <td>Complete</td>
      <td>Java</td>
    </tr>
    <tr>
      <td>Software Engineering</td>
      <td>Object Oriented Programming</td>
      <td>Polymorphism</td>
      <td>Complete</td>
      <td>Java</td>
    </tr>
    <tr>
      <td>Software Engineering</td>
      <td>Functional Programming</td>
      <td>Introduction</td>
      <td>Complete</td>
      <td>n/a</td>
    </tr>
    <tr>
      <td>Software Engineering</td>
      <td>Functional Programming</td>
      <td>First Class Function</td>
      <td>Complete</td>
      <td>JavaScript</td>
    </tr>
    <tr>
      <td>Software Engineering</td>
      <td>Functional Programming</td>
      <td>Recursion</td>
      <td>Complete</td>
      <td>JavaScript</td>
    </tr>
    <tr>
      <td>Software Engineering</td>
      <td>Functional Programming</td>
      <td>Lambda Notation</td>
      <td>Complete</td>
      <td>JavaScript</td>
    </tr>
    <tr>
      <td>Software Engineering</td>
      <td>Functional Programming</td>
      <td>Function Composition</td>
      <td>Complete</td>
      <td>JavaScript</td>
    </tr>
    <tr>
      <td>Software Engineering</td>
      <td>Functional Programming</td>
      <td>Map, Filter, Reduce</td>
      <td>Complete</td>
      <td>JavaScript</td>
    </tr>
    <tr>
      <td>Software Engineering</td>
      <td>Functional Programming</td>
      <td>Currying</td>
      <td>Complete</td>
      <td>JavaScript</td>
    </tr>
    <tr>
      <td>Software Engineering</td>
      <td>Functional Programming</td>
      <td>Compose</td>
      <td>In Progress</td>
      <td>n/a</td>
    </tr>
    <tr>
      <td>Software Engineering</td>
      <td>Functional Programming</td>
      <td>Piping</td>
      <td>In Progress</td>
      <td>n/a</td>
    </tr>
    <tr>
      <td>Software Engineering</td>
      <td>Functional Programming</td>
      <td>Zip, Unzip</td>
      <td>In Progress</td>
      <td>n/a</td>
    </tr>
    <tr>
      <td>Software Engineering</td>
      <td>Design Patterns</td>
      <td>Introduction</td>
      <td>Complete</td>
      <td>Java</td>
    </tr>
    <tr>
      <td>Software Engineering</td>
      <td>Design Patterns</td>
      <td>Adapter</td>
      <td>Complete</td>
      <td>Java</td>
    </tr>
    <tr>
      <td>Software Engineering</td>
      <td>Design Patterns</td>
      <td>Bridge</td>
      <td>Complete</td>
      <td>Java</td>
    </tr>
    <tr>
      <td>Software Engineering</td>
      <td>Design Patterns</td>
      <td>Builder</td>
      <td>Complete</td>
      <td>Java</td>
    </tr>
    <tr>
      <td>Software Engineering</td>
      <td>Design Patterns</td>
      <td>Chain of Responsibility</td>
      <td>Complete</td>
      <td>Java</td>
    </tr>
    <tr>
      <td>Software Engineering</td>
      <td>Design Patterns</td>
      <td>Command</td>
      <td>Complete</td>
      <td>Java</td>
    </tr>
    <tr>
      <td>Software Engineering</td>
      <td>Design Patterns</td>
      <td>Composite</td>
      <td>Complete</td>
      <td>Java</td>
    </tr>
    <tr>
      <td>Software Engineering</td>
      <td>Design Patterns</td>
      <td>Decorator</td>
      <td>Complete</td>
      <td>Java</td>
    </tr>
    <tr>
      <td>Software Engineering</td>
      <td>Design Patterns</td>
      <td>Factory</td>
      <td>Complete</td>
      <td>Java</td>
    </tr>
    <tr>
      <td>Software Engineering</td>
      <td>Design Patterns</td>
      <td>Iterator</td>
      <td>Complete</td>
      <td>Java</td>
    </tr>
    <tr>
      <td>Software Engineering</td>
      <td>Design Patterns</td>
      <td>Null Object</td>
      <td>Complete</td>
      <td>Java</td>
    </tr>
    <tr>
      <td>Software Engineering</td>
      <td>Design Patterns</td>
      <td>Observer</td>
      <td>Complete</td>
      <td>Java</td>
    </tr>
    <tr>
      <td>Software Engineering</td>
      <td>Design Patterns</td>
      <td>Prototype</td>
      <td>Complete</td>
      <td>Java</td>
    </tr>
    <tr>
      <td>Software Engineering</td>
      <td>Design Patterns</td>
      <td>Singleton</td>
      <td>Complete</td>
      <td>Java</td>
    </tr>
    <tr>
      <td>Software Engineering</td>
      <td>Design Patterns</td>
      <td>Strategy</td>
      <td>Complete</td>
      <td>Java</td>
    </tr>
    <tr>
      <td>Software Engineering</td>
      <td>Design Patterns</td>
      <td>Template Method</td>
      <td>Complete</td>
      <td>Java</td>
    </tr>
    <tr>
      <td>Software Engineering</td>
      <td>Design Patterns</td>
      <td>Visitor</td>
      <td>Complete</td>
      <td>Java</td>
    </tr>
    <tr>
      <td>Software Engineering</td>
      <td>Bash Scripting</td>
      <td>Introduction</td>
      <td>In Progress</td>
      <td>n/a</td>
    </tr>
    <tr>
      <td>Software Engineering</td>
      <td>Bash Scripting</td>
      <td>Shell Scripts</td>
      <td>In Progress</td>
      <td>n/a</td>
    </tr>
    <tr>
      <td>Software Engineering</td>
      <td>Bash Scripting</td>
      <td>Common Functions</td>
      <td>In Progress</td>
      <td>n/a</td>
    </tr>
    <tr>
      <td>Software Engineering</td>
      <td>Bash Scripting</td>
      <td>Exit Status Codes</td>
      <td>In Progress</td>
      <td>n/a</td>
    </tr>
    <tr>
      <td>Software Engineering</td>
      <td>Bash Scripting</td>
      <td>File Access in Scripts</td>
      <td>In Progress</td>
      <td>n/a</td>
    </tr>
    <tr>
      <td>Software Engineering</td>
      <td>Regular Expressions</td>
      <td>Introduction</td>
      <td>In Progress</td>
      <td>n/a</td>
    </tr>
    <tr>
      <td>Software Engineering</td>
      <td>Regular Expressions</td>
      <td>Basic Syntax</td>
      <td>In Progress</td>
      <td>n/a</td>
    </tr>
    <tr>
      <td>Software Engineering</td>
      <td>Regular Expressions</td>
      <td>Regex Flags</td>
      <td>In Progress</td>
      <td>n/a</td>
    </tr>
    <tr>
      <td>Software Engineering</td>
      <td>Regular Expressions</td>
      <td>Grouping and Capturing</td>
      <td>In Progress</td>
      <td>n/a</td>
    </tr>
    <tr>
      <td>Software Engineering</td>
      <td>Regular Expressions</td>
      <td>Look Ahead, Look Behind</td>
      <td>In Progress</td>
      <td>n/a</td>
    </tr>
  </table>
</details>

### Mobile Version (iOS & Android)

Currently, a native iOS mobile version is available here:
- [algorithm-helper/ios-app](https://github.com/algorithm-helper/ios-app)

But it is going to be phased out in the future, as a React Native app is currently being developed
so that it can be available for both iOS and Android.
