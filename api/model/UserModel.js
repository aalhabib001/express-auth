const mongoose = require('mongoose')
const validator = require('validator')
const {Schema} = require("mongoose");


const userSchema = new Schema({
    email: {
        type: String,
        trim: true,
        validate: {
            validator: validator.isEmail,
            message: `{VALUE} is not an email`,
            isAsync: false
        },
        required: true,
        unique: true
    },
    name: {
        type: String,
        trim: true,
        required: true
    },
    password: {
        type: String,
        min: 8
    },

})

const UserModel = mongoose.model('UserModel', userSchema)

module.exports = UserModel
