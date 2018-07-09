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
        res.redirect(303, `/categories/${req.params.categoryId}/sections/${req.params.sectionId}`);
      }
    });
  },

  show(req, res, next){
    topicQueries.getTopic(req.params.id, (err, topic) => {
      if(err || topic == null){
        res.redirect(404, "/");
      } else {
        res.render("topics/show", {topic});
      }
    });
  },

  destroy(req, res, next){
    topicQueries.deleteTopic(req.params.id, (err, deletedRecordsCount) => {
      if(err){
        res.redirect(500, `/categories/${req.params.categoryId}/sections/${req.params.sectionId}/topics/${req.params.id}`)
      } else {
        res.redirect(303, `/categories/${req.params.categoryId}/sections/${req.params.sectionId}`)
      }
    });
  },

  edit(req, res, next){
    topicQueries.getTopic(req.params.id, (err, topic) => {
      if(err || topic == null){
        res.redirect(404, "/");
      } else {
        res.render("topics/edit", {topic});
      }
    });
  },

  update(req, res, next){
    topicQueries.updateTopic(req.params.id, req.body, (err, topic) => {
      if(err || topic == null){
        console.log(err);
        res.redirect(404, `/categories/${req.params.categoryId}/sections/${req.params.sectionId}/topics/${req.params.id}`);
      } else {
        res.redirect(`/categories/${req.params.categoryId}/sections/${req.params.sectionId}/`);
      }
    });
  }

}
