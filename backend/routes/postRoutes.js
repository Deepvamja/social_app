const express = require("express");
const router = express.Router();
const multer = require("multer");
const jwt = require("jsonwebtoken");
const Post = require("../models/Post");

// Multer config for image upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) =>
    cb(null, Date.now() + "-" + file.originalname)
});
const upload = multer({ storage });

// Auth middleware
const auth = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) return res.status(401).json("No token");

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch {
    res.status(401).json("Invalid token");
  }
};

// Create post (text or image)
router.post("/", auth, upload.single("image"), async (req, res) => {
  try {
    const { text, username } = req.body;

    if (!text && !req.file)
      return res.status(400).json("Text or image required");

    const newPost = new Post({
      userId: req.user.id,
      username,
      text: text || "",
      image: req.file ? req.file.path : "",
      likes: [],
      comments: []
    });

    await newPost.save();
    res.json(newPost);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

// Get posts with pagination (5 per page)
router.get("/", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 5;
    const skip = (page - 1) * limit;

    const posts = await Post.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    res.json(posts);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

// Like / Unlike post
router.put("/:id/like", auth, async (req, res) => {
  const post = await Post.findById(req.params.id);

  const alreadyLiked = post.likes.find(
    (l) => l.userId.toString() === req.user.id
  );

  if (alreadyLiked) {
    post.likes = post.likes.filter(
      (l) => l.userId.toString() !== req.user.id
    );
  } else {
    post.likes.push({
      userId: req.user.id,
      username: req.body.username
    });
  }

  await post.save();
  res.json(post);
});

// Add comment
router.post("/:id/comment", auth, async (req, res) => {
  const post = await Post.findById(req.params.id);

  post.comments.push({
    userId: req.user.id,
    username: req.body.username,
    text: req.body.text
  });

  await post.save();
  res.json(post);
});

module.exports = router;