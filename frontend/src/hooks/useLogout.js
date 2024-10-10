import { useAuthContext } from "./useAuthContext"
import { useWorkoutsContext } from "./useWorkoutsContext"

export const useLogout = () => {
    const { dispatch: authDispatch } = useAuthContext()
    const {dispatch: workoutsDispatch} = useWorkoutsContext()
    const logout = () => {
        // remove user from local storage
        localStorage.removeItem("user")

        // dispatch logout action
        authDispatch({ type: "LOGOUT" })
        
        // clear global state
        workoutsDispatch({type: "SET_WORKOUTS", payload: null})
    }
    return {logout}
}