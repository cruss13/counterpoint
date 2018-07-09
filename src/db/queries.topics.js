const Section = require("./models").Section;
const Category = require("./models").Category;
const Topic = require("./models").Topic;

module.exports = {

  addTopic(newTopic, callback){
    return Topic.create(newTopic)
    .then((topic) => {
      callback(null, topic);
    })
    .catch((err) => {
      callback(err);
    })
  }

}
