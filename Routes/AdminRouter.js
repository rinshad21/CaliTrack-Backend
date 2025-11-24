const express = require("express");

const { adminLogin } = require("../controllers/AdminController");
const { adminValidation } = require("../middlewares/AdminAuth");
const router = express.Router();

router.post("/login", adminValidation, adminLogin);

module.exports = router;
