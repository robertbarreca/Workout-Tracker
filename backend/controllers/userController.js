/**
 * @fileoverview User Controllers
 *
 * @description This module defines the logic behind the following authentication related operations. 
 * - Logging in an existing user
 * - Signing up a new user
 *
 * @dependencies ../models/userModel, jsonwebtoken 
 */

const User = require("../models/userModel")
const jwt = require("jsonwebtoken")

/**
 * @function createToken
 * @description Creates a jwt token
 * 
 * @param {string} paramName - id of user function makes token for
 * 
 * @returns {string} The generated JWT Token
 */
const createToken = (_id) => {
    return jwt.sign({_id}, process.env.SECRET, {expiresIn: "3d"})
}

/**
 * @function loginUser
 * @description Handles user login by validating credentials and returning a JWT token.
 * 
 * @param {Object} req - The request object containing the user credentials
 * @param {Object} res - The response object used to send back the desired HTTP response
 * 
 * @returns {void} Sends a JSON response containing the user's email and JWT token upon successful login, or an error message upon failure.
 */
const loginUser = async (req, res) => {
    const { email, password } = req.body
    
    try {
        const user = await User.login(email, password)
        const token = createToken(user._id)
        res.status(200).json({email, token})
    } catch (error) {
        res.status(400).json({ error: error.message })
        console.log(error.message)
    }
}

/**
 * @function signupUser
 * @description Handles user signup by validating credentials and returning a JWT token.
 * 
 * @param {Object} req - The request object containing the user credentials
 * @param {Object} res - The response object used to send back the desired HTTP response
 * 
 * @returns {void} Sends a JSON response containing the user's email and JWT token upon successful signup, or an error message upon failure.
 */
const signupUser = async (req, res) => {
    const { email, password } = req.body
    try {
        const user = await User.signup(email, password)
        const token = createToken(user._id)
        res.status(200).json({email, token})
    } catch (error) {
        res.status(400).json({ error: error.message })
        console.log(error.message)
    }
}

module.exports = {loginUser, signupUser}