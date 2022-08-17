const db = require('../db');

async function createTweet(tweet) {
    const sql = "INSERT INTO tweets (text, timestamp, userid) VALUES (?,?,?)";
    await db.run(sql, [tweet.text, tweet.timestamp, tweet.userId])
}

async function getTweetsByUserId(userId) {
    const sql = `
        SELECT tweets.id, tweets.text, tweets.timestamp, tweets.userId as userId, users.username, COUNT(likes.userId) as likes  
        from tweets
        LEFT JOIN Users
        ON tweets.UserId = Users.id
        LEFT JOIN Likes
        ON Tweets.id = likes.TweetId
        WHERE tweets.userid=? and users.id=?
        GROUP BY Likes.TweetId
        ORDER BY tweets.timestamp DESC;
    `;
    const tweets = await db.all(sql, [userId, userId]);
    return tweets
}

async function getTweetsByUsername(username) {
    const sql = `
        SELECT 
        tweets.id, tweets.text, tweets.timestamp, tweets.UserId as userId, Users.username as username, COUNT(likes.userId) as likes
        FROM tweets
        LEFT JOIN Users
        ON tweets.UserId = users.id
        LEFT JOIN Likes
        ON Tweets.id = likes.TweetId
        WHERE username = ?
        GROUP BY Likes.TweetId
        ORDER BY tweets.timestamp DESC
    `
    const tweets = await db.all(sql, [username]);
    return tweets
}

async function getTweetById(tweetId) {
    const sql = `
        SELECT 
        tweets.id, tweets.text, tweets.timestamp, tweets.UserId as userId, users.username, COUNT(likes.userId) as likes
        FROM tweets
        LEFT JOIN Users
        ON tweets.UserId = users.id
        LEFT JOIN Likes
        ON Tweets.id = likes.TweetId
        WHERE 
        Tweets.id = ?
        GROUP BY Likes.TweetId
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