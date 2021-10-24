const jwt = require("jsonwebtoken")

const authentication = (req, res, next) => {
    const authHeader = req.headers["authorization"]
    const token = authHeader && authHeader.split(' ')[1]

    if (token == null) return res.status(401).json({ error: "NULL TOKEN" })
    jwt.verify(token, process.env.SECRET_KEY, (error, user) => {
        if (error) return res.status(403).json({ error: error.messages })
        req.user = user
        next()
    })
}

module.exports = authentication