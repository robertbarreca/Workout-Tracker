/**
 * @fileoverview Workout Routes
 *
 * @description This module defines the routes for workout-related operations. 
 * It requires authentication for all routes and handles the following operations:
 * - Getting all workouts
 * - Getting a single workout by ID
 * - Creating a new workout
 * - Updating an existing workout by ID
 * - Deleting a workout by ID
 *
 * @dependencies express, ../middleware/requireAuth, ../controllers/workoutController
 */

const express = require("express")
const router = express.Router()
const requireAuth = require("../middleware/requireAuth")
const {
    createWorkout,
    getAllWorkouts,
    getSingleWorkout, 
    deleteWorkout, 
    updateWorkout
} = require("../controllers/workoutController")

// require authentication for all workout routes
router.use(requireAuth)

// GET all workouts
router.get("/", getAllWorkouts)

// GET single workout
router.get("/:id", getSingleWorkout)

// POST a new workout
router.post("/", createWorkout)

// PATCH a workout
router.patch("/:id", updateWorkout)

// DELETE a workout
router.delete("/:id", deleteWorkout)


module.exports = router