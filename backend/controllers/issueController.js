const Issue = require("../models/Issue");
const Comment = require("../models/Comment");

// @desc    Create a new issue
// @route   POST /api/issues
// @access  Private
const createIssue = async (req, res, next) => {
  try {
    const { title, description, priority, assignedTo } = req.body;

    if (!title || !description) {
      return res.status(400).json({ message: "Title and description are required" });
    }

    const issue = await Issue.create({
      title,
      description,
      priority,
      assignedTo: assignedTo || null,
      createdBy: req.user._id,
    });

    const populatedIssue = await issue.populate([
      { path: "createdBy", select: "name email" },
      { path: "assignedTo", select: "name email" },
    ]);

    res.status(201).json(populatedIssue);
  } catch (error) {
    next(error);
  }
};

// @desc    Get all issues (supports ?status=&assignedTo=&search=)
// @route   GET /api/issues
// @access  Private
const getIssues = async (req, res, next) => {
  try {
    const { status, assignedTo, search } = req.query;
    const filter = {};

    if (status) filter.status = status;
    if (assignedTo) filter.assignedTo = assignedTo;
    if (search) filter.title = { $regex: search, $options: "i" };

    const issues = await Issue.find(filter)
      .populate("createdBy", "name email")
      .populate("assignedTo", "name email")
      .sort({ createdAt: -1 });

    res.json(issues);
  } catch (error) {
    next(error);
  }
};

// @desc    Get a single issue by ID
// @route   GET /api/issues/:id
// @access  Private
const getIssueById = async (req, res, next) => {
  try {
    const issue = await Issue.findById(req.params.id)
      .populate("createdBy", "name email")
      .populate("assignedTo", "name email");

    if (!issue) {
      return res.status(404).json({ message: "Issue not found" });
    }

    res.json(issue);
  } catch (error) {
    next(error);
  }
};

// @desc    Update an issue (edit fields, change status, assign user)
// @route   PUT /api/issues/:id
// @access  Private
const updateIssue = async (req, res, next) => {
  try {
    const issue = await Issue.findById(req.params.id);

    if (!issue) {
      return res.status(404).json({ message: "Issue not found" });
    }

    const { title, description, status, priority, assignedTo } = req.body;

    issue.title = title ?? issue.title;
    issue.description = description ?? issue.description;
    issue.status = status ?? issue.status;
    issue.priority = priority ?? issue.priority;
    if (assignedTo !== undefined) issue.assignedTo = assignedTo || null;

    const updatedIssue = await issue.save();
    const populatedIssue = await updatedIssue.populate([
      { path: "createdBy", select: "name email" },
      { path: "assignedTo", select: "name email" },
    ]);

    res.json(populatedIssue);
  } catch (error) {
    next(error);
  }
};

// @desc    Delete an issue
// @route   DELETE /api/issues/:id
// @access  Private
const deleteIssue = async (req, res, next) => {
  try {
    const issue = await Issue.findById(req.params.id);

    if (!issue) {
      return res.status(404).json({ message: "Issue not found" });
    }

    await Comment.deleteMany({ issue: issue._id });
    await issue.deleteOne();

    res.json({ message: "Issue removed" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createIssue,
  getIssues,
  getIssueById,
  updateIssue,
  deleteIssue,
};
