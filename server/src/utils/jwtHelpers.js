const jwt = require("jsonwebtoken")

const jwtTokens = ({ id, email }) => {
    const user = { id, email }
    const accessToken = jwt.sign(user, process.env.SECRET_KEY, { expiresIn: "30d" })

    return ({ accessToken })
}

module.exports = { jwtTokens }
