import express from 'express';
const router = express.Router();
import FriendController from './friendController.js';
import AuthMiddleware from '../middlewares/authenticationMiddleware.js';

const friendController = new FriendController;
const authMiddleware = new AuthMiddleware;

router.route("/send-request")
    .post(authMiddleware.verifyToken, friendController.sendRequest)
router.route("/get-friend-requests")
    .get(authMiddleware.verifyToken, friendController.getFriendRequests)
router.route("/get-friend-list")
    .get(authMiddleware.verifyToken, friendController.getAllFriends)
router.route("/accept")
    .put(authMiddleware.verifyToken, friendController.acceptRequest)
router.route("/delete-request")
    .delete(authMiddleware.verifyToken, friendController.deleteRequest)
export default router;
