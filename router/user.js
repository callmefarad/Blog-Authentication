const express = require( 'express' )
const router = express.Router()
const {signUp, allUsers} = require('../controller/user')


router
    .route( '/user/register' )
    .post( signUp )
    .get( allUsers )
router
    .route( '/user' )
    .get( allUsers )
    
module.exports = router;