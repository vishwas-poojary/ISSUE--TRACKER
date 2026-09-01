const Issue = require("../models/Issue");

// @desc    Get dashboard statistics (counts by status, assigned to me, etc.)
// @route   GET /api/dashboard
// @access  Private
const getDashboardStats = async (req, res, next) => {
  try {
    const totalIssues = await Issue.countDocuments();
    const openCount = await Issue.countDocuments({ status: "Open" });
    const inProgressCount = await Issue.countDocuments({ status: "In Progress" });
    const closedCount = await Issue.countDocuments({ status: "Closed" });
    const assignedToMe = await Issue.countDocuments({ assignedTo: req.user._id });
    const createdByMe = await Issue.countDocuments({ createdBy: req.user._id });

    res.json({
      totalIssues,
      openCount,
      inProgressCount,
      closedCount,
      assignedToMe,
      createdByMe,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getDashboardStats };
