// npm test spec/integration/topics_spec.js

const request = require("request");
const server = require("../../src/server");
const base = "http://localhost:3000/categories";
const sequelize = require("../../src/db/models/index").sequelize;
const Category = require("../../src/db/models").Category;
const Section = require("../../src/db/models").Section;
const Topic = require("../../src/db/models").Topic;

describe("routes : topics", () => {

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

  describe("GET /categories/:categoryId/sections/:sectionId/topics/new", () => {

    it("should render a new topic form", (done) => {
      request.get(`${base}/${this.category.id}/sections/${this.section.id}/topics/new`, (err, res, body) => {
        expect(err).toBeNull();
        expect(body).toContain("New Topic");
        done();
      });
    });

  });

  describe("POST /categories/:categoryId/sections/:sectionId/topics/create", () => {

    it("should create a new topic and redirect", (done) => {
      const options = {
        url: `${base}/${this.category.id}/sections/${this.section.id}/topics/create`,
        form: {
          title: "Should soccer make bigger goals?",
        }
      };
      request.post(options,
        (err, res, body) => {
          Topic.findOne({where: {title: "Should soccer make bigger goals?"}})
          .then((topic) => {
            expect(topic).not.toBeNull();
            expect(topic.title).toBe("Should soccer make bigger goals?");
            expect(topic.sectionId).not.toBeNull();
            done();
          })
          .catch((err) => {
            console.log(err);
            done();
          });
        }
      );
    });

  });

  describe("GET /categories/:categoryId/sections/:sectionId/topics/:id", () => {

    it("should render a view with the selected topic", (done) => {
      request.get(`${base}/${this.category.id}/sections/${this.section.id}/topics/${this.topic.id}`, (err, res, body) => {
        expect(err).toBeNull();
        expect(body).toContain("Is Ronaldo better than Messi?");
        done();
      });
    });

  });

  describe("POST /categories/:categoryId/sections/:sectionId/topics/:id/destroy", () => {

    it("should delete the topic with the associated ID", (done) => {
      expect(this.topic.id).toBe(1);
      request.post(`${base}/${this.category.id}/sections/${this.section.id}/topics/${this.topic.id}/destroy`, (err, res, body) => {
        Topic.findById(1)
        .then((topic) => {
          expect(err).toBeNull();
          expect(topic).toBeNull();
          done();
        })
      });
    });

  });

  describe("GET /categories/:categoryId/sections/:sectionId/topics/:id/edit", () => {

    it("should render a view with an edit topic form", (done) => {
      request.get(`${base}/${this.category.id}/sections/${this.section.id}/topics/${this.topic.id}/edit`, (err, res, body) => {
        expect(err).toBeNull();
        expect(body).toContain("Edit Topic");
        expect(body).toContain("Is Ronaldo better than Messi?");
        done();
      });
    });

  });

  describe("POST /categories/:categoryId/sections/:sectionId/topics/:id/update", () => {

    it("should return a status code 302", (done) => {
      request.post({
        url: `${base}/${this.category.id}/sections/${this.section.id}/topics/${this.topic.id}/update`,
        form: {
          title: "Is Brady better than Peyton?",
        }
      }, (err, res, body) => {
        expect(res.statusCode).toBe(302);
        done();
      });
    });

    it("should update the topic with the given values", (done) => {
        const options = {
          url: `${base}/${this.category.id}/sections/${this.section.id}/topics/${this.topic.id}/update`,
          form: {
            title: "Is Brady better than Peyton?"
          }
        };
        request.post(options,
          (err, res, body) => {
          expect(err).toBeNull();
          Topic.findOne({
            where: {id: this.topic.id}
          })
          .then((topic) => {
            expect(topic.title).toBe("Is Brady better than Peyton?");
            done();
          });
        });
    });

  });

});
