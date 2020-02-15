var router = require("express").Router();
var db = require("../models");

var axios = require("axios");
var cheerio = require("cheerio");

router.get("/scrape", function (req, res) {
    axios.get("https://apnews.com/apf-sports").then(function (response) {
        var $ = cheerio.load(response.data);

    

        var result = [];

        $(".FeedCard").each(function (i, element) {
            var article = {};
            article.title = $(this)
                .find("h1")
                .text();
            article.link = "https://apnews.com/apf-sports"+$(this)
                .find("a")
                .first()
                .attr("href");
            article.description = $(this)
                .find("p")
                .first()
                .text();

            
            if(article.title && article.link && article.description) {
                result.push(article);
            }
        });

    
        db.Article.insertMany(result)
                .then(function (dbArticle) {

                    res.json(dbArticle);
                })
                .catch(function (err) {
                    console.log(err);
            });
        

        
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