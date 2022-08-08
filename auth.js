const jwt = require('jsonwebtoken')
const crypto = require('crypto')

const User = require('./models/user.model')

function makeToken(username) {
    const token = jwt.sign(username, 'secret12345');
    return token;
}

function verifyToken(token) {
    try {
        return jwt.verify(token, 'secret12345')
    } catch (e) {
        return null
    }
}

function hashPassword (password) {
    return new Promise((res, rej) => {
        crypto.pbkdf2(password, 'salt12345', 100000, 64, 'sha512', (err, key) => {
            if (err) {
                console.error(err)
                rej(err)
            }
            res(key.toString('hex'))
        })
    })
}

async function authMiddleware (req, res, next) {
    const auth = req.headers['authorization']

    if (auth) {
        const token = auth.split(' ')[1]
        const username = verifyToken(token);
        if (username) {
            try {
                const user = await User.findOne({
                    where: {
                        username: username
                    }
                })

                req.user = user;
                return next()
            } catch (e) {
                console.error(e)
                return res.sendStatus(400)
            }
        } else {
            console.log(token, auth)
            return res.sendStatus(401)
        }
    }

    return res.sendStatus(401)
}

module.exports = {
    makeToken,
    verifyToken,
    hashPassword,
    authMiddleware
}