const express = require('express');
const router = express.Router();
const auth = require('../controller/userController')
const controller = require('../controller/followController');

router.post('/add-follow', auth.authorization, controller.addFollow);
router.get('/get-follow', controller.getFollow);
router.delete('/delete-follow', controller.deleteFollow);
router.get('/get-user-follow', auth.authorization, controller.getUserFollow)
module.exports = router;