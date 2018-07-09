const express = require("express");
const router = express.Router();
const topicController = require("../controllers/topicController");

router.get("/categories/:categoryId/sections/:sectionId/topics/new", topicController.new);
router.post("/categories/:categoryId/sections/:sectionId/topics/create", topicController.create);
router.get("/categories/:categoryId/sections/:sectionId/topics/:id", topicController.show);
router.post("/categories/:categoryId/sections/:sectionId/topics/:id/destroy", topicController.destroy);
router.get("/categories/:categoryId/sections/:sectionId/topics/:id/edit", topicController.edit);
router.post("/categories/:categoryId/sections/:sectionId/topics/:id/update", topicController.update);

module.exports = router;
