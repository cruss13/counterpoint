// npm test spec/unit/topic_spec.js

const sequelize = require("../../src/db/models/index").sequelize;
const Category = require("../../src/db/models").Category;
const Section = require("../../src/db/models").Section;
const Topic = require("../../src/db/models").Topic;

describe("Topic", () => {

  beforeEach((done) => {
    this.category;
    this.section;
    this.topic;
    sequelize.sync({force: true}).then((res) => {
      Category.create({
        title: "Sports",
      })
      .then((category) => {
        this.category = category;
        Section.create({
          title: "Soccer",
          categoryId: this.category.id
        })
        .then((section) => {
          this.section = section;
          Topic.create({
            title: "Is Ronaldo better than Messi?",
            sectionId: this.section.id,
            categoryId: this.category.id
          })
          .then((topic) => {
            this.topic = topic;
            done();
          });
        })
        .catch((err) => {
          console.log(err);
          done();
        });
      });
    });
  });

  describe("#create()", () => {

    it("should create a topic object with a title and assigned category and section", (done) => {
      Topic.create({
        title: "Is this the best World Cup ever?",
        categoryId: this.category.id,
        sectionId: this.section.id
      })
      .then((topic) => {
        expect(topic.title).toBe("Is this the best World Cup ever?");
        done();
      })
      .catch((err) => {
        console.log(err);
        done();
      });
    });

  });

  it("should not create a topic with missing title, or assigned category and section", (done) => {
     Topic.create({
       //intentional left blank
     })
     .then((topic) => {
       // the code in this block will not be evaluated since the validation error
       // will skip it. Instead, we'll catch the error in the catch block below
       // and set the expectations there
      done();
    })
    .catch((err) => {
      expect(err.message).toContain("Topic.title cannot be null");
      expect(err.message).toContain("Topic.sectionId cannot be null");
      done();
    })
  });

});
