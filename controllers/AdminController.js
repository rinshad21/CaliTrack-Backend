require("dotenv").config();
const User = require("../Models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const Jwt_key = process.env.JWT_SECRET_KEY;

const adminLogin = async (req, res) => {
  try {
    const { username, password } = req.body;

    const admin = await User.findOne({ username, role: "admin" });
    if (!admin) {
      return res.status(404).json({
        success: false,
        message: "Admin not found!",
      });
    }

    const isPasswordMatch = admin.password.startsWith("$2")
      ? await bcrypt.compare(password, admin.password) // hashed
      : admin.password === password;

    if (!isPasswordMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid password!",
      });
    }

    const token = jwt.sign(
      { id: admin._id, username: admin.username, role: admin.role },
      Jwt_key,
      { expiresIn: "1h" }
    );

    return res.status(200).json({
      success: true,
      message: "Admin authenticated successfully",
      token,
      user: {
        username: admin.username,
        role: admin.role,
      },
    });
  } catch (error) {
    console.error("Failed to login as admin:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to login as admin",
    });
  }
};

module.exports = { adminLogin };
