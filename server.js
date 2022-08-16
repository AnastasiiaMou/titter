const express = require('express')
const app = express();
const db = require('./db')

const userRouter = require('./routers/user.router')
// const tweetRouter = require("./routers/tweet.router");


app.use(express.json())
app.use('/api/users', userRouter);
// app.use('/api/tweets', tweetRouter);




async function init() {




    app.listen(3001, () => {
        console.log('server started 3001')

    })
}


init()
