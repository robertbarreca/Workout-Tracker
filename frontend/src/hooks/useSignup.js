import { useState } from "react"
import { useAuthContext } from "./useAuthContext"

export const useSignup = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const {dispatch} = useAuthContext()

    const signup = async (email, password) => {
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