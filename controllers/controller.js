var express = require("express");

var router = express.Router();

var db = require("../models");

router.get("/home", function(req, res) {

    db.Article.find({})
    .then(function (dbArticle) {
        // res.json(dbArticle)
        res.render("index", {article: dbArticle});
    })
    .catch(function (err) {
        res.json(err);
    });
});

router.post("/api/articles", function (req, res) {
    db.Article.create({})
    .then(function (dbArticle) {
        res.json(dbArticle);
    })
    .catch(function (err) {
        res.json(err);
    });
});

module.exports = router;