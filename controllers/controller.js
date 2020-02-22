var express = require("express");

var router = express.Router();

var db = require("../models");

//var scrape = require("./scrape");

router.get("/", function(req, res) {
    db.Article.find({})
    .then(function (dbArticle) {
        // res.json(dbArticle)
        res.render("index", {article: dbArticle});
    })
    .catch(function (err) {
        res.json(err);
    });
});

router.get("/saved", function(req, res) {
    db.Article.find({saved: "true"})
    .then(function (dbArticle) {
        res.render("saved", {article: dbArticle});
    })
    .catch(function (err) {
        res.json(err);
    });
});

// FOUND THE POST ROUTE (BELOW)

router.post("/api/articles", function (req, res) {
    console.log(req.body);
    db.Article.create({
        title: scrapedRoutes
            .article
            .title,
        link: scrapedRoutes
            .article
            .link,
        description: scrapedRoutes
            .article
            .description
    })
    .then(function (dbArticle) {
        res.json(dbArticle);
    })
    .catch(function (err) {
        res.json(err);
    });
});

module.exports = router;