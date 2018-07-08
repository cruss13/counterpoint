// npm test spec/integration/sections_spec.js

const request = require("request");
const server = require("../../src/server");
const base = "http://localhost:3000/categories";
const sequelize = require("../../src/db/models/index").sequelize;
const Category = require("../../src/db/models").Category;
const Section = require("../../src/db/models").Section;

describe("routes : sections", () => {

  beforeEach((done) => {
    this.category;
    this.section;
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
          done();
        })
        .catch((err) => {
          console.log(err);
          done();
        });
      });
    });

  });

  describe("GET /categories/:categoryId/sections/new", () => {

    it("should render a new section form", (done) => {
      request.get(`${base}/${this.category.id}/sections/new`, (err, res, body) => {
        expect(err).toBeNull();
        expect(body).toContain("New Section");
        done();
      });
    });

  });

  describe("POST /categories/:categoryId/sections/create", () => {

    it("should create a new section and redirect", (done) => {
      const options = {
        url: `${base}/${this.category.id}/sections/create`,
        form: {
          title: "Football",
        }
      };
      request.post(options,
        (err, res, body) => {
          Section.findOne({where: {title: "Football"}})
          .then((section) => {
            expect(section).not.toBeNull();
            expect(section.title).toBe("Football");
            expect(section.categoryId).not.toBeNull();
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

  describe("GET /categories/:categoryId/sections/:id", () => {

    it("should render a view with the selected select", (done) => {
      request.get(`${base}/${this.category.id}/sections/${this.section.id}`, (err, res, body) => {
        expect(err).toBeNull();
        expect(body).toContain("Soccer");
        done();
      });
    });

  });

  describe("POST /categories/:categoryId/sections/:id/destroy", () => {

    it("should delete the section with the associated ID", (done) => {
      expect(this.section.id).toBe(1);
      request.post(`${base}/${this.category.id}/sections/${this.section.id}/destroy`, (err, res, body) => {
        Section.findById(1)
        .then((section) => {
          expect(err).toBeNull();
          expect(section).toBeNull();
          done();
        })
      });
    });

  });

  describe("GET /categories/:categoryId/sections/:id/edit", () => {

    it("should render a view with an edit section form", (done) => {
      request.get(`${base}/${this.category.id}/sections/${this.section.id}/edit`, (err, res, body) => {
        expect(err).toBeNull();
        expect(body).toContain("Edit Section");
        done();
      });
    });

  });

  describe("POST /categories/:categoryId/sections/:id/update", () => {

    it("should return a status code 302", (done) => {
      request.post({
        url: `${base}/${this.category.id}/sections/${this.section.id}/update`,
        form: {
          title: "Soccer",
        }
      }, (err, res, body) => {
        expect(res.statusCode).toBe(302);
        done();
      });
    });

    it("should update the post with the given values", (done) => {
      const options = {
        url: `${base}/${this.category.id}/sections/${this.section.id}/update`,
        form: {
          title: "Basketball"
        }
      };
      request.post(options,
      (err, res, body) => {
        expect(err).toBeNull();
        Section.findOne({
          where: {id: this.section.id}
        })
        .then((section) => {
          expect(section.title).toBe("Basketball");
          done();
        });
      });

    });

  });

});
