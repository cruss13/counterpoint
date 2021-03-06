// npm test spec/integration/posts_spec.js

const request = require("request");
const server = require("../../src/server");
const base = "http://localhost:3000/categories";
const sequelize = require("../../src/db/models/index").sequelize;
const Category = require("../../src/db/models").Category;
const Section = require("../../src/db/models").Section;
const Topic = require("../../src/db/models").Topic;
const Post = require("../../src/db/models").Post;


describe("routes : posts", () => {

  beforeEach((done) => {
    this.category;
    this.section;
    this.topic;
    this.video;
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

  describe("GET /categories/:categoryId/sections/:sectionId/topics/:topicId/posts/new", () => {

    it("should render a new post form", (done) => {
      request.get(`${base}/${this.category.id}/sections/${this.section.id}/topics/${this.topic.id}/posts/new`, (err, res, body) => {
        expect(err).toBeNull();
        expect(body).toContain("New Post");
        done();
      });
    });

  });

});
