const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
require('dotenv').config();



// signup
const doSignup = async (req, res) => {
    try {
        // await prisma.$connect();
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
        // res.cookie("jwtoken", token, {
        //     // expires: new Date(Date.now() + 50000), // Optionally set cookie expiration
        //     httpOnly: true, // Make the cookie accessible only via HTTP (not JavaScript)
        //     secure: false, // Allow cookies
        // });
        // res.cookie("token", token)
        // res.cookie('token', "hello", {
        //     maxAge: 3600000, // Cookie expires after 1 hour (in milliseconds)
        //     httpOnly: true, // Cookie is accessible only via HTTP (not JavaScript)
        //     secure: false, // Since it's local development, not over HTTPS
        //     sameSite: 'strict', // Controls when cookies are sent (strict, lax, none)
        //     path: '/', // Cookie is valid for all routes
        //     domain: 'localhost', // Cookie is valid for localhost
        // });

        // console.log("verify cookies", res.getHeaders());
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
    finally {
        await prisma.$disconnect()
    }
}
module.exports = { doSignup, doLogin }