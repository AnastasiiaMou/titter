const express = require('express')
const app = express();
const db = require('./db')

const User = require('./models/user.model')
const Tweet = require('./models/tweet.model')

const userRouter = require('./routers/user.router')


app.use(express.json())
app.use('/api/users', userRouter);




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

    app.listen(3000, () => {
        console.log('server started 3000')
    })
}


init()
