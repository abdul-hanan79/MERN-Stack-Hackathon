const express = require('express');
const app = express();
// const path = require('path');
const port = 8080;
var bodyParser = require('body-parser')
const productRoutes = require('./src/routes/productRoutes')
const userRoutes = require('./src/routes/userRoutes')
const ratingsRoutes = require('./src/routes/ratingRoutes')
const cartItemsRoutes = require('./src/routes/cartItemsRoutes')
const orderRoutes = require('./src/routes/orderRoutes')
const jwt = require("jsonwebtoken")
const cookieParser = require('cookie-parser')
const dotenv = require('dotenv');
const cors = require("cors");
const fileUpload = require('express-fileupload');
const { verifyUser } = require('./src/utils/verifyUser');
// const { default: verifyUser } = require('./src/utils/verifyUser');

dotenv.config();

// middlewares
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
}));
app.use(fileUpload({
    useTempFiles: true
}))
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// cookie parer

console.log("database", process.env.DATABASE_URL)
// console.log("tokne", process.env.JWT_SECRET)

app.use(cookieParser())

// parse application/json
app.use(bodyParser.json())

app.use('/products', productRoutes)
app.use('/user', userRoutes)
app.use('/ratings', ratingsRoutes)
app.use('/cartItem', cartItemsRoutes)
app.use('/order', orderRoutes)

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});


