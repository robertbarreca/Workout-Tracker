import { useEffect, useState } from "react"
import WorkoutDetails from "../components/WorkoutDetails"
import WorkoutForm from "../components/WorkoutForm"
const HomePage = () => {
    const [workouts, setWorkouts] = useState([])

    // fetch all workouts
    useEffect(() => {
        const fetchWorkouts = async () => {
            const res = await fetch("/api/workouts")
            
            if (res.ok) {
                const json = await res.json()
                setWorkouts(json.workouts)
            }
        }
        fetchWorkouts()
    }, [workouts])

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