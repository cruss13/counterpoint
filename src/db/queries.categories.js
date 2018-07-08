const Category = require("./models").Category;
const Section = require("./models").Section;

module.exports = {

  getAllCategories(callback){
    return Category.all()
    .then((categories) => {
      callback(null, categories);
    })
    .catch((err) => {
      callback(err);
    })
  },

  addCategory(newCategory, callback){
    return Category.create({
      title: newCategory.title,
    })
    .then((category) => {
      callback(null, category);
    })
    .catch((err) => {
      callback(err);
    })
  },

  deleteCategory(id, callback){
    return Category.destroy({
      where: {id}
    })
    .then((category) => {
      callback(null, category);
    })
    .catch((err) => {
      callback(err);
    })
  },

  getCategory(id, callback){
    return Category.findById(id, {
      include: [{
        model: Section,
        as: "sections"
      }]
    })
    .then((category) => {
      callback(null, category);
    })
    .catch((err) => {
      callback(err);
    })
  },

  updateCategory(id, updatedCategory, callback){
    return Category.findById(id)
    .then((category) => {
      if(!category){
        return callback("Category not found");
      }
      category.update(updatedCategory, {
        fields: Object.keys(updatedCategory)
      })
      .then(() => {
        callback(null, category);
      })
      .catch((err) => {
        callback(err);
      });
    });
  }

}
