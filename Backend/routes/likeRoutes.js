const express = require('express');
const router = express.Router();
const controller = require('../controller/likeController')
const auth = require('../controller/userController')
router.get('/get-user-like', auth.authorization, controller.getUserLike)
router.post('/add-like', auth.authorization, controller.addLike);
router.delete('/delete-like', auth.authorization, controller.removeLike)
router.get('/post-like', controller.getPostLikes)
router.get('/group-posts', controller.groupPosts)
module.exports = router