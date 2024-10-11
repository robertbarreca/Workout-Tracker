import { useEffect } from "react"
import WorkoutDetails from "../components/WorkoutDetails"
import WorkoutForm from "../components/WorkoutForm"
import { useWorkoutsContext } from "../hooks/useWorkoutsContext"
import {useAuthContext} from "../hooks/useAuthContext"

const HomePage = () => {
    const { workouts, dispatch } = useWorkoutsContext()
    const {user} = useAuthContext()
    // fetch all workouts
    useEffect(() => {
        const fetchWorkouts = async () => {

            const res = await fetch("/api/workouts", {
                headers: {
                    "Authorization": `Bearer ${user.token}`
                }
            })
            
            if (res.ok) {
                const json = await res.json()
                dispatch({type: "SET_WORKOUTS", payload: json.workouts})
            }
        }
        if (user) { fetchWorkouts() }
        
    }, [dispatch, user])

    return(
        <div className="home">
            <div className="workouts">
                {workouts && workouts.map((workout) => (
                    <WorkoutDetails key={workout._id} workout={workout}/>
                ))}
            </div>
            <WorkoutForm />

        </div>
    )
}

export default HomePage