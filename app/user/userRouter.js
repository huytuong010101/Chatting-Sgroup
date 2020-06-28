import express from 'express';
const router = express.Router();
import AuthMiddleware from '../middlewares/authenticationMiddleware.js';
import multer from 'multer';
import UserController from "./userController.js"

const upload = multer({ dest: 'public/avatar' });
const userController = new UserController;
const authMiddleware = new AuthMiddleware;

//get info of curent user  
router.route("/get-info")
    .get(authMiddleware.verifyToken, userController.getMyInfo)
//update info of curent user 
router.route("/update-info")
    .post(authMiddleware.verifyToken, upload.single("avatar"), userController.updateMyInfo)

export default router;