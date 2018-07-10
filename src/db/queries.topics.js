const Section = require("./models").Section;
const Category = require("./models").Category;
const Topic = require("./models").Topic;
const Post = require("./models").Post;

module.exports = {

  addTopic(newTopic, callback){
    return Topic.create(newTopic)
    .then((topic) => {
      callback(null, topic);
    })
    .catch((err) => {
      callback(err);
    })
  },

  getTopic(id, callback){
    return Topic.findById(id, {
      include: [{
        model: Post,
        as: "posts"
      }]
    })
    .then((topic) => {
      callback(null, topic);
    })
    .catch((err) => {
      callback(err);
    })
  },

  deleteTopic(id, callback){
    return Topic.destroy({
      where: { id }
    })
    .then((deletedRecordsCount) => {
      callback(null, deletedRecordsCount);
    })
    .catch((err) => {
      callback(err);
    })
  },

  updateTopic(id, updatedTopic, callback){
    return Topic.findById(id)
    .then((topic) => {
      if(!topic){
        return callback("Topic not found");
      }
      topic.update(updatedTopic, {
        fields: Object.keys(updatedTopic)
      })
      .then(() => {
        callback(null, topic);
      })
      .catch((err) => {
        callback(err);
      });
    });
  }

}
