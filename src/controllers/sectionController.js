const sectionQueries = require("../db/queries.sections.js");

module.exports = {

  new(req, res, next){
    res.render("sections/new", {categoryId: req.params.categoryId});
  },

  create(req, res, next){
    let newSection= {
      title: req.body.title,
      categoryId: req.params.categoryId
    };
    sectionQueries.addSection(newSection, (err, post) => {
      if(err){
        console.log(err);
        res.redirect(500, "/sections/new");
      } else {
        res.redirect(303, `/categories/${newSection.categoryId}`);
      }
    });
  },

  show(req, res, next){
    sectionQueries.getSection(req.params.id, (err, section) => {
      if(err || section == null){
        console.log(err)
        res.redirect(404, "/");
      } else {
        res.render("sections/show", {section});
      }
    });
  },

  destroy(req, res, next){
    sectionQueries.deleteSection(req.params.id, (err, deletedRecordsCount) => {
      if(err){
        res.redirect(500, `/categories/${req.params.categoryId}/sections/${req.params.id}`)
      } else {
        res.redirect(303, `/categories/${req.params.categoryId}`)
      }
    });
  },

  edit(req, res, next){
    sectionQueries.getSection(req.params.id, (err, section) => {
      if(err || section == null){
        res.redirect(404, "/");
      } else {
        res.render("sections/edit", {section});
      }
    });
  },

  update(req, res, next){
    sectionQueries.updateSection(req.params.id, req.body, (err, section) => {
      if(err || section == null){
        res.redirect(404, `/categories/${req.params.categoryId}/sections/${req.params.id}/edit`);
      } else {
        res.redirect(`/categories/${req.params.categoryId}/sections/${req.params.id}`);
      }
    });
  }

}
