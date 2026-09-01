const User = require("../models/User");

// @desc    Get all users (for assigning issues)
// @route   GET /api/users
// @access  Private
const getUsers = async (req, res, next) => {
  try {
    const users = await User.find().select("name email role");
    res.json(users);
  } catch (error) {
    next(error);
  }
};

module.exports = { getUsers };
