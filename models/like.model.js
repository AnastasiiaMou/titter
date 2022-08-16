const DataTypes = require("sequelize");
const db = require('../db');
const User = require('./user.model');
const Tweet = require('./tweet.model')

const Like = db.define('Like', {
    UserId: {
        type: DataTypes.INTEGER,
        references: {
            model: User,
            key: 'id'
        }
    },
    TweetId: {
        type: DataTypes.INTEGER,
        references: {
            model: Tweet,
            key: 'id'
        }
    },
    timestamp: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
}, {
    timestamps: false,
})

module.exports = Like;