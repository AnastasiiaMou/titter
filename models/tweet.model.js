const DataTypes = require("sequelize");
const db = require('../db');

const Tweet = db.define('Tweet', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    text: {
        type: DataTypes.STRING(140),
        allowNull: false,
    },
    timestamp: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
}, {
    timestamps: false,
})

module.exports = Tweet;