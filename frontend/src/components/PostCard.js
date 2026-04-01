import API from "../api/axios";
import { useState } from "react";

export default function PostCard({ post, refresh }) {
  const [comment, setComment] = useState("");
  const user = JSON.parse(localStorage.getItem("user"));

  // Like/unlike post
  const like = async () => {
    await API.put(
      `/posts/${post._id}/like`,
      { username: user.name },
      { headers: { Authorization: localStorage.getItem("token") } }
    );
    refresh();
  };

  // Add comment
  const addComment = async () => {
    if (!comment) return;

    await API.post(
      `/posts/${post._id}/comment`,
      { text: comment, username: user.name },
      { headers: { Authorization: localStorage.getItem("token") } }
    );

    setComment("");
    refresh();
  };

  return (
    <div className="card">

      <div className="card-header">
        <div className="user">
          <div className="avatar">
            {post.username[0].toUpperCase()}
          </div>

          <div>
            <b>{post.username}</b><br />
            <small>{new Date(post.createdAt).toLocaleString()}</small>
          </div>
        </div>

        <button className="follow-btn">Follow</button>
      </div>

      <p>{post.text}</p>

      {post.image && (
        <img
          src={`http://localhost:5000/${post.image}`}
          alt="post"
          className="post-img"
        />
      )}

      <div className="actions">
        <span onClick={like}>❤️ {post.likes.length}</span>
        <span>💬 {post.comments.length}</span>
      </div>

      {/* Comments */}
      {post.comments.map((c, i) => (
        <p key={i}>
          <b>{c.username}</b>: {c.text}
        </p>
      ))}

      {/* Add comment */}
      <input
        className="comment-input"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Add comment"
      />

      <button onClick={addComment}>Send</button>

    </div>
  );
}