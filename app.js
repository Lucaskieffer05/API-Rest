const express = require('express') // Import express
const movies = require('./movies') // Import the movies module
const crypto = require('crypto') // Import the crypto module
const cors = require('cors')
const { validateMovie, validateParcialMovie } = require('./Schema/movies')


app.use(cors({
    origin: 'http://localhost:8080', // Permitir este origen
    methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'], // Métodos permitidos
    allowedHeaders: ['Content-Type'] // Encabezados permitidos
}));

const app = express() // Create an express app
app.use(express.json()) // Enable parsing JSON bodies, it is middleware that is used to parse JSON bodies in the request
app.disable('x-powered-by') // Disable the x-powered-by header


app.get('/', (req, res) => {
    res.json({ message: 'Hello World' })
})

const ACCEPTED_ORIGINS = ['http://localhost:3000', 'http://localhost:8080' ,'https://myapp.com']



// Recuperer la liste de peliculas
app.get('/movies', (req, res) => {
    const origin = req.header('origin')
    if (ACCEPTED_ORIGINS.includes(origin) || !origin) {
        res.header('Access-Control-Allow-Origin', origin)
    }
    const { genre } = req.query
    if (genre) {
        const filteredMovies = movies.filter(
            movie => movie.genre.some(g => g.toLowerCase() === genre.toLowerCase())
        )
        res.json(filteredMovies)
    }
    res.json(movies)
})

app.get('/movies/:id', (req, res) => {
    const id = req.params.id
    const movie = movies.find(movie => movie.id === id)
    if (movie) {
        res.json(movie)
    } else {
        res.status(404).json({ message: 'Movie not found' })
    }
})

app.post('/movies', (req, res) => {
    const result = validateMovie(req.body)

    if (result.error) {
        res.status(400).json({ errors: result.error })
    }

    const newMovie = {
        id: crypto.randomUUID(),
        ...result.data
    }
    // ESTO NO ES REST PORQUE GUARDAMOS EL ESTADO EN LA APLICACION
    movies.push(newMovie)
    res.status(201).json(newMovie)
})


app.delete('/movies/:id', (req, res) => {
    const origin = req.header('origin');
    if (ACCEPTED_ORIGINS.includes(origin) || !origin) {
        res.header('Access-Control-Allow-Origin', origin);
    }
    const id = req.params.id
    const movieIndex = movies.findIndex(movie => movie.id === id)
    if (movieIndex === -1){
        res.status(404).json({ message: "Pelicula no encontrada"})
    }

    movies.splice(movieIndex, 1)
    res.status(204).send()
})


app.patch('/movies/:id', (req, res) => {
    const result = validateParcialMovie(req.body)
    if (result.error) {
        res.status(400).json({ errors: result.error })
    }
    
    const id = req.params.id
    const movieIndex = movies.findIndex(movie => movie.id === id)
    if (movieIndex === -1){
        res.status(404).json({ message: "Pelicula no encontrada"})
    }

    const updateMovie = {
        ...movies[movieIndex],
        ...result.data
    }

    movies[movieIndex] = updateMovie
    return res.json(updateMovie)
})

app.options('/movies/:id', (req, res) => {
    const origin = req.header('origin');
    if (ACCEPTED_ORIGINS.includes(origin) || !origin) {
        res.header('Access-Control-Allow-Origin', origin);
        res.header('Access-Control-Allow-Methods', 'PATCH, DELETE, OPTIONS, POST');
    }
    res.sendStatus(200);

})

const PORT = process.env.PORT ?? 1234; // Set the port to 1234 if the PORT environment variable is not set

app.listen(PORT, () => {
    console.log(`Server listening on port http://localhost:${PORT}`)
});