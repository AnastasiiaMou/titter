const DataTypes = require("sequelize");
const db = require('../db');

async function createUser (user) {
    const sql = `INSERT INTO Users (username, passHash) VALUES (?, ?)`
    try {
        await db.run(sql, [user.username, user.passHash])
    } catch (e) {
        console.error(e)
        throw e;
    }
}

async function getUserByUsername(username) {
    const sql = `SELECT id, username, passHash FROM Users WHERE username = ?`
    try {
        const res = await db.get(sql, [username]);
        return res;
    } catch (e) {
        console.error(e)
        throw e;
    }
}

module.exports = {
    createUser,
    getUserByUsername,
};
