const Tweet = require('../models/tweet.model')
const User = require('../models/user.model')
const Like = require('../models/like.model')
const sequelize = require("sequelize");

async function postTweet(req, res) {
    const id = req.user.id;

    //TODO: tweet insert
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
        //TODO: tweets all my
        // SELECT tweets.id, tweets.text, tweets.timestamp, users.username from tweets, users WHERE userid=id ORDER BY timestamp DESC
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
        //TODO: user feed
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
            },
            attributes: {
                include: [
                    sequelize.literal(`(
                    SELECT COUNT(*)
                    FROM Likes AS reaction
                    WHERE
                        reaction.TweetId = Tweet.id
                )`),
                    'likesCount'
                ]
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
        // TODO: tweet by id
        const tweet = await Tweet.findOne({
            where: {
                id: id
            },
        })

        if (tweet) {
            const count = await Like.count({
                where: {
                    TweetId: id,
                }
            })
            res.json({...tweet.get(), likesCount: count});
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
        // TODO: create like

        await Like.create({
            UserId: userId,
            TweetId: tweetId,
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