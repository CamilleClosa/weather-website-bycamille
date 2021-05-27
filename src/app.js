const path = require("path");
const express = require("express"); //express is function
const geocode = require("./utils/geocode");

const forecast = require("./utils/forecast");

const app = express(); //create variable to store express application
//it doesnt need any argument
const port = process.env.PORT || 3000;

/*
//app.com
//app.com/about
//app.get()a method used to configure a server to tell what it should do when someone access the url; it takes two arguments; 1st is route (patial url); 2nd function that tells what the server should do if the user access the first argument
//the function takes 2 argument; 1st is an object that contains info about the incoming request to the server; 2nd response; contains a lot of methods that will use to cuztomize and that will show the user

app.get("", (req, res) => {
  res.send("Hello User! Have a nice day");
  //res.send() allows as to send something back to the requester
});

//app.com/help
app.get("/help", (req, res) => {
  res.send("Help Page");
});

app.listen(3000, () => {
  console.log("Server is up on port 3000 ");
}); //3000 is just for localhost

//app.listen - used to start the server;
//2 arguments; 1st if port; 2nd is callback function
//to start the server type node src/app.js
//to stop click ctrl+C
//to access app, go to browser type localhost:3000

//app.com/help
app.get("/help", (req, res) => {
  res.send("Help Page");
});

//if you change something from the app.js, you need to restart the server; this will consume time; so use nodemon to autimatically apply changes
//nodemon src/app.js

//****** Challenge
//Goal: Setup two new routes
//1. Setup and about route and render a page title
//2. Setup a weather route and render a page title
//test your work by visiting both in the brower

//app.com/about
app.get("/about", (req, res) => {
  res.send("This is About Page, Contents will be posted soon. Thanks");
});

//app.com/weather
app.get("/weather", (req, res) => {
  res.send("Welcome to the Weather Forecast Page!");
});


//********* Serving up HTML and JSON
//app.com
app.get("", (req, res) => {
  res.send("<h1>FORECASTING WEBPAGE</h1>"); //html
  //we can put hTML or JSON in the res.send
});

//app.com/help
app.get("/help", (req, res) => {
  res.send({
    name: "Camille",
    age: 24,
    status: "single",
  }); //JSON-is used to send back data that intended to be consumed by code
  //can be an array
});

//*****Challenge
//Goal: Update routes
//1. Setup about routes to render a title with HTML
//2. setup weather route to send back JSOn
//-Object with forecast and localhost stings
//Test your work by visiting both in the browser

//app.com/about
app.get("/about", (req, res) => {
  res.send(
    "<h1>About Page</h1> <h3>This page is created by Carla Camille C. Closa</h3>"
  );
});

//app.com/weather
app.get("/weather", (req, res) => {
  res.send({
    forecast: "Today is cloudy day",
    Location: "Cavite, Philippines",
  });
});

app.listen(3000, () => {
  console.log("Server is up on port 3000 ");
});

*/

//****** Serving up static Assets
//configure express to serve up an entire directory of assets that contains html files, css, js
//create new sub folder in web-server called public; contains all the asset to be serve up
//create html file called index.html

//app.com

console.log(__dirname); //contains directory that the file is located
//console.log(__filename); //contains exact directory path of the file
//path methods can be veiwed in nodejs.org>path
//require path modeule before express
console.log(path.join(__dirname, "../public")); //2 arguments 1st directory of the current file, 2nd; manipulation to access othe folder

//define paths for express config
const publicDirectoryPath = path.join(__dirname, "../public");

//set up static directory to serve
app.use(express.static(publicDirectoryPath)); //a way to customize server
//static is a function that takes the path to the folder we wanna serve up
//such as index.html,help.html etc.
//static means that the content will not change if you refresh

//**** Challenge
//Goal: Create two or more HTML files
//1. Create an HTML page for aboout with about title
//2. Crete an HTML page for help with help title
//3. Remove old route handler for botj
//4.Visit both in the browser to test your work
//app.get for index, help, and about is now deleter since directorypath for public is now up

