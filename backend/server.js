const express = require('express');
const app = express();
// const path = require('path');
const port = 8080;
var bodyParser = require('body-parser')
const postRoutes = require('./src/routes/postRoutes')
const userRoutes = require('./src/routes/userRoutes')

const cookieParser = require('cookie-parser')
const dotenv = require('dotenv');
const cors = require("cors");
const { default: verifyUser } = require('./src/utils/verifyUser');

dotenv.config();

// middlewares
app.use(cors());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// cookie parer

console.log("database", process.env.DATABASE_URL)
// console.log("tokne", process.env.JWT_SECRET)

app.use(cookieParser())

// parse application/json
app.use(bodyParser.json())

app.use('/posts', postRoutes)

app.use('/user', userRoutes)

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});


