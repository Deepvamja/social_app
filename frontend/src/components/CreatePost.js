import { useState } from "react";
import API from "../api/axios";
import { PhotoCamera, EmojiEmotions, Campaign } from "@mui/icons-material";

export default function CreatePost({ refresh }) {
  const [text, setText] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));

  const handlePost = async () => {
    if (!text && !image) return;

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("text", text);
      if (image) formData.append("image", image);
      formData.append("username", user.name);

      await API.post("/api/posts", formData, {
        headers: { Authorization: localStorage.getItem("token") }
      });

      setText("");
      setImage(null);
      refresh();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-box">

      <div className="tabs">
        <div className="tab active">All Posts</div>
        <div className="tab">Promotions</div>
      </div>

      <input
        placeholder="What's on your mind?"
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="input-box"
      />

      <div className="icons-row">

        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>

          <label className="icon">
            <PhotoCamera />
            <input hidden type="file" onChange={(e) => setImage(e.target.files[0])} />
          </label>

          <EmojiEmotions className="icon" />
          <Campaign className="icon" />

        </div>

        <button
          onClick={handlePost}
          disabled={loading}
          className="post-btn"
        >
          {loading ? "Posting..." : "Post"}
        </button>

      </div>

    </div>
  );
}
