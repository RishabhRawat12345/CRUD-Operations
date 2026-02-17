# Task Management API

A **Node.js**, **Express**, and **MongoDB** based RESTful API for managing tasks with user authentication. Users can register, login, and manage tasks. Certain operations (update/delete tasks) are restricted to admin users.

## Features

* User registration and login with hashed passwords (bcrypt)
* JWT authentication stored in HTTP-only cookies
* Role-based access control (`user` vs `admin`)
* CRUD operations for tasks
* Tasks are linked to users
* CORS enabled for frontend integration
* MongoDB connection with Mongoose ORM

## Technologies Used

* Node.js
* Express.js
* MongoDB & Mongoose
* JWT for authentication
* Bcrypt for password hashing
* dotenv for environment variables
* Cors & Cookie-Parser for secure requests

## Installation

1. Clone the repository:

```bash
git clone <repo-url>
cd <repo-folder>
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the root folder with the following variables:

```env
MONGO_URL=<your_mongodb_connection_string>
JWT_SEC=<your_jwt_secret>
PORT=5000
```

4. Start the server:

```bash
npm run dev
```

The server will run at `http://localhost:5000`

## Project Structure

```
.
├── controller
│   ├── authController.js
│   └── taskController.js
├── middleware
│   └── authMiddleware.js
├── models
│   ├── Task.js
│   └── User.js
├── router
│   ├── auth.js
│   └── taskRoutes.js
├── Db
│   └── Db.js
├── config
│   └── token.js
├── index.js
└── package.json
```

## API Endpoints

### Authentication

| Method | Endpoint            | Description               | Body Parameters                     |
| ------ | ------------------- | ------------------------- | ----------------------------------- |
| POST   | `/api/reg/register` | Register a new user       | `name`, `email`, `password`, `role` |
| POST   | `/api/reg/login`    | Login user and set cookie | `email`, `password`                 |

### Tasks

> All task routes require a valid JWT token in HTTP-only cookie.

| Method | Endpoint                         | Description                  | Body / Params |
| ------ | -------------------------------- | ---------------------------- | ------------- |
| POST   | `/api/task/createT`              | Create a new task            | `title`       |
| GET    | `/api/task/getT`                 | Get tasks for logged-in user | `editTaskId`  |
| PUT    | `/api/task/updatedT/:editTaskId` | Update a task (Admin only)   | `title`       |
| DELETE | `/api/task/deleteT/:id`          | Delete a task (Admin only)   |  `id`         |

## Authentication Flow

* Users register with email/password. Passwords are hashed with bcrypt.
* Users login, and a JWT is generated and sent as an HTTP-only cookie.
* Middleware `verifyToken` validates the JWT and sets `req.userId`.
* Role-based checks ensure only admins can update or delete tasks.

## Example Request

**Login Request (POST `/api/reg/login`)**

```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response**

```json
{
  "message": "login data successfully",
  "user": {
    "_id": "6456f8d2e6b8c5a9e1c2d1f0",
    "name": "John Doe",
    "email": "user@example.com",
    "role": "user"
  }
}
```

## Notes

* CORS is configured for `http://localhost:5173` with credentials support.
* JWT token expires in 1 day.
* Passwords are securely hashed using bcrypt.
* Make sure your frontend sends cookies with `credentials: 'include'` when making requests.

## Scalability Notes

* Microservices: Each module (auth, tasks) can be separated into microservices to scale independently.

* Caching: Frequently accessed data like tasks can be cached using Redis to reduce database load.

* Load Balancing: Multiple instances of the API can be deployed behind a load balancer (e.g., Nginx, AWS ELB) to handle high traffic.

* Database Scaling: MongoDB can be sharded or replicated to handle increased read/write loads efficiently.

* Queue Management: Background tasks (e.g., sending emails, notifications) can be handled asynchronously using queues like RabbitMQ or Bull.
