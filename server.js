require( './config/db' )
const express = require( 'express' )
const port = 4040
const blogRouter = require( './router/blog' )
const userRouter = require( './router/user' )

const app = express()
app.use( express.json() )
app.get( '/', (req, res) => {
    res.send('Welcome')
} )
app.use("/api", blogRouter)
app.use("/api", userRouter)

app.listen( port, () => {
    console.log( 'listening on port ' + port)
})