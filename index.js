// File name: index.js
// Description: The main file used to execute the application.
// Last modified date: 04/12/2023
// Change log: 01/12/2023 file created.
//             02/12/2023 added logic for the different pages.
//             03/12/2023 added express, ejs, and method-override.
//             04/12/2023 added additional comments and updates.

// Import modules for the application.
const express = require("express"); // Express module.
const methodOverride = require("method-override"); // Method-override module.
const app = express(); // Instantiating the express module as app.
const PORT = 3000; // Port declaration.

// Declaring global debug variable. Used to help with debugging by providing console output to user.
global.DEBUG = true;

app.set("view engine", "ejs");
app.use(express.static("public")); // Allows us to use the public folder for static files such as css.
app.use(express.urlencoded({ extended: true })); // Allows us to parse the body of a request.
app.use(methodOverride("_method")); // Allows us to use the method-override module to edit the method of a      request.

// App.get method to display the home page of the application.
app.get("/", (req, res) => {
  // Renders the index.ejs page and passes in a name variable to be used in the ejs file.
  res.render("index.ejs", { name: "Peter" });
});

// App.get method for the about page. This contains information about the application and how to use it.
app.get("/about", (request, response) => {
  response.render("about.ejs");
});

// App.get method for the Beers page. Contains all logic for the beers page and associated routes.
const beersRouter = require("./routes/beers");
app.use("/beers", beersRouter);

// App.get method for the Breweries page. Contains all logic for the breweries page and associated routes.
const breweriesRouter = require("./routes/breweries");
app.use("/breweries", breweriesRouter);

// App.get method for the Categories page. Contains all logic for the categories page and associated routes.
const categoriesRouter = require("./routes/categories");
app.use("/categories", categoriesRouter);

// App.get method for the 404 page. Used if a user tries to access a page that does not exist.
app.use((req, res) => {
  res.status(404).render("404");
});

// App.listen method to listen on the port declared above.
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
