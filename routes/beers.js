// File name: beers.js
// Description: The file used to handle the beers page and associated routes/requests.
// Last modified date: 04/12/2023
// Change log: 01/12/2023 file created.
//             02/12/2023 added logic for get/post requests.
//             04/12/2023 added logic for delete/put/patch requests.

// Import modules for the application.
const express = require("express"); // Express module.
const router = express.Router(); // Instantiating the express router module as router.

// Import functions from the beers.dal.js file.
const {
  getBeers,
  getBeerByBeerId,
  addBeer,
  deleteBeer,
  putBeer,
  patchBeer,
} = require("../services/beers.dal");

// Get Methods for the beers page.

// Get method for the beers page, renders the beers.ejs page and passes in the beers variable to be used in the ejs file.
router.get("/", async (req, res) => {
  if (DEBUG) console.log("beers.GET");
  try {
    let theBeers = await getBeers();
    if (DEBUG) console.log("inside the beers.route.GET success");
    if (DEBUG) console.log(theBeers);
    res.render("beers", { theBeers });
  } catch {
    res.render("503");
  }
});

// Get method for the beer delete page, renders the beerDelete.ejs page and passes in the name and id variables to be used in the ejs file.
router.get("/:id/delete", async (req, res) => {
  if (DEBUG) console.log("beer.Delete:" + req.params.id);
  res.render("beerDelete.ejs", {
    name: req.query.name,
    id: req.params.id,
  });
});

// Get method for the beer edit page, renders the putBeers.ejs page and passes in the name and id variables to be used in the ejs file.
router.get("/:id/edit", async (req, res) => {
  if (DEBUG) console.log("beer.Edit:" + req.params.id);
  res.render("putBeers.ejs", {
    name: req.query.name,
    id: req.params.id,
  });
});

// Get method for the beer replace page, renders the patchBeer.ejs page and passes in the name and id variables to be used in the ejs file.
router.get("/:id/replace", async (req, res) => {
  if (DEBUG) console.log("beer.Replace:" + req.params.id);
  res.render("patchBeer.ejs", {
    name: req.query.name,
    id: req.params.id,
  });
});

// Get method with a parameter for the beer page, renders the beer.ejs page and passes in the singleBeer variable to be used in the ejs file.
router.get("/:id", async (req, res) => {
  try {
    let singleBeer = await getBeerByBeerId(req.params.id); // from postgresql
    if (singleBeer.length === 0) res.render("no record");
    else res.render("beer", { singleBeer });
  } catch {
    res.render("503");
  }
});

// Post methods for the beers page. Used to add a new beer to the database.
router.post("/", async (req, res) => {
  if (DEBUG) console.log("beers.POST");
  try {
    await addBeer(
      req.body.beerName,
      req.body.abv,
      req.body.ibu,
      req.body.category_id,
      req.body.brewery_id
    );
    res.redirect("/beers/");
  } catch {
    res.render("503");
  }
});

// Put method for the beers page. Used to update a beer in the database.
router.put("/:id", async (req, res) => {
  if (DEBUG) console.log("beers.PUT: " + req.params.id);
  try {
    await putBeer(req.params.id, req.body.name);
    res.redirect("/beers/");
  } catch {
    res.render("503");
  }
});

// Patch method for the beers page. Used to update a beer in the database.
router.patch("/:id", async (req, res) => {
  if (DEBUG) console.log("beers.PATCH: " + req.params.id);
  try {
    await patchBeer(req.params.id, req.body.name);
    res.redirect("/beers/");
  } catch {
    res.render("503");
  }
});

// Delete method for the beers page. Used to delete a beer from the database.
router.delete("/:id", async (req, res) => {
  if (DEBUG) console.log("beers.delete: " + req.params.id);
  try {
    await deleteBeer(req.params.id);
    res.redirect("/beers/");
  } catch (err) {
    if (DEBUG) console.error(err);
    // log this error to an error log file.
    res.render("503");
  }
});

// Export the router module to be used in the index.js file.
module.exports = router;
