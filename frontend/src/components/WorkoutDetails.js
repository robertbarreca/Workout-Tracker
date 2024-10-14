/**
 * @fileoverview Workout Details Component
 * 
 * @description This component renders a card for every workout document corresponding to the logged in user as well as a delete button. It includes the following information:
 * - Title
 * - Load
 * - Reps
 * 
 * @dependencies ../hooks/useWorkoutContext, date-fns/formatDistanceToNow, ../hooks/useAuthContext
 */

import { useWorkoutsContext } from "../hooks/useWorkoutsContext"
import formatDistanceToNow from "date-fns/formatDistanceToNow"
import {useAuthContext} from "../hooks/useAuthContext"

/**
 * @function Workout Details
 * @description Renders a card that displays the workout details, including title, load, reps, and the time created. It also provides the option to delete the workout.
 * 
 * @param {Object} workout The workout object containing workout details such as title, load, reps, and createdAt timestamp.
 * @returns {JSX.Element} The card that contains an indvidual workout
 */
const WorkoutDetails = ({ workout }) => {
    const {dispatch} = useWorkoutsContext()
    const {user} = useAuthContext()
    
    /**
     * @fucntion handleClick
     * @description Handles the deletion of the current workout by sending a DELETE request to the server. Dispatches an action to update the workout context if the deletion is successful.
     * 
     * @returns {Promise<void>} Resolves when the delete request is handled. No return value.
     * 
     */
    const handleClick = async () => {
        // don't attempt request if not logged in
        if (!user) { return }

        const res = await fetch(`${process.env.REACT_APP_API_URL}api/workouts/${workout._id}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${user.token}`
            }
        })
        const json = await res.json()

        if (res.ok) {
            dispatch({
                type: "DELETE_WORKOUT", payload: json.workout
            })
        }
    }

    return (
        <div className="workout-details">
            <h4>{workout.title}</h4>
            <p><strong>Load (lbs): </strong>{workout.load}</p>
            <p><strong>Reps: </strong>{workout.reps}</p>
            <p>{formatDistanceToNow(new Date(workout.createdAt), {addSuffix: true})}</p>
            <span onClick={handleClick} className="material-symbols-outlined">delete</span>
        </div>
    )
}

export default WorkoutDetails