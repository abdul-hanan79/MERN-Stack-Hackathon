// const getJwtToken = require('../helper/getJwtToken')


// const cookieToken = (user, res) => {
/*

cont decode=await jwt.verify(token,process.env.JWT_SECRET)
*/
//     const token = getJwtToken(user.id)
//     const options =
// }

const verifyUser = async (res, req) => {
    console.log("reqest", req.cookies);
    const token = req.cookies.jwtToken;
    try {
        const decode = await jwt.verify(token, process.env.JWT_SECRET)
        if (decode) {
            next()
        }
        else {
            res.json({
                data: "error"
            })
        }
    } catch (error) {
        res.json({
            error: error.message
        })
    }
}
export default verifyUser