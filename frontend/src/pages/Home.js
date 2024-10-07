import { useEffect } from "react"
import WorkoutDetails from "../components/WorkoutDetails"
import WorkoutForm from "../components/WorkoutForm"
import { useWorkoutsContext } from "../hooks/useWorkoutsContext"

const HomePage = () => {
    const { workouts, dispatch } = useWorkoutsContext()

    // fetch all workouts
    useEffect(() => {
        const fetchWorkouts = async () => {
            const res = await fetch("/api/workouts")
            
            if (res.ok) {
                const json = await res.json()
                dispatch({type: "SET_WORKOUTS", payload: json.workouts})
            }
        }
        fetchWorkouts()
    }, [dispatch])

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