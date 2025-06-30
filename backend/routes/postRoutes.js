import express from "express";
import Post from "../models/Post.js";
import verifyToken from "../middleware/auth.js";

const router = express.Router();

// create post
router.post("/", verifyToken, async (req, res) => {
  try {
    const { title, content, imageUrl } = req.body;
    const post = new Post({ title, content, imageUrl, author: req.userId });
    const savedPost = await post.save();
    res.status(201).json(savedPost);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

// get all posts
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("author", "username")
      .sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

// get single post
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate("author", "username");
    if (!post) return res.status(404).json("Post not found");
    res.json(post);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

// update post
router.put("/:id", verifyToken, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json("Post not found");
    if (post.author.toString() !== req.userId) return res.status(403).json("Unauthorized");

    const updatedPost = await Post.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.json(updatedPost);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

// delete post
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json("Post not found");
    if (post.author.toString() !== req.userId) return res.status(403).json("Unauthorized");

    await post.deleteOne();
    res.json("Post deleted");
  } catch (err) {
    res.status(500).json(err.message);
  }
});

// add comment
router.post("/:id/comments", verifyToken, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json("Post not found");

    const comment = {
      user: req.userId,
      text: req.body.text,
    };

    post.comments.push(comment);
    await post.save();

    const updatedPost = await Post.findById(req.params.id).populate("comments.user", "username");
    res.json(updatedPost.comments);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

// delete comment
router.delete("/:postId/comments/:commentId", verifyToken, async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    if (!post) return res.status(404).json("Post not found");

    const comment = post.comments.id(req.params.commentId);
    if (!comment) return res.status(404).json("Comment not found");

    if (
      comment.user.toString() !== req.userId &&
      post.author.toString() !== req.userId
    ) {
      return res.status(403).json("Unauthorized");
    }

    comment.remove();
    await post.save();
    res.json("Comment deleted");
  } catch (err) {
    res.status(500).json(err.message);
  }
});

// like/unlike post
router.post("/:id/like", verifyToken, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json("Post not found");

    const userId = req.userId;
    const alreadyLiked = post.likes.includes(userId);

    if (alreadyLiked) {
      post.likes = post.likes.filter((id) => id.toString() !== userId);
    } else {
      post.likes.push(userId);
    }

    await post.save();
    res.json({
      message: alreadyLiked ? "Post unliked" : "Post liked",
      likes: post.likes.length,
    });
  } catch (err) {
    res.status(500).json(err.message);
  }
});

export default router;
