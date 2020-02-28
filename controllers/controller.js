var express = require("express");

var router = express.Router();

var db = require("../models");

//var scrape = require("./scrape");

router.get("/", function (req, res) {
    db.Article.find({ saved: "false" })
        .then(function (dbArticle) {
            res.render("index", { article: dbArticle });
        })
        .catch(function (err) {
            res.json(err);
        });
});

router.get("/saved", function (req, res) {
    db.Article.find({ saved: "true" })
        .then(function (dbArticle) {
            res.render("saved", { article: dbArticle });
        })
        .catch(function (err) {
            res.json(err);
        });
});
router.get("/api/articles/:id", function (req, res) {
    db.Article.findOne({ _id: req.params.id })
        .populate("note")
        .then(function (result) {
            res.json(result);
    });
});

router.put("/api/articles/:id", function (req, res) {
    db.Article.findOneAndUpdate({ 
        _id: req.params.id 
    }, req.body)
        .then(function (dbArticle) {
            res.json(dbArticle);
        });
});

router.post("/api/articles", function (req, res) {
    console.log(req.body);
    db.Article.create({
        // title: scrapedRoutes
        //     .article
        //     .title,
        // link: scrapedRoutes
        //     .article
        //     .link,
        // description: scrapedRoutes
        //     .article
        //     .description
    })
        .then(function (dbArticle) {
            res.json(dbArticle);
        })
        .catch(function (err) {
            res.json(err);
        });
});

router.post("/api/comments/:articleid", function (req, res) {
    const articleid = req.params.articleid;
    db.Note.create(req.body)
        .then(function (createdComment) {
            const commentId = createdComment._id;
            db.Article.findOneAndUpdate({
                _id: articleid
            },
                {
                    $push: { note: commentId }
                }
            ).then(function (article) {
                res.json(article);
            });
        });
});

module.exports = router;