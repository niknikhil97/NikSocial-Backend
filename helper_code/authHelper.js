const jwt = require('jsonwebtoken')


module.exports.createJWT = (password, jwtSecret) => {
    return jwt.sign(jwtSecret, password)
}