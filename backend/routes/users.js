/**
 * @fileoverview User Routes
 *
 * @description This module defines the routes for authentication-related operations. 
 * It requires authentication for all routes and handles the following operations:
 * - Logging in 
 * - Signing up
 *
 * @dependencies express, ../controllersuserController
 */

const express = require("express")
const router = express.Router()
const {loginUser, signupUser} = require("../controllers/userController")

// login route
router.post("/login", loginUser)

// sign up route
router.post("/signup", signupUser)

module.exports = router