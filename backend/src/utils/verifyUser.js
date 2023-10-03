const verifyUser = async (res, req) => {
    console.log("reqest", req.cookie);
    const token = req.cookie;
    try {
        const decode = await jwt.verify(token, process.env.JWT_SECRET)
        if (decode) {
            next()
        }
        else {
            res.json({
                data: "user is not authorized",
                message: "unsuccessfull"
            })
        }
    } catch (error) {
        res.json({
            error: error.message
        })
    }
}
module.exports = { verifyUser }