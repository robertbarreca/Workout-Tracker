/**
 * @fileoverview Authentication Context
 * 
 * @description This file creates a global authentication context to manage the user's authentication state, allowing any child components to login or logout.
 */

import { createContext, useEffect, useReducer } from "react"

export const AuthContext = createContext()
/**
 * @function authReducer
 * @description A reducer function to manage the state transitions for user authentication. It listens for 'LOGIN' and 'LOGOUT' actions to set or clear the user state.
 * 
 * @param {Object} state - The current state of authentication, containing the user object or null.
 * @param {Object} action - An object that contains the action type and payload.
 * 
 * @returns {Object} The updated state with the user object or null.
 */
export const authReducer = (state, action) => {
    switch (action.type) {
        case "LOGIN":
            return { user: action.payload }
        case "LOGOUT":
            return { user: null }
        default:
            return state
    }
}

/**
 * @function AuthContextProvider
 * @description Provides the authentication context to child components. Manages the state of the authenticated user and stores it in local storage.
 * 
 * @param {Object} props - The children components that need access to the authentication state.
 * 
 * @returns {JSX.Element} The context provider that wraps around its children, passing down the authentication state and dispatch function.
 */
export const AuthContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(authReducer, { user: null })

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"))
        if (user) {
            dispatch({type: "LOGIN", payload: user})
        }
    }, [])

    return (
        <AuthContext.Provider value={{...state, dispatch}}>
            {children}
        </AuthContext.Provider>
    )
}