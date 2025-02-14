const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const { JWT_SECRET } = require("../utils/config");

const SALT_ROUNDS = 10;

const authController = {
  // Sign up
  signup: async (req, res) => {
    try {
      const { name, email, password } = req.body;

      // Check if all fields are provided
      if (!name || !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
      }

      // Check if the user already exists
      const user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({ message: "User already exists" });
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
      const newUser = new User({
        name,
        email,
        password: hashedPassword,
      });

      // Save the new user to the database
      await newUser.save();
      res.status(201).json({ message: "User created successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  // Login
  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      // Find the user by email
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: "User does not exist" });
      }

      // Compare the provided password with the stored hashed password
      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) {
        return res.status(400).json({ message: "Password is incorrect" });
      }

      // Generate a JWT token
      const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "1h" });
      res.status(200).json({
        message: "Login successful",
        token,
        user: {
          name: user.name,
          email: user.email,
        },
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Logout
  logout: (req, res) => {
    res.clearCookie("token");
    return res.status(200).json({ message: "Logged out successfully" });
  },

  // Reset Password
  resetPassword: async (req, res) => {
    try {
      const { email } = req.body;

      // Find the user by email
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: "User does not exist" });
      }

      // Generate a reset password token
      const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "1h" });
      user.resetPasswordToken = token;
      user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
      await user.save();

      // Configure the email transporter
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.USER_EMAIL,
          pass: process.env.APP_PASSWORD,
        },
      });

      // Define the email options
      const mailOptions = {
        from: process.env.USER_EMAIL,
        to: email,
        subject: "Password Reset Request",
        text: `Here is your password reset link: ${process.env.FRONTEND_URL}/resetpassword/${token}`,
      };

      // Send the email
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log("Error sending email:", error);
          return res
            .status(500)
            .json({ message: "Failed to send reset email" });
        } else {
          console.log("Email sent: " + info.response);
          res
            .status(200)
            .json({ message: "Password reset link sent to your email" });
        }
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Reset Password Form
  resetPasswordform: async (req, res) => {
    try {
      const { token } = req.params;
      const { password } = req.body;

      // Verify the token
      const decoded = jwt.verify(token, JWT_SECRET);
      const userId = decoded.id;

      // Find the user by ID
      const user = await User.findById(userId);
      if (!user) {
        return res.status(400).json({ message: "Invalid or expired token" });
      }

      // Hash the new password
      const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
      user.password = hashedPassword;
      user.resetPasswordToken = null;
      user.resetPasswordExpires = null;
      await user.save();

      res.status(200).json({ message: "Password reset successful" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Get User Profile
  myProfile: async (req, res) => {
    try {
      const userId = req.userId;

      // Find the user by ID and exclude the password field
      const user = await User.findById(userId).select("-password");
      res.status(200).json({ user });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};

module.exports = authController;