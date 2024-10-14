/**
 * @fileoverview Login Hook
 * 
 * @description This custom hook provides an easy way for all child components to access the error, isLoading state variables, and the login function.
 * 
 *  @dependencies ./useAuthContext
 */

import { useState } from "react"
import { useAuthContext } from "./useAuthContext"

/**
 * @function useLogin
 * @description A custom hook that manages the login process for users. It handles the state for loading and errors while providing a login function to authenticate users.
 * 
 * @returns {Object} An object containing the login function, loading state, and error state:
 * - {Function} login - The function to authenticate users with email and password.
 * - {boolean} isLoading - Indicates if the login request is in progress.
 * - {string|null} error - The error message if the login fails, or null if there is no error.
 */
export const useLogin = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const {dispatch} = useAuthContext()

    /**
     * @function login
     * @description Authenticates users based on provided email and password
     * 
     * @param {string} email The email used to login.
     * @param {string} password The password used to login.
     */
    const login = async (email, password) => {
        setIsLoading(true)
        setError(null)
        const res = await fetch(`${process.env.REACT_APP_API_URL}api/user/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({email, password})
        })
        const json = await res.json()
        if (!res.ok) {
            setIsLoading(false)
            setError(json.error)
            console.log(res)
        }
        else {
            // save user to localstorage
            localStorage.setItem("user", JSON.stringify(json))
            // update auth context
            dispatch({type: "LOGIN", payload: json})
            setIsLoading(false)
        }
    }
    return {login, isLoading, error}
}