# Web-Design-Assignment-8

# Node.js Express MongoDB REST API Project

## Introduction

This Node.js project sets up a RESTful API server with Express and connects to a MongoDB database for user management. It includes basic user routes for creating, retrieving, updating, and deleting users.

## Project Structure
The project has the following structure:

server.js: The main entry point of the application.
routes/users.js: Route definitions for handling user-related API endpoints.
models/user.js: Mongoose schemas for defining user data structure.
.env: Configuration file for environment variables.
package.json: Node.js project configuration.
node_modules : Includes all modules installed over node
route.rest : REST Client file which allows us to send HTTP request and view the response in Visual Studio Code directly.

## API Endpoints
User Routes
POST /users/create: Create a new user.
GET /users/getall: Retrieve all users.
PUT /users/edit: Update a user by email.
DELETE /users/delete: Delete a user by email.

# User Schema for MongoDB

This code defines a MongoDB schema for user data. It uses Mongoose to create a model for storing user information, including full name, email, and password. It also uses the `validator` library to perform email validation.

## Fields

- `full_name`: Stores the user's full name. It must be between 2 and 20 characters, containing only letters, spaces, and periods.
- `email`: Stores the user's email. It should be a valid email address and must belong to 'northeastern.edu'. Email validation is performed using the `validator` library.
- `password`: Stores the user's password, following specific rules:
  - At least one digit (0-9).
  - At least one uppercase letter.
  - At least one lowercase letter.
  - Length between 8 and 20 characters.
  - At least one special character (@, *, #, %, !, ^, &).

## Password Hashing

User passwords are hashed using the bcrypt library before storing them in the database. This adds an extra layer of security to protect user information.

## Pre-Save Hook

Before saving a user's data, a pre-save hook is triggered to hash the password using bcrypt.

## Validator

The `validator` library is used to validate email addresses. It ensures that the email provided is a valid email format.


## Express Router

This project can be extended to include user management routes using `express.Router()`. With `express.Router()`, we can define and organize routes for user registration, login, and more.

## Async and Await

The code also uses `async` and `await` to handle asynchronous operations, such as password hashing. This ensures that the application remains responsive and efficient while waiting for asynchronous tasks to complete.