const router = require("express").Router();
const Post = require("../models/Post");

// // route to get all
router.get("/", async (req, res) => {
  const postData = await Post.findAll().catch((err) => {
    res.json(err);
  });
  const posts = postData.map((post) => post.get({ plain: true }));
  res.render("all", { posts });
});

module.exports = router;
