const Workout = require("../models/workoutModel")
const mongoose = require("mongoose")

// GET all workouts
const getAllWorkouts = async (req, res) => {
    const workouts = await Workout.find({}).sort({ createdAt: -1 })
    
    res.status(200).json({workouts})
}

// GET single workout
const getSingleWorkout = async (req, res) => {
    const {id} = req.params
    // check for valid id
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: "No such workout"})
    }

    const workout = await Workout.findById(id)

    if (!workout) {
        res.status(404).json({error: "No such workout"})
    }
    else {
     res.status(200).json({workout})   
    }
}

// POST new workout
const createWorkout = async(req, res) => {
    const { title, load, reps } = req.body
    
    let emptyFields = []
    if (!title) { emptyFields.push("title") }
    if (!load) { emptyFields.push("load") }
    if (!reps) { emptyFields.push("reps") }
    if (emptyFields.length > 0) {
        return res.status(400).json({error: "Please fill in all fields", emptyFields})
    }
    try {
        const workout = await Workout.create({ title, load, reps })
        res.status(200).json(workout)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}
// DELETE workout
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

// PATCH workout
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