const jwt = require('jsonwebtoken');
const verifyUser = async (req, res, next) => {
    try {
        // console.log("reqest", req.cookies);
        // const token = req.cookies.Cookie;

        const token = req.headers.authorization;
        console.log("token is ", token);
        console.log("secret key", process.env.JWT_SECRET);
        const decode = jwt.verify(token, process.env.JWT_SECRET)
        console.log("decode", decode);
        if (decode) {
            if (req?.query?.value?.fetchCurrentUser) {
                req.userId = decode.userId;
            }
            next()
        }
        else {
            res.json({
                data: "user is not authorized",
                message: "unsuccessfull"
            })
        }
    } catch (error) {
        console.log("error in verify user", error.message);
        res.json({
            error: error.message,
            message: 'unsuccessfull'
        })
    }
}
module.exports = { verifyUser }