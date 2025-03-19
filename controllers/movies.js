import { MovieModel } from "../models/movie.js"
import { validateMovie, validateParcialMovie } from "../Schema/movies.js"

export class MoviewController {

    static async getAll(req, res) {
        const { genre } = req.query
        const movies = await MovieModel.getAll({ genre })
        res.json(movies)
    }

    static async getById(req, res) {
        const id = req.params.id
        const movie = await MovieModel.getById({ id })
        if (movie) {
            res.json(movie)
        } else {
            res.status(404).json({ message: 'Movie not found' })
        }
    }

    static async create(req, res) {
        const result = validateMovie(req.body)

        if (result.error) {
            res.status(400).json({ errors: result.error })
        }

        const movie = await MovieModel.create({ input: result.data })
        res.status(201).json(movie)
    }

    static async delete(req, res) {
        const id = req.params.id
        const success = await MovieModel.delete({ id })
        if (!success) res.status(404).json({ message: 'Movie not found' })
        res.status(204).send()
    }

    static async update(req, res) {
        const result = validateParcialMovie(req.body)
        if (result.error) {
            res.status(400).json({ errors: result.error })
        }

        const id = req.params.id

        const movieUpdate = await MovieModel.update({ id, input: result.data })

        if (!movieUpdate) {
            res.status(404).json({ message: 'Movie not found' })
        }

        return res.json(movieUpdate)
    }

}