/**
 * @fileoverview Log In Page
 * 
 * @description This component renders a login form for existing users, allowing them to log in upon form submission. It handles user input for email and password and displays error messages if log in fails.
 * 
 * @dependencies ../hooks/useLogin
 */

import { useState } from "react"
import { useLogin } from "../hooks/useLogin"

/**
 * @function Login
 * @description This page renders the form for user login. It captures user input and calls the login function upon form submission.
 * 
 * @returns {JSX.Element} The rendered Login page containing a form to log in.
 */
const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const {login, error, isLoading} = useLogin()

    /**
     * @function handleSubmit
     * @description Handles the form submission event. Prevents default behavior and calls the login function with the entered email and password.
     * 
     * @param {Event} e - The submit event triggered by the form.
     */
    const handleSubmit = async (e) => {
        e.preventDefault()
        await login(email, password)
    }

    return (
        <form className="login" onSubmit={handleSubmit}>
            <h3>Log In</h3>
            <label>Email:</label>
            <input
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
            />

            <label>Password:</label>
            <input
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
            />
            <button disabled={isLoading}>Log in</button>
            {error && <div className="error">{error}</div>}
        </form>
    )
}

export default Login