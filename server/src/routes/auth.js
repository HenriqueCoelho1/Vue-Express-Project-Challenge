const express = require("express")
const router = express.Router()
const bcrypt = require("bcrypt")
const { check, validationResult } = require("express-validator")
const pool = require("../db")
const { jwtTokens } = require("../utils/jwtHelpers")

router.post("/register", [
    check("username").isString().isLength({ min: 2, max: 200 }).trim(),
    check("email").isEmail().isLength({ min: 2, max: 200 }).trim(),
    check("password").isLength({ min: 6, max: 50 }).trim()
], async (req, res) => {

    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() })
        }

        const { username, email, password } = req.body
        const exist = await pool.query("SELECT * FROM users WHERE username = $1 OR email = $2",
            [username, email])
        if (exist.rows.length !== 0) return res.status(401).json({ error: "Error this username or email already exist" })

        const hashedPassword = await bcrypt.hash(password, 10)

        const createUser = await pool.query("INSERT INTO users (username, email, password) VALUES ($1, $2, $3)",
            [username, email, hashedPassword])
        res.json(createUser.rows[0])

    } catch (err) {
        console.log("CREATE USER ERROR ->", err)

    }
})


router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body
        const users = await pool.query("SELECT * FROM users WHERE email = $1", [email])
        if (users.rows.length === 0) return res.status(401).json({ error: "Error in the credentials" })
            (async () => {
                const validPassword = await bcrypt.compare(password, users.rows[0].password)
                if (!validPassword) {
                    return res.status(401).json({ error: "Error in the credentials" })
                }
            })

        const user = await pool.query("SELECT id, username, email FROM users WHERE email = $1", [email])
        const actualUser = user.rows[0]
        let tokens = jwtTokens(users.rows[0])
        res.send({
            actualUser,
            tokens
        })

    } catch (err) {
        console.log(err)

    }
})

module.exports = router