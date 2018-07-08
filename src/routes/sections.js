const express = require("express");
const router = express.Router();
const sectionController = require("../controllers/sectionController");

router.get("/categories/:categoryId/sections/new", sectionController.new);
router.post("/categories/:categoryId/sections/create", sectionController.create);
router.get("/categories/:categoryId/sections/:id", sectionController.show);
router.post("/categories/:categoryId/sections/:id/destroy", sectionController.destroy);
router.get("/categories/:categoryId/sections/:id/edit", sectionController.edit);
router.post("/categories/:categoryId/sections/:id/update", sectionController.update);

module.exports = router;
