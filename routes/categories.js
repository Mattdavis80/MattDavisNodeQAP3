// File name: categories.js
// Description: The file used to handle the categories page and associated routes/requests.
// Last modified date: 04/12/2023
// Change log: 01/12/2023 File created.
//             04/12/2023 Added additional comments.

// Import modules for the application.
const express = require("express");
const router = express.Router();

// Import functions from the categories.dal.js file.
const {
  getCategories,
  getCategoryById,
} = require("../services/categories.dal");

// Get Methods for the categories page.
router.get("/", async (req, res) => {
  if (DEBUG) console.log("categories.GET");
  try {
    let categories = await getCategories();
    if (DEBUG) console.log("inside the categories.route.GET success");
    if (DEBUG) console.log(categories);
    res.render("categories", { categories });
  } catch {
    res.render("503");
  }
});

// Get method for the category page, renders the category.ejs page and passes in the category variable to be used in the ejs file.
router.get("/:id", async (req, res) => {
  try {
    let category = await getCategoryById(req.params.id); // from postgresql
    if (category.length === 0) res.render("no record");
    else res.render("category", { category });
  } catch {
    res.render("503");
  }
});

// Export the router.
module.exports = router;
