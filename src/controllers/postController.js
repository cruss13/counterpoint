const postQueries = require("../db/queries.posts.js");

module.exports = {

  new(req, res, next){
    res.render("posts/new", {categoryId: req.params.categoryId,
    sectionId: req.params.sectionId, topicId: req.params.topicId});
  }

}
