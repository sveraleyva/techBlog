const router = require("express").Router();
const { User, Post, Comment } = require("../../models");
const withAuth = require("../../utils/auth");

// Dashboard route
router.get("/dashboard", (req, res) => {
  if (req.session.loggedIn) {
    console.log("dashboard route hit");
    res.render("dashboard", { loggedIn: req.session.loggedIn });
    return;
  }
  res.redirect("/");
});

// Get all posts from logged-in user route
router.get("/", withAuth, async (req, res) => {
  try {
    const postData = await Post.findAll({
      // Filter posts by the user_id of the logged-in user
      where: { user_id: req.session.user_id },
      include: [{ model: User, attributes: ["username"] }],
    });
    const posts = postData.map((post) => post.get({ plain: true }));
    res.render("dashboard", { posts, loggedIn: true });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Go to the make a new post page
router.get("/new", withAuth, async (req, res) => {
  res.render("createpost");
});

module.exports = router;
