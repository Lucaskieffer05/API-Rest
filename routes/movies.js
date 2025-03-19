import { Router } from 'express';
import { MoviewController } from '../controllers/movies.js';

export const moviesRouter = Router();

moviesRouter.get('/', MoviewController.getAll)
moviesRouter.get('/:id', MoviewController.getById)
moviesRouter.post('/', MoviewController.create)
moviesRouter.delete('/:id', MoviewController.delete)
moviesRouter.patch('/:id', MoviewController.update)