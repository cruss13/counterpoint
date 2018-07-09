const Section = require("./models").Section;
const Category = require("./models").Category;
const Topic = require("./models").Topic;

module.exports = {

  addSection(newSection, callback){
    return Section.create(newSection)
    .then((section) => {
      callback(null, section);
    })
    .catch((err) => {
      callback(err);
    })
  },

  getSection(id, callback){
    return Section.findById(id, {
     include: [{
       model: Topic,
       as: "topics"
     }]
   })
    .then((section) => {
      callback(null, section);
    })
    .catch((err) => {
      callback(err);
    })
  },

  deleteSection(id, callback){
    return Section.destroy({
      where: { id }
    })
    .then((deletedRecordsCount) => {
      callback(null, deletedRecordsCount);
    })
    .catch((err) => {
      callback(err);
    })
  },

  updateSection(id, updatedSection, callback){
    return Section.findById(id)
    .then((section) => {
      if(!section){
        return callback("Section not found");
      }
      section.update(updatedSection, {
        fields: Object.keys(updatedSection)
      })
      .then(() => {
        callback(null, section);
      })
      .catch((err) => {
        callback(err);
      });
    });
  }

}
