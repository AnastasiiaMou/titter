const express = require('express')
const tweetController = require("../controllers/tweet.controller");
const {authMiddleware} = require("../auth");

const tweetRouter = express.Router();

tweetRouter.post('', authMiddleware, tweetController.postTweet)
tweetRouter.get('/my', authMiddleware, tweetController.getMyTweets)
tweetRouter.get('/:tweetId', tweetController.getTweetById)
tweetRouter.get('/feed/:userId', tweetController.getUserFeed)


module.exports = tweetRouter;