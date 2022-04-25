const mongoose = require( 'mongoose' )


const userSchema = mongoose.Schema( {
    fullName: {
        type: String,
        required: true
    },
    course: {
        type: String,
        required: true
    },
    duration: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
} )

const userModel = mongoose.model( 'users', userSchema )
module.exports = userModel