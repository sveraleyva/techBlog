const router = require("express").Router();
const Post = require("../models/Post");
const withAuth = require("../utils/auth");

// HOME ROUTE?
router.get("/", async (req, res) => {
  const postData = await Post.findAll().catch((err) => {
    res.json(err);
  });
  const posts = postData.map((post) => post.get({ plain: true }));
  res.render("all", { posts, loggedIn: req.session.loggedIn });
});

// Log In route
router.get("/login", (req, res) => {
  console.log("login route hit");
  console.log("req.session.loggedIn", req.session.loggedIn);
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }
  res.render("login");
});

module.exports = router;
