const zod = require('zod') // Import the zod module

const movieSchema = zod.object({
    title: zod.string({
        invalid_type_error: 'El titulo debe ser un string',
        required_error: 'El titulo es requerido'
    }),
    genre: zod.array(
        zod.enum(['Action', 'Comedy', 'Drama', 'Crime', 'Horror', 'Sci-fi', 'Thriller'], {
            invalid_enum_error: 'El genero es invalido'
        }),
    ),
    year: zod.number().int().min(1888).max(2077),
    director: zod.string(),
    duration: zod.number().positive(),
    rate : zod.number().min(0).max(10).optional().default(5),
    poster : zod.string().url({
        message: 'El poster debe ser una URL valida'
    })
})

function validateMovie (objct){
    return movieSchema.safeParse(objct)
}

function validateParcialMovie (object){
    return movieSchema.partial().safeParse(object) // con partial() se puede validar un objeto parcial, haciendo opcional los campos
}
module.exports = {
    validateMovie,
    validateParcialMovie
}