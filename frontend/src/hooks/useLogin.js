import { useState } from "react"
import { useAuthContext } from "./useAuthContext"

export const useLogin = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const {dispatch} = useAuthContext()

    const login = async (email, password) => {
        setIsLoading(true)
        setError(null)

        const res = await fetch("/api/user/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({email, password})
        })
        console.log(res)
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