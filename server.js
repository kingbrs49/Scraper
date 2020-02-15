var express = require("express");
var logger = require("morgan");
var mongoose = require("mongoose");

var exphbs = require("express-handlebars");

// var axios = require("axios");
// var cheerio = require("cheerio");

var db = require("./models");

var PORT = process.env.PORT || 3000;

var app = express();

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

var routes = require("./controllers/controller");
var scrapedRoutes = require("./controllers/scrape.js");
app.use(routes);
app.use(scrapedRoutes);

mongoose.connect("mongodb://localhost/scraper", { useNewUrlParser: true });
const connection = mongoose.connection;

connection.once('open', function() {
    console.log('MongoDB Connected!');
});

app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});