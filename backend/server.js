const express = require('express');
const authRouter = require('./routes/auth');

const app = express();

// routers

app.use('/api/v1/auth', authRouter);

const port = 5000;

app.listen(port, console.log(`Server is listening on ${port}`));