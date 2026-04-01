const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  username: String,
  text: String,
  image: String,

  likes: [
    {
      userId: mongoose.Schema.Types.ObjectId,
      username: String
    }
  ],

  comments: [
    {
      userId: mongoose.Schema.Types.ObjectId,
      username: String,
      text: String
    }
  ]

}, { timestamps: true });

module.exports = mongoose.model("Post", postSchema);