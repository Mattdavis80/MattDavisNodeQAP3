// File name: breweries.js
// Description: The file used to handle the breweries page and associated routes/requests.
// Last modified date: 04/12/2023
// Change log: 01/12/2023 file created.
//             04/12/2023 added additional comments.

// Import modules for the application.
const express = require("express");
const router = express.Router();

// Import functions from the breweries.dal.js file.
const { getBreweries, getBreweryById } = require("../services/breweries.dal");

// Get Methods for the breweries page.
router.get("/", async (req, res) => {
  if (DEBUG) console.log("breweries.GET");
  try {
    let theBreweries = await getBreweries();
    if (DEBUG) console.log("inside the breweries.route.GET success");
    if (DEBUG) console.log(theBreweries);
    res.render("breweries", { theBreweries });
  } catch {
    res.render("503");
  }
});

// Get method for the brewery page, renders the brewery.ejs page and passes in the brewery variable to be used in the ejs file.
router.get("/:id", async (req, res) => {
  try {
    let brewery = await getBreweryById(req.params.id); // from postgresql
    if (brewery.length === 0) res.render("no record");
    else res.render("brewery", { brewery });
  } catch {
    res.render("503");
  }
});

// Export the router.
module.exports = router;
