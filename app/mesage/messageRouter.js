import express from 'express';
const router = express.Router();
import AuthMiddleware from "../../middlewares/authenticationMiddleware.js";
import MesageController from "./messageController.js"

const messageController = new MesageController

const authMiddleware = new AuthMiddleware

router.route("/get-message")
    .get(authMiddleware.verifyToken, messageController.getMessage)


export default router;
