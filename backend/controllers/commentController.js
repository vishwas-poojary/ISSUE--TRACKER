const Comment = require("../models/Comment");
const Issue = require("../models/Issue");

// @desc    Add a comment to an issue
// @route   POST /api/issues/:issueId/comments
// @access  Private
const addComment = async (req, res, next) => {
  try {
    const { text } = req.body;
    const { issueId } = req.params;

    if (!text) {
      return res.status(400).json({ message: "Comment text is required" });
    }

    const issue = await Issue.findById(issueId);
    if (!issue) {
      return res.status(404).json({ message: "Issue not found" });
    }

    const comment = await Comment.create({
      issue: issueId,
      user: req.user._id,
      text,
    });

    const populatedComment = await comment.populate("user", "name email");

    res.status(201).json(populatedComment);
  } catch (error) {
    next(error);
  }
};

// @desc    Get all comments for an issue
// @route   GET /api/issues/:issueId/comments
// @access  Private
const getCommentsForIssue = async (req, res, next) => {
  try {
    const comments = await Comment.find({ issue: req.params.issueId })
      .populate("user", "name email")
      .sort({ createdAt: 1 });

    res.json(comments);
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a comment
// @route   DELETE /api/comments/:id
// @access  Private
const deleteComment = async (req, res, next) => {
  try {
    const comment = await Comment.findById(req.params.id);

    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    if (comment.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized to delete this comment" });
    }

    await comment.deleteOne();
    res.json({ message: "Comment removed" });
  } catch (error) {
    next(error);
  }
};

module.exports = { addComment, getCommentsForIssue, deleteComment };
