require('dotenv').config();
require('express-async-errors');
const express = require('express');
const connectToDB = require('./db/connection');
const authRouter = require('./routes/auth');
const errorMiddleware = require('./middleware/error');

const app = express();

// routers

app.use('/api/v1/auth', authRouter);

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

start()