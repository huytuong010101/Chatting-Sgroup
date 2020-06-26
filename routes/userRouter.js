const express = require('express');
const router = express.Router();
const authMiddleware = require('../app/middlewares/authenticationMiddleware')
const handleUser = require('../app/controllers/userController')
const { upload } = require('../uploadConfig')

router.route("/get-info")
    .get(authMiddleware.verifyToken, handleUser.getMyInfo)
router.route("/update-info")
    .put(authMiddleware.verifyToken, handleUser.updateMyInfo)

module.exports = router;