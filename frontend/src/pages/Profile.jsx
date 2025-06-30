import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../utils/api";

export default function Profile() {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const userRes = await api.get(`/users/${userId}`);
        const postRes = await api.get(`/users/${userId}/posts`);
        setUser(userRes.data);
        setPosts(postRes.data);
      } catch (err) {
        alert("Failed to load profile");
      }
    };
    fetchProfile();
  }, [userId]);

  if (!user) return <div style={{ textAlign: "center", marginTop: "2rem" }}>Loading...</div>;

  return (
    <div style={styles.container}>
      <div style={styles.profileCard}>
        <h2 style={styles.heading}>👤 {user.username}'s Profile</h2>
        <p style={styles.email}>Email: {user.email}</p>
      </div>

      <h3 style={styles.subheading}>📝 Posts by {user.username}</h3>
      {posts.length === 0 ? (
        <p>No posts yet.</p>
      ) : (
        posts.map((post) => (
          <div key={post._id} style={styles.postCard}>
            <h4 style={styles.postTitle}>
              <Link to={`/post/${post._id}`} style={styles.link}>
                {post.title}
              </Link>
            </h4>
            <p style={styles.excerpt}>{post.content.slice(0, 100)}...</p>
            <Link to={`/post/${post._id}`} style={styles.readMore}>
              Read More →
            </Link>
          </div>
        ))
      )}
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "900px",
    margin: "2rem auto",
    padding: "0 1rem",
  },
  profileCard: {
    backgroundColor: "#f9fafb",
    padding: "1.5rem",
    borderRadius: "8px",
    border: "1px solid #ddd",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    marginBottom: "2rem",
  },
  heading: {
    marginBottom: "0.5rem",
    color: "#1f2937",
  },
  email: {
    color: "#374151",
  },
  subheading: {
    marginBottom: "1rem",
    color: "#1f2937",
  },
  postCard: {
    backgroundColor: "#ffffff",
    border: "1px solid #ddd",
    borderRadius: "8px",
    padding: "1rem",
    marginBottom: "1rem",
    boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
  },
  postTitle: {
    marginBottom: "0.3rem",
    fontSize: "1.2rem",
    color: "#111827",
  },
  excerpt: {
    color: "#374151",
    margin: "0.5rem 0",
  },
  link: {
    textDecoration: "none",
    color: "#2563eb",
    fontWeight: "bold",
  },
  readMore: {
    display: "inline-block",
    marginTop: "0.5rem",
    color: "#2563eb",
    fontWeight: "bold",
    textDecoration: "none",
  },
};
