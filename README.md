# Algorithm Helper

Algorithm Helper is an online educational tool for students and software developers to learn about
a multitude of algorithms, data structures, and other software engineering topics. It is meant to
be a comprehensive reference tool. For the algorithms and data structures, they will have articles
explaining their approach and intuition, analyze their time and space complexities, describe their
real world applications as well as practical implications. Implementations are currently in
Java, Python, JavaScript and C++. This project is a work in progress, and is a web application
developed with JavaScript/Node.js, React.js/Redux, MongoDB, AWS EC2/S3, and Docker.

## Table of Contents

The following table describes the current state of the project, a listing of all of the finished and
in progress topics,

## Development

Get a copy of the project so that you can use Algorithm Helper offline as reference, or for
testing purposes. Algorithm Helper uses `webpack` to transpile and use ES6 syntax,
`webpack-dev-server` to watch for changes in the client-side code, `nodemon` to watch for changes
in the server-side code, and `concurrently` to startup both the client-side and server-side for
development.

For a development environment that watches for both client and server side changes, run:
```
yarn run dev
```

To only watch for client side changes, run:
```
yarn run start
```

To only develop on the client-side, run:
```
yarn run dev-server
```

To build for production, run:
```
yarn run build:prod
```
