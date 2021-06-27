const express = require('express');
const feedController = require('../controllers/feed');
const router = express.Router();
//   /feed/posts
router.get('/posts', feedController.getPosts);
router.post('/post',feedController.postPosts);
module.exports = router;