// import { v2 as cloudinary } from 'cloudinary';
const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: 'dgzlbh9uw',
    api_key: '727815111467615',
    api_secret: 'OlbQrC3Q5qGVOZy5YPEp7S0vnEw'
});

const UploadImage = async (url) => {
    console.log("image url ", url);
    // return await cloudinary.uploader.upload(url, {
    //     folder: "car-rental-mobile"
    // });
    return await cloudinary.uploader.upload(url, {
        folder: "finalHackathon"
    }, (err, result) => {
        console.log("result", result)
        console.log("error in", err)
    });
};

module.exports = { UploadImage };