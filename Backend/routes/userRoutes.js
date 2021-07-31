const express = require('express')
const router = express.Router();
const cors = require('cors')
const controller = require('../controller/userController')

var cookieParser = require('cookie-parser')
router.use(express.urlencoded({ extended: true }));


router.use(cookieParser())
router.use(express.json())
router.use(cors())
router.all("/*", function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});
router.post('/add-user', controller.addUser)
router.post('/login', controller.login)
router.get('/profile', controller.authorization, controller.getProfile)
router.get('/get-user-id', controller.getUserById)
router.post('/upload-profile-img', controller.upload.single('image'));
router.put('/update-profile-img', controller.authorization, controller.updateProfileImg)

module.exports = router