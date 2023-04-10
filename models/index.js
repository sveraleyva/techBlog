const User = require("./User.js");
const Post = require("./Post.js");

Post.belongsTo(User, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

User.hasMany(Post, {
  foreignKey: "user_id",
});

// Post.hasMany(Comment, {
//   foreignKey: "id",
// });

module.exports = { User, Post };
