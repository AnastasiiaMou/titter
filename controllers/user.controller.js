const User = require('../models/user.model')
const {verifyToken} = require("../auth");
const {hashPassword} = require("../auth");
const {makeToken} = require("../auth");




async function register (req, res) {
    // {username, password}
    const payload = req.body;

    if (payload.username && payload.password) {

        try {
            const hash = await hashPassword(payload.password)

            await User.create({
                username: payload.username,
                passHash: hash
            })

            return res.sendStatus(201)
        } catch (e) {
            console.error(e)
            return res.sendStatus(400)

        }
    }

    res.sendStatus(400)


}


async function login (req, res) {
    const {username, password} = req.body;

    if (username && password) {
        try {
            const hash = await hashPassword(password)

            const user = await User.findOne({
                where: {
                    username: username
                }
            })

            if (user.passHash === hash) {
                //
                const token = makeToken(username)
                return res.set({
                    'authorization': 'Bearer ' + token
                }).sendStatus(200)
            } else {
                return res.sendStatus(401)
            }
        } catch (e) {
            console.error(e)
            return res.sendStatus(400)
        }
    }

    res.sendStatus(400)
}

async function me (req, res) {
    res.json(req.user);
}

module.exports = {
    register,
    login,
    me
}