import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import api from "../utils/api";

export default function PostDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [commentText, setCommentText] = useState("");
  const [refresh, setRefresh] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  const isAuthor = user && post && post.author._id === user.id;

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;
    try {
      await api.delete(`/posts/${id}`, {
        headers: { Authorization: token },
      });
      navigate("/");
    } catch (err) {
      alert("Failed to delete post");
    }
  };

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await api.get(`/posts/${id}`);
        setPost(res.data);
      } catch (err) {
        alert("Failed to load post");
      }
    };
    fetchPost();
  }, [id, refresh]);

  const handleLike = async () => {
    try {
      await api.post(`/posts/${id}/like`, {}, {
        headers: { Authorization: token },
      });
      setRefresh(!refresh);
    } catch (err) {
      alert("Failed to like post");
    }
  };

  const handleComment = async () => {
    try {
      await api.post(
        `/posts/${id}/comments`,
        { text: commentText },
        { headers: { Authorization: token } }
      );
      setCommentText("");
      setRefresh(!refresh);
    } catch (err) {
      alert("Failed to add comment");
    }
  };

  if (!post) return <div style={{ textAlign: "center", marginTop: "2rem" }}>Loading...</div>;

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>{post.title}</h2>
      <p style={styles.meta}>
        by <strong>{post.author.username}</strong> on{" "}
        {new Date(post.createdAt).toLocaleDateString()}
      </p>

      <div style={styles.content}>
        <ReactMarkdown>{post.content}</ReactMarkdown>
      </div>

      <button onClick={handleLike} style={styles.likeButton}>
        ❤️ Like ({post.likes.length})
      </button>

      {isAuthor && (
        <div style={styles.authorControls}>
          <Link to={`/edit/${post._id}`} style={styles.editLink}>
            ✏️ Edit
          </Link>
          <button onClick={handleDelete} style={styles.deleteButton}>
            🗑️ Delete
          </button>
        </div>
      )}

      {/* Comments */}
      <h3 style={styles.commentHeading}>Comments</h3>
      {post.comments.length === 0 ? (
        <p style={{ marginTop: "0.5rem" }}>No comments yet.</p>
      ) : (
        post.comments.map((c) => (
          <div key={c._id} style={styles.comment}>
            <strong>{c.user?.username || "Unknown"}</strong>: {c.text}
          </div>
        ))
      )}

      {/* Add comment */}
      {token && (
        <div style={styles.commentForm}>
          <textarea
            rows="3"
            placeholder="Write a comment..."
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            style={styles.textarea}
          />
          <button onClick={handleComment} style={styles.commentButton}>
            Add Comment
          </button>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "800px",
    margin: "2rem auto",
    backgroundColor: "#f9fafb",
    padding: "2rem",
    borderRadius: "8px",
    border: "1px solid #ddd",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  },
  title: {
    marginBottom: "0.5rem",
    color: "#1f2937",
  },
  meta: {
    fontSize: "0.9rem",
    color: "#4b5563",
    marginBottom: "1rem",
  },
  content: {
    border: "1px solid #ccc",
    backgroundColor: "#fff",
    padding: "1rem",
    borderRadius: "4px",
    marginBottom: "1rem",
  },
  likeButton: {
    backgroundColor: "#ef4444",
    color: "#fff",
    border: "none",
    padding: "8px 16px",
    borderRadius: "4px",
    cursor: "pointer",
    fontWeight: "bold",
  },
  authorControls: {
    marginTop: "1rem",
    display: "flex",
    gap: "1rem",
  },
  editLink: {
    textDecoration: "none",
    color: "#2563eb",
    fontWeight: "bold",
  },
  deleteButton: {
    backgroundColor: "#b91c1c",
    color: "#fff",
    border: "none",
    padding: "8px 16px",
    borderRadius: "4px",
    cursor: "pointer",
    fontWeight: "bold",
  },
  commentHeading: {
    marginTop: "2rem",
    color: "#1f2937",
  },
  comment: {
    borderTop: "1px solid #eee",
    padding: "0.5rem 0",
    color: "#374151",
  },
  commentForm: {
    marginTop: "1rem",
  },
  textarea: {
    width: "100%",
    padding: "8px",
    borderRadius: "4px",
    border: "1px solid #ccc",
    fontFamily: "inherit",
  },
  commentButton: {
    marginTop: "0.5rem",
    backgroundColor: "#2563eb",
    color: "#fff",
    border: "none",
    padding: "8px 16px",
    borderRadius: "4px",
    cursor: "pointer",
    fontWeight: "bold",
  },
};
