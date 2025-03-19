import cors from 'cors';
import { ACCEPTED_ORIGINS } from '../config/constants.js';

export const corsMiddleware = () => cors({
        origin: (origin, callback) => {
            if (!origin || ACCEPTED_ORIGINS.includes(origin)) {
                callback(null, true);
            } else {
                callback(new Error('Origen no permitido por CORS'));
            }
        },
        methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'], 
        allowedHeaders: ['Content-Type']
    })