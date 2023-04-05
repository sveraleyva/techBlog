const router = require("express").Router();

const postRoutes = require("./post-routes.js");

router.use("/post", postRoutes);

module.exports = router;
