const router = require("express").Router();
const { User, Post } = require("../models");
const withAuth = require("../utils/auth");

// Log In/Sign Up page route
router.get("/login", (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }
  res.render("login");
});

// All posts/Home route
router.get("/", async (req, res) => {
  const postData = await Post.findAll({ include: User }).catch((err) => {
    res.json(err);
  });
  const posts = postData.map((post) => post.get({ plain: true }));
  res.render("all", { posts, loggedIn: req.session.loggedIn });
});

module.exports = router;
