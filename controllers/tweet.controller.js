const Tweet = require('../models/tweet.model')
const User = require('../models/user.model')

async function postTweet(req, res) {
    const id = req.user.id;

    try {
        await Tweet.create({
            text: req.body.text,
            UserId: id,
            timestamp: Date.now()
        });
        res.sendStatus(201);
    } catch (e) {
        res.sendStatus(400)
    }
}

async function getMyTweets (req, res) {
    const id = req.user.id;

    try {
        const tweets = await Tweet.findAll({
            where: {
                UserId: id
            },
            order: [
                ['timestamp', 'desc']
            ],
            include: {
                model: User,
                attributes: ['username']
            }
        })

        res.json(tweets)
    } catch (e) {
        res.sendStatus(404)
    }
}

async function getUserFeed (req, res) {
    const username = req.params.username;

    try {
        const user = await User.findOne({
            where: {
                username: username
            }
        })
        const tweets = await Tweet.findAll({
            where: {
                UserId: user.id
            },
            order: [
                ['timestamp', 'desc']
            ],
            include: {
                model: User,
                attributes: ['username']
            }
        })



        res.json(tweets)
    } catch (e) {
        res.sendStatus(404)
    }
}

async function getTweetById (req, res) {
    const id = req.params.tweetId;

    try {
        const tweet = await Tweet.findOne({
            where: {
                id: id
            }
        })

        if (tweet) {
            res.json(tweet);
        } else {
            res.sendStatus(404)
        }
    } catch (e) {
        res.sendStatus(500)
    }
}

module.exports = {
    postTweet,
    getMyTweets,
    getUserFeed,
    getTweetById
}