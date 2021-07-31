require('dotenv').config();
const express = require('express');
let userRouter = require('./routes/userRoutes')
let postRouter = require('./routes/postRoutes')
let likeRouter = require('./routes/likeRoutes')
let followRouter = require('./routes/followRoutes')
const mongoose = require('mongoose');

let app = express();

mongoose.connect(process.env.DATABASE, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => {
        console.log('Connected to Database')
        app.listen(4500, () => {
            console.log('Listening to port 4500')
        })
    });


app.use(userRouter);
app.use(postRouter);
app.use(likeRouter);
app.use(followRouter);