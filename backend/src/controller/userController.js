const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
require('dotenv').config();



// signup
const doSignup = async (req, res) => {
    try {
        await prisma.$connect();
        console.log("singupUser", req.body)
        const salt = await bcrypt.genSalt(10)
        const passwordHash = await bcrypt.hash(req.body.user.password, salt)
        const newUser = await prisma.User.create({
            data: {
                email: req.body.user.email,
                password: passwordHash,
                name: req.body.user.name
            }
        })
        // console.log("signup is running", req.body)
        console.log("signup user ", newUser)
        res.json({
            email: newUser.email,
            name: newUser.name,
            message: "success"
        })
    } catch (error) {
        console.log(error)
        res.json({
            error: error,
            message: 'unsuccessful'
        })

    }
    finally {
        await prisma.$disconnect();
    }

}
const doLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log("login data", req.body)
        // Find user by email
        const user = await prisma.user.findUnique({
            where: {
                email: email,
            },
        });
        console.log("user in login ", user)
        if (!user) {
            return res.status(404).json({ error: 'User not found', message: 'user not found' });
        }
        // Compare password
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(401).json({ error: 'Invalid password', message: 'invalid password' });
        }
        // Generate token
        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
            expiresIn: '5 days',
        });
        console.log("token=>", token);
        // this send cookies to client
        res.cookie("jwtoken", token, {
            // expires: new Date(Date.now() + 50000), // Optionally set cookie expiration
            httpOnly: true, // Make the cookie accessible only via HTTP (not JavaScript)
            secure: false, // Allow cookies
        });
        console.log("verify cookies", res.getHeaders());
        // res.setHeader('Set-Cookie', `jwt=${token}; HttpOnly; Path=/; Expires=${new Date(Date.now() + 5 * 24 * 60 * 60 * 1000)}; SameSite=Strict`);
        // console.log("res.cookies.jwt",res.cookie.jwt);
        return res.status(200).json(
            {
                message: 'Login successful',
                id: user.id,
                token: token,
                name: user.name,
                email: user.email
            }
        );
    }
    catch (error) {
        return res.json({
            error: error,
            message: 'login failed'
        })
    }
    // finally {
    // }
}
module.exports = { doSignup, doLogin }

// const usersCollection = require('../models/userModel')
// const bcrypt = require("bcrypt")
// const jwt=require("jsonwebtoken")
//  jwt toekn
// const doSignUp = async (req, res) => {
//     try {
//         console.log('req.body in signup', req.body)
//         const salt = await bcrypt.genSalt(10)
//         const passwordHash = await bcrypt.hash(req.body.password, salt)

//         console.log("passwordHash and salt", passwordHash, "  ", salt);

//         const user = new usersCollection({
//             email: req.body.email,
//             password: passwordHash,
//             firstName: req.body.firstName,
//             lastName: req.body.lastName,
//         })
//         const result = await user.save()
//         console.log("result in signup", result);

//         res.status(200).json({
//             message: "user is added",
//             data: {
//                 email: req.body.email,
//                 firstName: req.body.firstName,
//                 lastName: req.body.lastName,
//             }
//         })
//     } catch (error) {
//         res.status(500).json({
//             message: "operaion failed",
//             data: [],
//             error: error
//         })
//     }
// }
// const doLogin = async (req, res) => {
//     // res.send("ok")
//     try {
//         console.log("req.body in login", req.body);
//         const userData = await usersCollection.findOne({ email: req.body.email })
//         console.log('====================================');
//         console.log(req.body, userData);
//         console.log('====================================');
//         if (!userData || !userData?.password) {
//             res.status(500).json({
//                 message: "user is not found",
//                 data: []
//             })
//         }
//         const passwordDecode = await bcrypt.compare(req.body.password, userData.password)
//         console.log("passwordDecode", passwordDecode)

//         if (!passwordDecode) {
//             res.status(500).json({
//                 message: "wrong password",
//                 data: []
//             })
//         }
//         const token = await jwt.sign({ email: userData.email, firstName: userData.firstName, lastName: userData.lastName }, process.env.secretkey)

//         console.log("token", token)
//         res.status(200).json({
//             message: "successfully logined",
//             data: {
//                 email: req.body.email,
//                 firstName: userData.firstName,
//                 lastName: userData.lastName,
//                 token
//             }
//         })
//     } catch (error) {
//         console.log("error in login",error)
//         res.status(500).json({
//             message: 'failed',
//             error: error,
//             data: []
//         })
//     }
// }

// module.exports = { doLogin, doSignUp }
