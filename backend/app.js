require('dotenv').config();
require('express-async-errors');
const express = require('express');
const connectToDB = require('./db/connection');
const authRouter = require('./routes/auth.route');
const genreRouter = require('./routes/genre.route');
const listRouter = require('./routes/list.route');
const countryRouter = require('./routes/country.route');
const errorMiddleware = require('./middlewares/error.middleware');

const app = express();

app.use(express.json());

// routers

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/genres', genreRouter);
app.use('/api/v1/lists', listRouter);
app.use('/api/v1/countries', countryRouter);

// middleware

app.use(errorMiddleware);

const port = 5000 || process.env.PORT;

const start = async () => {
    try {
        await connectToDB(process.env.MONGO_URI);
        app.listen(port, console.log(`Server is listening on ${port}`));;
    } catch (err) {
        console.log(err);
    }
}

start();