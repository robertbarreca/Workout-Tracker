import { AuthContext } from "../context/WorkoutContext";
import { useContext } from "react"

export const useAuthContext = () => {
    const context = useContext(AuthContext)
    if (!context) {
        throw Error("useAuthContext must be wrapped in a AuthContextProvider")
    }
    return context
}