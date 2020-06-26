const express = require('express');
const router = express.Router();

router.route("/")
    .get((req, res) => {
        return res.render("app/conversation/index");
    })

module.exports = router;