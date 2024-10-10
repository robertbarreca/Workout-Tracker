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