require('dotenv').config()
const express = require("express")
const workoutRoutes = require("./routes/workouts")
const mongoose = require("mongoose")

// creates express app
const app = express()

// middle ware
app.use(express.json())
app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

// routes
app.use("/api/workouts", workoutRoutes)

// connect to DB
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        // listen for a port only when connected to db
        app.listen(process.env.PORT, () => {
        console.log("connected to db and listening on port",  process.env.PORT)
})    
     })
    .catch((error) => {
        console.log(error)
    })
