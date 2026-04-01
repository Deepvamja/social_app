import { useState } from "react";
import API from "../api/axios";

export default function CommentBox({ postId, refresh }){
  const [text, setText] = useState("");
  const user = JSON.parse(localStorage.getItem("user"));

  const submitComment = async () => {
    if (!text) return;

    await API.post(
      `/posts/${postId}/comment`,
      {
        text,
        username: user.name
      },
      {
        headers: {
          Authorization: localStorage.getItem("token")
        }
      }
    );

    setText("");
    refresh();
  };

  return (
    <div style={{ marginTop: "10px" }}>
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Write a comment..."
      />
      <button onClick={submitComment}>Send</button>
    </div>
  );
}