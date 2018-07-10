// npm test spec/unit/post_spec.js

const sequelize = require("../../src/db/models/index").sequelize;
const Category = require("../../src/db/models").Category;
const Section = require("../../src/db/models").Section;
const Topic = require("../../src/db/models").Topic;
const Post = require("../../src/db/models").Post;

describe("Post", () => {

  beforeEach((done) => {
    this.category;
    this.section;
    this.topic;
    this.post;
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
            Post.create({
              link: "Test video",
              topicId: this.topic.id,
              sectionId: this.section.id,
              categoryId: this.category.id
            })
            .then((post) => {
              this.post = post;
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
  });

  describe("#create()", () => {

    it("should create a post object with a link and assigned category, section, and topic", (done) => {
      Post.create({
        link: "Create video",
        categoryId: this.category.id,
        sectionId: this.section.id,
        topicId: this.topic.id
      })
      .then((post) => {
        expect(post.link).toBe("Create video");
        done();
      })
      .catch((err) => {
        console.log(err);
        done();
      });
    });

  });

  it("should not create a post with missing link, or assigned category, section, or topic", (done) => {
     Post.create({
       //intentional left blank
     })
     .then((post) => {
       // the code in this block will not be evaluated since the validation error
       // will skip it. Instead, we'll catch the error in the catch block below
       // and set the expectations there
      done();
    })
    .catch((err) => {
      expect(err.message).toContain("Post.link cannot be null");
      expect(err.message).toContain("Post.sectionId cannot be null");
      done();
    })
  });

});
