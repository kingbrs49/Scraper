var express = require("express");

var router = express.Router();

var db = require("../models");

router.get("/", function(req, res) {
    db.Article.find({})
    .then(function (dbArticle) {
        res.json(dbArticle);
    })
    .catch(function (err) {
        res.json(err);
    });
});



module.exports = router;