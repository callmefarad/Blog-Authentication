const express = require( 'express' )
const router = express.Router()
const {signUp, allUsers, signIn} = require('../controller/user')


router
    .route( '/user/register' )
    .post( signUp )
    .get( allUsers )
router
    .route( '/user/login' )
    .post( signIn )
router
    .route( '/user' )
    .get( allUsers )
    
module.exports = router;