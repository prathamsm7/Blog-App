const Post = require("../models/Post");
const upload = require("../multer");

exports.createPost = async (req, res) => {
  try {
    const { text, title } = req.body;

    if (!req.file.path) {
      return res.status(400).json({ message: "Image Not Found" });
    }

    const newPost = await Post.create({
      title: title,
      text: text,
      image: req.file.path,
      postedBy: req.user.id,
    });
    return res.send(newPost);
  } catch (error) {
    return res.send(error.message);
  }
};

exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find().sort();

    return res.send(posts);
  } catch (error) {
    return res.send(error.message);
  }
};

exports.updatePost = async (req, res) => {
  try {
    const { text, title } = req.body;
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(401).send({ message: "Post Not FOund" });
    }

    text ? (post.text = text) : null;
    title ? (post.title = title) : null;

    await post.save();

    return res.send(post);
  } catch (error) {
    return res.send(error.message);
  }
};

exports.deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(401).send({ message: "Post Not Found" });
    }

    await Post.findByIdAndDelete(id);

    return res.send({ message: "Post Deleted Successfully" });
  } catch (error) {
    return res.send(error.message);
  }
};

exports.getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
      .populate("postedBy", "_id name email username")
      .populate("likes");

    if (!post) {
      return res.status(404).send({ message: "Post not found" });
    }

    return res.send(post);
  } catch (error) {
    return res.send(error.message);
  }
};

//Likes/Dislikes post
exports.likeDislike = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).send({ message: "Post Not Found" });
    }

    if (post.likes.includes(req.user.id)) {
      const userIndex = post.likes.indexOf(req.user.id);

      post.likes.splice(userIndex, 1);
      // await post.save();

      // return res.send(post);
    } else {
      post.likes.push(req.user.id);
    }

    await post.save();

    return res.send(post);
  } catch (error) {
    return res.send(error.message);
  }
};
