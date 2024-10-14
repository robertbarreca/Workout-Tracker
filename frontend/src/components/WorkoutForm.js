/**
 * @fileoverview Workout Form Component
 * 
 * @description This component renders a form that allows an authenticated user to create a new workout document in the MongoDB database. 
 * 
 * @dependencies ../hooks/useWorkoutsContext, ../hooks/useAuthContext
 */

import { useState } from "react"
import { useWorkoutsContext } from "../hooks/useWorkoutsContext"
import { useAuthContext } from "../hooks/useAuthContext"

/**
 * @function WorkoutForm
 * @description Renders a form that allows users to create and submit new workouts. If the user is authenticated and the input is valid, a new workout is added to the database.
 * 
 * @returns {JSX.Element} The form component for creating a new workout.
 */
const WorkoutForm = () => {
    const {dispatch} = useWorkoutsContext()
    const [title, setTitle] = useState("")
    const [load, setLoad] = useState("")
    const [reps, setReps] = useState("")
    const [error, setError] = useState(null)
    const [emptyFields, setEmptyFields] = useState([])
    const {user} = useAuthContext()

    /**
     * @function handleSubmit
     * @description Handles the form submission to create a new workout. Sends a POST request to the server. If the request is successful, it dispatches an action to update the global workouts state. If not, sets an error state.
     * 
     * @param {Event} The form submission event object.
     * 
     * @returns {Promise<void>} Resolves when the form submission is handled. No return value.
     */
    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!user) {
            setError("You must be logged in")
            return
        }

        const workout = { title, load, reps }
        const res = await fetch(`${process.env.REACT_APP_API_URL}api/workouts`, {
            method: "POST",
            body: JSON.stringify(workout),
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${user.token}`
            }
        })
        const json = await res.json()
        if (!res.ok) {
            setError(json.error)
            setEmptyFields(json.emptyFields)
        }
        else {
            setTitle("")
            setLoad("")
            setReps("")
            setError(null)
            dispatch({ type: "CREATE_WORKOUT", payload: json })
            setEmptyFields([])
        }
    }

    return (
        <form className="create" onSubmit={handleSubmit}>
            <h3>Add a new Workout</h3>

            <label>Exercise Title:</label>
            <input
                type="text"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                className={emptyFields.includes("title") ? "error" : ""}
            />
            
            <label>Load (lbs):</label>
            <input
                type="number"
                onChange={(e) => setLoad(e.target.value)}
                value={load}
                    className={emptyFields.includes("load") ? "error" : ""}
            />
            
            <label>Reps:</label>
            <input
                type="number"
                onChange={(e) => setReps(e.target.value)}
                value={reps}
                className={emptyFields.includes("reps") ? "error" : ""}
            />

            <button>Add Workout</button>
            {error && <div className="error">{error}</div>}
        </form>
    )
}

export default WorkoutForm