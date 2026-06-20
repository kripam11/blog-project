# Blog Platform API

A RESTful Blog Platform API built with **Node.js**, **Express.js**, and **EJS**. This project demonstrates CRUD operations, relationships between entities, search functionality, and pagination for a blogging platform.

## Features

* User Management

  * Create, Read, Update, Delete Users
  * Find user by ID
  * Find user by email

* Post Management

  * Create, Read, Update, Delete Posts
  * Associate posts with authors
  * Search posts using query parameters

* Comment Management

  * Create, Read, Update, Delete Comments
  * Associate comments with users and posts

* Relationships

  * User → Posts
  * Post → Comments
  * User → Comments

* Pagination Support

* Search Functionality

* RESTful API Architecture

* Express Router Modularization

---

## Tech Stack

* Node.js
* Express.js
* EJS
* Body Parser
* JavaScript (ES Modules)

---

## Project Structure

```text
blog-platform-api/
│
├── routes/
│   ├── users.js
│   ├── posts.js
│   └── comments.js
│
├── views/
│   └── index.ejs
│
├── public/
│   └── style.css
│
├── index.js
├── package.json
└── README.md
```

---

## Installation

### Clone Repository

```bash
git clone <repository-url>
cd blog-platform-api
```

### Install Dependencies

```bash
npm install
```

### Start Server

```bash
node index.js
```

or

```bash
nodemon index.js
```

Server will run on:

```text
http://localhost:3000
```

---

## API Endpoints

### Users

| Method | Endpoint            |
| ------ | ------------------- |
| GET    | /users              |
| GET    | /users/:id          |
| GET    | /users/email/:email |
| POST   | /users              |
| PATCH  | /users/:id          |
| DELETE | /users/:id          |

---

### Posts

| Method | Endpoint         |
| ------ | ---------------- |
| GET    | /posts           |
| GET    | /posts/:id       |
| POST   | /posts/:authorId |
| PATCH  | /posts/:id       |
| DELETE | /posts/:id       |

---

### Comments

| Method | Endpoint                  |
| ------ | ------------------------- |
| GET    | /comments                 |
| GET    | /comments/:id             |
| POST   | /comments/:postId/:userId |
| PATCH  | /comments/:commentId      |
| DELETE | /comments/:commentId      |

---

## Example User Object

```json
{
  "id": 1,
  "username": "Shubham",
  "emailid": "test@gmail.com"
}
```

---

## Search Example

```http
GET /posts?search=node
```

Returns posts matching the search query.

---

## Pagination Example

```http
GET /posts?page=1&limit=10
```

Returns paginated posts.

---

## Learning Outcomes

* Building RESTful APIs
* Express Routing
* CRUD Operations
* Working with Request Parameters
* Query Parameters
* Data Relationships
* Search & Pagination
* Modular Backend Architecture

---

## Author

**Kripa Backend Developer**

* Backend Development
* Node.js & Express.js
* REST API Design
* JavaScript

Built as a backend practice project to demonstrate API design, routing, and relationship handling using Express.js.
