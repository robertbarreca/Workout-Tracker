/**
 * @fileoverview Sign Up Page
 * 
 * @description This component renders a login form for existing users, allowing them to sign up upon form submission. It handles user input for email and password and displays error messages if sign up fails.
 * 
 * @dependencies ../hooks/useLogin
 */

import { useState } from "react"
import { useSignup } from "../hooks/useSignup"

/**
 * @function Login
 * @description This page renders the form for user sign up. It captures user input and calls the signup function upon form submission.
 * 
 * @returns {JSX.Element} The rendered Signup page containing a form to sign up.
 */
const Signup = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const {signup, error, isLoading} = useSignup()

    /**
     * @function handleSubmit
     * @description Handles the form submission event. Prevents default behavior and calls the signup function with the entered email and password.
     * 
     * @param {Event} e - The submit event triggered by the form.
     */
    const handleSubmit = async (e) => {
        e.preventDefault()
        await signup(email, password)
    }

    return (
        <form className="signup" onSubmit={handleSubmit}>
            <h3>Sign Up</h3>
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
            <button disabled={isLoading}>Sign Up</button>
            {error && <div className="error">{error}</div>}
        </form>
    )
}

export default Signup