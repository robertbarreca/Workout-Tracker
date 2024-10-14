/**
 * @fileoverview Schema for a workout document
 * 
 * @description This files defines the schema for a workout document.
 * 
 * @dependencies mongoose
 */


const mongoose = require("mongoose")

const Schema = mongoose.Schema

const workoutSchema = new Schema({
    title: {
        type: String,
        required: true
    }, 
    reps: {
        type: Number,
        required: true
    }, 
    load: {
        type: Number,
        required: true
    },
    user_id: {
        type: String,
        required: true
    }
}, { timestamps: true })

module.exports = mongoose.model("Workout", workoutSchema)