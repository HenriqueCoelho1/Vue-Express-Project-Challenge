const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const userRoutes = require("./routes/user")
require('dotenv').config()
const app = express()

app.use(morgan("dev"))
app.use(cors())
app.use(express.json())


app.use("/api", userRoutes)



const PORT = process.env.PORT || 5000


app.listen(PORT, () => {
    console.log(`THIS SERVER IS RUNNING IN THE PORT ${PORT}`)
})