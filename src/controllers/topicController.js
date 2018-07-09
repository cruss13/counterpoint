const topicQueries = require("../db/queries.topics.js");

module.exports = {

  new(req, res, next){
    res.render("topics/new", {categoryId: req.params.categoryId, sectionId: req.params.sectionId});
  },

  create(req, res, next){
    let title = req.body.title;
    let sectionId = req.params.sectionId;
    let categoryId = req.params.categoryId;
    let newTopic= {
      title,
      sectionId,
      categoryId,
    };
    topicQueries.addTopic(newTopic, (err, topic) => {
      if(err){
        console.log(err);
        res.redirect(500, "/topics/new");
      } else {
        res.redirect(303, `/categories/${category.id}/sections/${section.id}/topics/`);
      }
    });
  }

}
