const db = require('../db');

async function createTweet(tweet) {
    const sql = "INSERT INTO tweets (text, timestamp, userid) VALUES (?,?,?)";
    await db.run(sql, [tweet.text, tweet.timestamp, tweet.userId])
}

async function getTweetsByUserId(userId) {
    const sql = `
        select * from tweets_view
        WHERE userId = ?
    `;
    const tweets = await db.all(sql, [userId]);
    return tweets
}

async function getTweetsByUsername(username) {
    const sql = `
        SELECT * from tweets_view
        WHERE username = ?
    `
    const tweets = await db.all(sql, [username]);
    return tweets
}

async function getTweetById(tweetId) {
    const sql = `
        SELECT * from tweets_view
        WHERE 
        Tweets.id = ?
    `
    const tweet = await db.get(sql, [tweetId])
    return tweet
}


module.exports = {
    createTweet,
    getTweetsByUserId,
    getTweetsByUsername,
    getTweetById,
};