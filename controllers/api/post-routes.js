const router = require("express").Router();
const Post = require("../../models/Post");

router.post("/", async (req, res) => {
  try {
    const postData = await Post.create({
      title: req.body.title,
      body: req.body.body,
      user_id: req.body.user_id,
    });
    res.status(200).json(postData);
  } catch (err) {
    res.status(200).json(err);
  }
});

module.exports = router;
