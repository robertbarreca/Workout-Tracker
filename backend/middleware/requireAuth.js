/**
 * @fileoverview Authentication Middleware
 *
 * @description This module exports a middleware function that verifies the JWT token
 * in the request headers and checks for the user's authorization. 
 *
 * @dependencies jsonwebtoken, ../models/userModel
 */

const jwt = require("jsonwebtoken")
const User = require("../models/userModel")

/**
 * @function requireAuth
 * @description Middleware that verifies the JWT token from the request header to ensure that the request is authorized.
 * 
 * @param {Object} req The request object containing json web token
 * @param {Object} res The response object, used to send back the desired HTTP response.
 * @param {Function} next Callback function to pass control to the next middleware in the stack.
 * 
 * @returns {void} Attaches the user ID to `req.user` if the token is valid, or sends a 401 response if unauthorized.
 */
const requireAuth = async (req, res, next) => {
    const { authorization } = req.headers
    
    if (!authorization) {
        return res.status(401).json({"error": "Authorization token required"})
    }

    const token = authorization.split(" ")[1]
    try {
        const { _id } = jwt.verify(token, process.env.SECRET)
        req.user = await User.findById({ _id }).select("_id")
        next()
    } catch (error) {
        console.log(error)
        res.status(401).json({"error": "Request is not authorized"})
    }
    
}

module.exports = requireAuth