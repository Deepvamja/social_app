const Post = require("../models/Post");

// Create Post
exports.createPost = async (req, res) => {
  try {
    const post = await Post.create({
      userId: req.user.id,
      username: req.body.username,
      text: req.body.text,
      image: req.file?.path
    });

    res.json(post);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

// Get Feed
exports.getPosts = async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

// Like / Unlike
exports.likePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (post.likes.includes(req.user.id)) {
      post.likes.pull(req.user.id);
    } else {
      post.likes.push(req.user.id);
    }

    await post.save();
    res.json(post);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

// Comment
exports.addComment = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    post.comments.push({
      userId: req.user.id,
      username: req.body.username,
      text: req.body.text
    });

    await post.save();
    res.json(post);
  } catch (err) {
    res.status(500).json(err.message);
  }
};