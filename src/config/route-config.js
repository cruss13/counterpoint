module.exports = {
  init(app){
    const staticRoutes = require("../routes/static");
    const userRoutes = require("../routes/users");
    const categoryRoutes = require("../routes/categories");
    const sectionRoutes = require("../routes/sections");
    const topicRoutes = require("../routes/topics");
    const postRoutes = require("../routes/posts");
    const contactRoutes = require("../routes/contact");

    app.use(staticRoutes);
    app.use(userRoutes);
    app.use(categoryRoutes);
    app.use(sectionRoutes);
    app.use(topicRoutes);
    app.use(postRoutes);
    app.use(contactRoutes);
  }
}
