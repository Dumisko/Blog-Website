import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../utils/api";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await api.get("/posts");
        setPosts(res.data);
      } catch (err) {
        console.error(err);
        alert("Failed to fetch posts");
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  if (loading) return <div style={{ textAlign: "center", marginTop: "2rem" }}>Loading...</div>;

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Latest Posts</h2>
      {posts.length === 0 && <p>No posts yet.</p>}
      {posts.map((post) => (
        <div key={post._id} style={styles.card}>
          <h3 style={styles.postTitle}>
            <Link to={`/post/${post._id}`} style={styles.link}>
              {post.title}
            </Link>
          </h3>
          <p style={styles.meta}>
            by <strong>{post.author.username}</strong> on{" "}
            {new Date(post.createdAt).toLocaleDateString()}
          </p>
          {post.imageUrl && (
            <img
              src={post.imageUrl}
              alt={post.title}
              style={styles.thumbnail}
            />
          )}
          <p style={styles.excerpt}>
            {post.content.slice(0, 100)}...
          </p>
          <Link to={`/post/${post._id}`} style={styles.readMore}>
            Read More →
          </Link>
        </div>
      ))}
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "900px",
    margin: "2rem auto",
    padding: "0 1rem",
  },
  heading: {
    textAlign: "center",
    marginBottom: "2rem",
    color: "#1f2937",
  },
  card: {
    backgroundColor: "#f9fafb",
    border: "1px solid #ddd",
    borderRadius: "8px",
    padding: "1rem",
    marginBottom: "1.5rem",
    boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
  },
  postTitle: {
    marginBottom: "0.5rem",
    fontSize: "1.4rem",
    color: "#111827",
  },
  meta: {
    fontSize: "0.9rem",
    color: "#4b5563",
    marginBottom: "0.5rem",
  },
  excerpt: {
    margin: "0.5rem 0",
    color: "#374151",
  },
  link: {
    textDecoration: "none",
    color: "#2563eb",
  },
  readMore: {
    display: "inline-block",
    marginTop: "0.5rem",
    color: "#2563eb",
    fontWeight: "bold",
    textDecoration: "none",
  },
  thumbnail: {
    maxWidth: "100%",
    height: "auto",
    margin: "0.5rem 0",
    borderRadius: "4px",
  },
};
