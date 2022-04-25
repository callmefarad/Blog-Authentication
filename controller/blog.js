const blogModel = require( '../model/blog' )
// import the validator module
const {validateBlog} = require('../validateBlog')

// create a blog
const newBlog = async (req, res) => {
    try {
        const { error } = validateBlog( req.body )
        if ( error ) {
            res.status( 409 ).json( {
                status: "Failed",
                message: error.details[0].message
            } )
        } else {
            const blog = await blogModel.create( req.body )
            res.status( 201 ).json( {
            status: "success",
            data: student
        } )
        }
      
    } catch ( error ) {
        res.status( 409 ).json( {
            status: 'Failed',
            message: error.message
        })
    }
}

// get all blogs
const allBlog = async ( req, res ) => {
    try {
        query = await blogModel.find()
        let blogs = await query
        const noBlogs = students.length
        if ( blogs.length < 1 ) {
            res.status( 404 ).json( {
                status: 404,
                message: "No student was found.",
                blogSize: noBlogs
            })
        }
        res.status( 200 ).json( {
            status: 'Success',
            data: blogs
        })
    } catch ( error ) {
        res.status( 404 ).json( {
            status: 'Failed',
            message: error.message
        })
    }
}

// get a blog
const singleBlog = async ( req, res ) => {
    try {
        const blog = await blogModel.findById( req.params.id )
        res.status( 200 ).json( {
            status: 'success',
            data: blog
        })
    } catch ( error ) {
        res.status( 404 ).json( {
            status: "Failed",
            message: error.message
        })
    }
}

// update a blog
const updateBlog = async ( req, res ) => {
    try {
        const { error } = validateBlog( req.body )
        if ( error ) {
            res.status(500).json( {
                message: error.details[0].message
            })
        }
        const updatedBlog = await codeLabModel.findByIdAndUpdate( req.params.id, req.body, {new: true});
        res.status( 200 ).json( {
            status: 'success',
            data: updatedBlog
        } );
    } catch ( error ) {
        res.status( 500 ).json( {
            status: "Failed",
            message: error.message
        })
    }
}

// delete a blog
const deleteBlog = async ( req, res ) => {
    try {
        await blogModel.findByIdAndDelete( req.params.id );
        res.status( 200 ).json( {
            message: "deleted successfully"
        } );
    } catch ( error ) {
        res.status( 500 ).json( {
            status: "Failed",
            message: error.message
        })
    }
}


module.exports = {
    newBlog,
    allBlog,
    singleBlog,
    updateBlog,
    deleteBlog
}