/**
 * @fileoverview
 * 
 * @description This file creates a global workout context to manage all of a user's workouts, allowing any child component to set, create, or delete workouts. The state structure includes an array of workouts.
 */

import { createContext, useReducer } from "react";

export const WorkoutsContext = createContext()

/**
 * @function workoutsReducer
 * @description A reducer function that handles state transitions for managing the user's workouts. It supports setting, creating, and deleting workouts.
 * 
 * @param {Object} state - The current state of the workouts, including an array of workout objects.
 * @param {Object} action - An object that contains the action type and payload for the state transition.
 * 
 * @returns {Object} The updated state after the action is applied, with modifications to the workouts array.
 */
export const workoutsReducer = (state, action) => {
    switch (action.type) {
        case "SET_WORKOUTS":
            return {
                workouts: action.payload
            }
        case "CREATE_WORKOUT":
            return {
                workouts: [action.payload, ...state.workouts]
            }
        case "DELETE_WORKOUT":
            return {
                workouts: state.workouts.filter(w => w._id !== action.payload._id) 
            }
        default:
            return state
    }
}

/**
 * @function WorkoutsContextProvider
 * @description Provides the workouts context to child components. Manages the state of the workouts array and the dispatch function that can update this state.
 * 
 * @param {Object} props - The children components that need access to the workouts context.
 * 
 * @returns {JSX.Element} The context provider that wraps around its children, passing down the workouts state and dispatch function.
 */
export const WorkoutsContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(workoutsReducer, {
        workouts: null
    })
    return (
        <WorkoutsContext.Provider value={{...state, dispatch}}>
            {children}
        </WorkoutsContext.Provider>
    )
}