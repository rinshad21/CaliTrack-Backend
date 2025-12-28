const express = require("express");
const cloudinary = require("cloudinary").v2;
const multer = require("multer");
const router = express.Router();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post("/upload", upload.single("my_file"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const b64 = Buffer.from(req.file.buffer).toString("base64");
    let dataURI = "data:" + req.file.mimetype + ";base64," + b64;
    const result = await cloudinary.uploader.upload(dataURI);

    // Return secure_url
    res.status(200).json({
      success: true,
      message: "Image uploaded successfully",
      photo_url: result.secure_url, 
      photoPublicId: result.public_id,
      ...result, 
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

router.get("/image/:publicId", (req, res) => {
  const imageUrl = cloudinary.url(req.params.publicId);
  res.json({ url: imageUrl });
});

module.exports = router;
