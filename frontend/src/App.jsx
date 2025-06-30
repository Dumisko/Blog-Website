import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import CreatePost from "./pages/CreatePost";
import EditPost from "./pages/EditPost";
import PostDetail from "./pages/PostDetail";
import Profile from "./pages/Profile";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export default function App() {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <Router>
      <Navbar />
      <Routes>
        {/* home */}
        <Route path="/" element={<Home />} />

        {/* auth */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* blog posts */}
        <Route path="/post/:id" element={<PostDetail />} />
        <Route
          path="/create"
          element={token ? <CreatePost /> : <Navigate to="/login" />}
        />
        <Route
          path="/edit/:id"
          element={token ? <EditPost /> : <Navigate to="/login" />}
        />

        {/* profile */}
        <Route
          path="/profile/:userId"
          element={user ? <Profile /> : <Navigate to="/login" />}
        />

        {/* fallback */}
        <Route path="*" element={<h2>404 Not Found</h2>} />
      </Routes>
      <Footer />
    </Router>
  );
}
