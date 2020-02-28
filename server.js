var express = require("express");
var mongoose = require("mongoose");

var exphbs = require("express-handlebars");
var routes = require("./controllers/controller.js");
var scrapedRoutes = require("./controllers/scrape.js");

var PORT = process.env.PORT || 3000;

var app = express();

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");


// app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));


app.use(routes);
app.use(scrapedRoutes);

var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/scraper";

mongoose.connect(MONGODB_URI);

// mongoose.connect("mongodb://localhost/scraper", { useNewUrlParser: true });
const connection = mongoose.connection;

connection.once('open', function() {
    console.log('MongoDB Connected!');
});

app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});
