const express = require('express')
const app = express();
const db = require('./db')

const User = require('./models/user.model')
const Tweet = require('./models/tweet.model')

const userRouter = require('./routers/user.router')
const tweetRouter = require("./routers/tweet.router");


app.use(express.json())
app.use('/api/users', userRouter);
app.use('/api/tweets', tweetRouter);




async function init() {
    User.hasMany(Tweet);
    Tweet.belongsTo(User);

    // await db.drop();
    await db.sync()

    // await User.create({
    //     username: 'admin',
    //     passHash: '12345'
    // })
    //
    // await Tweet.create({
    //     text: 'My first tweet',
    //     timestamp: Date.now(),
    //     UserId: 1,
    // })

    app.listen(3001, () => {
        console.log('server started 3001')
    })
}


init()
