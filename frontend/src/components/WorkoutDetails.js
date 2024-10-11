import { useWorkoutsContext } from "../hooks/useWorkoutsContext"
import formatDistanceToNow from "date-fns/formatDistanceToNow"
import {useAuthContext} from "../hooks/useAuthContext"


const WorkoutDetails = ({ workout }) => {
    const {dispatch} = useWorkoutsContext()
    const {user} = useAuthContext()
    
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