//**** Challenge
//Goal: Update weather endpoint to accept address
//No Address? Send back an error
//Address? send back the static JSON
//add address property onto JSON which returns the provided address
//Test /weather and /weather?address=philadelphia

//app.com/weather
app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "No address search. Please Input an Address",
    });
  }
  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({ error });
      }
      forecast(longitude, latitude, (error, forcastdata) => {
        if (error) {
          return res.send({ error });
        }
        res.send({
          forecast: forcastdata,
          location, //shorthand
          address: req.query.address,
        });
      });
    }
  );
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide a search term",
    });
  }
  res.send({
    products: [],
  });
}); //query ?search=games&rating=5

//****** Dynamic Pages with Templating
//template engine is used to render dynamic webpages using express
//handle bars - a template engine that is use to allow render dynamic docu and easily create code that we can use
//for example; 1 header and footer for all webpages
//install hbs use(npm i hbs@4.1.2) - integrates handle bars to express
//after installing, set it up by telling express which templating engine we installed

//setup handler bars engine and views location
app.set("view engine", "hbs"); //allows to set a value for a given express setting
//2 arguments, key and value(name of module)
//view engine is case sentive
//create new sub folder for handlebars template (views folder)
//create file that replaces the homepage (index.hbs)
//we are now replaceing static index.html to dynamic index.hbs

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Camille Closa",
  }); //use to render handle bars;1st argument filename of hbs; 2nd value needed to show
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Page",
    name: "Camille Closa",
  }); //use to render handle bars;1st argument filename of hbs; 2nd value needed to show
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help Page",
    body: "This page will help you if you are confused",
    name: "camille",
  });
});

//******** Customizing the view directory
//rename views subfolder to templates
//if you access any webpage it wil case error because template it not recognizable
//create new path

//define paths for express config
//const viewsPath = path.join(__dirname, "../templates");
const viewsPath = path.join(__dirname, "../templates/views"); //advance templating

//setup handler bars engine and views location
app.set("views", viewsPath);
//it will load again

//use api references to view a lot of features
//expressjs.com >api reference

//***** Advanced Templating
//partials with handle bars - allow you to create small templates which is part of bigger templates
//create headers and footers and the reuse it

//1st step to work with partial is to load in hbs for the first time

const hbs = require("hbs");
//under templates create 2 subfolders: views and partials
//views will hold the about.hbs, help.hbs, index.hbs
//partial will hold the partial templates
//since about.hbs, help.hbs, index.hbs are now in the views sub folder, edit viewsPath from /templates to /templates/views

//define path for express config
const patialsPath = path.join(__dirname, "../templates/partials");
//setup handle bars
hbs.registerPartials(patialsPath);
//create header.hbs in partials folder
//in terminal to reload nodemon src/app.js -e js,hbs so any changes in hbs files will automatically rerun

//*****challenge
//Goal: Create a partial for the footer
//1. Setup the template for the footer in partial "Created by: Name"
//2.render the partial at the bottom of all three pages
//3. test your work by visinting all three pages

//****** 404 pages
//show messgae if the url they type is not exist

//for those who access localhost:300/help/tests

//app.get("/help/*", (req, res) => {
//res.send("Help Article not found");
//});

//***Challenge
//Goal: Create and render a 404 page with handlebars
//1.Setup the template to render the header and footer
//2. Setup the template to render an error message in a paragraph
//3. render the template for both 404 routes
//-page not found
//-help article not found
//4. Test your work. visit /what and help/units

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Camille Closa",
    errorMessage: "Help Article not found",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Camille Closa",
    errorMessage: "Page not found",
  });
});

//* means match anything that havent macth so far ex. localhost:300/me
//app.get("*", (req, res) => {
//  res.send("My 404 Page");
//}); //must be the last app.get

app.listen(port, () => {
  console.log("Server is up on port" + port);
});
