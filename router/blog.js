const express = require( 'express' );
const router = express.Router()
const {
    newBlog,
    allBlog,
    singleBlog,
    updateBlog,
    deleteBlog} = require( '../controller/blog')


router
    .route( "/blog" )
    .post(newBlog)
    .get(allBlog)

router
    .route( "/newBlog/:id" )
    .get(singleBlog)
    .patch(updateBlog)
    .delete( deleteBlog )
    

module.exports = router;