require('dotenv').config()
const express = require("express")

// creates express app
const app = express()

// middle ware
app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

// routes
app.get("/", (req, res) => {
    res.json({msg: "Welcome to the app"})
})

// listen for a port
app.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}`)
})