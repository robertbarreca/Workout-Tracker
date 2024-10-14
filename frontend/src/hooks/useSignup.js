/**
 * @fileoverview Signup Hook
 * 
 * @description This custom hook provides an easy way for all child components to access the error, isLoading state variables, and the signup function.
 * 
 *  @dependencies ./useAuthContext
 */

import { useState } from "react"
import { useAuthContext } from "./useAuthContext"

/**
 * @function useSignup
 * @description A custom hook that manages the signup process for users. It handles the state for loading and errors while providing a signup function to register new users.
 * 
 * @returns {Object} An object containing the signup function, loading state, and error state:
 * - {Function} signup - The function to register a new user with email and password.
 * - {boolean} isLoading - Indicates if the signup request is in progress.
 * - {string|null} error - The error message if the signup fails, or null if there is no error.
 */
export const useSignup = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const {dispatch} = useAuthContext()

    /**
     * @function signup
     * @description Registers a new user by sending their email and password to the server.
     * 
     * @param {string} email - The email address used for signing up.
     * @param {string} password - The password used for signing up.
     * 
     * @returns {Promise<void>} A promise that resolves when the signup process is complete.
     */
    const signup = async (email, password) => {
        setIsLoading(true)
        setError(null)

        const res = await fetch(`${process.env.REACT_APP_API_URL}api/user/signup`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({email, password})
        })
        const json = await res.json()
        if (!res.ok) {
            setIsLoading(false)
            setError(json.error)
        }
        else {
            // save user to localstorage
            localStorage.setItem("user", JSON.stringify(json))
            // update auth context
            dispatch({type: "LOGIN", payload: json})
            setIsLoading(false)
        }
    }
    return {signup, isLoading, error}
}