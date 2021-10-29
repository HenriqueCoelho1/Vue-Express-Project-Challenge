const jwt = require("jsonwebtoken")

const jwtTokens = ({ id, username, email }) => {
    const user = { id, username, email }
    const accessToken = jwt.sign(user, process.env.SECRET_KEY, { expiresIn: "30d" })

    return ({ accessToken })
}

module.exports = { jwtTokens }
