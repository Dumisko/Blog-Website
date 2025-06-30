import React from "react";


export default function Footer() {
  return (
    <footer style={styles.footer}>
      <div style={styles.container}>
        <p style={styles.text}>
          &copy; {new Date().getFullYear()} My Blog Website. All rights reserved.
        </p>
        <div style={styles.links}>
          <a href="#" style={styles.link}>Privacy</a>
          <a href="#" style={styles.link}>Terms</a>
          <a href="#" style={styles.link}>Contact</a>
        </div>
      </div>
    </footer>
  );
}

const styles = {
  footer: {
    backgroundColor: "#1f2937",
    color: "#f9fafb",
    padding: "1rem 0",
    marginTop: "2rem",
  },
  container: {
    maxWidth: "1100px",
    margin: "0 auto",
    padding: "0 1rem",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "0.5rem",
  },
  text: {
    fontSize: "0.9rem",
    textAlign: "center",
  },
  links: {
    display: "flex",
    gap: "1rem",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  link: {
    color: "#f9fafb",
    textDecoration: "none",
    fontSize: "0.9rem",
  },
};
