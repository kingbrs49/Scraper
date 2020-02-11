var express = require("express");
var logger = require("morgan");
var mongoose = require("mongoose");

var exphbs = require("express-handlebars");

var axios = require("axios");
var cheerio = require("cheerio");

var db = require("./models");

var PORT = process.env.PORT || 3000;

var app = express();

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect("mongodb://localhost/scraper", { useNewUrlParser: true });

app.get("/scrape", function (req, res) {
    // axios.get("https://apnews.com/apf-sports").then(function (response) {
    //     var $ = cheerio.load(response.data);
    //     $(".feed.feedCard.h1.FeedCard.CardHeadline.Component-h1-0-2-30").each(function (i, element) {
    //         var result = {};
    //         console.log(result);

    axios.get("https://www.usatoday.com/tech/").then(function (response) {
        var $ = cheerio.load(response.data);
        $("#section-stories").each(function (i, element) {
            var result = {};

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

app.get("/articles", function (req, res) {
    db.Article.find({})
        .then(function (dbArticle) {
            res.json(dbArticle);
        })
        .catch(function (err) {
            res.json(err);
        });
});

app.get("/articles/:id", function (req, res) {
    db.Article.findOne({ _id: req.params.id })
    .populate("note")
    .then(function (dbArticle) {
        res.json(dbArticle);
    })
    .catch(function (err) {
        res.json(err);
    });
});

app.post("/articles/:id", function (req, res) {
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

app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});