// import the validator library
const hapiJoy = require( '@hapi/joi' ) 

// create a validator function for student
const validateBlog = (data) => {
    const validateMe = hapiJoy.object( {
        title: hapiJoy.string(),
        description: hapiJoy.string()
    } )
    return validateMe.validate(data)
}
module.exports.validateBlog = validateBlog;


// create a validator function for registration
const validateRegistration = (data) => {
    const validateMe = hapiJoy.object( {
        fullName: hapiJoy.string(),
        course: hapiJoy.string(),
        duration: hapiJoy.number(),
        username: hapiJoy.string(),
        email: hapiJoy.string().email(),
        password: hapiJoy.string().min(8).max(100)
    } )
    return validateMe.validate(data)
}

module.exports.validateRegistration = validateRegistration;


