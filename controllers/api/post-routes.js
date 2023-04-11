const router = require("express").Router();
const { Post, User } = require("../../models");

// make a new post -> good to go
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

// add a comment to a post
router.post("/", async (req, res) => {
  console.log("post_id: req.post.id,", req.post.id);
  try {
    const commentData = await Post.create({
      body: req.body.commentBody,
      user_id: req.session.user_id,
      post_id: req.post.id,
    });
    res.status(200).json(postData);
  } catch (err) {
    res.status(200).json(err);
  }
});

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
