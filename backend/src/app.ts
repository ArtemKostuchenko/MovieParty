import dotenv from 'dotenv';
import 'express-async-errors';
import express from 'express';
import cors from 'cors';
import { json } from 'body-parser';
import connectToDB from './db/connection';
import authRouter from './routes/auth.route';
import genreRouter from './routes/genre.route';
import listRouter from './routes/list.route';
import countryRouter from './routes/country.route';
import actorRouter from './routes/actor.route';
import directorRouter from './routes/director.route';
import partRouter from './routes/part.route';
import selectionRouter from './routes/selection.route';
import reviewRouter from './routes/review.route';
import videoContentRouter from './routes/content.route';
import roomRouter from './routes/room.route';
import errorMiddleware from './middlewares/error.middleware';

dotenv.config();

const app = express();

app.use(json());

app.use(cors());

// routers
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/genres', genreRouter);
app.use('/api/v1/lists', listRouter);
app.use('/api/v1/countries', countryRouter);
app.use('/api/v1/actors', actorRouter);
app.use('/api/v1/directors', directorRouter);
app.use('/api/v1/parts', partRouter);
app.use('/api/v1/selections', selectionRouter);
app.use('/api/v1/reviews', reviewRouter);
app.use('/api/v1/content/v/', videoContentRouter);
app.use('/api/v1/rooms', roomRouter);

// middleware
app.use(errorMiddleware);

const port = 5000 || process.env.PORT;

const start = async () => {
    try {
        await connectToDB(process.env.MONGO_URI!);
        app.listen(port, () => {
            console.log(`Server is listening on ${port}`);
        });
    } catch (err) {
        console.error(err);
    }
};

start();