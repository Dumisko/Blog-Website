import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav style={styles.navbar}>
      <div style={styles.left}>
        <Link to="/" style={styles.brand}>
          📰 MyBlog
        </Link>
      </div>
      <div style={styles.right}>
        <Link to="/" style={styles.link}>Home</Link>
        {user ? (
          <>
            <Link to="/create" style={styles.link}>Create</Link>
            <Link to={`/profile/${user.id}`} style={styles.link}>Profile</Link>
            <button onClick={handleLogout} style={styles.logoutBtn}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" style={styles.link}>Login</Link>
            <Link to="/signup" style={styles.link}>Signup</Link>
          </>
        )}
      </div>
    </nav>
  );
}

const styles = {
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0.8rem 1.5rem",
    backgroundColor: "#1f2937",  // dark navy
    color: "#fff",
    flexWrap: "wrap",   // responsive
  },
  left: {
    fontSize: "1.3rem",
    fontWeight: "bold",
  },
  brand: {
    textDecoration: "none",
    color: "#facc15",  // yellow brand color
  },
  right: {
    display: "flex",
    gap: "1rem",
    alignItems: "center",
    flexWrap: "wrap",
  },
  link: {
    textDecoration: "none",
    color: "#f9fafb",  // light gray
    fontWeight: "500",
  },
  logoutBtn: {
    backgroundColor: "#ef4444",  // red
    border: "none",
    color: "#fff",
    padding: "6px 12px",
    cursor: "pointer",
    borderRadius: "4px",
  },
};
