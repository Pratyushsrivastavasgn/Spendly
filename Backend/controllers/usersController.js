const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../model/User");

const usersController = {
  register: asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      throw new Error("All fields are required");
    }
    const userExists = await User.findOne({ email });
    if (userExists) {
      throw new Error("User already exists");
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const userCreated = await User.create({
      email,
      username,
      password: hashedPassword,
    });
    res.json({
      username: userCreated.username,
      email: userCreated.email,
      id: userCreated._id,
    });
  }),

  login: asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new Error("Invalid login credentials");
    }
    const token = jwt.sign({ id: user._id }, "masynctechKey", { expiresIn: "30d" });
    res.json({
      message: "Login Success",
      token,
      id: user._id,
      email: user.email,
      username: user.username,
    });
  }),

  profile: asyncHandler(async (req, res) => {
    const user = await User.findById(req.user);
    if (!user) {
      throw new Error("User not found");
    }
    res.json({ username: user.username, email: user.email });
  }),

  changeUserPassword: asyncHandler(async (req, res) => {
    const { newPassword } = req.body;
    const user = await User.findById(req.user);
    if (!user) throw new Error("User not found");
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save({ validateBeforeSave: false });
    res.json({ message: "Password changed successfully" });
  }),

  updateUserProfile: asyncHandler(async (req, res) => {
    const { email, username } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      req.user,
      { email, username },
      { new: true }
    );
    res.json({ message: "User profile updated", updatedUser });
  }),
};

module.exports = usersController;
