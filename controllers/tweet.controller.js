const Tweet = require('../models/tweet.model')
const Like = require('../models/like.model')

async function postTweet(req, res) {
    const id = req.user.id;

    try {
        await Tweet.createTweet({
            text: req.body.text,
            userId: id,
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
        const tweets = await Tweet.getTweetsByUserId(id)

        res.json(tweets)
    } catch (e) {
        res.sendStatus(404)
    }
}

async function getUserFeed (req, res) {
    const username = req.params.username;

    try {
        const tweets = await Tweet.getTweetsByUsername(username)
        res.json(tweets)
    } catch (e) {
        res.sendStatus(404)
    }
}

async function getTweetById (req, res) {
    const id = req.params.tweetId;

    try {
        const tweet = await Tweet.getTweetById(id)

        if (tweet) {
            res.json(tweet);
        } else {
            res.sendStatus(404)
        }
    } catch (e) {
        console.error(e)
        res.sendStatus(500)
    }
}

async function like(req, res) {
    const userId = req.user.id
    const tweetId = req.params.tweetId;

    try {

        await Like.createLike({
            userId,
            tweetId,
            timestamp: Date.now(),
        })
        res.sendStatus(201)
    } catch (e) {
        console.error(e)
        res.sendStatus(400)
    }
}

module.exports = {
    postTweet,
    getMyTweets,
    getUserFeed,
    getTweetById,
    like
}