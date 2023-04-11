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

// get a single post by id
router.get("/:id", async (req, res) => {
  console.log("working?");
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [
        User,
        {
          model: Comment,
          required: false,
        },
      ],
    });
    console.log(postData);
    const post = postData.get({ plain: true });
    res.render("singlepost", { post, loggedIn: req.session.loggedIn });
  } catch (err) {
    res.status(500).json(err);
  }
});

// // get a single post by id
// router.get("/:id", async (req, res) => {
//   try {
//     const postData = await Post.findByPk(req.params.id, {
//       include: [
//         {
//           model: [User],
//         },
//       ],
//     });
//     const post = postData.get({ plain: true });
//     res.render("singlepost", { post, loggedIn: req.session.loggedIn });
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

module.exports = router;
