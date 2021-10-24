const express = require("express")
const router = express.Router()
const pool = require("../db")
const bcrypt = require("bcrypt")
const { check, validationResult } = require("express-validator")

router.post("/user", [
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
        const hashedPassword = await bcrypt.hash(password, 10)

        const createUser = await pool.query("INSERT INTO users (username, email, password) VALUES ($1, $2, $3)",
            [username, email, hashedPassword])
        res.json(createUser.rows[0])

    } catch (err) {
        console.log("CREATE USER ERROR ->", err)

    }

})

module.exports = router