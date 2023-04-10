const router = require("express").Router();
const { User, Post } = require("../../models");
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

// All posts from logged-in user route
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

// router.get("/", withAuth, async (req, res) => {
//   try {
//     const postData = await Post.findAll({
//       where: {
//         userId: req.session.userId,
//       },
//     });
//     const posts = postData.map((post) => post.get({ plain: true }));
//     res.render("all-user-posts", {
//       layout: "dashboard",
//       posts,
//     });
//   } catch (err) {
//     res.redirect("login");
//   }
// });

// // Get all posts by user
// router.get("/:user_id", async (req, res) => {
//   console.log("posts hit");
//   try {
//     const postData = await Post.findAll({
//       where: {
//         user_id: req.session.user_id,
//       },
//       include: [User],
//     });
//     const posts = postData.map((post) => post.get({ plain: true }));
//     res.render("userPosts", { posts, loggedIn: req.session.user_id });
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

router.get("/new", withAuth, async (req, res) => {
  res.render("createpost");
});

// router.get("/edit/:id", withAuth, async (req, res) => {
//     try {
//         const postData = await Post.findByPk(req.params.id);
//          if (postData) {}
//     }
// });

module.exports = router;
