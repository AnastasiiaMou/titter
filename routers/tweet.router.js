const express = require('express')
const tweetController = require("../controllers/tweet.controller");
const {authMiddleware} = require("../auth");

const tweetRouter = express.Router();

tweetRouter.post('', authMiddleware, tweetController.postTweet)
tweetRouter.get('/my', authMiddleware, tweetController.getMyTweets)
tweetRouter.get('/top3', tweetController.top3)
tweetRouter.get('/feed/:username', tweetController.getUserFeed)
tweetRouter.get('/:tweetId', tweetController.getTweetById)
tweetRouter.post('/:tweetId/like', authMiddleware, tweetController.like)



module.exports = tweetRouter;