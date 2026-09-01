const express = require("express");
const { deleteComment } = require("../controllers/commentController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.route("/:id").delete(protect, deleteComment);

module.exports = router;
