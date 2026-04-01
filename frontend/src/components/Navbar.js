import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const nav = useNavigate();

  const logout = () => {
    localStorage.clear();
    nav("/");
  };

  return (
    <div className="navbar">
      <span style={{ fontSize: "18px", fontWeight: "bold" }}>
        Social Feed
      </span>

      <button
        onClick={logout}
        style={{
          background: "white",
          border: "none",
          padding: "6px 10px",
          borderRadius: "6px",
          cursor: "pointer"
        }}
      >
        Logout
      </button>
    </div>
  );
}