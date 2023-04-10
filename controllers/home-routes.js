const router = require("express").Router();
const { User, Post } = require("../models");
const withAuth = require("../utils/auth");

// Posts by signed User route
// router.get('/dashboard/:id', async (req, res) => {
//   try {
//     const postsData = await Post.findByPk(req.params.user_id, {
//       include: [
//         {
//           model: User,
//           attributes: ['name'],
//         },
//       ],
//     });

//     const project = postData.get({ plain: true });

//     res.render('post', {
//       ...project,
//       logged_in: req.session.logged_in
//     });
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

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

// Dashboard route
router.get("/dashboard", (req, res) => {
  if (req.session.loggedIn) {
    res.render("dashboard", { loggedIn: req.session.loggedIn });
    return;
  }
  res.redirect("/");
});

module.exports = router;
