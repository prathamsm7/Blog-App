const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  folder: "blog-app",
  allowedFormats: ["jpg", "png", "webp"],
  transformation: [
    {
      crop: "limit",
    },
  ],
});
module.exports = multer({ storage: storage });
