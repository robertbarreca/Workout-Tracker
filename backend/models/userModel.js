/**
 * @fileoverview Schema for a user document
 * 
 * @description This files defines the schema for a user document. It also defines static methods for user authentication, including functions to login and sign up users.
 * 
 * @dependencies mongoose, bcryptjs, validator
 */

const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")
const validator = require("validator")
const Schema = mongoose.Schema

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
})

/**
 * @function signup
 * @description Static method for user schema that handles user signup by validating the email and password, checking if the email is already in use, and hashing the password before saving the user to the database.
 * 
 * @param {string} email - The user's email address that is used for account creation.
 * @param {string} password - The password that the user wants to use for the account.
 * 
 * @throws {Error} If any of the validation checks fail, such as missing fields, invalid email, weak password, or email already in use.
 * 
 * @returns {Object} The newly created user object, including the hashed password.
 */
userSchema.statics.signup = async function (email, password) {
    // validation
    if (!email || !password) { throw Error("All fields must be filled") }
    if (!validator.isEmail(email)) { throw Error("Email is not valid") }
    if (!validator.isStrongPassword(password)) {throw Error("Password not strong enough") }

    // check if email already in use
    const exists = await this.findOne({ email })
    if (exists) { throw Error("Email already in use") }

    // hash the password w created key
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    const user = await this.create({ email, password: hash })
    return user
}

/**
 * @function login
 * @description Static method for user schema that handles user login by validating the email and password. 
 * If the credentials are correct, the user object is returned.
 * 
 * @param {string} email - The user's email address used for account login.
 * @param {string} password - The password that the user provides to log in.
 * 
 * @throws {Error} If the email does not correspond to an account, if the password is incorrect, or if either the email or password is missing.
 * 
 * @returns {Object} The logged-in user object.
 */
userSchema.statics.login = async function (email, password) {
    if (!email || !password) { throw Error("All fields must be filled") }
    

    // check if user exists
    const user = await this.findOne({ email })
    if (!user) { throw Error("Incorrect email") }
    // check if password matches email
    const match = await bcrypt.compare(password, user.password)
    if (!match) { throw Error("Invalid password") }
    
    return user
}

module.exports = mongoose.model("User", userSchema)