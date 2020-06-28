import express from 'express';
const router = express.Router();
import AuthMiddleware from '../middlewares/authenticationMiddleware.js';
import upload from '../../uploadConfig.js';
import UserController from "./userController.js"

const userController = new UserController;
const authMiddleware = new AuthMiddleware;

//get info of curent user  
router.route("/get-info")
    .get(authMiddleware.verifyToken, userController.getMyInfo)
//update info of curent user 
router.route("/update-info")
    .put(authMiddleware.verifyToken, userController.updateMyInfo)

export default router;