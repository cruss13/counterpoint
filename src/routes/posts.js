const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController")

router.get("/categories/:categoryId/sections/:sectionId/topics/:topicId/posts/new", postController.new);
//POST https://www.googleapis.com/upload/youtube/v3/videos
module.exports = router;
