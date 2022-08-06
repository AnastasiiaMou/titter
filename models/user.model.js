const DataTypes = require("sequelize");
const db = require('../db');

const User = db.define(
    'User',
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        username: {
            type: DataTypes.TEXT,
            allowNull: false,
            unique: true
        },
        passHash: {
            type: DataTypes.TEXT,
            allowNull: false,
        }
    },
    {
        timestamps: false,
    }
)

module.exports = User;
