# Algorithm Helper: Server-Side

This is the server-side code for Algorithm Helper. It includes documentation on the REST API routes.

## Content

- [REST API Routes](#rest-api-routes)

### REST API Routes

#### Accounts

For authenticating into application, or signing up a new user.

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

#### Actions

For various actions that update the user's data.

- **URL**: `/actions/get-item-completed`
  - **Description**:
  - **Method**: `POST`
  - **Parameters**:
  - **Success Response**:
    - Code: `200`<br/>
      Content-Type: `application/json`
  - **Error Response**:
    - Code: `400`<br/>
      Content-Type: `application/json`

- **URL**: `/accounts/get-item-bookmarked`
  - **Description**:
  - **Method**: `POST`
  - **Parameters**:
  - **Success Response**:
    - Code: `200`<br/>
      Content-Type: `application/json`
  - **Error Response**:
    - Code: `400`<br/>
      Content-Type: `application/json`

- **URL**: `/accounts/mark-as-completed`
  - **Description**:
  - **Method**: `POST`
  - **Parameters**:
  - **Success Response**:
    - Code: `200`<br/>
      Content-Type: `application/json`
  - **Error Response**:
    - Code: `400`<br/>
      Content-Type: `application/json`

- **URL**: `/accounts/save-to-bookmarks`
  - **Description**:
  - **Method**: `POST`
  - **Parameters**:
  - **Success Response**:
    - Code: `200`<br/>
      Content-Type: `application/json`
  - **Error Response**:
    - Code: `400`<br/>
      Content-Type: `application/json`

#### Data

For getting data for the actual application (i.e. categories, subcategories, topics).

#### Data Utils

For getting extended or utility data (i.e. color mappings, extended categories data).



- **URL**: `/adsf`
