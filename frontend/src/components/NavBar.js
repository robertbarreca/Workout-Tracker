/**
 * @fileoverview Navigation Bar Component
 * 
 * @description This component renders the navigation bar for the Workout Tracker application. 
 * 
 * 
 * @dependencies react-router-dom, ../hooks/useLogout, ../hooks/useAuthContext
 */

import { Link } from "react-router-dom"
import { useLogout } from "../hooks/useLogout"
import { useAuthContext } from "../hooks/useAuthContext"

/**
 * @function NavBar
 * @description Renders the navigation bar for the application, with options to log in, sign up, or log out, depending on the user's authentication status.
 * 
 * @returns {JSX.Element} The navigation bar with links for login, signup, or logout.
 */
const NavBar = () => {
    const { logout } = useLogout()
    const { user } = useAuthContext()
    
    /**
     * @function handleClick
     * @description Logs out the currently authenticated user by invoking the logout function.
     * 
     * @returns {void}
     */
    const handleClick = () => {
        logout()
    }

    return (
    <header>
        <div className="container">
            <Link to="/">
                <h1>Workout Tracker</h1>
            </Link>
                <nav>
                {user && (
                    <div>
                        <span>{user.email}</span>
                        <button onClick={handleClick}>Log Out</button>
                    </div>
                )}
                {!user && (
                    <div>
                        <Link to="/login">Log In</Link>
                        <Link to="/signup">Sign Up</Link>               
                    </div>
                )} 
            </nav>
        </div>
        </header>
    )
}

export default NavBar