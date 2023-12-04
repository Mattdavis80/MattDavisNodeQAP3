// File name: index.js
// Description: The main file used to execute the application.
// Last modified date: 3/29/2021
// Change log: 01/12/2023 file created.

// Import the express module.
const express = require("express");
const methodOverride = require("method-override");
const app = express();
const PORT = 3000;

global.DEBUG = true;
app.set("view engine", "ejs");
app.use(express.static("public")); // Allows us to use the public folder.
app.use(express.urlencoded({ extended: true })); // Allows us to parse the body of a request.
app.use(methodOverride("_method")); // So is this!

app.get("/", (req, res) => {
  res.render("index.ejs", { name: "John Doe" });
});

// Logic for the about page.
app.get("/about", (request, response) => {
  response.render("about.ejs");
});

// Logic for the beers page.
const beersRouter = require("./routes/beers");
app.use("/beers", beersRouter);

// Logic for the breweries page.
const breweriesRouter = require("./routes/breweries");
app.use("/breweries", breweriesRouter);

// Logic for the categories page.
const categoriesRouter = require("./routes/categories");
app.use("/categories", categoriesRouter);

// Logic for the 404 page.
app.use((req, res) => {
  res.status(404).render("404");
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
