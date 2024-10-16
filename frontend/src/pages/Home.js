/**
 * @fileoverview Home Page
 * 
 * @description This page fetches all the workouts from the backend API and renders all the workout detail the workout form components
 * 
 * @dependencies ../components/WorkoutDetails, ../components/WorkoutForm, ../hooks/useWorkoutsContext, ../hooks/useAuthContext
 */

import { useEffect } from "react"
import WorkoutDetails from "../components/WorkoutDetails"
import WorkoutForm from "../components/WorkoutForm"
import { useWorkoutsContext } from "../hooks/useWorkoutsContext"
import {useAuthContext} from "../hooks/useAuthContext"

/**
 * @function HomePage
 * @description This page fetches and displays all workouts, along with a form to create new workouts.
 * 
 * @returns {JSX.Element} The rendered HomePage component containing workout details and a form.
 */
const HomePage = () => {
    const { workouts, dispatch } = useWorkoutsContext()
    const {user} = useAuthContext()
    // fetch all workouts
    useEffect(() => {
        const fetchWorkouts = async () => {
            const res = await fetch(`${process.env.REACT_APP_API_URL}api/workouts`, {
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