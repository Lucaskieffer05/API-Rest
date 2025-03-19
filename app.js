import express, { json } from 'express'
import { moviesRouter } from './routes/movies.js'
import { corsMiddleware } from './middlewares/cors.js'

const app = express() 
app.use(json()) // Parse the body of the request as JSON
app.disable('x-powered-by') // Disable the x-powered-by header
app.use(corsMiddleware())

// Use the moviesRouter for all requests to the /movies path
app.use('/movies', moviesRouter)

// eslint-disable-next-line no-undef
const PORT = process.env.PORT ?? 1234; // Set the port to 1234 if the PORT environment variable is not set

app.listen(PORT, () => {
    console.log(`Server listening on port http://localhost:${PORT}`)
});