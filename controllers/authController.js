require("dotenv").config();
const User = require("../Models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const Jwt_key = process.env.JWT_SECRET_KEY;

const signup = async (req, res) => {
  try {
    const { username, email, password, role, level } = req.body;
    //checq if username or email already exist in db
    const checkExistingUser = await User.findOne({
      $or: [{ username }, { email }],
    });

    if (checkExistingUser) {
      return res.status(400).json({
        success: false,
        message: "user already exist in database",
      });
    }
    //hash user password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    //save new user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      role,
      level,
    });
    await newUser.save();
    if (newUser) {
      return res.status(200).json({
        success: true,
        message: "user have been created successfully",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "some error occured",
    });
  }
};
//login controller
const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: " could not find the username.user dont exist",
      });
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(404).json({
        success: false,
        message: "invalid password",
      });
    }

    //create session using jwt token
    const accessToken = jwt.sign(
      {
        userId: user._id,
        username: user.username,
        role: user.role,
        level: user.level,
      },
      Jwt_key,
      {
        expiresIn: "1d",
      }
    );
    res.status(200).json({
      success: true,
      message: "logged in successfully",
      token: accessToken,
      email: user.email,
      name: user.username,
      level: user.level,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "some error occured",
    });
  }
};
module.exports = { signup, login };
