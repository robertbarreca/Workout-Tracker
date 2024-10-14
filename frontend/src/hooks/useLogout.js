/**
 * @fileoverview Logout Hook
 * 
 * @overview This custom hook provides an easy way for child components to access the logout function, which removes the user from local storage, dispatches a logout action to the authentication context, and clears the global workouts state.
 * 
 * @dependencies ./useAuthContext ./useWorkoutsContext
 */
import { useAuthContext } from "./useAuthContext"
import { useWorkoutsContext } from "./useWorkoutsContext"

/**
 * @function useLogout
 * @description Removes the user from local storage, dispatches a logout action to the authentication context, and clears the global workouts state.
 * 
 * @returns {void}
 */
export const useLogout = () => {
    const { dispatch: authDispatch } = useAuthContext()
    const { dispatch: workoutsDispatch } = useWorkoutsContext()
    
    /**
     * @function logout
     * @description Logs out the user by removing their information from local storage and dispatching actions to update the authentication and workouts contexts.
     * 
     * @returns {void}
     */
    const logout = () => {
        // remove user from local storage
        localStorage.removeItem("user")

        // clear global login state
        authDispatch({ type: "LOGOUT" })
        
        // clear global state
        workoutsDispatch({type: "SET_WORKOUTS", payload: null})
    }
    return {logout}
}