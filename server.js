const express = require('express')
const app = express();
const db = require('./db')

const Tweet = require("./models/tweet.model")

const userRouter = require('./routers/user.router')
const tweetRouter = require("./routers/tweet.router");


app.use(express.json())
app.use('/api/users', userRouter);
app.use('/api/tweets', tweetRouter);




async function init() {

    // const a = await Tweet.getTweetsByUserId(1);
    // const u = await Tweet.getTweetsByUsername('ananasia')
    // console.table(u)
    //
    // const t = await Tweet.getTweetsByUserId(2)
    // console.table(t)


    app.listen(3001, () => {
        console.log('server started 3001')

    })
}


init()
