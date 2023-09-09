const express = require("express");
const router = express.Router();

const {
  createPost,
  getAllPosts,
  updatePost,
  deletePost,
  getPostById,
  likeDislike,
} = require("../controllers/post.controller");
const { isAuthenticated, isAdmin } = require("../middleware/auth");
const upload = require("../multer");

//register
router
  .route("/create")
  .post(isAuthenticated, isAdmin, upload.single("image"), createPost);
router.route("/getposts").get(getAllPosts);
router.route("/:id").get(isAuthenticated, getPostById);
router.route("/update/:id").patch(isAuthenticated, isAdmin, updatePost);
router.route("/:id").delete(isAuthenticated, isAdmin, deletePost);
router.route("/like/:id").put(isAuthenticated, likeDislike);

module.exports = router;
