const router = require("express").Router();
const { Post, User, Comment } = require("../../models");

// Make a new post
router.post("/", async (req, res) => {
  try {
    const postData = await Post.create({
      title: req.body.title,
      body: req.body.body,
      user_id: req.session.user_id,
    });
    res.status(200).json(postData);
  } catch (err) {
    res.status(200).json(err);
  }
});

// get a single post by id
router.get("/:id", async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ["username", "id"],
        },
      ],
    });

    const post = postData.get({ plain: true });

    const commentData = await Comment.findAll({
      include: [User],
      where: {
        post_id: req.params.id,
      },
    });

    const comments = commentData.map((comment) => comment.get({ plain: true }));
    console.log("comments at get single post by id route", comments);

    res.render("singlepost", {
      post,
      comments,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Add a comment to a post
router.post("/:id", async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.id);
    console.log("Here's your post!", post);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    console.log("user_id at add comment route", req.session.user_id);
    // Create a new comment associated with the post
    const comment = await Comment.create({
      body: req.body.body,
      user_id: req.session.user_id,
      post_id: req.params.id,
    });

    console.log("new comment:", comment);

    res.status(201).json({ message: "Comment added successfully" });
  } catch (err) {
    res.status(400);
  }
});

module.exports = router;

// update a single post by id -> good to go
// router.put("/:id", async (req, res) => {
//   try {
//     const post = await Post.update(
//       {
//         title: req.body.title,
//         body: req.body.body,
//         // Comments
//       },
//       {
//         where: {
//           id: req.params.id,
//         },
//       }
//     );
//     res.status(200).json(post);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// delete a single post by id
// router.delete("/:id", async (req, res) => {
//   try {
//     const postData = await Post.destroy({
//       where: {
//         id: req.params.id,
//         user_id: req.session.user_id,
//       },
//     });
//     if (!postData) {
//       res.status(404).json({ message: "NO POST HAS THIS ID" });
//       return;
//     }
//     res.status(200).json(postData);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

module.exports = router;
