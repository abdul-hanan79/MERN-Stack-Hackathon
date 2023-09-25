const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const doCreateRating = async (req, res) => {
    try {
        console.log("req.body", req.body);
        const userRating = {
            rating: req.body.rating,
            reviews: req.body.reviews,
            userId: req.body.userId,
            productId: req.body.productId,
        }
        const uploadRating = await prisma.Ratings.create({
            data: userRating,
        })
        console.log("upload rating", uploadRating);
        const response = {
            uploadRating,
            message: "successfull"
        }
        res.json(response)
    }
    catch (error) {
        const response = {
            error: error,
            message: "unsuccessful"
        }

        res.json(response)
    }
    finally {
        await prisma.$disconnect()
    }
}
const doUpdateRating = async (req, res) => {
    try {
        const ratingId = req.body.id
        const updateUserRating = {
            rating: req.body.rating,
            reviews: req.body.reviews,
        }
        const updatedRating = await prisma.Ratings.update({
            where: {
                id: ratingId,
            },
            data: updateUserRating
        })
        console.log("udpated user rating", updatedRating);
        const response = {
            updatedRating,
            message: "successfull"
        }
        res.json(response)
    }
    catch (error) {
        const response = {
            error,
            message: "unsuccessful"
        }
        res.json(response)
    }
    finally {
        await prisma.$disconnect()
    }
}
const doDeleteRating = async (req, res) => {
    try {
        const ratingId = req.query.id
        await prisma.Ratings.delete({
            where: {
                id: ratingId,
            }
        })
        const response = {
            message: "successfull"
        }
        res.json(response)
    }
    catch (error) {
        res.json({
            error: error,
            message: "unsuccessful"
        })
    }
    finally {
        await prisma.$disconnect()
    }
}
const doGetRatings = async (req, res) => {
    try {
        const allRatings = await prisma.Ratings.findMany();
        console.log("all rattings", allRatings);
        const response = {
            result: allRatings,
            message: "successfull"
        }
        res.json(response)
    }
    catch (error) {
        const response = {
            error,
            message: "unsuccessful"
        }
        res.json(response)
    }
    finally {
        await prisma.$disconnect()
    }
}
module.exports = {
    doGetRatings,
    doCreateRating,
    doDeleteRating,
    doUpdateRating
}