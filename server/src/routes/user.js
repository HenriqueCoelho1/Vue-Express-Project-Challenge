const express = require("express")
const router = express.Router()
const pool = require("../db")
const jwt = require("jsonwebtoken")
const { check, validationResult } = require("express-validator")
const authentication = require("../middleware/auth")


router.get("/movies", [authentication], async (req, res) => {
    const getAllMovies = await pool.query("SELECT * FROM movies")
    if (getAllMovies.rows.length === 0) return res.json({ message: "No data found" })
    res.json(getAllMovies.rows)
})

router.post("/movie/create", authentication, [
    check("title").isString().isLength({ min: 2, max: 200 }).trim(),
    check("description").isLength({ min: 2 }).trim(),
    check("genre").isAlpha().isLength({ min: 2, max: 200 }).trim()
],
    async (req, res) => {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(422).json({ errors: errors.array() })
            }
            const { title, description, genre } = req.body
            const exist = await pool.query("SELECT * FROM movies WHERE title = $1", [title])
            if (exist.rows.length !== 0) return res.status(401).json({ error: "Error this movie is already exist" })

            const titleUpperCase = title.charAt(0).toUpperCase() + title.slice(1)
            const createMovie = await pool.query("INSERT INTO movies (title, description, genre) VALUES ($1, $2, $3) RETURNING *",
                [titleUpperCase, description, genre])
            res.status(200).json(createMovie.rows[0])

        } catch (err) {
            console.log("Error in creating this movie", err)

        }

    })

router.post("/user/:user_id/movie/:movie_id", authentication, async (req, res) => {

    try {
        // get the id from movies and user
        const { user_id, movie_id } = req.params
        const user_id_int = parseInt(user_id)
        const movie_id_int = parseInt(movie_id)
        //get the user by token and verify if is the same
        const authorization = req.headers.authorization.split(" ")[1]
        const decoded = jwt.verify(authorization, process.env.SECRET_KEY)
        const userTokenId = decoded.id
        if (userTokenId !== user_id_int) return res.status(401).send("Unauthorized")
        //verify if the movie is already exist
        const exist = await pool.query("SELECT * FROM users_movies WHERE users = $1 AND movies = $2",
            [user_id_int, movie_id_int])
        if (exist.rows.length !== 0) return res.status(401).json({ error: "This user already have this movie" })
        //add the movie to the user
        const addMovie = await pool.query("INSERT INTO users_movies (users, movies) VALUES ($1, $2) RETURNING *",
            [user_id_int, movie_id_int])

        res.status(200).json(addMovie.rows[0])

    } catch (err) {
        console.log("Error in creating this movie", err)
    }
})

router.get("/user/:user_id/movie", authentication, async (req, res) => {

    try {
        const { user_id } = req.params
        const authorization = req.headers.authorization.split(" ")[1]
        const decoded = jwt.verify(authorization, process.env.SECRET_KEY)
        const userTokenId = decoded.id
        const user_id_int = parseInt(user_id)
        if (userTokenId !== user_id_int) return res.status(401).send("Unauthorized")


        const allMovies = await pool.query("SELECT u.id, um.users, um.movies, m.title, m.id as movie_id FROM users u JOIN users_movies um ON u.id = um.users JOIN movies m ON m.id = um.movies WHERE u.id = $1",
            [user_id_int])

        res.status(200).json(allMovies.rows)

    } catch (err) {
        console.log("Error to get user movies", err)
    }
})

router.get("/user/:user_id/movie/:movie_id", authentication, async (req, res) => {

    try {
        const { user_id, movie_id } = req.params
        const authorization = req.headers.authorization.split(" ")[1]
        const decoded = jwt.verify(authorization, process.env.SECRET_KEY)
        const userTokenId = decoded.id
        const user_id_int = parseInt(user_id)
        const movie_id_int = parseInt(movie_id)
        if (userTokenId !== user_id_int) return res.status(401).send("Unauthorized")


        const movie = await pool.query("SELECT u.id, u.username, um.users, um.movies, m.title, m.id as movie_id FROM users u JOIN users_movies um ON u.id = um.users JOIN movies m ON m.id = um.movies WHERE u.id = $1 AND m.id = $2",
            [user_id_int, movie_id_int])


        res.status(200).json(movie.rows[0])

    } catch (err) {
        console.log("Error to get user movies", err)
    }
})


router.put("/movie/update/:movie_id", [
    check("title").isString().isLength({ min: 2, max: 200 }).trim(),
    check("description").isLength({ min: 2 }).trim(),
    check("genre").isAlpha().isLength({ min: 2, max: 200 }).trim()
], authentication, async (req, res) => {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() })
        }
        const { movie_id } = req.params
        const { title, description, genre } = req.body
        const movie_id_int = parseInt(movie_id)
        const exist = await pool.query("SELECT * FROM movies WHERE title = $1 AND id != $2", [title, movie_id_int])
        if (exist.rows.length !== 0) return res.status(401).json({ error: "Error this title movie is already exist" })

        const titleUppercase = title.charAt(0).toUpperCase() + title.slice(1)
        const updateMovie = await pool.query("UPDATE movies SET title = $1, description = $2, genre = $3 WHERE id = $4",
            [titleUppercase, description, genre, movie_id_int])

        res.status(200).json({
            message: "This movie was update with success"
        })

    } catch (err) {
        console.log("Error to get user movies", err)
    }
})

router.delete("/movie/delete/:movie_id", authentication, async (req, res) => {
    const { movie_id } = req.params
    const movie_id_int = parseInt(movie_id)

    const exist = await pool.query("SELECT * FROM movies WHERE id = $1", [movie_id_int])

    if (exist.rows.length === 0) return res.status(404).json({ error: "This movie not exist" })

    const deleteMovie = await pool.query("DELETE FROM movies WHERE id = $1", [movie_id_int])

    res.status(200).json({
        message: "This movie was delete with success"
    })
})

// router.post("/user/logout", authentication, async (req, res) => {
//     req.session.destroy()
// })

module.exports = router