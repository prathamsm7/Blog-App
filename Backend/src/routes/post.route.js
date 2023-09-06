const express = require("express");
const router = express.Router();

const {
  createPost,
  getAllPosts,
  updatePost,
  deletePost,
  getPostById,
} = require("../controllers/post.controller");
const { isAuthenticated, isAdmin } = require("../middleware/auth");

//register
router.route("/create").post(isAuthenticated, isAdmin, createPost);
router.route("/getposts").get(isAuthenticated, getAllPosts);
router.route("/:id").get(isAuthenticated, isAdmin, getPostById);
router.route("/update/:id").patch(isAuthenticated, isAdmin, updatePost);
router.route("/:id").delete(isAuthenticated, isAdmin, deletePost);

module.exports = router;
