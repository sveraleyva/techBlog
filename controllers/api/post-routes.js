const router = require("express").Router();
const { Post, User, Comment } = require("../../models");
const withAuth = require("../../utils/auth");

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

// get a single post (and its comments) by id
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

    // checks if the user selecting the post is the owner of the post
    const ownerOfPost = post.user_id === req.session.user_id;

    const commentData = await Comment.findAll({
      include: {
        model: User,
        attributes: ["username"],
      },
      where: {
        post_id: req.params.id,
      },
    });

    const loggedIn = req.session.loggedIn;
    console.log(loggedIn, ownerOfPost);

    const comments = commentData.map((comment) => comment.get({ plain: true }));

    res.render("singlepost", {
      post,
      comments,
      loggedIn: req.session.loggedIn,
      user_id: req.session.user_id,
      ownerOfPost,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Add a comment to a post
router.post("/:id", async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.id);
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

    res.status(201).json({ message: "Comment added successfully" });
  } catch (err) {
    res.status(400);
  }
});

// route to the edit post page
router.get("/:id/edit", async (req, res) => {
  const postData = await Post.findByPk(req.params.id, {
    include: [
      {
        model: User,
        attributes: ["username", "id"],
      },
    ],
  });

  const post = postData.get({ plain: true });

  if (req.session.loggedIn) {
    res.render("editpost", { post, loggedIn: req.session.loggedIn });
    return;
  }

  res.redirect("/");
});

// update a single post by id
router.put("/:id/edit", async (req, res) => {
  console.log("update post route hit");
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
