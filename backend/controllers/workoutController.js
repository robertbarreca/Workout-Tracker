/**
 * @fileoverview Workout Controllers
 *
 * @description This module defines the logic behind the following workout-related CRUD operations. 
 * - Getting all workouts
 * - Getting a single workout by ID
 * - Creating a new workout
 * - Updating an existing workout by ID
 * - Deleting a workout by ID
 *
 * @dependencies ../models/workoutModel, mongoose
 */

const Workout = require("../models/workoutModel")
const mongoose = require("mongoose")

/**
 * @function getAllWorkouts
 * @description Handles the request to retrieve all workouts for a specific user, 
 *              ordered by their creation date in descending order.
 * 
 * @param {Object} req - The request object containing the user id 
 * @param {Object} res - The response object used to send back the desired HTTP response
 * 
 * @returns {void} Sends a JSON response containing an array of user's workouts ordered by when created
 */
const getAllWorkouts = async (req, res) => {
    const user_id = req.user._id
    const workouts = await Workout.find({user_id}).sort({ createdAt: -1 })
    
    res.status(200).json({workouts})
}

/**
 * @function getSingleWorkout
 * @description Handles the request to retrieve a single workout based on the provided workout ID. 
 * 
 * @param {Object} req - The request object containing the desired workout id
 * @param {Object} res - The response object used to send back the desired HTTP response
 * 
 * @returns {void} Sends a JSON response containing the workout if workout exists or a 404 error if workout does not exist or id is invalid
 */
const getSingleWorkout = async (req, res) => {
    const {id} = req.params
    // check for valid id
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: "No such workout"})
    }

    const workout = await Workout.findById(id)
    // check if workout exists
    if (!workout) {
        res.status(404).json({error: "No such workout"})
    }
    else {
     res.status(200).json({workout})   
    }
}

/**
 * @function createWorkout
 * @description Handles the request to create a new workout based on the title, load, and reps fields.
 * 
 * @param {Object} req - The request object containing the workout elements
 * @param {Object} res - The response object used to send back the desired HTTP response
 * 
 * @returns {void} Sends a JSON response containing the workout upon successful post to database or a 400 error message upon failiure
 */
const createWorkout = async(req, res) => {
    const { title, load, reps } = req.body
    
    let emptyFields = []
    if (!title) { emptyFields.push("title") }
    if (!load) { emptyFields.push("load") }
    if (!reps) { emptyFields.push("reps") }
    if (emptyFields.length > 0) {
        return res.status(400).json({error: "Please fill in all fields", emptyFields})
    }
    
    // add doc to db
    try {
        const user_id = req.user._id
        const workout = await Workout.create({ title, load, reps, user_id })
        res.status(200).json(workout)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

/**
 * @function deleteWorkout
 * @description Handles the request to delete a workout based on provided workout id
 * 
 * @param {Object} req - The request object containing the desired workout id
 * @param {Object} res - The response object used to send back the desired HTTP response
 * 
 * @returns {void} Sends a JSON response containing the workout upon successful deletion or a 404 error message if workout does not exist or a 400 if another error occurs
 */
const deleteWorkout = async (req, res) => {
    const {id} = req.params
    // check for valid id
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: "No such workout"})
    }
    const workout = await Workout.findOneAndDelete({_id: id})

    if (!workout) {
        res.status(400).json({error: "No such workout"})
    }
    else {
        res.status(200).json({workout})   
    }
}

/**
 * @function updateWorkout
 * @param {Object} req - The request object containing the desired workout id
 * @param {Object} res - The response object used to send back the desired HTTP response
 * 
 * @returns {void} Sends a JSON response containing the updated workout upon success or an error message upon failiure
 */
const updateWorkout = async (req, res) => {
    const {id} = req.params
    // check for valid id
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: "No such workout"})
    }

    const workout = await Workout.findOneAndUpdate({ _id: id }, { ...req.body })
    
    if (!workout) {
        res.status(400).json({error: "No such workout"})
    }
    else {
        res.status(200).json({workout})   
    }
}

module.exports = {
    createWorkout,
    getAllWorkouts,
    getSingleWorkout, 
    deleteWorkout, 
    updateWorkout
}