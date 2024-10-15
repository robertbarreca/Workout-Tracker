# Workout Tracker

Workout Tracker is a full-stack application designed to help users track their workouts and fitness progress. Users can log in, view their workout history, add new workouts, and manage their fitness routines. This application is built using the MERN stack (MongoDB, Express, React, Node.js) and includes user authentication for a personalized experience.\
\
![ezgif com-speed](https://github.com/user-attachments/assets/6dd94079-32b2-4677-a8f0-9766fda4f71f)

You can visit the deployed version [here.](https://workout-tracker-frontend-nwu2.onrender.com/login)

## Features

- **User Authentication**: Secure login and signup functionality using JWTs for user sessions.
- **Workout Management**: Users can add, view, and manage their workouts.
- **Error Handling**: Informative error messages for failed operations.

## Front End Details

The frontend is built using React and makes API calls to the backend for managing workouts and user authentication. Key components include:

- **Workout Form:** Handles adding new workouts.
- **Navigation Bar:** Used to navigate to different pages
- **Workout Item:** Represents an individual workout complete with a title, reps, load, and a timestamp. It also includes a button to remove them
- **Authentication Context:** Used to manage user's logged in status globally
- **Workout Context:** Used to manage user's workouts globally

## Backend Details:
The backend is built using Node.js and Express.js to create a RESTful API that connects to a MongoDB database responsible for CRUD operations.

### Workout API Endpoints
- **GET** /api/workouts: Gets all workouts corresponding with logged in user
- **GET** /api/workouts/:id: Gets workout that corresponds with `id`
- **POST** /api/workouts: Creates a new workout corresponding with logged in user
- **PATCH** /api/workouts/:id: Updates an existing workout that corresponds to `id` to do based on request.body
- **DELETE** /api/workouts/:id
: Deletes an individual workout based on `id`

### Authentication API Endpoints
- **POST** /api/users/login: Authenticates a user by validating their email and password. If the credentials are correct, it returns a JWT for session management.
- **POST** /api/users/signup: Creates a new user account by validating the provided email and password. The password is securely hashed before saving the user, and a JWT is returned upon successful registration.





