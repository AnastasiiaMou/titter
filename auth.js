const jwt = require('jsonwebtoken')
const crypto = require('crypto')

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

module.exports = {
    makeToken,
    verifyToken,
    hashPassword
}