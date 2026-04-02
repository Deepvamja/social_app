import { useState } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";
import "../styles/main.css";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const nav = useNavigate();

  const signup = async () => {
    if (!name || !email || !password) {
      return alert("All fields required");
    }

    try {
      await API.post("/api/auth/signup", {
        name,
        email,
        password
      });

      alert("Signup successful");
      nav("/");
    } catch (err) {
      alert("Signup failed");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">

        <h2 className="auth-title">Create Account</h2>

        <input
          className="auth-input"
          placeholder="Name"
          onChange={(e) => setName(e.target.value)}
        />

        <input
          className="auth-input"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="auth-input"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="auth-btn" onClick={signup}>
          Signup
        </button>

        <p className="auth-link">
          Already have an account?{" "}
          <span
            onClick={() => nav("/")}
            style={{ color: "#1976d2", cursor: "pointer" }}
          >
            Login
          </span>
        </p>

      </div>
    </div>
  );
}
