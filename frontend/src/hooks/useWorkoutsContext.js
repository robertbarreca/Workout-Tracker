/**
 * @fileoverview Workouts Context Hook
 * 
 * @description This custom hook allows all child components to access the workouts context, providing methods for logging in and logging out.
 * 
 *  @dependencies ../context/useAuthContext
 */
import { WorkoutsContext } from "../context/WorkoutContext";
import { useContext } from "react"

/**
 * @function useWorkoutsContext
 * @description A custom hook that retrieves the workouts context, allowing child components to access and manage the workouts state.
 * 
 * @throws {Error} Throws an error if the hook is not wrapped in a WorkoutsContextProvider.
 * 
 * @returns {Object} The context value containing the current workouts state and dispatch method.
 */
export const useWorkoutsContext = () => {
    const context = useContext(WorkoutsContext)
    if (!context) {
        throw Error("useWorkoutsContext must be wrapped in a WorkoutsContextProvider")
    }
    return context
}