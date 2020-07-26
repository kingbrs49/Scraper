# AP Sports Scraper
The only Sports Scraper (that I know of) taking from the Associated Press!
----------------------------------------------------------------------

## Overview

Hello! And Welcome to the AP Sports Scraper!

In this full-stack application, you will be able to employ client-side web scraping in order to grab the latest sports articles from the official Associated Press Sports website. Additionally, you can save articles for later, and comment on them for future posterity. 

Simply go to the main page, and click the "SCRAPE FOR SPORTS STORIES" button on the Navigation Bar to get the latest stories from the AP Sports website. 

From there, you can hit the "Save" Button to hold it in the "Saved" page. Hit the "Comment" button to open up the comments modal and say whatever you want about it -- hit "Save" in the modal to hold on to that comment for future viewing.

Or, if you don't want to have an article saved, simply hit the "Delete" button from the saved page to throw it away.

Have fun, and Happy Sports Scraping!

## Getting Started

The following instructions will allow access to a copy of the project on your local machine for development. You must have [Node.js](https://nodejs.org/en/) and [MongoDB](https://www.mongodb.com/) installed locally in order to proceed. 

1. Install dependencies (see below)
2. In your CLI, enter **mongod**
3. In a new CLI window, go to root of the application directory and enter **node server.js**
4. In browser, navigate to **http://localhost:3000**

### Dependencies

In order to deploy the application from your local machine, you will need to **npm install** the following node modules:

1. axios
2. cheerio
3. express
4. express-handlebars
5. mongoose
6. morgan

**NOTE:** If you copied the package.json file, you will not need to install these individually. Simply execute the following in the root of the directory:

````
npm install
````

## Deployment

Follow these steps to deploy the app to Heroku:

1. Create a Heroku app in your project directory:

````
heroku create <ProjectName>
````

2. Provision an mLab add-on for your project by typing the following in your terminal:

````
heroku addons:create mongolab
````

Your project should be successfully deployed on Heroku.

## Built With

* Axios
* Cheerio
* Express
* Express-Handlebars
* Mongoose
* Morgan

# SCREENSHOTS of the App

![Front Page](https://github.com/kingbrs49/Scraper/blob/master/ScraperScreenshot-1.jpg?raw=true)

![Comment Modal](https://github.com/kingbrs49/Scraper/blob/master/ScraperScreenshot-2.jpg?raw=true)

![Scraping Sports Stories](https://github.com/kingbrs49/Scraper/blob/master/ScraperScreenshot-3.jpg?raw=true)

![Saving Stories](https://github.com/kingbrs49/Scraper/blob/master/ScraperScreenshot-4.jpg?raw=true)

![Saved Page](https://github.com/kingbrs49/Scraper/blob/master/ScraperScreenshot-5.jpg?raw=true)