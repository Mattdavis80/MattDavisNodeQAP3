const express = require("express");
const router = express.Router();
const { getBreweries, getBreweryById } = require("../services/breweries.dal");

// is really http://localhost:3000/breweries/
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

// is really http://localhost:3000/breweries/1
router.get("/:id", async (req, res) => {
  try {
    let brewery = await getBreweryById(req.params.id); // from postgresql
    if (brewery.length === 0) res.render("no record");
    else res.render("brewery", { brewery });
  } catch {
    res.render("503");
  }
});

module.exports = router;
