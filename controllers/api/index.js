const router = require("express").Router();

const postRoutes = require("./post-routes.js");
const userRoutes = require("./user-routes.js");
const dashboardRoutes = require("./dashboard-routes");

router.use("/post", postRoutes);
router.use("/users", userRoutes);
router.use("/dashboard", dashboardRoutes);

module.exports = router;
