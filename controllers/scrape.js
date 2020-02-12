var router = require("express").Router();
var db = require("../models");

router.get("/scrape", function (req, res) {
    axios.get("https://apnews.com/apf-sports").then(function (response) {
        var $ = cheerio.load(response.data);
        $("div.CardHeadline").each(function (i, element) {
            var result = {};
            // console.log(result);

            result.title = $(this)
                .children("a")
                .text();
                // console.log(this);
            result.link = $(this)
                .children("a")
                .attr("href");
                // console.log(result.link);

            db.Article.create(result)
                .then(function (dbArticle) {
                    console.log(dbArticle);
                })
                .catch(function (err) {
                    console.log(err);
            });
        });

        res.send("Scrape Complete!");
    });
});

router.get("/articles", function (req, res) {
    db.Article.find({})
        .then(function (dbArticle) {
            res.json(dbArticle);
        })
        .catch(function (err) {
            res.json(err);
        });
});

router.get("/articles/:id", function (req, res) {
    db.Article.findOne({ _id: req.params.id })
    .populate("note")
    .then(function (dbArticle) {
        res.json(dbArticle);
    })
    .catch(function (err) {
        res.json(err);
    });
});

router.post("/articles/:id", function (req, res) {
    db.Note.create(req.body)
    .then(function (dbNote) {
        return db.Article.findOneAndUpdate({ _id: req.params.id }, { note: dbNote._id }, {new: true });
    })
    .then(function (dbArticle) {
        res.json(dbArticle);
    })
    .catch(function (err) {
        res.json(err);
    });
});

module.exports = router;