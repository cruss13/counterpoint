module.exports = {
  init(app){
    const staticRoutes = require("../routes/static");
    const userRoutes = require("../routes/users");
    const categoryRoutes = require("../routes/categories");
    const sectionRoutes = require("../routes/sections");
    const topicRoutes = require("../routes/topics");

    app.use(staticRoutes);
    app.use(userRoutes);
    app.use(categoryRoutes);
    app.use(sectionRoutes);
    app.use(topicRoutes);
  }
}
