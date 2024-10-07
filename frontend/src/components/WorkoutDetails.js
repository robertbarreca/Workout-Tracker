import { useWorkoutsContext } from "../hooks/useWorkoutsContext"
import formatDistanceToNow from "date-fns/formatDistanceToNow"


const WorkoutDetails = ({ workout }) => {
    const {dispatch} = useWorkoutsContext()

    const handleClick = async () => {
        const res = await fetch(`/api/workouts/${workout._id}`, {
            method: "DELETE"
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