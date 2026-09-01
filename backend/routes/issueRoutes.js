const express = require("express");
const {
  createIssue,
  getIssues,
  getIssueById,
  updateIssue,
  deleteIssue,
} = require("../controllers/issueController");
const { addComment, getCommentsForIssue } = require("../controllers/commentController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.route("/").post(protect, createIssue).get(protect, getIssues);

router
  .route("/:id")
  .get(protect, getIssueById)
  .put(protect, updateIssue)
  .delete(protect, deleteIssue);

// Nested comment routes
router
  .route("/:issueId/comments")
  .get(protect, getCommentsForIssue)
  .post(protect, addComment);

module.exports = router;
