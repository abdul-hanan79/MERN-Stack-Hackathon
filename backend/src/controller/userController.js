const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
require('dotenv').config();

const doSignup = async (req, res) => {
    try {
        console.log("singupUser", req.body)
        const salt = await bcrypt.genSalt(10)
        const passwordHash = await bcrypt.hash(req.body.user.password, salt)
        const user = await prisma.user.findUnique({
            where: {
                email: req.body.user.email,
            },
        });
        if (user) {
            return res.json({ error: 'user already exist', message: 'unsuccessfull' });
        }
        const newUser = await prisma.User.create({
            data: {
                email: req.body.user.email,
                password: passwordHash,
                name: req.body.user.name
            }
        })
        console.log("signup user ", newUser)
        const newCart = await prisma.Cart.create({
            data: {
                userId: newUser.id
            }
        })
        console.log("newCart", newCart);
        const response = {
            email: newUser.email,
            name: newUser.name,
            message: "successfull"
        };
        res.json(response)
    } catch (error) {
        console.log(error)
        const response = {
            error,
            message: 'unsuccessfull'
        }
        res.json(response)
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
            include: {
                Cart: {
                    select: {
                        id: true
                    }
                }
            }
        });
        console.log("user in login ", user)
        if (!user) {
            return res.json({ error: 'User not found', message: 'unsuccessfull' });
        }
        // Compare password
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.json({ error: 'Invalid password', message: 'unsuccessfull' });
        }
        // Generate token
        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
            expiresIn: '5 days',
        });
        console.log("token=>", token);
        const response = {
            message: 'successfull',
            id: user.id,
            token: token,
            name: user.name,
            email: user.email,
            cartId: user.Cart[0].id,
            role: user.role
        }
        // res.cookie('myCookie', 'cookieValue', { maxAge: 900000, httpOnly: true });
        // res.cookie("jwtToken", token, {
        //     expires: new Date(Date.now() + 2589200000),
        //     httpOnly: true
        // })
        return res.status(200).json(response);
    }
    catch (error) {
        console.log("error", error.message);
        const response = {
            error,
            message: 'unsuccessfull'
        }
        return res.json(response)
    }
    finally {
        await prisma.$disconnect()
    }
}
const doFetchCurrentUser = async (req, res) => {
    try {
        const userId = req.userId
        console.log("user id",userId);
        console.log("user id", userId);
        const user = await prisma.user.findUnique({
            where: {
                id: userId,
            },
            include: {
                Cart: {
                    select: {
                        id: true
                    }
                }
            }
        });
        console.log("user in login ", user)
        const response = {
            message: 'successfull',
            id: user.id,
            name: user.name,
            email: user.email,
            cartId: user.Cart[0].id,
            role: user.role
        }
        return res.status(200).json(response);
    } catch (error) {
        console.log("error in fetching current user", error.message);
        const response = {
            error,
            message: 'unsuccessfull'
        }
    }
    finally {
        await prisma.$disconnect()
    }
}
module.exports = { doSignup, doLogin ,doFetchCurrentUser}