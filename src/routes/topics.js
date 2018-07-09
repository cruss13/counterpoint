const express = require("express");
const router = express.Router();
const topicController = require("../controllers/topicController");

router.get("/categories/:categoryId/sections/:sectionId/topics/new", topicController.new);
router.post("/categories/:categoryId/sections/:sectionId/topics/create", topicController.create);

module.exports = router;
