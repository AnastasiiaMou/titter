const db = require('../db');

async function createLike({tweetId, userId, timestamp}) {
    const sql = "INSERT into Likes (tweetId, userId, timestamp) VALUES (?,?,?)"
    await db.run(sql, [tweetId, userId, timestamp])
}

module.exports = {
    createLike,
};