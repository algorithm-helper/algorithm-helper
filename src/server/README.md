# Algorithm Helper: Server-Side

This is the server-side code for Algorithm Helper. It includes documentation on the REST API routes.

## Content

- [Entry Point](#entry-point)
- [REST API Routes](#rest-api-routes)
  - [Accounts](#accounts)
  - [Data](#data)
  - [Actions](#actions)

### Entry Point

The entry point for the server-side code is `main.js`, which provides the global function `include`,
which allows for absolute filepath `requires` from the server root (`./src/server`). It requires
`server.js`, which provides the main `express` web server.

### REST API Routes

#### Accounts

For authenticating into the application, or signing up a new user. This is handled with `AppRouter`.

- **URL**: `/accounts/login`
  - **Description**: For logging into the application.
  - **Method**: `POST`
  - **Parameters**:
    - `email`: The email for this account.
    - `password`: The password for this account.
  - **Success Response**:
    - Code: `200`<br/>
      Content-Type: `application/json`
  - **Error Response**:
    - Code: `400`<br/>
      Content-Type: `application/json`

- **URL**: `/accounts/sign-up`
  - **Description**: For signing up a new user.
  - **Method**: `POST`
  - **Parameters**:
    - `fullName`: The full name for this user.
    - `email`: The email for this user.
    - `password`: The password for this user.
  - **Success Response**:
    - Code: `200`<br/>
      Content-Type: `application/json`
  - **Error Response**:
    - Code: `400`<br/>
      Content-Type: `application/json`

#### Data

For getting data for the actual application (i.e. categories, subcategories, topics). This is
handled with `DataRouter`.

- **URL**: `/data/categories`
  - **Description**: Gets all of the category data.
  - **Method**: `GET`
  - **Parameters**: none
  - **Success Response**:
    - Code: `200`<br/>
      Content-Type: `application/json`
  - **Error Response**:
    - Code: `400`<br/>
      Content-Type: `application/json`

- **URL**: `/data/subcategories`
  - **Description**: Gets all of the subcategory data.
  - **Method**: `GET`
  - **Parameters**: none
  - **Success Response**:
    - Code: `200`<br/>
      Content-Type: `application/json`
        - **Error Response**:
    - Code: `400`<br/>
      Content-Type: `application/json`

- **URL**: `/data/categories/:categoryKey`
  - **Description**: Gets the data for a particular category by key.
  - **Method**: `GET`
  - **Parameters**:
    - `categoryKey`: The key of the category.
  - **Success Response**:
    - Code: `200`<br/>
      Content-Type: `application/json`<br/>
  - **Error Response**:
    - Code: `400`<br/>
      Content-Type: `application/json`<br/>

- **URL**: `/data/categories/:categoryKey/:subcategoryKey`
  - **Description**: Gets the data for a particular subcategory by key.
  - **Method**: `GET`
  - **Parameters**:
    - `categoryKey`: The key of the category.
    - `subcategoryKey`: The key of the subcategory.
  - **Success Response**:
    - Code: `200`<br/>
      Content-Type: `application/json`
  - **Error Response**:
    - Code: `400`<br/>
      Content-Type: `application/json`

- **URL**: `/data/categories/:categoryKey/:subcategoryKey/:topicKey`
  - **Description**: Gets the data for a particular topic by key.
  - **Method**: `GET`
  - **Parameters**:
    - `categoryKey`: The key of the category.
    - `subcategoryKey`: The key of the subcategory.
    - `topicKey`: The key of the topic.
  - **Success Response**:
    - Code: `200`<br/>
      Content-Type: `application/json`
  - **Error Response**:
    - Code: `400`<br/>
      Content-Type: `application/json`

- **URL**: `/data/colors`
  - **Description**: Gets all of the color data.
  - **Method**: `GET`
  - **Parameters**: none
  - **Success Response**:
    - Code: `200`<br/>
      Content-Type: `application/json`
  - **Error Response**:
    - Code: `400`<br/>
      Content-Type: `application/json`

#### Data Extended

For getting extended data, this means getting the content from the children as well.

- **URL**: `/data/extended/categories`
  - **Description**: Gets all of the category data, and the data of its children (all
    subcategories).
  - **Method**: `GET`
  - **Parameters**: none
  - **Success Response**:
    - Code: `200`<br/>
      Content-Type: `application/json`
  - **Error Response**:
    - Code: `400`<br/>
      Content-Type: `application/json`

- **URL**: `/data/extended/categories/:categoryKey`
  - **Description**: Gets all of the category data for a particular category by key, and the data of
     its children (all subcategory children).
  - **Method**: `GET`
  - **Parameters**:
    - `categoryKey`: The key of the category.
  - **Success Response**:
    - Code: `200`<br/>
      Content-Type: `application/json`
  - **Error Response**:
    - Code: `400`<br/>
      Content-Type: `application/json`

- **URL**: `/data/extended/categories/:categoryKey/:subcategoryKey`
  - **Description**: Gets all of the subcategory data for a particular subcategory by key, and the
    data of its children (all topic children).
  - **Method**: `GET`
  - **Parameters**:
    - `categoryKey`: The key of the category.
    - `subcategoryKey`: The key of the subcategory.
  - **Success Response**:
    - Code: `200`<br/>
      Content-Type: `application/json`
  - **Error Response**:
    - Code: `400`<br/>
      Content-Type: `application/json`

#### Data Utils

Other utility related data.

- **URL**: `/data/utils/categories-color-key-mapping`
  - **Description**: Gets a mapping of category keys to colors.
  - **Method**: `GET`
  - **Parameters**: none
  - **Success Response**:
    - Code: `200`<br/>
      Content-Type: `application/json`
  - **Error Response**:
    - Code: `400`<br/>
      Content-Type: `application/json`
