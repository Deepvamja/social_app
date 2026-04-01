import { useEffect, useState } from "react";
import API from "../api/axios";
import CreatePost from "../components/CreatePost";
import PostCard from "../components/PostCard";
import "../styles/main.css";

export default function Feed() {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  // Fetch posts with pagination
  const fetchPosts = async () => {
    try {
      setLoading(true);
      const res = await API.get(`/posts?page=${page}`);
      setPosts(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [page]);

  return (
    <div className="container">

      {/* Header */}
      <div className="header">
        <h2>Social Feed</h2>

        {/* Search */}
        <input
          className="search-bar"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Create post */}
      <CreatePost refresh={fetchPosts} />

      {/* Posts */}
      {loading ? (
        <p className="center-text">Loading...</p>
      ) : (
        posts
          .filter((p) =>
            p.username.toLowerCase().includes(search.toLowerCase()) ||
            (p.text && p.text.toLowerCase().includes(search.toLowerCase()))
          )
          .map((p) => (
            <PostCard key={p._id} post={p} refresh={fetchPosts} />
          ))
      )}

      {/* Pagination */}
      <div className="pagination">
        <button disabled={page === 1} onClick={() => setPage(page - 1)}>
          Prev
        </button>

        <span>Page {page}</span>

        <button onClick={() => setPage(page + 1)}>
          Next
        </button>
      </div>

    </div>
  );
}