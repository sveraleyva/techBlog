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

// update a single post by id -> good to go
router.put("/:id", async (req, res) => {
  try {
    const post = await Post.update(
      {
        title: req.body.title,
        body: req.body.body,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    res.status(200).json(post);
  } catch {
    res.status(500).json(err);
  }
});

// get a single post by id -> good to go
router.get("/:id", async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, { include: [User] });
    const post = postData.get({ plain: true });
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
});

// get all posts by user
router.get("/user_id", async (req, res) => {
  try {
    const postData = await Post.findAll({
      where: {
        user_id: req.session.user_id,
      },
      include: [User],
    });
    const posts = postData.map((post) => post.get({ plain: true }));
    res.render("userPosts", { posts, loggedIn: req.session.loggedIn });
  } catch (err) {
    res.status(500).json(err);
  }
});

// delete a single post by id
router.delete("/:id", async (req, res) => {
  try {
    const postData = await Post.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });
    if (!postData) {
      res.status(404).json({ message: "NO POST HAS THIS ID" });
      return;
    }
    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
