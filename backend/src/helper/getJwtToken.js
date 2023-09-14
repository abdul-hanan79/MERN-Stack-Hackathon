const jwt = require('jsonwebtoken')
const getJwtToken = (id) => {
    return jwt.sign({ userId: id }, process.env.JWT_SECRET)
}
// const token = await jwt.sign({ email: userData.email, fullName: userData.fullName }, process.env.secretkey)
module.exports = getJwtToken;
