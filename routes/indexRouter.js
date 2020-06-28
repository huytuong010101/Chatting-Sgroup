import express from 'express';
const router = express.Router();

router.route("/")
    .get((req, res) => {
        return res.render("app/conversation/index");
    })

export default router;