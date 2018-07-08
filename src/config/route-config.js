module.exports = {
  init(app){
    const staticRoutes = require("../routes/static");
    const userRoutes = require("../routes/users");
    const categoryRoutes = require("../routes/categories");
    const sectionRoutes = require("../routes/sections");

    app.use(staticRoutes);
    app.use(userRoutes);
    app.use(categoryRoutes);
    app.use(sectionRoutes);
  }
}
