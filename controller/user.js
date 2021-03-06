const userModel = require( '../model/user' )
const { validateRegistration, validateSignIn } = require( '../validateBlog' )
const bcrypt = require( 'bcrypt' )
const jwt = require( 'jsonwebtoken' )


// sign up user
const signUp = async ( req, res ) => {
    try {
        // validate user input
        const { error } = validateRegistration( req.body )
        if ( error ) {
            res.status( 409 ).json( {
                message: error.details[0].message
            })
        } else {
            // verify user
            const oldUser = await userModel.findOne( { email: req.body.email } )
            if ( oldUser ) {
                res.json({message: `email already existed`})
            } else {
                // salt the password
                const saltedPassword = await bcrypt.genSalt( 10 )
                // hash the password
                const hashedPassword = await bcrypt.hash( req.body.password, saltedPassword )
                
                // create user object
                const userData = {
                    fullName: req.body.fullName,
                    course: req.body.course,
                    duration: req.body.duration,
                    username: req.body.username,
                    email: req.body.email,
                    password: hashedPassword
                }

                // create user
                const user = await userModel.create( userData )
                if ( !user ) {
                    res.status( 400 ).json( {
                        status: 400,
                        message: "fail to create user"
                    })
                } else {
                    res.status( 201 ).json( {
                        status: '201',
                        data: user
                    })
                }
            }
        }
        // catch all other error
    } catch ( error ) {
        res.json({message: error.message});
    }
}

// signIn function
const signIn = async ( req, res ) => {
    try {
        const { error } = validateSignIn( req.body )
        if ( error ) {
            res.json( {
                message: error.details[0].message
            });
        } else {
            const user = await userModel.findOne( { email: req.body.email } )
            if ( !user ) {
                res.json( {
                    message: "User not recognized!!!"
                })
            } else {
                const passwordCheck = await bcrypt.compare( req.body.password, user.password )
                if ( !passwordCheck ) {
                    res.json({message: 'Invalid password'})
                } else {
                    const { password, ...info } = user._doc;
                    const token = jwt.sign(
                        // payload or data
                        {
                            _id: user._id,
                            fullName: user.fullName,
                            // course: user.course,
                            duration: user.duration,
                            // username: user.username,
                            // email: user.email
                        },
                        // secrete
                        'mytoken',
                        // option
                        {expiresIn: '2d'}
                    )
                    res.json( {
                        message: `Welcome back ${user.fullName}`,
                        data: {token}
                    })
                }
            }
        }
    } catch ( error ) {
        res.status( 500 ).json( {
            status: 500,
            message: error.message
        } )
    }
}

// get all users
const allUsers = async ( req, res ) => {
    try {
        const users = await userModel.find();
        if ( users.length < 1 ) {
            res.status( 404 ).json( {
                status: 404,
                message: 'No user in the database'
            })
        } else {
            res.status( 200 ).json( {
                status: 200,
                totalUsers: users.length,
                data: users
            })
        }
    } catch ( error ) {
        res.status( 404 ).json( {
            status: '404',
            message: error.message
        })
    }
}

// exports all functions
module.exports = {
    signUp,
    signIn,
    allUsers
}
