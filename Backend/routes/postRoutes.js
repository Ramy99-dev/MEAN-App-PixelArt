const express = require('express');
const cors = require('cors')
const router = express.Router();
router.use(express.urlencoded({ extended: false }));
const controller = require('../controller/postController');
const auth = require('../controller/userController')


router.use(express.json())
router.use(cors())
router.post('/add-post', auth.authorization, controller.addPost)
router.post('/upload-img', controller.upload.single('image'));
router.get('/get-all-posts/page=:page/limit=:limit', controller.getAllPosts)
router.get('/get-post/page=:page/limit=:limit', auth.authorization, controller.getPost)
router.get('/get-posts-by-user-id', controller.getPostByUserId)
router.get('/get-post-details', auth.authorization, controller.getPostDetails)
router.get('/get-post-id', controller.getPostById)
module.exports = router