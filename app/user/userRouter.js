import express from 'express';
const router = express.Router();
import AuthMiddleware from '../middlewares/authenticationMiddleware.js';
import upload from '../../uploadConfig.js';
import UserController from "./userController.js"
const userController = new UserController;
const authMiddleware = new AuthMiddleware;
router.route("/get-info")
    .get(authMiddleware.verifyToken, userController.getMyInfo)
router.route("/update-info")
    .put(authMiddleware.verifyToken, userController.updateMyInfo)

export default router;