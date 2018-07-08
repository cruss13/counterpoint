// npm test spec/unit/section_spec.js

const sequelize = require("../../src/db/models/index").sequelize;
const Category = require("../../src/db/models").Category;
const Section = require("../../src/db/models").Section;

describe("Section", () => {

  beforeEach((done) => {
    this.category;
    this.section;
    sequelize.sync({force: true}).then((res) => {
      Category.create({
        title: "Entertainment",
      })
      .then((category) => {
        this.category = category;
        Section.create({
          title: "Movies",
          categoryId: this.category.id
        })
        .then((section) => {
          this.section = section;
          done();
        });
      })
      .catch((err) => {
        console.log(err);
        done();
      });
    });
  });

  describe("#create()", () => {

    it("should create a section object with a title and assigned category", (done) => {
      Section.create({
        title: "TV",
        categoryId: this.category.id
      })
      .then((section) => {
        expect(section.title).toBe("TV");
        done();
      })
      .catch((err) => {
        console.log(err);
        done();
      });
    });

  });

  it("should not create a section with missing title or assigned category", (done) => {
    Section.create({
      //intentional left blank
    })
    .then((section) => {
      // the code in this block will not be evaluated since the validation error
      // will skip it. Instead, we'll catch the error in the catch block below
      // and set the expectations there
      done();
    })
    .catch((err) => {
      expect(err.message).toContain("Section.title cannot be null");
      expect(err.message).toContain("Section.categoryId cannot be null");
      done();
    })
  });

  describe("#setCategory()", () => {

    it("should associate a category and a section together", (done) => {
      Category.create({
        title: "Sports",
      })
      .then((newCategory) => {
        expect(this.section.categoryId).toBe(this.category.id);
        this.section.setCategory(newCategory)
        .then((section) => {
          expect(section.categoryId).toBe(newCategory.id);
          done();
        });
      })
    });

  });

  describe("#getCategory()", () => {

    it("should return the associated category", (done) => {
      this.section.getCategory()
      .then((associatedCategory) => {
        expect(associatedCategory.title).toBe("Entertainment");
        done();
      });
    });

  });

});
