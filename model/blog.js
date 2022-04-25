const mongoose = require( 'mongoose' );


const blogSchema = mongoose.Schema( {
    title: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    }
}, {timestamps: true} );

const blogModel = mongoose.model( 'students', blogSchema )

module.exports = blogModel;