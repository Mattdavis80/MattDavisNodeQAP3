const express = require("express");
const router = express.Router();
const {
  getBeers,
  getBeerByBeerId,
  addBeer,
  deleteBeer,
} = require("../services/beers.dal");

// is really http://localhost:3000/beers/
router.get("/", async (req, res) => {
  if (DEBUG) console.log("beers.GET");
  try {
    let theBeers = await getBeers(); // from postgresql
    if (DEBUG) console.log("inside the beers.route.GET success");
    if (DEBUG) console.log(theBeers);
    res.render("beers", { theBeers });
  } catch {
    res.render("503");
  }
});

// Get the form to delete a beer
router.get("/:id/delete", async (req, res) => {
  if (DEBUG) console.log("beer.Delete:" + req.params.id);
  res.render("beerDelete.ejs", {
    name: req.query.name,
    id: req.params.id,
  });
});

// is really http://localhost:3000/actors/123
router.get("/:id", async (req, res) => {
  try {
    let singleBeer = await getBeerByBeerId(req.params.id); // from postgresql
    if (singleBeer.length === 0) res.render("no record");
    else res.render("beer", { singleBeer });
  } catch {
    res.render("503");
  }
});

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
    // log this error to an error log file.
    res.render("503");
  }
});

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

module.exports = router;
