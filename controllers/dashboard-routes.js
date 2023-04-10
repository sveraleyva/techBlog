const router = require("express").Router();
const { User, Post } = require("../models");
const withAuth = require("../utils/auth");


router.get("/", withAuth, async (req, res) => {
  try {
    const postData = await Post.findAll({
      where: {
        userId: req.session.userId,
      },
    });
    const posts = postData.map((post) => post.get({ plain: true }));
    res.render("all-user-posts", {
      layout: "dashboard",
      posts,
    });
  } catch (err) {
    res.redirect("login");
  }
});

// router.get("/new", withAuth, async (req, res) => {
//   res.render("new-post", {
//     layout: "dashboard",
//   });
// });

// router.get("/edit/:id", withAuth, async (req, res) => {
//     try {
//         const postData = await Post.findByPk(req.params.id);
//          if (postData) {}
//     }
// });

module.exports = router;