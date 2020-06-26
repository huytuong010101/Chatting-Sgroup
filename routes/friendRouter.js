const express = require('express');
const router = express.Router();
const handleFriend = require('../app/controllers/friendController')
const handleAuth = require('../app/controllers/authController')
const authMiddleware = require('../app/middlewares/authenticationMiddleware')

router.route("/send-request")
    .post(authMiddleware.verifyToken, handleFriend.sendRequest)
router.route("/get-friend-requests")
    .get(authMiddleware.verifyToken, handleFriend.getFriendRequests)
router.route("/get-friend-list")
    .get(authMiddleware.verifyToken, handleFriend.getAllFriends)
router.route("/accept")
    .put(authMiddleware.verifyToken, handleFriend.acceptRequest)
router.route("/delete-request")
    .delete(authMiddleware.verifyToken, handleFriend.deleteRequest)
module.exports = router;
