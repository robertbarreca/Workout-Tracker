/**
 * @fileoverview Server for whole backend
 * 
 * @description This file creates and connects the backend to the mongodb database and defines the API routes for performing CRUD operations.
 * 
 * @dependencies dotenv, express, cors, ./routes/workouts, ./routes/users
 */


require('dotenv').config()
const express = require("express")
const mongoose = require("mongoose")
const workoutRoutes = require("./routes/workouts")
const userRoutes = require("./routes/users")
const cors = require("cors")

const port = process.env.PORT || 4000

// creates express app
const app = express()
// define who can make api requests
app.use(cors({
    origin: 'https://workout-tracker-frontend-nwu2.onrender.com',
    allowedHeaders: ['Content-Type', 'Authorization'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
}));

// middle ware
app.use(express.json())
app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

// routes
app.use("/api/workouts", workoutRoutes)
app.use("/api/user", userRoutes)

// connect to DB
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        // listen for a port only when connected to db
        app.listen(port, () => {
        console.log("connected to db and listening on port", port)
})    
     })
    .catch((error) => {
        console.log(error)
    })
