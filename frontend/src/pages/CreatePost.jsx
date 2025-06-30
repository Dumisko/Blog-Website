import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";

export default function CreatePost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!token) return alert("Login required");

    try {
      const res = await api.post(
        "/posts",
        { title, content, imageUrl },
        {
          headers: { Authorization: token },
        }
      );
      navigate(`/post/${res.data._id}`);
    } catch (err) {
      alert("Post creation failed");
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Create New Blog Post</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.formGroup}>
          <label style={styles.label}>Title</label>
          <input
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={styles.input}
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Image URL (optional)</label>
          <input
            type="text"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            style={styles.input}
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Content (Markdown supported)</label>
          <textarea
            rows="10"
            required
            value={content}
            onChange={(e) => setContent(e.target.value)}
            style={styles.textarea}
          />
        </div>
        <button type="submit" style={styles.button}>
          Publish
        </button>
      </form>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "700px",
    margin: "2rem auto",
    backgroundColor: "#f9fafb",
    border: "1px solid #ddd",
    borderRadius: "8px",
    padding: "2rem",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  },
  heading: {
    textAlign: "center",
    marginBottom: "1.5rem",
    color: "#1f2937",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  formGroup: {
    marginBottom: "1rem",
  },
  label: {
    fontWeight: "bold",
    marginBottom: "0.3rem",
    display: "block",
    color: "#374151",
  },
  input: {
    width: "100%",
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "4px",
  },
  textarea: {
    width: "100%",
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    fontFamily: "inherit",
  },
  button: {
    backgroundColor: "#2563eb", // blue
    color: "#fff",
    border: "none",
    padding: "12px 20px",
    borderRadius: "4px",
    cursor: "pointer",
    fontWeight: "bold",
  },
};
